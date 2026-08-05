import { normalizeUsageMetrics } from "@/lib/openrouterMetrics";
import type {
  ConversationFinalizeRequest,
  ConversationLogRequest,
  ExplicitLeadDetails,
} from "@/types/analytics";
import type { ChatMessage } from "@/types/chat";

const COMPLETION_REASONS = new Set([
  "strategy-call-requested",
  "contact-submitted",
  "inactivity",
  "widget-closed",
  "new-conversation",
]);

function stringValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isoDate(value: unknown) {
  const string = stringValue(value, 50);
  return string && !Number.isNaN(Date.parse(string)) ? string : "";
}

function parseMessage(value: unknown): ChatMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as Record<string, unknown>;
  const id = stringValue(message.id, 120);
  const role = message.role;
  const content = typeof message.content === "string" ? message.content.slice(0, 20_000) : "";
  const createdAt = isoDate(message.createdAt);

  if (!id || (role !== "user" && role !== "assistant") || !content.trim() || !createdAt) {
    return null;
  }

  return { id, role, content, createdAt };
}

function parseMessages(value: unknown) {
  if (!Array.isArray(value) || value.length > 100) return null;
  const messages = value.map(parseMessage);
  return messages.every((message): message is ChatMessage => Boolean(message)) ? messages : null;
}

function parseLeadDetails(value: unknown): Partial<ExplicitLeadDetails> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;

  return {
    userName: stringValue(record.userName, 160) || null,
    email: stringValue(record.email, 320) || null,
    phone: stringValue(record.phone, 80) || null,
    businessName: stringValue(record.businessName, 200) || null,
    industry: stringValue(record.industry, 160) || null,
    budget: stringValue(record.budget, 160) || null,
    timeline: stringValue(record.timeline, 160) || null,
  };
}

function parseBase(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const loggingToken = stringValue(record.loggingToken, 2000);
  const sessionId = stringValue(record.sessionId, 120);
  const notionPageId = stringValue(record.notionPageId, 120) || null;
  const startedAt = isoDate(record.startedAt);
  const website = stringValue(record.website, 500);
  const messages = parseMessages(record.messages);

  if (!loggingToken || !sessionId || !startedAt || !website || !messages) return null;

  return {
    loggingToken,
    sessionId,
    notionPageId,
    startedAt,
    website,
    messages,
    cumulativeUsage: normalizeUsageMetrics(record.cumulativeUsage),
    contactDetails: parseLeadDetails(record.contactDetails),
  };
}

export function parseConversationLogRequest(value: unknown): ConversationLogRequest | null {
  const base = parseBase(value);
  if (!base || !value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const exchangeValue = record.exchange;
  if (!exchangeValue || typeof exchangeValue !== "object") return null;
  const exchangeRecord = exchangeValue as Record<string, unknown>;
  const exchangeId = stringValue(exchangeRecord.exchangeId, 120);
  const userMessage = parseMessage(exchangeRecord.userMessage);
  const assistantMessage = parseMessage(exchangeRecord.assistantMessage);
  const model = stringValue(exchangeRecord.model, 160);
  const completedAt = isoDate(exchangeRecord.completedAt);
  const completionReason = stringValue(record.completionReason, 80);

  if (
    !exchangeId ||
    !userMessage ||
    userMessage.role !== "user" ||
    !assistantMessage ||
    assistantMessage.role !== "assistant" ||
    !model ||
    !completedAt ||
    (completionReason && !COMPLETION_REASONS.has(completionReason)) ||
    !base.messages.some((message) => message.id === userMessage.id) ||
    !base.messages.some((message) => message.id === assistantMessage.id)
  ) {
    return null;
  }

  return {
    ...base,
    exchange: {
      exchangeId,
      userMessage,
      assistantMessage,
      model,
      completedAt,
      usage: normalizeUsageMetrics(exchangeRecord.usage),
    },
    finalize: record.finalize === true,
    completionReason: completionReason
      ? (completionReason as ConversationLogRequest["completionReason"])
      : undefined,
  };
}

export function parseConversationFinalizeRequest(
  value: unknown,
): ConversationFinalizeRequest | null {
  const base = parseBase(value);
  if (!base || !value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const model = stringValue(record.model, 160);
  const completionReason = stringValue(record.completionReason, 80);

  if (!model || !COMPLETION_REASONS.has(completionReason)) return null;

  return {
    ...base,
    model,
    completionReason: completionReason as ConversationFinalizeRequest["completionReason"],
  };
}

