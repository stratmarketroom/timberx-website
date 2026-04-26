"use client";

import Image from "next/image";
import { useState } from "react";

export type RealizedProjectImage = {
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
};

export function RealizedProjectsCarousel({
  images,
}: {
  images: RealizedProjectImage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <div className="mt-10">
      <div className="group relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#202326] shadow-[0_22px_54px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[#F2994A]/34 hover:shadow-[0_34px_78px_rgba(0,0,0,0.34),0_0_34px_rgba(242,153,74,0.12)]">
        <Image
          key={activeImage.imageSrc}
          src={activeImage.imageSrc}
          alt={activeImage.imageAlt}
          fill
          className={`object-cover transition duration-500 group-hover:scale-[1.025] group-hover:brightness-110 ${activeImage.imageClassName ?? ""}`}
          sizes="(min-width: 1024px) 1120px, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,20,0.02),rgba(17,18,20,0.18))]" />

        <button
          type="button"
          aria-label="Попереднє фото"
          onClick={showPrevious}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-[#1B1D1F]/72 text-2xl leading-none text-white shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur transition hover:border-[#F2994A]/70 hover:bg-[#F2994A] hover:text-[#1B1D1F] sm:left-6 sm:h-12 sm:w-12"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Наступне фото"
          onClick={showNext}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-[#1B1D1F]/72 text-2xl leading-none text-white shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur transition hover:border-[#F2994A]/70 hover:bg-[#F2994A] hover:text-[#1B1D1F] sm:right-6 sm:h-12 sm:w-12"
        >
          ›
        </button>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-8 sm:gap-4">
        {images.map((image, index) => (
          <button
            key={image.imageSrc}
            type="button"
            aria-label={`Показати фото ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`group/thumb relative aspect-[4/3] overflow-hidden rounded-[0.9rem] border bg-[#202326] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.3),0_0_24px_rgba(242,153,74,0.1)] ${
              index === activeIndex
                ? "border-[#F2994A] shadow-[0_14px_30px_rgba(242,153,74,0.2)]"
                : "border-white/10 opacity-72 hover:border-[#F2994A]/34 hover:opacity-100"
            }`}
          >
            <Image
              src={image.imageSrc}
              alt=""
              fill
              className={`object-cover transition duration-300 group-hover/thumb:scale-[1.05] group-hover/thumb:brightness-110 ${image.imageClassName ?? ""}`}
              sizes="(min-width: 1024px) 130px, 25vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
