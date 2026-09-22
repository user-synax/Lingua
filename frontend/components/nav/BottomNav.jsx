"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function IconToday({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4H9v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" strokeWidth={active ? 2 : 1.85} strokeLinejoin="round" />
      <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth={active ? 2 : 1.85} strokeLinejoin="round" />
    </svg>
  );
}
function IconClasses({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth={active ? 2 : 1.85} />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth={active ? 2 : 1.85} strokeLinecap="round" />
      <circle cx="8.5" cy="14.5" r="1.6" fill="currentColor" opacity={active ? 1 : 0.9} />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" opacity={active ? 1 : 0.9} />
      <circle cx="15.5" cy="14.5" r="1.6" fill="currentColor" opacity={active ? 1 : 0.9} />
    </svg>
  );
}
function IconProgress({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 20V10M8 20V13M13 20V7M18 20V14" stroke="currentColor" strokeWidth={active ? 2.2 : 1.9} strokeLinecap="round" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth={active ? 2 : 1.85} strokeLinecap="round" />
    </svg>
  );
}
function IconAccount({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8.5" r="4.2" stroke="currentColor" strokeWidth={active ? 2 : 1.85} />
      <path d="M5 19a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth={active ? 2 : 1.85} strokeLinecap="round" />
    </svg>
  );
}

const TABS = [
  { id: "today", label: "Today", path: "/dashboard", Icon: IconToday },
  { id: "classes", label: "Classes", path: "/dashboard?tab=classes", Icon: IconClasses },
  { id: "progress", label: "Progress", path: "/dashboard?tab=progress", Icon: IconProgress },
  { id: "account", label: "Account", path: "/account", Icon: IconAccount },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  // direct derivation — fixes stale active state (was only watching pathname)
  let activeId = "today";
  if (pathname === "/account") activeId = "account";
  else if (tab === "classes") activeId = "classes";
  else if (tab === "progress") activeId = "progress";
  else if (pathname === "/dashboard") activeId = "today";

  return (
    <>
      {/* spacer — different heights for mobile vs desktop */}
      <div className="h-[84px] md:h-[88px]" aria-hidden />

      {/* ——— Mobile: full-width bottom bar, icon stacked above label ——— */}
      <nav aria-label="Primary mobile" className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[var(--color-forest-ink)]/10 md:hidden supports-[backdrop-filter]:bg-white/90">
        <div className="grid grid-cols-4 gap-0 px-1 pt-1 pb-[calc(6px+env(safe-area-inset-bottom))]">
          {TABS.map((t) => {
            const isActive = activeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => router.push(t.path)}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-[3px] py-[8px] rounded-2xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] pressable ${
                  isActive ? "text-[var(--color-forest-ink)]" : "text-[var(--color-lichen-gray)]"
                }`}
              >
                <span
                  className={`grid place-items-center h-[28px] w-[44px] rounded-full transition-all duration-200 ${isActive ? "bg-[var(--color-forest-ink)] text-white shadow-sm" : "bg-transparent"}`}
                  aria-hidden
                >
                  <t.Icon active={isActive} />
                </span>
                <span className={`text-[11px] leading-none tracking-[0.02em] ${isActive ? "font-semibold text-[var(--color-forest-ink)]" : "font-medium"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ——— Desktop: floating pill, centered ——— */}
      <nav aria-label="Primary desktop" className="hidden md:flex fixed bottom-0 inset-x-0 z-40 justify-center pointer-events-none px-[16px] pb-[20px]">
        <div className="pointer-events-auto flex items-center gap-[6px] rounded-full bg-white border border-[var(--color-forest-ink)]/10 shadow-[var(--shadow-md)] p-[8px] backdrop-blur supports-[backdrop-filter]:bg-white/95 animate-scale-in">
          {TABS.map((t) => {
            const isActive = activeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => router.push(t.path)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-[9px] rounded-full px-[18px] h-[48px] text-[13px] font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] pressable ${
                  isActive ? "bg-[var(--color-forest-ink)] text-white shadow-sm" : "text-[var(--color-lichen-gray)] hover:text-[var(--color-forest-ink)] hover:bg-[var(--color-parchment)]"
                }`}
              >
                <span className={`grid place-items-center h-[26px] w-[26px] rounded-full transition-colors duration-200 shrink-0 ${isActive ? "bg-white text-[var(--color-forest-ink)]" : "bg-transparent"}`} aria-hidden>
                  <t.Icon active={isActive} />
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
