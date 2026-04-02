import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export type SocialPlatform = "Instagram" | "Facebook" | "LinkedIn";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  platform: SocialPlatform;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SocialIcon({
  platform,
  className,
  ...props
}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {platform === "Instagram" ? (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...strokeProps} />
          <circle cx="12" cy="12" r="3.9" {...strokeProps} />
          <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
        </>
      ) : null}

      {platform === "Facebook" ? (
        <>
          <circle cx="12" cy="12" r="8.85" {...strokeProps} />
          <path
            fill="currentColor"
            d="M13.4 19.15v-5.08h1.92l.3-2.33H13.4V10.1c0-.74.2-1.27 1.35-1.27h1V6.74c-.37-.05-.97-.11-1.73-.11-2.35 0-3.72 1.42-3.72 4.02v1.09H8.45v2.33h1.85v5.08z"
          />
        </>
      ) : null}

      {platform === "LinkedIn" ? (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.6" {...strokeProps} />
          <circle cx="8" cy="8.05" r="1.05" fill="currentColor" />
          <path d="M8 10.8v5.25" {...strokeProps} />
          <path
            d="M11.25 16.05V10.8m0 2.05c.5-.88 1.34-1.35 2.36-1.35 1.76 0 2.89 1.19 2.89 3.4v1.15"
            {...strokeProps}
          />
        </>
      ) : null}
    </svg>
  );
}
