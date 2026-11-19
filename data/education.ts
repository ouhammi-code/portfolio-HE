import { pending, type MaybePending, type Source } from "./types";

export type EducationEntry = {
  id: string;
  degree: string;
  /** Original-language degree name, as shown on LinkedIn. */
  originalDegree?: string;
  institution: string;
  location: string;
  start: MaybePending<string>;
  end: MaybePending<string> | "Present";
  /** Optional "YYYY-MM" start used only to order the timeline precisely. */
  sortDate?: string;
  details?: string;
  source: Source;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  location?: MaybePending<string>;
  start: string;
  end: string;
  /** Faithful English translation of the original LinkedIn description. */
  highlights: string[];
  kind: "Mining" | "Water resources" | "Research";
  source: Source;
};

/** Ordered most recent first. */
export const education: EducationEntry[] = [
  {
    id: "phd",
    degree: "Doctorate (PhD) in Geosciences",
    institution: "Université Moulay Ismaïl — Department of Applied Geosciences",
    location: "Meknès, Morocco",
    start: pending("PhD start year"),
    end: "Present",
    details:
      "Thesis: Petrologic and isotopic constraint of the Upper Ediacaran volcano-sedimentary succession of the South Saghro inlier (Anti-Atlas, Morocco): Paleoreconstruction of the North Gondwana margin.",
    source: "ResearchGate",
  },
  {
    id: "master",
    degree: "Master in Sciences and Techniques",
    originalDegree: "Master en sciences et techniques",
    institution: "Faculty of Sciences and Techniques of Settat",
    location: "Settat, Morocco",
    start: "2020",
    sortDate: "2020-11",
    end: pending("Master completion year and specialty"),
    details: "Final-year project carried out in the Tighza mining district (2022).",
    source: "LinkedIn",
  },
  {
    id: "licence",
    degree: "Licence in Sciences and Techniques",
    originalDegree: "Licence en sciences et techniques",
    institution: "Faculty of Sciences and Techniques of Errachidia",
    location: "Errachidia, Morocco",
    start: "2017",
    end: "2020",
    details: "Final-year project carried out at the Guir-Ziz-Rhéris Hydraulic Basin Agency (2020).",
    source: "LinkedIn",
  },
];

/** Ordered most recent first. Descriptions translated from French. */
export const experience: ExperienceEntry[] = [
  {
    id: "cmt-tighza",
    role: "Master's final-year project internship",
    organization: "Compagnie Minière de Touissit — Tighza mining district",
    location: "Tighza, Morocco",
    start: "Feb 2022",
    end: "May 2022",
    highlights: [
      "Core drilling procedures",
      "Monitoring of underground mining works",
      "Estimation of mineral resources and reserves",
    ],
    kind: "Mining",
    source: "LinkedIn",
  },
  {
    id: "abh-gzr",
    role: "Licence final-year project internship",
    organization: "Guir-Ziz-Rhéris Hydraulic Basin Agency",
    location: pending("City of the agency office"),
    start: "Apr 2020",
    end: "Jun 2020",
    highlights: [
      "Analysis of water-point record sheets",
      "Data processing with ArcGIS",
      "Interpretation of hydrodynamic parameters",
    ],
    kind: "Water resources",
    source: "LinkedIn",
  },
  {
    id: "smi-imiter",
    role: "Training internship",
    organization: "Société Métallurgique d'Imiter (Managem group)",
    location: "Imiter, Morocco",
    start: "Aug 2019",
    end: "Aug 2019",
    highlights: ["Subject: description of core drill holes and quality control"],
    kind: "Mining",
    source: "LinkedIn",
  },
];
