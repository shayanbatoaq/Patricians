import type { Metadata } from "next";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Patricians | AI Systems, Websites, and Intelligent Growth",
    template: "%s | Patricians",
  },
  description:
    "Patricians is an AI-first company building premium websites, AI chatbots, AI-powered marketing workflows, and modern mobile products.",
  applicationName: "Patricians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
