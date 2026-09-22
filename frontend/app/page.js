"use client";

import { LinguaLogo } from "@/components/ui/Logo";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import GuestGuard from "@/components/guards/GuestGuard";

export default function Home() {
  return (
    <GuestGuard>
      <HomeContent />
    </GuestGuard>
  );
}

function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Announcement Banner */}
      <div className="bg-[var(--color-mint-surface)] border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-[12px] px-[20px] py-[8px] text-[13px]">
          <span className="flex items-center gap-[10px] text-[var(--color-forest-ink)]">
            <span className="hidden sm:inline font-medium">Private beta — one language, groups of 4</span>
            <span className="hidden sm:inline h-[14px] w-px bg-[var(--color-forest-ink)]/15" />
            <a href="/onboarding" className="font-medium underline underline-offset-2">
              Join the waitlist →
            </a>
          </span>
          <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-lichen-gray)] hidden md:inline">
            18+ only · No streaks · Evidence, not XP
          </span>
        </div>
      </div>

      {/* Nav — sticky */}
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <nav className="hidden md:flex items-center gap-[22px] text-[14px] font-medium text-[var(--color-slate)]">
            <a href="#" className="hover:text-[var(--color-forest-ink)] flex items-center gap-[4px]">
              Platform <span className="text-[10px]">▾</span>
            </a>
            <a href="#" className="hover:text-[var(--color-forest-ink)]">
              How classes work
            </a>
            <a href="#" className="hover:text-[var(--color-forest-ink)]">
              Progress
            </a>
            <a href="#" className="hover:text-[var(--color-forest-ink)]">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-[10px]">
            <a href="/login" className="hidden md:inline text-[14px] font-medium text-[var(--color-forest-ink)] hover:opacity-70">
              Log in
            </a>
            <a href="/signup">
              <Button variant="filled" size="md">Start learning</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero — split layout + device frame on halo */}
        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[36px] md:pt-[48px]">
          <div className="grid md:grid-cols-[1.05fr_0.9fr] gap-[28px] md:gap-[40px] items-start">
            <div>
              <PillBadge withArrow>A real class, taught by an AI teacher</PillBadge>
              <h1
                className="mt-[16px] text-[42px] md:text-[72px] font-medium leading-[0.9] tracking-[-0.02em] md:tracking-[-1.73px] text-[var(--color-forest-ink)]"
                style={{ lineHeight: 0.9 }}
              >
                A timetable,
                <br />
                a classroom,
                <br />
                <span className="opacity-60">every doubt</span>
                <br />
                answered live.
              </h1>
              <div className="mt-[18px] flex flex-wrap gap-[10px]">
                <a href="/signup">
                  <Button variant="filled" size="lg">
                    Create account →
                  </Button>
                </a>
                <a href="/login">
                  <Button variant="outlined" size="lg">
                    Log in
                  </Button>
                </a>
              </div>
              <p className="mt-[14px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
                For serious adult learners. 60-minute live classes in groups of 4, with a shared Board and every doubt answered on the spot.
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] leading-[1.6] text-[var(--color-lichen-gray)]">
                Pick a language and a goal — the platform places you, builds a weekly timetable, and runs the class. After class: corrections, notes, homework, and can-do progress with evidence.
              </p>
              <a href="/onboarding" className="inline-flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
                See the 90-second setup →
              </a>
            </div>
          </div>

          {/* Device frame with halo gradient */}
          <div className="mt-[32px] rounded-[22px] p-[16px] md:p-[24px]" style={{ background: "var(--gradient-halo)" }}>
            <div className="rounded-[14px] bg-white shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/10 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--color-forest-ink)]/8 px-[14px] py-[10px]">
                <div className="flex items-center gap-[6px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#ffbd2e]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#28ca42]" />
                </div>
                <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Live class · German A2 · Board</span>
                <span className="h-[20px] rounded-full bg-[var(--color-meadow)] px-[8px] text-[11px] font-medium leading-[20px] text-[var(--color-forest-ink)]">● Live</span>
              </div>
              <div className="grid md:grid-cols-[1.4fr_0.7fr] gap-[12px] p-[14px]">
                <div className="rounded-[12px] bg-[var(--color-parchment)] border border-[var(--color-forest-ink)]/10 p-[14px]">
                  <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">The Board — shared, selectable text</p>
                  <p className="mt-[10px] text-[15px] font-medium leading-[1.4] text-[var(--color-forest-ink)]">
                    Warum steht das Verb am Ende?
                  </p>
                  <p className="text-[12px] text-[var(--color-lichen-gray)]">Why does the verb go at the end?</p>
                  <div className="mt-[12px] rounded-[10px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Redline correction</p>
                    <p className="mt-[4px] text-[13px] leading-[1.4]">
                      <span className="line-through decoration-red-500">Ich habe gegangen</span>{" "}
                      <span className="font-medium text-[var(--color-deep-forest)]">→ Ich bin gegangen</span>
                    </p>
                    <p className="text-[11px] text-[var(--color-lichen-gray)]">Rule on card · logged to your error model</p>
                  </div>
                  <div className="mt-[10px] flex gap-[6px]">
                    <span className="rounded-full bg-[var(--color-meadow)] px-[8px] py-[4px] text-[11px] font-medium text-[var(--color-forest-ink)]">Doubt: 1 parked</span>
                    <span className="rounded-full bg-white border border-[var(--color-forest-ink)]/10 px-[8px] py-[4px] text-[11px] text-[var(--color-lichen-gray)]">Tap any word → gloss + audio</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="rounded-[12px] bg-[var(--color-lavender-surface)] p-[12px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Class timeline · 60 min</p>
                    <div className="mt-[8px] grid gap-[6px] text-[12px]">
                      <div className="flex justify-between"><span className="text-[var(--color-lichen-gray)]">0–5</span><span className="font-medium text-[var(--color-forest-ink)]">Warm-up recall</span><span className="text-[var(--color-lichen-gray)]">avatar on</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-lichen-gray)]">5–20</span><span className="font-medium text-[var(--color-forest-ink)]">Teach</span><span className="text-[var(--color-lichen-gray)]">avatar on</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-lichen-gray)]">20–40</span><span className="font-medium text-[var(--color-forest-ink)]">Guided practice</span><span className="text-[var(--color-lichen-gray)]">avatar off</span></div>
                      <div className="flex justify-between"><span className="text-[var(--color-lichen-gray)]">52–60</span><span className="font-medium text-[var(--color-forest-ink)]">Recap</span><span className="text-[var(--color-lichen-gray)]">avatar on</span></div>
                    </div>
                  </div>
                  <div className="rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">Voice</p>
                    <p className="text-[13px] leading-[1.4] text-[var(--color-slate)]">Learner talk ≥60% in practice. Captions & translation live. Hand raise → 1.5s acknowledge.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pastel feature cards — platform overview */}
        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[56px]">
          <div className="flex flex-col gap-[8px]">
            <PillBadge>How it works</PillBadge>
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[12px] items-end">
              <h2 className="text-[32px] md:text-[47px] font-medium leading-[1] tracking-[-1.13px] text-[var(--color-forest-ink)]">Structure, not streaks.</h2>
              <p className="text-[16px] leading-[1.5] text-[var(--color-lichen-gray)]">
                A plan, a schedule, a cohort that expects you — and proof you can now do what you couldn’t before.
              </p>
            </div>
          </div>

          <div className="mt-[22px] grid md:grid-cols-2 gap-[16px]">
            <div className="rounded-[14px] bg-[var(--color-mint-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[14px]">◐</span>
              <h3 className="mt-[12px] text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">Placement in 10–15 min</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
                Listening, reading, one spoken + one written sample. Result: CEFR band + skill profile. Done before you pay.
              </p>
              <div className="mt-[14px] rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
                <div className="flex justify-between text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">
                  <span>Speaking</span>
                  <span>B1 · 3.2/5</span>
                </div>
                <div className="mt-[8px] h-[6px] rounded-full bg-[var(--color-parchment)] overflow-hidden">
                  <div className="h-full w-[62%] bg-[var(--color-forest-ink)]" />
                </div>
                <p className="mt-[8px] text-[12px] text-[var(--color-lichen-gray)]">Can-do: “Can describe a past trip with weil/ dass” — evidenced by transcript clip.</p>
              </div>
            </div>

            <div className="rounded-[14px] bg-[var(--color-lime-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[14px]">✦</span>
              <h3 className="mt-[12px] text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">A real timetable</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
                Propose slots from open cohorts + study blocks. Respects your time zone. ICS + Google Calendar. 24h / 1h / 10min reminders — no guilt.
              </p>
              <div className="mt-[14px] grid grid-cols-3 gap-[8px] text-center">
                {["Mon 19:00", "Wed 19:00", "Sat 10:15"].map((t) => (
                  <div key={t} className="rounded-[12px] bg-white p-[10px] border border-[var(--color-forest-ink)]/10">
                    <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">Cohort 4</p>
                    <p className="mt-[4px] text-[13px] font-medium text-[var(--color-forest-ink)]">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[14px]">♡</span>
              <h3 className="mt-[12px] text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">Every doubt answered</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
                Hand raise, push-to-talk, or typed. Tutor acknowledges in 1.5s — answers or parks it for recap. Flag this on any statement.
              </p>
              <div className="mt-[14px] rounded-[12px] bg-white p-[12px] border border-[var(--color-forest-ink)]/10">
                <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">“Explain in my language”</p>
                <p className="mt-[4px] text-[12px] leading-[1.5] text-[var(--color-lichen-gray)]">
                  Learner taps → Board shows gloss, rule, and example tied to their goal. Verbatim transcript + phoneme scoring kept per track.
                </p>
              </div>
            </div>

            <div className="rounded-[14px] bg-[var(--color-blush-surface)] p-[22px] border border-[var(--color-forest-ink)]/5">
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white border border-[var(--color-forest-ink)]/10 text-[14px]">◎</span>
              <h3 className="mt-[12px] text-[22px] font-medium leading-[1.2] text-[var(--color-forest-ink)]">Proof, not points</h3>
              <p className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
                After class: recap with corrections, parked doubts answered, talk share, transcript. Homework 10–15 min. Spaced deck auto-built from your mistakes.
              </p>
              <div className="mt-[14px] flex gap-[8px]">
                <span className="rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[6px] text-[11px] font-medium text-white">Can-do progress</span>
                <span className="rounded-full bg-white border border-[var(--color-forest-ink)]/10 px-[10px] py-[6px] text-[11px] text-[var(--color-lichen-gray)]">Attendance, no streaks</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[48px]">
          <div className="rounded-[14px] bg-[var(--color-lavender-surface)] p-[22px] md:p-[28px] border border-[var(--color-forest-ink)]/5">
            <div className="grid md:grid-cols-3 gap-[16px]">
              {[
                { name: "Maya, 28", role: "Analyst → B2 German", quote: "Finally a plan that says ‘you need 8h/week’ and then holds me to it. Doubts don’t pile up anymore.", stat: "2×", sub: "classes/week" },
                { name: "Kenji, 35", role: "Exam — English speaking", quote: "Blunt feedback on every turn. Mock test mapped to can-dos, not a vague score.", stat: "4.6", sub: "teaching rating" },
                { name: "Sofia, 42", role: "Portuguese for family", quote: "Camera off, no embarrassment. Tutor waits, corrects gently, logs it so I see it next week.", stat: "97%", sub: "audit accuracy" },
              ].map((t) => (
                <div key={t.name} className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-[10px]">
                    <span className="grid h-[40px] w-[40px] place-items-center rounded-full bg-[var(--color-parchment)] text-[12px] font-medium text-[var(--color-forest-ink)]">
                      {t.name.slice(0, 2)}
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium text-[var(--color-forest-ink)]">{t.name}</span>
                      <span className="block text-[12px] text-[var(--color-lichen-gray)]">{t.role}</span>
                    </span>
                  </div>
                  <p className="mt-[12px] text-[14px] leading-[1.5] text-[var(--color-forest-ink)]">“{t.quote}”</p>
                  <p className="mt-[14px] text-[36px] font-medium leading-none tracking-[-0.02em] text-[var(--color-forest-ink)]">{t.stat}</p>
                  <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--color-mist)]">{t.sub}</p>
                  <a href="#" className="mt-[10px] inline-flex text-[13px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
                    Read the story →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] py-[40px]">
          <div
            className="rounded-[14px] p-[28px] md:p-[36px] text-center border border-white/20"
            style={{ background: "linear-gradient(135deg, #7a2251 0%, #652ea3 55%, #003d3d 100%)" }}
          >
            <h3 className="text-[24px] md:text-[32px] font-medium leading-[1] text-white tracking-[-0.02em]">Ready for a real class?</h3>
            <p className="mx-auto mt-[8px] max-w-[560px] text-[14px] leading-[1.5] text-white/80">
              90-second setup. Placement before payment. Elastic cohorts — if 3 don’t book, we offer a reschedule or 1:1 audio.
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
          <span>© 2026 Lingua — a real school, at a fraction of a tutor’s cost. 18+ only.</span>
          <span className="flex gap-[14px]">
            <a href="#" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Terms
            </a>
            <a href="#" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
