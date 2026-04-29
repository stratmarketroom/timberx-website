import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";
import type { ProductPageData } from "@/lib/product-pages/types";
import { getSeoRobots } from "@/lib/seo-pages";

const kleyeniKonstruktsiiPage: ProductPageData = {
  ...derevyaniFermyMzpPage,
  slug: "kleyeni-konstruktsii",
  title: "Клеєні конструкції | TimberX",
  description:
    "Клеєні дерев'яні конструкції TimberX для складних інженерних, комерційних і громадських об'єктів.",
  hero: {
    ...derevyaniFermyMzpPage.hero,
    eyebrow: "Продукт TimberX - клеєні конструкції",
    title: "Клеєні конструкції",
    description:
      "Інженерні клеєні дерев'яні конструкції для об'єктів, де важливі міцність, геометрія, естетика та контроль виробництва.",
    imageSrc: "/images/production/truss-production.png",
    imageAlt: "Клеєні дерев'яні конструкції TimberX",
  },
};

export const metadata: Metadata = {
  title: kleyeniKonstruktsiiPage.title,
  description: kleyeniKonstruktsiiPage.description,
  alternates: {
    canonical: "/kleyeni-konstruktsii/",
  },
  robots: getSeoRobots("/kleyeni-konstruktsii/"),
};

export default function GlulamStructuresPage() {
  return <ProductPage page={kleyeniKonstruktsiiPage} />;
}
