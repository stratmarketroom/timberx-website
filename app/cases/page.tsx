import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { CasesListSection } from "@/components/cases-list-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StandardQuizCta } from "@/components/standard-quiz-cta";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

const cases = [
  {
    title: "Кейс №1: Модульні будинки для заміського комплексу «Сосновель» (Київська обл.)",
    imageSrc: "/images/cases/sosnovel-case.jpg",
    imageAlt: "Модульні будинки TimberX у заміському комплексі «Сосновель»",
    gallery: [
      { src: "/images/cases/sosnovel-case.jpg", alt: "Кейс Сосновель: загальний вигляд комплексу" },
      { src: "/images/fermy-mzp/object-frame-house-1.jpg", alt: "Модульний будинок TimberX: фасад" },
      { src: "/images/fermy-mzp/object-frame-house-2.jpg", alt: "Модульний будинок TimberX: етап реалізації" },
      { src: "/images/fermy-mzp/object-frame-house-3.jpg", alt: "Модульний будинок TimberX: готовий об'єкт" },
    ],
    challenge:
      "Розгортання парку будинків для орендного бізнесу в стислі строки. Ключові вимоги: відсутність усадки, фіксований бюджет та прогнозована якість.",
    solution:
      "Проєктування та заводське виготовлення модульних будинків на базі дерев’яного каркаса з камерною сушкою деревини (вологість 12–18%).",
    results: [
      "Фіксація вартості в договорі стала хеджем проти 20–30% ринкової волатильності.",
      "Реалізація проєкту від фундаменту до здачі — 4 місяці.",
      "Оздоблювальні роботи завершені без ризику тріщин завдяки відсутності усадки.",
    ],
  },
  {
    title: "Кейс №2: Клеєні конструкції для великопролітного складу",
    imageSrc: "/images/fermy-mzp/case-wide-span-hall.jpg",
    imageAlt: "Великопролітний склад на базі клеєних конструкцій TimberX",
    gallery: [
      { src: "/images/fermy-mzp/case-wide-span-hall.jpg", alt: "Склад із великопролітними конструкціями" },
      { src: "/images/fermy-mzp/object-hall-interior-1.jpg", alt: "Інтер'єр великопролітного складу" },
      { src: "/images/fermy-mzp/object-hall-exterior-1.jpg", alt: "Екстер'єр великопролітного складу" },
      { src: "/images/fermy-mzp/object-wide-frame-1.jpg", alt: "Каркас великопролітної будівлі" },
    ],
    challenge:
      "Перекриття складської площі з прольотами до 30 метрів без внутрішніх опор для максимізації Open Space.",
    solution:
      "Інженерна комбінована система: клеєні балки та ферми на МЗП-пластинах. Розрахунок у MiTek Pamir для точного врахування снігових і вітрових навантажень.",
    results: [
      "Повна відсутність внутрішніх несних стін та колон.",
      "Зниження навантаження на фундамент на 40% порівняно з бетоном.",
      "Оптимізація матеріалів на 20–30% без надлишкового «запасу міцності на око».",
    ],
  },
  {
    title: "Кейс №3: Серійна забудова ЖК — швидке закриття контуру даху",
    imageSrc: "/images/fermy-mzp/case-zhk-serial.jpg",
    imageAlt: "Серійна забудова ЖК з фермами МЗП TimberX",
    gallery: [
      { src: "/images/fermy-mzp/case-zhk-serial.jpg", alt: "ЖК із серійним монтажем ферм МЗП" },
      { src: "/images/fermy-mzp/object-crane-installation-1.jpg", alt: "Монтаж ферм МЗП краном на об'єкті" },
      { src: "/images/fermy-mzp/object-block-building-1.jpg", alt: "Серійна забудова з фермами МЗП TimberX" },
      { src: "/images/fermy-mzp/object-roof-joint-detail-1.jpg", alt: "Вузол покрівельної системи МЗП" },
    ],
    challenge:
      "Масштабування будівництва кроквяних систем для багатоквартирного комплексу: прискорити роботи в 3 рази та нівелювати людський фактор.",
    solution:
      "Серійні комплекти ферм МЗП за стандартом EN 1995-1-1. Кожен елемент нарізаний на ЧПУ-обладнанні з деревини сорту C22/C24.",
    results: [
      "Темп монтажу зріс у 3 рази порівняно з традиційною збіркою на майданчику.",
      "Геометрія з допуском 1–2 мм прискорила покрівельні роботи.",
      "Монтаж виконується мінімальною кількістю персоналу за принципом інженерного конструктора.",
    ],
  },
] as const;

