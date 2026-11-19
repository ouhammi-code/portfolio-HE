import { PenLine } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { isPending, type MaybePending } from "@/data/types";

/**
 * Editable placeholder for information that could not be verified.
 * Hidden entirely when `siteConfig.showPlaceholders` is false.
 */
export function PendingNote({ note, tone = "light", compact = false }: { note: string; tone?: "light" | "dark"; compact?: boolean }) {
  if (!siteConfig.showPlaceholders) return null;
  const dark = tone === "dark";
  return (
    <div
      role="note"
      className={`flex items-start gap-3 border border-dashed ${compact ? "px-3 py-2" : "px-4 py-3.5"} ${
        dark ? "border-ivory/25 text-ivory/60" : "border-earth/35 bg-paper/60 text-earth"
      }`}
    >
      <PenLine className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <p className="text-[0.82rem] leading-snug">
        <span className="label-mono mr-2 !text-[0.6rem]">To be added</span>
        {note}
      </p>
    </div>
  );
}

/** Inline value or a small "to be confirmed" marker. */
export function Maybe({ value, fallback }: { value: MaybePending<string>; fallback?: string }) {
  if (!isPending(value)) return <>{value}</>;
  if (!siteConfig.showPlaceholders) return fallback ? <>{fallback}</> : null;
  return (
    <span title={value.note} className="border-b border-dashed border-current/50 italic opacity-70">
      {fallback ?? "to be confirmed"}
    </span>
  );
}
