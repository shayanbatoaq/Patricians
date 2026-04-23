export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: Exclude<ChatRole, "system">;
  content: string;
  createdAt: string;
};

export type ChatApiMessage = {
  role: Exclude<ChatRole, "system">;
  content: string;
};

export type ChatApiRequest = {
  messages: ChatApiMessage[];
};

export type ChatApiResponse = {
  message: string;
  suggestedActions?: string[];
  error?: string;
};
