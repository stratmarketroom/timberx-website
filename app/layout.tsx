import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "TimberX — модульні будинки, клеєні конструкції та ферми МЗП для девелоперів, забудовників і громад",
  description:
    "TimberX — виробництво модульних будинків, клеєних конструкцій і ферм МЗП для B2B та B2G проєктів. Інженерні розрахунки, заводська точність, контроль строків, кейси, гарантії та масштабування будівництва.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
