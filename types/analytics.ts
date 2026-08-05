import type { ChatMessage } from "@/types/chat";

export type UsageMetrics = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
};

export type ConversationOutcome =
  | "In Progress"
  | "Qualified Lead"
  | "Strategy Call Requested"
  | "Contact Submitted"
  | "Knowledge Gap"
  | "Out of Scope"
  | "Completed";

export type ConversationAnalysis = {
  summary: string;
  business: string | null;
  industry: string | null;
  serviceInterest: string[];
  recommendedService: string | null;
  qualifiedLead: boolean;
  leadScore: number;
  strategyCallRecommended: boolean;
  outcome: ConversationOutcome;
  tags: string[];
  knowledgeGaps: string[];
  improvements: string[];
};

export type ExplicitLeadDetails = {
  userName: string | null;
  email: string | null;
  phone: string | null;
  businessName: string | null;
  industry: string | null;
  budget: string | null;
  timeline: string | null;
};

export type ConversationExchange = {
  exchangeId: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  usage: UsageMetrics;
  model: string;
  completedAt: string;
};

export type ConversationCompletionReason =
  | "strategy-call-requested"
  | "contact-submitted"
  | "inactivity"
  | "widget-closed"
  | "new-conversation";

export type ConversationLogRequest = {
  loggingToken: string;
  sessionId: string;
  notionPageId?: string | null;
  startedAt: string;
  website: string;
  messages: ChatMessage[];
  exchange: ConversationExchange;
  cumulativeUsage: UsageMetrics;
  finalize?: boolean;
  completionReason?: ConversationCompletionReason;
  contactDetails?: Partial<ExplicitLeadDetails>;
};

export type ConversationFinalizeRequest = Omit<
  ConversationLogRequest,
  "exchange" | "finalize"
> & {
  model: string;
  completionReason: ConversationCompletionReason;
};

export type ConversationLogResponse = {
  ok: boolean;
  notionPageId?: string;
  duplicate?: boolean;
  error?: string;
};
