import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import type { ProductPageData } from "@/lib/product-pages/types";

const fakhverkoviBudynkyPage: ProductPageData = {
  ...derevyaniFermyMzpPage,
  slug: "fakhverkovi-budynky",
  title: "Фахверкові будинки | TimberX",
  description:
    "Фахверкові будинки TimberX з інженерними дерев'яними конструкціями, великим склінням і заводською точністю.",
  hero: {
    ...derevyaniFermyMzpPage.hero,
    eyebrow: "Продукт TimberX - фахверкові будинки",
    title: "Фахверкові будинки",
    description:
      "Фахверкові будинки з виразною дерев'яною конструкцією, великими світловими прорізами та точним заводським виготовленням.",
    imageSrc: "/images/projects/modular-wall.png",
    imageAlt: "Фахверкові будинки TimberX",
  },
};

export const metadata: Metadata = {
  title: fakhverkoviBudynkyPage.title,
  description: fakhverkoviBudynkyPage.description,
};

export default function FachwerkHomesPage() {
  return <ProductPage page={fakhverkoviBudynkyPage} />;
}
