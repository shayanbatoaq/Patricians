import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
  variant?: "navbar" | "footer";
};

const logoSizes = {
  navbar: {
    width: 210,
    className: "w-[172px] sm:w-[196px]",
    sizes: "(max-width: 640px) 172px, 196px",
  },
  footer: {
    width: 252,
    className: "w-[198px] sm:w-[236px]",
    sizes: "(max-width: 640px) 198px, 236px",
  },
} as const;

export function Logo({
  className,
  iconOnly = false,
  variant = "navbar",
}: LogoProps) {
  const selected = logoSizes[variant];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center text-left", className)}
      aria-label="Patricians home"
    >
      <Image
        src="/patricians-logo.png"
        alt="Patricians"
        width={iconOnly ? 72 : selected.width}
        height={iconOnly ? 12 : Math.round((selected.width / 1080) * 182)}
        priority
        sizes={iconOnly ? "72px" : selected.sizes}
        className={cn(
          "h-auto object-contain",
          iconOnly ? "w-[72px]" : selected.className,
        )}
      />
    </Link>
  );
}
