import type { Metadata } from "next";

import Link from "next/link";
import { connection } from "next/server";

import { ArrowRight, Bot, Sparkles, Waypoints } from "lucide-react";

import { getSiteIcon } from "@/components/icons/site-icon";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/ui/service-card";
import { HeroVisual } from "@/components/visuals/hero-visual";
import { homeProcess, homeWhyPatricians, services } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Patricians | AI Automation & Web Development Agency",
  description:
    "Patricians is an AI automation and web development agency building premium websites, branded AI systems, chatbot workflows, and modern digital growth infrastructure.",
  path: "/",
  keywords: [
    "Patricians home",
    "Patricians brand",
    "Patricians AI systems",
    "Patricians websites",
  ],
});

const featurePills = [
  {
    label: "AI Chatbots",
    mobileLabel: "Chatbots",
    href: "/services/ai-chatbots",
  },
  {
    label: "Websites Within Days",
    mobileLabel: "Websites",
    href: "/services/websites-in-3-days",
  },
  {
    label: "AI Social Media",
    mobileLabel: "Social",
    href: "/services/ai-social-media-marketing",
  },
  {
    label: "Mobile Apps",
    mobileLabel: "Mobile",
    href: "/services/mobile-app-development",
  },
] as const;

export default async function Home() {
  await connection();

  return (
    <>
      <section className="relative overflow-hidden pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,160,255,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(17,94,212,0.1),transparent_28%),linear-gradient(180deg,rgba(244,248,255,0.82)_0%,rgba(255,255,255,0.34)_58%,rgba(255,255,255,0)_100%)]"
        />
        <Container className="relative max-sm:px-4 pb-18 pt-4 sm:pb-24 sm:pt-6">
          <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal className="min-w-0 space-y-6 sm:space-y-8">
              <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)] shadow-sm">
                AI-First Company
              </span>

              <div className="space-y-5 sm:space-y-6">
                <h1 className="max-w-[9.8ch] break-words text-[clamp(1.72rem,6.6vw,2.85rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-[var(--foreground)] sm:max-w-4xl sm:text-5xl sm:leading-[0.98] lg:text-[4.3rem] lg:leading-[1.02]">
                  Patricians builds AI systems, high-end websites, and growth
                  engines for modern businesses
                </h1>
                <p className="max-w-2xl text-[0.94rem] leading-7 text-[var(--muted-foreground)] sm:text-lg sm:leading-8">
                  Patricians helps ambitious brands scale with intelligent
                  customer experiences, high-performance websites, AI-enhanced
                  social media marketing, and modern mobile product development.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" className="w-full sm:w-auto">
                  Get Started
                </Button>
                <Button href="/services" variant="secondary" className="w-full sm:w-auto">
                  View Services
                </Button>
              </div>

              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                Learn more{" "}
                <Link
                  href="/about"
                  className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
                >
                  about Patricians
                </Link>
                , explore the{" "}
                <Link
                  href="/services"
                  className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
                >
                  full service lineup
                </Link>
                , or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
                >
                  contact the Patricians team
                </Link>
                .
              </p>

              <div className="w-full pb-1 sm:pb-0">
                <ul className="flex w-full min-w-0 flex-nowrap gap-1.5 sm:w-auto sm:gap-2.5">
                  {featurePills.map((pill) => (
                    <li key={pill.href} className="min-w-0 flex-1 sm:min-w-fit sm:flex-none">
                      <Link
                        href={pill.href}
                        aria-label={pill.label}
                        className="group inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] bg-white/88 px-2 py-2 text-[0.68rem] font-semibold text-[var(--muted-foreground)] shadow-[0_14px_34px_-26px_rgba(15,23,42,0.3)] transition-all duration-300 hover:border-[var(--brand-300)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,245,255,0.98)_100%)] hover:text-[var(--brand-700)] hover:shadow-[0_18px_46px_-24px_rgba(17,94,212,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2 sm:w-auto sm:px-4 sm:text-sm"
                      >
                        <span className="truncate sm:hidden">{pill.mobileLabel}</span>
                        <span className="hidden whitespace-nowrap sm:inline">
                          {pill.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="hidden min-w-0 lg:block">
              <HeroVisual />
            </Reveal>
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(241,245,251,0.94)_0%,rgba(255,255,255,0.98)_18%,rgba(247,250,255,0.94)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(221,230,242,0.72)_0%,rgba(255,255,255,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[32%] top-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(138,184,255,0.18),transparent_72%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[14%] top-20 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.14),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Positioning"
                title="Patricians is evolving into a premium AI systems company"
                description="We deliver premium websites, AI-supported social media marketing, website chatbots, and modern mobile products through a more intelligent, systems-led approach. The goal is sharper execution, clearer digital experiences, and better growth infrastructure."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.22)]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    AI-powered customer experiences
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    Website chatbots, guided conversations, and intelligent
                    touchpoints that help visitors move with more confidence.
                  </p>
                </article>

                <article className="rounded-[1.7rem] border border-[var(--border)] bg-[var(--surface-alt)] p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--brand-700)]">
                    <Waypoints className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    Smarter social media systems
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    AI-enhanced Meta social media marketing, sharper iteration,
                    and digital delivery that feels current, credible, and useful.
                  </p>
                </article>

                <article className="rounded-[1.7rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)] p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)] sm:col-span-2">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    Premium execution across product, social media, and web
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                    The end result should never feel like an agency template or a
                    rushed AI build. It should feel calm, premium, intelligent,
                    and aligned with modern business expectations.
                  </p>
                </article>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Services"
              title="What Patricians delivers"
              description="A focused set of services designed around modern businesses that need better systems, sharper interfaces, and faster execution."
              action={
                <Button href="/services" variant="ghost" className="px-0">
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04}>
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
          className="pointer-events-none absolute right-[12%] top-28 h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(95,160,255,0.12),transparent_74%)] blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal>
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="How It Connects"
                  title="The service lines are designed to strengthen each other"
                  description="Patricians is structured so each offering can work independently or fit into a more connected digital growth system. A premium website can pair with a chatbot. Social media marketing can support the launch. Mobile can extend the product experience."
                />
                <div className="rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#0f2d72_0%,#115ed4_48%,#6aa7ff_100%)] p-6 text-white shadow-[0_26px_90px_-46px_rgba(8,45,134,0.7)]">
                  <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                    <Sparkles className="h-4 w-4" />
                    Premium work, connected clearly
                  </div>
                  <p className="mt-4 text-base leading-8 text-white/82">
                    The aim is not to stack services for the sake of it. The aim
                    is to give businesses cleaner digital execution across their
                    website, customer experience, social media, and product layer.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4">
                {[
                  {
                    title: "Website Foundation",
                    text: "A premium site creates the trust layer and conversion foundation for everything else.",
                    icon: "screen",
                  },
                  {
                    title: "Chatbot Layer",
                    text: "AI chatbots improve engagement, answer questions, and support lead capture on-site.",
                    icon: "message",
                  },
                  {
                    title: "Growth and Product Momentum",
                    text: "Social media and mobile product work help the business extend visibility, engagement, and usable reach.",
                    icon: "rocket",
                  },
                ].map((item) => {
                  const Icon = getSiteIcon(item.icon);

                  return (
                    <article
                      key={item.title}
                      className="rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.22)]"
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
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Why Patricians"
              title="A business-facing approach with premium standards"
              description="We combine strategy, system thinking, and polished execution so the output feels credible in front of customers and useful behind the scenes."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeWhyPatricians.map((item, index) => {
              const Icon = getSiteIcon(item.icon);

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="h-full rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-50)] text-[var(--brand-700)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Process"
              title="How we move from idea to system"
              description="Our process is designed to create clarity first, then execute with speed and discipline."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {homeProcess.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <article className="h-full rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]">
                  <span className="inline-flex items-center rounded-full border border-[var(--brand-100)] bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
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

      <CTASection
        title="Build a sharper digital operating layer for your business"
        description="Whether you need a premium website, a chatbot, a smarter social media system, or a mobile MVP, Patricians helps you move with more intelligence and better execution."
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
