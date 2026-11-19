import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/types";
import { Reveal } from "./Reveal";
import { IllustrativeBadge } from "./Figure";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: SiteImage;
  children?: ReactNode;
};

/** Header for inner pages: dark photographic band with editorial title. */
export function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <Image
        src={image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover opacity-45"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/70 via-forest-deep/55 to-forest-deep" />
      <div className="container-page pt-40 pb-16 sm:pt-44 lg:pt-52 lg:pb-24">
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg">{intro}</p>}
          {children}
        </Reveal>
      </div>
      {image.illustrative && <IllustrativeBadge className="absolute right-4 bottom-4 sm:right-6" />}
    </section>
  );
}
