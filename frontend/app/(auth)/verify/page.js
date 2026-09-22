"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { api } from "@/lib/api";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [emailInput, setEmailInput] = useState(email);
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);

  function onChange(idx, v) {
    const val = v.replace(/[^0-9]/g, "").slice(-1);
    const next = [...codes];
    next[idx] = val;
    setCodes(next);
    setError("");
    setServerError("");
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function onKeyDown(idx, e) {
    if (e.key === "Backspace" && !codes[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function onPaste(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!paste.length) return;
    const next = [...codes];
    paste.forEach((c, i) => (next[i] = c));
    setCodes(next);
    const last = Math.min(paste.length, 6) - 1;
    inputsRef.current[last]?.focus();
  }

  async function onVerify(ev) {
    ev.preventDefault();
    const code = codes.join("");
    if (code.length !== 6) return setError("Enter the 6-digit code");
    if (!emailInput.trim()) return setError("Email is required");
    setLoading(true);
    setServerError("");
    try {
      await api.verify({ email: emailInput.trim().toLowerCase(), code });
      router.push("/onboarding");
    } catch (err) {
      setServerError(err.data?.error || err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    if (!emailInput.trim()) return setServerError("Enter your email first");
    setResending(true);
    setServerError("");
    try {
      const data = await api.post("/auth/resend-code", { email: emailInput.trim().toLowerCase() });
      setServerError(`Code resent — devCode: ${data.devCode || "check backend console"}`);
    } catch (err) {
      setServerError(err.data?.error || err.message);
    } finally {
      setResending(false);
      setTimeout(() => setServerError(""), 4000);
    }
  }

  return (
    <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <div className="mb-[22px] flex flex-col gap-[14px]">
        <PillBadge>Check your inbox</PillBadge>
        <div>
          <h1 className="text-[28px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            Verify your email
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Code is logged to backend console in dev (no email sent). Enter email + 6-digit code — 123456 also works in dev.
          </p>
        </div>
      </div>

      <form onSubmit={onVerify} className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="verify-email" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
            Email
          </label>
          <input
            id="verify-email"
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="you@domain.com"
            className="h-[44px] w-full rounded-[12px] bg-white border border-[var(--color-mist)]/30 px-[14px] text-[14px] placeholder:text-[var(--color-mist)] outline-none focus:border-[var(--color-forest-ink)]"
          />
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">6-digit code</p>
          <div className="mt-[10px] flex gap-[8px]" onPaste={onPaste}>
            {codes.map((c, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                inputMode="numeric"
                autoComplete="one-time-code"
                value={c}
                onChange={(e) => onChange(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                className={`h-[48px] w-full rounded-[12px] border bg-white text-center text-[18px] font-medium tracking-[0.04em] outline-none transition-colors ${error ? "border-red-400" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"}`}
                placeholder="·"
              />
            ))}
          </div>
          {error && <p className="mt-[6px] text-[12px] text-red-600">{error}</p>}
          {serverError && <p className="mt-[6px] text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-[8px] px-[10px] py-[8px]">{serverError}</p>}
        </div>

        <Button type="submit" variant="filled" size="lg" className="w-full" disabled={loading}>
          {loading ? "Verifying…" : "Verify & continue →"}
        </Button>

        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[var(--color-lichen-gray)]">Didn&apos;t get it?</span>
          <button type="button" onClick={onResend} disabled={resending} className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2 disabled:opacity-50">
            {resending ? "Sending…" : "Resend code"}
          </button>
        </div>

        <p className="text-center text-[13px] text-[var(--color-lichen-gray)]">
          Wrong email? <a href="/signup" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">Go back</a>
        </p>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-[14px] bg-white p-[28px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
          <p className="text-[14px] text-[var(--color-lichen-gray)]">Loading…</p>
        </div>
      }
    >
      <VerifyInner />
    </Suspense>
  );
}
