import { buildTimeline, type Lithology } from "@/lib/timeline";
import { Reveal } from "@/components/shared/Reveal";

const svg = (body: string, w: number, h: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`)}")`;

/** Standard-ish lithological ornaments, tinted with the palette. */
const patterns: Record<Lithology, { bg: string; image: string; name: string; width: string }> = {
  volcanic: {
    name: "Doctorate",
    bg: "#243B35",
    image: svg("<path d='M4 4 L8 11 L12 4' fill='none' stroke='#B79A68' stroke-width='1.2'/>", 16, 14),
    width: "w-full",
  },
  sandstone: {
    name: "Master",
    bg: "#D9CCB7",
    image: svg("<circle cx='3' cy='3' r='1.1' fill='#685344'/><circle cx='9' cy='8' r='0.9' fill='#685344'/>", 12, 11),
    width: "w-[88%]",
  },
  limestone: {
    name: "Licence",
    bg: "#E8DFD0",
    image: svg("<path d='M0 0.5 H24 M0 10.5 H24 M0 0 V10 M12 10 V20' stroke='#685344' stroke-width='0.8' fill='none'/>", 24, 20),
    width: "w-[76%]",
  },
  shale: {
    name: "Internship",
    bg: "#F5F2EA",
    image: svg("<path d='M1 4 H9 M13 4 H19 M5 9 H15' stroke='#685344' stroke-width='0.8'/>", 20, 12),
    width: "w-[62%]",
  },
};

export function StratColumn() {
  const entries = buildTimeline();

  return (
    <div>
      <ol className="border-t border-forest/15">
        {entries.map((e, i) => {
          const p = patterns[e.lithology];
          return (
            <li key={e.id} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-forest/15 sm:grid-cols-[6rem_8.5rem_1fr] sm:gap-x-8 lg:grid-cols-[7.5rem_10rem_1fr]">
              {/* Column (lithology) */}
              <div className="row-span-2 flex items-stretch border-r border-forest/20 sm:row-span-1" aria-hidden="true">
                <div
                  className={`${p.width} min-h-full border-r border-forest/25`}
                  style={{ backgroundColor: p.bg, backgroundImage: p.image }}
                />
              </div>
              {/* Age */}
              <Reveal delay={i * 0.04} className="pt-5 sm:py-6">
                <p className="label-mono text-earth">{e.period}</p>
                <p className="label-mono mt-1 !text-[0.6rem] text-earth-soft">{e.kind}</p>
              </Reveal>
              {/* Description */}
              <Reveal delay={i * 0.04 + 0.05} className="pt-1.5 pb-6 sm:py-6">
                <h3 className="text-[1.45rem] leading-tight text-forest sm:text-2xl">{e.title}</h3>
                <p className="mt-1 text-sm font-medium text-charcoal/80">{e.place}</p>
                {e.detail && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{e.detail}</p>}
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="label-mono !text-[0.6rem] text-earth">Key</span>
        {(Object.keys(patterns) as Lithology[]).map((k) => (
          <span key={k} className="flex items-center gap-2 text-xs text-ink-muted">
            <span
              aria-hidden="true"
              className="h-4 w-6 border border-forest/30"
              style={{ backgroundColor: patterns[k].bg, backgroundImage: patterns[k].image }}
            />
            {patterns[k].name}
          </span>
        ))}
        <span className="text-xs text-earth-soft italic">Read as a stratigraphic log — youngest at the top.</span>
      </div>
    </div>
  );
}