const directions = [
  {
    title: "Девелоперам та ЖК",
    description:
      "Масштабування серійної забудови, швидкісні кроквяні системи та ферми МЗП.",
    href: "/modulni-budynky/dlya-developeriv/",
    icon: "community" as IconName,
    imageSrc: "/images/audiences/audience-developers.jpg",
    imageClassName: "object-[50%_50%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.88)_0%,rgba(17,18,20,0.74)_28%,rgba(17,18,20,0.28)_62%,rgba(17,18,20,0.18)_100%)]",
  },
  {
    title: "Генпідрядникам та Бізнесу",
    description:
      "Великопролітні конструкції для складів, ангарів та виробництв.",
    href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/",
    icon: "blueprint" as IconName,
    imageSrc: "/images/audiences/audience-general-contractors.jpg",
    imageClassName: "object-[56%_42%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.94)_0%,rgba(17,18,20,0.82)_34%,rgba(17,18,20,0.34)_66%,rgba(17,18,20,0.2)_100%)]",
  },
  {
    title: "Забудовникам",
    description:
      "Прискорення темпів монтажу у 3 рази та робота мінімальною кількістю персоналу.",
    href: "/modulni-budynky/dlya-zhk/",
    icon: "projects" as IconName,
    imageSrc: "/images/audiences/audience-builders.jpg",
    imageClassName: "object-[56%_48%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.78)_30%,rgba(17,18,20,0.36)_64%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    title: "Громадам (B2G)",
    description:
      "Соціальні об’єкти, амбулаторії та модульне житло з гарантованою ціною.",
    href: "/modulni-budynky/dlya-gromad/",
    icon: "developers" as IconName,
    imageSrc: "/images/audiences/audience-communities.jpg",
    imageClassName: "object-[52%_52%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.76)_28%,rgba(17,18,20,0.3)_62%,rgba(17,18,20,0.18)_100%)]",
  },
] as const;

const trustItems = [
  {
    icon: "shield" as IconName,
    title: "Гарантія на конструктив",
    value: "10–15 років (офіційно в договорі)",
  },
  {
    icon: "projects" as IconName,
    title: "Точність виробництва",
    value: "1–2 мм (заводська збірка на стапелях)",
  },
  {
    icon: "calculator" as IconName,
    title: "Розрахунок навантажень",
    value: "MiTek Pamir (згідно з ДБН та EN 1995-1-1)",
  },
  {
    icon: "beam" as IconName,
    title: "Матеріали",
    value: "Деревина C22/C24 (камерна сушка), сертифіковані біопірени",
  },
  {
    icon: "factory" as IconName,
    title: "Виробнича потужність",
    value: "300–1000 м² конструкцій на місяць",
  },
] as const;

