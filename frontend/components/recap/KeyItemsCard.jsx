"use client";

// PRD AC-1 — Key items (third recap section: new vocabulary and target
// forms from the class, per PL-1).
// Presentational only: renders term + gloss rows when items exist,
// otherwise the empty state. No API, no backend.

export default function KeyItemsCard({ items = [] }) {
  return (
    <section
      aria-label="Key items"
      className="rounded-[14px] bg-white p-[18px] md:p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]"
    >
      <div className="flex items-center justify-between gap-[10px]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
          Key items
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
            No key items yet
          </p>
          <p className="text-[12px] text-[var(--color-lichen-gray)] mt-[4px]">
            After your first class, the new words and target forms you
            learned appear here with glosses.
          </p>
        </div>
      ) : (
        <ul className="mt-[10px] grid gap-[8px]">
          {items.map((k, i) => (
            <li
              key={`${k.term}-${i}`}
              className="rounded-[12px] bg-[var(--color-parchment)] px-[14px] py-[12px] border border-[var(--color-forest-ink)]/5"
            >
              <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">
                {k.term}
              </p>
              {k.gloss && (
                <p className="text-[12px] text-[var(--color-lichen-gray)] mt-[4px]">
                  {k.gloss}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
