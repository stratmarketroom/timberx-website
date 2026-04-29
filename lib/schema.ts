import { absoluteUrl, defaultOgImage, siteName, siteUrl } from "./seo-config";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ThingImage = {
  src?: string;
  alt?: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  image?: ThingImage;
  serviceType?: string;
  audience?: string[];
};

type ProductSchemaInput = {
  name: string;
  description: string;
  path: string;
  image?: ThingImage;
  category?: string;
  additionalProperties?: Array<{
    name: string;
    value: string;
  }>;
};

type ItemListItem = {
  name: string;
  path: string;
  description?: string;
  image?: string;
};

type CollectionPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  items: ItemListItem[];
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image?.src ?? defaultOgImage),
    serviceType: input.serviceType,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    audience: input.audience?.map((audienceType) => ({
      "@type": "Audience",
      audienceType,
    })),
    areaServed: ["Україна", "Європа"],
  };
}

export function buildProductSchema(input: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(input.path)}#product`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image?.src ?? defaultOgImage),
    category: input.category,
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    manufacturer: {
      "@id": `${siteUrl}/#organization`,
    },
    additionalProperty: input.additionalProperties?.map((property) => ({
      "@type": "PropertyValue",
      name: property.name,
      value: property.value,
    })),
  };
}

export function buildItemListSchema(items: ItemListItem[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageSchema(input: CollectionPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.path)}#collection`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntity: buildItemListSchema(input.items, input.name),
  };
}

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  };
}
