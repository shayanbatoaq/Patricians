import type { BlockObjectRequest, BlockObjectResponse } from "@notionhq/client";

import type { ConversationExchange, ExplicitLeadDetails, UsageMetrics } from "@/types/analytics";
import type { NotionConversationValues } from "@/types/notion";

export const EXCHANGE_MARKER_PREFIX = "Pat AI Exchange ID:";

const RICH_TEXT_CHUNK_SIZE = 1800;
const RICH_TEXT_ITEMS_PER_BLOCK = 80;

function chunks(value: string, size: number) {
  if (!value) {
    return [""];
  }

  const result: string[] = [];
  for (let index = 0; index < value.length; index += size) {
    result.push(value.slice(index, index + size));
  }
  return result;
}

export function notionRichText(value: string) {
  return chunks(value, RICH_TEXT_CHUNK_SIZE).map((content) => ({
    type: "text" as const,
    text: { content },
  }));
}

function paragraphBlocks(value: string): BlockObjectRequest[] {
  const items = notionRichText(value);
  const blocks: BlockObjectRequest[] = [];

  for (let index = 0; index < items.length; index += RICH_TEXT_ITEMS_PER_BLOCK) {
    blocks.push({
      type: "paragraph",
      paragraph: { rich_text: items.slice(index, index + RICH_TEXT_ITEMS_PER_BLOCK) },
    });
  }

  return blocks;
}

function heading1(value: string): BlockObjectRequest {
  return { type: "heading_1", heading_1: { rich_text: notionRichText(value) } };
}

function heading3(value: string): BlockObjectRequest {
  return { type: "heading_3", heading_3: { rich_text: notionRichText(value) } };
}

function divider(): BlockObjectRequest {
  return { type: "divider", divider: {} };
}

function markerBlock(exchangeId: string): BlockObjectRequest {
  return {
    type: "paragraph",
    paragraph: {
      color: "gray",
      rich_text: [
        {
          type: "text",
          text: { content: `${EXCHANGE_MARKER_PREFIX} ${exchangeId}` },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: "gray",
          },
        },
      ],
    },
  };
}

export function buildTranscriptBlocks(exchange: ConversationExchange): BlockObjectRequest[] {
  return [
    heading3("USER"),
    ...paragraphBlocks(exchange.userMessage.content),
    heading3("PAT AI"),
    ...paragraphBlocks(exchange.assistantMessage.content),
    markerBlock(exchange.exchangeId),
  ];
}

export function formatOverview(values: NotionConversationValues) {
  return [
    `Started: ${values.startedAt}`,
    `Website: ${values.website}`,
    `Model: ${values.model}`,
    `Session: ${values.sessionId}`,
  ].join("\n");
}

export function formatAnalysis(
  values: NotionConversationValues,
  leadDetails: ExplicitLeadDetails = values.leadDetails,
) {
  const { analysis } = values;

  return [
    `Primary Service: ${analysis.serviceInterest[0] ?? "Not identified"}`,
    `Business: ${leadDetails.businessName ?? analysis.business ?? "Not provided"}`,
    `Industry: ${leadDetails.industry ?? analysis.industry ?? "Not provided"}`,
    `Lead Score: ${analysis.leadScore}`,
    `Outcome: ${analysis.outcome}`,
    `Recommended Service: ${analysis.recommendedService ?? "Not identified"}`,
    `Name: ${leadDetails.userName ?? "Not provided"}`,
    `Email: ${leadDetails.email ?? "Not provided"}`,
    `Phone: ${leadDetails.phone ?? "Not provided"}`,
    `Budget: ${leadDetails.budget ?? "Not provided"}`,
    `Timeline: ${leadDetails.timeline ?? "Not provided"}`,
    `Knowledge Gaps: ${analysis.knowledgeGaps.join("; ") || "None identified"}`,
    `Suggested Improvements: ${analysis.improvements.join("; ") || "None identified"}`,
  ].join("\n");
}

export function formatUsage(
  usage: UsageMetrics,
  userMessages: number,
  assistantMessages: number,
  durationSeconds: number,
) {
  return [
    `User Messages: ${userMessages}`,
    `Assistant Messages: ${assistantMessages}`,
    `Prompt Tokens: ${usage.promptTokens}`,
    `Completion Tokens: ${usage.completionTokens}`,
    `Total Tokens: ${usage.totalTokens}`,
    `Estimated Cost: $${usage.estimatedCost.toFixed(8)}`,
    `Duration: ${durationSeconds} seconds`,
  ].join("\n");
}

export function buildInitialPageBlocks(
  values: NotionConversationValues,
  exchange: ConversationExchange,
): BlockObjectRequest[] {
  return [
    heading1("Conversation Overview"),
    ...paragraphBlocks(formatOverview(values)),
    divider(),
    heading1("Summary"),
    ...paragraphBlocks(
      values.refreshSummary
        ? values.analysis.summary
        : "Summary refreshes after every third user message and when the conversation finishes.",
    ),
    divider(),
    heading1("Full Conversation"),
    ...buildTranscriptBlocks(exchange),
    divider(),
    heading1("Conversation Analysis"),
    ...paragraphBlocks(formatAnalysis(values)),
    divider(),
    heading1("Usage"),
    ...paragraphBlocks(
      formatUsage(
        values.usage,
        values.userMessages,
        values.assistantMessages,
        values.durationSeconds,
      ),
    ),
  ];
}

function richTextPlainText(items: Array<{ plain_text?: string }>) {
  return items.map((item) => item.plain_text ?? "").join("");
}

export function blockPlainText(block: BlockObjectResponse) {
  switch (block.type) {
    case "paragraph":
      return richTextPlainText(block.paragraph.rich_text);
    case "heading_1":
      return richTextPlainText(block.heading_1.rich_text);
    case "heading_2":
      return richTextPlainText(block.heading_2.rich_text);
    case "heading_3":
      return richTextPlainText(block.heading_3.rich_text);
    case "heading_4":
      return richTextPlainText(block.heading_4.rich_text);
    default:
      return "";
  }
}

export function exchangeMarker(exchangeId: string) {
  return `${EXCHANGE_MARKER_PREFIX} ${exchangeId}`;
}

export function hasExchangeMarker(blocks: BlockObjectResponse[], exchangeId: string) {
  const marker = exchangeMarker(exchangeId);
  return blocks.some((block) => blockPlainText(block) === marker);
}

export function findTranscriptInsertionAnchor(blocks: BlockObjectResponse[]) {
  const lastMarker = [...blocks]
    .reverse()
    .find((block) => blockPlainText(block).startsWith(EXCHANGE_MARKER_PREFIX));

  if (lastMarker) {
    return lastMarker.id;
  }

  return blocks.find(
    (block) => block.type === "heading_1" && blockPlainText(block) === "Full Conversation",
  )?.id;
}

export function findSectionContentBlock(
  blocks: BlockObjectResponse[],
  heading: "Summary" | "Conversation Analysis" | "Usage",
) {
  const headingIndex = blocks.findIndex(
    (block) => block.type === "heading_1" && blockPlainText(block) === heading,
  );

  if (headingIndex < 0) {
    return undefined;
  }

  return blocks.slice(headingIndex + 1).find((block) => block.type === "paragraph");
}

