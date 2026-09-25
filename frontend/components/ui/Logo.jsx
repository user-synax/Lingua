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
          {/* L stem + foot, optically centered, round caps */}
          <path
            d="M5.8 3.5v10.2h6.4"
            stroke="white"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* meadow full-stop: every doubt answered */}
          <circle cx="14.2" cy="13.7" r="1.7" fill="#cdface" />
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
