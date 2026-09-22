"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";
import { PillBadge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const LANGUAGES = [
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪", level: "A1 → B2" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸", level: "A1 → B2" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷", level: "A1 → B1" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵", level: "A1 → B1" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹", level: "A1 → B1" },
  { code: "en", name: "English", native: "English", flag: "🇬🇧", level: "A1 → C1" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹", level: "A1 → B1" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷", level: "A1 → B1" },
];

const NATIVE_LANGS = ["English", "Hindi", "Spanish", "French", "German", "Portuguese", "Japanese", "Korean", "Italian"];

const GOALS = [
  { id: "career", title: "Career move", desc: "B2 for work in 9 months — evenings only", icon: "◈", tint: "mint" },
  { id: "exam", title: "Exam", desc: "Visa / university speaking score", icon: "✦", tint: "lime" },
  { id: "family", title: "Family", desc: "Talk with partner's family", icon: "♡", tint: "lavender" },
  { id: "relocation", title: "Relocation", desc: "Daily life from day one", icon: "◎", tint: "buttercream" },
  { id: "travel", title: "Travel & culture", desc: "Deep, respectful conversation", icon: "↗", tint: "sage" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = [
  { id: "morn", label: "Morning", sub: "8–12" },
  { id: "aft", label: "Afternoon", sub: "12–17" },
  { id: "eve", label: "Evening", sub: "17–22" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = useState(1);
  const total = 3;

  const [target, setTarget] = useState("de");
  const [nativeLang, setNativeLang] = useState("English");
  const [goal, setGoal] = useState("career");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState(6);
  const [avail, setAvail] = useState(() => {
    const m = {};
    m["Mon-eve"] = true;
    m["Wed-eve"] = true;
    m["Sat-morn"] = true;
    return m;
  });
  const [tz, setTz] = useState("Asia/Kolkata");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/onboarding");
  }, [loading, user, router]);

  // Load existing onboarding
  useEffect(() => {
    if (!user) return;
    api
      .getOnboarding()
      .then((data) => {
        const o = data.onboarding || data.user?.onboarding || {};
        if (o.target) setTarget(o.target);
        if (o.nativeLang) setNativeLang(o.nativeLang);
        if (o.goal) setGoal(o.goal);
        if (o.deadline) setDeadline(o.deadline ? new Date(o.deadline).toISOString().slice(0, 10) : "");
        if (o.hours) setHours(o.hours);
        if (o.timezone) setTz(o.timezone);
        if (o.availability) {
          // backend returns Map-converted object
          const av = o.availability;
          const isEmpty = !av || Object.keys(av).length === 0;
          if (!isEmpty) setAvail(av);
        }
        if (o.completed) {
          // already done — keep in step view but show indicator
        }
      })
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, [user]);

  const toggleAvail = (d, s) => {
    const k = `${d}-${s}`;
    setAvail((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const countAvail = Object.values(avail).filter(Boolean).length;

  function canContinue() {
    if (step === 1) return !!target && !!nativeLang;
    if (step === 2) return !!goal && hours >= 3;
    if (step === 3) return countAvail >= 2;
    return false;
  }

  async function next() {
    setServerError("");
    const e = {};
    if (step === 1) {
      if (!target) e.target = "Pick a language";
      if (!nativeLang) e.nativeLang = "Required";
    }
    if (step === 2) {
      if (!goal) e.goal = "Pick a goal";
    }
    if (step === 3) {
      if (countAvail < 2) e.avail = "Select at least 2 windows so we can build a timetable";
    }
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < total) {
      // persist partial progress quietly
      try {
        await api.saveOnboarding({
          target,
          nativeLang,
          goal,
          deadline: deadline || null,
          hours,
          availability: avail,
          timezone: tz,
        });
      } catch {}
      setStep((s) => s + 1);
    } else {
      setSaving(true);
      try {
        await api.saveOnboarding({
          target,
          nativeLang,
          goal,
          deadline: deadline || null,
          hours,
          availability: avail,
          timezone: tz,
          completed: true,
        });
        router.push("/account?onboarded=1");
      } catch (err) {
        setServerError(err.data?.error || err.message || "Failed to save — check backend");
      } finally {
        setSaving(false);
      }
    }
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
    else router.push("/account");
  }

  const pct = Math.round((step / total) * 100);

  if (loading || initialLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--color-parchment)]">
        <p className="text-[14px] text-[var(--color-lichen-gray)]">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-parchment)]">
      <header className="sticky top-0 z-20 border-b border-[var(--color-forest-ink)]/10 bg-[var(--color-parchment)]/85 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px] gap-[16px]">
          <LinguaLogo />
          <div className="hidden md:flex items-center gap-[12px] text-[13px]">
            <span className="text-[var(--color-lichen-gray)]">Onboarding</span>
            <span className="h-[14px] w-px bg-[var(--color-forest-ink)]/15" />
            <span className="font-medium text-[var(--color-forest-ink)]">
              Step {step} of {total}
            </span>
            <span className="hidden lg:inline text-[12px] text-[var(--color-mist)]">· {user.email}</span>
          </div>
          <a href="/account" className="text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)]">
            Save & exit
          </a>
        </div>
        <div className="h-[3px] w-full bg-[var(--color-forest-ink)]/8">
          <div className="h-full bg-[var(--color-forest-ink)] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col lg:flex-row">
        <aside className="w-full lg:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--color-forest-ink)]/10 p-[20px] md:p-[24px] lg:sticky lg:top-[67px] lg:h-[calc(100vh-67px)] lg:overflow-auto">
          <div className="flex flex-col gap-[20px]">
            <div>
              <PillBadge withArrow>Setup · {pct}%</PillBadge>
              <h1 className="mt-[14px] text-[32px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
                {step === 1 && "Pick your language."}
                {step === 2 && "What’s the goal?"}
                {step === 3 && "Build your week."}
              </h1>
              <p className="mt-[10px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
                {step === 1 && "Interface language stays separate from the language you’re learning. Change it anytime."}
                {step === 2 && "We’ll be blunt if the plan doesn’t fit — you can override. Every lesson ties to a can-do statement."}
                {step === 3 && "Choose windows, we propose cohorts. Real classes at fixed times — not on-demand chat."}
              </p>
            </div>

            <div className="flex gap-[8px]">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex flex-1 flex-col gap-[6px]">
                  <div className={`h-[6px] rounded-full transition-colors ${n < step ? "bg-[var(--color-forest-ink)]" : n === step ? "bg-[var(--color-forest-ink)]" : "bg-[var(--color-forest-ink)]/12"}`} />
                  <p className={`text-[11px] tracking-[0.06em] uppercase ${n === step ? "text-[var(--color-forest-ink)] font-medium" : "text-[var(--color-mist)]"}`}>
                    {n === 1 ? "Language" : n === 2 ? "Goal" : "Schedule"}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-[12px]">
              <div className={`rounded-[14px] p-[16px] border border-[var(--color-forest-ink)]/5 ${step === 1 ? "bg-[var(--color-mint-surface)]" : "bg-white"}`}>
                <p className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[12px]">◐</p>
                <p className="mt-[10px] text-[14px] font-medium text-[var(--color-forest-ink)]">1 · Language</p>
                <p className="mt-[4px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                  Target + your language. We seed the error watch-list from your native tongue.
                </p>
                {target && (
                  <p className="mt-[10px] inline-flex rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[5px] text-[11px] font-medium text-white">
                    {LANGUAGES.find((l) => l.code === target)?.flag} {LANGUAGES.find((l) => l.code === target)?.name} · {nativeLang}
                  </p>
                )}
              </div>

              <div className={`rounded-[14px] p-[16px] border border-[var(--color-forest-ink)]/5 ${step === 2 ? "bg-[var(--color-lime-surface)]" : "bg-white"}`}>
                <p className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[12px]">✦</p>
                <p className="mt-[10px] text-[14px] font-medium text-[var(--color-forest-ink)]">2 · Goal & time</p>
                <p className="mt-[4px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                  Career, exam, family — plus deadline and honest weekly hours.
                </p>
                {goal && step >= 2 && (
                  <p className="mt-[10px] inline-flex rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[5px] text-[11px] font-medium text-white">
                    {GOALS.find((g) => g.id === goal)?.title} · {hours}h/week {deadline ? "· " + deadline : ""}
                  </p>
                )}
              </div>

              <div className={`rounded-[14px] p-[16px] border border-[var(--color-forest-ink)]/5 ${step === 3 ? "bg-[var(--color-lavender-surface)]" : "bg-white"}`}>
                <p className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[12px]">◑</p>
                <p className="mt-[10px] text-[14px] font-medium text-[var(--color-forest-ink)]">3 · Schedule</p>
                <p className="mt-[4px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                  We match you to cohorts of 4. 60-min class, 28 min avatar-on. Calendar invites included.
                </p>
                {step === 3 && countAvail > 0 && (
                  <p className="mt-[10px] text-[11px] font-medium tracking-[0.04em] text-[var(--color-forest-ink)]">{countAvail} windows selected → 3 cohorts found</p>
                )}
              </div>

              <div className="rounded-[14px] bg-[var(--color-buttercream)] border border-[var(--color-forest-ink)]/10 p-[16px]">
                <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Reality check</p>
                <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
                  A CEFR level ≈ 100–200 hours. At {hours}h/week, B2 from A2 is months, not days — we’ll show the math next.
                </p>
              </div>
            </div>

            <p className="text-[11px] leading-[1.5] text-[var(--color-mist)]">
              No streaks, no XP. Progress = can-do statements with transcript evidence. 18+ only.
            </p>
          </div>
        </aside>

        <main className="flex-1 p-[20px] md:p-[32px] lg:p-[40px]">
          <div className="mx-auto max-w-[640px]">
            {serverError && (
              <div className="mb-[16px] rounded-[12px] bg-red-50 border border-red-200 px-[14px] py-[12px] text-[13px] text-red-700">
                {serverError}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-[24px]">
                <div className="rounded-[14px] bg-white p-[22px] md:p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                  <h2 className="text-[19px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Which language will you learn?</h2>
                  <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                    Choose one to start. You can add more after placement. One language ships the curriculum right.
                  </p>

                  <div className="mt-[18px] grid grid-cols-2 md:grid-cols-4 gap-[10px]">
                    {LANGUAGES.map((l) => {
                      const active = target === l.code;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => setTarget(l.code)}
                          className={`group relative flex flex-col gap-[8px] rounded-[14px] border p-[14px] text-left transition-all ${active ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)] shadow-[var(--shadow-md)]" : "bg-white border-[var(--color-forest-ink)]/10 hover:border-[var(--color-forest-ink)]/30 hover:bg-[var(--color-parchment)]"}`}
                        >
                          <span className="text-[22px] leading-none">{l.flag}</span>
                          <span className={`text-[13px] font-medium leading-none ${active ? "text-white" : "text-[var(--color-forest-ink)]"}`}>{l.name}</span>
                          <span className={`text-[11px] leading-none ${active ? "text-white/70" : "text-[var(--color-lichen-gray)]"}`}>{l.native}</span>
                          <span className={`mt-[2px] text-[11px] tracking-[0.04em] ${active ? "text-[var(--color-meadow)]" : "text-[var(--color-mist)]"}`}>{l.level}</span>
                          {active && <span className="absolute right-[10px] top-[10px] grid h-[18px] w-[18px] place-items-center rounded-full bg-white text-[10px] text-[var(--color-forest-ink)]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                  {errors.target && <p className="mt-[10px] text-[12px] text-red-600">{errors.target}</p>}
                </div>

                <div className="rounded-[14px] bg-white p-[22px] md:p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                  <h3 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">Your language</h3>
                  <p className="mt-[6px] text-[13px] text-[var(--color-lichen-gray)]">Interface + help language. Tutor explains in this when you tap “explain in my language.”</p>
                  <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                    {NATIVE_LANGS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNativeLang(n)}
                        className={`h-[40px] rounded-[12px] border px-[14px] text-left text-[14px] transition-colors ${nativeLang === n ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)]" : "bg-white border-[var(--color-forest-ink)]/10 hover:border-[var(--color-forest-ink)]/25 text-[var(--color-forest-ink)]"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-[24px]">
                <div className="rounded-[14px] bg-white p-[22px] md:p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                  <h2 className="text-[19px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">What’s driving you?</h2>
                  <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">Pick the closest. We’ll tune examples, Board notes, and correction policy to it.</p>

                  <div className="mt-[18px] grid gap-[10px]">
                    {GOALS.map((g) => {
                      const active = goal === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGoal(g.id)}
                          className={`flex items-center gap-[14px] rounded-[14px] border p-[14px] text-left transition-colors ${active ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)]" : "bg-white border-[var(--color-forest-ink)]/10 hover:border-[var(--color-forest-ink)]/20"}`}
                        >
                          <span className={`grid h-[36px] w-[36px] place-items-center rounded-full text-[14px] ${active ? "bg-white text-[var(--color-forest-ink)]" : "bg-[var(--color-parchment)] text-[var(--color-forest-ink)] border border-[var(--color-forest-ink)]/10"}`}>{g.icon}</span>
                          <span className="flex-1">
                            <span className={`block text-[14px] font-medium leading-none ${active ? "text-white" : "text-[var(--color-forest-ink)]"}`}>{g.title}</span>
                            <span className={`block mt-[4px] text-[12px] leading-[1.3] ${active ? "text-white/70" : "text-[var(--color-lichen-gray)]"}`}>{g.desc}</span>
                          </span>
                          {active && <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-[var(--color-meadow)] text-[11px] text-[var(--color-forest-ink)]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-[16px]">
                  <div className="rounded-[14px] bg-white p-[20px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                    <label htmlFor="deadline" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
                      Deadline <span className="normal-case tracking-normal text-[var(--color-mist)] font-normal">· optional</span>
                    </label>
                    <input
                      id="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="mt-[10px] h-[44px] w-full rounded-[12px] border border-[var(--color-mist)]/30 bg-white px-[14px] text-[14px] outline-none focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"
                    />
                    <p className="mt-[8px] text-[11px] leading-[1.4] text-[var(--color-lichen-gray)]">We’ll reality-check goal × deadline × hours next.</p>
                  </div>

                  <div className="rounded-[14px] bg-white p-[20px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                    <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">Weekly hours</label>
                    <div className="mt-[12px] flex items-baseline gap-[8px]">
                      <span className="text-[32px] font-medium leading-none tracking-[-0.02em] text-[var(--color-forest-ink)]">{hours}</span>
                      <span className="text-[13px] text-[var(--color-lichen-gray)]">hours / week</span>
                      <span className={`ml-auto rounded-full px-[8px] py-[4px] text-[11px] font-medium ${hours < 4 ? "bg-[var(--color-buttercream)] text-[var(--color-forest-ink)]" : hours < 7 ? "bg-[var(--color-sage-glow)] text-[var(--color-forest-ink)]" : "bg-[var(--color-meadow)] text-[var(--color-forest-ink)]"}`}>
                        {hours < 4 ? "Light" : hours < 7 ? "Steady" : "Intensive"}
                      </span>
                    </div>
                    <input type="range" min={3} max={15} value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="mt-[14px] w-full accent-[var(--color-forest-ink)]" />
                    <div className="mt-[6px] flex justify-between text-[11px] text-[var(--color-mist)]">
                      <span>3h</span>
                      <span>15h</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-[24px]">
                <div className="rounded-[14px] bg-white p-[22px] md:p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                  <h2 className="text-[19px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">When can you meet?</h2>
                  <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                    Tap windows you generally keep free. We’ll propose cohorts of 4 that match. Minimum 2 windows — you can edit later.
                  </p>

                  <div className="mt-[18px] overflow-x-auto">
                    <div className="min-w-[520px]">
                      <div className="grid grid-cols-[72px_repeat(7,1fr)] gap-[6px] text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">
                        <span />
                        {DAYS.map((d) => (
                          <span key={d} className="text-center py-[4px]">
                            {d}
                          </span>
                        ))}
                      </div>
                      {SLOTS.map((slot) => (
                        <div key={slot.id} className="mt-[6px] grid grid-cols-[72px_repeat(7,1fr)] gap-[6px]">
                          <div className="flex flex-col justify-center rounded-[10px] bg-[var(--color-parchment)] px-[8px] py-[10px] border border-[var(--color-forest-ink)]/8">
                            <span className="text-[12px] font-medium leading-none text-[var(--color-forest-ink)]">{slot.label}</span>
                            <span className="text-[11px] leading-none text-[var(--color-lichen-gray)]">{slot.sub}</span>
                          </div>
                          {DAYS.map((d) => {
                            const k = `${d}-${slot.id}`;
                            const on = !!avail[k];
                            return (
                              <button
                                key={k}
                                type="button"
                                onClick={() => toggleAvail(d, slot.id)}
                                className={`h-[46px] rounded-[12px] border text-[12px] font-medium transition-colors ${on ? "bg-[var(--color-forest-ink)] text-white border-[var(--color-forest-ink)] shadow-[var(--shadow-md)]" : "bg-white border-[var(--color-forest-ink)]/10 text-[var(--color-lichen-gray)] hover:border-[var(--color-forest-ink)]/30 hover:text-[var(--color-forest-ink)]"}`}
                                aria-pressed={on}
                              >
                                {on ? "✓" : "·"}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {errors.avail && <p className="mt-[10px] text-[12px] text-red-600">{errors.avail}</p>}
                  <p className="mt-[10px] text-[11px] text-[var(--color-mist)]">
                    {countAvail} windows · we found 3 cohorts matching {target ? LANGUAGES.find((l) => l.code === target)?.name : "your language"} at your level
                  </p>
                </div>

                <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-[16px]">
                  <div className="rounded-[14px] bg-white p-[20px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
                    <label htmlFor="tz" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
                      Time zone
                    </label>
                    <select
                      id="tz"
                      value={tz}
                      onChange={(e) => setTz(e.target.value)}
                      className="mt-[10px] h-[44px] w-full rounded-[12px] border border-[var(--color-mist)]/30 bg-white px-[14px] text-[14px] outline-none focus:border-[var(--color-forest-ink)]"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata — IST (UTC+05:30)</option>
                      <option value="Europe/Berlin">Europe/Berlin — CET (UTC+01:00)</option>
                      <option value="America/New_York">America/New_York — EST (UTC−05:00)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo — JST (UTC+09:00)</option>
                      <option value="Europe/Lisbon">Europe/Lisbon — WET (UTC+00:00)</option>
                    </select>
                  </div>

                  <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[16px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Your proposed week</p>
                    <div className="mt-[12px] grid gap-[8px]">
                      <div className="rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
                        <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Cohort A · 4 learners</p>
                        <p className="mt-[4px] text-[14px] font-medium text-[var(--color-forest-ink)]">Mon & Wed · 19:00–20:00 IST</p>
                        <p className="text-[12px] text-[var(--color-lichen-gray)]">Warm-up · Teach · Guided practice · Production · Recap</p>
                      </div>
                      <div className="rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10">
                        <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Study block</p>
                        <p className="mt-[4px] text-[14px] font-medium text-[var(--color-forest-ink)]">Sat · 10:00–10:15 · Review</p>
                        <p className="text-[12px] text-[var(--color-lichen-gray)]">Spaced deck from your errors + homework</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-[28px] flex items-center justify-between gap-[12px] border-t border-[var(--color-forest-ink)]/10 pt-[20px]">
              <Button variant="outlined" onClick={back} disabled={saving}>
                ← Back
              </Button>
              <div className="flex items-center gap-[10px]">
                <span className="hidden md:inline text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">
                  {step} / {total} · {pct}%
                </span>
                <Button variant="filled" onClick={next} disabled={!canContinue() || saving}>
                  {saving ? "Saving…" : step < total ? "Continue →" : "Confirm timetable →"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
