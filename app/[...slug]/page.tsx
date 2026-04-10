import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SitePlaceholderPage } from "../../components/site-placeholder-page";
import { findSitePage, sitePages } from "../../lib/site-pages";

type RouteParams = {
  slug: string[];
};
type RouteProps = {
  params: Promise<RouteParams>;
};

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findSitePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | TimberX`,
    description: page.description,
  };
}

export default async function SitePage({
  params,
}: RouteProps) {
  const { slug } = await params;
  const page = findSitePage(slug);

  if (!page) {
    notFound();
  }

  const canonicalPath = `/${slug.join("/")}/`;

  return <SitePlaceholderPage page={page} canonicalPath={canonicalPath} />;
}
