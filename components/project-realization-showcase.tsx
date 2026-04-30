"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RealizationPhoto = {
  src: string;
  alt: string;
  label: string;
};

type RealizationVideo = {
  src: string;
  title: string;
  poster?: string;
};

type RealizationSequence = {
  title: string;
  frameDurationMs: number;
  frames: Array<{
    src: string;
    alt: string;
    title: string;
  }>;
};

export function ProjectRealizationShowcase({
  photos,
  sequence,
  videos,
  title = "Від дизайн-проєкту до готового модуля",
  text = "Показуємо не лише концепт, а й реалізований модуль: фасад, інженерні рішення, номерні блоки, фактичний вигляд після виготовлення та процес доставки.",
}: {
  photos: RealizationPhoto[];
  sequence?: RealizationSequence;
  videos: RealizationVideo[];
  title?: string;
  text?: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<RealizationPhoto | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const activeVideo = videos[activeVideoIndex];
  const sequenceFrames = sequence?.frames ?? [];
  const activeFrame = sequenceFrames[activeFrameIndex];

  useEffect(() => {
    if (sequenceFrames.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveFrameIndex((index) => (index + 1) % sequenceFrames.length);
    }, sequence?.frameDurationMs ?? 1800);

    return () => window.clearInterval(interval);
  }, [sequence?.frameDurationMs, sequenceFrames.length]);

  if (!photos.length && !videos.length && !sequenceFrames.length) {
    return null;
  }

  function scrollSlider(direction: "prev" | "next") {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: direction === "next" ? slider.clientWidth * 0.86 : -slider.clientWidth * 0.86,
      behavior: "smooth",
    });
  }

  function playNextVideo() {
    if (videos.length < 2) {
      return;
    }

    setActiveVideoIndex((index) => (index + 1) % videos.length);
  }

  return (
    <>
      <section className="rounded-[2rem] border border-[#d8cdbc] bg-[#fffaf2]/70 p-5 shadow-[0_24px_70px_rgba(41,36,30,0.08)] sm:p-7 lg:p-9">
        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8742b]">
              Етапи збірки
            </p>
            <h2 className="mt-3 max-w-4xl font-['Montserrat',_Arial,_sans-serif] text-3xl font-bold leading-tight text-[#1b1d1f] sm:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-4xl font-['Inter',_Arial,_sans-serif] text-lg leading-8 text-[#5d554d] lg:mt-[2.35rem] lg:justify-self-end">
            {text}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.34fr)] lg:items-stretch">
          {activeFrame ? (
            <div className={`relative min-w-0 overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-3 shadow-[0_18px_48px_rgba(41,36,30,0.08)] ${activeVideo ? "" : "lg:col-span-2"}`}>
              <button
                type="button"
                className="relative block aspect-[16/9] w-full overflow-hidden rounded-[1.1rem] bg-[#f7f1e8] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2994a]"
                onClick={() =>
                  setActivePhoto({
                    src: activeFrame.src,
                    alt: activeFrame.alt,
                    label: activeFrame.title,
                  })
                }
                aria-label={`Збільшити зображення: ${activeFrame.alt}`}
              >
                {sequenceFrames.map((frame, index) => (
                  <Image
                    key={frame.src}
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    className={`object-contain transition-opacity duration-1000 ease-in-out ${
                      index === activeFrameIndex ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    priority={index < 2}
                  />
                ))}
                <div className="absolute left-2 top-2 z-10 rounded-xl border border-white/46 bg-white/88 px-2 py-1.5 shadow-[0_12px_28px_rgba(41,36,30,0.14)] backdrop-blur sm:left-4 sm:top-4 sm:rounded-2xl sm:px-3 sm:py-2">
                  <Image
                    src="/images/logo/timberx-factory-logo-cropped.png"
                    alt="TimberX Factory"
                    width={1026}
                    height={855}
                    className="h-10 w-12 object-contain sm:h-16 sm:w-20"
                    priority
                  />
                </div>
                <span className="absolute right-2 top-2 z-10 max-w-[10.5rem] rounded-full border border-white/42 bg-white/88 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#5f5144] shadow-[0_12px_28px_rgba(41,36,30,0.14)] backdrop-blur sm:right-4 sm:top-4 sm:max-w-none sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]">
                  {sequence?.title}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(27,29,31,0),rgba(27,29,31,0.46)_100%)] p-4">
                  <div className="flex justify-end">
                    <span className="rounded-full bg-[#1b1d1f]/78 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {activeFrameIndex + 1} / {sequenceFrames.length}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl font-['Montserrat',_Arial,_sans-serif] text-xl font-semibold leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.36)] sm:text-2xl">
                    {activeFrame.title}
                  </p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/32">
                    <div
                      className="h-full rounded-full bg-[#f2994a] transition-[width] duration-300"
                      style={{ width: `${((activeFrameIndex + 1) / sequenceFrames.length) * 100}%` }}
                    />
                  </div>
                </div>
              </button>
            </div>
          ) : photos.length ? (
            <div className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-[#d8cdbc] bg-white p-3 shadow-[0_18px_48px_rgba(41,36,30,0.08)]">
              <div ref={sliderRef} className="overflow-x-auto">
                <div className="flex snap-x snap-mandatory gap-4">
                  {photos.map((photo) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActivePhoto(photo)}
                      className="group relative aspect-[16/9] w-full min-w-full snap-center overflow-hidden rounded-[1.1rem] bg-[#1b1d1f] text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_58px_rgba(41,36,30,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2994a]"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-contain transition duration-500 group-hover:scale-[1.035]"
                        sizes="(min-width: 1024px) 62vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,29,31,0),rgba(27,29,31,0.28)_100%)]" />
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/42 bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f5144] shadow-[0_12px_28px_rgba(41,36,30,0.14)] backdrop-blur">
                        {photo.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => scrollSlider("prev")}
                    className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[#1b1d1f]/72 text-xl leading-none text-white shadow-[0_18px_40px_rgba(27,29,31,0.24)] backdrop-blur transition hover:-translate-x-1 hover:bg-[#1b1d1f]"
                    aria-label="Попереднє фото реалізації"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollSlider("next")}
                    className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[#1b1d1f]/72 text-xl leading-none text-white shadow-[0_18px_40px_rgba(27,29,31,0.24)] backdrop-blur transition hover:translate-x-1 hover:bg-[#1b1d1f]"
                    aria-label="Наступне фото реалізації"
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>
          ) : null}

          {activeVideo ? (
            <div className="mx-auto w-full max-w-[20rem] lg:max-w-none">
              <div className="rounded-[2rem] border border-[#d8cdbc] bg-[#1b1d1f] p-3 shadow-[0_22px_58px_rgba(41,36,30,0.14)]">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-black">
                  <video
                    key={activeVideo.src}
                    src={activeVideo.src}
                    poster={activeVideo.poster}
                    aria-label={activeVideo.title}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    loop={videos.length === 1}
                    onEnded={playNextVideo}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111315]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/18"
            onClick={() => setActivePhoto(null)}
            aria-label="Закрити фото"
          >
            ×
          </button>
          <div
            className="relative aspect-[16/9] w-full max-w-[82rem] overflow-hidden rounded-[1.5rem] bg-[#1b1d1f] shadow-[0_34px_90px_rgba(0,0,0,0.42)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
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
