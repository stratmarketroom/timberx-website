import type { Metadata } from "next";

import { StructuredData } from "@/components/structured-data";
import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
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
          buildServiceSchema({
            name: derevyaniFermyMzpPage.hero.title,
            description: derevyaniFermyMzpPage.hero.description,
            path: "/derevyani-fermy-mzp/",
            image: {
              src: derevyaniFermyMzpPage.hero.imageSrc,
              alt: derevyaniFermyMzpPage.hero.imageAlt,
            },
            serviceType: "Проєктування, виробництво та монтаж дерев'яних ферм з металозубчатими пластинами",
            audience: ["Девелопери", "Забудовники", "Генпідрядники"],
          }),
          buildFaqSchema(derevyaniFermyMzpPage.faq),
        ]}
      />
      <ProductPage page={derevyaniFermyMzpPage} />
    </>
  );
}
