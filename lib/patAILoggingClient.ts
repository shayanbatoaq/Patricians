import { savePatAISession, type PatAISession } from "@/lib/patAISession";
import type {
  ConversationCompletionReason,
  ConversationFinalizeRequest,
  ConversationLogRequest,
  ConversationLogResponse,
  ExplicitLeadDetails,
} from "@/types/analytics";

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
}

async function postWithRetry(path: string, payload: unknown) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      const result = (await response.json().catch(() => null)) as ConversationLogResponse | null;
      if (response.ok && result?.ok) return result;
      if (![429, 500, 502, 503, 504].includes(response.status)) {
        throw new Error(result?.error ?? `Logging request failed with ${response.status}.`);
      }
      lastError = new Error(result?.error ?? `Logging request failed with ${response.status}.`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < 2) {
      await delay(350 * 2 ** attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Pat AI logging failed.");
}

export async function logPatAIExchange(payload: ConversationLogRequest) {
  return postWithRetry("/api/pat-ai/log", payload);
}

export async function finalizePatAISession(
  session: PatAISession,
  completionReason: ConversationCompletionReason,
  contactDetails?: Partial<ExplicitLeadDetails>,
) {
  if (
    session.messages.length === 0 ||
    !session.loggingToken ||
    !session.messages.some((message) => message.role === "assistant")
  ) {
    return null;
  }

  const payload: ConversationFinalizeRequest = {
    loggingToken: session.loggingToken,
    sessionId: session.sessionId,
    notionPageId: session.notionPageId,
    startedAt: session.startedAt,
    website: window.location.origin,
    messages: session.messages,
    cumulativeUsage: session.usage,
    model: session.model,
    completionReason,
    contactDetails,
  };
  const result = await postWithRetry("/api/pat-ai/finalize", payload);

  const currentSession = readCurrentSession(session.sessionId);
  if (currentSession) {
    const updated = {
      ...currentSession,
      notionPageId: result.notionPageId ?? currentSession.notionPageId,
      finalizedAt: new Date().toISOString(),
    };
    savePatAISession(updated);
  }

  return result;
}

function readCurrentSession(sessionId: string) {
  try {
    const raw = window.localStorage.getItem("pat-ai:conversation-session:v1");
    const value = raw ? (JSON.parse(raw) as PatAISession) : null;
    return value?.sessionId === sessionId ? value : null;
  } catch {
    return null;
  }
}

