"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { SiteImage } from "@/data/types";

/** Responsive image grid with a keyboard-accessible lightbox. */
export function ProjectGallery({ images, title }: { images: SiteImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const [first, ...rest] = images;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {[first, ...rest].map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setIndex(i);
            }}
            className={`group relative overflow-hidden bg-sand ${
              // Lead image spans the full row; an odd trailing image does too, so the grid never has a gap.
              i === 0 || (rest.length % 2 === 1 && i === images.length - 1) ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
            }`}
            aria-label={`Enlarge image ${i + 1} of ${images.length}: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
              className="object-cover transition-transform duration-[1.2s] ease-strata group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/25" aria-hidden="true" />
            <Maximize2
              className="absolute right-3 bottom-3 h-4 w-4 text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            {img.illustrative && (
              <span className="label-mono absolute top-2 left-2 bg-charcoal/55 px-1.5 py-0.5 !text-[0.52rem] text-ivory/85 backdrop-blur-sm">
                Illustrative
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — image ${index + 1} of ${images.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-forest-deep/96 text-ivory backdrop-blur-sm"
            onClick={close}
          >
            <div className="container-page flex h-16 items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <p className="label-mono !text-[0.62rem] text-ivory/70">
                {index + 1} / {images.length}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="flex h-11 w-11 items-center justify-center hover:text-gold-light" aria-label="Close gallery">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-4 sm:inset-x-20"
                >
                  <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-forest-deep/60 hover:text-gold-light sm:left-4"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-forest-deep/60 hover:text-gold-light sm:right-4"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>
            <div className="container-page py-5 text-sm text-ivory/75" onClick={(e) => e.stopPropagation()}>
              <p>{images[index].alt}</p>
              {images[index].illustrative && (
                <p className="mt-1 text-xs text-ivory/50">Illustrative stock photograph{images[index].credit ? ` — ${images[index].credit}` : ""}. Not original field material.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
