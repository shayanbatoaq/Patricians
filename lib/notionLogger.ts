import "server-only";

import {
  APIErrorCode,
  isFullBlock,
  isFullPage,
} from "@notionhq/client";
import type {
  BlockObjectResponse,
  CreatePageParameters,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDataSourceParameters,
} from "@notionhq/client";

import {
  buildInitialPageBlocks,
  buildTranscriptBlocks,
  findSectionContentBlock,
  findTranscriptInsertionAnchor,
  formatAnalysis,
  formatUsage,
  hasExchangeMarker,
  notionRichText,
} from "@/lib/notionContent";
import { getNotionClient, getNotionDataSource, withNotionRetry } from "@/lib/notion";
import type {
  ConversationAnalysis,
  ConversationExchange,
  ExplicitLeadDetails,
  UsageMetrics,
} from "@/types/analytics";
import type { ChatMessage } from "@/types/chat";
import type {
  NotionConversationValues,
  NotionPropertySchema,
  NotionSyncResult,
} from "@/types/notion";

type NotionPropertyValue = NonNullable<CreatePageParameters["properties"]>[string];

type SyncExchangeInput = {
  sessionId: string;
  notionPageId?: string | null;
  startedAt: string;
  website: string;
  messages: ChatMessage[];
  exchange: ConversationExchange;
  cumulativeUsage: UsageMetrics;
  analysis: ConversationAnalysis;
  leadDetails: ExplicitLeadDetails;
  final: boolean;
};

type FinalizeInput = Omit<SyncExchangeInput, "exchange"> & {
  model: string;
};

const sessionLocks = new Map<string, Promise<unknown>>();

async function withSessionLock<T>(sessionId: string, operation: () => Promise<T>) {
  const previous = sessionLocks.get(sessionId) ?? Promise.resolve();
  const current = previous.catch(() => undefined).then(operation);
  sessionLocks.set(sessionId, current);

  try {
    return await current;
  } finally {
    if (sessionLocks.get(sessionId) === current) {
      sessionLocks.delete(sessionId);
    }
  }
}

function isObjectNotFound(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === APIErrorCode.ObjectNotFound,
  );
}

function pagePropertyPlainText(page: PageObjectResponse, propertyName: string) {
  const property = page.properties[propertyName];
  if (!property) return "";

  if (property.type === "rich_text") {
    return property.rich_text.map((item) => item.plain_text).join("");
  }
  if (property.type === "title") {
    return property.title.map((item) => item.plain_text).join("");
  }

  return "";
}

function sessionFilter(
  schema: NotionPropertySchema,
  sessionId: string,
): QueryDataSourceParameters["filter"] | null {
  const property = schema["Session ID"];
  if (!property) return null;

  if (property.type === "rich_text") {
    return { property: "Session ID", rich_text: { equals: sessionId } };
  }
  if (property.type === "title") {
    return { property: "Session ID", title: { equals: sessionId } };
  }

  return null;
}

async function findPageBySession(sessionId: string) {
  const notion = getNotionClient();
  const dataSource = await getNotionDataSource();
  const filter = sessionFilter(dataSource.schema, sessionId);

  if (!filter) {
    throw new Error('The Notion data source must contain a text property named "Session ID".');
  }

  const response = await withNotionRetry(() =>
    notion.dataSources.query({
      data_source_id: dataSource.id,
      filter,
      page_size: 2,
      result_type: "page",
      sorts: [{ timestamp: "created_time", direction: "ascending" }],
    }),
  );
  const pages = response.results.filter(isFullPage);
  const canonical = pages[0];

  if (canonical && pages.length > 1) {
    console.error(
      `Pat AI found ${pages.length} Notion pages for session ${sessionId}; keeping the oldest page and trashing duplicates.`,
    );
    await Promise.all(
      pages.slice(1).map((duplicate) =>
        withNotionRetry(() =>
          notion.pages.update({ page_id: duplicate.id, in_trash: true }),
        ),
      ),
    );
  }

  return canonical;
}

async function findConversationPage(sessionId: string, suppliedPageId?: string | null) {
  const notion = getNotionClient();

  if (suppliedPageId) {
    try {
      const page = await withNotionRetry(() =>
        notion.pages.retrieve({ page_id: suppliedPageId }),
      );

      if (
        isFullPage(page) &&
        !page.in_trash &&
        pagePropertyPlainText(page, "Session ID") === sessionId
      ) {
        return page;
      }
    } catch (error) {
      if (!isObjectNotFound(error)) {
        throw error;
      }
    }
  }

  return findPageBySession(sessionId);
}

