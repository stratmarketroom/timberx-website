"use client";

import { useState } from "react";
import Image from "next/image";

type CaseItem = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  gallery: ReadonlyArray<{ src: string; alt: string }>;
  challenge: string;
  solution: string;
  results: ReadonlyArray<string>;
};
type GalleryPhoto = { src: string; alt: string };

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";
const INITIAL_VISIBLE_CASES = 2;
const SHOW_MORE_STEP = 2;

export function CasesListSection({ cases }: { cases: ReadonlyArray<CaseItem> }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_CASES);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const visibleCases = cases.slice(0, visibleCount);
  const hasMore = visibleCount < cases.length;
  const canCollapse = cases.length > INITIAL_VISIBLE_CASES && !hasMore;

  return (
    <section className="mt-10 space-y-6 lg:mt-12 lg:space-y-8">
      {visibleCases.map((item) => (
        <article
          key={item.title}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(37,40,43,0.98))] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] lg:p-7"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.55),rgba(242,153,74,0))]" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
            <div className="min-w-0 space-y-3">
              <button
                type="button"
                onClick={() => setActivePhoto({ src: item.imageSrc, alt: item.imageAlt })}
                className="group relative block min-h-[16.5rem] w-full overflow-hidden rounded border border-white/10 bg-[#202326] text-left transition hover:border-[#F2994A]/36"
                aria-label="Відкрити головне фото кейсу"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.06),rgba(17,18,20,0.55)_100%)]" />
              </button>

              <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max snap-x gap-3">
                  {item.gallery.map((photo, photoIndex) => (
                    <button
                      type="button"
                      onClick={() => setActivePhoto({ src: photo.src, alt: photo.alt })}
                      key={`${photo.src}-${photoIndex}`}
                      className="group relative h-24 w-36 shrink-0 snap-start overflow-hidden rounded border border-white/10 bg-[#202326] transition hover:border-[#F2994A]/44 sm:h-28 sm:w-40"
                      aria-label={`Відкрити фото ${photoIndex + 1}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.08]"
                        sizes="160px"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.02),rgba(17,18,20,0.38)_100%)]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <h2 className={`${headingClass} break-words text-[1.9rem] leading-[1.06] text-white`}>{item.title}</h2>
              <div className={`${bodyClass} mt-5 space-y-4 break-words text-base leading-7 text-[#d0d0d0]`}>
                <p>
                  <span className="font-semibold text-white">Задача:</span> {item.challenge}
                </p>
                <p>
                  <span className="font-semibold text-white">Рішення:</span> {item.solution}
                </p>
                <div>
                  <p className="font-semibold text-white">Результат:</p>
                  <ul className="mt-2 space-y-2">
                    {item.results.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f2994a]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      {hasMore ? (
        <div className="mt-6 flex items-center gap-4 py-7">
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.28),rgba(242,153,74,0.6))]" />
          <button
            type="button"
            onClick={() => setVisibleCount((value) => Math.min(value + SHOW_MORE_STEP, cases.length))}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f4dfcf] transition hover:text-[#F2994A]"
          >
            <span>Більше кейсів</span>
            <span aria-hidden="true">↓</span>
          </button>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(242,153,74,0.6),rgba(242,153,74,0.28),rgba(242,153,74,0))]" />
        </div>
      ) : null}

      {canCollapse ? (
        <div className="mt-6 flex items-center gap-4 py-7">
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.2),rgba(255,255,255,0.35))]" />
          <button
            type="button"
            onClick={() => setVisibleCount(INITIAL_VISIBLE_CASES)}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/82 transition hover:text-white"
          >
            <span>Згорнути кейси</span>
            <span aria-hidden="true">↑</span>
          </button>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.35),rgba(242,153,74,0.2),rgba(242,153,74,0))]" />
        </div>
      ) : null}

      {activePhoto ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/78 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд фото кейсу"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[1.1rem] border border-white/16 bg-[#1B1D1F]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#1B1D1F]/84 text-white/90 transition hover:border-[#F2994A]/52 hover:text-[#F2994A]"
              aria-label="Закрити перегляд фото"
            >
              ✕
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
