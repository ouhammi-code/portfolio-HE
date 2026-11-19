export const siteConfig = {
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. on Vercel) for correct canonical/OG URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Hasna Er-Raqqady — Geoscience Researcher",
  description:
    "Academic portfolio of Hasna Er-Raqqady, PhD student in geosciences at Université Moulay Ismaïl (Meknès, Morocco), researching the Upper Ediacaran volcano-sedimentary succession of the Saghro inlier, Anti-Atlas.",
  /**
   * When true, missing information is shown as dashed "to be added" blocks so
   * the researcher can see what remains to fill in. Set to false before
   * sharing the site publicly to hide every placeholder.
   */
  showPlaceholders: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/fieldwork", label: "Fieldwork" },
  { href: "/conferences", label: "Conferences" },
  { href: "/contact", label: "Contact" },
] as const;
