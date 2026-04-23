"use client";

import { motion } from "framer-motion";

import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[84%] rounded-[1.2rem] px-4 py-3 text-sm leading-6 shadow-sm",
          isUser
            ? "rounded-br-md bg-[var(--brand-600)] text-white shadow-[0_14px_34px_-22px_rgba(17,94,212,0.78)]"
            : "rounded-bl-md border border-[var(--border)] bg-white text-[var(--foreground)]",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
