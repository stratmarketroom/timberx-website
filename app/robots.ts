import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo-config";
import { nonIndexableSeoPages } from "@/lib/seo-pages";

const disallowedPaths = Array.from(
  new Set(
    nonIndexableSeoPages
      .filter((page) => page.status === "draft/placeholder" || page.status === "deprecated")
      .map((page) => page.path),
  ),
).sort();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
