import assert from "node:assert/strict";
import test from "node:test";

import type { BlockObjectResponse } from "@notionhq/client";

import {
  buildTranscriptBlocks,
  exchangeMarker,
  hasExchangeMarker,
} from "@/lib/notionContent";
import { isRetryableNotionError, withNotionRetry } from "@/lib/notionRetry";

test("transcript blocks retain the exact user and assistant text", () => {
  const userText = "Exact user text\nwith punctuation: $5,000.";
  const assistantText = "Exact Pat AI reply — unchanged.";
  const blocks = buildTranscriptBlocks({
    exchangeId: "exchange-1",
    userMessage: { id: "u1", role: "user", content: userText, createdAt: "2026-01-01T00:00:00.000Z" },
    assistantMessage: { id: "a1", role: "assistant", content: assistantText, createdAt: "2026-01-01T00:00:01.000Z" },
    usage: { promptTokens: 1, completionTokens: 1, totalTokens: 2, estimatedCost: 0.001 },
    model: "test-model",
    completedAt: "2026-01-01T00:00:01.000Z",
  });

  const text = blocks
    .flatMap((block) => {
      if (block.type === "paragraph") {
        return block.paragraph.rich_text.map((item) =>
          item.type === "text" ? item.text.content : "",
        );
      }
      return [];
    })
    .join("");

  assert.ok(text.includes(userText));
  assert.ok(text.includes(assistantText));
});

test("exchange markers prevent duplicate transcript writes", () => {
  const marker = exchangeMarker("exchange-1");
  const block = {
    id: "block-1",
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: [{ plain_text: marker }] },
  } as unknown as BlockObjectResponse;

  assert.equal(hasExchangeMarker([block], "exchange-1"), true);
  assert.equal(hasExchangeMarker([block], "exchange-2"), false);
});

test("retry policy covers the required transient Notion statuses", () => {
  for (const status of [429, 500, 502, 503, 504]) {
    assert.equal(isRetryableNotionError({ status }), true);
  }
  assert.equal(isRetryableNotionError({ status: 400 }), false);
});

test("retry uses exponential backoff and eventually succeeds", async () => {
  let attempts = 0;
  const delays: number[] = [];
  const result = await withNotionRetry(
    async () => {
      attempts += 1;
      if (attempts < 3) throw { status: 503 };
      return "ok";
    },
    {
      baseDelayMs: 100,
      random: () => 0.5,
      sleep: async (milliseconds) => {
        delays.push(milliseconds);
      },
    },
  );

  assert.equal(result, "ok");
  assert.equal(attempts, 3);
  assert.deepEqual(delays, [100, 200]);
});

test("retry recovery stops a duplicate mutation after an uncertain failure", async () => {
  let attempts = 0;
  const result = await withNotionRetry(
    async () => {
      attempts += 1;
      throw { status: 502 };
    },
    {
      recover: async () => ({ recovered: true, value: "already-written" }),
      sleep: async () => undefined,
    },
  );

  assert.equal(result, "already-written");
  assert.equal(attempts, 1);
});

