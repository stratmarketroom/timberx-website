const fallbackSiteUrl = "https://timberx.com.ua";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getConfiguredSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    fallbackSiteUrl;

  if (siteUrl.startsWith("http://") || siteUrl.startsWith("https://")) {
    return normalizeSiteUrl(siteUrl);
  }

  return normalizeSiteUrl(`https://${siteUrl}`);
}

export const siteUrl = getConfiguredSiteUrl();
export const siteName = "TimberX";
export const siteLocale = "uk_UA";
export const defaultOgImage = "/images/hero/hero-factory.jpg";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}
