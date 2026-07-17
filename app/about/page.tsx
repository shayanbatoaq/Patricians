import type { Metadata } from "next";
import Image from "next/image";

import { ArrowUpRight, Bot, Layers3, ShieldCheck } from "lucide-react";

import { CTASection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutPrinciples } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

import shayanPortrait from "./shayan.jpg";

export const metadata: Metadata = buildPageMetadata({
  title: "About Patricians | AI Automation & Web Development Agency",
  description:
    "Learn how Patricians is evolving into an AI automation and web development agency focused on premium digital systems, modern products, and intelligent growth.",
  path: "/about",
  keywords: ["about Patricians", "Patricians agency story", "Patricians company"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Patricians"
        title="Patricians is evolving from digital execution into intelligent systems"
        description="Patricians began with social media marketing and web development. Today the company is shifting toward modern digital products, intelligent customer experiences, and business-facing systems that create cleaner growth."
        primaryAction={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
      >
        <div className="grid gap-4">
          <div className="rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.26)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
              Evolution
            </p>
            <div className="mt-4 space-y-4">
              {[
                "Social media marketing and premium websites",
                "AI-powered customer experiences and website assistant systems",
                "Automation-first operations and intelligent growth layers",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-500)]" />
                  <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)] p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.2)]">
            <p className="text-sm leading-7 text-[var(--muted-foreground)]">
              Patricians is focused on building intelligent systems, modern
              digital products, and AI-enhanced growth with a premium delivery
              standard.
            </p>
          </div>
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
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Company Story"
                title="Built on digital execution, now moving toward system-level value"
                description="Patricians started by helping businesses look sharper online and communicate more clearly. That foundation still matters. But modern companies increasingly need more than campaigns and websites. They need intelligent systems that reduce friction and support growth in a more durable way."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="space-y-6 text-base leading-8 text-[var(--muted-foreground)]">
                <p>
                  As client needs evolved, so did the work. Websites became
                  customer experience platforms. Social media needed stronger
                  systems. Conversations shifted toward AI-powered engagement,
                  sharper growth workflows, and AI-enhanced product delivery.
                </p>
                <p>
                  That is where Patricians is headed now: an AI-first model that
                  still respects design quality and business-facing credibility,
                  but places more emphasis on the systems that power growth
                  behind the scenes.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Evolution"
              title="From agency-style delivery to AI systems thinking"
              description="The transition is not about abandoning web and social media marketing. It is about reframing them inside a more intelligent operating model."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Layers3,
                title: "Foundation",
                text: "Premium websites and social media marketing built the original delivery discipline.",
              },
              {
                icon: Bot,
                title: "Transition",
                text: "AI chat experiences, smarter workflows, and digital systems thinking expanded what clients needed from the company.",
              },
              {
                icon: ShieldCheck,
                title: "Today",
                text: "Patricians is becoming a more credible AI-first partner for operations, products, and growth systems.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-7 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="co-founder-heading"
        className="relative overflow-hidden border-b border-[var(--border)] py-20 sm:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#f7faff_0%,#ffffff_48%,#edf4ff_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(60,141,255,0.16),transparent_68%)] blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[0_30px_100px_-54px_rgba(15,45,114,0.42)]">
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[39rem]">
                  <Image
                    src={shayanPortrait}
                    alt="Shayan, Co-Founder and Head of Development at Patricians"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,45,134,0.42))]"
                  />
                  <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-900)] shadow-lg backdrop-blur sm:bottom-7 sm:left-7">
                    Co-Founder &amp; Head of Development
                  </div>
                </div>

                <div className="flex items-center p-7 sm:p-10 lg:p-14">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                      Leadership
                    </p>
                    <h2
                      id="co-founder-heading"
                      className="mt-4 text-balance text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl lg:text-5xl"
                    >
                      Meet the builder behind Patricians
                    </h2>

                    <div className="mt-7 border-l-2 border-[var(--brand-300)] pl-5">
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                        Shayan
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--brand-700)]">
                        Co-Founder &amp; Head of Development
                      </p>
                    </div>

                    <div className="mt-7 space-y-4 text-base leading-8 text-[var(--muted-foreground)]">
                      <p>
                        Shayan co-founded Patricians and leads the development
                        of its websites, digital products, and intelligent
                        systems. He brings the technical side of the company
                        together, from shaping the architecture to refining the
                        details people interact with.
                      </p>
                      <p>
                        His approach is simple: understand the business problem,
                        build with intention, and deliver work that feels as
                        polished as it is dependable.
                      </p>
                    </div>

                    <a
                      href="https://shayan.patricians.pk"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-700)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(13,74,203,0.72)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-900)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-500)]"
                    >
                      Visit Shayan&apos;s portfolio
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Mission and Vision"
              title="What guides the company now"
              description="Patricians is focused on building clearer systems, better products, and more intelligent digital operations for businesses that want a premium execution partner."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {aboutPrinciples.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]">
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
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
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Why Patricians"
                title="A modern company built for serious business-facing work"
                description="The goal is to combine intelligent systems with polished execution, so the output feels credible in the boardroom, useful in operations, and strong in front of customers."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Founder-led thinking and direct execution",
                  "Premium front-end and interface quality",
                  "Practical AI systems instead of inflated hype",
                  "Strong fit for businesses that want clarity and polish",
                ].map((item) => (
                  <article
                    key={item}
                    className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5 text-sm leading-7 text-[var(--muted-foreground)] shadow-[0_18px_50px_-40px_rgba(15,23,42,0.18)]"
                  >
                    {item}
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,#0f2d72_0%,#115ed4_46%,#6aa7ff_100%)] px-8 py-10 text-white shadow-[0_26px_90px_-48px_rgba(8,45,134,0.7)] sm:px-10 sm:py-12">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    Credibility
                  </span>
                  <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                    Founder-led attention, premium standards, and a systems-first mindset
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/82">
                    Patricians is positioned for businesses that want thoughtful
                    execution, direct communication, and solutions that are
                    designed to work in the real world, not just look impressive
                    in a proposal.
                  </p>
                </div>
                <div className="space-y-4 rounded-[1.6rem] border border-white/16 bg-white/10 p-6 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/75">
                    What clients can expect
                  </p>
                  {[
                    "A strong point of view on business-facing quality",
                    "Execution that balances speed with control",
                    "A practical path into AI-powered growth and modern digital systems",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/80" />
                      <p className="text-sm leading-7 text-white/82">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="If you need a partner for intelligent systems and modern digital execution, let's talk"
        description="Patricians works best with businesses that value clarity, premium presentation, and practical AI-first progress."
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
