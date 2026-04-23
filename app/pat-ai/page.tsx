import type { Metadata } from "next";

import Link from "next/link";

import { Bot, Calendar, MessageSquareText, Sparkles, Zap } from "lucide-react";

import { PatAIChatPanel } from "@/components/pat-ai/PatAIChatPanel";
import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pat AI | Patricians AI Assistant",
  description:
    "Chat with Pat AI to explore Patricians services, website pricing, AI automation, chatbots, marketing, and strategy call options.",
  path: "/pat-ai",
  keywords: ["Pat AI", "Patricians chatbot", "Patricians AI assistant"],
});

const suggestedPrompts = [
  "What should I choose for my business?",
  "How much is a website?",
  "Can you build an e-commerce website?",
  "How can automation help my team?",
  "Which chatbot plan fits my website?",
] as const;

export default function PatAIPage() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(124,58,237,0.12),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(17,94,212,0.16),transparent_30%),linear-gradient(180deg,rgba(246,249,255,0.96)_0%,rgba(255,255,255,0.98)_44%,rgba(242,246,252,0.96)_100%)]"
      />
      <Container className="relative max-w-7xl max-sm:px-0 max-sm:pb-0 pb-8 sm:pb-12">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <aside className="hidden min-h-0 flex-col justify-between rounded-[1.7rem] border border-[var(--border)] bg-white/76 p-6 shadow-[0_24px_80px_-48px_rgba(8,45,134,0.34)] backdrop-blur-xl lg:flex">
            <div>
              <div className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-[linear-gradient(135deg,#115ed4_0%,#7c3aed_100%)] text-white shadow-[0_18px_50px_-26px_rgba(17,94,212,0.86)]">
                <Bot className="h-6 w-6" />
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                Pat AI
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">
                A pre-sales assistant for Patricians. Ask about services,
                pricing, timelines, AI automation, chatbots, websites, marketing,
                or mobile app development.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="grid gap-3">
                {[
                  { label: "Services", icon: Sparkles },
                  { label: "Pricing", icon: MessageSquareText },
                  { label: "Lead Fit", icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[1.1rem] border border-[var(--border)] bg-white/82 px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-700)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </div>
                  );
                })}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                  Suggested Prompts
                </p>
                <div className="mt-3 grid gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <div
                      key={prompt}
                      className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-sm leading-6 text-[var(--muted-foreground)]"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-600)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_-24px_rgba(17,94,212,0.74)] transition-all duration-300 hover:bg-[var(--brand-700)]"
              >
                <Calendar className="h-4 w-4" />
                Book a Strategy Call
              </Link>
            </div>
          </aside>

          <div className="min-h-0">
            <PatAIChatPanel mode="page" />
          </div>
        </div>
      </Container>
    </section>
  );
}
