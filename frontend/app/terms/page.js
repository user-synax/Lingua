import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard so it opens for logged-out
// signups and logged-in learners alike. Plain-language summary of
// the product rules in PRD §§4/6/9/13/16; not legal advice. Claims
// match what the app actually does. Deliberately NOT the privacy
// page template: terms read as numbered clauses in one column,
// while /privacy keeps the contents-sidebar document layout.
const CLAUSES = [
  {
    title: "Your account is yours",
    body: "One account per learner. Keep your login to yourself, keep your plan details up to date on the account page, and you can delete your account there at any time.",
  },
  {
    title: "What you pay for",
    body: "A subscription with a monthly allowance of live class-hours, plus unlimited asynchronous study — recaps, homework, and review decks built from your own mistakes. Placement and one trial class come before payment, so you see the plan before you pay.",
  },
  {
    title: "How classes run",
    body: "Classes are 60 minutes in small groups. Join from the dashboard link — camera optional, mic required. A class opens once enough learners book it; below that we offer a reschedule or a 1:1 audio session. Miss a class and the recording, notes, and a re-adjusted plan are waiting.",
  },
  {
    title: "Honest progress, no certificates",
    body: "Placement gives an estimated level band and skill profile — a starting point, not a verdict. Progress is measured in small sub-level steps backed by transcript evidence, and a full level takes on the order of 100–200+ hours. We never promise fluency on a deadline, and completion records are not official qualifications.",
  },
  {
    title: "The AI tutor",
    body: "Your tutor always identifies as an AI tutor and never claims to be human when asked. It teaches from vetted lesson material, says so when unsure, and points to the reference instead of guessing. Anything it says can be flagged for human review.",
  },
  {
    title: "Use the room well",
    body: "No harassment of other learners, no attempts to override the tutor's instructions, and no misuse of rooms, transcripts, or review queues. Report, mute, and block are available in group settings. Slang and profanity are legitimate learning content and are taught with register labels — context matters.",
  },
  {
    title: "Breaking these terms",
    body: "Misuse leads to a warning first, then suspension or closure of the account for repeat or serious cases. If your account is closed for misuse, unused class-hours from the current period are not refunded.",
  },
  {
    title: "Payments",
    body: "Payments run through Stripe plus local methods such as UPI — card and bank details go to the processor, never to our servers. Refunds follow the plan terms shown at checkout.",
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

      <main className="mx-auto w-full max-w-[720px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[20px]">
        <div>
          <PillBadge>Legal · Terms of Service</PillBadge>
          <h1 className="mt-[12px] text-[36px] md:text-[47px] font-medium leading-[1] tracking-[-0.02em] md:tracking-[-1.13px] text-[var(--color-forest-ink)]">
            Terms of Service.
          </h1>
          <p className="mt-[10px] text-[19px] leading-[1.4] text-[var(--color-lichen-gray)]">
            The rules of the classroom: what you pay for, how classes run, and how to keep your seat.
          </p>
          <p className="mt-[8px] text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
            Effective September 2026 · 3 min read · plain-language summary, not legal advice
          </p>
        </div>

        <div className="rounded-[14px] bg-[var(--color-buttercream)] border border-[var(--color-forest-ink)]/10 p-[18px] shadow-[var(--shadow-md)]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">The short version</p>
          <ul className="mt-[10px] grid gap-[8px] text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
            <li>Pay for real class-hours — placement and a trial class come first.</li>
            <li>Small groups; thin classes reschedule instead of running empty.</li>
            <li>Treat the room well — misuse costs the seat.</li>
          </ul>
        </div>

        <ol className="flex flex-col gap-[12px]">
          {CLAUSES.map((c, i) => (
            <li
              key={c.title}
              className="rounded-[14px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] p-[18px] md:p-[22px] flex gap-[14px]"
            >
              <span className="grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full bg-[var(--color-forest-ink)] text-[13px] font-medium tabular-nums text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-[17px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--color-forest-ink)]">{c.title}</h2>
                <p className="mt-[6px] text-[14px] leading-[1.6] text-[var(--color-slate)]">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-[14px] bg-[var(--color-mint-surface)] border border-[var(--color-forest-ink)]/10 p-[18px]">
          <p className="text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
            How we handle recordings, voice, and your data lives in our{" "}
            <Link href="/privacy" className="font-medium underline underline-offset-2">
              Privacy Policy
            </Link>
            . Questions about these terms: contact us and a human replies.
          </p>
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
            <a href="/contact" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
