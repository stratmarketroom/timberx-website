import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import type { ProductPageData } from "@/lib/product-pages/types";

const modulniBudynkyPage: ProductPageData = {
  ...derevyaniFermyMzpPage,
  slug: "modulni-budynky",
  title: "Модульні будинки | TimberX",
  description:
    "Модульні будинки TimberX для девелоперів, бізнесу та громад: заводське виробництво, прогнозований бюджет і швидкий монтаж.",
  hero: {
    ...derevyaniFermyMzpPage.hero,
    eyebrow: "Продукт TimberX - модульні будинки",
    title: "Модульні будинки",
    description:
      "Заводські модульні рішення для девелоперів, бізнесу та громад із контрольованими строками, бюджетом і якістю.",
    imageSrc: "/images/projects/modular-wall.png",
    imageAlt: "Модульні будинки TimberX заводського виробництва",
  },
};

export const metadata: Metadata = {
  title: modulniBudynkyPage.title,
  description: modulniBudynkyPage.description,
};

export default function ModularHomesPage() {
  return <ProductPage page={modulniBudynkyPage} />;
}
