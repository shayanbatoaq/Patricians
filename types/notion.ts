import type { ConversationAnalysis, ExplicitLeadDetails, UsageMetrics } from "@/types/analytics";

export type NotionPropertyType =
  | "title"
  | "rich_text"
  | "number"
  | "select"
  | "multi_select"
  | "checkbox"
  | "email"
  | "phone_number"
  | "date"
  | "url"
  | "created_time"
  | string;

export type NotionPropertySchema = Record<
  string,
  { id: string; name: string; type: NotionPropertyType }
>;

export type NotionConversationValues = {
  conversationId: string;
  sessionId: string;
  startedAt: string;
  completedAt: string;
  website: string;
  model: string;
  userMessages: number;
  assistantMessages: number;
  durationSeconds: number;
  usage: UsageMetrics;
  analysis: ConversationAnalysis;
  leadDetails: ExplicitLeadDetails;
  refreshSummary: boolean;
};

export type NotionSyncResult = {
  pageId: string;
  duplicate: boolean;
};

