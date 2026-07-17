import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
} from "lucide-react";

import { CTASection } from "@/components/ui/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  clientele,
  getAdjacentClienteleClients,
  getClienteleClient,
  type ClienteleClient,
  type ClienteleGalleryAsset,
} from "@/data/clientele";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return clientele.map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = getClienteleClient(slug);

  if (!client) {
    return {};
  }

  return buildPageMetadata({
    title: `${client.name} Case Study | Patricians Clientele`,
    description: client.summary,
    path: `/clientele/${client.slug}`,
    keywords: [
      `${client.name} case study`,
      `${client.name} Patricians`,
      ...client.capabilities,
    ],
  });
}

function CaseStudyVisual({ client }: { client: ClienteleClient }) {
  const previewAssets = client.gallery.slice(0, 3);

  if (previewAssets.length > 0) {
    return (
      <div className="grid h-[27rem] grid-cols-[1.2fr_0.8fr] grid-rows-2 gap-2 overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface-alt)] p-2 shadow-[0_28px_90px_-46px_rgba(15,23,42,0.34)] sm:h-[34rem]">
        {previewAssets.map((asset, index) => (
          <div
            key={asset.src}
            className={cn(
              "relative min-h-0 overflow-hidden rounded-[1.2rem] border border-white bg-white shadow-[0_18px_44px_-32px_rgba(15,23,42,0.36)]",
              index === 0 && "row-span-2",
            )}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 64vw, 34vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative isolate h-[27rem] overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(145deg,#eef5ff_0%,#ffffff_50%,#dce9ff_100%)] p-7 shadow-[0_28px_90px_-46px_rgba(15,23,42,0.34)] sm:h-[34rem] sm:p-10">
      <div className="absolute -left-16 top-8 h-56 w-56 rounded-full border border-[var(--brand-200)] bg-white/40" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full border border-[var(--brand-200)] bg-[var(--brand-50)]/70" />
      <div className="absolute left-[12%] top-[22%] h-px w-[76%] rotate-[16deg] bg-[linear-gradient(90deg,transparent,var(--brand-300),transparent)] opacity-70" />
      <div
        className="relative h-full overflow-hidden rounded-[1.45rem] border border-white/90 shadow-[0_30px_80px_-44px_rgba(15,23,42,0.42)]"
        style={{ backgroundColor: client.logo.background }}
      >
        <Image
          src={client.logo.src}
          alt={client.logo.alt}
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 42vw"
          className="object-contain p-8 sm:p-12"
        />
      </div>
    </div>
  );
}

const galleryAspectClasses: Record<ClienteleGalleryAsset["format"], string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export default async function ClienteleCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClienteleClient(slug);

  if (!client) {
    notFound();
  }

  const { previous, next } = getAdjacentClienteleClients(client.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(244,248,255,0.98)_0%,rgba(255,255,255,0.98)_58%,rgba(247,249,252,0.98)_100%)] pt-32">
        <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,175,255,0.22),transparent_68%)] blur-3xl" />
        <Container className="relative pb-20 pt-4 sm:pb-24">
          <Reveal>
            <Link
              href="/clientele"
              className="mb-12 inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Clientele
            </Link>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
            <Reveal className="min-w-0">
              <div className="flex items-center gap-4">
                <span
                  className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_14px_36px_-26px_rgba(15,23,42,0.32)]"
                  style={{ backgroundColor: client.logo.background }}
                >
                  <Image
                    src={client.logo.src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[var(--brand-700)]">
                  {client.industry}
                </p>
              </div>

              <h1 className="mt-7 break-words text-balance text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl lg:text-[4.7rem] lg:leading-[0.98]">
                {client.name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                {client.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${client.name} services`}>
                {client.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-[var(--border)] bg-white/85 px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] shadow-sm"
                  >
                    {service}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {client.websiteUrl ? (
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-600)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(17,94,212,0.7)] transition-colors hover:bg-[var(--brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
                    style={{ color: "#ffffff" }}
                  >
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {client.externalLinks?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/90 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <CaseStudyVisual client={client} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,246,252,0.92)_0%,rgba(255,255,255,0.98)_22%,rgba(246,249,255,0.94)_100%)]"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="Project Overview"
              title={`A clear view of the requirement behind ${client.shortName ?? client.name}`}
              description={client.overview}
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_22px_70px_-44px_rgba(15,23,42,0.22)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                  The Requirement
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  What the project needed to solve
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  {client.challenge}
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="h-full rounded-[1.75rem] border border-[var(--brand-100)] bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)] p-7 shadow-[0_22px_70px_-44px_rgba(17,94,212,0.24)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                  Patricians&apos; Approach
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  How we shaped the response
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  {client.approach}
                </p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Capabilities Delivered"
              title="The working parts behind the engagement"
              description="Only capabilities supported by the approved project information are included here."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {client.capabilities.map((capability, index) => (
              <Reveal key={capability} delay={index * 0.04}>
                <div className="flex h-full items-start gap-3 rounded-[1.45rem] border border-[var(--border)] bg-white p-5 shadow-[0_16px_48px_-38px_rgba(15,23,42,0.2)]">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-700)]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold leading-7 text-[var(--foreground)]">
                    {capability}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {client.gallery.length > 0 ? (
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal>
              <SectionHeader
                eyebrow="Approved Work Gallery"
                title="Selected public-facing creative"
                description="A focused selection from the approved client assets used across the project's digital presence."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {client.gallery.map((asset, index) => (
                <Reveal
                  key={asset.src}
                  delay={index * 0.04}
                  className={cn(asset.format === "wide" && "sm:col-span-2")}
                >
                  <figure className="overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-white shadow-[0_22px_70px_-44px_rgba(15,23,42,0.24)]">
                    <div
                      className={cn(
                        "relative overflow-hidden bg-[var(--surface-alt)]",
                        galleryAspectClasses[asset.format],
                      )}
                    >
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 32vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
                      <span className="text-sm leading-6 text-[var(--muted-foreground)]">
                        {asset.caption}
                      </span>
                      {asset.platform ? (
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-700)]">
                          {asset.platform}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {client.campaigns?.length ? (
        <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
          <Container>
            <Reveal>
              <SectionHeader
                eyebrow="Campaign Information"
                title="Paid campaign structure without unpublished performance claims"
                description="The approved record supports objectives, audiences, platforms, languages, and creative direction. Campaign results remain private."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {client.campaigns.map((campaign, index) => (
                <Reveal key={campaign.title} delay={index * 0.05}>
                  <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_62px_-42px_rgba(15,23,42,0.22)] sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
                      Campaign {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {campaign.title}
                    </h2>
                    <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
                          Objective
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                          {campaign.objective}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
                          Audience
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                          {campaign.audience}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
                          Platforms
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                          {campaign.platforms.join(" / ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
                          Languages
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                          {campaign.languages.join(" / ")}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-6 border-t border-[var(--border)] pt-5 text-sm leading-7 text-[var(--muted-foreground)]">
                      {campaign.creativeDirection}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <Reveal>
              <SectionHeader
                eyebrow="Project Reflection"
                title="What the work clarifies"
                description="A qualitative view of the design and delivery thinking behind the engagement."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <blockquote className="rounded-[1.8rem] border border-[var(--brand-100)] bg-[linear-gradient(145deg,#ffffff_0%,#eef5ff_100%)] p-7 text-xl font-medium leading-9 tracking-[-0.025em] text-[var(--foreground)] shadow-[0_24px_80px_-46px_rgba(17,94,212,0.3)] sm:p-9 sm:text-2xl sm:leading-10">
                {client.reflection}
              </blockquote>
            </Reveal>
          </div>

          <nav
            aria-label="Previous and next client case studies"
            className="mt-16 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/clientele/${previous.slug}`}
                className="group rounded-[1.5rem] border border-[var(--border)] bg-white p-5 transition-all duration-300 hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Previous Client
                </span>
                <span className="mt-3 block text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                  {previous.name}
                </span>
              </Link>
            ) : null}
            {next ? (
              <Link
                href={`/clientele/${next.slug}`}
                className="group rounded-[1.5rem] border border-[var(--border)] bg-white p-5 text-left transition-all duration-300 hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2 sm:text-right"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)] sm:justify-end">
                  Next Client
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-3 block text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                  {next.name}
                </span>
              </Link>
            ) : null}
          </nav>
        </Container>
      </section>

      <CTASection
        eyebrow="Build with Patricians"
        title="Turn the next business requirement into a clear digital experience"
        description="Patricians brings strategy, system thinking, and premium execution together across websites and digital growth work."
        primaryLabel="Start a Project"
        secondaryLabel="View All Client Work"
        secondaryHref="/clientele"
      />
    </>
  );
}
