import Image from "next/image";
import type { SiteImage } from "@/data/types";
import { ImageReveal } from "./Reveal";

export function IllustrativeBadge({ className }: { className?: string }) {
  return (
    <span
      title="Stock photograph used for illustration — not the researcher's own field material"
      className={`label-mono pointer-events-auto inline-flex items-center rounded-sm bg-charcoal/55 px-2 py-1 !text-[0.58rem] text-ivory/85 backdrop-blur-sm ${className ?? ""}`}
    >
      Illustrative
    </span>
  );
}

type FigureProps = {
  image: SiteImage;
  label?: string;
  caption?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  preload?: boolean;
};

/** Editorial figure: revealed image + "Fig./Plate" caption. */
export function Figure({ image, label, caption, className, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 50vw, 100vw", preload }: FigureProps) {
  return (
    <figure className={className}>
      <ImageReveal className={`${aspect} bg-sand`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </ImageReveal>
      {(label || caption || image.illustrative) && (
        <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-ink-muted">
          <span>
            {label && <span className="label-mono mr-2 text-earth">{label}</span>}
            {caption}
          </span>
          {image.illustrative && <span className="label-mono shrink-0 !text-[0.6rem] text-earth-soft">Illustrative</span>}
        </figcaption>
      )}
    </figure>
  );
}
