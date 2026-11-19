import type { Metadata } from "next";
import Image from "next/image";
import { Building2, GraduationCap, MapPin, Pickaxe, Droplets } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ExternalButton } from "@/components/shared/Buttons";
import { LinkedInIcon, OrcidIcon, ResearchGateIcon } from "@/components/shared/BrandIcons";
import { Maybe, PendingNote } from "@/components/shared/Pending";
import { StratColumn } from "@/components/timeline/StratColumn";
import { CollaborationCTA } from "@/components/shared/CollaborationCTA";
import { profile } from "@/data/profile";
import { education, experience } from "@/data/education";
import { skillGroups } from "@/data/skills";
import { collaborators } from "@/data/conferences";
import { images } from "@/data/images";
import { isPending } from "@/data/types";

export const metadata: Metadata = {
  title: "About",
  description: `Biography of ${profile.name}, ${profile.title} at ${profile.institution.name} (${profile.institution.city}): education, research journey, professional experience and expertise.`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About · ${profile.name}`, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Hasna <span className="text-gold-light italic">Er-Raqqady</span>
          </>
        }
        intro={`${profile.title} — ${profile.institution.department}, ${profile.institution.name}, ${profile.institution.city}.`}
        image={images.darkRock}
      />

      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* ── Portrait & identity card ── */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image src={profile.portrait.src} alt={profile.portrait.alt} fill preload sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <dl className="mt-6 divide-y divide-forest/10 border-y border-forest/15 text-sm">
                  {[
                    { icon: GraduationCap, k: "Position", v: profile.title },
                    { icon: Building2, k: "Affiliation", v: `${profile.institution.department}, ${profile.institution.name}` },
                    { icon: MapPin, k: "Location", v: profile.location },
                  ].map(({ icon: Icon, k, v }) => (
                    <div key={k} className="flex gap-3 py-3.5">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-earth" strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <dt className="label-mono !text-[0.6rem] text-earth">{k}</dt>
                        <dd className="mt-0.5 leading-snug text-charcoal">{v}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 grid gap-2">
                  <ExternalButton href={profile.links.researchgate} icon={<ResearchGateIcon className="h-4 w-4" />}>
                    ResearchGate
                  </ExternalButton>
                  <ExternalButton href={profile.links.linkedin} icon={<LinkedInIcon className="h-4 w-4" />}>
                    LinkedIn
                  </ExternalButton>
                  {!isPending(profile.links.orcid) ? (
                    <ExternalButton href={profile.links.orcid} icon={<OrcidIcon className="h-4 w-4" />}>
                      ORCID
                    </ExternalButton>
                  ) : (
                    <PendingNote note={profile.links.orcid.note} compact />
                  )}
                </div>
              </Reveal>
            </div>
          </aside>

          {/* ── Biography ── */}
          <div className="space-y-24 lg:col-span-8">
            <section aria-labelledby="intro-title">
              <SectionHeading index="01" eyebrow="Professional introduction" id="intro-title" title={<>Geology of the <em>Saghro</em> inliers</>} />
              <Reveal delay={0.1} className="prose-academic mt-8 max-w-3xl">
                <p className="font-serif !text-[1.5rem] leading-snug text-forest">{profile.bio.lead}</p>
                {profile.bio.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </Reveal>
            </section>

            <section aria-labelledby="edu-title">
              <SectionHeading index="02" eyebrow="Education" id="edu-title" title="Academic background" />
              <ol className="mt-10 grid gap-px bg-forest/15 sm:grid-cols-3">
                {education.map((e, i) => (
                  <Reveal as="li" key={e.id} delay={i * 0.06} className="flex h-full flex-col bg-ivory p-6 sm:first:pl-0">
                      <p className="label-mono !text-[0.62rem] text-earth">
                        <Maybe value={e.start} fallback="" /> {isPending(e.start) ? "" : "–"} {e.end === "Present" ? "Present" : <Maybe value={e.end} />}
                      </p>
                      <h3 className="mt-3 text-2xl leading-tight text-forest">{e.degree}</h3>
                      {e.originalDegree && <p className="mt-1 text-xs text-earth-soft italic">{e.originalDegree}</p>}
                      <p className="mt-3 text-sm leading-snug text-charcoal/85">{e.institution}</p>
                      <p className="mt-1 text-xs text-ink-muted">{e.location}</p>
                  </Reveal>
                ))}
              </ol>
            </section>

            <section aria-labelledby="journey-title">
              <SectionHeading
                index="03"
                eyebrow="Research journey"
                id="journey-title"
                title={<>A personal <em>stratigraphy</em></>}
                intro="From early training in the Tafilalet to doctoral research in the Saghro massif, each step is logged as a layer in the column below."
              />
              <div className="mt-10">
                <StratColumn />
              </div>
            </section>

            <section aria-labelledby="exp-title">
              <SectionHeading index="04" eyebrow="Professional experience" id="exp-title" title="In the mine & in the field" />
              <div className="mt-10 space-y-4">
                {experience.map((x, i) => {
                  const Icon = x.kind === "Water resources" ? Droplets : Pickaxe;
                  return (
                    <Reveal key={x.id} delay={i * 0.05}>
                      <article className="grid gap-4 border border-forest/12 bg-paper p-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6">
                        <span className="flex h-11 w-11 items-center justify-center bg-forest text-gold-light" aria-hidden="true">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <div>
                          <h3 className="text-2xl leading-tight text-forest">{x.organization}</h3>
                          <p className="mt-1 text-sm font-medium text-charcoal/85">{x.role}</p>
                          <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                            {x.highlights.map((h) => (
                              <li key={h} className="flex gap-2">
                                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="label-mono !text-[0.62rem] text-earth sm:text-right">
                          {x.start === x.end ? x.start : `${x.start} – ${x.end}`}
                          <br />
                          <span className="text-earth-soft">{x.kind}</span>
                        </p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="aff-title">
              <SectionHeading index="05" eyebrow="Academic affiliations" id="aff-title" title="Institutions & co-authors" />
              <Reveal delay={0.1} className="mt-10 grid gap-8 sm:grid-cols-2">
                <div className="border-t-2 border-forest pt-5">
                  <p className="label-mono !text-[0.62rem] text-earth">Home institution</p>
                  <p className="mt-2 font-serif text-2xl text-forest">{profile.institution.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {profile.institution.department} · {profile.institution.city}, {profile.institution.country}
                  </p>
                </div>
                <div className="border-t-2 border-sand pt-5">
                  <p className="label-mono !text-[0.62rem] text-earth">Co-authors (selection)</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {collaborators.map((c) => (
                      <li key={c.name}>
                        <span className="font-medium text-charcoal">{c.name}</span>
                        <span className="text-ink-muted"> — {c.affiliation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            <section aria-labelledby="skills-title">
              <SectionHeading index="06" eyebrow="Expertise" id="skills-title" title="Technical & scientific expertise" />
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {skillGroups.map((g, i) => (
                  <Reveal key={g.title} delay={i * 0.06}>
                    <h3 className="border-b border-forest/15 pb-3 text-xl text-forest">{g.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li key={s} className="bg-sand-soft px-2.5 py-1 text-xs font-medium text-earth">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
              <div className="mt-8">
                <PendingNote note="Laboratory and software skills (e.g. polarising microscopy, geochemical software, Oasis montaj, QGIS) and languages." />
              </div>
            </section>
          </div>
        </div>
      </section>

      <CollaborationCTA />
    </>
  );
}
