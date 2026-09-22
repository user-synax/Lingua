"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import AuthGuard from "@/components/guards/AuthGuard";
import BottomNav from "@/components/nav/BottomNav";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "today";
  const { user, logout } = useAuth();
  const [onboarding, setOnboarding] = useState(null);
  const [loadingOnboarding, setLoadingOnboarding] = useState(true);

  useEffect(() => {
    api
      .getOnboarding()
      .then((d) => setOnboarding(d.onboarding))
      .catch(() => {})
      .finally(() => setLoadingOnboarding(false));
  }, []);

  const langNames = { de: "German", es: "Spanish", fr: "French", ja: "Japanese", pt: "Portuguese", en: "English", it: "Italian", ko: "Korean" };
  const targetName = onboarding?.target ? langNames[onboarding.target] || onboarding.target : "—";
  const hours = onboarding?.hours ?? 6;
  const tz = onboarding?.timezone ?? "Asia/Kolkata";
  const windowsCount = onboarding?.availability ? Object.values(onboarding.availability).filter(Boolean).length : 0;

  // if not onboarded, nudge
  const needsOnboarding = !loadingOnboarding && (!onboarding?.target || !onboarding?.completed);

  if (needsOnboarding && tab !== "today") {
    // still show but hint banner
  }

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col pb-[88px] md:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[10px]">
            <span className="hidden md:inline text-[12px] text-[var(--color-lichen-gray)]">
              {user?.email} · {tz}
            </span>
            <Button variant="ghost" size="sm" onClick={() => router.push("/account")} className="hidden md:inline-flex">
              Account
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[20px] animate-fade-in">
        {needsOnboarding && (
          <div className="animate-slide-up rounded-[14px] bg-[var(--color-buttercream)] border border-[var(--color-forest-ink)]/10 px-[16px] py-[14px] flex flex-col md:flex-row md:items-center justify-between gap-[12px]">
            <div>
              <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">Finish your 90-second setup to unlock your timetable.</p>
              <p className="text-[12px] text-[var(--color-lichen-gray)]">Pick language, goal and weekly windows — then we match you to a cohort of 4.</p>
            </div>
            <Button variant="filled" size="sm" onClick={() => router.push("/onboarding")} className="shrink-0">
              Complete onboarding →
            </Button>
          </div>
        )}

        {/* Tab: Today */}
        {(!tab || tab === "today") && (
          <div key="today" className="flex flex-col gap-[18px] animate-slide-up-soft">
            <div className="flex flex-col gap-[10px]">
              <PillBadge withArrow>Today · {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}</PillBadge>
              <h1 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em] leading-[0.95] text-[var(--color-forest-ink)]">
                Morning, {user?.name?.split(" ")[0] || "there"}.
                <span className="block text-[var(--color-lichen-gray)] font-normal text-[16px] md:text-[18px] tracking-normal mt-[6px] leading-[1.4]">
                  {onboarding?.completed ? `${targetName} · ${onboarding?.goal || "career"} · ${hours}h/week` : "Your timetable is waiting — complete onboarding to see your next class."}
                </span>
              </h1>
            </div>

            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-[14px] stagger">
              {/* Next class hero */}
              <div className="rounded-[14px] bg-[var(--color-forest-ink)] text-white p-[20px] md:p-[24px] shadow-[var(--shadow-md)] lift relative overflow-hidden">
                <div className="absolute -right-[40px] -top-[40px] h-[140px] w-[140px] rounded-full opacity-20" style={{ background: "var(--gradient-halo)" }} aria-hidden />
                <p className="text-[11px] tracking-[0.08em] uppercase text-white/60">Next live class</p>
                <p className="mt-[8px] text-[20px] font-medium leading-[1.1]">
                  {onboarding?.completed ? "Mon + Wed · 19:00–20:00" : "— · Not scheduled yet"}
                  <span className="block text-[13px] font-normal text-white/70 mt-[4px]">{tz} · Cohort 4 · 60 min (28 min avatar-on)</span>
                </p>
                <div className="mt-[16px] flex gap-[8px] flex-wrap">
                  <span className="rounded-full bg-white text-[var(--color-forest-ink)] px-[10px] py-[6px] text-[11px] font-medium">Warm-up → Teach → Practice → Recap</span>
                  <span className="rounded-full bg-white/15 text-white px-[10px] py-[6px] text-[11px]">Doubts live · 1.5s ack</span>
                </div>
                <div className="mt-[18px] flex gap-[8px]">
                  <Button variant="filled" size="sm" className="!bg-white !text-[var(--color-forest-ink)] hover:!bg-[var(--color-parchment)]" onClick={() => {}}>
                    Join · Board →
                  </Button>
                  <Button variant="outlined" size="sm" className="!border-white/30 !text-white hover:!bg-white/10" onClick={() => router.push("/dashboard?tab=classes")}>
                    View timetable
                  </Button>
                </div>
                <p className="mt-[12px] text-[11px] text-white/60">Low-bandwidth auto-fallback: audio + Board at ~300 kbps. Camera optional, mic required.</p>
              </div>

              {/* Quick stats */}
              <div className="grid gap-[12px]">
                <div className="rounded-[14px] bg-white p-[16px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">This week</p>
                    <span className="rounded-full bg-[var(--color-meadow)] px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">{hours}h plan</span>
                  </div>
                  <div className="mt-[12px] grid grid-cols-3 gap-[8px] text-center">
                    {[
                      { k: "Live", v: "2h", sub: "Mon/Wed" },
                      { k: "Async", v: `${(hours - 2).toFixed(0)}h`, sub: "Review+HW" },
                      { k: "Talk", v: "≥60%", sub: "in practice" },
                    ].map((s) => (
                      <div key={s.k} className="rounded-[12px] bg-[var(--color-parchment)] p-[10px] border border-[var(--color-forest-ink)]/5">
                        <p className="text-[16px] font-medium text-[var(--color-forest-ink)] leading-none">{s.v}</p>
                        <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)] mt-[4px]">{s.k}</p>
                        <p className="text-[11px] text-[var(--color-lichen-gray)]">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[14px] bg-[var(--color-lime-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
                  <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Study streak? No — attendance.</p>
                  <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">No XP, no hearts. Your attendance is a plain record — 3 windows → 3 cohorts matched, {windowsCount} windows selected.</p>
                  <a href="/dashboard?tab=progress" className="mt-[8px] inline-flex text-[12px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
                    See can-do progress →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid md:grid-cols-3 gap-[12px] stagger">
              {[
                { t: "10-min review", d: "Spaced deck from your last errors", bg: "bg-[var(--color-mint-surface)]", cta: "Start review →" },
                { t: "Homework · 15 min", d: "Targeted at your goal patterns", bg: "bg-[var(--color-lavender-surface)]", cta: "Open homework →" },
                { t: "Practice room", d: "1:1 audio coach — no avatar, cheap", bg: "bg-[var(--color-blush-surface)]", cta: "Enter room →" },
              ].map((c) => (
                <div key={c.t} className={`rounded-[14px] p-[16px] border border-[var(--color-forest-ink)]/5 ${c.bg} lift`}>
                  <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">{c.t}</p>
                  <p className="mt-[4px] text-[12px] text-[var(--color-lichen-gray)] leading-[1.4]">{c.d}</p>
                  <button className="mt-[10px] text-[12px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">{c.cta}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "classes" && (
          <div key="classes" className="flex flex-col gap-[16px] animate-slide-up-soft">
            <div className="flex items-baseline justify-between gap-[12px]">
              <h2 className="text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Your week</h2>
              <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">{tz} · 60 min classes</span>
            </div>

            <div className="rounded-[14px] bg-white p-[18px] md:p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] overflow-x-auto">
              <div className="min-w-[560px] grid grid-cols-[72px_repeat(7,1fr)] gap-[6px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">
                <span />
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-center py-[4px]">
                    {d}
                  </span>
                ))}
              </div>
              {[
                { label: "Morning", sub: "8–12", row: ["", "·", "·", "·", "·", "90%", "·"] },
                { label: "Afternoon", sub: "12–17", row: ["·", "·", "·", "·", "·", "·", "·"] },
                { label: "Evening", sub: "17–22", row: ["Cohort A", "·", "Cohort A", "·", "·", "·", "·"] },
              ].map((r) => (
                <div key={r.label} className="mt-[8px] min-w-[560px] grid grid-cols-[72px_repeat(7,1fr)] gap-[6px]">
                  <div className="flex flex-col justify-center rounded-[10px] bg-[var(--color-parchment)] px-[8px] py-[10px] border border-[var(--color-forest-ink)]/8">
                    <span className="text-[12px] font-medium text-[var(--color-forest-ink)] leading-none">{r.label}</span>
                    <span className="text-[11px] text-[var(--color-lichen-gray)] leading-none">{r.sub}</span>
                  </div>
                  {r.row.map((cell, i) => (
                    <div
                      key={i}
                      className={`h-[46px] grid place-items-center rounded-[12px] border text-[11px] font-medium ${
                        cell.includes("Cohort") ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)]" : cell === "90%" ? "bg-[var(--color-meadow)] text-[var(--color-forest-ink)] border-[var(--color-forest-ink)]/10" : "bg-white border-[var(--color-forest-ink)]/10 text-[var(--color-lichen-gray)]"
                      }`}
                    >
                      {cell || "·"}
                    </div>
                  ))}
                </div>
              ))}
              <p className="mt-[12px] text-[11px] text-[var(--color-mist)]">Cohort A: Mon + Wed 19:00 · Sat 10:15 review · {windowsCount} windows selected</p>
            </div>

            <div className="grid md:grid-cols-2 gap-[12px]">
              <div className="rounded-[14px] bg-white p-[16px] border border-[var(--color-forest-ink)]/10">
                <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Upcoming</p>
                <ul className="mt-[10px] grid gap-[8px] text-[13px] text-[var(--color-lichen-gray)]">
                  <li className="flex justify-between rounded-[10px] bg-[var(--color-parchment)] px-[12px] py-[10px] border border-[var(--color-forest-ink)]/5">
                    <span>Mon 19:00 · Teach + Practice</span>
                    <span className="font-medium text-[var(--color-forest-ink)]">Join</span>
                  </li>
                  <li className="flex justify-between rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10">
                    <span>Wed 19:00 · Production task</span>
                    <span className="text-[var(--color-mist)]">Scheduled</span>
                  </li>
                  <li className="flex justify-between rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10">
                    <span>Sat 10:15 · Review deck</span>
                    <span className="text-[var(--color-mist)]">Async</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
                <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">After class</p>
                <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">Recap: corrections, parked doubts answered, talk share, transcript. Homework 10–15 min, spaced deck auto-built from your mistakes.</p>
                <Button variant="outlined" size="sm" className="mt-[12px] bg-white" onClick={() => router.push("/dashboard?tab=progress")}>
                  View last recap →
                </Button>
              </div>
            </div>
          </div>
        )}

        {tab === "progress" && (
          <div key="progress" className="flex flex-col gap-[16px] animate-slide-up-soft">
            <h2 className="text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Progress — evidence, not XP</h2>

            <div className="grid md:grid-cols-2 gap-[12px] stagger">
              {[
                { skill: "Speaking", level: "B1 · 3.4/5", pct: 68, tint: "mint", note: "Can describe past trip with weil/dass — clip 12s" },
                { skill: "Listening", level: "B1 · 3.1/5", pct: 62, tint: "lime", note: "Follows class instruction at 1.0× — transcript" },
                { skill: "Reading", level: "B2 · 3.8/5", pct: 76, tint: "lavender", note: "Can infer meaning of unknown word — Board note" },
                { skill: "Writing", level: "A2 · 2.9/5", pct: 58, tint: "buttercream", note: "Verb-final still wobbly — 3 recasts logged" },
              ].map((s) => (
                <div key={s.skill} className={`rounded-[14px] p-[16px] border border-[var(--color-forest-ink)]/5 ${s.tint === "mint" ? "bg-[var(--color-mint-surface)]" : s.tint === "lime" ? "bg-[var(--color-lime-surface)]" : s.tint === "lavender" ? "bg-[var(--color-lavender-surface)]" : "bg-[var(--color-blush-surface)]"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">{s.skill}</p>
                    <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-lichen-gray)]">{s.level}</span>
                  </div>
                  <div className="mt-[10px] h-[6px] rounded-full bg-white border border-[var(--color-forest-ink)]/10 overflow-hidden">
                    <div className="h-full bg-[var(--color-forest-ink)] transition-all duration-500" style={{ width: `${s.pct}%` }} />
                  </div>
                  <p className="mt-[8px] text-[12px] text-[var(--color-lichen-gray)] leading-[1.4]">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Can-do statements</p>
              <ul className="mt-[10px] grid gap-[8px] text-[13px]">
                <li className="flex items-center gap-[10px] rounded-[10px] bg-[var(--color-sage-glow)] px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10">
                  <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-[var(--color-forest-ink)] text-white text-[10px]">✓</span>
                  <span className="flex-1 text-[var(--color-forest-ink)]">Can give reasons with weil — evidenced 09-18 clip</span>
                  <span className="text-[11px] text-[var(--color-lichen-gray)]">B1</span>
                </li>
                <li className="flex items-center gap-[10px] rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10">
                  <span className="grid h-[20px] w-[20px] place-items-center rounded-full border border-[var(--color-forest-ink)]/20 text-[10px]">·</span>
                  <span className="flex-1 text-[var(--color-lichen-gray)]">Can narrate past with Perfekt — 2/3 examples correct</span>
                  <span className="text-[11px] text-[var(--color-mist)]">In progress</span>
                </li>
                <li className="flex items-center gap-[10px] rounded-[10px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10">
                  <span className="grid h-[20px] w-[20px] place-items-center rounded-full border border-[var(--color-forest-ink)]/20 text-[10px]">·</span>
                  <span className="flex-1 text-[var(--color-lichen-gray)]">Can handle doubt Q&A in target language 80% — talk share 64%</span>
                  <span className="text-[11px] text-[var(--color-mist)]">Next unit</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[14px] bg-[var(--color-parchment)] p-[16px] border border-[var(--color-forest-ink)]/10">
              <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Attendance — plain record</p>
              <div className="mt-[10px] flex gap-[6px]">
                {["✓", "✓", "—", "·", "·", "·", "·"].map((c, i) => (
                  <span key={i} className={`grid h-[28px] w-[28px] place-items-center rounded-full text-[11px] font-medium border ${c === "✓" ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)]" : c === "—" ? "bg-white border-[var(--color-forest-ink)]/20 text-[var(--color-lichen-gray)]" : "bg-white border-dashed border-[var(--color-mist)]/30 text-[var(--color-mist)]"}`}>
                    {c}
                  </span>
                ))}
                <span className="ml-[8px] self-center text-[11px] text-[var(--color-mist)]">No streaks. Missed → recording + 2-click replan.</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm">Loading…</div>}>
        <DashboardInner />
      </Suspense>
    </AuthGuard>
  );
}
