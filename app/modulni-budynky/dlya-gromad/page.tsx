import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { RealizedProjectsCarousel } from "@/components/realized-projects-carousel";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StandardQuizCta } from "@/components/standard-quiz-cta";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { getSeoRobots, normalizeSeoPath } from "@/lib/seo-pages";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

function TimberXWord() {
  return (
    <>
      Timber<span className="font-bold text-[#F2994A]">X</span>
    </>
  );
}

function brandifyTimberX(text: string) {
  const parts = text.split("TimberX");
  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <TimberXWord /> : null}
    </span>
  ));
}

const challengeItems = [
  {
    title: "Критичні терміни",
    text:
      "Забезпечення житлом ВПО та відновлення соціальних об'єктів потребує негайних рішень, а не багатомісячних будівельних циклів.",
  },
  {
    title: "Вимоги міжнародних донорів (NEFCO, UNDP тощо)",
    text:
      'Потреба у повній прозорості витрат, де заводська специфікація унеможливлює "роздуття" кошторисів.',
  },
  {
    title: "Бюджетна непередбачуваність",
    text:
      "У традиційних проєктах ризики здорожчання матеріалів та додаткових робіт лягають на бюджет громади. Ми фіксуємо ціну в договорі.",
  },
  {
    title: "Складність експертизи",
    text:
      "Потреба в проєктно-кошторисній документації (ПКД), що відповідає ДБН та легко проходить державну експертизу.",
  },
];

const solutionCards = [
  {
    title: "Контроль строків",
    text:
      "Завдяки паралельному виконанню робіт (виготовлення на заводі одночасно з підготовкою фундаменту на місці), монтаж об'єкта триває лише 1-3 дні. Це скорочує загальний цикл реалізації у 3-5 разів.",
  },
  {
    title: "Зниження ризиків та прозорість",
    text:
      `Використання ліцензійного ПЗ MiTek Pamir дозволяє розрахувати кожну балку та вузол. Це виключає "крадіжки матеріалів" на майданчику, оскільки об'єм деревини та кількість кріплень фіксуються на рівні заводської специфікації.`,
  },
  {
    title: "Масштабованість",
    text:
      "Наші потужності дозволяють виготовляти серійні партії будинків для цілих житлових кварталів з ідентичною якістю кожного модуля, що критично для великих муніципальних замовлень.",
  },
];
const economics = [
  "Громада бачить остаточну вартість до старту робіт: ціна фіксується в договорі та ПКД.",
  "Заводська специфікація зменшує ризик завищення обсягів матеріалів і спрощує донорський аудит.",
  "Енергоефективний контур знижує майбутні витрати бюджету на опалення та кондиціювання.",
  "Замовник не оплачує обрізки, зайву логістику та будівельне сміття на майданчику.",
];

const specs = [
  ["Деревина", "Хвойна (сосна), C24/C22 (згідно з розрахунком MiTek), вологість 12-18%"],
  ["Норми проєктування", "EN 1995-1-1 (Єврокод 5) / ДБН України"],
  ["Програмний комплекс", "MiTek Pamir (ліцензія 24005)"],
  ["Точність виготовлення", "Допуск розміщення кріплення та геометрії 1-2 мм"],
  ["Утеплення", "Базальтова вата / ековата (150-250 мм), енергоефективний контур"],
  ["Термін експлуатації", "50+ років для несучих конструкцій"],
] as const;

const processSteps: Array<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "request",
    title: "Запит та прорахунок",
    description:
      "Фіксуємо задачу громади, тип об'єкта, обсяги та готуємо інженерний розрахунок.",
  },
  {
    icon: "contractor",
    title: "Договір і бюджет",
    description:
      "Закріплюємо чітку вартість, порядок оплат і терміни реалізації проєкту.",
  },
  {
    icon: "factory",
    title: "Паралельне виконання",
    description:
      "Поки готується майданчик, модулі та конструкції виготовляються у заводських умовах.",
  },
  {
    icon: "delivery",
    title: "Монтаж та здача",
    description:
      "Організовуємо логістику, монтаж і передачу готового об'єкта в експлуатацію.",
  },
];

const internalLinks = [
  { label: "Модульні будинки TimberX", href: "/modulni-budynky/" },
  { label: "Кейси реалізації", href: "/cases/" },
  { label: "FAQ по модульних будинках", href: "/modulni-budynky/faq/" },
  { label: "Санітарно-технічні модулі для громад", href: "/sanitarni-moduli/dlya-gromad/" },
];

