import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo-config";
import { indexableSeoPages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableSeoPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : Math.max(0.5, 1 - page.priority * 0.1),
  }));
}
