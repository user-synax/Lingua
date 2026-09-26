"use client";

// PRD AC-1 — Parked doubts answered (second recap section).
// Presentational only: renders question + answer rows when items exist,
// otherwise the empty state. No API, no backend.

export default function ParkedDoubtsCard({ items = [] }) {
  return (
    <section
      aria-label="Parked doubts answered"
      className="rounded-[14px] bg-white p-[18px] md:p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center justify-between gap-[10px]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
          Parked doubts answered
        </p>
        {items.length > 0 && (
          <span className="rounded-full bg-[var(--color-parchment)] px-[8px] py-[4px] text-[11px] text-[var(--color-lichen-gray)]">
            {items.length} total
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-[10px] rounded-[12px] border border-dashed border-[var(--color-forest-ink)]/15 bg-[var(--color-parchment)]/60 p-[16px] text-center">
          <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">
            No parked doubts yet
          </p>
          <p className="text-[12px] text-[var(--color-lichen-gray)] mt-[4px]">
            Ask anything mid-class — the tutor parks what can&apos;t be
            answered on the spot and answers it here by recap.
          </p>
        </div>
      ) : (
        <ul className="mt-[10px] grid gap-[8px]">
          {items.map((d, i) => (
            <li
              key={`${d.question}-${i}`}
              className="rounded-[12px] bg-[var(--color-parchment)] px-[14px] py-[12px] border border-[var(--color-forest-ink)]/5"
            >
              <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">
                {d.question}
              </p>
              {d.answer && (
                <p className="text-[12px] text-[var(--color-lichen-gray)] mt-[4px]">
                  {d.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
