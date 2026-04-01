"use client";

import { createElement } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { getSiteIcon } from "@/components/icons/site-icon";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: string;
  focus?: string[];
  className?: string;
};

export function ServiceCard({
  title,
  description,
  href,
  icon,
  focus = [],
  className,
}: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={cn(
        "group h-full rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.26)] transition-shadow duration-300 hover:shadow-[0_28px_90px_-44px_rgba(17,94,212,0.32)]",
        className,
      )}
    >
      <Link href={href} className="flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--brand-100)] bg-[var(--brand-50)] text-[var(--brand-700)]">
            {createElement(getSiteIcon(icon), { className: "h-5 w-5" })}
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition-colors duration-200 group-hover:border-[var(--brand-200)] group-hover:text-[var(--brand-700)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            {title}
          </h3>
          <p className="text-sm leading-7 text-[var(--muted-foreground)] sm:text-[0.98rem]">
            {description}
          </p>
        </div>

        {focus.length ? (
          <ul className="mt-auto flex flex-wrap gap-2">
            {focus.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </motion.article>
  );
}
