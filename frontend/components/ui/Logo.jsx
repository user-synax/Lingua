export function LinguaLogo({ size = "md" }) {
  const sizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
  };
  return (
    <a href="/" className="inline-flex items-center gap-[10px] no-underline">
      <span className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[9px] bg-[var(--color-forest-ink)] text-white">
        {/* petal flower icon — botanical */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="2.4" fill="white" opacity="0.95" />
          <ellipse cx="9" cy="3.6" rx="2.8" ry="3.2" fill="#cdface" opacity="0.95" />
          <ellipse cx="9" cy="14.4" rx="2.8" ry="3.2" fill="#e1e1fa" opacity="0.95" />
          <ellipse cx="3.6" cy="9" rx="3.2" ry="2.8" fill="#e4f7f9" opacity="0.95" />
          <ellipse cx="14.4" cy="9" rx="3.2" ry="2.8" fill="#fff3c2" opacity="0.95" />
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
