"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  className,
  imageClassName,
  fill,
  width,
  height,
  sizes,
  priority,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
        aria-label={`Збільшити зображення: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111315]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/18"
            onClick={() => setIsOpen(false)}
            aria-label="Закрити зображення"
          >
            ×
          </button>
          <div
            className="relative h-[86vh] w-full max-w-[92rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
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
