"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PillBadge } from "@/components/ui/Badge";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    setError("");
    setSent(true);
  }

  return (
    <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <div className="mb-[22px] flex flex-col gap-[14px]">
        <PillBadge>Account recovery</PillBadge>
        <div>
          <h1 className="text-[28px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            Reset your password
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.4] text-[var(--color-lichen-gray)]">
            We&apos;ll send a reset link that expires in 30 minutes. No email — check spam and your other inbox.
          </p>
        </div>
      </div>

      {!sent ? (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[14px]">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            error={error}
            hint="Use the email you signed up with."
          />
          <Button type="submit" variant="filled" size="lg" className="w-full">
            Send reset link →
          </Button>
          <p className="text-center text-[13px] text-[var(--color-lichen-gray)]">
            Remembered?{" "}
            <a href="/login" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
              Back to log in
            </a>
          </p>
        </form>
      ) : (
        <div className="flex flex-col gap-[14px]">
          <div className="rounded-[12px] bg-[var(--color-sage-glow)] border border-[var(--color-forest-ink)]/10 px-[16px] py-[14px]">
            <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">Check your email</p>
            <p className="mt-[4px] text-[13px] leading-[1.5] text-[var(--color-slate)]">
              If <span className="font-medium text-[var(--color-forest-ink)]">{email}</span> is registered, you&apos;ll get a link in ~1 minute. The link is single-use. Didn&apos;t arrive?{" "}
              <button onClick={() => setSent(false)} className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
                Try again
              </button>
              .
            </p>
          </div>
          <div className="rounded-[12px] bg-white border border-[var(--color-forest-ink)]/10 p-[14px]">
            <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">What&apos;s next</p>
            <ul className="mt-[8px] list-disc pl-[16px] text-[13px] leading-[1.6] text-[var(--color-lichen-gray)]">
              <li>Link expires in 30 minutes</li>
              <li>Open on the same device if possible</li>
              <li>Contact support if you&apos;re locked out</li>
            </ul>
          </div>
          <a href="/login">
            <Button variant="outlined" size="lg" className="w-full">
              Back to log in
            </Button>
          </a>
        </div>
      )}

      <p className="mt-[18px] text-center text-[11px] text-[var(--color-mist)]">
        Demo only — no email is actually sent. Pure UI.
      </p>
    </div>
  );
}
