import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard so it opens for logged-out
// signups and logged-in learners alike. Plain-language summary of
// the product rules in PRD §§4/6/9/13/16; not legal advice. Claims
// match what the app actually does.
const SECTIONS = [
  {
    id: "what-you-buy",
    title: "What you buy",
    body: "A subscription with a monthly allowance of live class-hours, plus unlimited asynchronous study (recaps, homework, review decks). Placement and one trial class come before payment so you know the plan holds first.",
  },
  {
    id: "classes-cohorts",
    title: "Classes and cohorts",
    body: "Classes run 60 minutes in small groups. A class opens once a minimum number of learners book it — below that we offer a reschedule or a 1:1 audio session instead of running a thin room.",
    points: ["Join from the dashboard link; camera optional, mic required.", "Missed a class? The recording and notes stay available and the plan re-adjusts."],
  },
  {
    id: "placement-progress",
    title: "Placement and progress",
    body: "Placement returns an estimated level band plus a skill profile — it is a starting point, not a certificate. Progress is measured in small sub-level steps backed by transcript evidence.",
    points: ["A full level takes on the order of 100–200+ hours; we never promise fluency on a deadline.", "Completion records are not official qualifications."],
  },
  {
    id: "ai-teacher",
    title: "The AI teacher",
    body: "Your tutor always identifies as an AI tutor and never claims to be human when asked. It teaches from vetted lesson material, says so when it is unsure, and points to the reference instead of guessing.",
    points: ["Any tutor statement can be flagged for human review.", "Reviewed mistakes fix the lesson material, not just the single answer."],
  },
  {
    id: "recordings",
    title: "Recordings and transcripts",
    body: "Recording is optional and off unless you agree in the lobby before joining. Transcripts exist to show your corrections and can-do evidence.",
    points: ["Deletion on request completes within 24 hours.", "Short retention for raw audio; transcripts stay until you delete them."],
  },
  {
    id: "fair-use",
    title: "Fair use",
    body: "One account per learner. No harassment of other learners, no attempts to override the tutor's instructions, and no misuse of rooms, transcripts, or review queues.",
    points: ["Report, mute, and block are available in group settings.", "Slang and profanity are legitimate learning content and are taught with register labels — context matters."],
  },
  {
    id: "payments",
    title: "Payments and refunds",
    body: "Payments are handled by Stripe plus local methods such as UPI — card and bank details go to the processor, never to our servers. Refund requests are handled per the plan terms shown at checkout.",
  },
  {
    id: "changes-contact",
    title: "Changes and contact",
    body: "If these terms change in a way that matters, we will note the new date at the top of this page before the change takes effect. Questions about any of the above: contact us and a human replies. This page is a plain-language summary, not legal advice.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="sticky top-0 z-20 bg-[var(--color-parchment)]/85 backdrop-blur border-b border-[var(--color-forest-ink)]/10">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <Link
            href="/"
            className="text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[20px] md:gap-[28px]">
        <div className="max-w-[720px]">
          <PillBadge>Legal · Terms of Service</PillBadge>
          <h1 className="mt-[12px] text-[36px] md:text-[47px] font-medium leading-[1] tracking-[-0.02em] md:tracking-[-1.13px] text-[var(--color-forest-ink)]">
            Terms of Service.
          </h1>
          <p className="mt-[10px] text-[19px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Short version: pay for real classes, show up, treat the room well, own your progress.
          </p>
          <p className="mt-[8px] text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
            Effective September 2026 · 4 min read · plain-language summary, not legal advice
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-[20px] md:gap-[28px] items-start">
          <nav
            aria-label="Contents"
            className="w-full lg:w-[240px] lg:shrink-0 lg:sticky lg:top-[88px] rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]"
          >
            <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Contents</p>
            <ol className="mt-[10px] flex lg:flex-col gap-[6px] overflow-x-auto pb-[2px] lg:pb-0">
              {SECTIONS.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-[8px] rounded-[8px] px-[8px] py-[6px] text-[13px] text-[var(--color-lichen-gray)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-forest-ink)] transition-colors"
                  >
                    <span className="text-[11px] font-medium tabular-nums text-[var(--color-mist)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-nowrap lg:whitespace-normal">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="flex-1 w-full max-w-[720px] rounded-[14px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] px-[18px] md:px-[28px] py-[8px] md:py-[12px]">
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-[88px] py-[18px] md:py-[22px] border-b border-[var(--color-forest-ink)]/10 last:border-b-0">
                <div className="flex items-baseline gap-[10px]">
                  <span className="text-[13px] font-medium tabular-nums text-[var(--color-mist)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--color-forest-ink)]">{s.title}</h2>
                </div>
                <p className="mt-[10px] text-[15px] leading-[1.65] text-[var(--color-forest-ink)]">{s.body}</p>
                {s.points && (
                  <ul className="mt-[12px] flex flex-col gap-[8px]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-[10px] text-[15px] leading-[1.65] text-[var(--color-forest-ink)]">
                        <span aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-forest-ink)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="border-t border-[var(--color-forest-ink)]/10 py-[22px] mt-auto">
        <div className="mx-auto flex max-w-[1200px] flex-col md:flex-row items-center justify-between gap-[10px] px-[20px] md:px-[24px] text-[11px] tracking-[0.04em] text-[var(--color-mist)]">
          <span>© 2026 Lingua — a real school, at a fraction of a tutor&apos;s cost.</span>
          <span className="flex gap-[14px]">
            <a href="/terms" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Terms
            </a>
            <a href="/privacy" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
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
