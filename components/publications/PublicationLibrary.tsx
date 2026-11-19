"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { PublicationCard } from "./PublicationCard";
import type { Publication } from "@/data/publications";

type Props = {
  publications: Publication[];
  years: number[];
  types: string[];
  topics: string[];
};

const ALL = "all";

function FilterSelect({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-mono !text-[0.6rem] text-earth">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full appearance-none border border-forest/20 bg-paper bg-[length:12px] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 text-sm text-charcoal transition-colors hover:border-forest/40 focus:border-forest"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%23685344' stroke-width='1.5'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PublicationLibrary({ publications, years, types, topics }: Props) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [topic, setTopic] = useState(ALL);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter(
      (p) =>
        (!q || p.title.toLowerCase().includes(q)) &&
        (year === ALL || String(p.year) === year) &&
        (type === ALL || p.type === type) &&
        (topic === ALL || p.topics.includes(topic)),
    );
  }, [publications, query, year, type, topic]);

  const filtered = query || year !== ALL || type !== ALL || topic !== ALL;
  const reset = () => {
    setQuery("");
    setYear(ALL);
    setType(ALL);
    setTopic(ALL);
  };

  return (
    <div>
      <div role="search" aria-label="Search and filter publications" className="grid gap-4 border border-forest/12 bg-ivory p-5 sm:p-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
          <label htmlFor="pub-search" className="label-mono !text-[0.6rem] text-earth">
            Search by title
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-earth" strokeWidth={1.5} aria-hidden="true" />
            <input
              id="pub-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. dyke swarm, Saghro…"
              className="h-12 w-full border border-forest/20 bg-paper pr-4 pl-11 text-sm text-charcoal placeholder:text-ink-muted/70 transition-colors hover:border-forest/40 focus:border-forest"
            />
          </div>
        </div>
        <FilterSelect id="pub-year" label="Year" value={year} onChange={setYear} options={[{ value: ALL, label: "All years" }, ...years.map((y) => ({ value: String(y), label: String(y) }))]} />
        <FilterSelect id="pub-type" label="Type" value={type} onChange={setType} options={[{ value: ALL, label: "All types" }, ...types.map((t) => ({ value: t, label: t }))]} />
        <FilterSelect id="pub-topic" label="Research topic" value={topic} onChange={setTopic} options={[{ value: ALL, label: "All topics" }, ...topics.map((t) => ({ value: t, label: t }))]} />
      </div>

      <div className="mt-8 flex min-h-11 items-center justify-between gap-4">
        <p className="text-sm text-ink-muted" aria-live="polite">
          Showing <strong className="font-semibold text-forest">{results.length}</strong> of {publications.length} publication
          {publications.length === 1 ? "" : "s"}
        </p>
        {filtered && (
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-forest hover:text-earth">
            <X className="h-4 w-4" /> Clear filters
          </button>
        )}
      </div>

      <div className="mt-2 border-b border-forest/15">
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PublicationCard pub={p} index={i} headingLevel="h2" />
            </motion.div>
          ))}
        </AnimatePresence>
        {results.length === 0 && (
          <div className="border-t border-forest/15 py-16 text-center">
            <p className="font-serif text-2xl text-forest">No publication matches these filters.</p>
            <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-earth underline underline-offset-4">
              Reset the search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
