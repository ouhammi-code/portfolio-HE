/**
 * Decorative topographic contour lines — evokes a geological / topographic map.
 * Purely ornamental (aria-hidden), drawn with currentColor.
 */
export function ContourLines({ className }: { className?: string }) {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className} fill="none" stroke="currentColor">
      {rings.map((i) => {
        const s = 1 - i * 0.085;
        const wobble = (i % 3) * 6;
        return (
          <path
            key={i}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
            transform={`translate(${200 - 200 * s} ${200 - 200 * s}) scale(${s})`}
            d={`M200 ${18 + wobble}C${300 + wobble} ${22} ${386} ${96 - wobble} ${380} ${196}C${374 + wobble} ${300} ${296} ${384 - wobble} ${196} ${380}C${98} ${376 + wobble} ${16 + wobble} ${306} ${22} ${204}C${28} ${104 + wobble} ${104 - wobble} ${16} 200 ${18 + wobble}Z`}
          />
        );
      })}
    </svg>
  );
}
