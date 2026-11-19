import type { Source } from "./types";

export type PublicationType = "Journal article" | "Conference paper" | "Poster" | "Thesis" | "Book chapter";

export type Publication = {
  id: string;
  title: string;
  /** Author names exactly as published. The researcher's name is highlighted automatically. */
  authors: string[];
  /** False when only part of the author list could be verified. */
  authorsComplete: boolean;
  totalAuthors?: number;
  year: number;
  date: string;
  type: PublicationType;
  venue: string;
  venueDetail?: string;
  publisher?: string;
  doi?: string;
  url: string;
  abstract?: string;
  topics: string[];
  featured?: boolean;
  source: Source[];
};

/**
 * Verified publications (ResearchGate profile + Crossref metadata, Nov 2026).
 * Add new items at the top; the library sorts by date automatically.
 */
export const publications: Publication[] = [
  {
    id: "baamar-2026-jafes",
    title:
      "Magnetic signatures and modeling of the Late Ediacaran dyke swarm in the central Saghro massif (Eastern Anti-Atlas, Morocco)",
    authors: [
      "Ahmed Baamar",
      "Ezzoura Errami",
      "Brahim Karaoui",
      "Mourad Essalhi",
      "Mostapha Bouzekraoui",
      "Mourad Guernouche",
      "Said Haidatte",
      "Abderrahman Ben Ichou",
      "Zakarya Yajioui",
      "Hasna Er-Raqqady",
    ],
    authorsComplete: true,
    year: 2026,
    date: "2026-01",
    type: "Journal article",
    venue: "Journal of African Earth Sciences",
    venueDetail: "Vol. 234, Article 105937 · Published online November 2025",
    publisher: "Elsevier",
    doi: "10.1016/j.jafrearsci.2025.105937",
    url: "https://doi.org/10.1016/j.jafrearsci.2025.105937",
    abstract:
      "The Central Part of the Saghro massif (CPSM), located in the Eastern Anti-Atlas, is characterized by a significant dyke swarm. These dykes remain insufficiently characterized from a geophysical perspective. The aim of this study is to apply a geophysical approach based on the ground magnetic method in order to better understanding the CPSM dyke swarm, as well as their host rocks. To achieve this objective, the magnetic data were subjected to a series of processing operations, including various filters and transformations. The qualitative analysis of the pole-reduced data reveals a strong correlation between the observed magnetic anomalies and the distribution of outcropping dykes in the metasedimentary basement of the Saghro Group and the volcano-sedimentary series of the Ouarzazate Supergroup. These anomalies are manifested by variations in magnetic intensity that follow the orientation of the dyke swarm mapped on surface, confirming their distinct magnetic signature. Complementary analysis of the magnetic data identified magnetic lineaments consistent with the surface mapped dykes. These lineaments appear as elongated anomalies reflecting the presence of continuous magnetic structures in the subsurface. In addition, the estimated depths of anomalous sources, obtained by Euler deconvolution from ground magnetic data, reveal values of up to 1000 m. Complementing the qualitative data analysis, a quantitative interpretation using 2D and 3D modeling was applied to the high-amplitude anomalies associated with the dyke's zones. The results obtained indicate that dykes correspond to sub-vertical structures, deeply rooted beyond 3 km.",
    topics: ["Applied geophysics", "Dyke swarms", "Saghro massif", "Ediacaran"],
    featured: true,
    source: ["ResearchGate", "Crossref"],
  },
  {
    id: "baamar-2025-3ma12",
    title:
      "Late Ediacaran dyke swarm in the Saghro massif (Eastern Anti-Atlas, Morocco): geometry and depth estimation using ground magnetic survey",
    authors: ["Ahmed Baamar", "Ezzoura Errami", "Brahim Karaoui", "Mourad Essalhi", "Hasna Er-Raqqady"],
    authorsComplete: false,
    totalAuthors: 10,
    year: 2025,
    date: "2025-04-24",
    type: "Conference paper",
    venue: "3MA12 Conference",
    venueDetail: "Errachidia, Morocco · April 2025",
    url: "https://www.researchgate.net/publication/393775737_LATE_EDIACARAN_DYKE_SWARM_IN_THE_SAGHRO_MASSIF_EASTERN_ANTI-ATLAS_MOROCCO_GEOMETRY_AND_DEPTH_ESTIMATION_USING_GROUND_MAGNETIC_SURVEY",
    topics: ["Applied geophysics", "Dyke swarms", "Saghro massif", "Ediacaran"],
    source: ["ResearchGate"],
  },
];

export const sortedPublications = [...publications].sort((a, b) => b.date.localeCompare(a.date));

export const publicationTopics = Array.from(new Set(publications.flatMap((p) => p.topics))).sort();
export const publicationTypes = Array.from(new Set(publications.map((p) => p.type)));
export const publicationYears = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
