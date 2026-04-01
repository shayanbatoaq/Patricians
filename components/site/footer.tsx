import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { companyTagline, navLinks, services } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-alt)]">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.95fr_0.85fr]">
          <div className="space-y-5">
            <Logo variant="footer" />
            <p className="max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">
              {companyTagline}. Patricians builds AI systems, premium websites,
              and modern digital growth infrastructure for ambitious businesses.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[var(--brand-700)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors duration-200 hover:text-[var(--brand-700)]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
              Connect
            </h3>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <li>Strategy calls by appointment</li>
              <li>Project inquiries through the contact form</li>
              <li>Social channels coming soon</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Patricians. All rights reserved.</p>
          <p>Built for businesses that want smarter systems and better execution.</p>
        </div>
      </Container>
    </footer>
  );
}
