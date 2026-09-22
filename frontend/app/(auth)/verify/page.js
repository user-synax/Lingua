"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "you@domain.com";

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);

  function onChange(idx, v) {
    const val = v.replace(/[^0-9]/g, "").slice(-1);
    const next = [...codes];
    next[idx] = val;
    setCodes(next);
    setError("");
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

  function onVerify(ev) {
    ev.preventDefault();
    const code = codes.join("");
    if (code.length !== 6) return setError("Enter the 6-digit code");
    router.push("/onboarding");
  }

  function onResend() {
    setResending(true);
    setTimeout(() => setResending(false), 900);
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
            We sent a 6-digit code to <span className="font-medium text-[var(--color-forest-ink)]">{email}</span>. It expires in 10 minutes.
          </p>
        </div>
      </div>

      <form onSubmit={onVerify} className="flex flex-col gap-[16px]">
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
          <p className="mt-[8px] text-[11px] text-[var(--color-mist)]">
            Demo code: <span className="font-medium text-[var(--color-forest-ink)]">123456</span> — any 6 digits will work in this pure-UI demo.
          </p>
          {error && <p className="mt-[6px] text-[12px] text-red-600">{error}</p>}
        </div>

        <Button type="submit" variant="filled" size="lg" className="w-full">
          Verify & continue →
        </Button>

        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[var(--color-lichen-gray)]">Didn&apos;t get it?</span>
          <button
            type="button"
            onClick={onResend}
            disabled={resending}
            className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2 disabled:opacity-50"
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        </div>

        <div className="rounded-[12px] bg-[var(--color-lavender-surface)] border border-[var(--color-forest-ink)]/10 px-[14px] py-[12px]">
          <p className="text-[12px] font-medium text-[var(--color-forest-ink)]">Tip</p>
          <p className="mt-[4px] text-[12px] leading-[1.5] text-[var(--color-lichen-gray)]">Check spam, and if you use Gmail try the “Updates” tab. The code is single-use.</p>
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
