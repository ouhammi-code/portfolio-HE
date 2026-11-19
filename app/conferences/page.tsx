import type { Metadata } from "next";
import { ArrowUpRight, Mic, Users, Award, CalendarRange } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Maybe, PendingNote } from "@/components/shared/Pending";
import { activities, collaborators, pendingActivities } from "@/data/conferences";
import { publications } from "@/data/publications";
import { AuthorList } from "@/components/publications/PublicationCard";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conferences & Academic Activities",
  description: `Conferences, scientific communications, collaborations and academic activities of ${profile.name}.`,
  alternates: { canonical: "/conferences" },
  openGraph: { title: `Conferences · ${profile.name}`, url: "/conferences" },
};

export default function ConferencesPage() {
  const sorted = [...activities].sort((a, b) => b.year - a.year);
  const years = Array.from(new Set(sorted.map((a) => a.year)));

  return (
    <>
      <PageHero
        eyebrow="Conferences & academic activities"
        title={
          <>
            Communicating <span className="text-gold-light italic">research</span>
          </>
        }
        intro="Scientific conferences, presentations, collaborations and academic life."
        image={images.erodedStrata}
      />

      {/* ── Chronological timeline ── */}
      <section aria-labelledby="timeline-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading index="01" eyebrow="Timeline" id="timeline-title" title="Conferences & presentations" />
          <div className="mt-14">
            {years.map((year) => (
              <div key={year} className="grid gap-6 border-t border-forest/15 py-10 md:grid-cols-[10rem_1fr] md:gap-12">
                <p className="font-serif text-6xl leading-none text-earth-soft md:sticky md:top-28 md:self-start">{year}</p>
                <ol className="space-y-6">
                  {sorted
                    .filter((a) => a.year === year)
                    .map((a, i) => {
                      const pub = publications.find((p) => p.id === a.publicationId);
                      return (
                        <Reveal as="li" key={a.id} delay={i * 0.06}>
                          <article className="group relative border border-forest/12 bg-paper p-6 transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(36,59,53,0.35)] sm:p-8">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                              <span className="label-mono inline-flex items-center gap-1.5 bg-forest px-2 py-1 !text-[0.6rem] text-gold-light">
                                <Mic className="h-3 w-3" aria-hidden="true" /> {a.type}
                              </span>
                              <span className="label-mono !text-[0.62rem] text-earth">
                                {a.event} · {a.location} · {a.date}
                              </span>
                            </div>
                            <h3 className="mt-4 text-2xl leading-snug text-forest sm:text-[1.7rem]">{a.title}</h3>
                            {pub && (
                              <div className="mt-3">
                                <AuthorList pub={pub} />
                              </div>
                            )}
                            <p className="mt-4 text-sm">
                              <span className="label-mono mr-2 !text-[0.6rem] text-earth">Format</span>
                              <Maybe value={a.contribution} />
                            </p>
                            {pub && (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest hover:text-earth"
                              >
                                View the communication <ArrowUpRight className="h-4 w-4" />
                                <span className="sr-only">(opens in a new tab)</span>
                              </a>
                            )}
                          </article>
                        </Reveal>
                      );
                    })}
                </ol>
              </div>
            ))}
            <div className="border-t border-forest/15 pt-8">
              <PendingNote note="Other conferences, poster presentations or invited talks (title, event, place, date, format)." />
            </div>
          </div>
        </div>
      </section>

      {/* ── Collaborations ── */}
      <section aria-labelledby="collab-title" className="bg-forest py-20 text-ivory lg:py-28">
        <div className="container-page">
          <SectionHeading
            index="02"
            eyebrow="Research collaborations"
            tone="dark"
            id="collab-title"
            align="split"
            title={<>A network across <em>Moroccan</em> universities</>}
            intro="Co-authors on the Saghro dyke-swarm publications, with affiliations as listed on ResearchGate."
          />
          <ul className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {collaborators.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 0.05} className="bg-forest p-6">
                <Users className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-4 font-serif text-2xl text-ivory">{c.name}</p>
                <p className="mt-1 text-sm text-ivory/65">{c.affiliation}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Other activities (placeholders only for now) ── */}
      {siteConfig.showPlaceholders && (
      <section aria-labelledby="other-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading index="03" eyebrow="Academic life" id="other-title" title="Workshops, events & memberships" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: CalendarRange, title: "Workshops & training", p: pendingActivities.workshops },
              { icon: Mic, title: "Academic events", p: pendingActivities.events },
              { icon: Award, title: "Scientific memberships", p: pendingActivities.memberships },
            ].map(({ icon: Icon, title, p }, i) => (
              <Reveal key={title} delay={i * 0.06} className="border-t-2 border-forest pt-6">
                <Icon className="h-5 w-5 text-earth" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-2xl text-forest">{title}</h3>
                <div className="mt-4">
                  <PendingNote note={p.note} compact />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
