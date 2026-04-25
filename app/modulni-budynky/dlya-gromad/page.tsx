import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StandardQuizCta } from "@/components/standard-quiz-cta";

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

const specProofs = [
  { value: "10 років", label: "офіційної гарантії" },
  { value: "50+ років", label: "експлуатації конструкцій" },
  { value: "1-2 мм", label: "точність виготовлення" },
];

const processSteps = [
  "Запит та інженерний прорахунок",
  "Підписання договору з фіксацією чіткої вартості, порядку оплат і термінів реалізації проєкту",
  "Паралельне виконання",
  "Монтаж та здача",
];

const internalLinks = [
  { label: "Модульні будинки TimberX", href: "/modulni-budynky/" },
  { label: "Кейси реалізації", href: "/cases/" },
  { label: "FAQ по модульних будинках", href: "/modulni-budynky/faq/" },
  { label: "Санітарно-технічні модулі для громад", href: "/sanitarni-moduli/dlya-gromad/" },
];

const heroTrust: Array<{ icon: IconName; value: string; label: string }> = [
  {
    icon: "projects",
    value: "1000+",
    label: "реалізованих проєктів",
  },
  {
    icon: "factory",
    value: "300-1000 м2",
    label: "виробництво в місяць",
  },
  {
    icon: "globe",
    value: "Україна та Європа",
    label: "географія проєктів",
  },
];

export const metadata: Metadata = {
  title: "Модульні будинки для громад | TimberX B2G рішення для відбудови та ВПО",
  description:
    "Модульні будинки TimberX для громад: серійне B2G будівництво для ВПО, амбулаторій і соціальних об'єктів. Фіксований кошторис, прозорість для донорів, монтаж 1-3 дні.",
  alternates: {
    canonical: "/modulni-budynky/dlya-gromad/",
  },
};

