import { normalizeSeoPath, placeholderSeoPages } from "./seo-pages";
import type { SeoPageSection } from "./seo-pages";

export type SitePageSection = Exclude<SeoPageSection, "home" | "projects">;

export type SitePage = {
  slug: string[];
  title: string;
  description: string;
  section: SitePageSection;
  cluster: string;
};

function pathToSlug(path: string) {
  return normalizeSeoPath(path)
    .split("/")
    .filter(Boolean);
}

export const sitePages: SitePage[] = placeholderSeoPages.map((page) => ({
  slug: pathToSlug(page.path),
  title: page.title,
  description: page.description,
  section: page.section as SitePageSection,
  cluster: page.cluster,
}));

export const sitePageMap = new Map(
  sitePages.map((page) => [page.slug.join("/"), page]),
);

export function findSitePage(slug: string[]) {
  return sitePageMap.get(slug.join("/"));
}