const faqItems = [
  {
    question: "Скільки часу займає реалізація об'єкта?",
    answer:
      "Типовий цикл для серійних рішень займає 30-60 днів залежно від формату, комплектації, готовності майданчика та обсягу партії. Монтаж на локації зазвичай триває значно швидше, ніж у традиційному будівництві.",
  },
  {
    question: "Чи можна зафіксувати бюджет до старту робіт?",
    answer:
      "Так. Вартість фіксується в договорі та проєктній документації після уточнення технічного завдання, комплектації, логістики й обсягів. Це допомагає громаді планувати бюджет і пояснювати витрати донорам.",
  },
  {
    question: "Які документи TimberX надає для погодження?",
    answer:
      "Ми готуємо технічні специфікації, кошторисні дані, конструктивні рішення та матеріали для технагляду, погоджень і донорського аудиту. Склад пакета залежить від формату об'єкта та вимог замовника.",
  },
  {
    question: "Чи підходять рішення для донорського фінансування?",
    answer:
      "Так, рішення розраховані на прозору комплектацію, контрольовану заводську специфікацію та зрозумілий процес приймання. Це спрощує перевірку обсягів, вартості й відповідності технічним вимогам.",
  },
  {
    question: "Які формати постачання доступні?",
    answer:
      "Можливі формати «під ключ», «коробка», готові модулі або розбірні великогабаритні конструктори. Формат підбирається під бюджет, логістику, строки та готовність майданчика.",
  },
  {
    question: "Яка гарантія на конструкції?",
    answer:
      "На несучі конструкції надається офіційна гарантія 10 років. Додатково фіксуємо технічні параметри, матеріали та відповідальність сторін у договорі.",
  },
  {
    question: "Чи можна адаптувати проєкт під потреби конкретної громади?",
    answer:
      "Так. Планування, площа, комплектація, інженерні рішення та формат поставки можуть адаптуватися під призначення об'єкта: житло, адміністративні приміщення, соціальна інфраструктура або сервісні модулі.",
  },
  {
    question: "Чи працюєте з віддаленими або складними локаціями?",
    answer:
      "Так. Для таких проєктів окремо прораховуємо логістику, формат поставки, послідовність монтажу та вимоги до підготовки майданчика, щоб зменшити ризики на місці.",
  },
];

const heroTrust: Array<{ icon: IconName; value: string; label: string }> = [
  {
    icon: "projects",
    value: "1000+",
    label: "реалізованих проєктів",
  },
  {
    icon: "factory",
    value: "300-1000\u00a0м²",
    label: "виробництво в місяць",
  },
  {
    icon: "globe",
    value: "Україна та Європа",
    label: "географія проєктів",
  },
];

const realizedProjects = [
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-terrace.jpg",
    imageAlt: "Реалізовані модульні будинки TimberX",
    imageClassName: "object-[50%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-facade-closeup.jpg",
    imageAlt: "Готові житлові модулі TimberX",
    imageClassName: "object-[52%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-wood-facade.jpg",
    imageAlt: "Модульний контур TimberX",
    imageClassName: "object-[52%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-transport.jpg",
    imageAlt: "Модульне житло TimberX для громад",
    imageClassName: "object-[48%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-interior-living.jpg",
    imageAlt: "Серійні модульні будинки TimberX",
    imageClassName: "object-[50%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-front-porch.jpg",
    imageAlt: "Модульний будинок TimberX з терасою",
    imageClassName: "object-[50%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-side-facade.jpg",
    imageAlt: "Бічний фасад модульного будинку TimberX",
    imageClassName: "object-[48%_50%]",
  },
  {
    imageSrc: "/images/projects/modular-homes-community/modular-home-interior-dining.jpg",
    imageAlt: "Інтер'єр модульного будинку TimberX",
    imageClassName: "object-[50%_50%]",
  },
];

export type SolutionSegmentPageCopy = {
  breadcrumbLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  metadataTitle: string;
  metadataDescription: string;
  canonical: string;
};

