import { images } from "./images";
import { pending, type MaybePending, type SiteImage, type Source } from "./types";

export type ResearchInterest = {
  id: string;
  title: string;
  summary: string;
  image: SiteImage;
};

/**
 * Research interests — derived from the "Skills and Expertise" listed on
 * ResearchGate (Minerals, Petrography, Mineralization, Structural Geology,
 * Exploration Geology, Regional Geology, Sedimentology, Geology-Volcanology)
 * and LinkedIn (Geophysics, GIS, Remote sensing).
 */
export const researchInterests: ResearchInterest[] = [
  {
    id: "petrology",
    title: "Petrology & Petrography",
    summary: "Reading the origin and evolution of igneous and volcano-sedimentary rocks from their textures and mineral assemblages.",
    image: images.bandedTexture,
  },
  {
    id: "mineralogy",
    title: "Mineralogy & Geochemistry",
    summary: "Mineral chemistry and isotopic tools as tracers of magmatic sources and geodynamic setting.",
    image: images.sulfides,
  },
  {
    id: "structural",
    title: "Structural Geology",
    summary: "Deformation, fracturing and dyke emplacement as records of the tectonic history of the Anti-Atlas.",
    image: images.saghroFoldedBeds,
  },
  {
    id: "exploration",
    title: "Exploration Geology",
    summary: "Core logging, quality control and resource estimation applied to mineralised districts.",
    image: images.pyrite,
  },
  {
    id: "regional",
    title: "Regional Geology",
    summary: "The Precambrian inliers of the Eastern Anti-Atlas and their place on the North Gondwana margin.",
    image: images.saghroPanorama,
  },
  {
    id: "sedimentology",
    title: "Sedimentology & Volcanology",
    summary: "Volcano-sedimentary successions as archives of eruptive activity and basin evolution.",
    image: images.saghroBeddedSequence,
  },
  {
    id: "geophysics",
    title: "Applied Geophysics & GIS",
    summary: "Ground magnetic surveys, remote sensing and GIS to map structures beneath the surface.",
    image: images.darkRock,
  },
];

export type ResearchSection = {
  id: string;
  number: string;
  title: string;
  /** Verified paragraphs. Empty when the section is still pending. */
  body: string[];
  bullets?: string[];
  /** Where the populated text comes from. */
  source?: Source;
  /** Shown as an editable placeholder while content is missing. */
  todo?: string;
};

