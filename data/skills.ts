import type { Source } from "./types";

export type SkillGroup = {
  title: string;
  items: string[];
  source: Source[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Geological expertise",
    items: [
      "Petrography",
      "Minerals & mineralization",
      "Structural geology",
      "Regional geology",
      "Sedimentology",
      "Geology & volcanology",
      "Exploration geology",
    ],
    source: ["ResearchGate", "LinkedIn"],
  },
  {
    title: "Geophysics & spatial analysis",
    items: ["Geophysics", "Geographic information systems (GIS)", "ArcGIS", "Remote sensing"],
    source: ["LinkedIn"],
  },
  {
    title: "Field & mining practice",
    items: [
      "Drill-core description",
      "Quality control of drilling data",
      "Core drilling procedures",
      "Monitoring of underground works",
      "Resource & reserve estimation",
      "Hydrodynamic data interpretation",
    ],
    source: ["LinkedIn"],
  },
];

export const languages: string[] = [];
