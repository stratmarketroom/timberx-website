export type ProductMetric = {
  label: string;
  value: string;
};

export type ProductProblemCard = {
  title: string;
  items: string[];
};

export type ProductFeature = {
  title: string;
  description: string;
  eyebrow?: string;
};

export type ProductApplication = {
  title: string;
  description: string;
};

export type ProductCaseStudy = {
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metrics?: ProductMetric[];
  href?: string;
};

export type ProductGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductFaqItem = {
  question: string;
  answer: string;
};

export type ProductLink = {
  label: string;
  href: string;
};

export type ProductPageData = {
  slug: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    primaryCta: ProductLink;
    secondaryCta: ProductLink;
    metrics: ProductMetric[];
    badges: string[];
  };
  problems: ProductProblemCard[];
  features: ProductFeature[];
  relatedLinks: ProductLink[];
  applications: ProductApplication[];
  caseStudy: ProductCaseStudy;
  secondaryCaseStudy?: ProductCaseStudy;
  gallery: {
    title: string;
    description: string;
    images: ProductGalleryImage[];
  };
  scale: ProductMetric[];
  specs: ProductSpec[];
  loads: ProductMetric[];
  precision: ProductMetric[];
  economics: ProductMetric[];
  process: string[];
  trust: ProductFeature[];
  faq: ProductFaqItem[];
  finalCta: {
    title: string;
    description: string;
    primaryCta: ProductLink;
    secondaryCta: ProductLink;
    bullets: string[];
  };
};
