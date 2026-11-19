/**
 * Conceptual geological cross-section (not to scale).
 *
 * Shows only relationships stated in the verified publication abstract:
 * a metasedimentary basement (Saghro Group) overlain by the volcano-sedimentary
 * series of the Ouarzazate Supergroup, both cut by sub-vertical Late Ediacaran dykes.
 */
export function CrossSection({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const ink = dark ? "#F5F2EA" : "#282B29";
  const gold = "#B79A68";
  const sand = dark ? "#D9CCB7" : "#685344";

  // Folded basement layers (sinusoidal), clipped below the unconformity.
  const folds = Array.from({ length: 9 }, (_, i) => {
    const y0 = 214 + i * 13;
    let d = `M -20 ${y0}`;
    for (let x = -20; x <= 820; x += 20) {
      d += ` L ${x} ${(y0 + Math.sin((x + i * 9) / 52) * 16).toFixed(1)}`;
    }
    return d;
  });

  const dykes = [
    { x: 168, w: 7, top: 62 },
    { x: 322, w: 10, top: 48 },
    { x: 486, w: 6, top: 70 },
    { x: 604, w: 9, top: 56 },
  ];

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 800 360"
        role="img"
        aria-labelledby="xs-title xs-desc"
        className="h-auto w-full"
        fontFamily="var(--font-plex-mono), monospace"
      >
        <title id="xs-title">Conceptual cross-section of the Saghro massif</title>
        <desc id="xs-desc">
          Folded metasedimentary basement of the Saghro Group, overlain across an unconformity by layered volcano-sedimentary rocks of
          the Ouarzazate Supergroup. Sub-vertical Late Ediacaran dykes cut both units.
        </desc>
        <defs>
          <pattern id="xs-volc" width="22" height="16" patternUnits="userSpaceOnUse">
            <path d="M4 5 L8 11 L12 5" fill="none" stroke={gold} strokeOpacity="0.55" strokeWidth="1" />
          </pattern>
          <pattern id="xs-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" fill={sand} fillOpacity="0.55" />
            <circle cx="9" cy="9" r="0.8" fill={sand} fillOpacity="0.4" />
          </pattern>
          <clipPath id="xs-basement">
            <path d="M0 200 C 140 188, 260 214, 400 198 S 660 186, 800 204 L 800 360 L 0 360 Z" />
          </clipPath>
        </defs>

        {/* Topographic profile + cover */}
        <path d="M0 70 C 70 52, 120 82, 190 60 S 300 30, 360 46 S 460 80, 520 58 S 650 34, 720 52 S 790 64, 800 58 L 800 200 L 0 200 Z" fill={dark ? "#243B35" : "#E8DFD0"} />
        {/* Ouarzazate Supergroup — alternating volcanic and volcaniclastic layers */}
        <path d="M0 92 C 200 84, 420 104, 800 88 L 800 124 C 420 138, 200 120, 0 128 Z" fill="url(#xs-volc)" />
        <path d="M0 128 C 200 120, 420 138, 800 124 L 800 160 C 420 170, 200 156, 0 164 Z" fill="url(#xs-dots)" />
        <path d="M0 164 C 200 156, 420 170, 800 160 L 800 204 L 0 204 Z" fill="url(#xs-volc)" />
        {[92, 128, 164].map((y, i) => (
          <path key={i} d={`M0 ${y} C 200 ${y - 8}, 420 ${y + 12 + i * 2}, 800 ${y - 4 - i * 2}`} fill="none" stroke={ink} strokeOpacity="0.28" strokeWidth="1" />
        ))}

        {/* Saghro Group — folded basement */}
        <g clipPath="url(#xs-basement)">
          <rect x="0" y="180" width="800" height="180" fill={dark ? "#1A2C27" : "#D9CCB7"} />
          {folds.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={sand} strokeOpacity={dark ? 0.45 : 0.6} strokeWidth="1.1" />
          ))}
        </g>

        {/* Unconformity */}
        <path d="M0 200 C 140 188, 260 214, 400 198 S 660 186, 800 204" fill="none" stroke={gold} strokeWidth="2" strokeDasharray="7 5" />

        {/* Dykes */}
        {dykes.map((d) => (
          <path key={d.x} d={`M ${d.x} 360 L ${d.x + 4} ${d.top} L ${d.x + d.w + 4} ${d.top} L ${d.x + d.w} 360 Z`} fill={dark ? "#0F1A17" : "#282B29"} stroke={gold} strokeOpacity="0.5" strokeWidth="0.8" />
        ))}

        {/* Topographic line */}
        <path d="M0 70 C 70 52, 120 82, 190 60 S 300 30, 360 46 S 460 80, 520 58 S 650 34, 720 52 S 790 64, 800 58" fill="none" stroke={ink} strokeOpacity="0.7" strokeWidth="1.4" />

        {/* Labels */}
        <g fill={ink} fontSize="11" letterSpacing="1.2">
          <text x="20" y="116" fillOpacity="0.9">OUARZAZATE SUPERGROUP</text>
          <text x="20" y="131" fontSize="9.5" fillOpacity="0.6">volcano-sedimentary series</text>
          <text x="20" y="300" fillOpacity="0.9">SAGHRO GROUP</text>
          <text x="20" y="315" fontSize="9.5" fillOpacity="0.6">metasedimentary basement</text>
          <text x="660" y="232" fontSize="9.5" fill={gold}>UNCONFORMITY</text>
          <text x="338" y="22" fontSize="9.5" fill={gold}>LATE EDIACARAN DYKES</text>
        </g>
        <path d="M 330 30 L 326 44" stroke={gold} strokeWidth="1" />
        {/* Scale-free marker */}
        <g fill={ink} fillOpacity="0.55" fontSize="9">
          <text x="800" y="352" textAnchor="end">CONCEPTUAL SKETCH · NOT TO SCALE</text>
        </g>
      </svg>
    </figure>
  );
}
