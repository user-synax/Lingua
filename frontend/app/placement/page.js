"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LISTENING_ITEMS, READING_ITEMS, placementBand } from "@/lib/placement";
import AuthGuard from "@/components/guards/AuthGuard";
import { BandResult, SampleInput, SectionCard } from "@/components/placement/PlacementCards";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

const STEPS = ["Listening", "Reading", "Speaking", "Writing", "Result"];
const STORE_KEY = "lingua.placement.mock.v1";

// Lazy initializer: restores an unfinished attempt on this device only
// (frontend mock, no backend). Guarded for static prerender (no window).
function loadSaved() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function fmtElapsed(ms) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function PlacementInner() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [saved] = useState(loadSaved);
  const [listening, setListening] = useState(saved.listening || {});
  const [reading, setReading] = useState(saved.reading || {});
  const [spoken, setSpoken] = useState(saved.spoken || "");
  const [writing, setWriting] = useState(saved.writing || "");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // Persist unfinished attempt on this device only (no setState here).
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ listening, reading, spoken, writing }));
    } catch {}
  }, [listening, reading, spoken, writing]);

  const result = useMemo(() => {
    if (!done) return null;
    return placementBand({
      listening: LISTENING_ITEMS.map((_, i) => listening[i]),
      reading: READING_ITEMS.map((_, i) => reading[i]),
      spoken,
      writing,
    });
  }, [done, listening, reading, spoken, writing]);

  const canNext =
    step === 0
      ? LISTENING_ITEMS.every((_, i) => listening[i] !== undefined)
      : step === 1
        ? READING_ITEMS.every((_, i) => reading[i] !== undefined)
        : step === 2
          ? spoken.trim().length >= 20
          : step === 3
            ? writing.trim().length >= 20
            : true;

  function next() {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      setStep(4);
    }
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="sticky top-0 z-20 border-b border-[var(--color-forest-ink)]/10 bg-[var(--color-parchment)]/85 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[10px] text-[13px]">
            <span className="text-[var(--color-lichen-gray)] tabular-nums">{fmtElapsed(now - startedAt)} · aim 10–15 min</span>
            <span className="hidden md:inline h-[14px] w-px bg-[var(--color-forest-ink)]/15" />
            <span className="hidden md:inline font-medium text-[var(--color-forest-ink)]">
              Step {Math.min(step + 1, STEPS.length)} of {STEPS.length} · {STEPS[Math.min(step, STEPS.length - 1)]}
            </span>
          </div>
        </div>
        <div className="h-[3px] w-full bg-[var(--color-forest-ink)]/8">
          <div className="h-full bg-[var(--color-forest-ink)] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[720px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[18px]">
        <div>
          <PillBadge withArrow>Placement · mock</PillBadge>
          <h1 className="mt-[12px] text-[28px] md:text-[36px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            {step === 0 && "Listen, then choose."}
            {step === 1 && "Read, then choose."}
            {step === 2 && "Tell us about yourself."}
            {step === 3 && "Write a few lines."}
            {step === 4 && "Your estimate."}
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
            {step <= 1 && "Read each item aloud in your head as if you heard it. One answer each."}
            {step === 2 && "Type what you would say aloud (2–3 sentences). Real placement scores your voice — this mock scores the words."}
            {step === 3 && "A short note — a trip, your week, why you learn. 2–3 sentences minimum."}
            {step === 4 && "Mock band only — adaptive items + human check come later (PRD ON-2)."}
          </p>
        </div>

        <div className="flex gap-[8px]">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col gap-[6px]">
              <div className={`h-[6px] rounded-full ${i <= step ? "bg-[var(--color-forest-ink)]" : "bg-[var(--color-forest-ink)]/12"}`} />
              <p className={`hidden md:block text-[11px] tracking-[0.06em] uppercase ${i === step ? "text-[var(--color-forest-ink)] font-medium" : "text-[var(--color-mist)]"}`}>{s}</p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-[14px]">
            {LISTENING_ITEMS.map((item, i) => (
              <SectionCard key={item.id} index={i} total={LISTENING_ITEMS.length} item={item} selected={listening[i]} onSelect={(v) => setListening((p) => ({ ...p, [i]: v }))} />
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-[14px]">
            {READING_ITEMS.map((item, i) => (
              <SectionCard key={item.id} index={i} total={READING_ITEMS.length} item={item} selected={reading[i]} onSelect={(v) => setReading((p) => ({ ...p, [i]: v }))} />
            ))}
          </div>
        )}

        {step === 2 && (
          <SampleInput
            id="spoken"
            label="Spoken sample (typed stand-in)"
            hint="e.g. where you live, what you do, one thing you did last week."
            value={spoken}
            onChange={setSpoken}
            placeholder="I live in… I work as… Last week I…"
          />
        )}

        {step === 3 && (
          <SampleInput
            id="writing"
            label="Written sample"
            hint="Same topic or a new one — a few connected lines."
            value={writing}
            onChange={setWriting}
            placeholder="Last month I travelled to… because…"
          />
        )}

        {step === 4 && result && (
          <>
            <BandResult result={result} targetName="your language" />
            <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
              <p className="text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
                Saved on this device only. Next: see how this band fits your goal and deadline.
              </p>
              <div className="mt-[12px] flex flex-wrap gap-[10px]">
                <Button variant="filled" size="sm" onClick={() => router.push("/plan")}>
                  See reality check →
                </Button>
                <Button variant="outlined" size="sm" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
              </div>
            </div>
          </>
        )}

        {step < 4 && (
          <div className="flex items-center justify-between gap-[12px] border-t border-[var(--color-forest-ink)]/10 pt-[16px]">
            <Button variant="outlined" size="sm" onClick={() => (step === 0 ? router.push("/dashboard") : setStep((s) => s - 1))}>
              ← {step === 0 ? "Exit" : "Back"}
            </Button>
            <Button variant="filled" size="sm" disabled={!canNext} onClick={next}>
              {step < 3 ? "Continue →" : "See my band →"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PlacementPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm">Loading…</div>}>
        <PlacementInner />
      </Suspense>
    </AuthGuard>
  );
}
