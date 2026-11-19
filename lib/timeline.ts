import { education, experience } from "@/data/education";
import { isPending, type MaybePending } from "@/data/types";

export type Lithology = "volcanic" | "sandstone" | "limestone" | "shale";

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  place: string;
  detail?: string;
  kind: "Degree" | "Doctorate" | "Internship";
  lithology: Lithology;
  sortKey: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const label = (v: MaybePending<string> | "Present", fallback = "…") => (isPending(v) ? fallback : v);

/** "2020-11" → 2020.83, "Apr 2020" → 2020.25, "2017" → 2017 */
function toSortKey(value: string): number {
  const iso = value.match(/^(\d{4})(?:-(\d{2}))?$/);
  if (iso) return Number(iso[1]) + (iso[2] ? (Number(iso[2]) - 1) / 12 : 0);
  const named = value.match(/^([A-Za-z]{3}) (\d{4})$/);
  if (named) return Number(named[2]) + Math.max(0, MONTHS.indexOf(named[1])) / 12;
  return 0;
}

/**
 * Academic journey as a stratigraphic column: youngest layer on top.
 * Degrees and internships are given different "lithologies" (fill patterns).
 */
export function buildTimeline(): TimelineEntry[] {
  const edu: TimelineEntry[] = education.map((e) => {
    const start = label(e.start, "");
    const end = label(e.end, "");
    const period = start && end ? `${start} – ${end}` : start ? `${start} –` : end === "Present" ? "Ongoing" : end;
    return {
      id: e.id,
      period,
      title: e.degree,
      place: `${e.institution}, ${e.location}`,
      detail: e.details,
      kind: e.id === "phd" ? "Doctorate" : "Degree",
      lithology: e.id === "phd" ? "volcanic" : e.id === "master" ? "sandstone" : "limestone",
      // An ongoing doctorate with an unknown start always sits on top.
      sortKey: e.end === "Present" && !start ? Infinity : toSortKey(e.sortDate ?? start),
    };
  });

  const exp: TimelineEntry[] = experience.map((x) => ({
    id: x.id,
    period: x.start === x.end ? x.start : `${x.start} – ${x.end}`,
    title: x.role,
    place: x.organization,
    detail: x.highlights.join(" · "),
    kind: "Internship",
    lithology: "shale",
    sortKey: toSortKey(x.start),
  }));

  return [...edu, ...exp].sort((a, b) => b.sortKey - a.sortKey);
}
