"use client";

export function Button({
  variant = "filled",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap";

  const sizes = {
    md: "h-[44px] px-[18px] text-[14px] leading-none",
    lg: "h-[48px] px-[22px] text-[15px] leading-none",
    sm: "h-[44px] px-[16px] text-[13px] leading-none",
  };

  const variants = {
    filled:
      "bg-[var(--color-forest-ink)] text-white hover:opacity-[0.92] active:opacity-[0.88] shadow-[var(--shadow-md)]",
    outlined:
      "bg-transparent text-[var(--color-forest-ink)] border-[1.5px] border-[var(--color-forest-ink)] hover:bg-[var(--color-forest-ink)] hover:text-white",
    ghost:
      "bg-transparent text-[var(--color-forest-ink)] hover:bg-white border border-transparent",
    subtle:
      "bg-white text-[var(--color-forest-ink)] border border-[var(--color-mist)]/30 hover:border-[var(--color-forest-ink)]",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} rounded-[var(--radius-buttons)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
