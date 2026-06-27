"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* Shared "zoom into the centre" overlay for Listings / Brand Stores /
 * Brand Stories / EBC. Portal to <body>, scroll-locks the page (and any
 * open Radix dialog), Esc closes, ←/→ page through siblings. */
export function ExpandedShell({
  onClose,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  children,
}: {
  onClose: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    // Lock the body and any open dialog so the wheel does not scroll through.
    const locked: { el: HTMLElement; prev: string }[] = [];
    const lock = (el: HTMLElement) => {
      locked.push({ el, prev: el.style.overflow });
      el.style.overflow = "hidden";
    };
    lock(document.body);
    document
      .querySelectorAll<HTMLElement>('[role="dialog"][data-state="open"]')
      .forEach(lock);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      else if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      locked.forEach(({ el, prev }) => (el.style.overflow = prev));
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm md:p-8"
      style={{ pointerEvents: "auto" }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Schließen"
        onClick={onClose}
        className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink shadow-lift transition hover:scale-105"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {hasPrev && (
        <button
          type="button"
          aria-label="Vorheriges"
          onClick={(e) => {
            e.stopPropagation();
            onPrev?.();
          }}
          className="fixed left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-lift transition hover:scale-105 md:left-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          aria-label="Nächstes"
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="fixed right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-lift transition hover:scale-105 md:right-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => {
          const t = e.target as HTMLElement;
          if (t.tagName === "IMG" || t.tagName === "VIDEO") e.preventDefault();
        }}
        className="relative flex max-h-full items-center justify-center"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
