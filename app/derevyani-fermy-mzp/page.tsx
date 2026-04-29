import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildProductSchema,
} from "@/lib/schema";
import { getSeoRobots } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: derevyaniFermyMzpPage.title,
  description: derevyaniFermyMzpPage.description,
  alternates: {
    canonical: "/derevyani-fermy-mzp/",
  },
  robots: getSeoRobots("/derevyani-fermy-mzp/"),
};

export default function DerevyaniFermyMzpPage() {
  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Головна", path: "/" },
            {
              name: "Ферми з металозубчатими пластинами",
              path: "/derevyani-fermy-mzp/",
            },
          ]),
          buildProductSchema({
            name: derevyaniFermyMzpPage.hero.title,
            description: derevyaniFermyMzpPage.hero.description,
            path: "/derevyani-fermy-mzp/",
            image: {
              src: derevyaniFermyMzpPage.hero.imageSrc,
              alt: derevyaniFermyMzpPage.hero.imageAlt,
            },
            category: "Дерев'яні ферми з металозубчатими пластинами",
            additionalProperties: derevyaniFermyMzpPage.specs.map((spec) => ({
              name: spec.label,
              value: spec.value,
            })),
          }),
          buildFaqSchema(derevyaniFermyMzpPage.faq),
        ]}
      />
      <ProductPage page={derevyaniFermyMzpPage} />
    </>
  );
}
