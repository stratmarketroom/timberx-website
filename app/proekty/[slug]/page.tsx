import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { ProjectRealizationShowcase } from "@/components/project-realization-showcase";
import { ProjectVisualSlider } from "@/components/project-visual-slider";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StructuredData } from "@/components/structured-data";
import { ZoomableImage } from "@/components/zoomable-image";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/schema";
import { getSeoRobots } from "@/lib/seo-pages";
import {
  findTypicalProject,
  generalTypicalProjects,
  getTypicalProjectHref,
} from "@/lib/typical-projects";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const technicalSpecIcons: IconName[] = ["settings", "blueprint", "beam", "delivery"];

type RouteParams = {
  slug: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

export function generateStaticParams() {
  return generalTypicalProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findTypicalProject(slug);

  if (!project || project.category === "modular") {
    return {};
  }

  const canonical = getTypicalProjectHref(project);

  return {
    title: `${project.title} | Проєкт TimberX`,
    description: project.summary,
    alternates: {
      canonical,
    },
    robots: getSeoRobots(canonical),
  };
}

export default async function GeneralProjectPage({ params }: RouteProps) {
  const { slug } = await params;
  const project = findTypicalProject(slug);

  if (!project || project.category === "modular") {
    notFound();
  }

  const canonical = getTypicalProjectHref(project);
  const atmosphereGallery = project.visualGallery ?? project.gallery.slice(0, 3);
  const modelGallery = project.modelGallery ?? project.gallery.slice(0, 4);
  const areaSpecs = project.areaSpecs ?? project.specs;
  const roomRows = project.rooms ?? [];
  const technicalSpecs = project.technicalSpecs ?? project.specs;
  const adaptationOptions = project.adaptationOptions ?? project.formats;
  const adaptationDetails: Array<{ label: string; value?: string }> =
    project.adaptationDetails ?? adaptationOptions.map((option) => ({ label: option }));
  const deliverySpecs = project.deliverySpecs ?? [];
  const realizationGallery = project.realizationGallery ?? [];
  const realizationVideos = project.realizationVideos ?? [];
  const relatedProjects = generalTypicalProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Головна", path: "/" },
            { name: "Проєкти", path: "/proekty/" },
            { name: project.title, path: canonical },
          ]),
          buildProductSchema({
            name: project.title,
            description: project.description,
            path: canonical,
            image: {
              src: project.heroImage,
              alt: project.heroImageAlt,
            },
            category: project.productLabel,
            additionalProperties: project.specs.map((spec) => ({
              name: spec.label,
              value: spec.value,
            })),
          }),
        ]}
      />
      <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#1b1d1f]">
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
            <div className="absolute inset-0 bg-[#f4f0e8]/80" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,240,232,0.98)_0%,rgba(244,240,232,0.9)_45%,rgba(244,240,232,0.48)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,240,232,0.12),rgba(244,240,232,0.7)_72%,#f4f0e8_100%)]" />
          </div>

          <div className="relative z-20">
            <SiteHeader />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-8 lg:pb-24 lg:pt-16">
            <nav className={`${bodyClass} mb-6 flex min-w-0 flex-wrap items-center gap-2 text-sm text-[#70685f]`}>
              <Link href="/" className="transition hover:text-[#1b1d1f]">
                Головна
              </Link>
              <span>/</span>
              <Link href="/proekty/" className="transition hover:text-[#1b1d1f]">
                Проєкти
              </Link>
              <span>/</span>
              <span className="min-w-0 max-w-full break-words text-[#1b1d1f]">{project.title}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,0.9fr)] lg:items-start">
              <div className="max-w-5xl">
                <p className="mb-5 inline-flex max-w-full rounded-full border border-[#d8cdbc] bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d6d5e] shadow-[0_16px_30px_rgba(41,36,30,0.08)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                  {project.productLabel}
                </p>
                <h1 className={`${headingClass} max-w-5xl break-words text-[2rem] leading-[1.04] text-[#1b1d1f] min-[380px]:text-[2.2rem] sm:text-5xl lg:text-[4.2rem]`}>
                  {project.heroTitle ?? project.title}
                </h1>
                <p className={`${bodyClass} mt-7 max-w-4xl text-xl leading-9 text-[#5d554d] md:text-[1.35rem] md:leading-10`}>
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
                    href="/proekty/"
                    className="inline-flex items-center justify-center rounded-[10px] border border-[#cdbfad] bg-white/50 px-7 py-4 text-lg font-semibold text-[#1b1d1f] transition hover:border-[#a89078] hover:bg-white"
                  >
                    До каталогу
                  </Link>
                </div>
              </div>

              <div className="group relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-[#d8cdbc] bg-[#1b1d1f] shadow-[0_26px_70px_rgba(41,36,30,0.16)] transition duration-300 hover:-translate-y-2 hover:border-[#f2994a]/45 hover:shadow-[0_36px_90px_rgba(41,36,30,0.22)] lg:mt-[4.45rem] lg:aspect-[1.72/1] xl:aspect-[1.62/1]">
                <ZoomableImage
                  src={project.detailHeroImage ?? project.gallery[1]?.src ?? project.heroImage}
                  alt={project.detailHeroImageAlt ?? project.gallery[1]?.alt ?? project.heroImageAlt}
                  fill
                  priority
                  className="absolute inset-0"
                  imageClassName="scale-[1.03] object-cover transition duration-500 group-hover:scale-[1.075]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto flex w-full max-w-[88rem] flex-col gap-12 px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-8 lg:gap-16 lg:pb-20 lg:pt-10">
          <ProjectVisualSlider slides={atmosphereGallery} />

          <section className="rounded-[2rem] border border-[#d8cdbc] bg-[#fffaf2]/62 p-5 shadow-[0_24px_70px_rgba(41,36,30,0.08)] sm:p-7 lg:p-9">
            <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Специфікація
                </p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                  {project.plan.title}
                </h2>
              </div>
              <p className={`${bodyClass} max-w-3xl text-base leading-8 text-[#5d554d] lg:justify-self-end`}>
                {project.plan.description}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:items-start">
              <div>
                <div className="overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-3 shadow-[0_18px_48px_rgba(41,36,30,0.08)]">
                  {project.plan.imageSrc ? (
                    <ZoomableImage
                      src={project.plan.imageSrc}
                      alt={project.plan.title}
                      width={1300}
                      height={760}
                      className="mx-auto block w-full"
                      imageClassName="h-auto w-full object-contain"
                      sizes="(min-width: 1024px) 54vw, 100vw"
                    />
                  ) : null}
                </div>
                {project.plan.visualizations?.length ? (
                  <div className="mt-5 rounded-[1.5rem] border border-[#d8cdbc] bg-white/82 p-4 shadow-[0_18px_48px_rgba(41,36,30,0.08)]">
                    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8742b]">
                          3D-візуалізація планування
                        </p>
                      </div>
                    </div>
                    <div className="flex snap-x gap-4 overflow-x-auto pb-2">
                      {project.plan.visualizations.map((image) => (
                        <figure
                          key={image.src}
                          className="group relative h-44 min-w-[17rem] snap-start overflow-hidden rounded-[1.15rem] border border-[#e2d7c7] bg-[#f7f1e8] sm:h-52 sm:min-w-[22rem]"
                        >
                          <ZoomableImage
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="absolute inset-0"
                            imageClassName="object-cover transition duration-500 group-hover:scale-[1.03]"
                            sizes="(min-width: 1024px) 360px, 78vw"
                          />
                          <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/88 px-3 py-2 text-xs font-semibold text-[#2f2b27] shadow-[0_10px_28px_rgba(41,36,30,0.12)] backdrop-blur">
                            {image.label}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : null}
                {project.plan.additionalImages?.length ? (
                  <div className="mt-5 grid gap-5">
                    {project.plan.additionalImages.map((image) => (
                      <div
                        key={image.src}
                        className="overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-3 shadow-[0_18px_48px_rgba(41,36,30,0.08)]"
                      >
                        <ZoomableImage
                          src={image.src}
                          alt={image.alt}
                          width={1800}
                          height={760}
                          className="mx-auto block w-full"
                          imageClassName="h-auto w-full object-contain"
                          sizes="(min-width: 1024px) 54vw, 100vw"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-5 shadow-[0_16px_42px_rgba(41,36,30,0.07)] sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                    Показники
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

                {roomRows.length ? (
                  <div className="rounded-[1.5rem] border border-[#d8cdbc] bg-white/74 p-5 shadow-[0_16px_42px_rgba(41,36,30,0.07)] sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                      Планування
                    </p>
                    <div className="mt-5 divide-y divide-[#dfd4c5]">
                      {roomRows.map((room) => (
                        <div key={`${room.number}-${room.name}`} className="grid grid-cols-[3.2rem_minmax(0,1fr)_auto] gap-3 py-4">
                          <p className={`${bodyClass} text-sm font-semibold text-[#8a7c6d]`}>
                            {room.number}
                          </p>
                          <p className={`${headingClass} text-lg leading-tight text-[#1b1d1f]`}>
                            {room.name}
                          </p>
                          <p className={`${bodyClass} whitespace-nowrap text-base font-semibold text-[#1b1d1f]`}>
                            {room.area}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Технічний блок
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
                        <p className={`${bodyClass} mt-2 text-base font-semibold leading-8 text-[#1b1d1f]`}>
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
                    Модель і конструктив
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {modelGallery.slice(0, 8).map((image) => (
                      <div key={image.src} className="relative aspect-[16/10] overflow-hidden rounded-[1rem] border border-[#d8cdbc] bg-white shadow-[0_12px_28px_rgba(41,36,30,0.07)]">
                        <ZoomableImage
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="absolute inset-0"
                          imageClassName="object-cover"
                          sizes="(min-width: 1024px) 22vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {project.wallAssembly ? (
            <section className="rounded-[2rem] border border-[#d8cdbc] bg-white/66 p-5 shadow-[0_24px_70px_rgba(41,36,30,0.08)] sm:p-7 lg:p-9">
              <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                    Технологія
                  </p>
                  <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                    {project.wallAssembly.title}
                  </h2>
                </div>
                <p className={`${bodyClass} max-w-3xl text-base leading-8 text-[#5d554d] lg:justify-self-end`}>
                  {project.wallAssembly.description}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
                <div className="overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-4 shadow-[0_18px_48px_rgba(41,36,30,0.08)]">
                  <ZoomableImage
                    src={project.wallAssembly.imageSrc}
                    alt={project.wallAssembly.imageAlt}
                    width={620}
                    height={765}
                    className="mx-auto block w-full"
                    imageClassName="h-auto w-full object-contain"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {project.wallAssembly.layers.map((layer) => (
                    <div
                      key={layer.number}
                      className="grid grid-cols-[2.4rem_minmax(0,1fr)] gap-3 border-t border-[#dfd4c5] pt-3 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d83520] text-sm font-bold text-white">
                        {layer.number}
                      </span>
                      <p className={`${bodyClass} text-sm font-medium leading-6 text-[#4f473f]`}>
                        {layer.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <ProjectRealizationShowcase
            photos={realizationGallery}
            sequence={project.realizationSequence}
            videos={realizationVideos}
            title={project.realizationTitle}
            text={project.realizationText}
          />

          <section className="border-y border-[#d8cdbc] py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
                  Виробництво та поставка
                </p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-[#1b1d1f] sm:text-4xl`}>
                  Домокомплект для швидкої серійної реалізації
                </h2>
                <p className={`${bodyClass} mt-5 max-w-2xl text-xl leading-9 text-[#5d554d]`}>
                  Проєкт можна використовувати як базовий формат для громад,
                  відбудови, житла для ВПО, котеджних містечок або серійного
                  девелоперського продукту.
                </p>
              </div>
              <div className="pt-8 lg:pt-[1.9rem]">
                <div className="flex flex-wrap gap-2">
                  {project.scenarios.map((scenario) => (
                    <span key={scenario} className="rounded-full border border-[#d9c3a9] bg-white/60 px-3 py-1.5 text-sm font-medium text-[#5f5144]">
                      {scenario}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {adaptationDetails.map((item) => (
                      <div
                        key={`${item.label}-${item.value ?? ""}`}
                        className="border-t border-[#dfd4c5] pt-4"
                      >
                        <p className={`${bodyClass} text-base font-semibold leading-7 text-[#1b1d1f]`}>
                          {item.label}
                        </p>
                        {item.value ? (
                          <p className={`${bodyClass} mt-1 text-sm leading-6 text-[#6a5f55]`}>
                            {item.value}
                          </p>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {deliverySpecs.length ? (
              <div className="mt-9 grid gap-4 border-t border-[#d8cdbc] pt-6 sm:grid-cols-2 xl:grid-cols-4">
                {deliverySpecs.map((item) => (
                  <div
                    key={item.label}
                    className="border-l border-[#dfd4c5] pl-4 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-4 xl:first:border-l-0 xl:first:pl-0"
                  >
                    <p className={`${headingClass} text-3xl leading-none text-[#d87427] sm:text-[2.35rem]`}>
                      {item.value}
                    </p>
                    <p className={`${bodyClass} mt-3 text-sm font-semibold leading-6 text-[#6a5f55]`}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section id="cta">
            <div className="relative overflow-hidden rounded-[30px] border border-[#2c3031] bg-[#181b1d] p-8 shadow-[0_30px_80px_rgba(22,24,24,0.18)] md:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.7fr)] lg:items-center">
                <div className="max-w-[46rem]">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                    Розрахунок проєкту
                  </p>
                  <h2 className={`${headingClass} max-w-[40rem] text-3xl leading-tight text-white md:text-4xl`}>
                    Отримайте попередній прорахунок «{project.title}»
                  </h2>
                  <p className={`${bodyClass} mt-6 max-w-[42rem] text-lg leading-8 text-white/76`}>
                    Уточнимо комплектацію домокомплекту, покрівлю, логістику,
                    формат готовності, партію та монтаж під ваш об&apos;єкт.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/contacts/"
                      className="inline-flex w-full items-center justify-center rounded bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] transition hover:bg-[#de8232] sm:w-auto"
                    >
                      Почати прорахунок
                    </Link>
                    <Link
                      href="/proekty/"
                      className="inline-flex w-full items-center justify-center rounded border border-white/20 px-6 py-4 text-center text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
                    >
                      Дивитися інші проєкти
                    </Link>
                  </div>
                </div>

                <div className="relative rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F2994A]">
                    Що підготуємо
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      ["calculator", "Попередній бюджет", "Орієнтир по комплектації, партії та логістиці."],
                      ["settings", "Параметри готовності", "Склад домокомплекту й опції покрівлі та інженерії."],
                      ["delivery", "Монтаж і поставка", "Терміни, кількість авто та логіка монтажу на об'єкті."],
                    ].map(([icon, title, text]) => (
                      <div
                        key={title}
                        className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded border border-[#F2994A]/30 bg-[#F2994A]/12 text-[#F2994A]">
                          <LineIcon name={icon as IconName} className="h-5 w-5" />
                        </span>
                        <span>
                          <span className={`${headingClass} block text-lg leading-tight text-white`}>
                            {title}
                          </span>
                          <span className={`${bodyClass} mt-2 block text-sm leading-6 text-white/66`}>
                            {text}
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
                  Схожі проєкти
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.slug}
                    href={getTypicalProjectHref(item)}
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
    </>
  );
}
