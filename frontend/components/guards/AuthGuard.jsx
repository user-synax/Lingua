"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children, redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [loading, user, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-[var(--color-parchment)]">
        <div className="flex flex-col items-center gap-[12px]">
          <div className="h-[32px] w-[32px] rounded-full border-[2px] border-[var(--color-forest-ink)]/15 border-t-[var(--color-forest-ink)] animate-spin" />
          <p className="text-[13px] text-[var(--color-lichen-gray)]">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-[13px] text-[var(--color-lichen-gray)]">Redirecting to login…</p>
      </div>
    );
  }

  return <>{children}</>;
}
