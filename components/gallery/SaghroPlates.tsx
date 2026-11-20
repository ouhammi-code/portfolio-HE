import { images } from "@/data/images";
import type { SiteImage } from "@/data/types";
import { Figure } from "@/components/shared/Figure";
import { Reveal } from "@/components/shared/Reveal";

type Plate = { image: SiteImage; caption: string; layout: string; aspect: string; sizes: string };

/** Original field photographs from the Saghro massif, laid out as editorial plates. */
const plates: Plate[] = [
  {
    image: images.saghroPanorama,
    caption: "Saghro landscape: rocky ridges above the plain, Anti-Atlas ranges on the horizon.",
    layout: "sm:col-span-2 lg:col-span-8",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-[32rem]",
    sizes: "(min-width:1024px) 66vw, 100vw",
  },
  {
    image: images.saghroFoldedBeds,
    caption: "Steeply dipping, folded beds.",
    layout: "lg:col-span-4",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-[32rem]",
    sizes: "(min-width:1024px) 33vw, 100vw",
  },
  {
    image: images.saghroBeddedSequence,
    caption: "Well-bedded, fractured sequence — hammer for scale.",
    layout: "lg:col-span-4",
    aspect: "aspect-[4/3]",
    sizes: "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
  },
  {
    image: images.saghroFoliatedOutcrop,
    caption: "Outcrop close-up with pale lenticular layers — pen for scale.",
    layout: "lg:col-span-4",
    aspect: "aspect-[4/3]",
    sizes: "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
  },
  {
    image: images.saghroPeaks,
    caption: "Peaks of the Saghro massif in winter.",
    layout: "lg:col-span-4",
    aspect: "aspect-[4/3]",
    sizes: "(min-width:1024px) 33vw, 100vw",
  },
];

export function SaghroPlates({ startIndex = 1 }: { startIndex?: number }) {
  return (
    <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
      {plates.map((p, i) => (
        <Reveal as="li" key={p.image.src} delay={(i % 3) * 0.06} className={p.layout}>
          <Figure
            image={p.image}
            label={`Plate ${toRoman(startIndex + i)}`}
            caption={p.caption + (p.image.credit ? ` ${p.image.credit}.` : "")}
            aspect={p.aspect}
            sizes={p.sizes}
          />
        </Reveal>
      ))}
    </ul>
  );
}

function toRoman(n: number) {
  const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}
