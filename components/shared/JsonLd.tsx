import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { isPending } from "@/data/types";
import { siteConfig } from "@/lib/site";

/** schema.org Person + ScholarlyArticle structured data for search engines. */
export function JsonLd() {
  const sameAs = [profile.links.linkedin, profile.links.researchgate, profile.links.orcid, profile.links.googleScholar].filter(
    (l): l is string => typeof l === "string",
  );

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: profile.name,
        alternateName: ["Hasna ER-RAQQADY", "Hasna Er-raqqady"],
        jobTitle: profile.role,
        url: siteConfig.url,
        image: new URL(profile.portrait.src, siteConfig.url).toString(),
        ...(isPending(profile.email) ? {} : { email: `mailto:${profile.email}` }),
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: profile.institution.name,
          url: profile.institution.url,
          address: { "@type": "PostalAddress", addressLocality: profile.institution.city, addressCountry: "MA" },
        },
        knowsAbout: ["Geology", "Petrology", "Petrography", "Mineralogy", "Structural geology", "Exploration geology", "Regional geology", "Sedimentology", "Volcanology", "Applied geophysics"],
        sameAs,
      },
      ...publications.map((p) => ({
        "@type": "ScholarlyArticle",
        headline: p.title,
        datePublished: p.date,
        author: p.authors.map((a) => ({ "@type": "Person", name: a })),
        isPartOf: { "@type": "Periodical", name: p.venue },
        ...(p.doi ? { identifier: `https://doi.org/${p.doi}` } : {}),
        url: p.url,
      })),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
