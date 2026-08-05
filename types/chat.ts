export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: Exclude<ChatRole, "system">;
  content: string;
  createdAt: string;
};

export type ChatApiMessage = {
  id?: string;
  role: Exclude<ChatRole, "system">;
  content: string;
  createdAt?: string;
};

export type ChatApiRequest = {
  sessionId?: string;
  exchangeId?: string;
  messages: ChatApiMessage[];
};

export type ChatApiResponse = {
  message: string;
  messageId?: string;
  model?: string;
  usage?: import("@/types/analytics").UsageMetrics;
  loggingToken?: string;
  suggestedActions?: string[];
  error?: string;
};
