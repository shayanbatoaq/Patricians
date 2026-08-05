"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, ExternalLink, Send, X } from "lucide-react";

import { MessageBubble } from "@/components/pat-ai/MessageBubble";
import { QuickActions, patAIQuickActions } from "@/components/pat-ai/QuickActions";
import { contactDetails } from "@/data/site";
import { logPatAIExchange, finalizePatAISession } from "@/lib/patAILoggingClient";
import {
  createPatAISession,
  isPatAISessionInactive,
  PAT_AI_INACTIVITY_MS,
  readPatAISession,
  savePatAISession,
  type PatAISession,
} from "@/lib/patAISession";
import { addUsageMetrics, EMPTY_USAGE_METRICS } from "@/lib/openrouterMetrics";
import { cn } from "@/lib/utils";
import type {
  ConversationCompletionReason,
  ConversationLogRequest,
} from "@/types/analytics";
import type { ChatApiResponse, ChatMessage } from "@/types/chat";

type PatAIChatPanelProps = {
  mode?: "widget" | "page";
  onClose?: () => void;
  className?: string;
  draftPrompt?: { value: string; id: number } | null;
};

const fallbackMessage =
  "I can help with services, pricing, timelines, and the best next step for your business.";

const suggestedActionPrompts: Record<string, string> = {
  "View Website Package": "Show me the website packages and help me choose one.",
  "View Website Assistant Plans": "Show me the website assistant plans and recommend the right one.",
  "View Marketing Plans": "Show me the Meta marketing plans and recommend one.",
  "Discuss Automation": "I want to discuss AI automation for my business.",
  "Discuss Mobile App": "I want to discuss an AI-enhanced mobile app MVP.",
  "Book a Strategy Call": "I want to book a strategy call with Patricians.",
  "Contact Patricians": "How can I contact Patricians?",
};

