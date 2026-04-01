import type { Metadata } from "next";

import { ArrowUpRight, MessagesSquare, ShieldCheck, TimerReset } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { contactFaq } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Patricians about premium websites, AI chatbots, AI-powered marketing systems, or mobile product development.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start the right conversation, then build with clarity"
        description="If you are planning a premium website, a chatbot, a smarter marketing workflow, or an AI-enhanced mobile product, Patricians can help shape the path forward."
      >
        <div className="rounded-[1.8rem] border border-[var(--border)] bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.28)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-700)]">
            Best inquiries include
          </p>
          <div className="mt-4 space-y-4">
            {[
              "The business problem you want to solve",
              "Which service or outcome matters most right now",
              "Any timing, launch, or process constraints we should know",
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
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Contact Information"
              title="A premium inquiry process with direct communication"
              description="You do not need a perfect brief. A clear business need, current bottleneck, or launch goal is enough to start the conversation."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: MessagesSquare,
                title: "Project Inquiry",
                text: "Share what you want to build, improve, or automate and we will shape the right next step.",
              },
              {
                icon: TimerReset,
                title: "Fast Response Path",
                text: "The process is designed to move quickly from inquiry to a focused strategy conversation.",
              },
              {
                icon: ShieldCheck,
                title: "Founder-Led Attention",
                text: "Expect clear communication, thoughtful scoping, and a premium delivery mindset from the start.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="h-full rounded-[1.7rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)]">
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
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-alt)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div className="rounded-[1.8rem] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.22)]">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    Reassurance before we start
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    Whether you already know the exact service you need or you are
                    still sorting through the options, the goal is to help you get
                    to the right build path quickly.
                  </p>
                </div>

                {contactFaq.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.6rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)]"
                  >
                    <h3 className="text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {item.answer}
                    </p>
                  </article>
                ))}

                <Button href="/services" variant="secondary" className="w-full">
                  Review the service lineup
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="If the opportunity is clear, the next step is simple"
        description="Tell us what you want to automate, launch, or improve and we will help map the best route."
        primaryLabel="Submit an Inquiry"
        primaryHref="/contact"
        secondaryLabel="See Services"
        secondaryHref="/services"
      />
    </>
  );
}
