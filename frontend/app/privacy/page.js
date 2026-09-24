import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard so it opens for logged-out
// signups and logged-in learners alike. Plain-language summary of
// PRD §16; not legal advice. Claims match what the app actually does.
// Same clause-card language as /terms (one column, numbered cards),
// but privacy-owned scope: data only. Rules live in /terms.
const CLAUSES = [
  {
    title: "What we store",
    body: "We store only what your classes need — nothing else: your account (name, email, login credentials), your onboarding (target language, own language, goal, deadline, weekly hours, availability windows, time zone), and your rooms (room name, who created it, language and level).",
  },
  {
    title: "What stays on your device",
    body: "Your placement answers never leave your browser. The mock score is kept in this device's local storage only, so retaking placement on another device starts fresh. Clearing site data removes it.",
  },
  {
    title: "Recordings and transcripts",
    body: "Class recordings are optional and off unless you agree in the lobby — the notice there tells you before you join. Transcripts exist to show your corrections and can-do evidence, not to profile you. Deletion on request completes within 24 hours.",
  },
  {
    title: "Voice data",
    body: "Voice runs the class, transcribes what was said verbatim, and scores pronunciation. Our pacing adapts only to response time and error rate — we never build voiceprints and never infer emotions from camera or voice.",
  },
  {
    title: "Your learner model",
    body: "We keep a per-learner record so teaching compounds: error patterns with counts, vocabulary state for review, pronunciation issues by sound, plus your goal, interests, and preferred pace. It feeds your recap, homework, and review deck — nothing else.",
  },
  {
    title: "Payments",
    body: "Payments are handled by Stripe plus local methods such as UPI — your card or bank details go to them, never to our servers. We keep only the fact of your subscription (plan and status) so we can unlock your classes.",
  },
  {
    title: "Cookies and tracking",
    body: "We run no advertising trackers and sell no data. The essentials: a session cookie that keeps you logged in, and local storage for your unfinished placement attempt. Nothing follows you around the web.",
  },
  {
    title: "Your rights",
    body: "Edit your name and plan from your account page, and delete your account there at any time — deletion removes your account and stored answers. Copies of your data, corrections, and regional requests (GDPR, India's DPDP Act, CCPA): contact us and we will respond.",
  },
];

export default function PrivacyPage() {
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
          <PillBadge>Legal · Privacy Policy</PillBadge>
          <h1 className="mt-[12px] text-[36px] md:text-[47px] font-medium leading-[1] tracking-[-0.02em] md:tracking-[-1.13px] text-[var(--color-forest-ink)]">
            Privacy Policy.
          </h1>
          <p className="mt-[10px] text-[19px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Short version: your plan runs your classes, your voice teaches you, nothing tracks you.
          </p>
          <p className="mt-[8px] text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
            Effective September 2026 · 4 min read · plain-language summary, not legal advice
          </p>
        </div>

        <div className="rounded-[14px] bg-[var(--color-mint-surface)] border border-[var(--color-forest-ink)]/10 p-[18px] shadow-[var(--shadow-md)]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">The short version</p>
          <ul className="mt-[10px] grid gap-[8px] text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
            <li>Only class-essential data — account, plan, rooms, learner model.</li>
            <li>Placement stays on your device; recordings stay off unless you agree.</li>
            <li>No trackers, no sale of data, deletion on request.</li>
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

        <div className="rounded-[14px] bg-[var(--color-lavender-surface)] border border-[var(--color-forest-ink)]/10 p-[18px]">
          <p className="text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
            The rules of the classroom — classes, payments, and fair use — live in our{" "}
            <Link href="/terms" className="font-medium underline underline-offset-2">
              Terms of Service
            </Link>
            . Policy changes that matter get a new date at the top before they take effect.
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
            <a href="#" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
              Contact
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
