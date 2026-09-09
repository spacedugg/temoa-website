"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Logo } from "../Logo";
import { Sprachumschalter } from "../i18n/Sprachumschalter";
import { pfad, spracheAusPfad, type Sprache } from "@/lib/i18n";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

/**
 * Kopfzeile der Welt „Taktplan".
 *
 * Keine schwebende Glaspille. Eine Leiste mit Hairline, die zur Tafel gehört,
 * wie die Kopfzeile eines Plans. Beim Scrollen wird sie deckend, damit der
 * Inhalt darunter nicht durchscheint.
 */

/* Beschriftungen kommen aus dem Woerterbuch, die Adressen bekommen das
   Sprachpraefix. Ohne das Praefix spraenge ein Besucher aus `/en` zurueck auf
   die deutsche Seite, und die Weiche muesste ihn ueber eine zweite
   Weiterleitung wieder einfangen. */
type Eintrag = { label: string; href: string; children?: Eintrag[] };

type Rahmen = (typeof rahmenWoerter)[Sprache];

function navigation(sprache: Sprache, w: Rahmen): Eintrag[] {
  const p = (ziel: string) => pfad(sprache, ziel);
  const leistungen: Eintrag[] = [
    { label: w.leistungen.strategie, href: p("/leistungen/strategie") },
    { label: w.leistungen.listingSeo, href: p("/leistungen/listing-seo") },
    { label: w.leistungen.ppc, href: p("/leistungen/ppc-advertising") },
    { label: w.leistungen.account, href: p("/leistungen/account-management") },
    { label: w.leistungen.international, href: p("/leistungen/internationalisierung") },
  ];
  return [
    { label: w.navigation.fullService, href: p("/full-service"), children: leistungen },
    { label: w.navigation.caseStudies, href: p("/ergebnisse") },
    { label: w.navigation.designbeispiele, href: p("/design-beispiele") },
    { label: w.navigation.blog, href: p("/blog") },
  ];
}

export function Kopfzeile() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  /* Die Sprache steht im Pfad. So muss keine der dreizehn Seiten sie
     durchreichen, und die Leiste stimmt auch dort, wo sie noch niemand
     angefasst hat. */
  const sprache = spracheAusPfad(pathname);
  const w = rahmenWoerter[sprache];
  const links = navigation(sprache, w);
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
            href={`${pfad(sprache, "/")}#top`}
            aria-label={w.rahmen.zurStartseite}
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
                        active ? "text-ink" : "text-ink-muted hover:text-ink"
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
                              pathname === c.href ? "text-ink" : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink"
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
                    pathname === l.href ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Sprachumschalter
              aktuell={sprache}
              beschriftung={w.rahmen.spracheWaehlen}
              className="hidden md:flex"
            />
            {/* Warum dieser Knopf so aussieht, steht bei `.btn-kopf` in
                globals.css. Kurz: Navy mit Lichthof und Bewegung beim Hover,
                Rot ist auf dieser Website die Farbe fuer Probleme. */}
            <a href={pfad(sprache, "/gespraech-vereinbaren")} className="group hidden md:inline-flex btn-kopf">
              {w.rahmen.cta}
              <span className="disc" aria-hidden>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <button
              aria-label={open ? w.rahmen.menueSchliessen : w.rahmen.menueOeffnen}
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
                href={pfad(sprache, "/gespraech-vereinbaren")}
                onClick={() => setOpen(false)}
                className="mt-6 flex min-h-[3.25rem] w-full items-center justify-center rounded-[0.875rem] text-base font-bold text-white"
                style={{
                  background: "linear-gradient(150deg, #14425f, #0b2438)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 26px -14px rgba(255,153,0,0.7)",
                }}
              >
                {w.rahmen.cta}
              </a>

              {/* Der Umschalter steht im Mobilmenue unter dem Knopf: oben in
                  der Leiste ist neben Logo und Menuetaste kein Platz. */}
              <div className="mt-6 flex items-center justify-between border-t border-ink/[0.08] pt-6">
                <span className="text-label font-bold uppercase text-ink-faint">
                  {w.rahmen.sprache}
                </span>
                <Sprachumschalter aktuell={sprache} beschriftung={w.rahmen.spracheWaehlen} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
