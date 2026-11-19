import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "split";
  action?: ReactNode;
  id?: string;
};

/**
 * Editorial section heading: "§ 03 — Eyebrow" label, serif title, optional intro.
 * `split` places the intro in a right column on large screens.
 */
export function SectionHeading({ index, eyebrow, title, intro, tone = "light", align = "left", action, id }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "split" ? "grid gap-6 lg:grid-cols-12 lg:items-end" : "max-w-3xl"}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <p className={`label-mono flex items-center gap-3 ${dark ? "text-gold-light" : "text-earth"}`}>
          {index && <span>§ {index}</span>}
          <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-gold/60" : "bg-earth/40"}`} />
          <span>{eyebrow}</span>
        </p>
        <h2 id={id} className={`mt-5 text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem] ${dark ? "text-ivory" : "text-forest"}`}>
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className={align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-6"}>
          {intro && <p className={`text-base leading-relaxed sm:text-[1.05rem] ${dark ? "text-ivory/75" : "text-ink-muted"}`}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </Reveal>
  );
}
