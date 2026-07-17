"use client";

import { useMemo, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  clientele,
  clienteleCategories,
  type ClienteleClient,
  type ClienteleFilter,
} from "@/data/clientele";
import { cn } from "@/lib/utils";

const filterStatus: Record<ClienteleFilter, string> = {
  all: "All selected work",
  websites: "Website projects",
  "digital-growth": "Digital growth projects",
};

function ClientPreview({
  client,
  featured = false,
}: {
  client: ClienteleClient;
  featured?: boolean;
}) {
  const previewAssets = client.gallery.slice(0, 3);

  if (previewAssets.length > 0) {
    return (
      <div
        className={cn(
          "grid overflow-hidden rounded-[1.45rem] border border-[var(--border)] bg-[var(--surface-alt)] p-2",
          featured
            ? "h-[22rem] grid-cols-[1.25fr_0.75fr] grid-rows-2 sm:h-[27rem]"
            : "h-[19rem] grid-cols-[1.2fr_0.8fr] grid-rows-2 sm:h-[21rem]",
        )}
      >
        {previewAssets.map((asset, index) => (
          <div
            key={asset.src}
            className={cn(
              "relative min-h-0 overflow-hidden rounded-[1rem] border border-white/80 bg-white shadow-[0_16px_46px_-32px_rgba(15,23,42,0.42)]",
              index === 0 && "row-span-2",
            )}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes={
                featured
                  ? "(max-width: 1024px) 70vw, 44vw"
                  : "(max-width: 768px) 70vw, 28vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.45rem] border border-[var(--border)] bg-[linear-gradient(145deg,#eef5ff_0%,#ffffff_48%,#dce9ff_100%)]",
        featured ? "h-[22rem] sm:h-[27rem]" : "h-[19rem] sm:h-[21rem]",
      )}
    >
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-[var(--brand-200)]/70 bg-white/50" />
      <div className="absolute -right-12 bottom-4 h-48 w-48 rounded-full border border-[var(--brand-200)]/70 bg-[var(--brand-50)]/70" />
      <div className="absolute left-[18%] top-[25%] h-px w-[65%] rotate-[14deg] bg-[linear-gradient(90deg,transparent,var(--brand-300),transparent)] opacity-60" />
      <div className="absolute left-[22%] top-[25%] h-2.5 w-2.5 rounded-full bg-[var(--brand-500)] shadow-[0_0_18px_rgba(60,141,255,0.7)]" />
      <div className="absolute bottom-[24%] right-[22%] h-2.5 w-2.5 rounded-full bg-[var(--brand-300)] shadow-[0_0_18px_rgba(60,141,255,0.56)]" />

      <div className="absolute inset-6 flex items-center justify-center sm:inset-8">
        <div
          className="relative h-full w-full overflow-hidden rounded-[1.35rem] border border-white/85 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.38)] transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.012]"
          style={{ backgroundColor: client.logo.background }}
        >
          <Image
            src={client.logo.src}
            alt={client.logo.alt}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 84vw, 44vw"
                : "(max-width: 768px) 84vw, 34vw"
            }
            className="object-contain p-7 sm:p-10"
          />
        </div>
      </div>
    </div>
  );
}

function ClientCard({ client, featured = false }: { client: ClienteleClient; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-white p-4 shadow-[0_22px_70px_-44px_rgba(15,23,42,0.26)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--brand-300)] hover:shadow-[0_30px_90px_-48px_rgba(17,94,212,0.35)] focus-within:border-[var(--brand-300)]",
        featured && "lg:grid lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch lg:gap-6 lg:p-5",
      )}
    >
      <ClientPreview client={client} featured={featured} />

      <div className={cn("flex min-w-0 flex-col px-2 pb-2 pt-6", featured && "lg:px-3 lg:py-5")}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
              {client.industry}
            </p>
            <h2
              className={cn(
                "mt-3 break-words font-semibold tracking-[-0.045em] text-[var(--foreground)]",
                featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
              )}
            >
              {client.name}
            </h2>
          </div>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--brand-700)] transition-all duration-300 group-hover:border-[var(--brand-200)] group-hover:bg-[var(--brand-50)]">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        <p
          className={cn(
            "mt-4 leading-7 text-[var(--muted-foreground)]",
            featured ? "max-w-xl text-base" : "text-sm",
          )}
        >
          {client.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${client.name} services`}>
          {client.services.slice(0, featured ? 4 : 3).map((service) => (
            <li
              key={service}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)]"
            >
              {service}
            </li>
          ))}
        </ul>

        <div className={cn("mt-7 flex flex-wrap items-center gap-4", featured && "lg:mt-auto lg:pt-8")}>
          <Link
            href={`/clientele/${client.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-600)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_36px_-20px_rgba(17,94,212,0.72)] transition-all duration-300 hover:bg-[var(--brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
            style={{ color: "#ffffff" }}
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          {client.websiteUrl ? (
            <a
              href={client.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-[var(--foreground)] underline-offset-4 transition-colors hover:text-[var(--brand-700)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
            >
              Visit Live Site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ClienteleGrid() {
  const [filter, setFilter] = useState<ClienteleFilter>("all");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredClients = useMemo(
    () =>
      filter === "all"
        ? clientele
        : clientele.filter((client) => client.categories.includes(filter)),
    [filter],
  );

  const selectTab = (index: number) => {
    const category = clienteleCategories[index];
    setFilter(category.value);
    tabRefs.current[index]?.focus();
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-7 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter client work"
          className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--border)] bg-white p-1 shadow-[0_12px_38px_-30px_rgba(15,23,42,0.24)]"
        >
          {clienteleCategories.map((category, index) => {
            const selected = filter === category.value;

            return (
              <button
                key={category.value}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`clientele-tab-${category.value}`}
                aria-controls="clientele-panel"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setFilter(category.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    selectTab((index + 1) % clienteleCategories.length);
                  } else if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    selectTab((index - 1 + clienteleCategories.length) % clienteleCategories.length);
                  } else if (event.key === "Home") {
                    event.preventDefault();
                    selectTab(0);
                  } else if (event.key === "End") {
                    event.preventDefault();
                    selectTab(clienteleCategories.length - 1);
                  }
                }}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)]",
                  selected
                    ? "bg-[var(--brand-600)] text-white shadow-[0_10px_26px_-18px_rgba(17,94,212,0.72)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-[var(--muted-foreground)]" aria-live="polite">
          {filterStatus[filter]}
        </p>
      </div>

      <div
        id="clientele-panel"
        role="tabpanel"
        aria-labelledby={`clientele-tab-${filter}`}
        className="mt-8 grid gap-6 lg:grid-cols-2"
      >
        {filteredClients.map((client, index) => {
          const featured = client.slug === "the-corporate-lens" && index === 0;

          return (
            <div key={client.slug} className={cn(featured && "lg:col-span-2")}>
              <ClientCard client={client} featured={featured} />
            </div>
          );
        })}
      </div>
    </>
  );
}
