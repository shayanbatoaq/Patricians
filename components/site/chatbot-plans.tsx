import { ArrowRight, Check, Sparkles, Workflow } from "lucide-react";

import { getSiteIcon } from "@/components/icons/site-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { chatbotPlans } from "@/data/site";
import { cn } from "@/lib/utils";

const scaleItems = [
  {
    label: "Intelligence",
    starter: "FAQ replies",
    growth: "Lead qualification",
    pro: "Sales-agent logic",
  },
  {
    label: "Automation",
    starter: "Basic lead capture",
    growth: "Sheets or Notion routing",
    pro: "CRM and webhook workflows",
  },
  {
    label: "Business Impact",
    starter: "Reply instantly",
    growth: "Capture better-fit leads",
    pro: "Convert visitors into pipeline",
  },
] as const;

const customScopeTags = [
  "Custom CRM flows",
  "Multi-step sales funnels",
  "Deep internal knowledge bases",
] as const;

type ChatbotPlansProps = {
  eyebrow?: string;
  className?: string;
};

export function ChatbotPlans({
  eyebrow = "Website Assistant Plans",
  className,
}: ChatbotPlansProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-[var(--border)] bg-[linear-gradient(180deg,rgba(243,247,253,0.96)_0%,rgba(255,255,255,0.98)_22%,rgba(245,249,255,0.96)_100%)] py-20 sm:py-24",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(219,229,242,0.78)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-16 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.18),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-28 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(17,94,212,0.12),transparent_74%)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            className="items-center text-center"
            eyebrow={eyebrow}
            title="Website assistant plans designed around replies, lead quality, and conversion support"
            description="No setup fee. Every plan is billed monthly with a 3-month commitment required, so the website assistant has enough runway to launch properly and start performing."
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <Reveal delay={0.06}>
            <article className="rounded-[1.9rem] border border-[rgba(17,94,212,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,245,255,0.96)_100%)] p-7 shadow-[0_24px_70px_-42px_rgba(17,94,212,0.18)]">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                    Pricing Model
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    Clear monthly tiers, no setup fee, 3-month commitment required
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    These plans stay focused on website assistants only. The structure
                    scales from a basic AI receptionist to a full AI sales system,
                    without drifting into unrelated channels or bloated retainers.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="rounded-[1.9rem] border border-[var(--border)] bg-white/94 p-7 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                How The Tiers Scale
              </p>
              <div className="mt-5 space-y-4">
                {scaleItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-alt)] p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                      {item.label}
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-[var(--muted-foreground)] sm:grid-cols-3">
                      <p>
                        <span className="font-semibold text-[var(--foreground)]">
                          Starter:
                        </span>{" "}
                        {item.starter}
                      </p>
                      <p>
                        <span className="font-semibold text-[var(--foreground)]">
                          Growth:
                        </span>{" "}
                        {item.growth}
                      </p>
                      <p>
                        <span className="font-semibold text-[var(--foreground)]">
                          Pro:
                        </span>{" "}
                        {item.pro}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[0.96fr_1.08fr_0.96fr]">
          {chatbotPlans.map((plan, index) => {
            const Icon = getSiteIcon(plan.icon);

            return (
              <Reveal key={plan.name} delay={0.14 + index * 0.05}>
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-[2rem] border p-7 transition-all duration-300 hover:-translate-y-2",
                    plan.featured
                      ? "border-[rgba(17,94,212,0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(235,244,255,0.98)_100%)] shadow-[0_28px_90px_-42px_rgba(17,94,212,0.34)] xl:-translate-y-3"
                      : `shadow-[0_22px_70px_-40px_rgba(15,23,42,0.2)] ${plan.accentSoftClassName}`,
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
                      <span className="rounded-full border border-[rgba(17,94,212,0.14)] bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)] shadow-sm">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--brand-700)]">
                      {plan.role}
                    </p>
                    <p className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                      {plan.price}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {plan.commitment}
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

                  <div className="mt-6 h-px bg-[linear-gradient(90deg,rgba(207,218,232,0.2)_0%,rgba(207,218,232,0.8)_26%,rgba(207,218,232,0.8)_74%,rgba(207,218,232,0.2)_100%)]" />

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

                  {plan.limitations ? (
                    <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-white/78 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                        Not included
                      </p>
                      <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--muted-foreground)]">
                        {plan.limitations.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-[var(--border)] bg-[var(--surface-alt)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                        Included usage
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                        {plan.usage}
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-[var(--border)] bg-[var(--surface-alt)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                        Overage
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                        {plan.overage}
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-[var(--border)] bg-[var(--surface-alt)] p-4 sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                        Support
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                        {plan.support}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-white/88 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                      Outcome
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                      {plan.positioning}
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

        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-sm font-medium text-[var(--muted-foreground)]">
            No setup fee. Website assistant plans only. 3-month commitment required.
          </p>
        </Reveal>

        <Reveal delay={0.34}>
          <article className="mt-8 rounded-[2rem] border border-transparent bg-[linear-gradient(160deg,#0f2d72_0%,#115ed4_48%,#74afff_100%)] p-7 text-white shadow-[0_30px_90px_-46px_rgba(8,45,134,0.7)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white">
                    <Workflow className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/72">
                      Custom Website Assistant Scope
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                      Need something more tailored than the standard plans?
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/82">
                      If your website assistant needs deeper workflow logic, multi-step sales
                      funnels, or custom integrations, we can scope a more advanced
                      website assistant system with you directly.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {customScopeTags.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-medium text-white/82"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Button href="/contact" variant="light" className="justify-between">
                Book a Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
