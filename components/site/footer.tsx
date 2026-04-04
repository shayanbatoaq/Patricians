import Link from "next/link";

import { Mail, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SocialIcon } from "@/components/icons/social-icon";
import { Container } from "@/components/ui/container";
import {
  companyTagline,
  contactDetails,
  navLinks,
  services,
  socialLinks,
} from "@/data/site";

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
            <p className="max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">
              Explore{" "}
              <Link
                href="/about"
                className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
              >
                about Patricians
              </Link>
              , review the{" "}
              <Link
                href="/services"
                className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
              >
                service lineup
              </Link>
              , or{" "}
              <Link
                href="/contact"
                className="font-medium text-[var(--brand-700)] underline-offset-4 transition-colors duration-200 hover:text-[var(--brand-600)] hover:underline"
              >
                contact the team
              </Link>
              .
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
              <li>
                <a
                  href={contactDetails.email.href}
                  className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-[var(--brand-700)]"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contactDetails.email.value}</span>
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.phone.href}
                  className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-[var(--brand-700)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contactDetails.phone.value}</span>
                </a>
              </li>
              {socialLinks.map((item) => {
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-[var(--brand-700)]"
                    >
                      <SocialIcon platform={item.label} className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Patricians. All rights reserved.</p>
          <p>Built for businesses that want smarter systems and better execution.</p>
        </div>
      </Container>
    </footer>
  );
}