export const doctoralResearch = {
  title:
    "Petrologic and isotopic constraint of the Upper Ediacaran volcano-sedimentary succession of the South Saghro inlier (Anti-Atlas, Morocco): Paleoreconstruction of the North Gondwana margin.",
  shortTitle: "The Upper Ediacaran of the South Saghro inlier",
  institution: "Université Moulay Ismaïl, Meknès — Department of Applied Geosciences",
  supervisors: pending("Thesis supervisor(s) and co-supervisor(s)") as MaybePending<string>,
  period: pending("Doctoral period (e.g. 2022 – present)") as MaybePending<string>,
  keywords: ["Ediacaran", "Saghro inlier", "Anti-Atlas", "Volcano-sedimentary succession", "Petrology", "Isotope geochemistry", "North Gondwana"],
  heroImage: images.saghroPeaks,

  sections: [
    {
      id: "context",
      number: "01",
      title: "Research context",
      body: [
        "The thesis investigates the Upper Ediacaran volcano-sedimentary succession exposed in the South Saghro inlier, one of the Precambrian windows of the Anti-Atlas belt in Morocco.",
        "By combining petrological observation with isotopic constraints, the work aims to place this succession in its geodynamic framework and contribute to the palaeoreconstruction of the North Gondwana margin at the end of the Neoproterozoic.",
      ],
      source: "Provided by the researcher",
    },
    {
      id: "setting",
      number: "02",
      title: "Geological setting",
      body: [
        "The Saghro massif belongs to the Eastern Anti-Atlas. Its Precambrian basement exposes the folded, low-grade metasedimentary rocks of the Saghro Group, overlain by the volcanic and volcano-sedimentary series of the Ouarzazate Supergroup, which record widespread Late Ediacaran magmatic activity during the final stages of the Pan-African orogeny.",
        "Both units are cut by a significant swarm of Late Ediacaran dykes, whose magnetic signature and deep, sub-vertical geometry were documented in the central part of the massif in the co-authored study published in 2025.",
      ],
      source: "General regional literature",
      todo: "Add the specific setting of the South Saghro study area (lithostratigraphic units, map, key localities).",
    },
    {
      id: "objectives",
      number: "03",
      title: "Research objectives",
      body: [],
      todo: "List the main objectives of the thesis.",
    },
    {
      id: "questions",
      number: "04",
      title: "Scientific questions",
      body: [],
      todo: "State the scientific questions addressed by the thesis.",
    },
    {
      id: "methodology",
      number: "05",
      title: "Methodology",
      body: ["As stated in the thesis title, the approach combines petrological investigation with isotopic constraints."],
      source: "Provided by the researcher",
      todo: "Detail field methods, analytical techniques (e.g. whole-rock geochemistry, isotope systems, geochronology) and laboratories.",
    },
    {
      id: "observations",
      number: "06",
      title: "Geological observations",
      body: [],
      todo: "Summarise key field observations and mapping results.",
    },
    {
      id: "petrology",
      number: "07",
      title: "Petrological investigations",
      body: [],
      todo: "Describe petrographic findings, rock types and mineral assemblages.",
    },
    {
      id: "isotopes",
      number: "08",
      title: "Isotopic constraints",
      body: [],
      todo: "Present isotopic and/or geochronological results once published.",
    },
    {
      id: "contributions",
      number: "09",
      title: "Scientific contributions",
      body: [],
      todo: "Summarise the expected or published contributions of the thesis.",
    },
  ] satisfies ResearchSection[],
};

/** Verified research line from the co-authored publications. */
export const relatedResearch = {
  title: "Ground magnetic imaging of the Late Ediacaran dyke swarm, central Saghro massif",
  region: "Central Saghro massif, Eastern Anti-Atlas",
  publicationIds: ["baamar-2026-jafes", "baamar-2025-3ma12"],
  steps: [
    { label: "Acquisition", text: "Ground magnetic survey over the dyke swarm and its host rocks." },
    { label: "Processing", text: "Filters and transformations, including reduction to the pole." },
    { label: "Lineaments", text: "Elongated anomalies matching the dykes mapped at surface." },
    { label: "Depth", text: "Euler deconvolution: anomalous sources down to ~1000 m." },
    { label: "Modelling", text: "2D and 3D models: sub-vertical dykes rooted deeper than 3 km." },
  ],
};

export type FigurePlate = {
  id: string;
  label: string;
  caption: string;
  image?: SiteImage;
};

/** Research figures. Items without an image render as placeholders. */
export const researchPlates: FigurePlate[] = [
  { id: "map", label: "Plate I", caption: "Geological map of the South Saghro inlier" },
  { id: "landscape", label: "Plate II", caption: "Landscape of the Saghro massif, Anti-Atlas", image: images.saghroPanorama },
  { id: "field", label: "Plate III", caption: "Well-bedded sequence, Saghro — hammer for scale", image: images.saghroBeddedSequence },
  { id: "folds", label: "Plate IV", caption: "Steeply dipping, folded beds, Saghro", image: images.saghroFoldedBeds },
  { id: "outcrop", label: "Plate V", caption: "Outcrop close-up with pale lenticular layers — pen for scale", image: images.saghroFoliatedOutcrop },
  { id: "sample", label: "Plate VI", caption: "Hand specimen / rock sample" },
  { id: "thin-section", label: "Plate VII", caption: "Thin section under the polarising microscope" },
  { id: "section", label: "Plate VIII", caption: "Interpretative geological cross-section" },
  { id: "diagram", label: "Plate IX", caption: "Geochemical or isotopic diagram" },
];
