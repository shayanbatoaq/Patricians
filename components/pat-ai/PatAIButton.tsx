"use client";

import Link from "next/link";

import { Bot } from "lucide-react";

type PatAIButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function PatAIButton({ onClick, className }: PatAIButtonProps) {
  return (
    <Link
      href="/pat-ai"
      onClick={onClick}
      className={className}
      aria-label="Open Pat AI"
    >
      <span className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full p-[1px] shadow-[0_0_0_rgba(17,94,212,0)] transition-all duration-300 hover:shadow-[0_18px_44px_-24px_rgba(124,58,237,0.62)]">
        <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#115ed4_0%,#7c3aed_52%,#8ab8ff_100%)]" />
        <span className="relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/92 px-4 py-2.5 text-sm font-semibold text-[var(--brand-700)] transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
          <Bot className="h-4 w-4" />
          Pat AI
        </span>
      </span>
    </Link>
  );
}
