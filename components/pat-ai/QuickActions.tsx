"use client";

import { Bot, Calendar, MessagesSquare, Rocket, ShoppingBag, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export const patAIQuickActions = [
  { label: "Explore Services", prompt: "Show me Patricians services.", icon: Sparkles },
  { label: "Website Pricing", prompt: "What are your website packages and pricing?", icon: Rocket },
  { label: "AI Website Assistants", prompt: "Tell me about AI website assistants for my website.", icon: MessagesSquare },
  { label: "AI Automation", prompt: "How can AI automation help my business?", icon: Bot },
  { label: "E-Commerce Website", prompt: "I need an e-commerce website. What do you recommend?", icon: ShoppingBag },
  { label: "Contact Patricians", prompt: "How can I contact Patricians or book a strategy call?", icon: Calendar },
] as const;

type QuickActionsProps = {
  actions?: ReadonlyArray<{ label: string; prompt?: string }>;
  onSelect: (prompt: string) => void;
  compact?: boolean;
  className?: string;
};

export function QuickActions({
  actions = patAIQuickActions,
  onSelect,
  compact = false,
  className,
}: QuickActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {actions.map((action) => {
        const defaultAction = patAIQuickActions.find(
          (item) => item.label === action.label,
        );
        const Icon = defaultAction?.icon ?? Sparkles;
        const prompt = action.prompt ?? defaultAction?.prompt ?? action.label;

        return (
          <button
            key={action.label}
            type="button"
            onClick={() => onSelect(prompt)}
            className={cn(
              "group inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-white/88 font-semibold text-[var(--foreground)] shadow-[0_12px_34px_-26px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2",
              compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
