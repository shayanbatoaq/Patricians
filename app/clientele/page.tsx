import type { Metadata } from "next";

import { BriefcaseBusiness, Globe2, Megaphone } from "lucide-react";

import { ClienteleGrid } from "@/components/clientele/clientele-grid";
import { CTASection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Clientele | Selected Client Work by Patricians",
  description:
    "Explore selected Patricians client work across websites, e-commerce, healthcare, media, cybersecurity, and digital growth.",
  path: "/clientele",
  keywords: [
    "Patricians clientele",
    "Patricians case studies",
    "Patricians client work",
    "Pakistan digital agency portfolio",
  ],
});

const overviewItems = [
  {
    icon: BriefcaseBusiness,
    value: "Selected engagements",
    label: "Work grounded in real business needs",
  },
  {
    icon: Globe2,
    value: "Website experiences",
    label: "Editorial, commerce, and healthcare",
  },
  {
    icon: Megaphone,
    value: "Digital growth systems",
    label: "Social content and campaigns",
  },
] as const;

export default function ClientelePage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Client Work"
        title="Digital work built around real business needs"
        description="From editorial platforms and healthcare websites to e-commerce, brand systems, and growth campaigns, Patricians helps organizations turn complex requirements into clear digital experiences."
        primaryAction={{ label: "Start a Project", href: "/contact" }}
        secondaryAction={{ label: "Explore the Work", href: "#selected-work" }}
      >
        <div className="relative overflow-hidden rounded-[1.9rem] border border-[var(--border)] bg-white p-5 shadow-[0_26px_80px_-44px_rgba(15,23,42,0.28)] sm:p-6">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.3),transparent_68%)] blur-2xl" />
          <div className="relative grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {overviewItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.value}
                  className="flex items-center gap-4 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-alt)]/80 p-4"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand-700)] shadow-[0_12px_30px_-24px_rgba(17,94,212,0.48)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="block text-base font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                      {item.value}
                    </strong>
                    <span className="mt-1 block text-xs leading-5 text-[var(--muted-foreground)]">
                      {item.label}
                    </span>
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </PageHero>

      <section id="selected-work" className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,246,252,0.94)_0%,rgba(255,255,255,0.98)_18%,rgba(246,249,255,0.96)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[20%] top-20 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.15),transparent_72%)] blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Clientele Overview"
              title="Selected work across web, commerce, healthcare, media, cybersecurity, and digital growth"
              description="Every engagement starts with a specific operating need. Filter the selection by websites or digital growth, then open a case study for the project structure and approved work."
            />
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <ClienteleGrid />
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Build with Patricians"
        title="Bring the next clear digital experience into focus"
        description="Tell us what the business needs to communicate, sell, or simplify. Patricians will help shape the right website, content system, or connected digital engagement."
        primaryLabel="Start a Project"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
