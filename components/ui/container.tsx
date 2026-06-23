import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
