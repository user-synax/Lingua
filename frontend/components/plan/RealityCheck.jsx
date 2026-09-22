"use client";

import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Props-driven only — no fetching. Parent passes `check` from lib/plan.js
// realityCheck() plus display names. PRD ON-3: blunt verdict + override.
export default function RealityCheck({
  check,
  targetName = "your language",
  onEditPlan,
  onOverride,
  overridden = false,
}) {
  if (!check) return null;

  const toneStyles = {
    fit: "bg-[var(--color-meadow)]",
    tight: "bg-[var(--color-buttercream)]",
    off: "bg-[var(--color-blush-surface)]",
    "no-deadline": "bg-[var(--color-mint-surface)]",
  };
  const toneLabel = {
    fit: "Adds up ✓",
    tight: "Tight — adjustable",
    off: "Doesn’t add up yet",
    "no-deadline": "Pace preview",
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div>
        <PillBadge withArrow>Reality check · before payment</PillBadge>
        <h2 className="mt-[12px] text-[28px] md:text-[36px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
          {check.tone === "fit" && "Your plan holds."}
          {check.tone === "tight" && "Close — needs a tweak."}
          {check.tone === "off" && "Bluntly: not enough time."}
          {check.tone === "no-deadline" && "Here’s your pace."}
        </h2>
        <p className="mt-[8px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
          {targetName} · {check.blurb} ({check.target}) · {check.hoursPerWeek}h/week
          {check.weeksAvail !== null ? ` · ${check.weeksAvail} weeks left` : " · no deadline"}
        </p>
      </div>

      <div className={`rounded-[14px] p-[18px] md:p-[22px] border border-[var(--color-forest-ink)]/10 ${toneStyles[check.tone]}`}>
        <div className="flex items-center justify-between gap-[10px]">
          <span className="inline-flex rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[5px] text-[11px] font-medium text-white">
            {toneLabel[check.tone]}
          </span>
          <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-slate)]">
            ~{check.needLow}–{check.needHigh}h needed
          </span>
        </div>
        <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--color-forest-ink)]">{check.message}</p>

        {check.weeksAvail !== null && check.weeksAvail > 0 && (
          <div className="mt-[14px] grid grid-cols-3 gap-[8px] text-center">
            <div className="rounded-[12px] bg-white p-[10px] border border-[var(--color-forest-ink)]/10">
              <p className="text-[16px] font-medium leading-none text-[var(--color-forest-ink)]">{check.projected}h</p>
              <p className="mt-[4px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Projected</p>
            </div>
            <div className="rounded-[12px] bg-white p-[10px] border border-[var(--color-forest-ink)]/10">
              <p className="text-[16px] font-medium leading-none text-[var(--color-forest-ink)]">{check.needCentral}h</p>
              <p className="mt-[4px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Needed</p>
            </div>
            <div className="rounded-[12px] bg-white p-[10px] border border-[var(--color-forest-ink)]/10">
              <p className="text-[16px] font-medium leading-none text-[var(--color-forest-ink)]">~{check.neededWeekly}h</p>
              <p className="mt-[4px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Per week</p>
            </div>
          </div>
        )}

        {check.tone === "no-deadline" && (
          <div className="mt-[14px] rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10">
            <p className="text-[13px] text-[var(--color-forest-ink)]">
              Roughly <span className="font-medium">{check.monthsAtPace} months</span> at this pace for ~{check.needCentral}h. A CEFR level is 100–200h — we measure sub-levels, never “fluent in 90 days”.
            </p>
          </div>
        )}

        {check.tone === "off" && (
          <p className="mt-[10px] text-[12px] leading-[1.5] text-red-700">
            Gap: ~{check.gapHours}h. Options below — or override and proceed anyway. Your call is recorded before payment.
          </p>
        )}

        {overridden && (
          <p className="mt-[10px] inline-flex rounded-full bg-white border border-[var(--color-forest-ink)]/15 px-[10px] py-[5px] text-[11px] font-medium text-[var(--color-forest-ink)]">
            Override on — proceeding anyway ✓
          </p>
        )}
      </div>

      <div className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Your options</p>
        <div className="mt-[12px] flex flex-wrap gap-[10px]">
          <Button variant="outlined" size="sm" onClick={onEditPlan}>
            Adjust hours / deadline →
          </Button>
          {check.tone !== "fit" && !overridden && (
            <Button variant="filled" size="sm" onClick={onOverride}>
              Override — continue anyway
            </Button>
          )}
        </div>
        <p className="mt-[10px] text-[11px] leading-[1.5] text-[var(--color-mist)]">
          Shown before payment per PRD ON-3. Overriding never blocks you — it just keeps the math honest.
        </p>
      </div>

      <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[18px] border border-[var(--color-forest-ink)]/5">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Syllabus preview · PL-1 next</p>
        <ul className="mt-[10px] grid gap-[8px] text-[13px]">
          <li className="rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10 text-[var(--color-forest-ink)]">
            Unit 1 — Foundations · <span className="text-[var(--color-lichen-gray)]">can-do: introduce + ask about doubts</span>
          </li>
          <li className="rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10 text-[var(--color-lichen-gray)]">
            Unit 2 — Core patterns · <span>full lesson packs after placement (ON-2)</span>
          </li>
          <li className="rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10 text-[var(--color-lichen-gray)]">
            Unit 3 — Production · <span>mock + checkpoint per unit</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
