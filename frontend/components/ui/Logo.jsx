export function LinguaLogo({ size = "md" }) {
  const sizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
  };
  const tiles = {
    sm: "h-[28px] w-[28px] rounded-[8px]",
    md: "h-[32px] w-[32px] rounded-[9px]",
    lg: "h-[38px] w-[38px] rounded-[11px]",
  };
  return (
    <a href="/" className="inline-flex items-center gap-[10px] no-underline" aria-label="Lingua home">
      <span
        className={`inline-flex items-center justify-center bg-[var(--color-forest-ink)] text-white shadow-[var(--shadow-md)] ${tiles[size]}`}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-[62%] w-[62%]">
          {/* ascending bars: measurable progress, A1 to C1 — square-cut, grid-built */}
          <rect x="4.9" y="10.6" width="2.7" height="5.4" rx="0.6" fill="white" />
          <rect x="8.65" y="7.6" width="2.7" height="8.4" rx="0.6" fill="white" />
          <rect x="12.4" y="4.6" width="2.7" height="11.4" rx="0.6" fill="white" />
          {/* meadow baseline: evidence, not points */}
          <rect x="4.9" y="16.6" width="10.2" height="1.4" rx="0.7" fill="#cdface" />
        </svg>
      </span>
      <span
        className={`font-medium text-[var(--color-forest-ink)] ${sizes[size]}`}
        style={{ letterSpacing: "-0.03em" }}
      >
        Lingua
      </span>
    </a>
  );
}
