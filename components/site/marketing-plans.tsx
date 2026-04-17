import { ArrowRight, Check, Sparkles } from "lucide-react";

import { getSiteIcon } from "@/components/icons/site-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { socialMediaMarketingPlans } from "@/data/site";
import { cn } from "@/lib/utils";

const scopeTags = [
  "Facebook + Instagram only",
  "Organic content",
  "Reels editing",
  "Meta ads scaling",
] as const;

export function MarketingPlans() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] bg-[linear-gradient(180deg,rgba(243,247,253,0.96)_0%,rgba(255,255,255,0.98)_24%,rgba(245,249,255,0.96)_100%)] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(219,229,242,0.78)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-20 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.16),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-24 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(17,94,212,0.12),transparent_74%)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Meta Social Media Packages"
            className="items-center text-center"
            title="Clear Meta-only social media packages for Facebook and Instagram growth"
            description="Each tier has a distinct purpose, from building your presence to scaling with paid ads, so the right package is easy to understand in seconds."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {scopeTags.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border)] bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)] shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {socialMediaMarketingPlans.map((plan, index) => {
            const Icon = getSiteIcon(plan.icon);
            const revealClassName =
              plan.name === "Momentum"
                ? "xl:col-span-2 xl:col-start-2"
                : plan.name === "Dominion"
                  ? "xl:col-span-2 xl:col-start-4"
                  : "xl:col-span-2";

            return (
              <Reveal
                key={plan.name}
                className={revealClassName}
                delay={0.1 + index * 0.04}
              >
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-[2rem] border p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-2 sm:p-7",
                    plan.featured
                      ? "border-[rgba(17,94,212,0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,247,214,0.95)_100%)] shadow-[0_30px_90px_-42px_rgba(17,94,212,0.34)] xl:-translate-y-3"
                      : plan.accentSoftClassName,
                  )}
                >
                  <div
                    className={cn(
                      "h-1.5 rounded-full bg-gradient-to-r",
                      plan.accentClassName,
                    )}
                  />

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--foreground)] shadow-[0_18px_44px_-28px_rgba(15,23,42,0.22)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {plan.badge ? (
                      <span className="rounded-full border border-[rgba(17,94,212,0.14)] bg-white/92 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)] shadow-sm">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {plan.name}
                    </h3>
                    <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                      {plan.price}
                    </p>
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-[var(--brand-700)]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-white/78 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                      Best for
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {plan.bestFor}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {plan.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 h-px bg-[linear-gradient(90deg,rgba(207,218,232,0.18)_0%,rgba(207,218,232,0.82)_28%,rgba(207,218,232,0.82)_72%,rgba(207,218,232,0.18)_100%)]" />

                  <ul className="mt-6 space-y-3">
                    {plan.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-[var(--muted-foreground)]"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-700)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-white/84 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                      Reels strategy
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {plan.reelsStrategy}
                    </p>
                  </div>

                  <Button href="/contact" className="mt-7 w-full justify-between">
                    {plan.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.34}>
          <div className="mt-8 rounded-[1.8rem] border border-[rgba(17,94,212,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,245,255,0.96)_100%)] p-6 shadow-[0_22px_70px_-42px_rgba(17,94,212,0.18)]">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                  Reels Note
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                  Client provides raw video clips for reels. We handle editing,
                  optimization, and strategy.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
