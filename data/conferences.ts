import { pending, type MaybePending, type Source } from "./types";

export type ActivityType = "Conference" | "Poster" | "Workshop" | "Collaboration" | "Membership" | "Academic event";

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  event: string;
  location: string;
  date: string;
  year: number;
  contribution: MaybePending<string>;
  publicationId?: string;
  source: Source;
};

export const activities: Activity[] = [
  {
    id: "3ma12-2025",
    type: "Conference",
    title:
      "Late Ediacaran dyke swarm in the Saghro massif (Eastern Anti-Atlas, Morocco): geometry and depth estimation using ground magnetic survey",
    event: "3MA12 Conference",
    location: "Errachidia, Morocco",
    date: "April 2025",
    year: 2025,
    contribution: pending("Contribution format (oral or poster) and presenting author"),
    publicationId: "baamar-2025-3ma12",
    source: "ResearchGate",
  },
];

/** Co-authors on verified publications, with affiliations listed on ResearchGate. */
export const collaborators = [
  { name: "Ahmed Baamar", affiliation: "Faculty of Sciences, Chouaib Doukkali University" },
  { name: "Ezzoura Errami", affiliation: "Chouaib Doukkali University" },
  { name: "Brahim Karaoui", affiliation: "Université Moulay Ismaïl, Meknès" },
  { name: "Mourad Essalhi", affiliation: "Mohammed V University" },
];

/** Sections still waiting for content — shown as placeholders. */
export const pendingActivities = {
  workshops: pending("Workshops, field schools and training courses attended"),
  memberships: pending("Scientific societies and professional memberships"),
  events: pending("Seminars, doctoral days and other academic events"),
};
