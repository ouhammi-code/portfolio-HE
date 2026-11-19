import { images } from "./images";
import { pending, type MaybePending } from "./types";

/**
 * CENTRAL PROFILE FILE — edit this first.
 *
 * Verified on 19 Nov 2026 from:
 *  - ResearchGate: PhD Student, Université Moulay Ismail de Meknes,
 *    Department of Applied Geosciences, Meknès, Morocco.
 *  - LinkedIn: "PhD student", location Drâa-Tafilalet, Morocco.
 */
export const profile = {
  name: "Hasna Er-Raqqady",
  /** Name as it appears on publications (useful for SEO). */
  citationName: "Er-Raqqady, H.",
  title: "PhD Student in Geosciences",
  role: "PhD Student",
  specialization: "Petrology and regional geology of the Ediacaran Anti-Atlas",
  location: "Drâa-Tafilalet, Morocco",
  institution: {
    name: "Université Moulay Ismaïl",
    shortName: "UMI",
    department: "Department of Applied Geosciences",
    city: "Meknès",
    country: "Morocco",
    url: "https://www.umi.ac.ma",
  },
  /** Professional e-mail — not publicly listed on either profile. */
  email: pending("Professional e-mail address") as MaybePending<string>,
  links: {
    linkedin: "https://www.linkedin.com/in/hasna-er-raqqady-7960821bb/",
    researchgate: "https://www.researchgate.net/profile/Hasna-Er-Raqqady",
    orcid: pending("ORCID iD (e.g. https://orcid.org/0000-...)") as MaybePending<string>,
    googleScholar: pending("Google Scholar profile URL") as MaybePending<string>,
  },
  portrait: images.portrait,

  /** Hero introduction (copy supplied in the project brief). */
  intro:
    "Welcome to the academic portfolio of Hasna Er-Raqqady, a geoscience researcher interested in geological evolution, petrology, mineralogy, and the processes shaping Earth's history.",

  /** Biography built only from verified facts — extend freely. */
  bio: {
    lead:
      "Hasna Er-Raqqady is a PhD student in the Department of Applied Geosciences at Université Moulay Ismaïl in Meknès, Morocco. Her doctoral research focuses on the Upper Ediacaran volcano-sedimentary succession of the South Saghro inlier in the Anti-Atlas, combining petrological and isotopic approaches to reconstruct the palaeogeography of the North Gondwana margin.",
    paragraphs: [
      "She trained in earth sciences at the Faculty of Sciences and Techniques of Errachidia, where she completed a Licence in Sciences and Techniques, before pursuing a Master in Sciences and Techniques at the Faculty of Sciences and Techniques of Settat.",
      "Alongside her academic training, she gained applied experience in the Moroccan mining and water sectors — describing drill cores and quality control at the Imiter mine (Société Métallurgique d'Imiter, Managem group), following core drilling, underground works and resource estimation in the Tighza mining district (Compagnie Minière de Touissit), and processing hydrogeological data with GIS at the Guir-Ziz-Rhéris Hydraulic Basin Agency.",
      "She is a co-author of research on the Late Ediacaran dyke swarm of the Saghro massif, which uses ground magnetic surveys, Euler deconvolution and 2D/3D modelling to image the geometry and depth of the dykes — published in the Journal of African Earth Sciences.",
    ],
  },
};

export type Profile = typeof profile;
