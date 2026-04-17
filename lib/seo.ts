import type { Metadata } from "next";

import { companyName, contactDetails, socialLinks } from "@/data/site";

export const siteUrl = "https://patricians.pk";
export const defaultSiteTitle = "Patricians | AI Automation & Web Development Agency";
export const defaultSiteDescription =
  "Patricians is an AI automation and web development agency building premium websites, branded AI systems, chatbot workflows, social media marketing operations, and modern mobile products.";
export const defaultOgImagePath = "/opengraph-image";

const defaultKeywords = [
  "Patricians",
  "Patricians agency",
  "Patricians AI automation",
  "Patricians web development",
  "AI automation agency",
  "web development agency",
  "AI chatbot agency",
  "social media marketing agency",
  "Meta marketing agency",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function getCanonicalUrl(path: string) {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");

  return new URL(normalizedPath, siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(path);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: companyName,
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
      title,
      description,
      images: [defaultOgImagePath],
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: companyName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description: defaultSiteDescription,
    email: contactDetails.email.value,
    telephone: contactDetails.phone.value,
    sameAs: socialLinks.map((item) => item.href),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: companyName,
    url: siteUrl,
    description: defaultSiteDescription,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en",
  };
}
