import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  eyebrow = "Next Step",
  title,
  description,
  primaryLabel = "Book a Strategy Call",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,#0f2d72_0%,#115ed4_44%,#5fa0ff_100%)] px-7 py-10 text-white shadow-[0_30px_90px_-45px_rgba(8,45,134,0.7)] sm:px-10 sm:py-14">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_62%)] blur-2xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {eyebrow}
                </span>
                <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-[3rem]">
                  {title}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  {description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:self-center">
                <Button href={primaryHref} variant="light" className="min-w-[12.5rem]">
                  {primaryLabel}
                </Button>
                {secondaryLabel && secondaryHref ? (
                  <Button
                    href={secondaryHref}
                    variant="lightGhost"
                    className="min-w-[12.5rem]"
                  >
                    {secondaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
