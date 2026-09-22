import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard so it opens for logged-out
// signups and logged-in learners alike. Plain-language summary of
// PRD §16; not legal advice. Claims match what the app actually does.
const SECTIONS = [
  {
    title: "18+ only",
    body: "Lingua is for adults (18+) only. We ask you to confirm this at signup so we never handle children's data.",
  },
  {
    title: "What we store",
    body: "Your account (name, email), your onboarding answers (language, goal, deadline, weekly hours, availability, time zone), and the rooms you create or join. Your placement answers never leave your browser — the mock score is kept in this device's local storage only.",
  },
  {
    title: "Recordings and transcripts",
    body: "Class recordings are optional and off unless you agree in the lobby. The lobby notice tells you before you join, and you can ask for a recording to be deleted — deletion completes within 24 hours.",
  },
  {
    title: "Voice data",
    body: "We never build voiceprints and never try to read emotions from your camera or voice. Voice is used only to run the class and to score pronunciation.",
  },
  {
    title: "The AI teacher",
    body: "The tutor always identifies as an AI tutor and never claims to be human. If it is unsure about a rule, it says so and points to the reference instead of guessing — and you can flag anything it says for review.",
  },
  {
    title: "Your rights",
    body: "You can edit your name and plan from your account page, and delete your account there at any time — deletion removes your account and stored answers. For anything else (questions, corrections, regional requests under GDPR, India's DPDP Act, or CCPA), contact us and we will respond.",
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

      <main className="mx-auto w-full max-w-[720px] px-[20px] md:px-[24px] py-[20px] md:py-[28px] flex flex-col gap-[18px]">
        <div>
          <PillBadge>Privacy · plain language</PillBadge>
          <h1 className="mt-[12px] text-[28px] md:text-[36px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            What we keep, and why.
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">
            Short version: your plan to run your classes, your voice to teach you, nothing to track you. Last updated September 2026.
          </p>
        </div>

        <div className="flex flex-col gap-[8px]">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-[14px] bg-white p-[18px] border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)]"
            >
              <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">{s.title}</p>
              <p className="mt-[8px] text-[14px] leading-[1.5] text-[var(--color-forest-ink)]">{s.body}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[var(--color-forest-ink)]/10 py-[22px] mt-auto">
        <div className="mx-auto flex max-w-[1200px] flex-col md:flex-row items-center justify-between gap-[10px] px-[20px] md:px-[24px] text-[11px] tracking-[0.04em] text-[var(--color-mist)]">
          <span>© 2026 Lingua — a real school, at a fraction of a tutor’s cost. 18+ only.</span>
          <span className="flex gap-[14px]">
            <a href="#" className="hover:text-[var(--color-lichen-gray)] underline underline-offset-2">
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
