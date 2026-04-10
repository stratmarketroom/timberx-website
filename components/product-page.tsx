"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { LineIcon } from "@/components/home-visuals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { ProductFaqItem, ProductGalleryImage, ProductPageData } from "@/lib/product-pages/types";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const sectionNav = [
  { label: "Задача", href: "#problem" },
  { label: "Рішення", href: "#solution" },
  { label: "Кейси", href: "#cases" },
  { label: "Галерея", href: "#gallery" },
  { label: "Специфікація", href: "#specs" },
  { label: "FAQ", href: "#faq" },
  { label: "Прорахунок", href: "#cta" },
];
const applicationImages = [
  {
    src: "/images/fermy-mzp/object-building-frame-1.jpg",
    className: "object-[50%_48%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.72)_34%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    src: "/images/fermy-mzp/object-frame-house-1.jpg",
    className: "object-[52%_48%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.88)_0%,rgba(17,18,20,0.68)_36%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    src: "/images/fermy-mzp/object-wide-frame-1.jpg",
    className: "object-[50%_50%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.92)_0%,rgba(17,18,20,0.72)_36%,rgba(17,18,20,0.18)_100%)]",
  },
  {
    src: "/images/fermy-mzp/object-white-truss-hall-1.jpg",
    className: "object-[54%_48%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.7)_34%,rgba(17,18,20,0.22)_100%)]",
  },
] as const;
const applicationIcons = ["projects", "factory", "delivery", "beam"] as const;
const caseSlideMetricIcons = ["beam", "weight", "snow", "wind"] as const;
function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
          {title}
        </h2>
        {description ? (
          <p className={`${bodyClass} mt-4 text-base leading-7 text-[#d0d0d0]`}>
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

function HeroSection({ page }: { page: ProductPageData }) {
  const [eyebrowPrefix, eyebrowSuffix = ""] = page.hero.eyebrow.split("TimberX");

  return (
    <section className="relative min-h-[100svh] overflow-hidden md:min-h-[100vh]">
      <div className="absolute inset-0">
        <Image
          src={page.hero.imageSrc}
          alt={page.hero.imageAlt}
          fill
          priority
          className="object-cover object-[62%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1B1D1F]/50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.92)_0%,rgba(18,19,21,0.8)_28%,rgba(18,19,21,0.34)_58%,rgba(18,19,21,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.12),rgba(17,18,20,0.18)_36%,rgba(17,18,20,0.52)_100%)]" />
      </div>

      <div className="relative z-20">
        <SiteHeader />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center md:min-h-[100vh]">
        <div className="w-full px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-14 lg:px-6 lg:pb-24 lg:pt-16">
          <div className="mx-auto max-w-[88rem]">
            <div className="max-w-[56rem]">
              <nav
                aria-label="Breadcrumb"
                className={`${bodyClass} mb-6 flex flex-wrap items-center gap-2 text-sm text-white/58`}
              >
                <Link href="/" className="transition hover:text-white">
                  Головна
                </Link>
                <span>/</span>
                <span className="text-white">Дерев&apos;яні ферми МЗП</span>
              </nav>
              <p className="mb-5 inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                <span>{eyebrowPrefix}Timber</span>
                <span className="text-[#F2994A]">X</span>
                <span>{eyebrowSuffix}</span>
              </p>
              <h1
                className={`${headingClass} text-[2.7rem] leading-[1.01] text-white sm:text-[4.45rem] md:text-[3.55rem] lg:text-[3.9rem] xl:text-[4.2rem]`}
              >
                <span className="block">Дерев&apos;яні ферми МЗП</span>
                <span className="block">для дахів ЖК, складів,</span>
                <span className="block">бізнес-об&apos;єктів та будинків</span>
              </h1>
              <div className="mt-7 max-w-[43rem] space-y-4 text-base leading-8 text-white/72 md:text-[1.15rem]">
                <p>{page.hero.description}</p>
              </div>

              <div className="mt-10 grid w-full max-w-[46rem] gap-4 sm:grid-cols-2">
                <Link
                  href={page.hero.primaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232] hover:shadow-[0_22px_44px_rgba(242,153,74,0.34)]"
                >
                  {page.hero.primaryCta.label}
                </Link>
                <Link
                  href={page.hero.secondaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-[10px] border border-white/18 bg-[rgba(255,255,255,0.04)] px-6 py-4 text-center text-base font-semibold text-white transition hover:border-white/36 hover:bg-white/8"
                >
                  {page.hero.secondaryCta.label}
                </Link>
              </div>

              <div className="mt-8 grid w-full max-w-[46rem] gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-sm text-white/78 sm:mt-12 sm:grid-cols-3 sm:pt-8 sm:text-base">
                {page.hero.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2.5">
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-[999px] border border-[#F2994A]/38 bg-[linear-gradient(180deg,rgba(242,153,74,0.16),rgba(242,153,74,0.05))] text-[#F2994A] shadow-[0_10px_20px_rgba(242,153,74,0.1)]">
                      <span className="absolute inset-[3px] rounded-[999px] border border-[#F2994A]/16" />
                      <span className="relative text-[0.7rem] font-semibold">✓</span>
                    </span>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: ProductGalleryImage[];
}) {
  if (!images.length) {
    return null;
  }

  const categories = ["Виробництво", "Відвантаження", "Об'єкт"] as const;
  const groupedImages = categories
    .map((category) => ({
      category,
      images: images.filter((image) => image.label === category),
    }))
    .filter((group) => group.images.length > 0);

  const featured = groupedImages[0]?.images[0];

  if (!featured) {
    return null;
  }

  return (
    <SectionShell
      id="gallery"
      title={title}
      description={description}
      eyebrow="Візуальний доказ"
    >
      <div className="space-y-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#202326]">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,20,0.04)_0%,rgba(16,18,20,0.58)_100%)]" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[#1b1d1f]/82 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[#f4dfcf]">
              {featured.label}
            </span>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#202326] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
              Логіка галереї
            </p>
            <div className={`${bodyClass} mt-4 space-y-4 text-sm leading-7 text-[#d0d0d0]`}>
              <p>
                Галерея побудована як маршрут довіри: спочатку замовник бачить
                реальне виробництво, далі логістику й відвантаження, а потім
                готові об&apos;єкти та монтаж.
              </p>
              <p>
                Це допомагає швидко відповісти на три питання: чи ви реально
                виробляєте, чи вмієте відвантажувати, і чи є підтверджені
                об&apos;єкти в роботі.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {groupedImages.map((group) => (
            <div
              key={group.category}
              className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className={`${headingClass} text-xl text-white`}>{group.category}</h3>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-[#d0d0d0]">
                  {group.images.length} фото
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {group.images.map((image) => (
                  <div
                    key={`${image.src}-${image.label}`}
                    className="relative min-h-[170px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#17191b]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 28vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,20,0.03)_0%,rgba(16,18,20,0.62)_100%)]" />
                    <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[#1b1d1f]/82 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f4dfcf]">
                      {group.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function FaqSection({ items }: { items: ProductFaqItem[] }) {
  return (
    <SectionShell
      id="faq"
      title="FAQ"
      description="Короткі відповіді на питання, які найчастіше виникають у забудовників, генпідрядників і замовників перед попереднім прорахунком."
      eyebrow="Питання та відповіді"
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dfcf]">
          4 ключові питання
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a9abad]">
          Ціна
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a9abad]">
          Строки
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a9abad]">
          Великі прольоти
        </span>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[1.5rem] border border-white/10 bg-[#202326] p-5 transition hover:border-[#f2994a]/25"
          >
            <summary
              className={`${headingClass} flex cursor-pointer list-none items-start justify-between gap-4 text-lg text-white`}
            >
              <span>{item.question}</span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className={`${bodyClass} mt-4 max-w-4xl border-t border-white/8 pt-4 text-sm leading-7 text-[#d0d0d0]`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProductPage({ page }: { page: ProductPageData }) {
  const [currentCase, setCurrentCase] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const caseSlides = [
    {
      key: "case-01",
      badge: "Case 01",
      title: page.caseStudy.title,
      challenge: page.caseStudy.challenge,
      solution: page.caseStudy.solution,
      result: page.caseStudy.result,
      metrics: [
        { value: "22 м", label: "проліт без внутрішніх опор" },
        { value: "469 кг", label: "вага однієї ферми" },
        { value: "1370 N/m²", label: "снігове навантаження" },
        { value: "500 N/m²", label: "вітрове навантаження" },
      ],
      imageSrc: "/images/fermy-mzp/case-wide-span-hall.png",
      imageAlt: "Великопролітна конструкція з дерев'яними фермами МЗП",
      imageClassName: "object-[50%_32%]",
    },
    page.secondaryCaseStudy
      ? {
          key: "case-02",
          badge: "Case 02",
          title: page.secondaryCaseStudy.title,
          challenge: page.secondaryCaseStudy.challenge,
          solution: page.secondaryCaseStudy.solution,
          result: page.secondaryCaseStudy.result,
          metrics: [
            { value: "3x", label: "швидший монтаж покрівельної системи" },
            ...(page.secondaryCaseStudy.metrics ?? []),
          ],
          imageSrc: "/images/fermy-mzp/object-block-building-1.jpg",
          imageAlt: "Серійна забудова ЖК з дерев'яними фермами МЗП",
          imageClassName: "object-[50%_34%]",
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    badge: string;
    title: string;
    challenge: string;
    solution: string;
    result: string;
    metrics: Array<{ value: string; label: string }>;
    imageSrc: string;
    imageAlt: string;
    imageClassName: string;
  }>;

  const handleCaseSwipe = (touchEndX: number) => {
    if (touchStartX === null) return;

    const delta = touchStartX - touchEndX;

    if (delta > 60 && currentCase < caseSlides.length - 1) {
      setCurrentCase(currentCase + 1);
    }

    if (delta < -60 && currentCase > 0) {
      setCurrentCase(currentCase - 1);
    }

    setTouchStartX(null);
  };

  return (
    <div className="min-h-screen bg-[#1b1d1f] text-white">
      <style jsx global>{`
        @keyframes caseMetricReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <HeroSection page={page} />
      <main className="mx-auto w-full max-w-[88rem] px-4 pb-12 md:px-6 md:pb-16 lg:px-6 lg:pb-20">
        <nav className="sticky top-3 z-20 overflow-x-auto rounded-full border border-white/10 bg-[#17191b]/90 px-3 py-3 backdrop-blur lg:hidden">
          <ul className="flex min-w-max items-center gap-2">
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${bodyClass} inline-flex rounded-full border border-transparent px-4 py-2 text-sm text-[#d0d0d0] transition hover:border-[#f2994a]/35 hover:bg-white/6 hover:text-white`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-12">
	          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[1.75rem] border border-white/10 bg-[#17191b]/92 p-4 backdrop-blur">
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Навігація
              </p>
              <nav className="mt-4">
                <ul className="space-y-1.5">
                  {sectionNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`${bodyClass} flex items-center rounded-[0.95rem] border border-transparent px-3 py-3 text-sm text-[#d0d0d0] transition hover:border-[#f2994a]/25 hover:bg-white/6 hover:text-white`}
                      >
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-[#f2994a]" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-10 lg:gap-12 lg:pt-5">
        <section id="problem" className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                Задача
              </p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                Швидко закрити дахову систему без перевитрат і затримок на майданчику
              </h2>
            </div>
            <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0] lg:justify-self-end`}>
              Кожен, хто інтегрує крокв&apos;яні системи у свої проєкти, стикається
              з власним колом викликів. Залежно від вашої ролі, неефективні
              рішення б&apos;ють по різних показниках: від фінансових збитків до
              репутаційних втрат.
            </p>
          </div>

          <div className="grid gap-8 border-y border-[#f2994a]/18 py-8 lg:grid-cols-3 lg:gap-10 lg:py-10">
            {page.problems.map((problem, problemIndex) => (
              <div key={problem.title} className="relative">
                {problemIndex > 0 ? (
                  <div className="absolute -left-5 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.38),rgba(242,153,74,0.08))] lg:block" />
                ) : null}
                <div>
                    <h3 className={`${headingClass} text-[2rem] leading-[1.08] text-white`}>
                      {problem.title}
                    </h3>
                    <ul className={`${bodyClass} mt-6 space-y-5 text-base leading-8 text-[#d0d0d0]`}>
                      {problem.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f2994a]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="solution"
          className="relative overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                  Рішення
                </p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                  Що дає рішення від Timber<span className="text-[#f2994a]">X</span>
                </h2>
                <p className={`${bodyClass} mt-4 max-w-2xl text-base leading-8 text-[#d0d0d0]`}>
                  Дерев&apos;яні ферми МЗП подаються як інженерний продукт для швидкого
                  й прогнозованого будівництва, а не як ручна збірка на об&apos;єкті.
                </p>
              </div>

              <div className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#202326] shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
                <Image
                  src="/images/fermy-mzp/object-roof-joint-detail-1.jpg"
                  alt="Інженерний вузол дерев'яної ферми МЗП на об'єкті"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.04),rgba(17,18,20,0.68)_100%)]" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/12 bg-[#17191b]/72 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                    Інженерний підхід
                  </p>
                  <p className={`${bodyClass} mt-2 text-sm leading-6 text-white/78`}>
                    Розрахунок, контроль геометрії та готовність до монтажу замінюють
                    ручну &quot;підгонку&quot; конструкції на майданчику.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {page.features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-5">
                    <span className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-sm font-semibold text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                      <span className="absolute inset-[5px] rounded-[11px] border border-[#f2994a]/18" />
                      <span className="relative">{index + 1}</span>
                    </span>
                    <div>
                      {feature.eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                          {feature.eyebrow}
                        </p>
                      ) : null}
                      <h3 className={`${headingClass} mt-2 text-2xl leading-tight text-white`}>
                        {feature.title}
                      </h3>
                      <p className={`${bodyClass} mt-3 text-sm leading-7 text-[#d0d0d0]`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 xl:flex-row xl:flex-nowrap">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${bodyClass} group inline-flex items-center justify-between gap-3 rounded-[12px] border border-[#f2994a]/26 bg-[linear-gradient(180deg,rgba(242,153,74,0.14),rgba(255,255,255,0.045))] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(242,153,74,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/62 hover:bg-[#f2994a] hover:text-[#1b1d1f] hover:shadow-[0_22px_44px_rgba(242,153,74,0.18)] xl:flex-1 xl:whitespace-nowrap`}
              >
                <span>{link.label}</span>
                <span className="text-[#f2994a] transition group-hover:text-[#1b1d1f]">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="applications"
          className="space-y-10"
        >
          <div className="max-w-[58rem]">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#f2994a]">
              Сфера застосування
            </p>
            <h2 className={`${headingClass} text-3xl leading-tight text-white sm:text-4xl lg:text-[2.8rem]`}>
              Де це вже працює
            </h2>
            <p className={`${bodyClass} mt-6 max-w-3xl text-lg leading-8 text-white/78`}>
              Ферми МЗП працюють там, де важливі повторюваність конструкцій,
              швидкий монтаж і прогнозована логіка перекриття великих площ.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {page.applications.map((application, index) => (
              <div
                key={application.title}
                className="group relative min-h-[23rem] overflow-hidden rounded border border-white/12 bg-[#25282b] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#f2994a]/42 hover:shadow-[0_32px_84px_rgba(0,0,0,0.32)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
                <div className="relative h-full min-h-[21rem] overflow-hidden bg-[#202326]">
                  <Image
                    src={applicationImages[index]?.src ?? "/images/fermy-mzp/production-truss-frame-1.png"}
                    alt={application.title}
                    fill
                    className={`object-cover transition duration-300 group-hover:scale-[1.04] ${
                      applicationImages[index]?.className ?? "object-[50%_50%]"
                    }`}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                  <div className={`absolute inset-0 ${applicationImages[index]?.overlay ?? "bg-[linear-gradient(90deg,rgba(17,18,20,0.9),rgba(17,18,20,0.24))]"}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.18)_42%,rgba(17,18,20,0.68)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                  <div className="relative flex h-full min-h-[21rem] flex-col justify-end px-7 pb-7 pt-28">
                    <div className="absolute left-7 top-7 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#f2994a]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#f2994a] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition duration-200 group-hover:border-[#f2994a]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                      <div className="absolute inset-[6px] rounded-[13px] border border-[#f2994a]/20" />
                      <LineIcon
                        name={applicationIcons[index] ?? "beam"}
                        className="relative h-10 w-10"
                      />
                    </div>
                    <h3 className={`${headingClass} max-w-[18rem] text-[1.85rem] leading-[1.04] text-white transition group-hover:text-[#f2994a] sm:text-[2.15rem]`}>
                      {application.title}
                    </h3>
                    <p className={`${bodyClass} mt-5 max-w-[30rem] text-base leading-7 text-white/78`}>
                      {application.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

          </div>
        </div>

        <section
          id="cases"
          className="relative mt-14 mb-14 lg:col-span-2 lg:mt-16 lg:mb-16"
          onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleCaseSwipe(event.changedTouches[0]?.clientX ?? 0)}
        >
          <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-hidden bg-[#151719]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentCase * 100}vw)` }}
            >
              {caseSlides.map((slide, slideIndex) => (
                <article
                  key={slide.key}
                  className="relative min-h-[31rem] w-screen shrink-0 overflow-hidden bg-[#151719] lg:min-h-[33rem]"
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    className={`object-cover ${slide.imageClassName}`}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,20,0.995)_0%,rgba(17,18,20,0.95)_24%,rgba(17,18,20,0.76)_44%,rgba(17,18,20,0.42)_68%,rgba(17,18,20,0.2)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.1),rgba(17,18,20,0.2)_42%,rgba(17,18,20,0.66)_100%)]" />
                  <div className="absolute inset-y-0 left-0 w-[48%] bg-[radial-gradient(circle_at_left_center,rgba(17,18,20,0.5),transparent_72%)]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />

                  <div className="relative mx-auto flex min-h-[31rem] w-full max-w-[88rem] flex-col justify-between px-4 py-9 md:px-6 md:py-10 lg:min-h-[33rem] lg:px-6 lg:py-9 lg:translate-y-10">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:items-stretch">
                      <div className="max-w-[30rem] lg:max-w-[32rem]">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f2994a]">
                          {slide.badge}
                        </p>
                        <h2 className={`${headingClass} mt-4 text-[2.35rem] leading-[0.98] text-white sm:text-[2.8rem] lg:text-[3.1rem]`}>
                          {slide.title}
                        </h2>

                        <div className={`${bodyClass} mt-7 space-y-5 text-base leading-8 text-[#d7d7d7]`}>
                          <div>
                            <p className="mb-2 text-[1.02rem] font-semibold text-white">Задача:</p>
                            <p>{slide.challenge}</p>
                          </div>
                          <div>
                            <p className="mb-2 text-[1.02rem] font-semibold text-white">Рішення:</p>
                            <p>{slide.solution}</p>
                          </div>
                          <div>
                            <p className="mb-2 text-[1.02rem] font-semibold text-white">Результат:</p>
                            <p>{slide.result}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 self-stretch lg:pt-[4.6rem]">
                        <div className="grid h-full content-between gap-5">
                          {slide.metrics.map((metric, metricIndex) => (
                            <div
                              key={`${slide.key}-${metric.label}`}
                              className="min-w-0"
                              style={{
                                animation: "caseMetricReveal 0.5s ease-out forwards",
                                animationDelay: `${metricIndex * 120}ms`,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                                  <div className="absolute inset-[5px] rounded-[10px] border border-[#f2994a]/18" />
                                  <LineIcon
                                    name={caseSlideMetricIcons[metricIndex] ?? "beam"}
                                    className="relative h-6 w-6"
                                  />
                                </div>
                                <p className="text-xl font-semibold text-white">{metric.value}</p>
                              </div>
                              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>

                        {slideIndex === 0 && page.secondaryCaseStudy ? (
                          <button
                            type="button"
                            onClick={() => setCurrentCase(1)}
                            className="group relative hidden w-full max-w-[25rem] overflow-hidden rounded-[2rem] border border-white/7 bg-[#202326]/76 px-7 py-6 text-left shadow-[0_24px_56px_rgba(0,0,0,0.26)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/42 hover:bg-[#202326]/84 hover:shadow-[0_30px_80px_rgba(242,153,74,0.14)] lg:absolute lg:bottom-10 lg:right-6 lg:block"
                          >
                            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.76),rgba(242,153,74,0))]" />
                            <div className="flex items-center justify-between gap-5">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                                  Case 02
                                </p>
                                <h3 className={`${headingClass} mt-3 text-[2rem] leading-tight text-white`}>
                                  {page.secondaryCaseStudy.title}
                                </h3>
                                <p className={`${bodyClass} mt-3 text-base leading-7 text-[#d0d0d0]`}>
                                  {page.secondaryCaseStudy.challenge}
                                </p>
                              </div>
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f2994a]/45 bg-[#f2994a] text-xl font-semibold text-[#1b1d1f] shadow-[0_14px_28px_rgba(242,153,74,0.26)] transition group-hover:translate-x-1">
                                →
                              </span>
                            </div>
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {slideIndex === caseSlides.length - 1 ? (
                      <div className="mt-8">
                        <Link
                          href={page.caseStudy.href ?? "/derevyani-fermy-mzp/cases/"}
                          className="inline-flex items-center rounded-[1rem] bg-[#f2994a] px-6 py-4 text-base font-semibold text-[#1b1d1f] shadow-[0_18px_42px_rgba(242,153,74,0.24)] transition hover:-translate-y-0.5 hover:bg-[#ffab5f]"
                        >
                          Дивитись інші кейси
                        </Link>
                      </div>
                    ) : null}

                    {slideIndex === 0 && page.secondaryCaseStudy ? (
                      <button
                        type="button"
                        onClick={() => setCurrentCase(1)}
                        className="group relative mt-6 w-full overflow-hidden rounded-[2rem] border border-white/7 bg-[#202326]/76 px-7 py-6 text-left shadow-[0_24px_56px_rgba(0,0,0,0.26)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/42 hover:bg-[#202326]/84 hover:shadow-[0_30px_80px_rgba(242,153,74,0.14)] lg:hidden"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.76),rgba(242,153,74,0))]" />
                        <div className="flex items-center justify-between gap-5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                              Case 02
                            </p>
                            <h3 className={`${headingClass} mt-3 text-[2rem] leading-tight text-white`}>
                              {page.secondaryCaseStudy.title}
                            </h3>
                            <p className={`${bodyClass} mt-3 text-base leading-7 text-[#d0d0d0]`}>
                              {page.secondaryCaseStudy.challenge}
                            </p>
                          </div>
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f2994a]/45 bg-[#f2994a] text-xl font-semibold text-[#1b1d1f] shadow-[0_14px_28px_rgba(242,153,74,0.26)] transition group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="mt-10 flex justify-center gap-3 lg:justify-end">
                        {caseSlides.map((_, dotIndex) => (
                          <button
                            key={`case-dot-${dotIndex}`}
                            type="button"
                            aria-label={`Показати кейс ${dotIndex + 1}`}
                            onClick={() => setCurrentCase(dotIndex)}
                            className={`h-2.5 rounded-full transition ${
                              currentCase === dotIndex
                                ? "w-10 bg-[#f2994a]"
                                : "w-2.5 bg-white/32 hover:bg-white/48"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="flex min-w-0 flex-col gap-10 lg:col-start-2 lg:gap-12">
        <GallerySection
          title={page.gallery.title}
          description={page.gallery.description}
          images={page.gallery.images}
        />

        <SectionShell id="scale" title="Масштаб реалізації" eyebrow="Потужність і охоплення">
          <div className="grid gap-4 sm:grid-cols-3">
            {page.scale.map((metric) => (
              <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="specs"
          title="Технічний блок"
          description="Цей блок має працювати як аргумент для технічного директора, генпідрядника або девелопера: що саме ми проєктуємо, в яких межах працюємо і які параметри контролюємо."
          eyebrow="Специфікація"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.5rem] border border-[#f2994a]/20 bg-[#202326] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Прольоти
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">до 22 м</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Індивідуальне проєктування без проміжних опор для великопролітних рішень.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Матеріал
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">C22 / C24</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Сортова сосна з підбором товщини заготовок 45-60 мм під розрахунок.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Розрахунок
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">MiTek Pamir</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Ліцензійний інженерний розрахунок і моделювання кожної конструкції.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Норми
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">EN 1995</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Перевірка за Eurocode 5 з урахуванням реальних навантажень по об&apos;єкту.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#202326]">
              <div className="border-b border-white/8 px-5 py-4">
                <h3 className={`${headingClass} text-xl text-white`}>Конструктив і нормативи</h3>
                <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                  Базові параметри, в межах яких ми проєктуємо, виготовляємо і погоджуємо рішення.
                </p>
              </div>
              <table className={`${bodyClass} w-full border-collapse text-sm text-[#d0d0d0]`}>
                <tbody>
                  {page.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-white/8 last:border-b-0">
                      <th className="px-5 py-4 text-left font-medium text-white">{spec.label}</th>
                      <td className="px-5 py-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <h3 className={`${headingClass} text-xl text-white`}>Розрахункові навантаження</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {page.loads.map((item) => (
                    <div key={item.label} className="rounded-[1rem] border border-white/10 bg-white/4 p-4">
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                      <p className={`${bodyClass} mt-1 text-sm text-[#d0d0d0]`}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <h3 className={`${headingClass} text-xl text-white`}>Точність і допуски</h3>
                <div className="mt-4 grid gap-3">
                  {page.precision.map((item) => (
                    <div key={item.label} className="rounded-[1rem] border border-white/10 bg-white/4 p-4">
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                      <p className={`${bodyClass} mt-1 text-sm text-[#d0d0d0]`}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-dashed border-[#f2994a]/35 bg-[#f2994a]/8 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd7b4]">
                  Що це дає на об&apos;єкті
                </p>
                <p className={`${bodyClass} mt-3 text-sm leading-7 text-[#f4dfcf]`}>
                  Замовник отримує не просто ферму, а прогнозований інженерний виріб:
                  контроль геометрії, підтверджені навантаження, монтаж без доробок і
                  комплект технічних даних для реалізації.
                </p>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="economics"
          title="Економіка рішення"
          description="Тут важливо показати не просто технічну ефективність, а прямий бізнес-результат для девелопера, генпідрядника й власника об'єкта."
          eyebrow="Бізнес-ефект"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {page.economics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                    Ефект {index + 1}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                  <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-[1.75rem] border border-[#f2994a]/20 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.16),transparent_58%),#202326] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Як це впливає на бюджет проєкту
              </p>
              <p className={`${bodyClass} mt-4 text-sm leading-7 text-[#d0d0d0]`}>
                Готові ферми МЗП зменшують обсяг ручних робіт, скорочують час перебування
                бригади на майданчику та прибирають частину непередбачуваних витрат, які
                зазвичай з&apos;являються під час складання покрівельної системи на місці.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Швидший запуск наступних етапів</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    Короткий монтажний цикл допомагає раніше переходити до покрівельних і внутрішніх робіт.
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Менше ризику перевитрат</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    Заводська комплектація дає керований обсяг матеріалу й менше доробок на об&apos;єкті.
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Зрозуміла модель закупівлі</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    Замовник отримує фіксований комплект із прорахованими параметрами, а не відкритий кошторис із невідомими.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="process" title="Процес роботи" eyebrow="Від запиту до монтажу">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {page.process.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                  Крок {index + 1}
                </p>
                <p className={`${headingClass} mt-3 text-lg text-white`}>{step}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="trust"
          title="Довіра та стандарти"
          description="Цей блок має знімати ключові сумніви перед запитом: хто рахує конструкцію, які документи супроводжують поставку та які гарантії отримує замовник."
          eyebrow="Чому це працює"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)]">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {page.trust.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#f2994a]/20 bg-[#202326] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                    Опора {index + 1}
                  </p>
                  <h3 className={`${headingClass} mt-3 text-xl text-white`}>{item.title}</h3>
                  <p className={`${bodyClass} mt-3 text-sm leading-7 text-[#d0d0d0]`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.18),transparent_60%),#202326] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Що отримує замовник у поставці
              </p>
              <ul className={`${bodyClass} mt-5 space-y-3 text-sm leading-7 text-[#d0d0d0]`}>
                <li>Проєктний розрахунок у ліцензійному середовищі MiTek Pamir.</li>
                <li>Монтажні схеми й технічний паспорт на партію.</li>
                <li>Пакет даних для технічного узгодження на стороні генпідрядника.</li>
                <li>Офіційні гарантійні зобов&apos;язання на конструктивну цілісність.</li>
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Розрахунок
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>MiTek Pamir</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Документи
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>Паспорт + схеми</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Гарантія
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>10-15 років</p>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <FaqSection items={page.faq} />

        <SectionShell
          id="cta"
          title={page.finalCta.title}
          description={page.finalCta.description}
          eyebrow="Фінальний CTA"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
            <div className="rounded-[1.75rem] border border-[#f2994a]/20 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.14),transparent_58%),#202326] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Наступний крок
              </p>
              <p className={`${headingClass} mt-4 text-2xl leading-tight text-white`}>
                Швидкий вхід у попередній прорахунок без довгого первинного брифу
              </p>
              <ul className={`${bodyClass} mt-5 space-y-3 text-sm leading-7 text-[#d0d0d0]`}>
                {page.finalCta.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={page.finalCta.primaryCta.href}
                  className={`${bodyClass} inline-flex items-center justify-center rounded-full bg-[#f2994a] px-6 py-3 text-sm font-semibold text-[#1b1d1f] transition hover:bg-[#ffb46f]`}
                >
                  {page.finalCta.primaryCta.label}
                </Link>
                <Link
                  href={page.finalCta.secondaryCta.href}
                  className={`${bodyClass} inline-flex items-center justify-center rounded-full border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#f2994a]/60 hover:bg-white/8`}
                >
                  {page.finalCta.secondaryCta.label}
                </Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Формат
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>Квіз + консультація</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Старт
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>2-3 хвилини</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#828282]">
                    Результат
                  </p>
                  <p className={`${headingClass} mt-2 text-lg text-white`}>Попередній прорахунок</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-[#202326] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#828282]">
                Що буде в квізі
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">1. Тип об&apos;єкта</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    ЖК, склад, комерційна будівля або інший сценарій застосування.
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">2. Базові параметри</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    Проліт, орієнтовні габарити, строки й стадія проєкту.
                  </p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">3. Зворотний зв&apos;язок</p>
                  <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#d0d0d0]`}>
                    Контакт для уточнення й переходу до предметної технічної розмови.
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-[1rem] border border-dashed border-[#f2994a]/35 bg-[#f2994a]/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd7b4]">
                  На виході
                </p>
                <p className={`${bodyClass} mt-2 text-sm leading-7 text-[#f4dfcf]`}>
                  Замовник отримує попередній інженерний прорахунок, розуміння строків
                  виробництва і релевантну конфігурацію рішення під свій об&apos;єкт.
                </p>
              </div>
            </div>
          </div>
        </SectionShell>
          </div>

      </main>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <SiteFooter />
      </div>
    </div>
  );
}
