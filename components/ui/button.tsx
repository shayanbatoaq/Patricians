import type { ButtonHTMLAttributes, ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ActionButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | ActionButtonProps;

function isLinkButton(props: ButtonProps): props is LinkButtonProps {
  return "href" in props && typeof props.href === "string";
}

const variants = {
  primary:
    "bg-[var(--brand-600)] text-white shadow-[0_16px_40px_-18px_rgba(17,94,212,0.7)] hover:bg-[var(--brand-700)]",
  secondary:
    "border border-[var(--border-strong)] bg-white/90 text-[var(--foreground)] hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)]",
  ghost:
    "text-[var(--foreground)] hover:bg-white/70",
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2";

export function Button(props: ButtonProps) {
  const className = cn(
    baseClassName,
    variants[props.variant ?? "primary"],
    props.className,
  );

  if (isLinkButton(props)) {
    const { href, children, ...rest } = props;

    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, type, ...rest } = props;

  return (
    <button type={type ?? "button"} className={className} {...rest}>
      {children}
    </button>
  );
}
