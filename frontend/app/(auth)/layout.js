import { LinguaLogo } from "@/components/ui/Logo";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar — minimal, parchment */}
      <header className="sticky top-0 z-10 border-b border-[var(--color-forest-ink)]/10 bg-[var(--color-parchment)]/80 backdrop-blur">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-[20px] md:px-[24px]">
          <LinguaLogo />
          <a
            href="/"
            className="text-[13px] font-medium text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)] transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </header>

      {/* Centered card area */}
      <main className="flex flex-1 items-center justify-center px-[16px] py-[32px] md:py-[48px]">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>

      {/* Footer meta */}
      <footer className="py-[20px] text-center">
        <p className="text-[11px] tracking-[0.04em] text-[var(--color-mist)]">
          © 2026 Lingua — a real class, taught by an AI teacher · 18+ only ·{" "}
          <a href="#" className="underline decoration-[var(--color-mist)] underline-offset-2 hover:text-[var(--color-lichen-gray)]">
            Privacy
          </a>
        </p>
      </footer>
    </div>
  );
}
