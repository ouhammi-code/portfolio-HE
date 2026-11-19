"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";
import { profile } from "@/data/profile";
import { ResearchGateIcon, LinkedInIcon } from "@/components/shared/BrandIcons";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Academic identity bar */}
      <div
        className={`overflow-hidden bg-forest-deep text-ivory/80 transition-[max-height,opacity] duration-500 ease-strata ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="container-page flex h-9 items-center justify-between gap-6">
          <p className="label-mono truncate !text-[0.66rem]">
            {profile.role} <span className="mx-2 text-gold">·</span> {profile.institution.department}
            <span className="hidden md:inline">
              <span className="mx-2 text-gold">·</span>
              {profile.institution.name}, {profile.institution.city}
            </span>
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <a href={profile.links.researchgate} target="_blank" rel="noopener noreferrer" className="label-mono !text-[0.66rem] hover:text-gold-light">
              ResearchGate
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="label-mono !text-[0.66rem] hover:text-gold-light">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`transition-[background-color,box-shadow,color] duration-500 ease-strata ${
          solid ? "bg-ivory/92 text-charcoal shadow-[0_1px_0_rgba(40,43,41,0.08)] backdrop-blur-md" : "bg-transparent text-ivory"
        }`}
      >
        <nav aria-label="Main" className="container-page flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="group flex flex-col leading-none" aria-label={`${profile.name} — home`}>
            <span className="font-serif text-[1.45rem] font-medium tracking-tight lg:text-[1.6rem]">
              Hasna <span className="italic">Er-Raqqady</span>
            </span>
            <span className={`label-mono mt-1 !text-[0.6rem] ${solid ? "text-earth" : "text-gold-light"}`}>Geosciences · Morocco</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.slice(1).map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${
                      solid ? "hover:text-forest" : "hover:text-gold-light"
                    } ${active ? (solid ? "text-forest" : "text-gold-light") : ""}`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6 text-ivory" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-forest-deep text-ivory lg:hidden"
          >
            <div className="container-page flex flex-1 flex-col justify-center pt-20 pb-10">
              <p className="label-mono mb-6 text-gold">Navigation</p>
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-baseline gap-4 py-1.5 font-serif text-[2.1rem] leading-tight ${
                        isActive(item.href) ? "text-gold-light italic" : "text-ivory"
                      }`}
                    >
                      <span className="label-mono w-6 !text-[0.65rem] text-ivory/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex gap-6 border-t border-ivory/15 pt-6">
                <a href={profile.links.researchgate} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-ivory/80">
                  <ResearchGateIcon className="h-4 w-4" /> ResearchGate
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-ivory/80">
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
