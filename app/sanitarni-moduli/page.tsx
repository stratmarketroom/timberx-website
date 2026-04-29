import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import type { ProductPageData } from "@/lib/product-pages/types";
import { getSeoRobots } from "@/lib/seo-pages";

const sanitarniModuliPage: ProductPageData = {
  ...derevyaniFermyMzpPage,
  slug: "sanitarni-moduli",
  title: "Санітарно-технічні модулі | TimberX",
  description:
    "Санітарно-технічні модулі TimberX для житлових, соціальних, громадських і тимчасових об'єктів.",
  hero: {
    ...derevyaniFermyMzpPage.hero,
    eyebrow: "Продукт TimberX - санітарно-технічні модулі",
    title: "Санітарно-технічні модулі",
    description:
      "Готові санітарно-технічні модулі для швидкого підключення інфраструктури на житлових, соціальних і громадських об'єктах.",
    imageSrc: "/images/projects/modular-wall.png",
    imageAlt: "Санітарно-технічні модулі TimberX",
  },
};

export const metadata: Metadata = {
  title: sanitarniModuliPage.title,
  description: sanitarniModuliPage.description,
  alternates: {
    canonical: "/sanitarni-moduli/",
  },
  robots: getSeoRobots("/sanitarni-moduli/"),
};

export default function SanitaryModulesPage() {
  return <ProductPage page={sanitarniModuliPage} />;
}
