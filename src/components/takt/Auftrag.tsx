"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";
import { HeroBuehne } from "./HeroBuehne";
import { pfad, type Sprache } from "@/lib/i18n";
import type { Woerterbuch } from "@/lib/woerter";
/* Der Knopftext steht im Rahmen-Woerterbuch, weil er auf jeder Seite gleich
   ist. Das Modul ist klein und darf im Bundle landen. */
import { rahmenWoerter } from "@/lib/woerter/rahmen";


/* ============================================================
   Hero der Startseite.

   Vier Fassungen liegen dahinter. Erst „00 · Der Auftrag" neben einer
   abstrakten Drahtgitter-Grafik: ein Besucher hat in den ersten Sekunden nicht
   erkannt, dass es um Amazon geht. Dann ein Listing-Nachbau mit Produktbildern
   und drei Kennzahlkarten auf dunklen Podesten. Dann derselbe Nachbau als
   Komposition aus Code, mit zwei schwebenden Kennzahlkarten.

   Der Kunde hat den Nachbau verworfen: eine weisse Karte auf hellem Grund
   steht nicht im Bild, sie faellt hinein. Er sah zu weit weg aus und wie
   nichts Bestimmtes.

   Jetzt das Bild, das der Kunde selbst geliefert hat: freigestellt, ohne
   Platte und ohne Rahmen, mit einem warmen Lichthof dahinter. Es steht still.
   Weil die Beschriftung im Bild steckt, gibt es zwei Fassungen. Welche
   laeuft, entscheidet die Sprache der Seite.

   Unter dem Knopf stand zwischendurch sozialer Beleg mit Kundengesichtern und
   Sternen. Der Kunde hat ihn wieder gestrichen: der Hero bleibt knapp, die
   Kundenlogos kommen direkt darunter im Kundenband.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

export function Auftrag({ sprache, w }: { sprache: Sprache; w: Woerterbuch["start"]["hero"] }) {
  const reduce = useReducedMotion();
  const knopf = rahmenWoerter[sprache].rahmen.cta;
  const rise = (delay: number) =>
    ({
          initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: reduce ? { duration: 0 } : { duration: 0.85, delay, ease: EASE },
        });

  return (
    <section id="top" className="ground relative overflow-hidden">
      <span aria-hidden className="halo pointer-events-none -right-32 -top-44 h-[42rem] w-[42rem]" />
      <span aria-hidden className="halo halo-cool pointer-events-none -left-40 top-64 h-[34rem] w-[34rem]" />

      <div className="container-x relative">
        <div className="grid items-center gap-y-14 pb-24 pt-28 lg:grid-cols-[1fr_0.95fr] lg:gap-x-16 lg:pb-32 lg:pt-36">
          <div className="min-w-0">
            <motion.div {...rise(0)}>
              <Eyebrow label={w.eyebrow} />
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="display max-w-[24ch] text-balance text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] text-ink"
            >
              <span className="em mark">{w.titelMark}</span>
              {w.titelRest}
            </motion.h1>

            {/* Ueberschrift und Versprechen stehen wortgleich so, wie der Kunde
                sie vorgegeben hat, siehe `woerter/de.ts`. Die Anrede weicht
                dort bewusst von der Website ab („deine" statt „eure"): das ist
                seine Entscheidung, zweimal bestaetigt. */}
            <motion.p {...rise(0.14)} className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
              {w.lead}
            </motion.p>

            <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={pfad(sprache, "/gespraech-vereinbaren")} className="btn-primary">
                {knopf}
                <span className="disc" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#nachweis" className="btn-text">
                {w.ctaZweit}
              </a>
            </motion.div>

          </div>

          {/* Die Hero-Grafik, siehe takt/HeroBuehne. Sie laeuft ohne Verzug
              und ohne Versatz ein, nur mit einer kurzen Blende: das Bild ist
              das groesste Element im ersten Bildschirm. Was auf Deckkraft null
              steht, zaehlt als noch nicht geladen. */}
          <motion.div
            className="relative min-w-0"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          >
            <HeroBuehne bildAlt={w.bildAlt} sprache={sprache} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
