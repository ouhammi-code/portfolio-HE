import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost-light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-forest-deep",
  outline: "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  "outline-light": "border border-ivory/35 text-ivory hover:border-gold-light hover:bg-ivory hover:text-forest",
  "ghost-light": "bg-gold text-forest-deep hover:bg-gold-light",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 text-[0.82rem] font-semibold tracking-wide transition-all duration-300 ease-strata";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

/** Internal navigation button. */
export function ButtonLink({ href, children, variant = "primary", icon, className }: Props) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className ?? ""}`}>
      {icon}
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
    </Link>
  );
}

/** External link button — opens in a new tab. */
export function ExternalButton({ href, children, variant = "outline", icon, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]} ${className ?? ""}`}>
      {icon}
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[0.7rem] font-medium tracking-wide ${
        tone === "dark" ? "border border-ivory/20 text-ivory/80" : "bg-sand-soft text-earth"
      }`}
    >
      {children}
    </span>
  );
}
