import type { MetadataRoute } from "next";

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

  return [...staticRoutes, ...serviceRoutes];
}
