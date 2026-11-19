/**
 * Shared content types.
 *
 * Every piece of personal information on the site lives in /data.
 * Anything not yet verified is expressed as a `Pending` value so the UI can
 * render a clearly marked, editable placeholder instead of invented content.
 */

export type Pending = {
  pending: true;
  /** What the researcher should provide here. Shown in the placeholder. */
  note: string;
};

export const pending = (note: string): Pending => ({ pending: true, note });

export const isPending = (value: unknown): value is Pending =>
  typeof value === "object" && value !== null && "pending" in value;

export type MaybePending<T> = T | Pending;

/** Where a fact comes from — kept in data so it is easy to audit later. */
export type Source = "ResearchGate" | "LinkedIn" | "Crossref" | "Provided by the researcher" | "General regional literature";

export type SiteImage = {
  src: string;
  alt: string;
  /** True when the photo is a stock illustration, not the researcher's own material. */
  illustrative?: boolean;
  credit?: string;
  width: number;
  height: number;
};
