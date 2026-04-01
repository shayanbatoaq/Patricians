import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(244,248,255,0.98)_0%,rgba(255,255,255,0.98)_55%,rgba(247,249,252,0.98)_100%)] pt-32",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(17,94,212,0.26),transparent)]" />
      <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,175,255,0.22),transparent_68%)] blur-3xl" />
      <Container className="relative pb-20 pt-4 sm:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="space-y-7">
            {eyebrow ? (
              <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)] shadow-sm">
                {eyebrow}
              </span>
            ) : null}
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                {description}
              </p>
            </div>
            {(primaryAction ?? secondaryAction) ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                {primaryAction ? (
                  <Button href={primaryAction.href} variant={primaryAction.variant}>
                    {primaryAction.label}
                  </Button>
                ) : null}
                {secondaryAction ? (
                  <Button
                    href={secondaryAction.href}
                    variant={secondaryAction.variant ?? "secondary"}
                  >
                    {secondaryAction.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Reveal>

          {children ? <Reveal delay={0.1}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
