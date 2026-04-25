import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import type { ProductPageData } from "@/lib/product-pages/types";

const karkasnoPanelniBudynkyPage: ProductPageData = {
  ...derevyaniFermyMzpPage,
  slug: "karkasno-panelni-budynky",
  title: "Каркасно-модульні будинки | TimberX",
  description:
    "Каркасно-модульні будинки TimberX для швидкого будівництва житлових, комерційних і соціальних об'єктів.",
  hero: {
    ...derevyaniFermyMzpPage.hero,
    eyebrow: "Продукт TimberX - каркасно-модульні будинки",
    title: "Каркасно-модульні будинки",
    description:
      "Каркасно-модульна технологія для швидкого запуску об'єктів із заводською точністю та прогнозованою комплектацією.",
    imageSrc: "/images/projects/modular-wall.png",
    imageAlt: "Каркасно-модульні будинки TimberX",
  },
};

export const metadata: Metadata = {
  title: karkasnoPanelniBudynkyPage.title,
  description: karkasnoPanelniBudynkyPage.description,
};

export default function FramePanelHomesPage() {
  return <ProductPage page={karkasnoPanelniBudynkyPage} />;
}
