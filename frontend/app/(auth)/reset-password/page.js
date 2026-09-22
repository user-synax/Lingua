"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PillBadge } from "@/components/ui/Badge";
import { api } from "@/lib/api";

function ResetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const emailParam = params.get("email") || "";
  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");
    const errs = {};
    if (!email.trim()) errs.email = "Email required";
    if (!/^\d{6}$/.test(code)) errs.code = "6-digit code required";
    if (password.length < 8) errs.password = "At least 8 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await api.reset({ email: email.trim().toLowerCase(), code, newPassword: password });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setServerError(err.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06] text-center">
        <PillBadge>Done</PillBadge>
        <h1 className="mt-[14px] text-[22px] font-medium text-[var(--color-forest-ink)]">Password updated</h1>
        <p className="mt-[8px] text-[13px] text-[var(--color-lichen-gray)]">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <div className="mb-[22px] flex flex-col gap-[14px]">
        <PillBadge>Set a new password</PillBadge>
        <div>
          <h1 className="text-[28px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">Reset password</h1>
          <p className="mt-[8px] text-[14px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Code from backend console (or 123456 in dev) + new password. Code expires in 15 min.
          </p>
        </div>
      </div>

      {serverError && <div className="mb-[14px] rounded-[10px] bg-red-50 border border-red-200 px-[12px] py-[10px] text-[13px] text-red-700">{serverError}</div>}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[14px]">
        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@domain.com" />
        <Input id="code" label="6-digit code" type="text" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} error={errors.code} placeholder="123456" />
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="newPassword" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
            New password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={`h-[44px] w-full rounded-[12px] bg-white border px-[14px] pr-[42px] text-[14px] placeholder:text-[var(--color-mist)] outline-none ${errors.password ? "border-red-400" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)]"}`}
            />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-[8px] top-1/2 -translate-y-1/2 grid h-[28px] w-[28px] place-items-center rounded-full text-[var(--color-lichen-gray)]">
              <span className="text-[12px]">{showPw ? "◯" : "◎"}</span>
            </button>
          </div>
          {errors.password && <p className="text-[12px] text-red-600">{errors.password}</p>}
        </div>
        <Button type="submit" variant="filled" size="lg" className="w-full" disabled={loading}>
          {loading ? "Updating…" : "Update password →"}
        </Button>
        <p className="text-center text-[13px] text-[var(--color-lichen-gray)]">
          <a href="/login" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
            Back to log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="rounded-[14px] bg-white p-[28px] border">Loading…</div>}>
      <ResetInner />
    </Suspense>
  );
}
