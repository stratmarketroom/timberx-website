import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SitePlaceholderPage } from "../../components/site-placeholder-page";
import { findSitePage, sitePages } from "../../lib/site-pages";

type RouteParams = {
  slug: string[];
};

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Metadata {
  const page = findSitePage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | TimberX`,
    description: page.description,
  };
}

export default function SitePage({
  params,
}: {
  params: RouteParams;
}) {
  const page = findSitePage(params.slug);

  if (!page) {
    notFound();
  }

  const canonicalPath = `/${params.slug.join("/")}/`;

  return <SitePlaceholderPage page={page} canonicalPath={canonicalPath} />;
}
