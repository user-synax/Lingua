"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GuestGuard({ children, redirectTo = "/dashboard" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [loading, user, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-[12px] animate-pulse">
          <div className="h-[32px] w-[32px] rounded-full bg-[var(--color-forest-ink)]/10 animate-spin border-[2px] border-[var(--color-forest-ink)]/20 border-t-[var(--color-forest-ink)]" />
          <p className="text-[13px] text-[var(--color-lichen-gray)]">Checking session…</p>
        </div>
      </div>
    );
  }

  if (user) {
    // avoid flash while redirecting
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-[13px] text-[var(--color-lichen-gray)]">Redirecting to dashboard…</p>
      </div>
    );
  }

  return <>{children}</>;
}
