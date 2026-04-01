"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks, services } from "@/data/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shellActive = scrolled || mobileOpen || desktopServicesOpen;
  const closeMenus = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-4">
        <div
          className={cn(
            "rounded-full border px-3 transition-all duration-300",
            shellActive
              ? "border-white/70 bg-white/82 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="flex min-h-16 items-center justify-between gap-4">
            <Logo className="shrink-0" />

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive(pathname, link.href)
                      ? "bg-[var(--surface-alt)] text-[var(--brand-700)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onMouseLeave={() => setDesktopServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopServicesOpen((open) => !open)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    pathname.startsWith("/services")
                      ? "bg-[var(--surface-alt)] text-[var(--brand-700)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                  aria-expanded={desktopServicesOpen}
                  aria-controls="desktop-services-menu"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      desktopServicesOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {desktopServicesOpen ? (
                    <motion.div
                      id="desktop-services-menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-[calc(100%+0.8rem)] w-[21rem] rounded-[1.5rem] border border-[var(--border)] bg-white p-3 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)]"
                    >
                      <div className="space-y-1">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={closeMenus}
                            className="block rounded-[1.2rem] px-4 py-3 transition-colors duration-200 hover:bg-[var(--surface-alt)]"
                          >
                            <span className="block text-sm font-semibold text-[var(--foreground)]">
                              {service.label}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-[var(--muted-foreground)]">
                              {service.shortDescription}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive(pathname, link.href)
                      ? "bg-[var(--surface-alt)] text-[var(--brand-700)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Button href="/contact">Book a Strategy Call</Button>
            </div>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 text-[var(--foreground)] lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden border-t border-[var(--border)] lg:hidden"
              >
                <nav className="flex flex-col gap-2 py-4">
                  {navLinks.slice(0, 2).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm font-medium",
                        isActive(pathname, link.href)
                          ? "bg-[var(--surface-alt)] text-[var(--brand-700)]"
                          : "text-[var(--foreground)]",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]/70">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--foreground)]"
                      aria-expanded={mobileServicesOpen}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 px-2 pb-2">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={closeMenus}
                                className="rounded-xl px-3 py-2.5 text-sm text-[var(--muted-foreground)] transition-colors duration-200 hover:bg-white hover:text-[var(--foreground)]"
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm font-medium",
                        isActive(pathname, link.href)
                          ? "bg-[var(--surface-alt)] text-[var(--brand-700)]"
                          : "text-[var(--foreground)]",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Button href="/contact" className="mt-2 w-full">
                    Book a Strategy Call
                  </Button>
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}
