/**
 * Minimal monochrome marks for academic networks (Lucide has no brand icons).
 * Drawn as simple glyphs, inheriting `currentColor`.
 */
type IconProps = { className?: string };

export function ResearchGateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="2" />
      <text x="12" y="16" textAnchor="middle" fontSize="9.5" fontFamily="Georgia, serif" fill="currentColor" stroke="none" fontWeight="600">
        R<tspan fontSize="6.5" dy="-3.2">G</tspan>
      </text>
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="2" />
      <path d="M7.5 10.5v6M7.5 7.6v.1M11 16.5v-6M11 13.2c0-1.6 1-2.7 2.4-2.7s2.1.9 2.1 2.6v3.4" strokeLinecap="round" />
    </svg>
  );
}

export function OrcidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M8.5 10v6.5M8.5 7.4v.1M11.5 16.5V7.5h2.2a4.5 4.5 0 0 1 0 9h-2.2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
