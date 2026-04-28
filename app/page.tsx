import Image from "next/image";
import Link from "next/link";
import { LineIcon } from "../components/home-visuals";
import type { IconName } from "../components/home-visuals";
import { StandardQuizCta } from "../components/standard-quiz-cta";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const cardHeadingClass = `${headingClass} text-[1.7rem] leading-[1.04] text-white sm:text-[2rem]`;
const groupHeadingClass = `${headingClass} text-[1.9rem] leading-[1.08] text-white`;

const navItems = [
  { label: "Продукти", href: "#products" },
  { label: "Проєкти", href: "/proekty/" },
  { label: "Рішення", href: "#solutions" },
  { label: "Кейси", href: "/cases/" },
  { label: "Виробництво", href: "/technologies/" },
  { label: "Контакти", href: "/contacts/" },
];
const productMenuItems = [
  { label: "Модульні будинки", href: "/modulni-budynky/" },
  { label: "Клеєні конструкції", href: "/kleyeni-konstruktsii/" },
  { label: "Ферми з металозубчатими пластинами", href: "/derevyani-fermy-mzp/" },
  { label: "Каркасно-модульні будинки", href: "/karkasno-panelni-budynky/" },
  { label: "Санітарно-технічні модулі", href: "/sanitarni-moduli/" },
  { label: "Фахверкові будинки", href: "/fakhverkovi-budynky/" },
];
const solutionMenuItems = [
  { label: "Для девелоперів", href: "/modulni-budynky/dlya-developeriv/" },
  { label: "Для забудовників", href: "/modulni-budynky/dlya-zhk/" },
  { label: "Для генпідрядників", href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/" },
  { label: "Для громад (B2G)", href: "/modulni-budynky/dlya-gromad/" },
];

const footerProductPages = [
  { label: "Модульні будинки", href: "/modulni-budynky/" },
  { label: "Клеєні конструкції", href: "/kleyeni-konstruktsii/" },
  { label: "Ферми з металозубчатими пластинами", href: "/derevyani-fermy-mzp/" },
  { label: "Каркасно-модульні будинки", href: "/karkasno-panelni-budynky/" },
  { label: "Санітарно-технічні модулі", href: "/sanitarni-moduli/" },
  { label: "Фахверкові будинки", href: "/fakhverkovi-budynky/" },
];
const footerSolutionPages = [
  { label: "Для девелоперів", href: "/modulni-budynky/dlya-developeriv/" },
  { label: "Для забудовників", href: "/modulni-budynky/dlya-zhk/" },
  { label: "Для генпідрядників", href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/" },
  { label: "Для громад (B2G)", href: "/modulni-budynky/dlya-gromad/" },
];

const footerServicePages = [
  { label: "Проєкти", href: "/proekty/" },
  { label: "Кейси", href: "/cases/" },
  { label: "Виробництво", href: "/technologies/" },
  { label: "Про компанію", href: "/about/" },
  { label: "Контакти", href: "/contacts/" },
];

const solutionPoints: Array<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "calculator",
    title: "Контроль строків",
    description: "Монтаж конструкцій займає 1–2 дні замість тижнів ручної роботи",
  },
  {
    icon: "shield",
    title: "Зниження ризиків",
    description: "Точні інженерні розрахунки без помилок і перевитрат матеріалів",
  },
  {
    icon: "beam",
    title: "Масштабованість",
    description: "Серійне виробництво для девелоперських і B2G проєктів",
  },
];

