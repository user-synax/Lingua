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
  const { user } = useAuth();
  const [onboarding, setOnboarding] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loadingOnboarding, setLoadingOnboarding] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    api
      .getOnboarding()
      .then((d) => setOnboarding(d.onboarding))
      .catch(() => {})
      .finally(() => setLoadingOnboarding(false));
    api
      .listRooms()
      .then((d) => setRooms(d.rooms || []))
      .catch(() => setRooms([]))
      .finally(() => setLoadingRooms(false));
  }, []);

  const needsOnboarding = !loadingOnboarding && (!onboarding?.target || !onboarding?.completed);
  const tz = onboarding?.timezone ?? "Asia/Kolkata";

  async function handleCreateRoom() {
    if (creating) return;
    setCreating(true);
    try {
      const { room } = await api.createRoom({});
      router.push(`/room/${room.name}`);
    } catch (e) {
      // fallback — generate client side name then push (will create on token step)
      const name = `lingua-${Date.now().toString(36)}`;
      router.push(`/room/${name}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col pb-[88px] md:pb-0">
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
              <p className="text-[12px] text-[var(--color-lichen-gray)]">Pick language, goal and weekly windows — then we match you to a cohort.</p>
            </div>
            <Button variant="filled" size="sm" onClick={() => router.push("/onboarding")} className="shrink-0">
              Complete onboarding →
            </Button>
          </div>
        )}

        {(!tab || tab === "today") && (
          <div key="today" className="flex flex-col gap-[18px] animate-slide-up-soft">
            <div className="flex flex-col gap-[10px]">
              <PillBadge withArrow>Today · {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}</PillBadge>
              <h1 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em] leading-[0.95] text-[var(--color-forest-ink)]">
                Morning, {user?.name?.split(" ")[0] || "there"}.
                <span className="block text-[var(--color-lichen-gray)] font-normal text-[16px] md:text-[18px] tracking-normal mt-[6px] leading-[1.4]">
                  {needsOnboarding ? "Complete onboarding to create your first live room." : "Your live rooms — create or join a class."}
                </span>
              </h1>
            </div>

            {/* Live room CTA — replaces mock Next class hero */}
            <div className="rounded-[14px] bg-[var(--color-forest-ink)] text-white p-[20px] md:p-[24px] shadow-[var(--shadow-md)] relative overflow-hidden">
              <div className="absolute -right-[40px] -top-[40px] h-[140px] w-[140px] rounded-full opacity-20" style={{ background: "var(--gradient-halo)" }} aria-hidden />
              <p className="text-[11px] tracking-[0.08em] uppercase text-white/60">LiveKit room</p>
              <p className="mt-[8px] text-[20px] font-medium leading-[1.1]">Start a live class</p>
              <p className="text-[13px] font-normal text-white/70 mt-[4px]">WebRTC SFU · camera optional, mic required · Board ready · {tz}</p>
              <div className="mt-[18px] flex gap-[8px] flex-wrap">
                <Button variant="filled" size="sm" className="!bg-white !text-[var(--color-forest-ink)] hover:!bg-[var(--color-parchment)]" onClick={handleCreateRoom} disabled={creating}>
                  {creating ? "Creating…" : "Create room →"}
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="!border-white/30 !text-white hover:!bg-white/10"
                  onClick={() => {
                    const name = prompt("Enter room name (a-z, 0-9, _ -)");
                    if (name) router.push(`/room/${name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`);
                  }}
                >
                  Join by name
                </Button>
              </div>
              <p className="mt-[12px] text-[11px] text-white/60">Rooms are ephemeral but tracked in Mongo — history appears below.</p>
            </div>

            {/* Recent rooms — real data, empty state replaces mock stats */}
            <div className="rounded-[14px] bg-white p-[16px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between">
                <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">Recent rooms</p>
                <span className="rounded-full bg-[var(--color-parchment)] px-[8px] py-[4px] text-[11px] text-[var(--color-lichen-gray)]">{rooms.length} total</span>
              </div>
              {loadingRooms ? (
                <div className="mt-[12px] grid gap-[8px]">
                  <div className="h-[52px] rounded-[12px] bg-[var(--color-parchment)] animate-pulse" />
                  <div className="h-[52px] rounded-[12px] bg-[var(--color-parchment)] animate-pulse" />
                </div>
              ) : rooms.length === 0 ? (
                <div className="mt-[12px] rounded-[12px] border border-dashed border-[var(--color-forest-ink)]/15 bg-[var(--color-parchment)]/60 p-[20px] text-center">
                  <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">No rooms yet</p>
                  <p className="text-[12px] text-[var(--color-lichen-gray)] mt-[4px]">Create your first LiveKit room — it will appear here.</p>
                </div>
              ) : (
                <ul className="mt-[12px] grid gap-[8px]">
                  {rooms.map((r) => (
                    <li key={r.name} className="flex items-center justify-between rounded-[12px] bg-[var(--color-parchment)] px-[14px] py-[12px] border border-[var(--color-forest-ink)]/5">
                      <div>
                        <p className="text-[13px] font-medium text-[var(--color-forest-ink)]">{r.name}</p>
                        <p className="text-[11px] text-[var(--color-lichen-gray)]">{new Date(r.updatedAt || r.createdAt).toLocaleString()} · by {r.createdBy?.slice?.(-6) || "you"}</p>
                      </div>
                      <Button variant="filled" size="sm" onClick={() => router.push(`/room/${r.name}`)}>
                        Join →
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {tab === "classes" && (
          <div key="classes" className="flex flex-col gap-[16px] animate-slide-up-soft">
            <div className="flex items-baseline justify-between gap-[12px]">
              <h2 className="text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Classes</h2>
              <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">LiveKit rooms</span>
            </div>

            {loadingRooms ? (
              <div className="rounded-[14px] bg-white p-[22px] border border-[var(--color-forest-ink)]/10">
                <div className="h-[120px] bg-[var(--color-parchment)] rounded-[12px] animate-pulse" />
              </div>
            ) : rooms.length === 0 ? (
              <div className="rounded-[14px] bg-white p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] text-center">
                <p className="text-[15px] font-medium text-[var(--color-forest-ink)]">No classes scheduled</p>
                <p className="text-[13px] text-[var(--color-lichen-gray)] mt-[6px]">Your timetable will list live rooms here once you create them.</p>
                <Button variant="filled" size="sm" className="mt-[14px]" onClick={handleCreateRoom}>
                  Create first room →
                </Button>
              </div>
            ) : (
              <div className="grid gap-[12px]">
                {rooms.map((r) => (
                  <div key={r.name} className="rounded-[14px] bg-white p-[16px] border border-[var(--color-forest-ink)]/10 flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">{r.name}</p>
                      <p className="text-[12px] text-[var(--color-lichen-gray)]">Created {new Date(r.createdAt).toLocaleDateString()} · {r.isActive ? "Active" : "Ended"}</p>
                    </div>
                    <Button variant="outlined" size="sm" onClick={() => router.push(`/room/${r.name}`)}>
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
              <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">How rooms work</p>
              <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">Each room is a LiveKit SFU session — separate audio tracks per participant for verbatim STT later. Board and recording will attach here.</p>
            </div>
          </div>
        )}

        {tab === "progress" && (
          <div key="progress" className="flex flex-col gap-[16px] animate-slide-up-soft">
            <h2 className="text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)]">Progress</h2>
            <div className="rounded-[14px] bg-white p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] text-center">
              <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">No progress yet</p>
              <p className="text-[13px] text-[var(--color-lichen-gray)] mt-[6px] max-w-[520px] mx-auto">Evidence-based can-do statements will appear after your first live class — transcript clips, corrections, attendance plain record. No XP.</p>
              <div className="mt-[14px] flex justify-center gap-[10px] flex-wrap">
                <Button variant="outlined" size="sm" onClick={handleCreateRoom}>
                  Start first class →
                </Button>
                <Button variant="ghost" size="sm" onClick={() => router.push("/recap")}>
                  See recap format →
                </Button>
              </div>
            </div>
            <div className="rounded-[14px] bg-[var(--color-parchment)] p-[16px] border border-[var(--color-forest-ink)]/10">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Attendance — plain record</p>
                {!loadingRooms && rooms.length > 0 && (
                  <span className="rounded-full bg-white border border-[var(--color-forest-ink)]/10 px-[8px] py-[4px] text-[11px] text-[var(--color-lichen-gray)]">
                    {rooms.length} session{rooms.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              {loadingRooms ? (
                <div className="mt-[10px] h-[44px] rounded-[12px] bg-white/60 animate-pulse" />
              ) : rooms.length === 0 ? (
                <p className="mt-[6px] text-[12px] text-[var(--color-lichen-gray)]">No sessions yet — no streaks. Missed → recording + 2-click replan once sessions exist.</p>
              ) : (
                <ul className="mt-[10px] grid gap-[6px]">
                  {[...rooms]
                    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
                    .slice(0, 5)
                    .map((r) => (
                      <li key={r.name} className="flex items-center justify-between gap-[10px] rounded-[12px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/5">
                        <span className="text-[12px] font-medium text-[var(--color-forest-ink)] truncate">{r.name}</span>
                        <span className="shrink-0 text-[11px] text-[var(--color-lichen-gray)]">
                          {new Date(r.updatedAt || r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
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
