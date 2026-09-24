import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard so it opens for logged-out
// signups and logged-in learners alike. Plain-language summary of
// PRD §16; not legal advice. Claims match what the app actually does.
const SECTIONS = [
  {
    id: "eligibility",
    title: "18+ only",
    body: "Lingua is for adults (18+) only. We ask you to confirm this at signup so we never knowingly handle children's data.",
    points: ["18+ confirmation is collected at signup.", "Accounts found to belong to minors are closed and their data deleted."],
  },
  {
    id: "what-we-store",
    title: "What we store",
    body: "We store only what your classes need — nothing else:",
    points: [
      "Account: name, email, login credentials.",
      "Onboarding: target language, own language, goal, deadline, weekly hours, availability windows, time zone.",
      "Rooms: room name, who created it, language and level.",
    ],
  },
  {
    id: "on-device-data",
    title: "What stays on your device",
    body: "Your placement answers never leave your browser. The mock score is kept in this device's local storage only, so retaking placement on another device starts fresh. Clearing site data removes it.",
  },
  {
    id: "recordings",
    title: "Recordings and transcripts",
    body: "Class recordings are optional and off unless you agree in the lobby — the notice there tells you before you join. Transcripts exist to show your corrections and can-do evidence, not to profile you.",
    points: ["Recording requires your agreement in the lobby, every time.", "Deletion on request completes within 24 hours."],
  },
  {
    id: "voice-data",
    title: "Voice data",
    body: "Voice is used to run the class, transcribe what was said verbatim, and score pronunciation. Our pacing adapts only to response time and error rate.",
    points: ["We never build voiceprints.", "We never infer emotions from camera or voice."],
  },
  {
    id: "ai-teacher",
    title: "The AI teacher",
    body: "The tutor always identifies as an AI tutor and never claims to be human when asked. If it is unsure about a rule, it says so and points to the reference instead of guessing.",
    points: ["Anything the tutor says can be flagged for human review.", "Reviewed mistakes fix the lesson material, not just the single answer."],
  },
  {
    id: "payments",
    title: "Payments",
    body: "Payments are handled by Stripe plus local methods such as UPI — your card or bank details go to them, never to our servers. We keep only the fact of your subscription (plan and status) so we can unlock your classes.",
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    body: "We run no advertising trackers and sell no data. The essentials: a session cookie that keeps you logged in, and local storage for your unfinished placement attempt. Nothing follows you around the web.",
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: "You can edit your name and plan from your account page, and delete your account there at any time — deletion removes your account and stored answers.",
    points: [
      "Copies of your data, corrections, and regional requests (GDPR, India's DPDP Act, CCPA): contact us and we will respond.",
    ],
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: "If this policy changes in a way that matters, we will note the new date at the top of this page before the change takes effect. Questions about any of the above: contact us and a human replies. This page is a plain-language summary, not legal advice.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex flex-col">
      <header className="liquid-glass-header sticky top-0 z-20 border-b border-[var(--color-forest-ink)]/10">
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <defs>
            <filter id="lg-privacy">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
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
          <PillBadge>Legal · Privacy Policy</PillBadge>
          <h1 className="mt-[12px] text-[36px] md:text-[47px] font-medium leading-[1] tracking-[-0.02em] md:tracking-[-1.13px] text-[var(--color-forest-ink)]">
            Privacy Policy.
          </h1>
          <p className="mt-[10px] text-[19px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Short version: your plan to run your classes, your voice to teach you, nothing to track you.
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
