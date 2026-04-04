import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import {
  defaultOgImagePath,
  defaultSiteDescription,
  defaultSiteTitle,
  getOrganizationSchema,
  getWebsiteSchema,
  siteUrl,
} from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSiteTitle,
  description: defaultSiteDescription,
  applicationName: "Patricians",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: defaultSiteTitle,
    description: defaultSiteDescription,
    url: siteUrl,
    siteName: "Patricians",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: defaultOgImagePath,
        width: 1200,
        height: 630,
        alt: "Patricians branded preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteTitle,
    description: defaultSiteDescription,
    images: [defaultOgImagePath],
  },
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
      className="h-full overflow-x-hidden antialiased"
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
