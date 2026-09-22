"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PillBadge } from "@/components/ui/Badge";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { fetchMe } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false, age: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function upd(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
    setServerError("");
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    else if (form.name.trim().length < 2) e.name = "Enter your full name";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Create a password";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (!form.age) e.age = "You must confirm you are 18+";
    if (!form.agree) e.agree = "Please accept the Terms";
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
      await api.signup({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        ageConfirmed: form.age,
        agree: form.agree,
      });
      await fetchMe();
      router.push("/onboarding");
    } catch (err) {
      if (err.data?.issues) {
        const mapped = {};
        err.data.issues.forEach((i) => {
          const field = i.path.replace("body.", "");
          mapped[field] = i.message;
        });
        setErrors(mapped);
      } else {
        setServerError(err.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[14px] bg-white p-[28px] md:p-[32px] shadow-[var(--shadow-md)] border border-[var(--color-forest-ink)]/[0.06]">
      <div className="mb-[22px] flex flex-col gap-[14px]">
        <PillBadge withArrow>Start your first class</PillBadge>
        <div>
          <h1 className="text-[28px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-forest-ink)]">
            Create your account
          </h1>
          <p className="mt-[8px] text-[14px] leading-[1.4] text-[var(--color-lichen-gray)]">
            90 seconds to a plan that fits your week. No streaks, no XP — just a timetable.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setServerError("Google login is not available yet — please use email.")}
        className="flex h-[44px] w-full items-center justify-center gap-[10px] rounded-[12px] border border-[var(--color-forest-ink)]/15 bg-white text-[14px] font-medium text-[var(--color-forest-ink)] hover:bg-[var(--color-parchment)] transition-colors"
      >
        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-black/10 text-[11px] font-bold bg-white">G</span>
        Continue with Google
      </button>
      {serverError && serverError.includes("Google") && (
        <p className="mt-[8px] text-center text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-[10px] px-[10px] py-[8px]">
          {serverError}
        </p>
      )}

      <div className="my-[18px] flex items-center gap-[12px]">
        <span className="h-px flex-1 bg-[var(--color-forest-ink)]/10" />
        <span className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">or email</span>
        <span className="h-px flex-1 bg-[var(--color-forest-ink)]/10" />
      </div>

      {serverError && !serverError.includes("Google") && (
        <div className="mb-[12px] rounded-[10px] bg-red-50 border border-red-200 px-[12px] py-[10px] text-[13px] text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[14px]">
        <Input
          id="name"
          label="Full name"
          placeholder="Avery Lumen"
          autoComplete="name"
          value={form.name}
          onChange={(e) => upd("name", e.target.value)}
          error={errors.name}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@domain.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => upd("email", e.target.value)}
          error={errors.email}
        />

        <div className="flex flex-col gap-[6px]">
          <label htmlFor="password" className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--color-slate)]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => upd("password", e.target.value)}
              className={`h-[44px] w-full rounded-[12px] bg-white border px-[14px] pr-[42px] text-[14px] placeholder:text-[var(--color-mist)] outline-none transition-colors ${errors.password ? "border-red-400" : "border-[var(--color-mist)]/30 focus:border-[var(--color-forest-ink)] focus:ring-[1.5px] focus:ring-[var(--color-forest-ink)]/10"}`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-[8px] top-1/2 -translate-y-1/2 grid h-[28px] w-[28px] place-items-center rounded-full text-[var(--color-lichen-gray)] hover:bg-[var(--color-parchment)]"
            >
              <span className="text-[12px]">{showPw ? "◯" : "◎"}</span>
            </button>
          </div>
          {!errors.password && <p className="text-[12px] text-[var(--color-lichen-gray)]">Must be 8+ characters. No complexity circus.</p>}
          {errors.password && <p className="text-[12px] text-red-600">{errors.password}</p>}
        </div>

        <label className={`flex gap-[10px] rounded-[12px] border p-[12px] ${errors.age ? "border-red-300 bg-red-50/40" : "border-[var(--color-forest-ink)]/10 bg-[var(--color-mint-surface)]/50"}`}>
          <input
            type="checkbox"
            checked={form.age}
            onChange={(e) => upd("age", e.target.checked)}
            className="mt-[2px] h-[16px] w-[16px] rounded-[5px] accent-[var(--color-forest-ink)]"
          />
          <span className="text-[13px] leading-[1.4] text-[var(--color-slate)]">
            I confirm I am 18 years or older.
            <span className="block text-[11px] text-[var(--color-lichen-gray)]">Lingua is for adults — we avoid children&apos;s-data regimes.</span>
          </span>
        </label>
        {errors.age && <p className="-mt-[8px] text-[12px] text-red-600">{errors.age}</p>}

        <label className="flex gap-[10px] text-[13px] leading-[1.4] text-[var(--color-lichen-gray)]">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => upd("agree", e.target.checked)}
            className="mt-[2px] h-[16px] w-[16px] rounded-[5px] accent-[var(--color-forest-ink)]"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
              Privacy
            </a>
            . Recordings are optional and deletable.
          </span>
        </label>
        {errors.agree && <p className="-mt-[8px] text-[12px] text-red-600">{errors.agree}</p>}

        <Button type="submit" variant="filled" size="lg" className="mt-[4px] w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create account →"}
        </Button>

        <p className="text-center text-[13px] text-[var(--color-lichen-gray)]">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-[var(--color-forest-ink)] underline underline-offset-2">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
