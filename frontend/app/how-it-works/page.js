import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard. Content is PRD §6 (journey)
// and §7 (60-minute class format) verbatim in structure; no invented
// facts, no pricing, no promises beyond the product.
const SEGMENTS = [
  { min: "0–5", title: "Warm-up recall", mode: "Group · avatar on", desc: "Spaced review of last class items; the tutor calls learners by name." },
  { min: "5–20", title: "Teach", mode: "Group · avatar on", desc: "One or two targets on the shared Board; doubts allowed at any time." },
  { min: "20–40", title: "Guided practice", mode: "Per-learner audio · avatar off", desc: "Every learner speaks a lot, with per-learner pronunciation scoring." },
  { min: "40–52", title: "Production task", mode: "Small groups · avatar off", desc: "Role-play or task using the new forms." },
  { min: "52–60", title: "Recap", mode: "Group · avatar on", desc: "Parked doubts answered, top corrections, homework set." },
];

const STEPS = [
  { title: "Place yourself in 10–15 min", desc: "Listening, reading, one spoken and one written sample. Result: level band plus skill profile — before you pay." },
  { title: "Get a timetable that adds up", desc: "Goal, deadline, and weekly hours checked against honest math. Class slots from open cohorts, plus study blocks." },
  { title: "Join the live class", desc: "60 minutes in a small group. Hand raise, push-to-talk, or typed doubt — acknowledged quickly, answered live or parked for recap." },
  { title: "Keep the evidence", desc: "After class: corrections, parked doubts answered, homework, and can-do progress backed by transcript clips. No streaks, no points." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="sticky top-0 pt-[env(safe-area-inset-top)] z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <div className="flex items-center gap-[10px]">
            <Link
              href="/login"
              className="hidden md:inline text-[14px] font-medium text-[var(--color-forest-ink)] hover:opacity-70"
            >
              Log in
            </Link>
            <Link href="/signup">
              <Button variant="filled" size="md">Start learning</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[36px] md:pt-[48px]">
          <PillBadge withArrow>A real class, taught by an AI teacher</PillBadge>
          <h1 className="mt-[16px] max-w-[800px] text-[42px] md:text-[72px] font-medium leading-[0.9] tracking-[-0.02em] md:tracking-[-1.73px] text-[var(--color-forest-ink)]">
            How classes work.
          </h1>
          <p className="mt-[16px] max-w-[640px] text-[16px] md:text-[19px] leading-[1.5] text-[var(--color-lichen-gray)]">
            A timetable, a classroom, and every doubt answered live. Avatar on only where it earns its cost — 28 of 60 minutes.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[40px]">
          <div className="rounded-[14px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] p-[18px] md:p-[24px]">
            <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Inside the 60 minutes</p>
            <ol className="mt-[14px] grid gap-[10px]">
              {SEGMENTS.map((s, i) => (
                <li
                  key={s.min}
                  className="grid md:grid-cols-[72px_1fr_auto] gap-[6px] md:gap-[14px] items-baseline rounded-[12px] bg-[var(--color-parchment)] border border-[var(--color-forest-ink)]/5 px-[14px] py-[12px]"
                >
                  <span className="text-[13px] font-medium tabular-nums text-[var(--color-forest-ink)]">
                    {i + 1} · {s.min}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-[var(--color-forest-ink)]">{s.title}</span>
                    <span className="block mt-[2px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">{s.desc}</span>
                  </span>
                  <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">{s.mode}</span>
                </li>
              ))}
            </ol>
            <p className="mt-[12px] text-[12px] leading-[1.5] text-[var(--color-lichen-gray)]">
              Learner talk share at least 60% in practice segments. A class opens once enough learners book it — below that, a reschedule or a 1:1 audio session.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[40px]">
          <PillBadge>Your first week</PillBadge>
          <div className="mt-[16px] grid md:grid-cols-2 gap-[16px]">
            <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <h3 className="text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">{STEPS[0].title}</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">{STEPS[0].desc}</p>
            </div>
            <div className="rounded-[14px] bg-[var(--color-lime-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <h3 className="text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">{STEPS[1].title}</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">{STEPS[1].desc}</p>
            </div>
            <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <h3 className="text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">{STEPS[2].title}</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">{STEPS[2].desc}</p>
            </div>
            <div className="rounded-[14px] bg-[var(--color-blush-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <h3 className="text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">{STEPS[3].title}</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">{STEPS[3].desc}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] py-[40px]">
          <div
            className="rounded-[14px] p-[28px] md:p-[36px] text-center border border-white/20"
            style={{ background: "linear-gradient(135deg, #7a2251 0%, #652ea3 55%, #003d3d 100%)" }}
          >
            <h3 className="text-[24px] md:text-[32px] font-medium leading-[1] text-white tracking-[-0.02em]">Ready for a real class?</h3>
            <p className="mx-auto mt-[8px] max-w-[560px] text-[14px] leading-[1.5] text-white/80">
              90-second setup. Placement before payment. Then your timetable holds you to it.
            </p>
            <div className="mt-[18px] flex justify-center gap-[10px] flex-wrap">
              <a href="/signup" className="inline-flex h-[44px] items-center justify-center rounded-[29px] bg-white px-[18px] text-[14px] font-medium text-[var(--color-forest-ink)] hover:bg-[var(--color-parchment)] transition-colors">
                Start setup →
              </a>
              <a href="/login" className="inline-flex h-[44px] items-center justify-center rounded-[29px] border border-white/40 px-[18px] text-[14px] font-medium text-white hover:bg-white/10 transition-colors">
                Log in
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-forest-ink)]/10 py-[22px]">
        <div className="mx-auto flex max-w-[1200px] flex-col md:flex-row items-center justify-between gap-[10px] px-[20px] md:px-[24px] text-[11px] tracking-[0.04em] text-[var(--color-mist)]">
          <span>© 2026 Lingua — a real school, at a fraction of a tutor&apos;s cost.</span>
          <span className="flex gap-[14px]">
            <a href="/terms" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Terms
            </a>
            <a href="/privacy" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Privacy
            </a>
            <a href="/contact" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
