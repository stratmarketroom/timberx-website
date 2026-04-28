import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TypicalProjectCard } from "@/components/typical-projects";
import { modularTypicalProjects } from "@/lib/typical-projects";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

const categories = [
  "модульні будинки",
  "каркасні будинки",
  "фахверкові будинки",
  "готельні модулі",
  "сервісні модулі",
  "громадські об'єкти",
];

export const metadata: Metadata = {
  title: "Типові проєкти TimberX | Каталог будинків і модулів",
  description:
    "Загальний каталог типових проєктів TimberX: модульні будинки, майбутні каркасні та фахверкові рішення, готельні й сервісні формати для B2B та B2G задач.",
  alternates: {
    canonical: "/proekty/",
  },
};

export default function ProjectsCatalogPage() {
  return (
    <div className="min-h-screen bg-[#1b1d1f] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/modular-homes-community/modular-home-terrace.jpg"
            alt="Типові проєкти TimberX"
            fill
            priority
            className="object-cover object-[58%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1B1D1F]/56" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,21,0.94)_0%,rgba(18,19,21,0.82)_30%,rgba(18,19,21,0.4)_64%,rgba(18,19,21,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.08),rgba(17,18,20,0.22)_48%,rgba(17,18,20,0.72)_100%)]" />
        </div>

        <div className="relative z-20">
          <SiteHeader />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-8 lg:pb-24 lg:pt-16">
          <nav className={`${bodyClass} mb-6 flex flex-wrap items-center gap-2 text-sm text-white/58`}>
            <Link href="/" className="transition hover:text-white">
              Головна
            </Link>
            <span>/</span>
            <span className="text-white">Проєкти</span>
          </nav>

          <div className="max-w-5xl">
            <p className="mb-5 inline-flex max-w-full rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
              Каталог TimberX
            </p>
            <h1 className={`${headingClass} max-w-5xl text-[2.3rem] leading-[1.02] text-white sm:text-5xl lg:text-[4.2rem]`}>
              Типові проєкти будинків і модулів
            </h1>
            <p className={`${bodyClass} mt-6 max-w-4xl text-base leading-8 text-white/78 md:text-lg`}>
              Єдиний каталог базових форматів TimberX для девелоперів, громад,
              орендного бізнесу, котеджних містечок і сервісної інфраструктури.
              Зараз тут зібрані модульні проєкти, а далі каталог можна
              доповнювати каркасними та фахверковими рішеннями.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[88rem] px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#17191b]/92 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2994a]">
                Розділи каталогу
              </p>
              <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
                {categories.map((category, index) => (
                  <span
                    key={category}
                    className={`rounded-full border px-3 py-2 text-sm ${
                      index === 0
                        ? "border-[#f2994a]/36 bg-[#f2994a]/12 text-[#f4dfcf]"
                        : "border-white/10 bg-white/[0.04] text-white/62"
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-[#f2994a]/24 bg-[#f2994a]/8 p-4">
                <p className={`${bodyClass} text-sm leading-6 text-[#f4dfcf]`}>
                  Каталог зроблений як спільна точка входу для всіх типових
                  проєктів TimberX, незалежно від технології.
                </p>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2994a]">
                  Доступні зараз
                </p>
                <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                  Модульні будинки
                </h2>
              </div>
              <Link
                href="/modulni-budynky/"
                className="text-sm font-semibold text-white/72 transition hover:text-[#f2994a]"
              >
                Про модульні будинки →
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {modularTypicalProjects.map((project, index) => (
                <TypicalProjectCard key={project.slug} project={project} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="w-full bg-[#181b1d]">
        <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
