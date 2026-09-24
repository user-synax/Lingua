"use client";

import { useState } from "react";
import Link from "next/link";
import { PillBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinguaLogo } from "@/components/ui/Logo";

// TODO (merge-blocker): replace with the real support address.
// No backend form on this page by design — email only.
const SUPPORT_EMAIL = "support@example.com";

const SELF_SERVE = [
  { href: "/account", title: "Account, plan & deletion", desc: "Edit your name and plan, or delete your account." },
  { href: "/onboarding", title: "Plan setup", desc: "Language, goal, hours, and weekly windows." },
  { href: "/privacy", title: "Privacy Policy", desc: "What we store, recordings, your rights." },
  { href: "/terms", title: "Terms of Service", desc: "Classes, payments, and fair use." },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

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
          <PillBadge>Support · Contact</PillBadge>
          <h1 className="mt-[12px] text-[36px] md:text-[47px] font-medium leading-[1] tracking-[-0.02em] md:tracking-[-1.13px] text-[var(--color-forest-ink)]">
            Contact.
          </h1>
          <p className="mt-[10px] text-[19px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Write to us — a human replies.
          </p>
        </div>

        <div className="rounded-[14px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] p-[18px] md:p-[22px]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Email us</p>
          <p className="mt-[8px] text-[22px] font-medium tracking-[-0.01em] text-[var(--color-forest-ink)] break-all">
            {SUPPORT_EMAIL}
          </p>
          <div className="mt-[14px] flex flex-wrap gap-[10px]">
            <a href={`mailto:${SUPPORT_EMAIL}`}>
              <Button variant="filled" size="sm">
                Write an email →
              </Button>
            </a>
            <Button variant="outlined" size="sm" onClick={copyEmail}>
              {copied ? "Copied ✓" : "Copy address"}
            </Button>
          </div>
        </div>

        <div className="rounded-[14px] bg-[var(--color-lime-surface)] border border-[var(--color-forest-ink)]/10 p-[18px]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-slate)]">Before you write</p>
          <ul className="mt-[10px] grid gap-[8px]">
            {SELF_SERVE.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between gap-[12px] rounded-[12px] bg-white px-[14px] py-[12px] border border-[var(--color-forest-ink)]/10 hover:border-[var(--color-forest-ink)]/30 transition-colors"
                >
                  <span>
                    <span className="block text-[14px] font-medium text-[var(--color-forest-ink)]">{s.title}</span>
                    <span className="block text-[12px] text-[var(--color-lichen-gray)]">{s.desc}</span>
                  </span>
                  <span aria-hidden className="text-[14px] text-[var(--color-lichen-gray)]">→</span>
                </Link>
              </li>
            ))}
          </ul>
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
