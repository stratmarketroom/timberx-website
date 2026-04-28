"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ProjectVisualSlide = {
  src: string;
  alt: string;
  label: string;
};

export function ProjectVisualSlider({ slides }: { slides: ProjectVisualSlide[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState<ProjectVisualSlide | null>(null);

  function scrollSlider(direction: "prev" | "next") {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: direction === "next" ? slider.clientWidth * 0.82 : -slider.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="relative">
        <div ref={sliderRef} className="-mx-4 overflow-x-auto px-4 pb-8 pt-3 md:-mx-6 md:px-6">
          <div className="flex snap-x snap-mandatory gap-6">
            {slides.map((slide) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveSlide(slide)}
                className="group relative aspect-[16/8.8] w-[88vw] max-w-[70rem] shrink-0 snap-center overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white text-left shadow-[0_22px_58px_rgba(41,36,30,0.12)] transition duration-300 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_34px_82px_rgba(41,36,30,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2994a] md:w-[76vw] xl:w-[64rem]"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1280px) 64rem, (min-width: 768px) 76vw, 88vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,29,31,0),rgba(27,29,31,0.22)_100%)] opacity-80 transition group-hover:opacity-55" />
                <span className="absolute bottom-5 left-5 rounded-full border border-white/42 bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f5144] shadow-[0_12px_28px_rgba(41,36,30,0.14)] backdrop-blur">
                  {slide.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollSlider("prev")}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[#1b1d1f]/72 text-2xl leading-none text-white shadow-[0_18px_40px_rgba(27,29,31,0.24)] backdrop-blur transition hover:-translate-x-1 hover:bg-[#1b1d1f]"
          aria-label="Попереднє фото"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollSlider("next")}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[#1b1d1f]/72 text-2xl leading-none text-white shadow-[0_18px_40px_rgba(27,29,31,0.24)] backdrop-blur transition hover:translate-x-1 hover:bg-[#1b1d1f]"
          aria-label="Наступне фото"
        >
          →
        </button>
      </section>

      {activeSlide ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111315]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSlide(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/18"
            onClick={() => setActiveSlide(null)}
            aria-label="Закрити фото"
          >
            ×
          </button>
          <div
            className="relative aspect-[16/9] w-full max-w-[82rem] overflow-hidden rounded-[1.5rem] bg-[#1b1d1f] shadow-[0_34px_90px_rgba(0,0,0,0.42)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
