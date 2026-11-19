"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { Publication } from "@/data/publications";

const SELF = /er-?raqqady/i;

export function AuthorList({ pub }: { pub: Publication }) {
  return (
    <p className="text-sm leading-relaxed text-ink-muted">
      {pub.authors.map((a, i) => {
        const self = SELF.test(a);
        const sep = i < pub.authors.length - 1 ? (!pub.authorsComplete && i === pub.authors.length - 2 ? ", … " : ", ") : "";
        return (
          <span key={a}>
            {self ? <strong className="font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4">{a}</strong> : a}
            {sep}
          </span>
        );
      })}
      {!pub.authorsComplete && pub.totalAuthors && (
        <span className="ml-1 text-xs text-earth-soft">({pub.totalAuthors} authors — partial list)</span>
      )}
    </p>
  );
}

export function PublicationCard({ pub, index, headingLevel = "h3" }: { pub: Publication; index?: number; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Heading = headingLevel;

  return (
    <article className="group relative grid gap-6 border-t border-forest/15 py-8 transition-colors duration-500 hover:bg-paper sm:grid-cols-[7rem_1fr] sm:gap-8 sm:px-4 lg:grid-cols-[9rem_1fr_auto] lg:py-10">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-0 bg-gold transition-[width] duration-700 ease-strata group-hover:w-full"
      />
      <div className="flex items-baseline gap-4 sm:block">
        <p className="font-serif text-4xl text-earth/90 sm:text-5xl">{pub.year}</p>
        <p className="label-mono mt-2 !text-[0.62rem] text-earth">{pub.type}</p>
        {typeof index === "number" && <p className="label-mono mt-1 !text-[0.6rem] text-earth-soft sm:mt-3">No. {String(index + 1).padStart(2, "0")}</p>}
      </div>

      <div className="min-w-0">
        <Heading className="text-[1.5rem] leading-snug text-forest sm:text-[1.75rem]">
          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="link-underline">
            {pub.title}
          </a>
        </Heading>
        <div className="mt-3">
          <AuthorList pub={pub} />
        </div>
        <p className="mt-3 text-sm">
          <span className="font-serif text-base text-charcoal italic">{pub.venue}</span>
          {pub.venueDetail && <span className="text-ink-muted"> — {pub.venueDetail}</span>}
        </p>
        {pub.doi && (
          <p className="label-mono mt-2 !text-[0.66rem] break-all text-earth normal-case !tracking-normal">
            DOI:{" "}
            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="hover:text-forest hover:underline">
              {pub.doi}
            </a>
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {pub.topics.map((t) => (
            <span key={t} className="bg-sand-soft px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-earth">
              {t}
            </span>
          ))}
        </div>

        {pub.abstract && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest hover:text-earth"
            >
              {open ? "Hide abstract" : "Read abstract"}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 max-w-3xl border-l-2 border-gold/60 pl-5 text-[0.95rem] leading-relaxed text-charcoal/85">
                    {pub.abstract}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="lg:pt-2">
        <a
          href={pub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 border border-forest/25 px-4 py-2 text-xs font-semibold tracking-wide text-forest transition-colors hover:bg-forest hover:text-ivory"
        >
          {pub.doi ? "View on publisher" : "View source"}
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
