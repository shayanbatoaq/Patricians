"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
