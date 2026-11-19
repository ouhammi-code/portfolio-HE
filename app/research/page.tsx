import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Maybe, PendingNote } from "@/components/shared/Pending";
import { CrossSection } from "@/components/research/CrossSection";
import { InterestCards } from "@/components/research/InterestCards";
import { CollaborationCTA } from "@/components/shared/CollaborationCTA";
import { doctoralResearch, relatedResearch, researchPlates } from "@/data/research";
import { publications } from "@/data/publications";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Doctoral research of Hasna Er-Raqqady: petrologic and isotopic constraint of the Upper Ediacaran volcano-sedimentary succession of the South Saghro inlier (Anti-Atlas, Morocco) and palaeoreconstruction of the North Gondwana margin.",
  alternates: { canonical: "/research" },
  openGraph: { title: `Research · ${profile.name}`, url: "/research" },
};

export default function ResearchPage() {
  const r = doctoralResearch;
  const related = publications.filter((p) => relatedResearch.publicationIds.includes(p.id));
  const sections = r.sections.filter((s) => s.body.length > 0 || siteConfig.showPlaceholders);

  return (
    <>
      <PageHero
        eyebrow="Doctoral research"
        title={
          <>
            The Upper Ediacaran of the <span className="text-gold-light italic">South Saghro</span> inlier
          </>
        }
        intro="Petrology, isotopes and the palaeogeography of the North Gondwana margin at the close of the Neoproterozoic."
        image={r.heroImage}
      />

      {/* ── Thesis card ── */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="label-mono flex items-center gap-3 text-earth">
              <span aria-hidden="true" className="h-px w-8 bg-earth/40" /> Thesis title
            </p>
            <h2 className="mt-6 font-serif text-[1.85rem] leading-[1.2] text-forest italic sm:text-[2.4rem]">{r.title}</h2>
            <dl className="mt-10 grid gap-px bg-forest/15 sm:grid-cols-3">
              {[
                { k: "Institution", v: r.institution },
                { k: "Supervision", v: <Maybe value={r.supervisors} /> },
                { k: "Period", v: <Maybe value={r.period} /> },
              ].map((f) => (
                <div key={f.k} className="bg-ivory py-4 pr-4 sm:px-4 sm:first:pl-0">
                  <dt className="label-mono !text-[0.6rem] text-earth">{f.k}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-charcoal">{f.v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Keywords">
              {r.keywords.map((k) => (
                <li key={k} className="bg-sand-soft px-2.5 py-1 text-xs font-medium text-earth">
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="bg-forest p-4 sm:p-6">
              <CrossSection />
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              <span className="label-mono mr-2 text-earth">Fig. 1</span>
              Conceptual relationships between the Saghro Group basement, the Ouarzazate Supergroup and the Late Ediacaran dykes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Research narrative with sticky contents ── */}
      <section aria-label="Research presentation" className="border-t border-forest/10 bg-paper py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <nav aria-label="Research sections" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="label-mono mb-4 text-earth">Contents</p>
              <ol className="space-y-2 border-l border-forest/15">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-ink-muted transition-colors hover:border-gold hover:text-forest">
                      <span className="label-mono mr-2 !text-[0.6rem] text-earth-soft">{s.number}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            {sections.map((s) => (
              <Reveal key={s.id}>
                <article id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 border-t border-forest/15 pt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="label-mono text-earth">§ {s.number}</p>
                    {s.source && s.body.length > 0 && <p className="label-mono !text-[0.58rem] text-earth-soft">Source · {s.source}</p>}
                  </div>
                  <h2 id={`${s.id}-title`} className="mt-3 text-3xl text-forest sm:text-4xl">
                    {s.title}
                  </h2>
                  {s.body.length > 0 && (
                    <div className="prose-academic mt-5 max-w-3xl">
                      {s.body.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  )}
                  {s.todo && (
                    <div className="mt-5 max-w-3xl">
                      <PendingNote note={s.todo} />
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Figures / plates ── */}
      <section aria-labelledby="plates-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            index="10"
            eyebrow="Figures & plates"
            id="plates-title"
            align="split"
            title={<>Maps, samples &amp; <em>thin sections</em></>}
            intro="Geological maps, field photographs, rock samples, petrographic microscope images and diagrams from the thesis. Empty frames are reserved for original material."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchPlates
              .filter((p) => p.image || siteConfig.showPlaceholders)
              .map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 3) * 0.06}>
                    <figure>
                      <div className="relative aspect-[4/3] overflow-hidden bg-sand-soft">
                        {p.image ? (
                          <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-3 border border-dashed border-earth/35 text-earth">
                            <ImageIcon className="h-7 w-7" strokeWidth={1.2} aria-hidden="true" />
                            <span className="label-mono !text-[0.6rem]">Original figure to be added</span>
                          </div>
                        )}
                      </div>
                      <figcaption className="mt-3 flex items-start justify-between gap-3 text-sm text-ink-muted">
                        <span>
                          <span className="label-mono mr-2 text-earth">{p.label}</span>
                          {p.caption}
                        </span>
                        {p.image?.illustrative && <span className="label-mono shrink-0 !text-[0.58rem] text-earth-soft">Illustrative</span>}
                      </figcaption>
                    </figure>
                </Reveal>
              ))}
          </ul>
        </div>
      </section>

      {/* ── Related published research ── */}
      <section aria-labelledby="related-title" className="bg-forest py-20 text-ivory lg:py-28">
        <div className="container-page">
          <SectionHeading
            index="11"
            eyebrow="Related research"
            tone="dark"
            id="related-title"
            title={relatedResearch.title}
            intro={`${relatedResearch.region}. A co-authored geophysical study of the dyke swarm that cuts the Saghro Group basement and the Ouarzazate Supergroup.`}
          />
          <ol className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
            {relatedResearch.steps.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.05} className="h-full bg-forest p-6">
                  <p className="font-serif text-4xl text-gold-light/80">{String(i + 1).padStart(2, "0")}</p>
                  <p className="label-mono mt-4 !text-[0.62rem] text-gold-light">{s.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/80">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <ul className="mt-10 space-y-3">
            {related.map((p) => (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-ivory/85 hover:text-gold-light">
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="font-serif text-lg italic">{p.title}</span>
                    <span className="text-sm text-ivory/60"> — {p.venue}, {p.year}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/publications" className="mt-8 inline-block text-sm font-semibold text-gold-light hover:underline">
            See all publications →
          </Link>
        </div>
      </section>

      {/* ── Interests ── */}
      <section aria-labelledby="areas-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading index="12" eyebrow="Research areas" id="areas-title" title={<>Disciplines behind the <em>work</em></>} />
          <div className="mt-12">
            <InterestCards />
          </div>
          <p className="mt-5 text-xs text-earth-soft">Card imagery is illustrative.</p>
        </div>
      </section>

      <CollaborationCTA />
    </>
  );
}
