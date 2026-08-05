import assert from "node:assert/strict";
import test from "node:test";

import { addUsageMetrics, readOpenRouterMetrics } from "@/lib/openrouterMetrics";

test("reads token counts and billed cost directly from OpenRouter usage", () => {
  assert.deepEqual(
    readOpenRouterMetrics({
      prompt_tokens: 194,
      completion_tokens: 22,
      total_tokens: 216,
      cost: 0.001234,
    }),
    {
      promptTokens: 194,
      completionTokens: 22,
      totalTokens: 216,
      estimatedCost: 0.001234,
    },
  );
});

test("does not manually infer a missing total or cost", () => {
  assert.deepEqual(readOpenRouterMetrics({ prompt_tokens: 10, completion_tokens: 5 }), {
    promptTokens: 10,
    completionTokens: 5,
    totalTokens: 0,
    estimatedCost: 0,
  });
});

test("aggregates provider-reported exchange usage", () => {
  assert.deepEqual(
    addUsageMetrics(
      { promptTokens: 10, completionTokens: 5, totalTokens: 15, estimatedCost: 0.01 },
      { promptTokens: 20, completionTokens: 8, totalTokens: 28, estimatedCost: 0.02 },
    ),
    { promptTokens: 30, completionTokens: 13, totalTokens: 43, estimatedCost: 0.03 },
  );
});

