"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { realityCheck } from "@/lib/plan";
import { LISTENING_ITEMS, READING_ITEMS, placementBand } from "@/lib/placement";
import AuthGuard from "@/components/guards/AuthGuard";
import RealityCheck from "@/components/plan/RealityCheck";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

const LANG_NAMES = { de: "German", es: "Spanish", fr: "French", ja: "Japanese", pt: "Portuguese", en: "English", it: "Italian", ko: "Korean" };
const PLACEMENT_STORE_KEY = "lingua.placement.mock.v1";

// Read-only: show saved mock placement band if the learner completed it
// on this device. Band feeds realityCheck() as starting level (PRD ON-2 → ON-3).
function loadPlacementBand() {
  if (typeof window === "undefined") return null;
  try {
    const saved = JSON.parse(localStorage.getItem(PLACEMENT_STORE_KEY)) || {};
    const listeningDone = LISTENING_ITEMS.every((_, i) => saved.listening?.[i] !== undefined);
    const readingDone = READING_ITEMS.every((_, i) => saved.reading?.[i] !== undefined);
    const spokenDone = (saved.spoken || "").trim().length >= 20;
    const writingDone = (saved.writing || "").trim().length >= 20;
    if (!listeningDone || !readingDone || !spokenDone || !writingDone) return null;
    return placementBand({
      listening: LISTENING_ITEMS.map((_, i) => saved.listening[i]),
      reading: READING_ITEMS.map((_, i) => saved.reading[i]),
      spoken: saved.spoken,
      writing: saved.writing,
    });
  } catch {
    return null;
  }
}

function PlanInner() {
  const router = useRouter();
  const [onboarding, setOnboarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [overridden, setOverridden] = useState(false);
  const [placement] = useState(loadPlacementBand);

  useEffect(() => {
    api
      .getOnboarding()
      .then((d) => setOnboarding(d.onboarding || null))
      .catch((e) => setLoadError(e.data?.error || e.message || "Couldn’t load your plan"))
      .finally(() => setLoading(false));
  }, []);

  const check = useMemo(() => {
    if (!onboarding) return null;
    return realityCheck({
      goal: onboarding.goal || "career",
      hoursPerWeek: onboarding.hours || 6,
      deadline: onboarding.deadline || null,
      startingBand: placement?.band || null,
    });
  }, [onboarding, placement]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--color-parchment)]">
        <p className="text-[14px] text-[var(--color-lichen-gray)]">Loading your plan…</p>
      </div>
    );
  }

  const targetName = onboarding?.target ? LANG_NAMES[onboarding.target] || onboarding.target : "your language";
  const canContinue = !check || check.tone !== "off" || overridden;

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[10px]">
            <a href="/onboarding" className="hidden md:inline text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)]">
              Edit plan
            </a>
            <a href="/dashboard" className="text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)]">
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[20px]">
        {loadError && (
          <div className="rounded-[12px] bg-red-50 border border-red-200 px-[14px] py-[12px] text-[13px] text-red-700">
            {loadError}
          </div>
        )}

        {!onboarding || !onboarding.target ? (
          <div className="rounded-[14px] bg-[var(--color-buttercream)] border border-[var(--color-forest-ink)]/10 px-[16px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[12px]">
            <div>
              <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">No plan yet — finish the 90-second setup first.</p>
              <p className="text-[13px] text-[var(--color-lichen-gray)]">Language, goal, hours and windows feed the reality check.</p>
            </div>
            <Button variant="filled" size="sm" onClick={() => router.push("/onboarding")}>
              Go to onboarding →
            </Button>
          </div>
        ) : (
          <>
            {placement && (
              <div className="rounded-[14px] bg-[var(--color-mint-surface)] border border-[var(--color-forest-ink)]/10 p-[18px] shadow-[var(--shadow-md)] flex flex-col md:flex-row md:items-center justify-between gap-[12px]">
                <div>
                  <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">
                    Placed at {placement.band} (mock) — working toward {placement.next}.
                  </p>
                  <p className="text-[13px] text-[var(--color-lichen-gray)]">
                    Math below is adjusted for starting level (mock estimate).
                  </p>
                </div>
                <Button variant="outlined" size="sm" className="shrink-0 self-start md:self-center" onClick={() => router.push("/placement")}>
                  Retake placement →
                </Button>
              </div>
            )}
            <RealityCheck
              check={check}
              targetName={targetName}
              placement={placement}
              overridden={overridden}
              onEditPlan={() => router.push("/onboarding")}
              onOverride={() => setOverridden(true)}
            />

            <div className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Your week · {onboarding.timezone || "—"}</p>
              <p className="mt-[6px] text-[13px] text-[var(--color-lichen-gray)]">
                {onboarding.hours || 6}h/week · {onboarding.availability ? Object.values(onboarding.availability).filter(Boolean).length : 0} windows · cohorts of 4 · 60-min classes (28 min avatar-on)
              </p>
              <div className="mt-[12px] flex flex-wrap gap-[10px]">
                <Button variant="outlined" size="sm" onClick={() => router.push("/onboarding")}>
                  ← Edit plan
                </Button>
                <Button variant="outlined" size="sm" onClick={() => router.push("/placement")}>
                  Take 10-min placement →
                </Button>
                <Button variant="filled" size="sm" disabled={!canContinue} onClick={() => router.push("/dashboard")}>
                  {check?.tone === "off" && !overridden ? "Override to continue" : "Confirm — go to dashboard →"}
                </Button>
              </div>
              {check?.tone === "off" && !overridden && (
                <p className="mt-[8px] text-[11px] text-[var(--color-mist)]">Tap “Override — continue anyway” above first. We keep it honest before payment.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function PlanPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm">Loading…</div>}>
        <PlanInner />
      </Suspense>
    </AuthGuard>
  );
}
