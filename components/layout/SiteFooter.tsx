import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/site";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import { isPending } from "@/data/types";
import { ContourLines } from "@/components/shared/ContourLines";

/** Cached so the footer stays fully static (evaluated at build time). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const credits = Array.from(
    new Set(Object.values(images).flatMap((img) => ("credit" in img && img.credit ? [img.credit] : []))),
  );

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-ivory/75">
      <ContourLines className="pointer-events-none absolute -right-40 -bottom-40 h-[560px] w-[560px] text-gold/10" />
      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl text-ivory">
              Hasna <span className="italic">Er-Raqqady</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {profile.title}. {profile.institution.department}, {profile.institution.name}, {profile.institution.city},{" "}
              {profile.institution.country}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { href: profile.links.researchgate, label: "ResearchGate" },
                { href: profile.links.linkedin, label: "LinkedIn" },
                ...(!isPending(profile.links.orcid) ? [{ href: profile.links.orcid, label: "ORCID" }] : []),
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-ivory/20 px-3 py-1.5 text-xs tracking-wide transition-colors hover:border-gold hover:text-gold-light"
                >
                  {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="label-mono mb-4 text-gold">Sections</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm lg:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="label-mono mb-4 text-gold">Research focus</p>
            <p className="font-serif text-lg leading-snug text-ivory/90 italic">
              Upper Ediacaran volcano-sedimentary succession of the South Saghro inlier — Anti-Atlas, Morocco.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/50 md:flex-row md:items-start md:justify-between">
          <p>
            © <CopyrightYear /> {profile.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Landscape and mineral photographs marked “Illustrative” are stock images (Unsplash Licence) by {credits.join(", ")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
