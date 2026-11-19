import type { Metadata } from "next";
import { CalendarDays, MapPin, Target } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Maybe, PendingNote } from "@/components/shared/Pending";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { CollaborationCTA } from "@/components/shared/CollaborationCTA";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { isPending } from "@/data/types";

export const metadata: Metadata = {
  title: "Fieldwork & Projects",
  description: `Fieldwork and projects of ${profile.name}: doctoral fieldwork in the South Saghro inlier, ground magnetic survey of the Saghro dyke swarm, and mining and hydrogeology internships in Morocco.`,
  alternates: { canonical: "/fieldwork" },
  openGraph: { title: `Fieldwork & Projects · ${profile.name}`, url: "/fieldwork" },
};

export default function FieldworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Fieldwork & projects"
        title={
          <>
            Field, mine &amp; <span className="text-gold-light italic">laboratory</span>
          </>
        }
        intro="Geological field observations, mapping, rock sampling, mineral investigations and applied projects across Morocco."
        image={images.tiltedStrata}
      />

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <Reveal className="mb-14 max-w-3xl">
            <PendingNote note="Original field and laboratory photographs. The galleries currently use labelled illustrative images — replace them in data/projects.ts with photos stored in /public/images/fieldwork." />
          </Reveal>

          {/* Index */}
          <nav aria-label="Projects" className="mb-16 hidden border-y border-forest/15 py-4 md:block">
            <ol className="flex flex-wrap gap-x-8 gap-y-2">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="text-sm text-ink-muted hover:text-forest">
                    <span className="label-mono mr-2 !text-[0.6rem] text-earth">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-24 lg:space-y-32">
            {projects.map((p, i) => (
              <article key={p.id} id={p.id} aria-labelledby={`${p.id}-title`} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <ProjectGallery images={p.gallery} title={p.title} />
                </Reveal>
                <Reveal delay={0.1} className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="label-mono flex items-center gap-3 text-earth">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-earth/40" />
                    <span>{p.category}</span>
                  </p>
                  <h2 id={`${p.id}-title`} className="mt-4 text-3xl leading-tight text-forest sm:text-[2.6rem]">
                    {p.title}
                  </h2>
                  <dl className="mt-6 grid gap-3 border-y border-forest/15 py-4 text-sm sm:grid-cols-2">
                    <div className="flex gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-earth" strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Location</dt>
                        <dd>{p.location}</dd>
                      </div>
                    </div>
                    <div className="flex gap-2.5">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-earth" strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Date</dt>
                        <dd>
                          <Maybe value={p.date} fallback="Dates to be confirmed" />
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h3 className="label-mono flex items-center gap-2 text-earth">
                        <Target className="h-3.5 w-3.5" aria-hidden="true" /> Research objective
                      </h3>
                      {isPending(p.objective) ? (
                        <div className="mt-2">
                          <PendingNote note={p.objective.note} />
                        </div>
                      ) : (
                        <p className="mt-2 leading-relaxed text-charcoal/85">{p.objective}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="label-mono text-earth">Scientific context</h3>
                      {isPending(p.context) ? (
                        <div className="mt-2">
                          <PendingNote note={p.context.note} />
                        </div>
                      ) : (
                        <p className="mt-2 leading-relaxed text-charcoal/85">{p.context}</p>
                      )}
                    </div>
                  </div>
                  <p className="label-mono mt-6 !text-[0.58rem] text-earth-soft">Source · {p.source}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CollaborationCTA />
    </>
  );
}
