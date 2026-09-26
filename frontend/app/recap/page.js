"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/guards/AuthGuard";
import BottomNav from "@/components/nav/BottomNav";
import CorrectionsCard from "@/components/recap/CorrectionsCard";
import ParkedDoubtsCard from "@/components/recap/ParkedDoubtsCard";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

// PRD AC-1 recap — corrections + parked doubts live (frontend, no backend).
// Future slices add key items, talk share, transcript, homework.
// This shell shows the empty state so rooms have somewhere to go after class.
function RecapInner() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col pb-[88px] md:pb-0">
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            ← Dashboard
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[16px] animate-fade-in">
        <div className="flex flex-col gap-[10px]">
          <PillBadge>After class · Recap</PillBadge>
          <h1 className="text-[28px] md:text-[36px] font-medium tracking-[-0.02em] leading-[0.95] text-[var(--color-forest-ink)]">
            Recap.
          </h1>
          <p className="text-[14px] leading-[1.5] text-[var(--color-lichen-gray)] max-w-[640px]">
            Key items, your corrections, parked doubts answered, talk share, and transcript will live here after your first live class. No streaks, no points.
          </p>
        </div>

        <div className="rounded-[14px] bg-white p-[22px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] text-center">
          <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">No recap yet</p>
          <p className="text-[13px] text-[var(--color-lichen-gray)] mt-[6px] max-w-[520px] mx-auto">
            Join a live room from the dashboard — your recap appears here once the class ends.
          </p>
          <div className="mt-[14px] flex justify-center gap-[10px] flex-wrap">
            <Button variant="filled" size="sm" onClick={() => router.push("/dashboard")}>
              Go to dashboard →
            </Button>
            <Button variant="outlined" size="sm" onClick={() => router.push("/placement")}>
              Take placement →
            </Button>
          </div>
        </div>

        <CorrectionsCard items={[]} />

        <ParkedDoubtsCard items={[]} />

        <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[16px] border border-[var(--color-forest-ink)]/5">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">What will appear here</p>
          <p className="mt-[6px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
            Corrections with redlines · talk share · transcript · homework (10–15 min). Each item ships as its own small change.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function RecapPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm">Loading…</div>}>
        <RecapInner />
      </Suspense>
    </AuthGuard>
  );
}