export const metadata: Metadata = {
  title: "Кейси TimberX | Досвід будівництва ЖК, складів та модульних будинків",
  description:
    "Понад 1000 реалізованих проєктів дерев'яних конструкцій в Україні та ЄС. Технічні рішення для забудовників, генпідрядників та громад. ROI, гарантія та швидкість.",
  keywords: [
    "дерев'яні ферми кейси",
    "кроквяні системи ЖК",
    "великопролітні склади",
    "модульне будівництво Україна",
    "MiTek Pamir розрахунок",
  ],
  alternates: {
    canonical: "/cases/",
  },
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.14),transparent_34%),linear-gradient(180deg,#1b1d1f_0%,#151719_100%)] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cases/sosnovel-case.jpg"
            alt="Реалізовані кейси TimberX"
            fill
            priority
            className="object-cover object-[56%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1B1D1F]/50" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.92)_0%,rgba(18,19,21,0.8)_28%,rgba(18,19,21,0.34)_58%,rgba(18,19,21,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.12),rgba(17,18,20,0.18)_36%,rgba(17,18,20,0.52)_100%)]" />
        </div>

        <div className="relative z-20">
          <SiteHeader />
        </div>

        <div className="relative z-10 flex items-start">
          <div className="w-full px-4 pb-8 pt-4 md:px-6 md:pb-12 md:pt-8 lg:px-6 lg:pb-24 lg:pt-16">
            <div className="mx-auto max-w-[88rem]">
              <div className="max-w-5xl">
                <nav className={`${bodyClass} mb-6 flex items-center gap-2 text-sm text-white/58`}>
                  <Link href="/" className="transition hover:text-white">
                    Головна
                  </Link>
                  <span>/</span>
                  <span className="text-white">Кейси</span>
                </nav>

                <p className="mb-5 inline-flex max-w-full items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                  Реалізовані проєкти
                </p>
                <h1 className={`${headingClass} text-[1.9rem] leading-[1.04] text-white sm:text-[2.45rem] md:text-[2.95rem]`}>
                  Реалізовані проєкти <span>Timber</span>
                  <span className="font-bold text-[#F2994A]">X</span>: досвід серійної B2B-забудови
                </h1>
                <p className={`${bodyClass} mt-5 max-w-4xl text-base leading-7 text-white/78 md:text-lg md:leading-8`}>
                  Заводське виробництво інженерних дерев&apos;яних конструкцій та модульних
                  будинків. Демонструємо, як ми скорочуємо строки будівництва у 3–5 разів,
                  ліквідуємо перевитрати матеріалів та гарантуємо інженерну точність до 1–2 мм.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#cta"
                    className="inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
                  >
                    Отримати прорахунок проєкту
                  </a>
                  <a
                    href="#cases-list"
                    className="inline-flex items-center justify-center rounded-[10px] border border-white/18 bg-[rgba(255,255,255,0.04)] px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/36 hover:bg-white/8"
                  >
                    Дивитись кейси
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-12 lg:px-6 lg:pb-20 lg:pt-14">
        <div className="mx-auto w-full max-w-[88rem]">
          <div id="cases-list" className="w-full scroll-mt-24">
            <CasesListSection cases={[...cases]} />
          </div>

          <section className="mt-10 space-y-10 lg:mt-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">Напрямки проєктів</p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                  Оберіть напрямок проєктів
                </h2>
              </div>
              <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0] lg:justify-self-end`}>
                Показуємо практичні реалізації для різних типів замовників: від девелоперів і бізнесу
                до громадських B2G-проєктів.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {directions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block focus-visible:outline-none"
              >
                  <article className="relative h-full overflow-hidden rounded border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(37,40,43,0.98))] p-0 transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#F2994A]/55 hover:shadow-[0_32px_84px_rgba(0,0,0,0.32)] group-focus-visible:-translate-y-1 group-focus-visible:scale-[1.02] group-focus-visible:border-[#F2994A]/55 group-focus-visible:shadow-[0_32px_84px_rgba(0,0,0,0.32)] active:scale-[1.02] active:border-[#F2994A]/55 active:shadow-[0_24px_56px_rgba(242,153,74,0.2)]">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.12),transparent_34%)] opacity-60 transition duration-200 hover:opacity-100 group-focus-visible:opacity-100 active:opacity-100" />
                    <div className="relative flex h-full flex-col">
                    <div className="relative aspect-[4/4.75] overflow-hidden sm:aspect-[4/3.8] md:aspect-[4/4.1] lg:aspect-[16/8.5]">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className={`object-cover transition duration-300 group-hover:scale-[1.08] ${item.imageClassName}`}
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                        <div className={`absolute inset-0 ${item.overlayClassName} transition duration-200 group-hover:opacity-75 group-active:opacity-75`} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.06),rgba(17,18,20,0.12)_42%,rgba(17,18,20,0.64)_100%)]" />
                      <div className="absolute left-6 top-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#F2994A]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#F2994A] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition duration-200 group-hover:border-[#F2994A]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                        <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/20" />
                        <LineIcon name={item.icon} className="relative h-10 w-10" />
                      </div>
                        <div className="absolute inset-0 flex flex-col px-6 pb-6 pt-28 sm:pb-7 sm:pt-28 md:pb-7 md:pt-32 lg:pb-6 lg:pt-28">
                          <h3 className={`${headingClass} mt-2 max-w-[16rem] text-[1.7rem] leading-[1.04] text-white transition group-hover:text-[#F2994A] group-focus-visible:text-[#F2994A] group-active:text-[#F2994A] sm:text-[1.82rem] md:mt-3 md:text-[1.55rem] lg:mt-2 lg:text-[2rem]`}>
                            {item.title}
                          </h3>
                        <div className="mt-auto space-y-3">
                            <p className="max-w-[23rem] text-sm leading-[1.45] text-white/84 sm:text-[0.93rem] sm:leading-[1.45] md:text-[0.86rem] md:leading-[1.38] lg:text-[0.98rem] lg:leading-[1.55]">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 text-sm font-medium text-[#F2994A]/92">
                              <span>Детальніше</span>
                              <span className="transition duration-200 group-hover:translate-x-1">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-6 lg:mt-12 lg:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.45),rgba(242,153,74,0))]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
              Чому TimberX довіряють
            </p>
            <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
              Складні інженерні проєкти під контролем
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-5"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.4),rgba(242,153,74,0))]" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                    <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18" />
                    <LineIcon name={item.icon} className="relative h-7 w-7" />
                  </div>
                  <p className={`${headingClass} mt-4 text-xl leading-tight text-white`}>{item.title}</p>
                  <p className={`${bodyClass} mt-3 text-sm leading-7 text-[#d0d0d0]`}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <StandardQuizCta id="cta" className="mt-10 lg:mt-12" />
        </div>
      </main>

      <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}
