import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import {
  absoluteUrl,
  defaultOgImage,
  siteLocale,
  siteName,
  siteUrl,
} from "@/lib/seo-config";
import { getRootStructuredData } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "TimberX — модульні будинки та інженерні дерев'яні конструкції",
  description:
    "TimberX — виробництво модульних будинків, клеєних конструкцій і ферм з металозубчатими пластинами для B2B та B2G проєктів. Інженерні розрахунки, заводська точність, контроль строків, кейси, гарантії та масштабування будівництва.",
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteLocale,
    url: siteUrl,
    siteName,
    title:
      "TimberX — модульні будинки та інженерні дерев'яні конструкції",
    description:
      "Виробництво модульних будинків, клеєних конструкцій і ферм з металозубчатими пластинами для B2B та B2G проєктів.",
    images: [
      {
        url: absoluteUrl(defaultOgImage),
        width: 1200,
        height: 630,
        alt: "Виробництво TimberX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "TimberX — модульні будинки та інженерні дерев'яні конструкції",
    description:
      "Виробництво модульних будинків, клеєних конструкцій і ферм з металозубчатими пластинами для B2B та B2G проєктів.",
    images: [absoluteUrl(defaultOgImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StructuredData data={getRootStructuredData()} />
        {children}
      </body>
    </html>
  );
}
