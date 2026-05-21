import type { Metadata } from "next";

import { ArrowRight, BriefcaseBusiness, Sparkles, Workflow } from "lucide-react";

import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/ui/service-card";
import { homeProcess, services } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Patricians Services | AI Automation, Web Development, Social Media, and Mobile",
  description:
    "Explore Patricians services across AI website assistants, high-end web development, AI social media marketing systems, and AI-enhanced mobile app development.",
  path: "/services",
  keywords: ["Patricians services", "Patricians web development", "Patricians AI automation"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Patricians services built for modern businesses that need better systems and sharper execution"
        description="Patricians combines high-end web delivery, chat experiences, smarter social media workflows, and modern mobile product development into a focused premium offering."
        primaryAction={{ label: "Book a Strategy Call", href: "/contact" }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Workflow,
              title: "AI-powered service stack",
              text: "A tighter lineup focused on websites, chat experiences, smarter social media, and modern product delivery.",
            },
            {
              icon: Sparkles,
              title: "Premium digital execution",
              text: "High-end websites, website assistants, and growth systems with modern polish.",
            },
            {
              icon: BriefcaseBusiness,
              title: "Business-facing credibility",
              text: "Clean interfaces, clear structure, and execution that feels serious.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-[var(--border)] bg-white p-5 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.22)] sm:col-span-2 last:sm:col-span-1"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </PageHero>

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
          className="pointer-events-none absolute right-[12%] top-20 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.12),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Overview"
              title="A focused stack of services around systems, growth, and digital products"
              description="Each service can stand alone, but they are designed to work together. A website can lead into a website assistant. Social media marketing can support launch and growth. Mobile can extend the product experience. The goal is connected value, not isolated deliverables."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <ServiceCard
                  title={service.title}
                  description={service.shortDescription}
                  href={`/services/${service.slug}`}
                  icon={service.icon}
                  focus={service.focus}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Engagement Process"
              title="How service engagements are typically structured"
              description="We keep the process clear: define the business need, scope the right solution, build with focus, then refine where it matters."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {homeProcess.map((item, index) => (
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

          <div className="mt-10">
            <Button href="/contact" variant="secondary">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <CTASection
        title="Choose the service that solves the right problem first"
        description="If you know what you need, we can build it. If you are deciding between web, chat, product, or growth work, we can help map the best starting point."
        secondaryLabel="Contact Patricians"
        secondaryHref="/contact"
      />
    </>
  );
}
