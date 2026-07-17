import type { MetadataRoute } from "next";

import { clientele } from "@/data/clientele";
import { services } from "@/data/site";
import { getCanonicalUrl, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getCanonicalUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/services"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/clientele"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: getCanonicalUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: getCanonicalUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const clienteleRoutes: MetadataRoute.Sitemap = clientele.map((client) => ({
    url: getCanonicalUrl(`/clientele/${client.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...clienteleRoutes];
}
