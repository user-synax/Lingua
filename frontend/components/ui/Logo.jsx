export function LinguaLogo({ size = "md" }) {
  const sizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
  };
  return (
    <a href="/" className="inline-flex items-center gap-[10px] no-underline">
      <span className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[9px] bg-[var(--color-forest-ink)] text-white">
        {/* geometric L — stem + foot, rounded caps, meadow tip */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M6.5 3.5v9h5.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <path d="M12 12.5h2.5" stroke="#cdface" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className={`font-medium tracking-[-0.02em] text-[var(--color-forest-ink)] ${sizes[size]}`}
        style={{ letterSpacing: "-0.02em" }}
      >
        Lingua
      </span>
    </a>
  );
}
