import { absoluteUrl, defaultOgImage, siteName, siteUrl } from "./seo-config";

export function getRootStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/images/logo/logo-manual-updated.png"),
      image: absoluteUrl(defaultOgImage),
      email: "eko-roof@ukr.net",
      telephone: "+380674121310",
      address: {
        "@type": "PostalAddress",
        streetAddress: "проспект Незалежності, 184, офіс 210",
        addressLocality: "Житомир",
        postalCode: "10001",
        addressCountry: "UA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+380674121310",
          email: "eko-roof@ukr.net",
          contactType: "sales",
          areaServed: ["UA", "EU"],
          availableLanguage: ["uk", "ru"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#local-business`,
      name: siteName,
      url: siteUrl,
      image: absoluteUrl(defaultOgImage),
      telephone: "+380674121310",
      email: "eko-roof@ukr.net",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Павлюченка, 31",
        addressLocality: "Біла Церква",
        addressRegion: "Київська область",
        postalCode: "09100",
        addressCountry: "UA",
      },
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "uk-UA",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ];
}
