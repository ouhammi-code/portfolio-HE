import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/shared/Reveal";

const layout = [
  "lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  "lg:col-span-5 aspect-[16/10]",
  "lg:col-span-5 aspect-[16/10]",
  "lg:col-span-6 aspect-[16/10]",
  "lg:col-span-6 aspect-[16/10]",
];

/** Home-page preview of fieldwork & projects. */
export function FieldMosaic() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {projects.slice(0, 5).map((p, i) => (
        <li key={p.id} className={`${layout[i]} ${i === 0 ? "sm:col-span-2" : ""}`}>
          <Reveal delay={(i % 3) * 0.06} className="h-full">
            <Link
              href={`/fieldwork#${p.id}`}
              className="group relative isolate flex h-full min-h-[240px] flex-col justify-end overflow-hidden bg-forest-deep text-ivory"
            >
              <Image
                src={p.gallery[0].src}
                alt={p.gallery[0].alt}
                fill
                sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 42vw, (min-width:640px) 50vw, 100vw"}
                className="-z-20 object-cover transition-transform duration-[1.4s] ease-strata group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/95 via-forest-deep/25 to-transparent" />
              {p.gallery[0].illustrative && (
                <span className="label-mono absolute top-3 right-3 bg-charcoal/50 px-2 py-1 !text-[0.56rem] text-ivory/80 backdrop-blur-sm">Illustrative</span>
              )}
              <div className="p-5 lg:p-6">
                <p className="label-mono !text-[0.6rem] text-gold-light">{p.category}</p>
                <h3 className={`mt-2 leading-tight ${i === 0 ? "text-2xl lg:text-[2.1rem]" : "text-xl lg:text-2xl"}`}>{p.title}</h3>
                <p className="mt-1.5 text-xs text-ivory/70">{p.location}</p>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
