"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StandardQuizCta } from "@/components/standard-quiz-cta";
import type { ProductFaqItem, ProductGalleryImage, ProductPageData } from "@/lib/product-pages/types";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const sectionNav = [
  { label: "Задача", href: "#problem" },
  { label: "Рішення", href: "#solution" },
  { label: "Кейси", href: "#applications" },
  { label: "Специфікація", href: "#specs" },
  { label: "Галерея", href: "#gallery" },
  { label: "Економіка", href: "#economics" },
  { label: "Процес", href: "#process" },
  { label: "Гарантія", href: "#trust" },
  { label: "FAQ", href: "#faq" },
  { label: "Розрахунок", href: "#cta" },
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
const economicsImages = [
  {
    src: "/images/fermy-mzp/production-truss-frame-2.png",
    className: "object-[50%_52%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.7)_36%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    src: "/images/fermy-mzp/shipment-truss-truck-2.jpg",
    className: "object-[52%_56%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.68)_36%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    src: "/images/fermy-mzp/object-roof-joint-detail-1.jpg",
    className: "object-[50%_48%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.92)_0%,rgba(17,18,20,0.72)_36%,rgba(17,18,20,0.2)_100%)]",
  },
  {
    src: "/images/fermy-mzp/object-timber-hall-2.jpg",
    className: "object-[50%_50%]",
    overlay:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.7)_34%,rgba(17,18,20,0.24)_100%)]",
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
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9 ${className}`}>
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
    <section className="relative overflow-hidden lg:min-h-[100vh]">
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

      <div className="relative z-10 flex items-start lg:min-h-[100vh] lg:items-center">
        <div className="w-full px-4 pb-8 pt-4 md:px-6 md:pb-12 md:pt-8 lg:px-6 lg:pb-24 lg:pt-16">
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
              <p className="mb-5 inline-flex max-w-full flex-wrap items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                <span>{eyebrowPrefix}</span>
                <span className="whitespace-nowrap">
                  <span>Timber</span>
                  <span className="font-bold text-[#F2994A]">X</span>
                </span>
                <span>{eyebrowSuffix}</span>
              </p>
              <h1
                className={`${headingClass} text-[2.1rem] leading-[1.02] text-white sm:text-[3rem] md:text-[3.55rem] lg:text-[3.9rem] xl:text-[4.2rem]`}
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

              <div className="mt-8 grid w-full max-w-[46rem] grid-cols-3 gap-x-2 gap-y-3 border-t border-white/10 pt-7 text-[0.72rem] text-white/78 sm:mt-12 sm:gap-x-8 sm:pt-8 sm:text-base">
                {page.hero.badges.map((badge) => (
                  <div key={badge} className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
                    <span className="relative flex h-6 w-6 items-center justify-center rounded-[999px] border border-[#F2994A]/38 bg-[linear-gradient(180deg,rgba(242,153,74,0.16),rgba(242,153,74,0.05))] text-[#F2994A] shadow-[0_10px_20px_rgba(242,153,74,0.1)]">
                      <span className="absolute inset-[3px] rounded-[999px] border border-[#F2994A]/16" />
                      <span className="relative text-[0.7rem] font-semibold">✓</span>
                    </span>
                    <span className="whitespace-nowrap">{badge}</span>
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
  const [activeImage, setActiveImage] = useState<ProductGalleryImage | null>(null);

  if (!images.length) {
    return null;
  }

  const featured = images[0];

  if (!featured) {
    return null;
  }

  const stripPool = images.slice(1);
  const byLabel: Record<string, ProductGalleryImage[]> = {
    "Виробництво": stripPool.filter((image) => image.label === "Виробництво"),
    "Об'єкт": stripPool.filter((image) => image.label === "Об'єкт"),
    "Відвантаження": stripPool.filter((image) => image.label === "Відвантаження"),
  };
  const stripOrderPattern: Array<"Виробництво" | "Об'єкт" | "Відвантаження" | "Об'єкт"> = [
    "Виробництво",
    "Об'єкт",
    "Відвантаження",
    "Об'єкт",
  ];
  const stripImages: ProductGalleryImage[] = [];

  while (
    byLabel["Виробництво"].length ||
    byLabel["Об'єкт"].length ||
    byLabel["Відвантаження"].length
  ) {
    let pushedInCycle = false;

    for (const label of stripOrderPattern) {
      const next = byLabel[label].shift();

      if (next) {
        stripImages.push(next);
        pushedInCycle = true;
      }
    }

    if (!pushedInCycle) {
      break;
    }
  }

  if (stripImages.length >= 8) {
    const temp = stripImages[3];
    stripImages[3] = stripImages[7];
    stripImages[7] = temp;
  }

  return (
    <section
      id="gallery"
      className="relative overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />

      <div className="relative max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
          ГАЛЕРЕЯ РОБІТ
        </p>
        <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
          {title}
        </h2>
        <p className={`${bodyClass} mt-4 text-base leading-7 text-[#d0d0d0]`}>
          {description}
        </p>
      </div>

      <div className="relative mt-10 space-y-8 sm:mt-12">
        <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#202326] sm:min-h-[420px] lg:min-h-[500px]">
          <button
            type="button"
            onClick={() => setActiveImage(featured)}
            className="group absolute inset-0 block cursor-zoom-in text-left"
            aria-label="Відкрити велике фото"
          >
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.01]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,20,0.08)_0%,rgba(16,18,20,0.64)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,20,0.1)_0%,rgba(16,18,20,0.06)_45%,rgba(16,18,20,0.36)_100%)]" />
            <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#1b1d1f]/82 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[#f4dfcf] sm:left-5 sm:top-5">
              {featured.label}
            </span>

            <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(27,29,31,0.88),rgba(27,29,31,0.78))] p-4 shadow-[0_24px_46px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[36rem] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                Від цеху до об&apos;єкта
              </p>
              <div className={`${bodyClass} mt-4 space-y-4 text-sm leading-7 text-[#d0d0d0]`}>
                <p>
                  Індивідуальний розрахунок та повний контроль вузлів: від нарізки в цеху до
                  фінального монтажу
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-3 shadow-[0_24px_68px_rgba(0,0,0,0.22)]">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />
          <div className="relative overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-3">
              {stripImages.map((image) => (
                <button
                  type="button"
                  key={`${image.src}-${image.label}`}
                  onClick={() => setActiveImage(image)}
                  className="group relative h-[190px] w-[230px] shrink-0 snap-start overflow-hidden rounded-[1.25rem] border border-[#f2994a]/20 bg-[#17191b] text-left transition hover:border-[#f2994a]/48"
                  aria-label={`Відкрити фото: ${image.alt}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="230px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,20,0.03)_0%,rgba(16,18,20,0.62)_100%)]" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[#1b1d1f]/82 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f4dfcf]">
                    {image.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0d0f12]/88 p-4"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд фото"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-[#1b1d1f]/82 px-3 py-1.5 text-xl leading-none text-white transition hover:border-[#f2994a]/40 hover:text-[#f2994a] sm:right-6 sm:top-6"
            onClick={() => setActiveImage(null)}
            aria-label="Закрити перегляд фото"
          >
            ×
          </button>
          <div
            className="relative max-h-[92vh] max-w-[92vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={2200}
              height={1600}
              className="h-auto max-h-[92vh] w-auto max-w-[92vw] rounded-[0.75rem] object-contain"
              sizes="92vw"
              priority
            />
            <span className="absolute bottom-3 left-3 rounded-full border border-white/16 bg-[#1b1d1f]/82 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f4dfcf]">
              {activeImage.label}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FaqSection({ items }: { items: ProductFaqItem[] }) {
  return (
    <section id="faq" className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
          Питання та відповіді
        </p>
        <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
          FAQ
        </h2>
        <p className={`${bodyClass} mt-4 text-base leading-7 text-[#d0d0d0]`}>
          Короткі відповіді на питання, які найчастіше виникають у забудовників, генпідрядників і
          замовників перед попереднім прорахунком.
        </p>
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
              <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_14px_30px_rgba(242,153,74,0.12)]">
                <span className="absolute inset-[5px] rounded-[10px] border border-[#f2994a]/18" />
                <span className="relative text-xl font-semibold leading-none transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className={`${bodyClass} mt-4 max-w-4xl border-t border-white/8 pt-4 text-sm leading-7 text-[#d0d0d0]`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ProductPage({ page }: { page: ProductPageData }) {
  const [currentCase, setCurrentCase] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [activeSectionHref, setActiveSectionHref] = useState("#problem");
  const topLevelSectionGapClass = "gap-10 lg:gap-12";

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
          title: "Серійна забудова ЖК",
          challenge: "Оптимізація строків зведення ідентичних дахових систем у багатоквартирному будівництві.",
          solution: "Заміна традиційної кроквяної системи на серійний заводський префаб з повною ідентичністю вузлів.",
          result: "Монтаж покрівельної системи виконано у 3 рази швидше порівняно з традиційними методами.",
          metrics: [
            { value: "800 мм", label: "крок ферм", icon: "beam" },
            { value: "207 кг", label: "вага ферми", icon: "weight" },
            { value: "850 N/m²", label: "снігове навантаження", icon: "snow" },
            { value: "470 N/m²", label: "вітрове навантаження", icon: "wind" },
          ],
          imageSrc: "/images/fermy-mzp/case-zhk-serial.png",
          imageAlt: "Серійна забудова ЖК з дерев'яними фермами МЗП",
          imageClassName: "object-[50%_32%]",
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    badge: string;
    title: string;
    challenge: string;
    solution: string;
    result: string;
    metrics: Array<{ value: string; label: string; icon?: IconName }>;
    imageSrc: string;
    imageAlt: string;
    imageClassName: string;
  }>;
  const economicsCards = [
    {
      value: "20-30%",
      title: "Менше ризику перевитрат",
      description: "Заводська комплектація дає керований обсяг матеріалу й менше доробок на об'єкті.",
    },
    {
      value: "на 14-30 днів",
      title: "Швидший запуск наступних етапів",
      description: "Короткий монтажний цикл допомагає раніше переходити до покрівельних і внутрішніх робіт.",
    },
    {
      value: "в 2.5 рази",
      title: "Оптимізація людського ресурсу",
      description:
        "Менше персоналу на майданчику в умовах дефіциту кадрів та потреби у швидкому введенні об'єкта в експлуатацію.",
    },
    {
      value: "100%",
      title: "Прозора модель закупівлі",
      description:
        "Замовник отримує фіксований комплект із прорахованими параметрами, а не відкритий кошторис із невідомими.",
    },
  ] as const;
  const economicsIcons = [
    applicationIcons[0],
    applicationIcons[1],
    applicationIcons[3],
    applicationIcons[2],
  ] as const;
  const processCards = [
    {
      step: "01",
      title: "Запит та аналіз",
      description:
        "Аналізуємо ваші креслення, архітектуру та специфіку об'єкта для вибору оптимальної конфігурації ферм.",
    },
    {
      step: "02",
      title: "Прорахунок за 48 год та КП",
      description:
        "Виконуємо точне інженерне моделювання. Ви отримуєте фіксовану вартість та технічне рішення протягом двох діб.",
    },
    {
      step: "03",
      title: "Заводське виробництво",
      description:
        "Автоматизована нарізка та пресування на лінії MiTek. Виготовлення комплекту займає від 3 до 14 робочих днів.",
    },
    {
      step: "04",
      title: "Логістика та шеф-монтаж",
      description:
        "Доставка маркованого комплекту на об'єкт. Надаємо схеми збірки або виїзд інженера для контролю монтажу.",
    },
  ] as const;

  useEffect(() => {
    const trackedSections = sectionNav
      .map((item) => item.href.replace("#", ""))
      .filter((id) => id !== "applications")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!trackedSections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSectionHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-34% 0px -54% 0px",
        threshold: [0.15, 0.35, 0.6, 0.9],
      },
    );

    trackedSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

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

        @keyframes specHotspotReveal {
          from {
            opacity: 0;
            transform: translateX(14px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <HeroSection page={page} />
      <main className="mx-auto w-full max-w-[88rem] px-4 pb-12 md:px-6 md:pb-16 lg:px-6 lg:pb-20">
        <nav className="sticky top-3 z-20 overflow-x-auto rounded-full border border-white/10 bg-[#17191b]/90 pl-2.5 pr-8 py-3 backdrop-blur lg:hidden">
          <ul className="flex min-w-max items-center gap-1.5">
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={activeSectionHref === item.href ? "page" : undefined}
                  className={`${bodyClass} inline-flex rounded-full border px-3 py-2 text-sm transition ${
                    activeSectionHref === item.href
                      ? "border-[#f2994a]/70 bg-[#f2994a]/14 text-white shadow-[0_0_0_1px_rgba(242,153,74,0.2)_inset]"
                      : "border-transparent text-[#d0d0d0] hover:border-[#f2994a]/35 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <div className="absolute inset-y-0 right-0 w-10 bg-[linear-gradient(90deg,rgba(23,25,27,0),rgba(23,25,27,0.92)_60%)]" />
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/18 bg-[#17191b]/90 text-white/72">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M7 4.5L12.5 10L7 15.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
          </div>
        </nav>

        <div
          className={`mt-10 grid ${topLevelSectionGapClass} lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start`}
        >
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
                        aria-current={activeSectionHref === item.href ? "page" : undefined}
                        className={`${bodyClass} flex items-center rounded-[0.95rem] border px-3 py-3 text-sm transition ${
                          activeSectionHref === item.href
                            ? "border-[#f2994a]/40 bg-[#f2994a]/12 text-white shadow-[0_0_0_1px_rgba(242,153,74,0.16)_inset]"
                            : "border-transparent text-[#d0d0d0] hover:border-[#f2994a]/25 hover:bg-white/6 hover:text-white"
                        }`}
                      >
                        <span
                          className={`mr-3 h-1.5 w-1.5 rounded-full ${
                            activeSectionHref === item.href ? "bg-[#f2994a]" : "bg-[#f2994a]/70"
                          }`}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className={`flex min-w-0 flex-col ${topLevelSectionGapClass} lg:pt-5`}>
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

          <div className="grid gap-6 md:grid-cols-2">
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
                        name={
                          applicationIcons[index === 2 ? 3 : index === 3 ? 2 : index] ?? "beam"
                        }
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
        <section
          id="cases"
          className="relative lg:col-span-2"
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
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:h-full lg:grid-cols-1 lg:content-between">
                          {slide.metrics.map((metric, metricIndex) => (
                            <div
                              key={`${slide.key}-${metric.label}`}
                              className="min-w-0"
                              style={{
                                animation: "caseMetricReveal 0.5s ease-out forwards",
                                animationDelay: `${metricIndex * 120}ms`,
                              }}
                            >
                              <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                                  <div className="absolute inset-[5px] rounded-[10px] border border-[#f2994a]/18" />
                                  <LineIcon
                                    name={metric.icon ?? caseSlideMetricIcons[metricIndex] ?? "beam"}
                                    className="relative h-6 w-6"
                                  />
                                </div>
                                <p className="text-lg font-semibold text-white sm:text-xl">{metric.value}</p>
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
                          href="/cases/"
                          className="inline-flex items-center rounded-[1rem] border border-[#f2994a]/52 bg-transparent px-6 py-4 text-base font-semibold text-[#f2994a] shadow-[0_18px_42px_rgba(10,12,18,0.34)] transition hover:-translate-y-0.5 hover:border-[#f2994a] hover:bg-[#f2994a] hover:text-[#1b1d1f] hover:shadow-[0_18px_42px_rgba(242,153,74,0.24)]"
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

        <div className={`flex min-w-0 flex-col ${topLevelSectionGapClass} lg:col-start-2`}>
        <section id="specs" className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                Специфікація
              </p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                Технічні стандарти та точність
              </h2>
            </div>
            <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0] lg:justify-self-end`}>
              Проєктування та виробництво за міжнародними стандартами: повний контроль параметрів від розрахунку до фінального монтажу.
            </p>
          </div>
          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.26),rgba(242,153,74,0.0))]" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative p-5">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                <div className="absolute inset-[5px] rounded-[11px] border border-[#f2994a]/18" />
                <LineIcon name="calculator" className="relative h-7 w-7" />
              </div>
              <p className={`${headingClass} mt-4 text-2xl text-white`}>MiTek Pamir</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Ліцензійний софт для розрахунку кожної крокви.
              </p>
            </div>
            <div className="relative p-5">
              <div className="absolute -left-2 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.38),rgba(242,153,74,0.08))] xl:block" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                <div className="absolute inset-[5px] rounded-[11px] border border-[#f2994a]/18" />
                <LineIcon name="snow" className="relative h-7 w-7" />
              </div>
              <p className={`${headingClass} mt-4 text-2xl text-white`}>EN 1995 (Eurocode 5)</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Розрахунок під реальні кліматичні навантаження об&apos;єкта.
              </p>
            </div>
            <div className="relative p-5">
              <div className="absolute -left-2 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.38),rgba(242,153,74,0.08))] xl:block" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                <div className="absolute inset-[5px] rounded-[11px] border border-[#f2994a]/18" />
                <LineIcon name="settings" className="relative h-7 w-7" />
              </div>
              <p className={`${headingClass} mt-4 text-2xl text-white`}>1-2 мм точність</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Максимальне геометричне відхилення за рахунок заводської нарізки.
              </p>
            </div>
            <div className="relative p-5">
              <div className="absolute -left-2 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.38),rgba(242,153,74,0.08))] xl:block" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f2994a]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#f2994a] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                <div className="absolute inset-[5px] rounded-[11px] border border-[#f2994a]/18" />
                <LineIcon name="beam" className="relative h-7 w-7" />
              </div>
              <p className={`${headingClass} mt-4 text-2xl text-white`}>800-1000 мм</p>
              <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#d0d0d0]`}>
                Оптимальний крок встановлення ферм для надійності покрівлі.
              </p>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.26),rgba(242,153,74,0.0))]" />

          <div className="mt-1 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-stretch lg:gap-12">
            <div className="relative -mt-4 rounded-[1.5rem] lg:-ml-4">
              <Image
                src="/images/fermy-mzp/grafik-elements-2.png"
                alt="Технічне креслення ферми МЗП"
                width={1200}
                height={900}
                className="h-full w-full object-contain object-left"
              />
              {["14%", "35%", "56%", "78%"].map((top) => (
                <div
                  key={`spec-edge-line-${top}`}
                  className="absolute -right-3 hidden h-px w-28 bg-[linear-gradient(90deg,rgba(242,153,74,0.52)_0%,rgba(242,153,74,0.22)_68%,rgba(242,153,74,0.04)_100%)] lg:block"
                  style={{ top }}
                >
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#f2994a] shadow-[0_0_0_4px_rgba(242,153,74,0.2)]" />
                </div>
              ))}
            </div>

            <div className="relative grid gap-2 lg:block lg:h-full lg:pl-4">
              {[
                {
                  top: "9%",
                  title: "Прольоти до 30 м без опор",
                  description:
                    "Можливість перекривати великі приміщення без внутрішніх стін та зайвих колон.",
                },
                {
                  top: "30%",
                  title: "5 мм: Точність вузлів",
                  description:
                    "Суворе позиціонування МЗП-пластин забезпечує проектну міцність кожного з'єднання.",
                },
                {
                  top: "53%",
                  title: "Деревина C22 / C24",
                  description:
                    "Використовуємо лише калібровану сосну з підбором товщини заготовки 45–60 мм під розрахунок.",
                },
                {
                  top: "75%",
                  title: "7–10 мм: Розрахункові прогини",
                  description:
                    "Мінімальна деформація конструкції під навантаженням завдяки жорсткості вузлів.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="p-3.5 lg:absolute lg:left-0 lg:right-0 lg:p-0"
                  style={{
                    opacity: 0,
                    animation: "specHotspotReveal 0.55s ease-out forwards",
                    animationDelay: `${120 + index * 120}ms`,
                    top: item.top,
                  }}
                >
                  <p className={`${headingClass} text-[1.12rem] leading-[1.22] text-[#f2994a]`}>{item.title}</p>
                  <p className={`${bodyClass} mt-1.5 text-sm leading-6 text-[#d0d0d0]`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        <GallerySection
          title="Реалізації та масштаби виробництва"
          description="Від серійних рішень для котеджних містечок до складних індустріальних об'єктів в Україні та Європі."
          images={page.gallery.images}
        />

        <section id="economics" className="space-y-10">
          <div className="max-w-[58rem]">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#f2994a]">
              Бізнес-ефект
            </p>
            <h2 className={`${headingClass} text-3xl leading-tight text-white sm:text-4xl lg:text-[2.8rem]`}>
              Економіка рішення
            </h2>
            <p className={`${bodyClass} mt-6 max-w-3xl text-lg leading-8 text-white/78`}>
              Готові ферми МЗП зменшують обсяг ручних робіт, скорочують час перебування бригади на
              майданчику та прибирають частину непередбачуваних витрат, які зазвичай з&apos;являються
              під час складання покрівельної системи на місці.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {economicsCards.map((card, index) => (
              <div
                key={card.title}
                className="group relative min-h-[23rem] overflow-hidden rounded border border-white/12 bg-[#25282b] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#f2994a]/42 hover:shadow-[0_32px_84px_rgba(0,0,0,0.32)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
                <div className="relative h-full min-h-[21rem] overflow-hidden bg-[#202326]">
                  <Image
                    src={economicsImages[index]?.src ?? "/images/fermy-mzp/production-truss-frame-2.png"}
                    alt={card.title}
                    fill
                    className={`object-cover transition duration-300 group-hover:scale-[1.04] ${
                      economicsImages[index]?.className ?? "object-[50%_50%]"
                    }`}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                  <div className={`absolute inset-0 ${economicsImages[index]?.overlay ?? "bg-[linear-gradient(90deg,rgba(17,18,20,0.9),rgba(17,18,20,0.24))]"}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.18)_42%,rgba(17,18,20,0.72)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />

                  <div className="relative flex h-full min-h-[21rem] flex-col justify-end px-7 pb-7 pt-28">
                    <div className="absolute left-7 top-7 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#f2994a]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#f2994a] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition duration-200 group-hover:border-[#f2994a]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                      <div className="absolute inset-[6px] rounded-[13px] border border-[#f2994a]/20" />
                      <LineIcon
                        name={economicsIcons[index] ?? "beam"}
                        className="relative h-10 w-10"
                      />
                    </div>
                    <p className={`${headingClass} mt-2 text-[2rem] leading-[1.02] text-white sm:text-[2.35rem]`}>
                      {card.value}
                    </p>
                    <h3 className={`${headingClass} mt-4 max-w-[22rem] text-[1.55rem] leading-[1.12] text-white transition group-hover:text-[#f2994a]`}>
                      {card.title}
                    </h3>
                    <p className={`${bodyClass} mt-4 max-w-[30rem] text-base leading-7 text-white/78`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="relative overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
              Від запиту до монтажу
            </p>
            <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
              Алгоритм реалізації проєкту
            </h2>
            <p className={`${bodyClass} mt-4 text-base leading-7 text-[#d0d0d0]`}>
              Відточений процес: мінімізуємо ваше залучення в рутинні питання, забезпечуючи
              прогнозований результат у чіткі терміни
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {processCards.map((card) => (
              <div
                key={card.step}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),#202326)] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.26)] transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/42 hover:shadow-[0_20px_44px_rgba(242,153,74,0.16)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.35),rgba(242,153,74,0))]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2994a]">
                  КРОК {card.step}
                </p>
                <p className={`${headingClass} mt-3 text-xl text-white`}>{card.title}</p>
                <p className={`${bodyClass} mt-3 text-sm leading-7 text-[#d0d0d0]`}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionShell
          id="trust"
          title="Гарантії та технічний супровід"
          description="Кожна поставка TimberX супроводжується повним пакетом документів, що гарантують юридичну та конструктивну безпеку об'єкта."
          eyebrow="Чому це працює"
        >
          <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div className="flex flex-col justify-center py-2">
              <ul className="space-y-5 text-lg leading-8 text-white/84">
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>
                    <strong className="font-semibold text-white">Ліцензійний паспорт MiTek:</strong>{" "}
                    офіційний розрахунок навантажень для кожної крокви.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>
                    <strong className="font-semibold text-white">Повний монтажний комплект:</strong>{" "}
                    деталізовані схеми збірки та специфікація вузлів.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>
                    <strong className="font-semibold text-white">Юридична фіксація:</strong> гарантія
                    10–15 років, прописана в договорі.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>
                    <strong className="font-semibold text-white">Технічний паспорт на партію:</strong>{" "}
                    сертифікати на деревину та МЗП-пластини.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>
                    <strong className="font-semibold text-white">Одна точка відповідальності:</strong>{" "}
                    ми відповідаємо за проєкт від розрахунку до фінальної геометрії.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="group relative flex min-h-[20rem] w-full max-w-[32rem] flex-col overflow-hidden rounded-[1.75rem] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.1)_38%,rgba(37,40,43,0.98))] p-8 shadow-[0_30px_80px_rgba(242,153,74,0.14)] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/62 hover:shadow-[0_38px_96px_rgba(242,153,74,0.22)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.78),rgba(242,153,74,0))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.28),transparent_38%)] opacity-90 transition duration-200 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[18px] border border-[#F2994A]/55 bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] text-[#F2994A] shadow-[0_24px_52px_rgba(242,153,74,0.2)]">
                    <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/24" />
                    <LineIcon name="shield" className="relative h-11 w-11" />
                  </div>
                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
                    Гарантії TimberX
                  </p>
                  <h3 className={`${headingClass} mt-4 text-[2.35rem] leading-[1.12] text-white`}>
                    ГАРАНТІЯ 10–15 РОКІВ НА КОНСТРУКЦІЇ
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <FaqSection items={page.faq} />

        <StandardQuizCta id="cta" />
          </div>
        </div>

      </main>
      <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}
