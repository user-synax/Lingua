"use client";

// Props-driven MCQ card. No fetching, no scoring — parent owns answers.
export function SectionCard({ index, total, item, selected, onSelect }) {
  return (
    <div className="rounded-[14px] bg-white p-[18px] md:p-[22px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
        Question {index + 1} of {total}
      </p>
      <p className="mt-[8px] text-[15px] font-medium leading-[1.4] text-[var(--color-forest-ink)]">{item.prompt}</p>
      <div className="mt-[14px] grid gap-[8px]">
        {item.options.map((opt, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`min-h-[44px] rounded-[12px] border px-[14px] py-[10px] text-left text-[14px] transition-colors ${
                active
                  ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)]"
                  : "bg-white border-[var(--color-forest-ink)]/10 text-[var(--color-forest-ink)] hover:border-[var(--color-forest-ink)]/30 hover:bg-[var(--color-parchment)]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Free-text sample box for spoken (transcript stand-in) + written.
export function SampleInput({ id, label, hint, value, onChange, placeholder }) {
  const words = (value || "").trim() ? (value || "").trim().split(/\s+/).length : 0;
  return (
    <div className="rounded-[14px] bg-white p-[18px] md:p-[22px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <label htmlFor={id} className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
        {label}
      </label>
      <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">{hint}</p>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-[12px] w-full rounded-[12px] border border-[var(--color-mist)]/30 bg-white px-[14px] py-[12px] text-[14px] leading-[1.5] outline-none focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"
      />
      <p className="mt-[8px] text-[11px] text-[var(--color-mist)]">{words} words · aim for 2–3 sentences</p>
    </div>
  );
}

// Result card: band + skill snapshot + can-dos + stub disclaimer.
export function BandResult({ result, targetName }) {
  if (!result) return null;
  const skills = [
    { k: "Listening", v: result.skills.listening },
    { k: "Reading", v: result.skills.reading },
    { k: "Speaking", v: result.skills.speaking },
    { k: "Writing", v: result.skills.writing },
  ];
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[20px] md:p-[24px] border border-[var(--color-forest-ink)]/10">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Your band · mock estimate</p>
        <div className="mt-[8px] flex items-baseline gap-[10px]">
          <span className="text-[47px] font-medium leading-none tracking-[-0.02em] text-[var(--color-forest-ink)]">{result.band}</span>
          <span className="text-[13px] text-[var(--color-lichen-gray)]">{targetName} · working toward {result.next}</span>
        </div>
        <div className="mt-[14px] grid grid-cols-2 md:grid-cols-4 gap-[8px]">
          {skills.map((s) => (
            <div key={s.k} className="rounded-[12px] bg-white p-[10px] border border-[var(--color-forest-ink)]/10 text-center">
              <p className="text-[16px] font-medium leading-none text-[var(--color-forest-ink)]">{s.v}/5</p>
              <p className="mt-[4px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">{s.k}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Can-do snapshot</p>
        <ul className="mt-[10px] grid gap-[8px] text-[13px] text-[var(--color-forest-ink)]">
          {result.canDos.map((c) => (
            <li key={c} className="rounded-[10px] bg-[var(--color-parchment)] px-[12px] py-[10px] border border-[var(--color-forest-ink)]/5">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-[10px] text-[11px] leading-[1.5] text-[var(--color-mist)]">{result.disclaimer}</p>
      </div>
    </div>
  );
}