function propertyValue(type: string, value: unknown): NotionPropertyValue | null {
  switch (type) {
    case "title":
      return { title: notionRichText(String(value ?? "")).slice(0, 100) };
    case "rich_text":
      return { rich_text: notionRichText(String(value ?? "")).slice(0, 100) };
    case "number": {
      const number = Number(value);
      return { number: Number.isFinite(number) ? number : null };
    }
    case "checkbox":
      return { checkbox: Boolean(value) };
    case "email":
      return { email: typeof value === "string" && value ? value : null };
    case "phone_number":
      return { phone_number: typeof value === "string" && value ? value : null };
    case "url":
      return { url: typeof value === "string" && value ? value : null };
    case "date":
      return typeof value === "string" && value ? { date: { start: value } } : { date: null };
    case "select":
      return typeof value === "string" && value
        ? { select: { name: value.slice(0, 100) } }
        : { select: null };
    case "multi_select":
      return {
        multi_select: Array.isArray(value)
          ? Array.from(
              new Set(
                value
                  .filter((item): item is string => typeof item === "string" && Boolean(item.trim()))
                  .map((item) => item.trim().replaceAll(",", " ").slice(0, 100)),
              ),
            )
              .slice(0, 20)
              .map((name) => ({ name }))
          : [],
      };
    default:
      return null;
  }
}

function conversationProperties(
  schema: NotionPropertySchema,
  values: NotionConversationValues,
) {
  const properties: Record<string, NotionPropertyValue> = {};

  function set(candidates: string[], value: unknown, include = true) {
    if (!include) return;
    const name = candidates.find((candidate) => schema[candidate]);
    if (!name) return;
    const converted = propertyValue(schema[name].type, value);
    if (converted) properties[name] = converted;
  }

  const { analysis, leadDetails, usage } = values;
  const improvements = [
    ...analysis.knowledgeGaps.map((gap) => `Knowledge gap: ${gap}`),
    ...analysis.improvements.map((improvement) => `Improvement: ${improvement}`),
  ].join("\n");

  set(["Conversation ID"], values.conversationId);
  set(["Website"], values.website);
  set(["Session ID"], values.sessionId);
  set(["Model"], values.model);
  set(["Conversation Duration (s)", "Conversation Duration"], values.durationSeconds);
  set(["User Messages"], values.userMessages);
  set(["Assistant Messages"], values.assistantMessages);
  set(["Business"], leadDetails.businessName ?? analysis.business, Boolean(leadDetails.businessName ?? analysis.business));
  set(["Industry"], leadDetails.industry ?? analysis.industry, Boolean(leadDetails.industry ?? analysis.industry));
  set(["Email"], leadDetails.email, Boolean(leadDetails.email));
  set(["User Name"], leadDetails.userName, Boolean(leadDetails.userName));
  set(["Service Interest"], analysis.serviceInterest, analysis.serviceInterest.length > 0);
  set(["Recommended Service"], analysis.recommendedService, Boolean(analysis.recommendedService));
  set(["Qualified Lead"], analysis.qualifiedLead);
  set(["Lead Score"], analysis.leadScore);
  set(["Strategy Call Recommended"], analysis.strategyCallRecommended);
  set(["Input Tokens", "Prompt Tokens"], usage.promptTokens);
  set(["Output Tokens", "Completion Tokens"], usage.completionTokens);
  set(["Estimated Cost (USD)", "Estimated Cost"], usage.estimatedCost);
  set(["Outcome"], analysis.outcome);
  set(["Summary"], analysis.summary, values.refreshSummary);
  set(["Improvements Identified"], improvements, Boolean(improvements));
  set(["Tags"], analysis.tags, analysis.tags.length > 0);

  return properties;
}

function buildValues(input: SyncExchangeInput | FinalizeInput): NotionConversationValues {
  const completedAt = "exchange" in input ? input.exchange.completedAt : new Date().toISOString();
  const userMessages = input.messages.filter((message) => message.role === "user").length;
  const assistantMessages = input.messages.filter((message) => message.role === "assistant").length;
  const started = Date.parse(input.startedAt);
  const completed = Date.parse(completedAt);

  return {
    conversationId: input.sessionId,
    sessionId: input.sessionId,
    startedAt: input.startedAt,
    completedAt,
    website: input.website,
    model: "exchange" in input ? input.exchange.model : input.model,
    userMessages,
    assistantMessages,
    durationSeconds:
      Number.isNaN(started) || Number.isNaN(completed)
        ? 0
        : Math.max(0, Math.round((completed - started) / 1000)),
    usage: input.cumulativeUsage,
    analysis: input.analysis,
    leadDetails: input.leadDetails,
    refreshSummary: input.final || (userMessages > 0 && userMessages % 3 === 0),
  };
}

async function listPageBlocks(pageId: string) {
  const notion = getNotionClient();
  const blocks: BlockObjectResponse[] = [];
  let startCursor: string | undefined;

  do {
    const response = await withNotionRetry(() =>
      notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: startCursor,
      }),
    );
    blocks.push(...response.results.filter(isFullBlock));
    startCursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (startCursor);

  return blocks;
}

