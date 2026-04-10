import Link from "next/link";

import { SiteFooter, SiteHeader } from "./site-chrome";
import type { SitePage } from "../lib/site-pages";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

const sectionLabels: Record<SitePage["section"], string> = {
  core: "Продуктова сторінка",
  segment: "Сегментна сторінка",
  cases: "Кейси",
  geo: "GEO-сторінка",
  faq: "FAQ",
  guide: "Контентний гайд",
  service: "Службова сторінка",
};

type SitePlaceholderPageProps = {
  page: SitePage;
  canonicalPath: string;
};

export function SitePlaceholderPage({
  page,
  canonicalPath,
}: SitePlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.16),transparent_32%),linear-gradient(180deg,#1b1d1f_0%,#151719_100%)] text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#b7b7b7]">
          <Link
            href="/"
            className={`${bodyClass} inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-[#f2994a]/60 hover:text-white`}
          >
            На головну
          </Link>
          <span className="rounded-full border border-[#f2994a]/30 bg-[#f2994a]/10 px-3 py-1.5 text-[#ffd7b4]">
            {sectionLabels[page.section]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            SEO кластер: {page.cluster}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
              TimberX Preview
            </p>
            <h1
              className={`${headingClass} max-w-4xl text-4xl leading-[1.02] text-white sm:text-5xl`}
            >
              {page.title}
            </h1>
            <p
              className={`${bodyClass} mt-5 max-w-3xl text-base leading-7 text-[#d0d0d0] sm:text-lg`}
            >
              {page.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#828282]">
                  Статус
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Сторінка-заглушка
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#828282]">
                  URL
                </p>
                <p className="mt-3 break-all text-sm text-[#f4f4f4]">
                  {canonicalPath}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#202326] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#828282]">
                  Наступний крок
                </p>
                <p className="mt-3 text-sm leading-6 text-[#d0d0d0]">
                  Заповнити контентом за SEO-кластером без зміни URL.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-[#202326]/90 p-7">
            <h2 className={`${headingClass} text-2xl text-white`}>
              Що тут буде далі
            </h2>
            <ul className={`${bodyClass} mt-5 space-y-3 text-sm leading-6 text-[#d0d0d0]`}>
              <li>H1, meta title і description для окремого SEO-кластера.</li>
              <li>Структура секцій згідно з канонічними документами про сайт.</li>
              <li>Внутрішня перелінковка у межах продукту, сегментів, кейсів і FAQ.</li>
              <li>Окремий CTA під B2B або B2G-сценарій кваліфікації ліда.</li>
            </ul>

            <div className="mt-7 rounded-[1.5rem] border border-dashed border-[#f2994a]/45 bg-[#f2994a]/8 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ffd7b4]">
                Канонічне правило
              </p>
              <p className={`${bodyClass} mt-3 text-sm leading-6 text-[#f4dfcf]`}>
                Ця сторінка існує лише тому, що вона є в погодженому sitemap.
                Нові маршрути поза ним не додаються.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <SiteFooter />
      </div>
    </div>
  );
}
