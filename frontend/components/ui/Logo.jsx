// Wordmark-first logo, after the masters:
// - Rand: one idea, nothing decorative. No tile, no icon.
// - Haviv: "a logo is the period at the end of a sentence" — the single
//   meadow full-stop is the brand idea: every doubt answered.
// - Leader: clarity at any size — pure type survives 16px favicons to
//   billboards. Vercel/Linear/Notion all ship wordmark-only logos.
export function LinguaLogo({ size = "md" }) {
  const sizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[28px]",
  };
  return (
    <a href="/" className="inline-flex items-baseline no-underline" aria-label="Lingua home">
      <span
        className={`font-medium text-[var(--color-forest-ink)] ${sizes[size]}`}
        style={{ letterSpacing: "-0.035em" }}
      >
        Lingua
      </span>
      <span
        aria-hidden
        className="ml-[0.08em] inline-block h-[0.34em] w-[0.34em] translate-y-[-0.04em] rounded-full bg-[var(--color-deep-forest)]"
      />
    </a>
  );
}
