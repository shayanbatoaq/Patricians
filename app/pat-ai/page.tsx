import type { Metadata } from "next";

import { PatAIPageClient } from "@/components/pat-ai/PatAIPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pat AI | Patricians AI Assistant",
  description:
    "Chat with Pat AI to explore Patricians services, website pricing, AI automation, website assistants, marketing, and strategy call options.",
  path: "/pat-ai",
  keywords: [
    "Pat AI",
    "Patricians website assistant",
    "Patricians AI website assistant",
  ],
});

export default function PatAIPage() {
  return <PatAIPageClient />;
}
