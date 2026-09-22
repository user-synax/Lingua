"use client";

export function Input({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`h-[44px] w-full rounded-[var(--radius-inputs)] bg-white border px-[14px] text-[14px] leading-none placeholder:text-[var(--color-mist)] transition-colors outline-none
          ${error ? "border-red-400 focus:border-red-500" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="text-[12px] leading-[1.3] text-[var(--color-lichen-gray)]">
          {hint}
        </p>
      )}
      {error && (
        <p className="text-[12px] leading-[1.3] text-red-600">{error}</p>
      )}
    </div>
  );
}

export function Select({ label, hint, error, id, children, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`h-[44px] w-full appearance-none rounded-[var(--radius-inputs)] bg-white border px-[14px] pr-[36px] text-[14px] leading-none transition-colors outline-none
          ${error ? "border-red-400" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"}
          `}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[var(--color-lichen-gray)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {hint && !error && (
        <p className="text-[12px] leading-[1.3] text-[var(--color-lichen-gray)]">{hint}</p>
      )}
      {error && <p className="text-[12px] leading-[1.3] text-red-600">{error}</p>}
    </div>
  );
}
