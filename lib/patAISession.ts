import { EMPTY_USAGE_METRICS } from "@/lib/openrouterMetrics";
import type { UsageMetrics } from "@/types/analytics";
import type { ChatMessage } from "@/types/chat";

export const PAT_AI_INACTIVITY_MS = 10 * 60 * 1000;
export const PAT_AI_SESSION_STORAGE_KEY = "pat-ai:conversation-session:v1";

export type PatAISession = {
  sessionId: string;
  notionPageId: string | null;
  startedAt: string;
  lastActivityAt: string;
  messages: ChatMessage[];
  usage: UsageMetrics;
  model: string;
  loggingToken: string | null;
  finalizedAt: string | null;
};

export function createPatAISession(now = new Date()): PatAISession {
  const timestamp = now.toISOString();
  return {
    sessionId: crypto.randomUUID(),
    notionPageId: null,
    startedAt: timestamp,
    lastActivityAt: timestamp,
    messages: [],
    usage: { ...EMPTY_USAGE_METRICS },
    model: "openai/gpt-5.4-mini",
    loggingToken: null,
    finalizedAt: null,
  };
}

function isMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<ChatMessage>;
  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    typeof message.createdAt === "string"
  );
}

export function readPatAISession(): PatAISession | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(PAT_AI_SESSION_STORAGE_KEY);
    if (!stored) return null;
    const value = JSON.parse(stored) as Partial<PatAISession>;
    if (
      typeof value.sessionId !== "string" ||
      typeof value.startedAt !== "string" ||
      typeof value.lastActivityAt !== "string" ||
      !Array.isArray(value.messages) ||
      !value.messages.every(isMessage)
    ) {
      return null;
    }

    return {
      sessionId: value.sessionId,
      notionPageId: typeof value.notionPageId === "string" ? value.notionPageId : null,
      startedAt: value.startedAt,
      lastActivityAt: value.lastActivityAt,
      messages: value.messages.slice(-100),
      usage: {
        promptTokens: Number(value.usage?.promptTokens) || 0,
        completionTokens: Number(value.usage?.completionTokens) || 0,
        totalTokens: Number(value.usage?.totalTokens) || 0,
        estimatedCost: Number(value.usage?.estimatedCost) || 0,
      },
      model: typeof value.model === "string" ? value.model : "openai/gpt-5.4-mini",
      loggingToken: typeof value.loggingToken === "string" ? value.loggingToken : null,
      finalizedAt: typeof value.finalizedAt === "string" ? value.finalizedAt : null,
    };
  } catch {
    return null;
  }
}

export function savePatAISession(session: PatAISession) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(PAT_AI_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Pat AI session could not be persisted", error);
  }
}

export function isPatAISessionInactive(session: PatAISession, now = Date.now()) {
  const lastActivity = Date.parse(session.lastActivityAt);
  return !Number.isNaN(lastActivity) && now - lastActivity >= PAT_AI_INACTIVITY_MS;
}

