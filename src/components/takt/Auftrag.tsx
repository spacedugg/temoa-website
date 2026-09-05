"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";
import { Neigung } from "./Neigung";
import { HeroBild } from "./HeroBild";

/* ============================================================
   Hero der Startseite.

   Drei Fassungen liegen dahinter. Erst „00 · Der Auftrag" neben einer
   abstrakten Drahtgitter-Grafik: ein Besucher hat in den ersten Sekunden nicht
   erkannt, dass es um Amazon geht. Dann ein Listing-Nachbau mit Produktbildern
   und darunter drei Kennzahlkarten auf dunklen Podesten.

   Der Kunde hat beides verworfen: der Nachbau zeigt ein Produkt statt eines
   Ergebnisses, und die drei dunklen Karten setzten drei weitere Farbakzente
   neben den Knopf, der eigentlich der einzige Blickfang sein soll.

   Jetzt: rechts die Hero-Grafik aus `HeroBild`, eine Produktseite mit zwei
   belegten Kennzahlen und der Wachstumsszene dahinter. Links nur Ueberschrift,
   ein Satz und die beiden Knoepfe.

   Unter dem Knopf stand zwischendurch sozialer Beleg mit Kundengesichtern und
   Sternen. Der Kunde hat ihn wieder gestrichen: der Hero bleibt knapp, die
   Kundenlogos kommen direkt darunter im Kundenband.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

export function Auftrag() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section id="top" className="ground relative overflow-hidden">
      <span aria-hidden className="halo pointer-events-none -right-32 -top-44 h-[42rem] w-[42rem]" />
      <span aria-hidden className="halo halo-cool pointer-events-none -left-40 top-64 h-[34rem] w-[34rem]" />

      <div className="container-x relative">
        <div className="grid items-center gap-y-14 pb-24 pt-28 lg:grid-cols-[1fr_0.95fr] lg:gap-x-16 lg:pb-32 lg:pt-36">
          <div className="min-w-0">
            <motion.div {...rise(0)}>
              <Eyebrow label="Amazon Full Service" />
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="display max-w-[24ch] text-balance text-[clamp(2.3rem,1.5rem+2.5vw,3.5rem)] text-ink"
            >
              Erst verkauft euer <span className="em mark">Listing.</span> Dann skaliert die Werbung.
            </motion.h1>

            <motion.p {...rise(0.14)} className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
              Listing und Content, Advertising, Tagesgeschäft und neue Marktplätze. Aus einer Hand.
            </motion.p>

            <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="/gespraech-vereinbaren" className="btn-primary">
                Potenzialanalyse buchen
                <span className="disc" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#nachweis" className="btn-text">
                Case Studies ansehen
              </a>
            </motion.div>

          </div>

          {/* Die Hero-Grafik liegt in `HeroBild`: Produktseite, zwei belegte
              Kennzahlen und die Wachstumsszene dahinter. Vorher stand hier nur
              die Wachstumsszene allein, das war dem Kunden zu duenn. */}
          <motion.div {...rise(0.16)} className="relative min-w-0">
            <Neigung>
              <HeroBild />
            </Neigung>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
