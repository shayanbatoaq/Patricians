"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";

import { PatAIChatPanel } from "@/components/pat-ai/PatAIChatPanel";

export function PatAIWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 640px)");
    const initialViewportFrame = window.requestAnimationFrame(() => {
      setOpen(desktopQuery.matches);
    });
    const openPatAI = () => setOpen(true);
    const syncWithViewport = (event: MediaQueryListEvent) => {
      setOpen(event.matches);
    };

    window.addEventListener("pat-ai:open", openPatAI);
    desktopQuery.addEventListener("change", syncWithViewport);

    return () => {
      window.cancelAnimationFrame(initialViewportFrame);
      window.removeEventListener("pat-ai:open", openPatAI);
      desktopQuery.removeEventListener("change", syncWithViewport);
    };
  }, []);

  if (pathname === "/pat-ai") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] h-[100svh] w-screen sm:bottom-24 sm:right-6 sm:top-auto sm:left-auto sm:h-[650px] sm:w-[400px]"
          >
            <PatAIChatPanel onClose={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!open ? (
          <motion.button
            key="button"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full p-[1px] shadow-[0_18px_55px_-28px_rgba(17,94,212,0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-300)] focus-visible:ring-offset-2"
            aria-label="Open Pat AI"
          >
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#115ed4_0%,#7c3aed_55%,#8ab8ff_100%)] opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-[var(--brand-700)] transition-colors duration-300 group-hover:bg-[linear-gradient(135deg,#115ed4_0%,#7c3aed_100%)] group-hover:text-white">
              <Bot className="h-5 w-5" />
              <span className="mt-0.5 text-[0.63rem] font-bold leading-none">
                Pat AI
              </span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
