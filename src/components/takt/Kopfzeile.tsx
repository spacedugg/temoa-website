"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Logo } from "../Logo";

/**
 * Kopfzeile der Welt „Taktplan".
 *
 * Keine schwebende Glaspille. Eine Leiste mit Hairline, die zur Tafel gehört,
 * wie die Kopfzeile eines Plans. Beim Scrollen wird sie deckend, damit der
 * Inhalt darunter nicht durchscheint.
 */

const leistungen = [
  { label: "Strategie & Analyse", href: "/leistungen/strategie" },
  { label: "Content & Listings", href: "/leistungen/listing-seo" },
  { label: "Advertising / PPC", href: "/leistungen/ppc-advertising" },
  { label: "Account-Management", href: "/leistungen/account-management" },
  { label: "Internationalisierung", href: "/leistungen/internationalisierung" },
];

const links: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Full Service", href: "/full-service", children: leistungen },
  { label: "Case Studies", href: "/ergebnisse" },
  { label: "Designbeispiele", href: "/design-beispiele" },
  { label: "Blog", href: "/blog" },
];

export function Kopfzeile() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 16));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid || open ? "bg-white/90 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container-x">
        <nav className="flex h-[4.5rem] items-center justify-between gap-6">
          <a
            href="/#top"
            aria-label="temoa, zur Startseite"
            className="flex min-h-[2.75rem] items-center rounded-inner pr-2"
          >
            <Logo priority />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active =
                pathname === l.href || (l.children && l.children.some((c) => pathname === c.href));
              if (l.children) {
                return (
                  <div key={l.href} className="group relative">
                    <a
                      href={l.href}
                      className={clsx(
                        "flex min-h-[2.75rem] items-center gap-1.5 px-3 text-small font-bold transition-colors",
                        active ? "text-brand-800" : "text-ink-muted hover:text-ink"
                      )}
                    >
                      {l.label}
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:rotate-180">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="w-72 rounded-[1rem] bg-white p-2 shadow-[0_30px_60px_-25px_rgba(2,48,71,0.45)]">
                        {l.children.map((c, i) => (
                          <a
                            key={c.href}
                            href={c.href}
                            className={clsx(
                              "flex min-h-[2.75rem] items-center gap-3 px-3 text-small transition-colors",
                              pathname === c.href ? "text-brand-800" : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink"
                            )}
                          >
                            <span className="num text-[0.95rem] text-ink/25">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "flex min-h-[2.75rem] items-center px-3 text-small font-bold transition-colors",
                    pathname === l.href ? "text-brand-800" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/gespraech-vereinbaren"
              className="hidden min-h-[2.75rem] items-center rounded-[0.75rem] bg-brand-500 px-5 text-small font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              Potenzialanalyse buchen
            </a>
            <button
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              aria-controls="hauptmenue"
              onClick={() => setOpen((o) => !o)}
              className="flex h-12 w-12 items-center justify-center rounded-[0.75rem] border border-ink/[0.12] text-ink md:hidden"
            >
              <div className="space-y-[5px]">
                <span className={clsx("block h-px w-5 bg-current transition-transform", open && "translate-y-[6px] rotate-45")} />
                <span className={clsx("block h-px w-5 bg-current transition-opacity", open && "opacity-0")} />
                <span className={clsx("block h-px w-5 bg-current transition-transform", open && "-translate-y-[6px] -rotate-45")} />
              </div>
            </button>
          </div>
        </nav>
      </div>
      <div className={clsx("h-px transition-colors duration-300", solid || open ? "bg-ink/[0.08]" : "bg-transparent")} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="hauptmenue"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-white pb-8 md:hidden"
          >
            <div className="container-x">
              {links.map((l) => (
                <div key={l.href} className="border-t border-ink/[0.08]">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[3.25rem] items-center text-base font-bold text-ink"
                  >
                    {l.label}
                  </a>
                  {l.children && (
                    <div className="pb-3">
                      {l.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-[2.75rem] items-center text-small text-ink-muted"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="/gespraech-vereinbaren"
                onClick={() => setOpen(false)}
                className="mt-6 flex min-h-[3.25rem] w-full items-center justify-center rounded-[0.875rem] bg-brand-500 text-base font-bold text-ink"
              >
                Potenzialanalyse buchen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
