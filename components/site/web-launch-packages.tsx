import {
  ArrowRight,
  Check,
  Clock3,
  Globe,
  Rocket,
  ShoppingBag,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

type LaunchStep = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type WebsitePackage = {
  title: string;
  subline: string;
  price: string;
  badge?: string;
  icon: LucideIcon;
  ctaLabel: string;
  href: string;
  featured?: boolean;
  includes: string[];
  extras: string[];
};

const launchSteps: LaunchStep[] = [
  {
    label: "Day 1",
    title: "Design",
    description: "We lock the visual direction, structure, and conversion flow.",
    icon: Sparkles,
  },
  {
    label: "Day 2",
    title: "Development",
    description: "The build moves fast with a clean, optimized production rhythm.",
    icon: Workflow,
  },
  {
    label: "Day 3",
    title: "Launch",
    description: "The site goes live polished, responsive, and ready to represent the business.",
    icon: Rocket,
  },
] as const;

const websitePackages: WebsitePackage[] = [
  {
    title: "Business Website / Landing Page",
    subline: "Delivered in 3 Days",
    price: "$199",
    badge: "Most Popular",
    icon: Globe,
    ctaLabel: "Get Started",
    href: "/contact",
    featured: true,
    includes: [
      "Modern responsive design",
      "3-5 pages or landing page",
      "Fast loading performance",
      "Contact form integration",
      "Basic SEO setup",
    ],
    extras: ["Domain: $19.99 (2 years)", "Hosting: $39.99/year"],
  },
  {
    title: "E-Commerce Website",
    subline: "Delivered in 7 Days",
    price: "$499",
    icon: ShoppingBag,
    ctaLabel: "Start Your Store",
    href: "/contact",
    includes: [
      "Full online store",
      "Up to 10 products uploaded",
      "Payment integration",
      "Mobile responsive design",
      "Basic store setup",
    ],
    extras: ["Domain: $19.99 (2 years)", "Hosting: $39.99/year"],
  },
] as const;

const webLaunchFaq = [
  {
    question: "Why is it so fast?",
    answer:
      "We use optimized workflows and AI-assisted development to reduce drag without lowering quality.",
  },
  {
    question: "Can I scale later?",
    answer:
      "Yes. We can expand the website into more pages, e-commerce, chat, or automation as the business grows.",
  },
] as const;

type WebLaunchPackagesProps = {
  eyebrow?: string;
  className?: string;
};

export function WebLaunchPackages({
  eyebrow = "Website Packages",
  className,
}: WebLaunchPackagesProps) {
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
        className="pointer-events-none absolute left-[14%] top-16 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.18),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-28 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(17,94,212,0.12),transparent_74%)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)] shadow-sm">
              {eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl lg:text-[3.3rem]">
              Go Live in Days, Not Weeks
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
              Fast web delivery should still feel premium. The structure is clear,
              the workflow is disciplined, and the final result looks business-ready.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {launchSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.label} delay={index * 0.05}>
                <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white/92 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)] backdrop-blur">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                        {step.label}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <SectionHeader
            className="mt-16 items-center text-center"
            title="Launch Fast. Choose Your Package."
            description="Transparent pricing. Fast delivery. No unnecessary delays."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 xl:grid-cols-[1.08fr_1fr_0.92fr]">
          {websitePackages.map((pkg, index) => {
            const Icon = pkg.icon;

            return (
              <Reveal key={pkg.title} delay={0.12 + index * 0.05}>
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-[2rem] border p-7 transition-all duration-300 hover:-translate-y-2",
                    pkg.featured
                      ? "border-[rgba(17,94,212,0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(235,244,255,0.98)_100%)] shadow-[0_28px_90px_-42px_rgba(17,94,212,0.34)] xl:-translate-y-3"
                      : "border-[var(--border)] bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.2)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {pkg.badge ? (
                      <span className="inline-flex rounded-full border border-[rgba(17,94,212,0.14)] bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)] shadow-sm">
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--brand-700)]">
                      {pkg.subline}
                    </p>
                    <div className="mt-5 flex items-end gap-3">
                      <span className="text-5xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                        {pkg.price}
                      </span>
                      <span className="pb-2 text-sm text-[var(--muted-foreground)]">
                        launch package
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 h-px bg-[linear-gradient(90deg,rgba(207,218,232,0.2)_0%,rgba(207,218,232,0.8)_26%,rgba(207,218,232,0.8)_74%,rgba(207,218,232,0.2)_100%)]" />

                  <ul className="mt-7 space-y-3">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-7 text-[var(--muted-foreground)]"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-700)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-alt)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                      Extras
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
                      {pkg.extras.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>

                  <Button href={pkg.href} className="mt-7 w-full justify-between">
                    {pkg.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.22}>
            <article className="flex h-full flex-col rounded-[2rem] border border-transparent bg-[linear-gradient(160deg,#0f2d72_0%,#115ed4_48%,#74afff_100%)] p-7 text-white shadow-[0_30px_90px_-46px_rgba(8,45,134,0.7)] transition-transform duration-300 hover:-translate-y-2">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white">
                <Workflow className="h-5 w-5" />
              </span>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/72">
                  Custom Scope
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Need Something More Advanced?
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  Custom features, automation systems, or larger platforms for
                  businesses that need more than a standard launch package.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Automation systems", "Custom features", "Larger platforms"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-medium text-white/82"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-auto pt-8">
                <Button href="/contact" variant="light" className="w-full justify-between">
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.26}>
          <p className="mt-6 text-center text-sm font-medium text-[var(--muted-foreground)]">
            No hidden fees. Clear pricing. Fast delivery.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 rounded-[1.8rem] border border-[rgba(17,94,212,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,245,255,0.96)_100%)] p-6 shadow-[0_22px_70px_-42px_rgba(17,94,212,0.18)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand-700)]">
                    AI Upgrade
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    Want AI features? Add an AI website assistant or automation system.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                    Turn a fast launch into a smarter front door with AI-supported
                    chat, lead capture, or workflow automation.
                  </p>
                </div>
              </div>

              <Button href="/services/ai-chatbots" variant="secondary">
                Explore AI Add-Ons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {webLaunchFaq.map((item, index) => (
            <Reveal key={item.question} delay={0.34 + index * 0.05}>
              <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                    <Clock3 className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    {item.question}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  {item.answer}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