export default function ModularHomesForCommunitiesPage() {
  return (
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
              <span className="text-white">Для громад</span>
            </nav>

            <p className="mb-4 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              Модульні будинки для громад
            </p>
            <h1 className={`${headingClass} max-w-[20ch] text-[2.25rem] leading-[1.03] text-white sm:text-5xl md:max-w-none md:text-[3.9rem] lg:text-[4.35rem] xl:text-[4.7rem]`}>
              Швидке відновлення житлової та соціальної інфраструктури до 2-х
              місяців
            </h1>
            <p className={`${bodyClass} mt-5 max-w-3xl text-base leading-8 text-white/92 md:text-lg`}>
              Серійні заводські рішення з готовністю до експлуатації за 30-60 днів.
            </p>
            <p className={`${bodyClass} mt-3 max-w-3xl text-base leading-8 text-white/76`}>
              <span className="block md:whitespace-nowrap">
                {brandifyTimberX(
                  "TimberX забезпечує пропонуємо готові рішення для швидкого відновлення житла, розміщення ВПО, будівництва амбулаторій,",
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

        <div className="mx-auto w-full max-w-[88rem] px-4 pt-8 md:px-6 md:pt-10 lg:px-6 lg:pt-12">
        <section className="mt-10 space-y-8 lg:mt-12">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-[#F2994A]/22 bg-[linear-gradient(135deg,#ffffff_0%,#fff7ef_48%,#f8f9fa_100%)] p-7 shadow-[0_22px_58px_rgba(27,29,31,0.08)] sm:p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
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

        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[#1B1D1F] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:mt-12 lg:p-10">
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

        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#F2994A]/20 bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] p-7 shadow-[0_28px_74px_rgba(27,29,31,0.08)] sm:p-9 lg:mt-12 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.45),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#F2994A]/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Обґрунтування для громади</p>
              <h2 className={`${headingClass} mt-3 max-w-4xl text-3xl leading-tight text-[#1B1D1F] sm:text-4xl lg:text-[3.2rem]`}>
                Бюджет, безпека та документація в одному контрольованому процесі
              </h2>
              <p className={`${bodyClass} mt-5 max-w-3xl text-base leading-8 text-[#626262] lg:text-lg`}>
                Блок показує, як рішення TimberX допомагає громаді зафіксувати
                бюджет, пройти погодження, пояснити витрати перед донорами та
                отримати безпечний об&apos;єкт для експлуатації.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {specProofs.map((item) => (
                <div key={item.label} className="rounded-[1rem] border border-[#F2994A]/20 bg-white px-4 py-4 shadow-[0_14px_30px_rgba(27,29,31,0.055)]">
                  <p className={`${headingClass} text-2xl leading-none text-[#F2994A]`}>{item.value}</p>
                  <p className={`${bodyClass} mt-2 text-sm leading-5 text-[#828282]`}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-9 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.4rem] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_44px_rgba(27,29,31,0.06)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/28 bg-[#F2994A]/10 text-[#F2994A]">
                <LineIcon name="calculator" className="h-6 w-6" />
              </div>
              <h3 className={`${headingClass} mt-5 text-2xl text-[#1B1D1F]`}>Прозорий бюджет для громади та донорів</h3>
              <ul className={`${bodyClass} mt-5 space-y-3 text-base leading-7 text-[#828282]`}>
                {economics.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.4rem] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_44px_rgba(27,29,31,0.06)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/28 bg-[#F2994A]/10 text-[#F2994A]">
                <LineIcon name="shield" className="h-6 w-6" />
              </div>
              <h3 className={`${headingClass} mt-5 text-2xl text-[#1B1D1F]`}>Технічна надійність для експлуатації</h3>
              <ul className={`${bodyClass} mt-5 space-y-3 text-base leading-7 text-[#828282]`}>
                <li>
                  <span className="font-semibold text-[#1B1D1F]">Захист деревини:</span> усі елементи проходять глибоку обробку біопіренами для вогне- та біозахисту.
                </li>
                <li>
                  <span className="font-semibold text-[#1B1D1F]">Розрахунок під локацію:</span> конструкції перевіряються на снігові та вітрові навантаження згідно з кліматичним зонуванням України.
                </li>
                <li>
                  <span className="font-semibold text-[#1B1D1F]">Заводські вузли:</span> металозубчаті пластини під тиском 30-50 тонн формують стабільні з&apos;єднання та зменшують ризик деформацій.
                </li>
              </ul>
            </article>
          </div>

          <div className="relative mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
            <article className="overflow-hidden rounded-[1.35rem] border border-[#E5E7EB] bg-white shadow-[0_16px_36px_rgba(27,29,31,0.045)]">
              <div className="border-b border-[#E5E7EB] bg-[#F8F9FA] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Технічне підтвердження</p>
                <h3 className={`${headingClass} mt-2 text-2xl text-[#1B1D1F]`}>Параметри для експертизи та погодження</h3>
                <p className={`${bodyClass} mt-3 max-w-4xl text-base leading-7 text-[#828282]`}>
                  Дані для проєктантів, донорів і технагляду: щоб швидше оцінити відповідність рішення вимогам безпеки, кошторису та експлуатації.
                </p>
              </div>
              <div className="grid gap-px bg-[#E5E7EB] sm:grid-cols-2">
                {specs.map(([key, value]) => (
                  <div key={key} className="bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F2994A]">{key}</p>
                    <p className={`${bodyClass} mt-2 text-base leading-7 text-[#4f4f4f]`}>{value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.35rem] border border-[#F2994A]/22 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_58%,#f8f9fa_100%)] p-6 shadow-[0_16px_36px_rgba(27,29,31,0.05)]">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.54),rgba(242,153,74,0))]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2994A]">Масштаб та логістика</p>
              <h3 className={`${headingClass} mt-3 text-2xl text-[#1B1D1F]`}>Виробнича спроможність для регіональних проєктів</h3>
              <p className={`${bodyClass} mt-4 text-base leading-7 text-[#828282]`}>
                {brandifyTimberX("TimberX оперує потужностями, здатними забезпечити відновлення в масштабах регіону.")}
              </p>
              <div className="mt-6 rounded-[1rem] border border-[#F2994A]/22 bg-[#F2994A]/8 p-5">
                <p className={`${headingClass} text-2xl leading-none text-[#F2994A]`}>300-1000 м2</p>
                <p className={`${bodyClass} mt-2 text-sm leading-6 text-[#6f6f6f]`}>орієнтовний місячний виробничий обсяг для планування партій</p>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1rem] border border-[#E5E7EB] bg-white p-5">
                  <p className={`${headingClass} text-xl text-[#1B1D1F]`}>Заводська підготовка</p>
                  <p className={`${bodyClass} mt-2 text-base leading-7 text-[#828282]`}>
                    ЧПУ-обладнання забезпечує точну нарізку та складання каркасно-модульних, CLT-панельних або комбінованих металево-дерев&apos;яних модулів.
                  </p>
                </div>
                <div className="rounded-[1rem] border border-[#E5E7EB] bg-white p-5">
                  <p className={`${headingClass} text-xl text-[#1B1D1F]`}>Логістика під умови громади</p>
                  <p className={`${bodyClass} mt-2 text-base leading-7 text-[#828282]`}>
                    Доставка у форматі розбірних великогабаритних конструкторів або готових модулів зменшує транспортні витрати та спрощує роботу у важкодоступних районах.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10 space-y-10 lg:mt-12">
          <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden shadow-[0_34px_90px_rgba(0,0,0,0.22)]">
            <div className="absolute inset-0">
              <Image
                src="/images/cases/sosnovel-case.jpg"
                alt="Реалізований кейс TimberX Сосновель для девелоперського проєкту"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1200px, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.92)_0%,rgba(18,19,21,0.8)_28%,rgba(18,19,21,0.34)_58%,rgba(18,19,21,0.08)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.14)_36%,rgba(17,18,20,0.62)_100%)]" />
            </div>
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.4),rgba(242,153,74,0))]" />

            <div className="relative flex min-h-[36rem] items-center md:min-h-[42rem]">
              <div className="w-full px-6 md:px-6 lg:px-6">
                <div className="mx-auto max-w-[88rem]">
                  <div className="max-w-[36rem] py-10 md:py-14 lg:py-16">
                    <p className="mb-5 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                      Девелоперський кейс TimberX
                    </p>
                    <h3 className={`${headingClass} text-[2.5rem] leading-[1.02] text-white md:text-[3rem]`}>
                      Заміський комплекс “Сосновель”
                    </h3>

                    <div className="mt-8 grid gap-5 text-base leading-8 text-white/84">
                      <div>
                        <p className="font-semibold text-white">Задача:</p>
                        <p>Будівництво котеджей під здачу в оренду</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white">Рішення:</p>
                        <p>Модульні будинки заводського виробництва</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="font-semibold text-white">Результат:</p>
                      <ul className="mt-4 space-y-3 text-base leading-7 text-white/82 sm:leading-8">
                        <li className="flex gap-3">
                          <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                          <span>
                            зменшення витрат на матеріали на{" "}
                            <strong className="font-semibold text-[#F2994A]">30%</strong>
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                          <span>
                            збільшення швидкості реалізації проєкту на{" "}
                            <strong className="font-semibold text-[#F2994A]">28 днів</strong>
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                          <span>
                            власна логістика та економія на збірці на ділянці до{" "}
                            <strong className="font-semibold text-[#F2994A]">10–15%</strong>
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                          <span>
                            <strong className="font-semibold text-[#F2994A]">100%</strong>{" "}
                            можливість масштабування
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Link
                      href="/cases/"
                      className="mt-8 inline-flex items-center justify-center rounded bg-[#F2994A] px-5 py-3 text-sm font-semibold text-[#1B1D1F] transition hover:bg-[#de8232]"
                    >
                      Дивитися більше кейсів
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-10 lg:mt-12">
          <h2 className={`${headingClass} text-3xl text-[#1B1D1F] sm:text-4xl`}>Гарантії та відповідальність</h2>
          <p className={`${bodyClass} max-w-4xl text-lg leading-8 text-[#828282]`}>
            {brandifyTimberX(
              "TimberX працює з повним контролем реалізації: від фінансової прозорості до технічних гарантій і підтвердженого досвіду.",
            )}
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
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
              <article className="group relative flex min-h-[20rem] w-full max-w-[32rem] flex-col overflow-hidden rounded-[1.6rem] border border-[#F2994A]/34 bg-[linear-gradient(180deg,rgba(242,153,74,0.18),#ffffff_36%,#f8f9fa_100%)] p-8 shadow-[0_24px_60px_rgba(242,153,74,0.14)] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/52 hover:shadow-[0_30px_72px_rgba(242,153,74,0.2)]">
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.78),rgba(242,153,74,0))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.22),transparent_42%)] opacity-90 transition duration-200 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[18px] border border-[#F2994A]/55 bg-[linear-gradient(180deg,rgba(242,153,74,0.26),rgba(242,153,74,0.1))] text-[#F2994A] shadow-[0_20px_42px_rgba(242,153,74,0.18)]">
                    <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/24" />
                    <LineIcon name="shield" className="relative h-11 w-11" />
                  </div>
                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
                    Гарантії TimberX
                  </p>
                  <h3 className={`${headingClass} mt-4 text-[2.1rem] leading-[1.12] text-[#1B1D1F]`}>
                    ГАРАНТІЯ 10 РОКІВ НА КОНСТРУКЦІЇ
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-10 lg:mt-12">
          <h2 className={`${headingClass} text-3xl text-[#1B1D1F] sm:text-4xl`}>Процес співпраці</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-[#E5E7EB] bg-white p-6 shadow-[0_14px_32px_rgba(27,29,31,0.05)]">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.18),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_18px_36px_rgba(242,153,74,0.12)]">
                  <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18" />
                  <span className="relative text-sm font-semibold">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className={`${headingClass} mt-5 text-[1.6rem] leading-[1.1] text-[#1B1D1F]`}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <StandardQuizCta
          id="cta"
          className="mt-10 lg:mt-12 [&>div]:!bg-[#202326] [&>div_[aria-hidden='true']]:hidden"
        />
        </div>
      </main>

      <div className="bg-[#1b1d1f] text-white">
        <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
