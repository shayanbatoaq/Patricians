import { ArrowRight, Check, Sparkles } from "lucide-react";

import { getSiteIcon } from "@/components/icons/site-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { digitalMarketingPlans } from "@/data/site";

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
            eyebrow="Marketing Plans"
            title="Five digital marketing retainers designed around growth stage and execution depth"
            description="Each plan is structured as a clear operating package, from early brand presence to paid growth management and ongoing optimization."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 rounded-[1.8rem] border border-[rgba(17,94,212,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,245,255,0.96)_100%)] p-6 shadow-[0_22px_70px_-42px_rgba(17,94,212,0.18)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                    Positioning
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    These plans are built to help businesses choose the right growth
                    rhythm now, then scale into more advanced execution later.
                  </p>
                </div>
              </div>

              <Button href="/contact" variant="secondary">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {digitalMarketingPlans.map((plan, index) => {
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
                delay={0.08 + index * 0.04}
              >
                <article
                  className={`group h-full rounded-[1.9rem] border p-7 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-2 ${plan.accentSoftClassName}`}
                >
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${plan.accentClassName}`}
                  />

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--foreground)] shadow-[0_18px_44px_-28px_rgba(15,23,42,0.22)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/80 bg-white/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)] shadow-sm">
                      {plan.price}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-[var(--brand-700)]">
                      Goal
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                      {plan.goal}
                    </p>
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

                  <Button href="/contact" className="mt-7 w-full justify-between">
                    Choose {plan.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
