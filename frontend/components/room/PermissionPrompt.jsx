"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

// PRD CR-1 lobby — iOS-style permission popup (frontend only, no backend).
// Shown when mic/camera getUserMedia fails with NotAllowedError/SecurityError.
// Allow = retry getUserMedia inside the tap gesture (only way to re-prompt).
// If the browser has permanently denied, retry fails again and the inline
// lobby error keeps the site-settings guidance — this popup never promises
// what the browser won't give.

const COPY = {
  mic: {
    title: "Microphone blocked",
    body: "Lingua needs your mic to join — the tutor listens verbatim. Tap Allow to try again.",
    hint: "Still blocked? Tap the lock icon → Site settings → Microphone → Allow, then Allow below.",
  },
  camera: {
    title: "Camera blocked",
    body: "Camera is optional — you can join with mic only. Tap Allow to try again.",
    hint: "Still blocked? Tap the lock icon → Site settings → Camera → Allow, then Allow below.",
  },
};

export default function PermissionPrompt({
  open = false,
  type = "mic",
  onAllow,
  onDismiss,
  onContinueWithoutCamera,
}) {
  const kind = type === "camera" ? "camera" : "mic";
  const copy = COPY[kind];

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onDismiss?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-[20px] pb-[calc(20px+env(safe-area-inset-bottom))] animate-fade-in"
      role="presentation"
      onClick={() => onDismiss?.()}
    >
      <div className="absolute inset-0 bg-[var(--color-forest-ink)]/40 backdrop-blur-[2px]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[340px] rounded-[20px] bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] p-[20px] text-center animate-scale-in"
      >
        <p className="text-[11px] tracking-[0.08em] uppercase text-[var(--color-mist)]">
          {kind === "mic" ? "Mic needed" : "Camera optional"}
        </p>
        <p className="mt-[6px] text-[17px] font-medium text-[var(--color-forest-ink)] leading-[1.25]">
          {copy.title}
        </p>
        <p className="mt-[8px] text-[13px] leading-[1.5] text-[var(--color-lichen-gray)]">
          {copy.body}
        </p>
        <p className="mt-[8px] text-[11px] leading-[1.5] text-[var(--color-mist)]">
          {copy.hint}
        </p>
        <div className="mt-[16px] grid gap-[8px]">
          <Button variant="filled" size="sm" className="w-full" autoFocus onClick={() => onAllow?.()}>
            Allow {kind === "mic" ? "microphone" : "camera"} →
          </Button>
          {kind === "camera" ? (
            <Button variant="outlined" size="sm" className="w-full" onClick={() => onContinueWithoutCamera?.()}>
              Continue without camera
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" className="w-full" onClick={() => onDismiss?.()}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}