const audiences: Array<{
  title: string;
  description: string;
  href: string;
  icon: IconName;
  imageSrc: string;
  imageClassName: string;
  overlayClassName: string;
}> = [
  {
    title: "Для девелоперів",
    description:
      "Запускайте продажі на 2–3 місяці раніше завдяки заводській готовності конструкцій і монтажу за 1–3 дні.",
    href: "/modulni-budynky/dlya-developeriv/",
    icon: "projects",
    imageSrc: "/images/audiences/audience-developers.jpg",
    imageClassName: "object-[50%_50%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.88)_0%,rgba(17,18,20,0.74)_28%,rgba(17,18,20,0.28)_62%,rgba(17,18,20,0.18)_100%)]",
  },
  {
    title: "Для забудовників",
    description:
      "Контролюйте собівартість і строки завдяки фіксованій ціні, точності до 2 мм і мінімізації переробок.",
    href: "/modulni-budynky/dlya-zhk/",
    icon: "factory",
    imageSrc: "/images/audiences/audience-builders.jpg",
    imageClassName: "object-[56%_48%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.78)_30%,rgba(17,18,20,0.36)_64%,rgba(17,18,20,0.24)_100%)]",
  },
  {
    title: "Для генпідрядників",
    description:
      "Скорочуйте ризики на майданчику: готові інженерні вузли спрощують монтаж і технагляд.",
    href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/",
    icon: "contractor",
    imageSrc: "/images/audiences/audience-general-contractors.jpg",
    imageClassName: "object-[56%_42%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.94)_0%,rgba(17,18,20,0.82)_34%,rgba(17,18,20,0.34)_66%,rgba(17,18,20,0.2)_100%)]",
  },
  {
    title: "Для громад (B2G)",
    description:
      "Фіксований бюджет і строки. Швидка реалізація соціальних об’єктів із відповідністю ДБН і гарантією на конструкції.",
    href: "/modulni-budynky/dlya-gromad/",
    icon: "community",
    imageSrc: "/images/audiences/audience-communities.jpg",
    imageClassName: "object-[52%_52%]",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(17,18,20,0.9)_0%,rgba(17,18,20,0.76)_28%,rgba(17,18,20,0.3)_62%,rgba(17,18,20,0.18)_100%)]",
  },
];

const products = [
  {
    imageSrc: "/images/products/icon-modulni-budynky.png",
    title: "Модульні будинки",
    description:
      "Будівництво під ключ або “коробка”. Виробництво 30–60 днів із фіксованою ціною",
    href: "/modulni-budynky/",
  },
  {
    imageSrc: "/images/products/icon-kleyeni-konstruktsii.png",
    title: "Клеєні конструкції",
    description: "Інженерні рішення для складних проєктів із великими прольотами",
    href: "/kleyeni-konstruktsii/",
  },
  {
    imageSrc: "/images/products/icon-fermy-mzp.png",
    title: "Ферми з металозубчатими пластинами",
    description: "Дахові системи з економією матеріалів до 20–30% і швидким монтажем",
    href: "/derevyani-fermy-mzp/",
  },
  {
    imageSrc: "/images/products/icon-karkasno-panelni.png",
    title: "Каркасно-модульні будинки",
    description: "Енергоефективні будинки для швидкого серійного будівництва",
    href: "/karkasno-panelni-budynky/",
  },
  {
    imageSrc: "/images/products/icon-sanitarni-moduli.png",
    title: "Санітарно-технічні модулі",
    description: "Готові санітарні блоки для житлових, соціальних і комерційних проєктів",
    href: "/sanitarni-moduli/",
  },
  {
    imageSrc: "/images/products/icon-fakhverk.png",
    title: "Фахверкові будинки",
    description: "Сучасні будинки з великими відкритими просторами",
    href: "/fakhverkovi-budynky/",
  },
];

const productGroups = [
  {
    title: "Інженерні\nконструкції",
    imageSrc: "/images/products/icon-fermy-mzp.png",
    items: [products[1], products[2]],
  },
  {
    title: "Модульні\nрішення",
    imageSrc: "/images/products/icon-modulni-budynky.png",
    items: [products[0], products[4]],
  },
  {
    title: "Будинки та системи забудови",
    imageSrc: "/images/products/icon-fakhverk.png",
    items: [products[3], products[5]],
  },
];

