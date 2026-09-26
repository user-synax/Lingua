import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

// Public page — no AuthGuard/GuestGuard. Pricing follows PRD §11
// as written: it is hypotheses under test, not decided prices.
// Three beta test points ($59/$79/$99), same bundle in each,
// core hypothesis (12 class-hours + async study) on $79.
// No checkout here — billing (AD-2) is backend work, out of scope.
const BUNDLE = [
  "Live 60-minute group classes, groups of 4",
  "Shared Board + every doubt answered live",
  "Recap, homework (10–15 min), spaced deck",
  "Can-do progress with evidence — no XP",
  "Calendar invites + reminders, no guilt",
];

const TIERS = [
  {
    price: "$59",
    per: "/month",
    tag: "Beta test point",
    tint: "bg-[var(--color-mint-surface)]",
    note: "Same bundle — one of three prices we're testing.",
  },
  {
    price: "$79",
    per: "/month",
    tag: "Core hypothesis",
    tint: "bg-[var(--color-lime-surface)]",
    note: "12 class-hours/month + unlimited async study.",
    featured: true,
  },
  {
    price: "$99",
    per: "/month",
    tag: "Beta test point",
    tint: "bg-[var(--color-lavender-surface)]",
    note: "Same bundle — one of three prices we're testing.",
  },
];

export default function PricingPage() {
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
          <PillBadge withArrow>Pricing · Private beta</PillBadge>
          <h1 className="mt-[16px] max-w-[800px] text-[42px] md:text-[72px] font-medium leading-[0.9] tracking-[-0.02em] md:tracking-[-1.73px] text-[var(--color-forest-ink)]">
            One plan. Real classes.
          </h1>
          <p className="mt-[16px] max-w-[640px] text-[16px] md:text-[19px] leading-[1.5] text-[var(--color-lichen-gray)]">
            A subscription with a class-hour allowance — a fraction of a human tutor ($10–30/hr). These are beta prices we&apos;re testing, not final prices.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-[20px] md:px-[24px] pt-[32px]">
          <div className="grid md:grid-cols-3 gap-[16px]">
            {TIERS.map((t) => (
              <div
                key={t.price}
                className={`rounded-[14px] ${t.tint} p-[22px] border ${t.featured ? "border-[var(--color-forest-ink)]/25 shadow-[var(--shadow-md)]" : "border-[var(--color-forest-ink)]/5"}`}
              >
                <p className="inline-flex rounded-full bg-[var(--color-forest-ink)] px-[10px] py-[5px] text-[11px] font-medium tracking-[0.06em] uppercase text-white">
                  {t.tag}
                </p>
                <p className="mt-[12px] text-[47px] font-medium leading-[1] tracking-[-1.13px] text-[var(--color-forest-ink)]">
                  {t.price}
                  <span className="text-[16px] font-normal tracking-normal text-[var(--color-lichen-gray)]">{t.per}</span>
                </p>
                <p className="mt-[8px] text-[14px] leading-[1.5] text-[var(--color-lichen-gray)]">{t.note}</p>
                <ul className="mt-[14px] grid gap-[8px]">
                  {BUNDLE.map((b) => (
                    <li key={b} className="rounded-[12px] bg-white px-[12px] py-[10px] border border-[var(--color-forest-ink)]/10 text-[13px] leading-[1.4] text-[var(--color-forest-ink)]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-[16px] rounded-[14px] bg-[var(--color-buttercream)] border border-[var(--color-forest-ink)]/10 p-[16px]">
            <p className="text-[13px] leading-[1.5] text-[var(--color-forest-ink)]">
              Free placement plus one trial class before you pay. Checkout opens with your beta invite — setup now puts you on the list.
            </p>
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
