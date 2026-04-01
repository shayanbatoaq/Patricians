"use client";

import { Bot, ChartColumnIncreasing, Sparkles, Waypoints } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

function FloatingCard({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      <motion.div
        className={cn(
          "rounded-[1.7rem] border border-white/60 bg-white/88 p-5 shadow-[0_26px_70px_-40px_rgba(15,23,42,0.3)] backdrop-blur will-change-transform",
          className,
        )}
        animate={
          reduceMotion
            ? { y: 0, rotate: 0 }
            : {
                y: [0, -8, 0, 4, 0],
                rotate: [0, -0.35, 0, 0.2, 0],
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 8.5 + delay,
          ease: "easeInOut",
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          delay: reduceMotion ? 0 : delay + 0.2,
          times: [0, 0.28, 0.56, 0.8, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(140deg,rgba(17,94,212,0.12),rgba(95,160,255,0.02)_40%,rgba(255,255,255,0.7)_100%)] blur-sm" />
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(244,248,255,0.92)_100%)] p-5 shadow-[0_30px_100px_-46px_rgba(15,23,42,0.34)]">
        <div className="absolute -right-8 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.28),transparent_68%)] blur-2xl" />
        <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(17,94,212,0.18),transparent_72%)] blur-xl" />

        <div className="grid gap-4">
          <FloatingCard delay={0.2} className="ml-auto w-[86%]">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Website AI Assistant
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                    Answers product questions, captures intent, and routes serious
                    leads instantly.
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-medium text-[var(--brand-700)]">
                24/7
              </span>
            </div>
          </FloatingCard>

          <div className="grid gap-4 sm:grid-cols-[1fr_1.15fr]">
            <FloatingCard delay={0.7}>
              <div className="space-y-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Waypoints className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Workflow Automation
                  </p>
                  <div className="space-y-2">
                    {["New lead", "Qualify", "Notify team", "Send summary"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]"
                        >
                          <span className="h-2 w-2 rounded-full bg-[var(--brand-500)]" />
                          <span>{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={1.1}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                    <ChartColumnIncreasing className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Growth Layer
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Digital Performance View
                  </p>
                  <div className="grid grid-cols-4 items-end gap-2">
                    {[48, 66, 60, 84].map((height, index) => (
                      <div
                        key={height}
                        className="rounded-full bg-[linear-gradient(180deg,#8ab8ff_0%,#115ed4_100%)]"
                        style={{ height: `${height}px`, opacity: 0.82 + index * 0.04 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-6 text-[var(--muted-foreground)]">
                    A single view across website performance, AI interactions,
                    and campaign momentum.
                  </p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </div>
  );
}
