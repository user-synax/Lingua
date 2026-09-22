"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PillBadge } from "@/components/ui/Badge";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devCode, setDevCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    setError("");
    setLoading(true);
    try {
      const data = await api.forgot({ email: email.trim().toLowerCase() });
      setDevCode(data.devCode || "");
      setSent(true);
    } catch (err) {
      setError(err.data?.error || err.message);
    } finally {
      setLoading(false);
    }
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
            Enter your email — we log a 6-digit code to the backend console (no email sent in dev). Use it on the next page.
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
          <Button type="submit" variant="filled" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset code →"}
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
            <p className="text-[14px] font-medium text-[var(--color-forest-ink)]">Check backend console</p>
            <p className="mt-[4px] text-[13px] leading-[1.5] text-[var(--color-slate)]">
              If <span className="font-medium text-[var(--color-forest-ink)]">{email}</span> is registered, a code was logged to the backend and expires in 15 minutes.
              {devCode && (
                <span className="mt-[8px] block rounded-[8px] bg-white border border-[var(--color-forest-ink)]/10 px-[10px] py-[8px] font-mono text-[13px] text-[var(--color-forest-ink)]">
                  Dev code: {devCode} (copy to reset page)
                </span>
              )}
            </p>
          </div>
          <div className="rounded-[12px] bg-white border border-[var(--color-forest-ink)]/10 p-[14px]">
            <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">Next</p>
            <a href={`/reset-password?email=${encodeURIComponent(email)}`} className="mt-[8px] inline-flex text-[13px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
              Go to reset password →
            </a>
          </div>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-[13px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2"
          >
            Try different email
          </button>
          <a href="/login">
            <Button variant="outlined" size="lg" className="w-full">
              Back to log in
            </Button>
          </a>
        </div>
      )}

      <p className="mt-[18px] text-center text-[11px] text-[var(--color-mist)]">No real email sent — code is in backend logs. Secure httpOnly cookies.</p>
    </div>
  );
}
