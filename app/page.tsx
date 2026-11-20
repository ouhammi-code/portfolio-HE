import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/hero/HomeHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Figure } from "@/components/shared/Figure";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/shared/Buttons";
import { ContourLines } from "@/components/shared/ContourLines";
import { CollaborationCTA } from "@/components/shared/CollaborationCTA";
import { InterestCards } from "@/components/research/InterestCards";
import { CrossSection } from "@/components/research/CrossSection";
import { PublicationCard } from "@/components/publications/PublicationCard";
import { FieldMosaic } from "@/components/gallery/FieldMosaic";
import { SaghroPlates } from "@/components/gallery/SaghroPlates";
import { StratColumn } from "@/components/timeline/StratColumn";
import { JsonLd } from "@/components/shared/JsonLd";
import { profile } from "@/data/profile";
import { doctoralResearch, relatedResearch } from "@/data/research";
import { sortedPublications } from "@/data/publications";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HomeHero />

      {/* ── About preview ───────────────────────────── */}
      <section id="about" aria-labelledby="about-title" className="grain relative scroll-mt-20 overflow-hidden py-24 lg:py-36">
        <ContourLines className="pointer-events-none absolute -top-24 -left-48 h-[520px] w-[520px] text-earth/10" />
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Figure
              image={profile.portrait}
              label="Fig. 1"
              caption="Hasna Er-Raqqady in the laboratory."
              aspect="aspect-[3/4]"
              sizes="(min-width:1024px) 40vw, 100vw"
            />
          </div>
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow="The researcher" id="about-title" title={<>A geoscientist reading the <em>Ediacaran</em> record of the Anti-Atlas</>} />
            <Reveal delay={0.1} className="prose-academic mt-8 max-w-2xl">
              <p className="font-serif !text-[1.45rem] leading-snug text-forest">{profile.bio.lead}</p>
              <p>{profile.bio.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 grid max-w-2xl gap-px bg-forest/15 sm:grid-cols-3">
              {[
                { k: "Institution", v: `${profile.institution.name}, ${profile.institution.city}` },
                { k: "Department", v: profile.institution.department },
                { k: "Region of study", v: "Saghro massif, Eastern Anti-Atlas" },
              ].map((f) => (
                <div key={f.k} className="bg-ivory py-4 pr-4 sm:px-4 sm:first:pl-0">
                  <p className="label-mono !text-[0.6rem] text-earth">{f.k}</p>
                  <p className="mt-1.5 text-sm leading-snug font-medium text-charcoal">{f.v}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="/about" variant="outline">
                Full biography
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Research interests ──────────────────────── */}
      <section aria-labelledby="interests-title" className="bg-paper py-24 lg:py-32">
        <div className="container-page">
          <SectionHeading
            index="02"
            eyebrow="Research interests"
            id="interests-title"
            align="split"
            title={<>From outcrop to <em>mineral grain</em></>}
            intro="Her interests span the full chain of geological inquiry — from regional mapping and structural analysis to petrography, mineral chemistry and the geophysical imaging of buried structures."
          />
          <div className="mt-14 lg:mt-20">
            <InterestCards />
          </div>
          <p className="mt-5 text-xs text-earth-soft">Card imagery is illustrative.</p>
        </div>
      </section>

      {/* ── Featured doctoral research ──────────────── */}
      <section aria-labelledby="featured-title" className="relative overflow-hidden bg-forest text-ivory">
        <div className="container-page py-24 lg:py-32">
          <SectionHeading index="03" eyebrow="Doctoral research" tone="dark" id="featured-title" title={<>Reconstructing the <em>North Gondwana</em> margin</>} />
          <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="label-mono text-gold-light">Thesis</p>
              <blockquote className="mt-4 border-l border-gold/50 pl-6 font-serif text-[1.55rem] leading-snug text-ivory italic sm:text-[1.8rem]">
                {doctoralResearch.title}
              </blockquote>
              <ul className="mt-8 flex flex-wrap gap-2">
                {doctoralResearch.keywords.map((k) => (
                  <li key={k} className="border border-ivory/20 px-2.5 py-1 text-[0.7rem] tracking-wide text-ivory/80">
                    {k}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ButtonLink href="/research" variant="ghost-light">
                  Explore the research
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-7">
              <div className="border border-ivory/10 bg-forest-deep/50 p-4 sm:p-6">
                <CrossSection />
              </div>
              <p className="mt-3 text-sm text-ivory/60">
                <span className="label-mono mr-2 text-gold-light">Fig. 2</span>
                Simplified relationships in the Saghro massif: basement, cover and the Late Ediacaran dyke swarm.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-20 border-t border-ivory/15 pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-2xl text-ivory sm:text-3xl">{relatedResearch.title}</h3>
              <p className="label-mono shrink-0 !text-[0.62rem] text-gold-light">Published contribution</p>
            </div>
            <ol className="mt-8 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
              {relatedResearch.steps.map((s, i) => (
                <li key={s.label} className="bg-forest p-5">
                  <p className="label-mono !text-[0.6rem] text-gold-light">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/80">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── Selected publications ───────────────────── */}
      <section aria-labelledby="pubs-title" className="py-24 lg:py-32">
        <div className="container-page">
          <SectionHeading
            index="04"
            eyebrow="Selected publications"
            id="pubs-title"
            align="split"
            title={<>Peer-reviewed &amp; <em>conference</em> work</>}
            intro="Co-authored contributions on the Late Ediacaran dyke swarm of the Saghro massif."
            action={
              <Link href="/publications" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-earth">
                Full publications library <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-12 border-b border-forest/15">
            {sortedPublications.slice(0, 3).map((p) => (
              <PublicationCard key={p.id} pub={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Anti-Atlas · Saghro field plates ─────────── */}
      <section aria-labelledby="saghro-title" className="grain py-24 lg:py-32">
        <div className="container-page">
          <SectionHeading
            index="05"
            eyebrow="Anti-Atlas · Saghro"
            id="saghro-title"
            align="split"
            title={<>In the field, <em>Saghro massif</em></>}
            intro="Original field photographs from the Saghro massif in the Eastern Anti-Atlas: its landscapes, outcrops and the bedded, folded rocks of the Precambrian inlier."
          />
          <div className="mt-14">
            <SaghroPlates />
          </div>
        </div>
      </section>

      {/* ── Fieldwork ───────────────────────────────── */}
      <section aria-labelledby="field-title" className="bg-sand-soft/60 py-24 lg:py-32">
        <div className="container-page">
          <SectionHeading
            index="06"
            eyebrow="Fieldwork & projects"
            id="field-title"
            align="split"
            title={<>Field, mine &amp; <em>laboratory</em></>}
            intro="From doctoral fieldwork in the Saghro inlier to drill-core logging in Moroccan mining districts."
            action={
              <Link href="/fieldwork" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-earth">
                All fieldwork &amp; projects <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-14">
            <FieldMosaic />
          </div>
        </div>
      </section>

      {/* ── Academic journey ────────────────────────── */}
      <section aria-labelledby="journey-title" className="py-24 lg:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="07"
                eyebrow="Academic journey"
                id="journey-title"
                title={<>A personal <em>stratigraphy</em></>}
                intro="Degrees and professional internships, logged like a stratigraphic column — the most recent layer on top."
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <StratColumn />
          </div>
        </div>
      </section>

      <CollaborationCTA />
    </>
  );
}