async function createConversationPage(input: SyncExchangeInput, values: NotionConversationValues) {
  const notion = getNotionClient();
  const dataSource = await getNotionDataSource();
  const properties = conversationProperties(dataSource.schema, values);

  return withNotionRetry<PageObjectResponse | PartialPageObjectResponse>(
    () =>
      notion.pages.create({
        parent: { type: "data_source_id", data_source_id: dataSource.id },
        properties,
        children: buildInitialPageBlocks(values, input.exchange),
      }),
    {
      recover: async () => {
        const existing = await findPageBySession(input.sessionId);
        return existing
          ? { recovered: true as const, value: existing }
          : { recovered: false as const };
      },
    },
  );
}

async function appendExchange(pageId: string, exchange: ConversationExchange) {
  const notion = getNotionClient();
  let blocks = await listPageBlocks(pageId);
  if (hasExchangeMarker(blocks, exchange.exchangeId)) {
    return true;
  }

  const anchor = findTranscriptInsertionAnchor(blocks);
  if (!anchor) {
    throw new Error("The Notion conversation page is missing its Full Conversation section.");
  }

  await withNotionRetry(
    () =>
      notion.blocks.children.append({
        block_id: pageId,
        children: buildTranscriptBlocks(exchange),
        position: { type: "after_block", after_block: { id: anchor } },
      }),
    {
      recover: async () => {
        blocks = await listPageBlocks(pageId);
        return hasExchangeMarker(blocks, exchange.exchangeId)
          ? { recovered: true as const, value: undefined }
          : { recovered: false as const };
      },
    },
  );

  return false;
}

async function updatePageContent(pageId: string, values: NotionConversationValues) {
  const notion = getNotionClient();
  const blocks = await listPageBlocks(pageId);
  const analysisBlock = findSectionContentBlock(blocks, "Conversation Analysis");
  const usageBlock = findSectionContentBlock(blocks, "Usage");
  const summaryBlock = values.refreshSummary
    ? findSectionContentBlock(blocks, "Summary")
    : undefined;

  const updates: Array<Promise<unknown>> = [];
  if (analysisBlock) {
    updates.push(
      withNotionRetry(() =>
        notion.blocks.update({
          block_id: analysisBlock.id,
          paragraph: { rich_text: notionRichText(formatAnalysis(values)).slice(0, 100) },
        }),
      ),
    );
  }
  if (usageBlock) {
    updates.push(
      withNotionRetry(() =>
        notion.blocks.update({
          block_id: usageBlock.id,
          paragraph: {
            rich_text: notionRichText(
              formatUsage(
                values.usage,
                values.userMessages,
                values.assistantMessages,
                values.durationSeconds,
              ),
            ).slice(0, 100),
          },
        }),
      ),
    );
  }
  if (summaryBlock) {
    updates.push(
      withNotionRetry(() =>
        notion.blocks.update({
          block_id: summaryBlock.id,
          paragraph: { rich_text: notionRichText(values.analysis.summary).slice(0, 100) },
        }),
      ),
    );
  }

  await Promise.all(updates);
}

async function updatePageProperties(pageId: string, values: NotionConversationValues) {
  const notion = getNotionClient();
  const dataSource = await getNotionDataSource();
  await withNotionRetry(() =>
    notion.pages.update({
      page_id: pageId,
      properties: conversationProperties(dataSource.schema, values),
    }),
  );
}

async function syncConversationExchangeUnlocked(input: SyncExchangeInput): Promise<NotionSyncResult> {
  const values = buildValues(input);
  const page = await findConversationPage(input.sessionId, input.notionPageId);

  if (!page) {
    const created = await createConversationPage(input, values);
    return { pageId: created.id, duplicate: false };
  }

  const duplicate = await appendExchange(page.id, input.exchange);
  await Promise.all([
    updatePageProperties(page.id, values),
    updatePageContent(page.id, values),
  ]);

  return { pageId: page.id, duplicate };
}

export function syncConversationExchange(input: SyncExchangeInput): Promise<NotionSyncResult> {
  return withSessionLock(input.sessionId, () => syncConversationExchangeUnlocked(input));
}

async function finalizeConversationPageUnlocked(
  input: FinalizeInput,
): Promise<NotionSyncResult | null> {
  const page = await findConversationPage(input.sessionId, input.notionPageId);
  if (!page) {
    return null;
  }

  const values = buildValues({ ...input, final: true });
  await Promise.all([
    updatePageProperties(page.id, values),
    updatePageContent(page.id, values),
  ]);

  return { pageId: page.id, duplicate: false };
}

export function finalizeConversationPage(
  input: FinalizeInput,
): Promise<NotionSyncResult | null> {
  return withSessionLock(input.sessionId, () => finalizeConversationPageUnlocked(input));
}
