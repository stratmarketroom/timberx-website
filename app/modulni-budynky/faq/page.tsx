import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StandardQuizCta } from "@/components/standard-quiz-cta";
import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { getSeoRobots } from "@/lib/seo-pages";

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

const faqItems: Array<{
  question: string;
  answer: React.ReactNode;
}> = [
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
  {
    question: "Яка вартість квадратного метра?",
    answer:
      "Ціна залежить від обсягу замовлення та комплектації. Для девелоперів діє система дисконтів: серійне виробництво 10+ будинків дозволяє суттєво знизити вартість одиниці продукції за рахунок оптимізації процесів.",
  },
  {
    question: "Чи підходять модулі для багатоповерхових ЖК?",
    answer:
      "Наша технологія ідеально підходить для створення супутньої інфраструктури ЖК, таунхаусів та котеджних зон у межах великих девелоперських проєктів.",
  },
  {
    question: "Чи можливе будівництво взимку?",
    answer:
      "Так. 90% робіт виконуються в цеху. Монтаж на ділянці можливий за будь-якої температури, що виключає сезонні простої.",
  },
  {
    question: "Як здійснюється робота з територіальними громадами?",
    answer: (
      <>
        Ми пропонуємо готові типові проєкти для амбулаторій, центрів надання
        послуг та житла. Детальніше про рішення для громад можна переглянути{" "}
        <Link
          href="/modulni-budynky/dlya-gromad/"
          className="font-semibold text-[#F2994A] transition hover:text-[#de8232]"
        >
          на відповідній сторінці
        </Link>
        .
      </>
    ),
  },
];

const faqSchemaItems = faqItems.map((item) => ({
  question: item.question,
  answer:
    typeof item.answer === "string"
      ? item.answer
      : "TimberX пропонує готові типові проєкти для амбулаторій, центрів надання послуг та житла. Детальніше про рішення для громад можна переглянути на відповідній сторінці.",
}));

export const metadata: Metadata = {
  title: "FAQ про модульні будинки | TimberX",
  description:
    "Часті запитання про модульні будинки TimberX: строки, вартість, комплектація, гарантії, робота з девелоперами та громадами.",
  alternates: {
    canonical: "/modulni-budynky/faq/",
  },
  robots: getSeoRobots("/modulni-budynky/faq/"),
};

export default function ModularHomesFaqPage() {
  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Головна", path: "/" },
            { name: "Модульні будинки", path: "/modulni-budynky/" },
            { name: "FAQ", path: "/modulni-budynky/faq/" },
          ]),
          buildFaqSchema(faqSchemaItems),
        ]}
      />
      <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8f9fa_100%)] text-[#1B1D1F]">
      <section className="relative overflow-hidden bg-[#1B1D1F] text-white">
        <SiteHeader />
        <div className="mx-auto w-full max-w-[88rem] px-4 pb-16 pt-8 md:px-6 md:pb-20 lg:px-6 lg:pb-24 lg:pt-10">
          <nav
            aria-label="Breadcrumb"
            className={`${bodyClass} mb-7 flex flex-wrap items-center gap-2 text-sm text-white/62`}
          >
            <Link href="/" className="transition hover:text-white">
              Головна
            </Link>
            <span>/</span>
            <Link href="/modulni-budynky/" className="transition hover:text-white">
              Модульні будинки
            </Link>
            <span>/</span>
            <span className="text-white">FAQ</span>
          </nav>

          <p className="mb-5 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/82 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            FAQ
          </p>
          <h1 className={`${headingClass} max-w-5xl text-[2.4rem] leading-[1.03] text-white sm:text-5xl lg:text-[4.2rem]`}>
            Часті запитання про модульні будинки
          </h1>
          <p className={`${bodyClass} mt-6 max-w-3xl text-base leading-8 text-white/76 md:text-lg`}>
            Відповіді на ключові питання про строки, комплектацію, бюджет,
            гарантії та формати роботи з модульними рішеннями{" "}
            <TimberXWord />.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-6 md:py-16 lg:px-6 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
              Модульні будинки
            </p>
            <h2 className={`${headingClass} mt-4 text-3xl leading-tight text-[#1B1D1F] sm:text-4xl`}>
              Питання перед прорахунком
            </h2>
            <p className={`${bodyClass} mt-5 max-w-md text-base leading-8 text-[#626262]`}>
              Якщо потрібен точний бюджет, строки та формат поставки,
              найшвидший шлях - пройти короткий прорахунок проєкту.
            </p>
            <Link
              href="/modulni-budynky/"
              className="mt-7 inline-flex items-center justify-center rounded-[10px] border border-[#F2994A]/38 bg-white px-5 py-3 text-sm font-semibold text-[#1B1D1F] shadow-[0_14px_30px_rgba(27,29,31,0.08)] transition hover:-translate-y-0.5 hover:border-[#F2994A] hover:bg-[#F2994A]"
            >
              Перейти до продукту
            </Link>
          </div>

          <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
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
                <div className="pb-6 pr-0 sm:pr-14">
                  <p className={`${bodyClass} text-base leading-8 text-[#6B7280]`}>
                    {typeof item.answer === "string" ? brandifyTimberX(item.answer) : item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <StandardQuizCta
          id="cta"
          className="mt-16 lg:mt-24 [&>div]:!bg-[#202326] [&>div_[aria-hidden='true']]:hidden"
        />
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
