"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PillBadge } from "@/components/ui/Badge";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { fetchMe } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await api.login({ email: email.trim().toLowerCase(), password });
      await fetchMe();
      router.push("/onboarding");
    } catch (err) {
      if (err.data?.issues) {
        const mapped = {};
        err.data.issues.forEach((i) => (mapped[i.path.replace("body.", "")] = i.message));
        setErrors(mapped);
      } else {
        setServerError(err.data?.error || err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <div className="mb-[22px] flex flex-col gap-[14px]">
        <PillBadge withArrow>Welcome back</PillBadge>
        <div>
          <h1 className="text-[28px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            Log in to Lingua
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.4] text-[var(--color-lichen-gray)]">
            Your timetable, your class, your teacher — right where you left it.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setServerError("Google login is not available yet — please use email.")}
        className="flex h-[44px] w-full items-center justify-center gap-[10px] rounded-[12px] border border-[var(--color-forest-ink)]/15 bg-white text-[14px] font-medium text-[var(--color-forest-ink)] hover:bg-[var(--color-parchment)] transition-colors"
      >
        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white border border-black/10 text-[11px] font-bold">G</span>
        Continue with Google
      </button>
      {serverError && serverError.includes("Google") && (
        <p className="mt-[8px] text-center text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-[10px] px-[10px] py-[8px]">
          {serverError}
        </p>
      )}

      <div className="my-[18px] flex items-center gap-[12px]">
        <span className="h-px flex-1 bg-[var(--color-forest-ink)]/10" />
        <span className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">or</span>
        <span className="h-px flex-1 bg-[var(--color-forest-ink)]/10" />
      </div>

      {serverError && !serverError.includes("Google") && (
        <div className="mb-[14px] rounded-[10px] bg-red-50 border border-red-200 px-[12px] py-[10px] text-[13px] text-red-700">
          {serverError}
        </div>
      )}

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
            setServerError("");
          }}
          error={errors.email}
        />

        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
              Password
            </label>
            <a href="/forgot-password" className="text-[12px] font-medium text-[var(--color-forest-ink)] underline underline-offset-2 hover:opacity-80">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setServerError("");
              }}
              className={`h-[44px] w-full rounded-[12px] bg-white border px-[14px] pr-[42px] text-[14px] placeholder:text-[var(--color-mist)] outline-none transition-colors ${errors.password ? "border-red-400" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"}`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-[8px] top-1/2 -translate-y-1/2 grid h-[28px] w-[28px] place-items-center rounded-full text-[var(--color-lichen-gray)] hover:bg-[var(--color-parchment)] hover:text-[var(--color-forest-ink)]"
            >
              <span className="text-[12px]">{showPw ? "◯" : "◎"}</span>
            </button>
          </div>
          {errors.password && <p className="text-[12px] text-red-600">{errors.password}</p>}
        </div>

        <label className="mt-[2px] flex items-center gap-[8px] text-[13px] text-[var(--color-lichen-gray)]">
          <input type="checkbox" defaultChecked className="h-[16px] w-[16px] rounded-[5px] border-[var(--color-mist)] accent-[var(--color-forest-ink)]" />
          Keep me signed in
        </label>

        <Button type="submit" variant="filled" size="lg" className="mt-[6px] w-full" disabled={loading}>
          {loading ? "Signing in…" : "Log in →"}
        </Button>

        <p className="text-center text-[13px] leading-[1.4] text-[var(--color-lichen-gray)]">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
            Create account
          </a>
        </p>
      </form>

      <p className="mt-[18px] rounded-[10px] bg-[var(--color-mint-surface)] px-[12px] py-[10px] text-[11px] leading-[1.4] text-[var(--color-slate)]">
        Lingua is 18+ only. By continuing you confirm you are 18 or older and agree to our Terms.
      </p>
    </div>
  );
}
