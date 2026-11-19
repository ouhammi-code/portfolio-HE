import Image from "next/image";
import { researchInterests } from "@/data/research";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Bento grid: the first card spans two columns on large screens,
 * so 7 interests fill a clean 4 × 2 grid.
 */
export function InterestCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {researchInterests.map((r, i) => (
        <li key={r.id} className={i === 0 ? "sm:col-span-2" : ""}>
          <Reveal delay={(i % 4) * 0.06} className="h-full">
            <article className="group relative isolate flex h-full min-h-[300px] flex-col justify-end overflow-hidden bg-forest-deep text-ivory lg:min-h-[340px]">
              <Image
                src={r.image.src}
                alt=""
                fill
                sizes={i === 0 ? "(min-width:1024px) 50vw, (min-width:640px) 100vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                className="-z-20 object-cover opacity-70 transition-transform duration-[1.4s] ease-strata group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/5" />
              <div className="p-6 lg:p-7">
                <p className="label-mono !text-[0.62rem] text-gold-light">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-3 leading-tight ${i === 0 ? "text-3xl lg:text-[2.4rem]" : "text-[1.65rem]"}`}>{r.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/75 transition-colors duration-500 group-hover:text-ivory/95">{r.summary}</p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
