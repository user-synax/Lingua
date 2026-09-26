"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LinguaLogo } from "@/components/ui/Logo";
import { PillBadge } from "@/components/ui/Badge";
import BottomNav from "@/components/nav/BottomNav";

function AccountInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onboarded = searchParams.get("onboarded");
  const { user, loading, fetchMe, logout } = useAuth();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [onboarding, setOnboarding] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/account");
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      api
        .getOnboarding()
        .then((d) => setOnboarding(d.onboarding))
        .catch(() => {});
    }
  }, [user]);

  async function onSaveName(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (!name.trim() || name.trim().length < 2) return setErr("Name must be at least 2 characters");
    setSaving(true);
    try {
      await api.updateUser({ name: name.trim() });
      await fetchMe();
      setMsg("Name updated");
      setTimeout(() => setMsg(""), 2000);
    } catch (err2) {
      setErr(err2.data?.error || err2.message);
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    await logout();
    router.push("/login");
  }

  async function onDelete() {
    try {
      await api.deleteUser();
      router.push("/signup");
    } catch (err2) {
      setErr(err2.data?.error || err2.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--color-parchment)]">
        <p className="text-[14px] text-[var(--color-lichen-gray)]">Loading…</p>
      </div>
    );
  }
  if (!user) return null;

  const langNames = { de: "German", es: "Spanish", fr: "French", ja: "Japanese", pt: "Portuguese", en: "English", it: "Italian", ko: "Korean" };

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col pb-[88px] md:pb-0">
      <header className="sticky top-0 pt-[env(safe-area-inset-top)] z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[10px]">
            <a
              href="/dashboard"
              className="hidden md:inline text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)] transition-colors"
            >
              Dashboard
            </a>
            <Button variant="outlined" size="sm" onClick={onLogout} className="pressable">
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] py-[28px] flex flex-col gap-[20px] animate-fade-in">
        {onboarded && (
          <div className="animate-slide-up rounded-[14px] bg-[var(--color-meadow)] border border-[var(--color-forest-ink)]/10 px-[16px] py-[14px] flex items-center justify-between gap-[12px]">
            <div>
              <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">Timetable confirmed — you’re set.</p>
              <p className="text-[13px] text-[var(--color-slate)]">2 live classes + review blocks. We’ll remind you 24h / 1h / 10 min before.</p>
            </div>
            <span className="hidden md:inline rounded-full bg-[var(--color-forest-ink)] px-[12px] py-[6px] text-[11px] font-medium text-white">Onboarded ✓</span>
          </div>
        )}

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[20px] stagger">
          <div className="rounded-[14px] bg-white p-[22px] md:p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06] lift">
            <PillBadge>Account</PillBadge>
            <h1 className="mt-[12px] text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Your account</h1>
            <p className="mt-[6px] text-[13px] text-[var(--color-lichen-gray)]">Secure session via httpOnly cookies — access 15m, refresh 7d rotation. Email is your ID; name is editable.</p>

            {msg && <div className="mt-[14px] rounded-[10px] bg-[var(--color-sage-glow)] border border-[var(--color-forest-ink)]/10 px-[12px] py-[10px] text-[13px] text-[var(--color-forest-ink)]">{msg}</div>}
            {err && <div className="mt-[14px] rounded-[10px] bg-red-50 border border-red-200 px-[12px] py-[10px] text-[13px] text-red-700">{err}</div>}

            <form onSubmit={onSaveName} className="mt-[18px] flex flex-col gap-[14px]">
              <Input id="name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Avery Lumen" />
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">Email</label>
                <input
                  value={user.email}
                  disabled
                  className="h-[44px] w-full rounded-[12px] bg-[var(--color-parchment)] border border-[var(--color-forest-ink)]/10 px-[14px] text-[14px] text-[var(--color-lichen-gray)]"
                />
                <p className="text-[11px] text-[var(--color-mist)]">Email is your identity — contact support to change it.</p>
              </div>
              <div className="flex gap-[10px]">
                <Button type="submit" variant="filled" disabled={saving}>
                  {saving ? "Saving…" : "Save name →"}
                </Button>
                <a href="/onboarding">
                  <Button type="button" variant="outlined">
                    Edit onboarding →
                  </Button>
                </a>
              </div>
            </form>

            <div className="mt-[22px] border-t border-[var(--color-forest-ink)]/10 pt-[16px]">
              <h3 className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Danger zone</h3>
              {!showDelete ? (
                <button onClick={() => setShowDelete(true)} className="mt-[10px] text-[13px] font-medium text-red-600 underline underline-offset-2">
                  Delete account…
                </button>
              ) : (
                <div className="mt-[10px] rounded-[12px] bg-red-50 border border-red-200 p-[14px]">
                  <p className="text-[13px] text-red-700">Delete your account and all data? This cannot be undone.</p>
                  <div className="mt-[10px] flex gap-[8px]">
                    <Button variant="filled" size="sm" onClick={onDelete} className="!bg-red-600 hover:!bg-red-700">
                      Yes, delete
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => setShowDelete(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[16px] stagger">
            <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[22px] border border-[var(--color-forest-ink)]/5 lift">
              <h3 className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Your plan</h3>
              {!onboarding || (!onboarding.target && !onboarding.goal) ? (
                <p className="mt-[8px] text-[14px] text-[var(--color-lichen-gray)]">
                  No plan yet. <a href="/onboarding" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">Complete onboarding →</a>
                </p>
              ) : (
                <div className="mt-[12px] grid gap-[10px]">
                  <div className="rounded-[12px] bg-white p-[14px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
                    <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Language & goal</p>
                    <p className="mt-[4px] text-[14px] font-medium text-[var(--color-forest-ink)]">
                      {onboarding.target ? langNames[onboarding.target] || onboarding.target : "—"} · {onboarding.nativeLang || "—"}
                    </p>
                    <p className="text-[12px] text-[var(--color-lichen-gray)]">
                      {onboarding.goal || "—"} · {onboarding.hours ? `${onboarding.hours}h/week` : "—"} {onboarding.deadline ? `· ${new Date(onboarding.deadline).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                  <div className="rounded-[12px] bg-white p-[14px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Schedule</p>
                    <p className="mt-[4px] text-[13px] text-[var(--color-forest-ink)]">
                      {onboarding.timezone} · {onboarding.availability ? Object.keys(onboarding.availability).filter((k) => onboarding.availability[k]).length : 0} windows
                    </p>
                    {onboarding.availability && Object.keys(onboarding.availability).filter((k) => onboarding.availability[k]).length > 0 && (
                      <p className="mt-[6px] flex flex-wrap gap-[6px]">
                        {Object.entries(onboarding.availability)
                          .filter(([, v]) => v)
                          .slice(0, 8)
                          .map(([k]) => (
                            <span key={k} className="rounded-full bg-[var(--color-parchment)] border border-[var(--color-forest-ink)]/10 px-[8px] py-[4px] text-[11px] text-[var(--color-lichen-gray)]">
                              {k}
                            </span>
                          ))}
                      </p>
                    )}
                  </div>
                  {onboarding.completed && <span className="inline-flex w-fit rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[5px] text-[11px] font-medium text-white">Completed ✓</span>}
                  <a href="/plan" className="mt-[4px] inline-flex w-fit text-[12px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
                    See reality check →
                  </a>
                </div>
              )}
            </div>

            <div className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] lift">
              <h3 className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Session</h3>
              <p className="mt-[8px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                Access token in httpOnly cookie (15 min). Refresh rotation (7 days, sha256-hashed in DB). Logout invalidates refresh server-side — no token survives. Cookies are Lax, Secure in prod, Helmet + rate-limit enabled.
              </p>
              <div className="mt-[10px] flex gap-[8px] flex-wrap">
                <span className="rounded-full bg-[var(--color-meadow)] px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">httpOnly</span>
                <span className="rounded-full bg-[var(--color-lavender-surface)] px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">Zod</span>
                <span className="rounded-full bg-[var(--color-buttercream)] px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">bcrypt 12</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function AccountPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm">Loading…</div>}>
      <AccountInner />
    </Suspense>
  );
}
