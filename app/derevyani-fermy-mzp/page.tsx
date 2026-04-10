import type { Metadata } from "next";

import { ProductPage } from "@/components/product-page";
import { derevyaniFermyMzpPage } from "@/lib/product-pages/derevyani-fermy-mzp";

export const metadata: Metadata = {
  title: derevyaniFermyMzpPage.title,
  description: derevyaniFermyMzpPage.description,
};

export default function DerevyaniFermyMzpPage() {
  return <ProductPage page={derevyaniFermyMzpPage} />;
}
