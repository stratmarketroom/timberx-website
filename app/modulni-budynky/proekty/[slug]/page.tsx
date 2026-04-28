import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { ProjectVisualSlider } from "@/components/project-visual-slider";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { findTypicalProject, modularTypicalProjects } from "@/lib/typical-projects";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const technicalSpecIcons: IconName[] = ["settings", "blueprint", "projects", "delivery"];

type RouteParams = {
  slug: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

export function generateStaticParams() {
  return modularTypicalProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findTypicalProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Типовий проєкт TimberX`,
    description: project.summary,
    alternates: {
      canonical: `/modulni-budynky/proekty/${project.slug}/`,
    },
  };
}

export default async function TypicalProjectPage({ params }: RouteProps) {
  const { slug } = await params;
  const project = findTypicalProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = modularTypicalProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);
  const atmosphereGallery = [
    {
      src: "/images/projects/scout-dacha-25/visual-entry.jpg",
      alt: "Skaut 25: вхідна зона",
      label: "Вхід",
    },
    {
      src: "/images/projects/scout-dacha-25/visual-grey-facade.jpg",
      alt: "Skaut 25: сірий фасад",
      label: "Фасад",
    },
    {
      src: "/images/projects/scout-dacha-25/visual-terrace.jpg",
      alt: "Skaut 25: тераса",
      label: "Тераса",
    },
  ];
  const modelGallery = project.gallery.slice(4);
  const areaSpecs = project.areaSpecs ?? project.specs;
  const rooms = project.rooms ?? [];
  const roomRows: Array<{ number: string; name: string; area: string; note?: string }> = rooms.length
    ? rooms
    : project.plan.zones.map((zone, index) => ({
        number: String(index + 1).padStart(2, "0"),
        name: zone,
        area: "",
      }));
  const technicalSpecs = project.technicalSpecs ?? project.specs;
  const adaptationOptions = project.adaptationOptions ?? project.formats;

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-[#1b1d1f]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.heroImageAlt}
            fill
            priority
            className="object-cover object-[58%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#f4f0e8]/82" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,240,232,0.98)_0%,rgba(244,240,232,0.9)_45%,rgba(244,240,232,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,240,232,0.18),rgba(244,240,232,0.72)_72%,#f4f0e8_100%)]" />
        </div>

        <div className="relative z-20">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-8 lg:pb-24 lg:pt-16">
          <nav className={`${bodyClass} mb-6 flex flex-wrap items-center gap-2 text-sm text-[#70685f]`}>
            <Link href="/" className="transition hover:text-[#1b1d1f]">
              Головна
            </Link>
            <span>/</span>
            <Link href="/modulni-budynky/" className="transition hover:text-[#1b1d1f]">
              Модульні будинки
            </Link>
            <span>/</span>
            <Link href="/modulni-budynky/proekty/" className="transition hover:text-[#1b1d1f]">
              Типові проєкти
            </Link>
            <span>/</span>
            <span className="text-[#1b1d1f]">{project.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,0.9fr)] lg:items-start">
            <div className="max-w-5xl">
              <p className="mb-5 inline-flex max-w-full rounded-full border border-[#d8cdbc] bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d6d5e] shadow-[0_16px_30px_rgba(41,36,30,0.08)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                {project.productLabel}
              </p>
              <h1 className={`${headingClass} max-w-5xl text-[2.35rem] leading-[1.02] text-[#1b1d1f] sm:text-5xl lg:text-[4.35rem]`}>
                {project.title}
              </h1>
              <p className={`${bodyClass} mt-7 max-w-4xl text-xl leading-9 text-[#5d554d] md:text-[1.45rem] md:leading-10`}>
                {project.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-7 py-4 text-lg font-semibold text-[#1B1D1F] shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
                >
                  {project.ctaLabel}
                </Link>
                <Link
                  href="/modulni-budynky/proekty/"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#cdbfad] bg-white/50 px-7 py-4 text-lg font-semibold text-[#1b1d1f] transition hover:border-[#a89078] hover:bg-white"
                >
                  До каталогу
                </Link>
              </div>
            </div>

            <div className="group relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-[#d8cdbc] bg-[#1b1d1f] shadow-[0_26px_70px_rgba(41,36,30,0.16)] transition duration-300 hover:-translate-y-2 hover:border-[#f2994a]/45 hover:shadow-[0_36px_90px_rgba(41,36,30,0.22)] lg:mt-[4.45rem] lg:aspect-[1.72/1] xl:aspect-[1.62/1]">
              <Image
                src="/images/projects/scout-dacha-25/forest-exterior-02.jpg"
                alt="Skaut 25: будинок з критою терасою"
                fill
                priority
                className="scale-[1.03] object-cover transition duration-500 group-hover:scale-[1.075]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(242,153,74,0.12))] opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-[88rem] flex-col gap-12 px-4 py-12 md:px-6 md:py-16 lg:gap-16 lg:py-20">
        <ProjectVisualSlider slides={atmosphereGallery} />

        <section className="rounded-[2rem] border border-[#d8cdbc] bg-[#fffaf2]/62 p-5 shadow-[0_24px_70px_rgba(41,36,30,0.08)] sm:p-7 lg:p-9">
          <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                Специфікація
              </p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                {project.plan.title}
              </h2>
            </div>
            <p className={`${bodyClass} max-w-3xl text-base leading-8 text-[#5d554d] lg:justify-self-end`}>
              Паспорт проєкту з план-схемою, експлікацією приміщень,
              основними площами, конструктивними параметрами та архітектурними
              ракурсами моделі.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-3 shadow-[0_18px_48px_rgba(41,36,30,0.08)]">
                {project.plan.imageSrc ? (
                  <Image
                    src={project.plan.imageSrc}
                    alt={project.plan.title}
                    width={730}
                    height={1250}
                    className="mx-auto h-auto max-h-[46rem] w-auto max-w-full object-contain"
                    sizes="(min-width: 1024px) 54vw, 100vw"
                  />
                ) : (
                  <div className="flex min-h-[24rem] flex-wrap content-start gap-2 rounded-[1rem] bg-[#fffaf2] p-5">
                    {project.plan.zones.map((zone) => (
                      <span
                        key={zone}
                        className="h-fit rounded-full border border-[#e1c5a5] bg-[#f2994a]/10 px-3 py-1.5 text-sm text-[#7d4f28]"
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-5 shadow-[0_16px_42px_rgba(41,36,30,0.07)] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Площі
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {areaSpecs.map((item) => (
                    <div key={item.label} className="border-t border-[#dfd4c5] pt-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a7c6d]">
                        {item.label}
                      </p>
                      <p className={`${headingClass} mt-2 text-2xl leading-none text-[#1b1d1f]`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-5 shadow-[0_16px_42px_rgba(41,36,30,0.07)] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Експлікація
                </p>
                <div className="mt-5 divide-y divide-[#dfd4c5]">
                  {roomRows.map((room) => (
                    <div key={`${room.number}-${room.name}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] gap-3 py-4">
                      <p className={`${bodyClass} text-sm font-semibold text-[#8a7c6d]`}>
                        {room.number}
                      </p>
                      <div>
                        <p className={`${headingClass} text-lg leading-tight text-[#1b1d1f]`}>
                          {room.name}
                        </p>
                        {room.note ? (
                          <p className={`${bodyClass} mt-1 text-sm text-[#7a7066]`}>{room.note}</p>
                        ) : null}
                      </div>
                      <p className={`${bodyClass} whitespace-nowrap text-base font-semibold text-[#1b1d1f]`}>
                        {room.area}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                Технічні характеристики
              </p>
              <div className="mt-6 divide-y divide-[#d8cdbc] border-y border-[#d8cdbc]">
                {technicalSpecs.map((item, index) => (
                  <div key={item.label} className="grid gap-4 py-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f2994a]/34 bg-[#f2994a]/10 text-[#c8742b]">
                      <LineIcon name={technicalSpecIcons[index] ?? "settings"} className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7c6d]">
                        {item.label}
                      </p>
                      <p className={`${bodyClass} mt-2 text-lg font-semibold leading-8 text-[#1b1d1f]`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {modelGallery.length ? (
              <div className="py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Модель
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {modelGallery.slice(0, 4).map((image) => (
                    <div key={image.src} className="relative aspect-[16/10] overflow-hidden rounded-[1rem] border border-[#d8cdbc] bg-white shadow-[0_12px_28px_rgba(41,36,30,0.07)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 22vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-y border-[#d8cdbc] py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                Формати та адаптація
              </p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                Компактний формат, який можна масштабувати
              </h2>
              <p className={`${bodyClass} mt-5 max-w-2xl text-xl leading-9 text-[#5d554d]`}>
                Для B2B-задач це не одиничний “будиночок”, а базовий формат, який
                можна повторювати партіями, адаптувати за комплектацією та
                налаштовувати під конкретний об&apos;єкт.
              </p>
            </div>
            <div className="pt-8 lg:pt-[1.9rem]">
              <div className={`${bodyClass} text-base leading-8 text-[#5d554d]`}>
                <p>
                  Проєкт зібраний навколо простої логіки: компактна внутрішня площа,
                  зрозумілий вхід, повноцінний санвузол і тераса, яка розширює сценарій
                  використання будинку в теплий сезон.
                </p>
              </div>

              <div className="mt-5">
                <div className="flex flex-wrap gap-2">
                  {project.scenarios.map((scenario) => (
                    <span key={scenario} className="rounded-full border border-[#d9c3a9] bg-white/60 px-3 py-1.5 text-sm font-medium text-[#5f5144]">
                      {scenario}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Адаптація
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {adaptationOptions.map((option) => (
                    <div key={option} className="border-t border-[#dfd4c5] pt-4">
                      <p className={`${bodyClass} text-base font-semibold leading-7 text-[#1b1d1f]`}>
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-6 shadow-[0_16px_42px_rgba(41,36,30,0.07)]">
              <p className={`${headingClass} text-2xl leading-tight text-[#1b1d1f]`}>
                Коробка
              </p>
              <p className={`${bodyClass} mt-4 text-base leading-8 text-[#5d554d]`}>
                Готовий каркас, зовнішнє оздоблення, вікна, двері, базова
                інженерія та доставка до 50 км від виробництва.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-6 shadow-[0_16px_42px_rgba(41,36,30,0.07)]">
              <p className={`${headingClass} text-2xl leading-tight text-[#1b1d1f]`}>
                Під ключ
              </p>
              <p className={`${bodyClass} mt-4 text-base leading-8 text-[#5d554d]`}>
                Внутрішнє та зовнішнє оздоблення, електрика, сантехніка, вікна,
                двері, опалення, вентиляція, доставка до 50 км від виробництва,
                фундамент і підключення до комунікацій на ділянці: вода,
                електрика, каналізація.
              </p>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="relative overflow-hidden rounded-[30px] border border-[#2c3031] bg-[#181b1d] p-8 shadow-[0_30px_80px_rgba(22,24,24,0.18)] md:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_18%_22%,rgba(242,153,74,0.16),transparent_36%)]" />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.7fr)] lg:items-center">
              <div className="max-w-[46rem]">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                  Розрахунок типового проєкту
                </p>
                <h2 className={`${headingClass} max-w-[40rem] text-3xl leading-tight text-white md:text-4xl`}>
                  Отримайте попередній прорахунок «{project.title}»
                </h2>
                <p className={`${bodyClass} mt-6 max-w-[42rem] text-lg leading-8 text-white/76`}>
                  Уточнимо комплектацію, фасад, інженерію, формат готовності,
                  кількість будинків у партії та логістику під ваш об&apos;єкт.
                </p>

                <ul className={`${bodyClass} mt-8 grid gap-4 text-base leading-7 text-white/78 md:grid-cols-3`}>
                  <li className="flex gap-3">
                    <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                    <span>Адаптація під сценарій використання</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                    <span>Підбір комплектації: коробка або під ключ</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                    <span>Бюджет, строки та логіка партії</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contacts/"
                    className="inline-flex w-full items-center justify-center rounded bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] transition hover:bg-[#de8232] sm:w-auto"
                  >
                    Почати прорахунок
                  </Link>
                  <Link
                    href="/modulni-budynky/proekty/"
                    className="inline-flex w-full items-center justify-center rounded border border-white/20 px-6 py-4 text-center text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
                  >
                    Дивитися інші типові проєкти
                  </Link>
                </div>
              </div>

              <div className="relative rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F2994A]">
                  Що підготуємо
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: "calculator" as IconName,
                      title: "Попередній бюджет",
                      text: "Орієнтир по комплектації, партії та логістиці.",
                    },
                    {
                      icon: "settings" as IconName,
                      title: "Параметри готовності",
                      text: "Коробка або під ключ з потрібним рівнем інженерії.",
                    },
                    {
                      icon: "blueprint" as IconName,
                      title: "Адаптація проєкту",
                      text: "Фасад, оздоблення та рішення під ваш сценарій.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded border border-[#F2994A]/30 bg-[#F2994A]/12 text-[#F2994A]">
                        <LineIcon name={item.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className={`${headingClass} block text-lg leading-tight text-white`}>
                          {item.title}
                        </span>
                        <span className={`${bodyClass} mt-2 block text-sm leading-6 text-white/66`}>
                          {item.text}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProjects.length ? (
          <section>
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                Інші формати
              </p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                Схожі типові проєкти
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/modulni-budynky/proekty/${item.slug}/`}
                  className="group relative min-h-[17rem] overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white shadow-[0_18px_52px_rgba(41,36,30,0.08)] transition hover:-translate-y-1 hover:border-[#c99965] hover:shadow-[0_24px_68px_rgba(41,36,30,0.12)]"
                >
                  <Image
                    src={item.heroImage}
                    alt={item.heroImageAlt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 28vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,29,31,0.02),rgba(27,29,31,0.64)_100%)]" />
                  <div className="relative flex h-full min-h-[17rem] flex-col justify-end p-5">
                    <p className={`${headingClass} text-2xl leading-tight text-white`}>
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#f2994a]">
                      Дивитись проєкт →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <div className="w-full bg-[#181b1d]">
        <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
