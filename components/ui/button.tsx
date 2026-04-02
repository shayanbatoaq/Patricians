import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "light" | "lightGhost";
  style?: CSSProperties;
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
type ButtonVariant = NonNullable<SharedProps["variant"]>;

const variants: Record<
  ButtonVariant,
  { className: string; style?: CSSProperties }
> = {
  primary: {
    className:
      "bg-[var(--brand-600)] text-white shadow-[0_16px_40px_-18px_rgba(17,94,212,0.7)] hover:bg-[var(--brand-700)] hover:text-white",
    style: { color: "#ffffff" },
  },
  secondary: {
    className:
      "border border-[var(--border-strong)] bg-white/90 text-[var(--foreground)] hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)]",
  },
  ghost: {
    className: "text-[var(--foreground)] hover:bg-white/70",
  },
  light: {
    className:
      "border border-white/70 bg-white shadow-[0_18px_44px_-24px_rgba(15,23,42,0.28)] hover:border-white hover:bg-[var(--brand-50)]",
    style: { color: "var(--foreground)" },
  },
  lightGhost: {
    className:
      "border border-white/22 bg-white/10 shadow-[0_16px_40px_-28px_rgba(8,45,134,0.32)] hover:border-white/38 hover:bg-white/16",
    style: { color: "#ffffff" },
  },
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2";

export function Button({
  children,
  className: classNameProp,
  variant = "primary",
  style: styleProp,
  ...props
}: ButtonProps) {
  const className = cn(
    baseClassName,
    variants[variant].className,
    classNameProp,
  );
  const style = variants[variant].style
    ? { ...variants[variant].style, ...styleProp }
    : styleProp;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...rest } = props;

    return (
      <Link href={href} className={className} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  const { type, ...rest } = props;

  return (
    <button type={type ?? "button"} className={className} style={style} {...rest}>
      {children}
    </button>
  );
}
