import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PublicationLibrary } from "@/components/publications/PublicationLibrary";
import { ExternalButton } from "@/components/shared/Buttons";
import { ResearchGateIcon } from "@/components/shared/BrandIcons";
import { PendingNote } from "@/components/shared/Pending";
import { Reveal } from "@/components/shared/Reveal";
import { publicationTopics, publicationTypes, publicationYears, sortedPublications } from "@/data/publications";
import { profile } from "@/data/profile";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Publications",
  description: `Scientific publications of ${profile.name}: journal articles and conference papers on the Late Ediacaran geology of the Saghro massif, Eastern Anti-Atlas, Morocco.`,
  alternates: { canonical: "/publications" },
  openGraph: { title: `Publications · ${profile.name}`, url: "/publications" },
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title={
          <>
            Scientific <span className="text-gold-light italic">publications</span>
          </>
        }
        intro="Journal articles and conference contributions, with authors, venues and DOI links. Search by title or filter by year, type and research topic."
        image={images.layeredOutcrop}
      />

      <section className="py-16 lg:py-24">
        <div className="container-page">
          <PublicationLibrary publications={sortedPublications} years={publicationYears} types={publicationTypes} topics={publicationTopics} />

          <Reveal className="mt-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm leading-relaxed text-ink-muted">
                Publication data verified against ResearchGate and Crossref. The researcher&rsquo;s name is underlined in each author list. For
                the most up-to-date record, consult her ResearchGate profile.
              </p>
              <PendingNote note="Add new articles, posters or the thesis itself in data/publications.ts — the library, filters and structured data update automatically." />
            </div>
            <ExternalButton href={profile.links.researchgate} icon={<ResearchGateIcon className="h-4 w-4" />}>
              ResearchGate profile
            </ExternalButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
