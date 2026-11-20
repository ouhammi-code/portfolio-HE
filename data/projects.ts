import { images } from "./images";
import { pending, type MaybePending, type SiteImage, type Source } from "./types";

export type ProjectCategory = "Doctoral fieldwork" | "Geophysical survey" | "Mining geology" | "Hydrogeology";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  date: MaybePending<string>;
  objective: MaybePending<string>;
  context: MaybePending<string>;
  /** Gallery. Stock images are flagged `illustrative` and labelled on the site. */
  gallery: SiteImage[];
  source: Source;
};

/**
 * Fieldwork & projects. Only activities documented on the public profiles are
 * listed. No original field photographs are available yet — the gallery uses
 * labelled illustrative images until they are replaced.
 */
export const projects: Project[] = [
  {
    id: "south-saghro-doctoral",
    title: "Upper Ediacaran succession of the South Saghro inlier",
    category: "Doctoral fieldwork",
    location: "South Saghro inlier, Anti-Atlas, Morocco",
    date: pending("Field campaign dates"),
    objective:
      "Constrain the petrology and isotopic signature of the Upper Ediacaran volcano-sedimentary succession to reconstruct the North Gondwana margin.",
    context: pending("Describe sampling strategy, mapped sections and laboratory work."),
    gallery: [images.saghroPanorama, images.saghroFoldedBeds, images.saghroBeddedSequence, images.saghroFoliatedOutcrop],
    source: "Provided by the researcher",
  },
  {
    id: "saghro-magnetics",
    title: "Ground magnetic survey of the Saghro dyke swarm",
    category: "Geophysical survey",
    location: "Central Saghro massif, Eastern Anti-Atlas, Morocco",
    date: "Results published 2025",
    objective:
      "Characterise the Late Ediacaran dyke swarm and its host rocks from a geophysical perspective, estimating dyke geometry and depth.",
    context:
      "Magnetic anomalies follow the orientation of dykes mapped in the Saghro Group basement and the Ouarzazate Supergroup; Euler deconvolution and 2D/3D modelling indicate sub-vertical dykes rooted below 3 km.",
    gallery: [images.darkRock, images.tiltedStrata, images.atlasRanges],
    source: "ResearchGate",
  },
  {
    id: "tighza",
    title: "Core drilling and resource estimation, Tighza district",
    category: "Mining geology",
    location: "Tighza mining district, Morocco",
    date: "Feb – May 2022",
    objective: "Master's final-year project with Compagnie Minière de Touissit.",
    context: "Core drilling procedures, monitoring of underground mining works, and estimation of resources and reserves.",
    gallery: [images.sulfides, images.pyrite],
    source: "LinkedIn",
  },
  {
    id: "abh-gzr",
    title: "Hydrogeological data processing, Guir-Ziz-Rhéris basins",
    category: "Hydrogeology",
    location: "Guir-Ziz-Rhéris basins, Drâa-Tafilalet, Morocco",
    date: "Apr – Jun 2020",
    objective: "Licence final-year project with the Guir-Ziz-Rhéris Hydraulic Basin Agency.",
    context: "Analysis of water-point record sheets, data processing in ArcGIS and interpretation of hydrodynamic parameters.",
    gallery: [images.presaharanPlain, images.erodedStrata],
    source: "LinkedIn",
  },
  {
    id: "imiter",
    title: "Drill-core description and quality control, Imiter mine",
    category: "Mining geology",
    location: "Imiter, Eastern Anti-Atlas, Morocco",
    date: "Aug 2019",
    objective: "Training internship with Société Métallurgique d'Imiter (Managem group).",
    context: "Description of core drill holes and quality control.",
    gallery: [images.pyrite, images.darkStrata],
    source: "LinkedIn",
  },
];