const processSteps: Array<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "request",
    title: "Запит",
    description:
      "Фіксуємо задачу, тип об’єкта, обсяги та базові вимоги до реалізації.",
  },
  {
    icon: "calculator",
    title: "Прорахунок",
    description:
      "Готуємо попередню пропозицію зі строками, бюджетом і технічними параметрами.",
  },
  {
    icon: "contractor",
    title: "Підписання договору",
    description:
      "Фіксуємо чітку вартість, порядок оплат і терміни реалізації проєкту.",
  },
  {
    icon: "factory",
    title: "Виробництво",
    description:
      "Переходимо до заводського виготовлення з контролем якості на кожному етапі.",
  },
  {
    icon: "delivery",
    title: "Поставка",
    description:
      "Організовуємо логістику, доставку на об’єкт і підготовку до монтажу.",
  },
];

const heroTrust: Array<{ icon: IconName; value: string; label: string }> = [
  {
    icon: "projects",
    value: "150+",
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
    label: "Географія наших проєктів",
  },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#828282]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${headingClass} text-3xl leading-tight text-white md:text-4xl`}
      >
        {title}
      </h2>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded border border-white/10 bg-[#25282B] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className={`${bodyClass} min-h-screen bg-[#1B1D1F] text-white`}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-factory.jpg"
            alt="Виробництво дерев'яних конструкцій та модульних будинків TimberX"
            fill
            priority
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-[#1B1D1F]/48" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.9)_0%,rgba(18,19,21,0.78)_28%,rgba(18,19,21,0.32)_58%,rgba(18,19,21,0.02)_100%)]" />
        </div>

        <header className="relative z-20 pt-4 md:pt-5">
          <div className="w-full px-4 md:px-6 lg:px-6">
            <div className="mx-auto max-w-[88rem]">
              <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/12 bg-[rgba(18,19,21,0.94)] px-3 py-3.5 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-4 sm:py-4 lg:gap-5 lg:px-5">
                <Link href="/" className="flex min-w-0 items-center">
                  <Image
                    src="/images/logo/logo-manual-updated.png"
                    alt="TimberX"
                    width={2000}
                    height={2000}
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 176px"
                    className="h-14 w-auto shrink-0 object-contain sm:h-16 lg:h-[4.4rem]"
                  />
                </Link>

                <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 p-2.5 text-[15px] text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex">
                  {navItems.map((item) => (
                    <div key={item.label} className="group relative">
                      <Link
                        href={item.href}
                        className="inline-flex rounded-full border border-transparent px-5 py-2.5 font-medium transition duration-200 hover:-translate-y-0.5 hover:border-[#F2994A]/35 hover:bg-white/10 hover:text-[#F2994A]"
                      >
                        {item.label}
                      </Link>
                      {item.label === "Продукти" || item.label === "Рішення" ? (
                        <div className="pointer-events-none absolute left-0 top-full z-30 min-w-[18rem] translate-y-1 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                          <div className="rounded-[14px] border border-white/12 bg-[rgba(18,19,21,0.96)] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                          <div className="flex flex-col gap-1">
                            {(item.label === "Продукти" ? productMenuItems : solutionMenuItems).map(
                              (subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="rounded-[10px] border border-transparent px-3 py-2 text-sm text-white/86 transition hover:border-[#F2994A]/28 hover:bg-white/6 hover:text-[#F2994A]"
                                >
                                  {subItem.label}
                                </Link>
                              ),
                            )}
                          </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </nav>

                <Link
                  href="#cta"
                  className="hidden items-center justify-center rounded-[12px] border border-[#F2994A]/40 bg-[#F2994A] px-6 py-3.5 text-base font-semibold text-[#1B1D1F] shadow-[0_16px_32px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232] hover:shadow-[0_20px_40px_rgba(242,153,74,0.34)] sm:inline-flex"
                >
                  Отримати прорахунок
                </Link>

                <details className="relative lg:hidden">
                  <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-[14px] border border-white/12 bg-white/6 text-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:border-[#F2994A]/32 hover:text-[#F2994A] [&::-webkit-details-marker]:hidden">
                    <span className="sr-only">Відкрити меню</span>
                    <span className="flex flex-col gap-1.5">
                      <span className="h-0.5 w-5 rounded-full bg-current" />
                      <span className="h-0.5 w-5 rounded-full bg-current" />
                      <span className="h-0.5 w-5 rounded-full bg-current" />
                    </span>
                  </summary>

                  <div className="absolute right-0 top-[calc(100%+0.85rem)] z-30 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[20px] border border-white/12 bg-[rgba(18,19,21,0.94)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded-[12px] border border-transparent px-4 py-3 text-sm font-medium text-white/88 transition hover:border-[#F2994A]/28 hover:bg-white/6 hover:text-[#F2994A]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <Link
                        href="#cta"
                        className="inline-flex w-full items-center justify-center rounded-[12px] border border-[#F2994A]/40 bg-[#F2994A] px-5 py-3 text-sm font-semibold text-[#1B1D1F] shadow-[0_16px_32px_rgba(242,153,74,0.24)] transition hover:bg-[#de8232]"
                      >
                        Отримати прорахунок
                      </Link>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </header>

        <section className="relative z-10 flex min-h-[100svh] items-center md:min-h-[100vh]">
          <div className="w-full px-4 pb-14 pt-10 md:px-6 md:pb-20 md:pt-14 lg:px-6 lg:pb-24 lg:pt-16">
            <div className="mx-auto max-w-[88rem]">
              <p className="mb-5 inline-flex max-w-[56rem] items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[9px] font-semibold uppercase leading-5 tracking-[0.18em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[10px] sm:tracking-[0.22em] md:text-[11px] md:tracking-[0.26em]">
                Виробництво каркасно-модульних будинків, конструкцій з клеєної
                деревини та дерев&apos;яних ферм з металозубчатими пластинами.
              </p>
              <h1
                className={`${headingClass} max-w-[20ch] text-[2.25rem] leading-[1.03] text-white sm:text-5xl md:max-w-none md:text-[3.9rem] lg:max-w-none lg:text-[4.35rem] xl:text-[4.7rem]`}
              >
                Інженерні дерев&apos;яні конструкції та каркасно-модульні будинки
                для девелоперів і громад
              </h1>
              <div className="mt-6 max-w-[44rem] space-y-4 text-base leading-7 text-white/78 md:text-lg">
                <p>
                  TimberX — забезпечує швидку реалізацію будівництва за рахунок
                  інженерних розрахунків, заводської точності та контролю всіх
                  етапів.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="#cta"
                  className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232] hover:shadow-[0_22px_44px_rgba(242,153,74,0.34)] sm:w-auto"
                >
                  Отримати прорахунок проєкту
                </Link>
                <Link
                  href="#cta"
                  className="inline-flex w-full items-center justify-center rounded-[10px] border border-white/18 bg-[rgba(255,255,255,0.04)] px-6 py-4 text-center text-base font-semibold text-white transition hover:border-white/36 hover:bg-white/8 sm:w-auto"
                >
                  <span>
                    Завантажити каталог Timber
                    <span className="text-[#F2994A]">X</span>
                    {" "}виробництва
                  </span>
                </Link>
              </div>

              <div className="mt-6 grid max-w-[56rem] grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:gap-4 sm:pt-8">
                {heroTrust.map((item) => (
                  <div key={item.label} className="px-1 py-1 sm:py-2">
                    <div className="relative mb-3 flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-[16px] border border-[#F2994A]/38 bg-[linear-gradient(180deg,rgba(242,153,74,0.18),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_18px_34px_rgba(242,153,74,0.1)] sm:mb-4 sm:h-[4.25rem] sm:w-[4.25rem] sm:rounded-[18px]">
                      <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18 sm:inset-[6px] sm:rounded-[13px]" />
                      <LineIcon name={item.icon} className="relative h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <p className="text-[1.15rem] leading-none font-medium text-[#F2994A] sm:text-[1.45rem] md:text-[1.9rem]">
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
      </div>

      <div className="w-full px-4 py-16 md:px-6 md:py-24 lg:px-6">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-20 md:gap-24">
        <section id="solutions" className="space-y-10">
          <div className="relative overflow-hidden rounded-[30px] border border-[#F2994A]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-8 shadow-[0_34px_90px_rgba(0,0,0,0.24)] md:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-75"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(242,153,74,0.14), transparent 30%), linear-gradient(180deg, rgba(242,153,74,0.05) 0%, transparent 18%, rgba(255,255,255,0.025) 100%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.42),rgba(242,153,74,0.0))]" />
            <div className="relative max-w-[58rem]">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                Системний підхід
              </p>
              <SectionHeading title="Інженерні конструкції та каркасно-модульні будинки замість традиційного будівництва" />
              <p className="mt-6 text-lg leading-8 text-white/80">
                Ми переводимо будівництво у системний процес: від інженерного
                розрахунку до заводського виробництва та швидкого монтажу.
              </p>
            </div>

            <div className="relative mt-10 grid gap-6 lg:grid-cols-3">
              {solutionPoints.map((item) => (
                <Card
                  key={item.title}
                  className="group relative flex min-h-72 flex-col overflow-hidden border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/38 hover:shadow-[0_34px_84px_rgba(0,0,0,0.32)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.55),rgba(242,153,74,0.0))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#F2994A]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#F2994A] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition group-hover:border-[#F2994A]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                      <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/20" />
                      <LineIcon name={item.icon} className="relative h-10 w-10" />
                    </div>
                  </div>
                  <div className="relative mt-7">
                    <p className={cardHeadingClass}>
                      {item.title}
                    </p>
                    <p className="mt-5 max-w-[19rem] text-base leading-7 text-white/84">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10 pt-4 md:pt-6">
          <div className="max-w-[58rem]">
            <SectionHeading title="Рішення для вашого типу бізнесу" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {audiences.map((audience) => (
              <Link key={audience.title} href={audience.href} className="group block">
                <Card className="group relative h-full overflow-hidden border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(37,40,43,0.98))] p-0 transition duration-200 group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:border-[#F2994A]/42 group-hover:shadow-[0_32px_84px_rgba(0,0,0,0.32)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.12),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="relative aspect-[4/4.75] overflow-hidden sm:aspect-[4/3.8] md:aspect-[4/4.1] lg:aspect-[16/8.5]">
                      <Image
                        src={audience.imageSrc}
                        alt={audience.title}
                        fill
                        className={`object-cover transition duration-300 group-hover:scale-[1.04] ${audience.imageClassName}`}
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <div className={`absolute inset-0 ${audience.overlayClassName}`} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.06),rgba(17,18,20,0.12)_42%,rgba(17,18,20,0.64)_100%)]" />
                      <div className="absolute left-6 top-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#F2994A]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#F2994A] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition duration-200 group-hover:border-[#F2994A]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                        <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/20" />
                        <LineIcon name={audience.icon} className="relative h-10 w-10" />
                      </div>
                      <div className="absolute inset-0 flex flex-col px-6 pb-6 pt-28 sm:pb-7 md:pb-7 lg:pb-6 sm:pt-28 md:pt-24 lg:pt-28">
                        <h3
                          className={`${headingClass} max-w-[16rem] text-[1.7rem] leading-[1.04] text-white transition group-hover:text-[#F2994A] sm:text-[1.82rem] md:text-[1.55rem] lg:text-[2rem]`}
                        >
                          {audience.title}
                        </h3>
                        <div className="mt-auto space-y-3">
                          <p className="max-w-[23rem] text-sm leading-[1.45] text-white/84 sm:text-[0.93rem] sm:leading-[1.45] md:text-[0.86rem] md:leading-[1.38] lg:text-[0.98rem] lg:leading-[1.55]">
                            {audience.description}
                          </p>
                          <div className="flex items-center gap-3 text-sm font-medium text-[#F2994A]/92">
                            <span>Детальніше</span>
                            <span className="transition duration-200 group-hover:translate-x-1">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="products" className="space-y-10">
          <div className="relative overflow-hidden rounded-[30px] border border-[#F2994A]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-8 shadow-[0_34px_90px_rgba(0,0,0,0.22)] md:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-75"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(242,153,74,0.13), transparent 30%), linear-gradient(180deg, rgba(242,153,74,0.04) 0%, transparent 18%, rgba(255,255,255,0.025) 100%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.4),rgba(242,153,74,0.0))]" />

            <div className="relative max-w-[58rem]">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                Продуктова система
              </p>
              <SectionHeading title="Наші продукти" />
              <p className="mt-6 text-lg leading-8 text-white/80">
                TimberX формує продуктовий портфель для девелоперських,
                комерційних і B2G проєктів: від інженерних конструкцій до
                модульних та житлових рішень.
              </p>
            </div>

            <div className="relative mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {productGroups.map((group) => (
                <div
                  key={group.title}
                  className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(43,46,50,0.96))] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/28 hover:shadow-[0_30px_80px_rgba(0,0,0,0.24)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-[#F2994A]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(38,42,46,0.9))]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.12),transparent_32%)] opacity-90 transition duration-200 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
                    <div className="absolute inset-x-5 top-4 h-px bg-[#F2994A]/14" />
                    <div className="absolute inset-y-5 left-5 w-px bg-[#F2994A]/10" />
                    <div className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-[#F2994A]/55 blur-[1px]" />
                    <div className="absolute inset-0 p-2">
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(242,153,74,0.18)_0%,rgba(242,153,74,0.08)_26%,transparent_58%)] opacity-75 blur-[12px]" />
                      <Image
                        src={group.imageSrc}
                        alt={group.title}
                        fill
                        className="relative object-contain p-2 opacity-95 transition duration-300 group-hover:scale-[1.03]"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(73%) sepia(46%) saturate(1528%) hue-rotate(339deg) brightness(101%) contrast(92%)",
                        }}
                        sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>

                  <h3 className={`${groupHeadingClass} whitespace-pre-line transition group-hover:text-[#F2994A]`}>
                    {group.title}
                  </h3>

                  <div className="mt-5 grid gap-4 auto-rows-fr">
                    {group.items.map((item, itemIndex) => {
                      const needsExtraGap =
                        group.title === "Інженерні конструкції" ||
                        group.title === "Модульні рішення";
                      return (
                      <div
                        key={item.title}
                        className={`flex h-full min-h-[19rem] flex-col rounded-[14px] border p-4 transition duration-200 ${
                          itemIndex === 0
                            ? "border-[#F2994A]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.035))]"
                            : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))]"
                        } group-hover:border-[#F2994A]/24`}
                      >
                        <h4 className={`${headingClass} min-h-[3.6rem] text-xl leading-tight text-white`}>
                          {item.title}
                        </h4>
                        <p className={`${needsExtraGap ? "mt-5" : "mt-3"} min-h-[6.6rem] text-base leading-7 text-white/78`}>
                          {item.description}
                        </p>
                        <Link
                          href={item.href}
                          className="mt-auto inline-flex min-h-10 w-full items-center justify-center rounded-[10px] border border-[#F2994A]/24 bg-[rgba(242,153,74,0.12)] px-4 py-2.5 text-center text-sm font-semibold text-[#F6C08A] transition hover:border-[#F2994A]/48 hover:bg-[#F2994A] hover:text-[#1B1D1F]"
                        >
                          {`Детальніше про ${item.title.toLowerCase()}`}
                        </Link>
                      </div>
                    )})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="space-y-10">
          <div className="relative overflow-hidden border border-[#F2994A]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-8 shadow-[0_34px_90px_rgba(0,0,0,0.22)] md:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-75"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(242,153,74,0.13), transparent 30%), linear-gradient(180deg, rgba(242,153,74,0.04) 0%, transparent 18%, rgba(255,255,255,0.025) 100%)",
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.4),rgba(242,153,74,0))]" />

            <div className="relative max-w-[58rem]">
              <SectionHeading title="Виробництво та технології" />
            </div>

            <div className="relative mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
                <div className="relative min-h-[32rem] lg:h-full">
                  <Image
                    src="/images/production/truss-production1.png"
                    alt="Виробництво дерев'яних ферм з металозубчатими пластинами та конструкцій TimberX"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 760px, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.14)_46%,rgba(17,18,20,0.4)_100%)]" />
                </div>
              </div>

              <div className="grid gap-6">
                <Link
                  href="/technologies/"
                  className="group block transition duration-200 hover:-translate-y-1"
                >
                  <Card className="relative flex min-h-[15.5rem] flex-col overflow-hidden border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-7 transition duration-200 group-hover:border-[#F2994A]/38 group-hover:shadow-[0_34px_84px_rgba(0,0,0,0.32)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#F2994A]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#F2994A] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition group-hover:border-[#F2994A]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                      <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/20" />
                      <LineIcon name="factory" className="relative h-10 w-10" />
                    </div>
                    <h3 className={`${cardHeadingClass} mt-7 transition group-hover:text-[#F2994A]`}>
                      Виробництво
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/78">
                      Власне виробництво TimberX дає прогнозовані строки, заводську якість і контроль усіх етапів без залежності від ручного будівництва.
                    </p>
                    <p className="mt-3 text-base leading-7 text-white/78">
                      Виготовляємо 300–1000{"\u00a0"}м² конструкцій на місяць із точністю до 1–2 мм та повним контролем якості.
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/78 transition group-hover:text-[#F2994A]">
                      Детальніше
                      <span aria-hidden="true">→</span>
                    </p>
                  </div>
                  </Card>
                </Link>

                <Link
                  href="/technologies/"
                  className="group block transition duration-200 hover:-translate-y-1"
                >
                  <Card className="relative flex min-h-[15.5rem] flex-col overflow-hidden border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-7 transition duration-200 group-hover:border-[#F2994A]/38 group-hover:shadow-[0_34px_84px_rgba(0,0,0,0.32)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.14),transparent_34%)] opacity-60 transition duration-200 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[18px] border border-[#F2994A]/45 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.09))] text-[#F2994A] shadow-[0_22px_44px_rgba(242,153,74,0.14)] transition group-hover:border-[#F2994A]/65 group-hover:bg-[linear-gradient(180deg,rgba(242,153,74,0.3),rgba(242,153,74,0.12))] group-hover:shadow-[0_28px_52px_rgba(242,153,74,0.2)]">
                      <div className="absolute inset-[6px] rounded-[13px] border border-[#F2994A]/20" />
                      <LineIcon name="settings" className="relative h-10 w-10" />
                    </div>
                    <h3 className={`${cardHeadingClass} mt-7 transition group-hover:text-[#F2994A]`}>
                      Технології
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/78">
                      Інженерія TimberX дозволяє проектувати складні дерев&apos;яні системи без надлишкових витрат та технологічних помилок.
                    </p>
                    <p className="mt-3 text-base leading-7 text-white/78">
                      Працюємо в професійних програмах: MiTek PAMIR, Cadwork, застосовуємо ЧПУ для отримання чіткої геометрії, що дозволяє здійснювати швидке виробництво та монтаж.
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/78 transition group-hover:text-[#F2994A]">
                      Детальніше
                      <span aria-hidden="true">→</span>
                    </p>
                  </div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="space-y-10">
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

        <section className="space-y-10">
          <SectionHeading title="Гарантії та відповідальність" />
          <p className="max-w-4xl text-lg leading-8 text-white/80">
            TimberX працює з повним контролем реалізації: від фінансової прозорості до технічних гарантій і підтвердженого досвіду.
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div className="flex flex-col justify-center py-2">
              <ul className="space-y-5 text-lg leading-8 text-white/84">
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
              <Card className="group relative flex min-h-[20rem] w-full max-w-[32rem] flex-col overflow-hidden border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.24),rgba(242,153,74,0.1)_38%,rgba(37,40,43,0.98))] p-8 shadow-[0_30px_80px_rgba(242,153,74,0.14)] transition duration-200 hover:-translate-y-1 hover:border-[#F2994A]/62 hover:shadow-[0_38px_96px_rgba(242,153,74,0.22)]">
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
                    ГАРАНТІЯ 10 РОКІВ НА КОНСТРУКЦІЇ
                  </h3>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading title="Як ми працюємо" />
          <p className="max-w-4xl text-lg leading-8 text-white/80">
            Від першого запиту до поставки готових конструкцій — TimberX веде проєкт через чіткий, прогнозований і контрольований процес.
          </p>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.45),rgba(242,153,74,0.08))] md:hidden" />
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.08),rgba(242,153,74,0.5),rgba(242,153,74,0.08))] lg:block" />
            <div className="grid gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-5 lg:gap-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pl-16 md:pl-0">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#F2994A]/42 bg-[linear-gradient(180deg,rgba(242,153,74,0.22),rgba(242,153,74,0.08))] text-[#F2994A] shadow-[0_18px_36px_rgba(242,153,74,0.12)] md:relative md:mx-0 lg:mx-auto">
                    <div className="absolute inset-[5px] rounded-[11px] border border-[#F2994A]/18" />
                    <LineIcon name={step.icon} className="relative h-7 w-7" />
                  </div>
                  <div className="space-y-3 md:mt-6 md:text-left lg:text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#828282]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={cardHeadingClass}>
                      {step.title}
                    </p>
                    <p className="max-w-xs text-base leading-7 text-white/84 md:mx-0 lg:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StandardQuizCta id="cta" className="pb-6" />

        <footer className="border-t border-white/8 bg-[#181b1d] pt-10 pb-12 text-white">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.78fr)_minmax(700px,1.22fr)_minmax(420px,1.08fr)] lg:items-start">
            <div className="space-y-4 lg:-mt-4">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/images/logo/logo-manual-updated.png"
                  alt="TimberX"
                  width={188}
                  height={188}
                  sizes="96px"
                  className="h-24 w-auto object-contain"
                />
              </Link>
              <p className="max-w-[17.5rem] text-[1.03rem] leading-8 text-white/80">
                TimberX - інженерно-дерев&apos;яні конструкції, панельно-модульні
                будинки заводського виготовлення для B2B і B2G
              </p>
            </div>

            <div className="mx-auto grid w-full max-w-[54rem] gap-10 sm:grid-cols-3 lg:justify-self-center">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                  Продукти
                </p>
                <div className="flex flex-col gap-2">
                  {footerProductPages.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[1.03rem] leading-8 font-medium text-white/84 transition hover:text-[#F2994A]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                  Рішення
                </p>
                <div className="flex flex-col gap-2">
                  {footerSolutionPages.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[1.03rem] leading-8 font-medium text-white/84 transition hover:text-[#F2994A]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                  Меню
                </p>
                <div className="flex flex-col gap-2">
                  {footerServicePages.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-[1.03rem] leading-8 font-medium text-white/84 transition hover:text-[#F2994A]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:w-full lg:max-w-[30rem] lg:justify-self-end lg:border-l lg:border-white/10 lg:pl-10 lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                Контакти
              </p>
              <div className="flex max-w-[30rem] flex-col gap-3 text-[1.03rem] leading-8 text-white/82 lg:items-start">
                <p>
                  <span className="font-medium text-white/88">Телефон:</span>{" "}
                  <a href="tel:+380674121310" className="font-medium transition hover:text-[#F2994A]">
                    +380674121310
                  </a>
                </p>
                <p>
                  <span className="font-medium text-white/88">Email:</span>{" "}
                  <a href="mailto:eko-roof@ukr.net" className="font-medium transition hover:text-[#F2994A]">
                    eko-roof@ukr.net
                  </a>
                </p>
                <p>
                  <span className="font-medium text-white/88">Офіс:</span> 10001, м. Житомир, проспект
                  Незалежності, 184, офіс 210
                </p>
                <p>
                  <span className="font-medium text-white/88">Виробництво:</span> 09100, Київська область,
                  Білоцерківський район, м. Біла Церква, вул. Павлюченка, 31
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 TimberX. Всі права захищені.</p>
            <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
              <p>
                Сайт розроблений{" "}
                <a
                  href="https://nobel-itbs.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[#F2994A]"
                >
                  Nobel ITBS s.r.o.
                </a>
              </p>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </main>
  );
}