function createMessage(
  role: ChatMessage["role"],
  content: string,
  id = crypto.randomUUID(),
): ChatMessage {
  return {
    id,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function PatAIChatPanel({
  mode = "widget",
  onClose,
  className,
  draftPrompt,
}: PatAIChatPanelProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<
    Array<{ label: string; prompt?: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const sessionRef = useRef<PatAISession | null>(null);
  const loggingQueueRef = useRef<Promise<void>>(Promise.resolve());
  const isPage = mode === "page";

  const enqueueFinalization = useCallback(
    (session: PatAISession, reason: ConversationCompletionReason) => {
      loggingQueueRef.current = loggingQueueRef.current
        .catch(() => undefined)
        .then(async () => {
          try {
            const result = await finalizePatAISession(session, reason);
            if (sessionRef.current?.sessionId === session.sessionId) {
              const updated = {
                ...sessionRef.current,
                notionPageId: result?.notionPageId ?? sessionRef.current.notionPageId,
                finalizedAt: new Date().toISOString(),
              };
              sessionRef.current = updated;
              savePatAISession(updated);
            }
          } catch (error) {
            console.error("Pat AI finalization failed", error);
          }
        });
    },
    [],
  );

  const enqueueExchangeLog = useCallback((payload: ConversationLogRequest) => {
    loggingQueueRef.current = loggingQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        try {
          const result = await logPatAIExchange(payload);
          if (sessionRef.current?.sessionId === payload.sessionId) {
            const updated = {
              ...sessionRef.current,
              notionPageId: result.notionPageId ?? sessionRef.current.notionPageId,
            };
            sessionRef.current = updated;
            savePatAISession(updated);
          }
        } catch (error) {
          console.error("Pat AI exchange logging failed", error);
        }
      });
  }, []);

  const visibleActions = useMemo(() => {
    if (suggestedActions.length > 0) {
      return suggestedActions;
    }

    return patAIQuickActions;
  }, [suggestedActions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  useEffect(() => {
    const storedSession = readPatAISession();
    let activeSession = storedSession ?? createPatAISession();

    if (storedSession && isPatAISessionInactive(storedSession)) {
      enqueueFinalization(storedSession, "inactivity");
      activeSession = createPatAISession();
    }

    sessionRef.current = activeSession;
    savePatAISession(activeSession);
    setMessages(activeSession.messages);

    const startNewConversation = () => {
      const current = sessionRef.current;
      if (current) enqueueFinalization(current, "new-conversation");
      const next = createPatAISession();
      sessionRef.current = next;
      savePatAISession(next);
      setMessages([]);
      setSuggestedActions([]);
    };

    window.addEventListener("pat-ai:new-conversation", startNewConversation);
    return () => {
      window.removeEventListener("pat-ai:new-conversation", startNewConversation);
    };
  }, [enqueueFinalization]);

  useEffect(() => {
    const session = sessionRef.current;
    if (!session || session.messages.length === 0 || !session.loggingToken) return;

    const elapsed = Date.now() - Date.parse(session.lastActivityAt);
    const remaining = Math.max(0, PAT_AI_INACTIVITY_MS - elapsed);
    const timeout = window.setTimeout(() => {
      enqueueFinalization(session, "inactivity");
    }, remaining);

    return () => window.clearTimeout(timeout);
  }, [messages, enqueueFinalization]);

  useEffect(() => {
    if (!draftPrompt) {
      return;
    }

    setInput(draftPrompt.value);
    inputRef.current?.focus();
  }, [draftPrompt]);

  async function sendMessage(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSending) {
      return;
    }

    let session = sessionRef.current ?? readPatAISession() ?? createPatAISession();
    if (isPatAISessionInactive(session)) {
      enqueueFinalization(session, "inactivity");
      session = createPatAISession();
      sessionRef.current = session;
      savePatAISession(session);
    }

    const exchangeId = crypto.randomUUID();
    const userMessage = createMessage("user", trimmedContent);
    const nextMessages = [...session.messages, userMessage];
    const pendingSession: PatAISession = {
      ...session,
      messages: nextMessages,
      lastActivityAt: userMessage.createdAt,
      finalizedAt: null,
    };
    sessionRef.current = pendingSession;
    savePatAISession(pendingSession);
    setMessages(nextMessages);
    setInput("");
    setSuggestedActions([]);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: pendingSession.sessionId,
          exchangeId,
          messages: nextMessages.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
          })),
        }),
      });

      const data = (await response.json()) as ChatApiResponse;
      const assistantMessage = createMessage(
        "assistant",
        data.message || fallbackMessage,
        data.messageId,
      );
      const completedMessages = [...nextMessages, assistantMessage];
      const cumulativeUsage = addUsageMetrics(
        pendingSession.usage,
        data.usage ?? EMPTY_USAGE_METRICS,
      );
      const completedSession: PatAISession = {
        ...pendingSession,
        messages: completedMessages,
        usage: cumulativeUsage,
        model: data.model ?? pendingSession.model,
        loggingToken: data.loggingToken ?? pendingSession.loggingToken,
        lastActivityAt: assistantMessage.createdAt,
      };
      sessionRef.current = completedSession;
      savePatAISession(completedSession);
      setMessages(completedMessages);

      if (data.loggingToken) {
        const strategyCallRequested =
          /\b(?:book|schedule|arrange|request|want|need)\b.{0,30}\b(?:strategy\s+)?call\b/i.test(
            trimmedContent,
          );
        enqueueExchangeLog({
          loggingToken: data.loggingToken,
          sessionId: completedSession.sessionId,
          notionPageId: completedSession.notionPageId,
          startedAt: completedSession.startedAt,
          website: window.location.origin,
          messages: completedMessages,
          exchange: {
            exchangeId,
            userMessage,
            assistantMessage,
            usage: data.usage ?? { ...EMPTY_USAGE_METRICS },
            model: data.model ?? completedSession.model,
            completedAt: assistantMessage.createdAt,
          },
          cumulativeUsage,
          finalize: strategyCallRequested,
          completionReason: strategyCallRequested
            ? "strategy-call-requested"
            : undefined,
        });
      }

      if (data.suggestedActions?.length) {
        setSuggestedActions(
          data.suggestedActions.map((label) => ({
            label,
            prompt:
              suggestedActionPrompts[label] ??
              patAIQuickActions.find((action) => action.label === label)?.prompt ??
              label,
          })),
        );
      }
    } catch {
      const assistantMessage = createMessage(
        "assistant",
        "I could not connect right now. You can still contact Patricians directly or book a strategy call.",
      );
      const failedMessages = [...nextMessages, assistantMessage];
      const failedSession: PatAISession = {
        ...(sessionRef.current ?? pendingSession),
        messages: failedMessages,
        lastActivityAt: assistantMessage.createdAt,
      };
      sessionRef.current = failedSession;
      savePatAISession(failedSession);
      setMessages(failedMessages);
      setSuggestedActions([
        { label: "Book a Strategy Call", prompt: "I want to book a strategy call." },
        { label: "Contact Patricians", prompt: "How can I contact Patricians?" },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-hidden border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,249,255,0.98)_100%)] shadow-[0_28px_90px_-44px_rgba(8,45,134,0.45)]",
        isPage
          ? "h-[calc(100svh-6rem)] rounded-none border-x-0 sm:h-[calc(100svh-7.5rem)] sm:rounded-[1.6rem] sm:border-x lg:h-[min(760px,calc(100svh-9rem))]"
          : "h-full rounded-t-[1.7rem] sm:rounded-[1.7rem]",
        className,
      )}
      aria-label="Pat AI chat panel"
    >
      <header className="shrink-0 border-b border-[var(--border)] bg-white/82 px-4 py-4 backdrop-blur-xl sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#115ed4_0%,#7c3aed_100%)] text-white shadow-[0_14px_38px_-20px_rgba(17,94,212,0.85)]">
              <Bot className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                Pat AI
              </h2>
              <p className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Patricians AI Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPage ? (
              <button
                type="button"
                onClick={() => router.push("/pat-ai")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-foreground)] transition-all duration-200 hover:border-[var(--brand-300)] hover:text-[var(--brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)]"
                aria-label="Open Pat AI full page"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            ) : null}
            {onClose ? (
              <button
                type="button"
                onClick={() => {
                  if (sessionRef.current) {
                    enqueueFinalization(sessionRef.current, "widget-closed");
                  }
                  onClose();
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-foreground)] transition-all duration-200 hover:border-[var(--brand-300)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)]"
                aria-label="Close Pat AI"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="rounded-[1.4rem] border border-[var(--border)] bg-white p-5 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.28)]">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Hi, I&apos;m Pat AI. I can help you with services, pricing, and AI
                solutions.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                Tell me what you want to build or improve, and I&apos;ll point you
                toward the right Patricians service.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted-foreground)]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-semibold text-[var(--brand-700)] hover:text-[var(--brand-600)]"
                >
                  Book a Strategy Call
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <span aria-hidden>|</span>
                <a
                  href={contactDetails.email.href}
                  className="font-semibold text-[var(--brand-700)] hover:text-[var(--brand-600)]"
                >
                  Contact Patricians
                </a>
              </div>
            </div>
            <QuickActions onSelect={sendMessage} compact={!isPage} />
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <AnimatePresence>
              {isSending ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex justify-start"
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-2 w-2 rounded-full bg-[var(--brand-500)]"
                        animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: dot * 0.12,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!isSending && visibleActions.length > 0 ? (
              <QuickActions
                actions={visibleActions}
                onSelect={sendMessage}
                compact
                className="pt-1"
              />
            ) : null}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-[var(--border)] bg-white/90 p-3 backdrop-blur-xl sm:p-4"
      >
        <div className="flex items-end gap-2 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-alt)] p-2 transition-colors duration-200 focus-within:border-[var(--brand-300)]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void sendMessage(input);
              }
            }}
            rows={1}
            placeholder="Ask about websites, automation, pricing..."
            className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]/75"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-600)] text-white shadow-[0_12px_30px_-18px_rgba(17,94,212,0.8)] transition-all duration-200 hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </section>
  );
}
