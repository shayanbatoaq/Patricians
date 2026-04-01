import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)] shadow-sm">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>
        <p className="max-w-3xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
