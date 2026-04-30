import Image from "next/image";
import Link from "next/link";

import { LineIcon } from "@/components/home-visuals";
import type { IconName } from "@/components/home-visuals";
import { getTypicalProjectHref, type TypicalProject } from "@/lib/typical-projects";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

const categoryLabels: Record<TypicalProject["category"], string> = {
  modular: "Модульні будинки",
  frame: "Каркасні будинки",
  fachwerk: "Фахверкові будинки",
};

const scenarioIcons: IconName[] = ["projects", "community", "factory", "delivery"];

export function TypicalProjectCard({
  project,
  priority = false,
}: {
  project: TypicalProject;
  priority?: boolean;
}) {
  const href = getTypicalProjectHref(project);

  return (
    <article className="group relative min-h-[30rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#202326] shadow-[0_22px_56px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/45 hover:shadow-[0_30px_78px_rgba(0,0,0,0.34)]">
      <Link href={href} className="block h-full">
        <div className="relative h-64 overflow-hidden bg-[#151719]">
          <Image
            src={project.heroImage}
            alt={project.heroImageAlt}
            fill
            priority={priority}
            className="object-cover transition duration-300 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 31vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.05),rgba(17,18,20,0.74)_100%)]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-[#1b1d1f]/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f4dfcf] backdrop-blur">
            {categoryLabels[project.category]}
          </div>
          <div className="absolute bottom-4 left-4 rounded-[14px] border border-[#f2994a]/36 bg-[#1b1d1f]/82 px-4 py-3 backdrop-blur">
            <p className={`${headingClass} text-3xl leading-none text-[#f2994a]`}>
              {project.shortTitle}
            </p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2994a]">
            {project.productLabel}
          </p>
          <h3 className={`${headingClass} mt-3 text-[1.8rem] leading-tight text-white`}>
            {project.title}
          </h3>
          <p className={`${bodyClass} mt-4 text-base leading-7 text-[#d0d0d0]`}>
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.scenarios.slice(0, 4).map((scenario) => (
              <span
                key={scenario}
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/78"
              >
                {scenario}
              </span>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {project.specs.slice(0, 4).map((spec) => (
              <div key={spec.label} className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#828282]">
                  {spec.label}
                </p>
                <p className={`${bodyClass} mt-2 text-sm font-semibold leading-5 text-white`}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#f2994a]">
            <span>Дивитись план і візуалізації</span>
            <span className="transition group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function TypicalProjectShowcaseTile({
  project,
  priority = false,
}: {
  project: TypicalProject;
  priority?: boolean;
}) {
  const href = getTypicalProjectHref(project);

  return (
    <Link
      href={href}
      className="group relative min-h-[25rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#202326] shadow-[0_20px_54px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-1 hover:border-[#f2994a]/45 hover:shadow-[0_28px_74px_rgba(0,0,0,0.34)]"
    >
      <Image
        src={project.heroImage}
        alt={project.heroImageAlt}
        fill
        priority={priority}
        className="object-cover transition duration-300 group-hover:scale-[1.04]"
        sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,20,0.74)_0%,rgba(17,18,20,0.36)_62%,rgba(17,18,20,0.2)_100%)]" />

      <div className="relative flex h-full min-h-[25rem] flex-col justify-end p-5 sm:p-6">
        <div className="max-w-[32rem]">
          <h3 className={`${headingClass} text-[1.75rem] leading-tight text-white sm:text-[2rem]`}>
            {project.title}
          </h3>
          <div className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#f2994a]">
            <span>Дивитись проєкт</span>
            <span className="transition group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TypicalProjectsShowcase({
  projects,
  className = "",
}: {
  projects: TypicalProject[];
  className?: string;
}) {
  return (
    <section
      id="typical-projects"
      className={`relative overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:p-10 ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
            Типові проєкти
          </p>
          <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
            Готові формати, які можна адаптувати під задачу
          </h2>
        </div>
        <div className="space-y-5 lg:justify-self-end">
          <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0]`}>
            Оберіть базовий формат за площею або сценарієм: база відпочинку, дача,
            ВПО, громада, амбулаторія, котеджне містечко чи сервісний модуль.
          </p>
          <Link
            href="/modulni-budynky/proekty/"
            className="inline-flex items-center rounded-[12px] border border-[#f2994a]/42 px-5 py-3 text-sm font-semibold text-[#f2994a] transition hover:border-[#f2994a] hover:bg-[#f2994a] hover:text-[#1b1d1f]"
          >
            Відкрити каталог проєктів
          </Link>
        </div>
      </div>

      <div className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <TypicalProjectShowcaseTile
            key={project.slug}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export function ProjectPlanPreview({
  project,
  theme = "dark",
}: {
  project: TypicalProject;
  theme?: "dark" | "light";
}) {
  const isLight = theme === "light";

  if (project.plan.imageSrc) {
    return (
      <Image
        src={project.plan.imageSrc}
        alt={project.plan.title}
        width={1200}
        height={840}
        className="h-full w-full rounded-[1.5rem] object-cover"
      />
    );
  }

  return (
    <div
      className={`relative min-h-[24rem] overflow-hidden rounded-[1.5rem] border p-5 ${
        isLight
          ? "border-[#d9d0c3] bg-[#fffaf2] shadow-[0_22px_60px_rgba(41,36,30,0.08)]"
          : "border-white/10 bg-[#202326]"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.16),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.13),transparent_34%)]"
        }`}
      />
      <div className="relative grid h-full min-h-[21.5rem] grid-cols-[1.2fr_0.8fr] grid-rows-[1fr_0.72fr] gap-3">
        {project.plan.zones.slice(0, 4).map((zone, index) => (
          <div
            key={zone}
            className={`relative overflow-hidden rounded-[1rem] border p-4 ${
              isLight
                ? "border-[#e3d7c7] bg-white/70"
                : "border-[#f2994a]/20 bg-white/[0.045]"
            } ${index === 0 ? "row-span-2" : ""}`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.5),rgba(242,153,74,0))]" />
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-[#f2994a]/38 bg-[#f2994a]/12 text-[#f2994a]">
                <LineIcon name={scenarioIcons[index] ?? "blueprint"} className="h-6 w-6" />
              </span>
              <p className={`${bodyClass} text-sm font-semibold leading-5 ${isLight ? "text-[#1b1d1f]" : "text-white"}`}>
                {zone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
