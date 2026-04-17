import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { Check, Sparkles } from "lucide-react";

import { getSiteIcon } from "@/components/icons/site-icon";
import { ChatbotPlans } from "@/components/site/chatbot-plans";
import { MarketingPlans } from "@/components/site/marketing-plans";
import { WebLaunchPackages } from "@/components/site/web-launch-packages";
import { CTASection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getServiceBySlug, services } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

const accentMap = {
  "ai-chatbots":
    "bg-[linear-gradient(135deg,#09306f_0%,#1d66f5_44%,#83b8ff_100%)]",
  "websites-in-3-days":
    "bg-[linear-gradient(135deg,#123160_0%,#0d4acb_48%,#8fc1ff_100%)]",
  "ai-social-media-marketing":
    "bg-[linear-gradient(135deg,#153056_0%,#1760d7_48%,#7eb3ff_100%)]",
  "mobile-app-development":
    "bg-[linear-gradient(135deg,#102e68_0%,#115ed4_44%,#93c3ff_100%)]",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return buildPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: [service.title, `${service.title} agency`, `Patricians ${service.title}`],
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const accentClass = accentMap[service.slug];
  const whyPatriciansTitle = service.title.toLowerCase().replace(/\bai\b/g, "AI");

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        primaryAction={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
      >
        <div
          className={`rounded-[1.9rem] p-[1px] shadow-[0_24px_90px_-46px_rgba(15,23,42,0.32)] ${accentClass}`}
        >
          <div className="rounded-[1.85rem] border border-white/10 bg-[rgba(7,16,42,0.24)] p-6 text-white backdrop-blur">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/72">
              <Sparkles className="h-4 w-4" />
              Service Snapshot
            </div>
            <div className="mt-6 space-y-4">
              {service.heroHighlights.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/80" />
                  <p className="text-sm leading-7 text-white/82">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-medium text-white/78"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </PageHero>

      {service.slug === "websites-in-3-days" ? (
        <WebLaunchPackages eyebrow="Web Launch Packages" className="border-t-0" />
      ) : null}

      {service.slug === "ai-chatbots" ? (
        <ChatbotPlans eyebrow="Website Chatbot Plans" className="border-t-0" />
      ) : null}

      {service.slug === "ai-social-media-marketing" ? <MarketingPlans /> : null}

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,246,252,0.94)_0%,rgba(255,255,255,0.98)_20%,rgba(246,249,255,0.95)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(221,230,242,0.72)_0%,rgba(255,255,255,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[22%] top-18 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.16),transparent_72%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-24 h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.12),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <SectionHeader
                eyebrow="What This Service Is"
                title={service.introTitle}
                description={service.introText}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.8rem] border border-[var(--border)] bg-white p-7 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.22)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                  Core Focus
                </p>
                <div className="mt-5 space-y-4">
                  {service.focus.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-500)]" />
                      <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Key Benefits"
              title="Why this service matters"
              description="Each Patricians service is built to improve speed, clarity, quality, or operational strength in a way that feels useful immediately."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {service.benefits.map((benefit, index) => {
              const Icon = getSiteIcon(benefit.icon);

              return (
                <Reveal key={benefit.title} delay={index * 0.05}>
                  <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {benefit.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,246,252,0.94)_0%,rgba(255,255,255,0.98)_20%,rgba(246,249,255,0.95)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(221,230,242,0.72)_0%,rgba(255,255,255,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[24%] top-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.16),transparent_72%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[12%] top-24 h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.12),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="How It Works"
              title="A clear implementation rhythm"
              description="The structure stays disciplined so the service is easier to scope, launch, and refine."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {service.process.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <article className="h-full rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]">
                  <span className="inline-flex rounded-full border border-[var(--brand-100)] bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Deliverables"
                title="What you can expect from the engagement"
                description="The exact scope can flex by project, but these are the core deliverables and features Patricians typically builds into this service."
              />

              <div className="mt-8 grid gap-3">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.35rem] border border-[var(--border)] bg-white px-4 py-4 text-sm leading-7 text-[var(--muted-foreground)] shadow-[0_12px_40px_-30px_rgba(15,23,42,0.18)]"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-700)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[1.9rem] border border-[var(--border)] bg-white p-7 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.22)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                  Best Fit
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  This service works best when the business wants a clear, premium
                  execution partner and a more intelligent way to move from
                  planning into delivery.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,246,252,0.94)_0%,rgba(255,255,255,0.98)_20%,rgba(246,249,255,0.95)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(221,230,242,0.72)_0%,rgba(255,255,255,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[26%] top-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.16),transparent_72%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[14%] top-24 h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.12),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Why Patricians"
              title={`Why choose Patricians for ${whyPatriciansTitle}`}
              description="The goal is to combine strategic thinking, strong product judgment, and premium execution so the final outcome feels both modern and dependable."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {service.whyPatricians.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.18)]">
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    Reason {index + 1}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {item}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={service.ctaTitle}
        description={service.ctaText}
        secondaryLabel="Contact Patricians"
        secondaryHref="/contact"
      />
    </>
  );
}