export const communitySolutionPageCopy: SolutionSegmentPageCopy = {
  breadcrumbLabel: "Для громад",
  heroEyebrow: "Модульні будинки для громад",
  heroTitle: "Швидке відновлення житлової та соціальної інфраструктури до 2-х місяців",
  metadataTitle: "Модульні будинки для громад | TimberX B2G рішення для відбудови та ВПО",
  metadataDescription:
    "Модульні будинки TimberX для громад: серійне B2G будівництво для ВПО, амбулаторій і соціальних об'єктів. Фіксований кошторис, прозорість для донорів, монтаж 1-3 дні.",
  canonical: "/modulni-budynky/dlya-gromad/",
};

export function buildSolutionSegmentMetadata(copy: SolutionSegmentPageCopy): Metadata {
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: normalizeSeoPath(copy.canonical),
    },
    robots: getSeoRobots(copy.canonical),
  };
}

export const metadata: Metadata = buildSolutionSegmentMetadata(communitySolutionPageCopy);

export function SolutionSegmentPage({ copy }: { copy: SolutionSegmentPageCopy }) {
  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Головна", path: "/" },
            { name: "Модульні будинки", path: "/modulni-budynky/" },
            { name: copy.breadcrumbLabel, path: copy.canonical },
          ]),
          buildServiceSchema({
            name: copy.heroTitle,
            description: copy.metadataDescription,
            path: copy.canonical,
            image: {
              src: "/images/projects/modular-homes-community/modular-home-terrace.jpg",
              alt: copy.heroTitle,
            },
            serviceType: "B2G модульне будівництво",
            audience: ["Громади", "Державні замовники", "Донорські програми"],
          }),
          buildFaqSchema(faqItems),
        ]}
      />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.08),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8f9fa_100%)] text-[#1B1D1F]">
      <main className="w-full pb-14 md:pb-16 lg:pb-20">
        <section className="relative w-full overflow-hidden border-y border-white/10 bg-[#1B1D1F] shadow-[0_28px_78px_rgba(0,0,0,0.28)]">
          <div className="relative z-20">
            <SiteHeader />
          </div>

          <div className="absolute inset-0">
            <Image
              src="/images/audiences/audience-communities.jpg"
              alt="Модульні рішення TimberX для громад"
              fill
              priority
              className="object-cover object-[56%_center]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#1B1D1F]/54" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.92)_0%,rgba(18,19,21,0.8)_32%,rgba(18,19,21,0.32)_64%,rgba(18,19,21,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.12),rgba(17,18,20,0.24)_38%,rgba(17,18,20,0.58)_100%)]" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto w-full max-w-[88rem] px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10 lg:px-6 lg:pb-20 lg:pt-12">
            <div className="-translate-y-3 md:-translate-y-4">
            <nav className={`${bodyClass} mb-4 flex items-center gap-2 text-sm text-white/66`}>
              <Link href="/" className="transition hover:text-white">
                Головна
              </Link>
              <span>/</span>
              <Link href="/#solutions" className="transition hover:text-white">
                Рішення
              </Link>
              <span>/</span>
              <span className="text-white">{copy.breadcrumbLabel}</span>
            </nav>

            <p className="mb-4 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              {copy.heroEyebrow}
            </p>
            <h1 className={`${headingClass} max-w-[20ch] text-[2.25rem] leading-[1.03] text-white sm:text-5xl md:max-w-none md:text-[3.9rem] lg:text-[4.35rem] xl:text-[4.7rem]`}>
              {copy.heroTitle}
            </h1>
            <p className={`${bodyClass} mt-5 max-w-3xl text-base leading-8 text-white/92 md:text-lg`}>
              Серійні заводські рішення з готовністю до експлуатації за 30-60 днів.
            </p>
            <p className={`${bodyClass} mt-3 max-w-3xl text-base leading-8 text-white/76`}>
              <span className="block md:whitespace-nowrap">
                {brandifyTimberX(
                  "TimberX пропонує готові рішення для швидкого відновлення житла, розміщення ВПО, будівництва амбулаторій,",
                )}
              </span>
              <span className="block md:whitespace-nowrap">
                {brandifyTimberX(
                  "ЦНАПів та адміністративних споруд з гарантованим дотриманням кошторису та термінів.",
                )}
              </span>
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
              >
                Отримати прорахунок проєкту
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-[10px] border border-white/20 bg-[rgba(255,255,255,0.04)] px-6 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
              >
                <span>
                  Завантажити каталог Timber
                  <span className="font-bold text-[#F2994A]">X</span>
                  {" "}виробництва
                </span>
              </a>
            </div>
            </div>

            <div className="mt-7 grid max-w-[56rem] grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:gap-4 sm:pt-8">
              {heroTrust.map((item) => (
                <div key={item.label} className="px-1 py-1 sm:py-2">
                  <div className="relative mb-3 flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-[16px] border border-[#F2994A]/38 bg-[linear-gradient(180deg,rgba(242,153,74,0.18),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_18px_34px_rgba(242,153,74,0.1)] sm:mb-4 sm:h-[4.25rem] sm:w-[4.25rem] sm:rounded-[18px]">
                    <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18 sm:inset-[6px] sm:rounded-[13px]" />
                    <LineIcon name={item.icon} className="relative h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <p className="text-[1.05rem] leading-none font-medium text-[#F2994A] sm:text-[1.35rem] md:text-[1.7rem]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-5 text-white/80 sm:mt-3 sm:text-sm sm:leading-6">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[88rem] px-4 pt-14 md:px-6 md:pt-16 lg:px-6 lg:pt-20">
        <section className="space-y-8">
          <div className="border-b border-[#F0F0F0] pb-10 lg:pb-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Задача</p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1B1D1F] sm:text-4xl lg:text-[3.25rem]`}>
                  Виклики відбудови громад
                </h2>
              </div>
              <p className={`${bodyClass} max-w-3xl text-lg leading-8 text-[#4f4f4f] lg:justify-self-end lg:text-xl lg:leading-9`}>
                Традиційне будівництво часто не відповідає вимогам воєнного часу та стандартам міжнародного
                фінансування. Ми вирішуємо ключові болі B2G-замовників.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {challengeItems.map((item, itemIndex) => (
              <article
                key={item.title}
                className="group relative min-h-[15rem] overflow-hidden rounded-[1.45rem] border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_40px_rgba(27,29,31,0.055)] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/34 hover:shadow-[0_24px_58px_rgba(27,29,31,0.09)] sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/34 bg-[linear-gradient(180deg,rgba(242,153,74,0.16),rgba(242,153,74,0.06))] text-sm font-semibold text-[#F2994A] shadow-[0_14px_28px_rgba(242,153,74,0.1)]">
                  {String(itemIndex + 1).padStart(2, "0")}
                </div>
                <h3 className={`${headingClass} text-[1.8rem] leading-[1.08] text-[#1B1D1F] sm:text-[2rem]`}>{item.title}</h3>
                <p className={`${bodyClass} mt-4 text-base leading-8 text-[#828282]`}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[#1B1D1F] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:mt-24 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />
          <div className="relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Рішення</p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                <span className="block">Серійне виробництво</span>
                <span className="block lg:whitespace-nowrap">житлових та громадських об&apos;єктів</span>
              </h2>
            </div>
            <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0] lg:justify-self-end`}>
              Ми переносимо 90% будівельних процесів у контрольовані заводські умови, замінюючи хаотичне
              «ручне будівництво» промисловим методом.
            </p>
          </div>
          <div className="mt-10 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.08),rgba(242,153,74,0.55),rgba(242,153,74,0.08))]" />
          <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)] lg:items-stretch">
            <article>
              <ul className="space-y-5">
                {solutionCards.map((card, index) => (
                  <li key={card.title} className="flex items-start gap-4 border-b border-white/8 pb-5 last:border-b-0 last:pb-0">
                    <div className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_14px_30px_rgba(242,153,74,0.12)]">
                      <div className="absolute inset-[5px] rounded-[10px] border border-[#F2994A]/18" />
                      <span className="relative text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className={`${headingClass} text-2xl text-white`}>{card.title}</h3>
                      <p className={`${bodyClass} mt-2 text-base leading-7 text-[#d0d0d0]`}>{card.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid gap-4">
              <article className="group relative min-h-[13.5rem] overflow-hidden rounded-[1.3rem] border border-white/12 bg-[#202326] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/38 hover:shadow-[0_34px_84px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.55),rgba(242,153,74,0.0))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                <div className="absolute inset-0">
                  <Image
                    src="/images/cases/sosnovel-case.jpg"
                    alt="Формат під ключ від TimberX"
                    fill
                    className="object-cover object-[52%_50%] transition duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 340px, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.18),rgba(17,18,20,0.72))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,20,0.68)_0%,rgba(17,18,20,0.5)_45%,rgba(17,18,20,0.36)_100%)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p className={`${headingClass} text-xl text-white transition group-hover:text-[#F2994A]`}>Формат «Під ключ»</p>
                  <p className={`${bodyClass} mt-3 text-base leading-7 text-[#e0e0e0]`}>
                    Повністю готовий об&apos;єкт з оздобленням та інженерними мережами.
                  </p>
                </div>
              </article>
              <article className="group relative min-h-[13.5rem] overflow-hidden rounded-[1.3rem] border border-white/12 bg-[#202326] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/38 hover:shadow-[0_34px_84px_rgba(0,0,0,0.32)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.55),rgba(242,153,74,0.0))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                <div className="absolute inset-0">
                  <Image
                    src="/images/projects/modular-wall.png"
                    alt="Формат коробка від TimberX"
                    fill
                    className="object-cover object-[52%_50%] transition duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 340px, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.16),rgba(17,18,20,0.72))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,20,0.68)_0%,rgba(17,18,20,0.5)_45%,rgba(17,18,20,0.36)_100%)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p className={`${headingClass} text-xl text-white transition group-hover:text-[#F2994A]`}>Формат «Коробка»</p>
                  <p className={`${bodyClass} mt-3 text-base leading-7 text-[#e0e0e0]`}>
                    Несучий каркас із зовнішнім контуром, утепленням та фасадом.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 xl:flex-row xl:flex-nowrap">
            {internalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${bodyClass} group inline-flex items-center justify-between gap-3 rounded-[12px] border border-[#f2994a]/26 bg-[linear-gradient(180deg,rgba(242,153,74,0.14),rgba(255,255,255,0.045))] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(242,153,74,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/62 hover:bg-[#f2994a] hover:text-[#1b1d1f] hover:shadow-[0_22px_44px_rgba(242,153,74,0.18)] xl:flex-1 xl:whitespace-nowrap`}
              >
                <span>{brandifyTimberX(item.label)}</span>
                <span className="text-[#f2994a] transition group-hover:text-[#1b1d1f]">→</span>
              </Link>
            ))}
          </div>
          </div>
        </section>

        <section className="relative mt-16 border-y border-[#F0F0F0] px-2 py-14 sm:px-4 lg:mt-24 lg:px-6 lg:py-20">
          <div className="border-b border-[#F0F0F0] pb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Переваги та обґрунтування для громади</p>
            <h2 className={`${headingClass} mt-3 w-full text-3xl leading-tight text-[#1B1D1F] sm:text-4xl lg:text-[3.2rem]`}>
              Бюджет, безпека та документація в одному контрольованому процесі
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.72fr)] lg:items-stretch lg:gap-16">
              <div className="flex min-h-[12.2rem] items-center py-6 lg:py-6">
                <p className={`${bodyClass} max-w-3xl text-lg leading-9 text-[#5F5F5F] lg:text-[1.35rem] lg:leading-[2.05]`}>
                  {brandifyTimberX(
                    "Рішення TimberX допомагає громаді зафіксувати бюджет, пройти погодження, пояснити витрати перед донорами та отримати безпечний об'єкт для експлуатації. Для погоджень готуємо технічні специфікації, кошторисні дані та пакет матеріалів для технагляду й донорського аудиту.",
                  )}
                </p>
              </div>
              <Link
                href="/technologies"
                aria-label="Перейти на сторінку Виробництво"
                className="group relative flex min-h-[12.2rem] items-center overflow-hidden rounded-[14px] border border-[#F2994A]/36 bg-[#202124] px-6 py-5 shadow-[0_18px_42px_rgba(27,29,31,0.22),0_0_28px_rgba(242,153,74,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#F2994A]/74 hover:shadow-[0_30px_64px_rgba(27,29,31,0.32),0_0_42px_rgba(242,153,74,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2994A] lg:justify-self-end lg:px-7"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,153,74,0.16),rgba(255,255,255,0.035)_48%,rgba(242,153,74,0.1))] transition duration-300 group-hover:opacity-100" />
                <div className="absolute -right-14 -top-20 h-48 w-48 rounded-full bg-[#F2994A]/18 blur-3xl transition duration-300 group-hover:bg-[#F2994A]/26" />
                <div className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.46),rgba(242,153,74,0))]" />
                <div className="relative flex w-full items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-normal uppercase tracking-[0.28em] text-[#F2994A]">Масштаб виробництва</p>
                    <p className={`${headingClass} mt-3 text-[2.35rem] leading-none text-white sm:text-[2.8rem]`}>
                      300-1000 м кв.
                    </p>
                    <p className={`${bodyClass} mt-3 max-w-[20rem] text-sm leading-6 text-white/62`}>
                      орієнтовний місячний обсяг для планування партій
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F2994A] transition duration-300 group-hover:text-white">
                      Переглянути виробництво
                      <span className="transition duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-[#F2994A] transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)] lg:gap-20 xl:gap-24">
            <div>
              <div className="mt-2 divide-y divide-[#F0F0F0]">
                {[
                  {
                    title: "Прозорий бюджет",
                    text: economics.join(" "),
                  },
                  {
                    title: "Надійність для експлуатації",
                    text: "Усі елементи проходять глибоку обробку біопіренами, конструкції розраховуються під снігові та вітрові навантаження конкретної локації, а заводські вузли зменшують ризик деформацій.",
                  },
                  {
                    title: "Виробництво та логістика під умови громади",
                    text: "ЧПУ-обладнання забезпечує точну підготовку модулів, а доставка у форматі розбірних конструкторів або готових модулів зменшує транспортні витрати та спрощує роботу у важкодоступних районах.",
                  },
                ].map((item, itemIndex) => (
                  <article key={item.title} className="grid gap-5 py-10 first:pt-7 sm:grid-cols-[5rem_minmax(0,1fr)] lg:py-12 lg:first:pt-9">
                    <p className="font-['Montserrat',_Arial,_sans-serif] text-4xl font-light leading-none text-[#D6D6D6] sm:text-5xl">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className={`${headingClass} text-[1.8rem] font-extrabold leading-tight text-[#1B1D1F] sm:text-[2.25rem]`}>
                        {item.title}
                      </h3>
                      <p className={`${bodyClass} mt-3 max-w-4xl text-base leading-8 text-[#9A9A9A] lg:text-lg`}>
                        {brandifyTimberX(item.text)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#F0F0F0] pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-[3.35rem] xl:pl-16">
              <h3 className={`${headingClass} text-[1.8rem] font-extrabold leading-tight text-[#1B1D1F] sm:text-[2.25rem]`}>
                Технічний паспорт
              </h3>
              <div className="mt-8 divide-y divide-[#F0F0F0] border-y border-[#F0F0F0]">
                {specs.map(([key, value]) => (
                  <div key={key} className="py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F2994A]">{key}</p>
                    <p className={`${bodyClass} mt-2 text-[1.06rem] leading-8 text-[#686868]`}>{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-0">
          <div className="rounded-[2rem] border border-[#1B1D1F]/10 bg-[#1B1D1F] px-7 pb-10 pt-7 shadow-[0_34px_90px_rgba(0,0,0,0.18)] sm:px-9 sm:pb-12 sm:pt-9 lg:px-12 lg:pb-16 lg:pt-12">
            <div className="border-b border-white/10 pb-11">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
                Доказ практикою
              </p>
              <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div>
                <h2 className={`${headingClass} text-3xl leading-tight text-white sm:text-4xl lg:text-[3.2rem]`}>
                  Реалізовані проєкти <TimberXWord />
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className={`${bodyClass} max-w-3xl text-base leading-8 text-[#d0d0d0] lg:text-lg`}>
                  Реалізовані модульні будинки та житлові рішення, які можна адаптувати під потреби громади.
                </p>
                <Link
                  href="/cases/"
                  className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] shadow-[0_18px_36px_rgba(242,153,74,0.24)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
                >
                  Переглянути всі кейси
                </Link>
              </div>
              </div>
            </div>

            <RealizedProjectsCarousel images={realizedProjects} />
          </div>
        </section>

        <section className="mt-16 lg:mt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">ГАРАНТІЇ</p>
            <h2 className={`${headingClass} mt-4 text-3xl leading-tight text-[#1B1D1F] sm:text-4xl`}>
              Повний контроль реалізації: від фінансової прозорості до технічних гарантій і підтвердженого досвіду
            </h2>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div className="flex flex-col justify-center py-2">
              <ul className={`${bodyClass} space-y-5 text-lg leading-8 text-[#4f4f4f]`}>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>фіксація строків і бюджету в договорі</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>контроль якості перед відвантаженням</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>відповідність ДБН і проєктній документації</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>гарантійний супровід після здачі</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>одна точка відповідальності за реалізацію</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                  <span>прозорий процес приймання робіт і комплектації</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-start lg:justify-end">
              <article className="group relative flex min-h-[20rem] w-full max-w-[32rem] flex-col overflow-hidden rounded-[14px] border border-[#F2994A]/36 bg-[#202124] p-8 shadow-[0_18px_42px_rgba(27,29,31,0.22),0_0_28px_rgba(242,153,74,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#F2994A]/74 hover:shadow-[0_30px_64px_rgba(27,29,31,0.32),0_0_42px_rgba(242,153,74,0.18)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,153,74,0.16),rgba(255,255,255,0.035)_48%,rgba(242,153,74,0.1))]" />
                <div className="absolute -right-14 -top-20 h-48 w-48 rounded-full bg-[#F2994A]/18 blur-3xl transition duration-300 group-hover:bg-[#F2994A]/26" />
                <div className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.46),rgba(242,153,74,0))]" />
                <div className="relative flex h-full flex-col">
                  <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[18px] border border-[#F2994A]/55 bg-[linear-gradient(180deg,rgba(242,153,74,0.26),rgba(242,153,74,0.1))] text-[#F2994A] shadow-[0_20px_42px_rgba(242,153,74,0.18)]">
                    <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/24" />
                    <LineIcon name="shield" className="relative h-11 w-11" />
                  </div>
                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
                    Гарантії <TimberXWord />
                  </p>
                  <h3 className={`${headingClass} mt-4 text-[2.1rem] leading-[1.12] text-white`}>
                    ГАРАНТІЯ 10 РОКІВ НА КОНСТРУКЦІЇ
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-10 border-y border-[#F0F0F0] py-12 lg:mt-24 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">ВІД ЗАПИТУ ДО ЗДАЧІ</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <h2 className={`${headingClass} text-3xl leading-tight text-[#1B1D1F] sm:text-4xl`}>Процес співпраці</h2>
              <p className={`${bodyClass} max-w-3xl text-lg leading-8 text-[#626262] lg:justify-self-end`}>
              {brandifyTimberX(
                "Від першого запиту до здачі об'єкта TimberX веде проєкт через чіткий, прогнозований і контрольований процес.",
              )}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.36),rgba(242,153,74,0.08))] md:hidden" />
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.08),rgba(242,153,74,0.42),rgba(242,153,74,0.08))] lg:block" />
            <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pl-16 md:pl-0">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.2),rgba(242,153,74,0.07))] text-[#F2994A] shadow-[0_18px_36px_rgba(242,153,74,0.12)] md:relative md:mx-0 lg:mx-auto">
                    <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18" />
                    <LineIcon name={step.icon} className="relative h-7 w-7" />
                  </div>
                  <div className="space-y-3 md:mt-6 md:text-left lg:text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A9A9A]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`${headingClass} text-[1.45rem] leading-[1.12] text-[#1B1D1F]`}>
                      {step.title}
                    </p>
                    <p className={`${bodyClass} max-w-xs text-base leading-7 text-[#828282] md:mx-0 lg:mx-auto`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StandardQuizCta
          id="cta"
          className="mt-16 lg:mt-24 [&>div]:!bg-[#202326] [&>div_[aria-hidden='true']]:hidden"
        />

        <section className="mt-16 border-t border-[#F0F0F0] pt-12 lg:mt-24 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">FAQ</p>
              <h2 className={`${headingClass} mt-4 text-3xl leading-tight text-[#1B1D1F] sm:text-4xl`}>
                Питання, які найчастіше ставлять громади
              </h2>
            </div>

            <div className="divide-y divide-[#F0F0F0] border-y border-[#F0F0F0]">
              {faqItems.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left marker:hidden">
                    <span className={`${headingClass} text-xl leading-snug text-[#1B1D1F]`}>
                      {brandifyTimberX(item.question)}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F2994A]/24 text-xl leading-none text-[#F2994A] transition duration-200 group-open:rotate-45 group-hover:border-[#F2994A]/55">
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pr-14">
                    <p className={`${bodyClass} text-base leading-8 text-[#828282]`}>
                      {brandifyTimberX(item.answer)}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        </div>
      </main>

      <div className="bg-[#1b1d1f] text-white">
        <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
          <SiteFooter />
        </div>
      </div>
      </div>
    </>
  );
}

export default function ModularHomesForCommunitiesPage() {
  return <SolutionSegmentPage copy={communitySolutionPageCopy} />;
}
