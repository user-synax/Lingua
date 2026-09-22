export function PillBadge({ children, className = "", withArrow = false }) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-[var(--radius-badges)] bg-[var(--color-meadow)] border border-[var(--color-forest-ink)] px-[11px] py-[7px] text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-forest-ink)] leading-none ${className}`}
    >
      {children}
      {withArrow && (
        <span className="inline-flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[var(--color-forest-ink)] text-white text-[10px] leading-none">
          →
        </span>
      )}
    </span>
  );
}

export function PastelCard({ variant = "mint", className = "", children, ...props }) {
  const bg = {
    mint: "bg-[var(--color-mint-surface)]",
    lime: "bg-[var(--color-lime-surface)]",
    lavender: "bg-[var(--color-lavender-surface)]",
    blush: "bg-[var(--color-blush-surface)]",
    buttercream: "bg-[var(--color-buttercream)]",
    sage: "bg-[var(--color-sage-glow)]",
    petal: "bg-[var(--color-petal)]",
  };
  return (
    <div
      className={`rounded-[var(--radius-cards)] ${bg[variant] || bg.mint} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
