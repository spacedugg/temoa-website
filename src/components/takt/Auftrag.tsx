"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";
import { Neigung } from "./Neigung";
import { HeroBild } from "./HeroBild";
import { testimonials } from "@/lib/testimonials";

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
   belegten Kennzahlen und der Wachstumsszene dahinter. Links unter dem Knopf
   sozialer Beleg statt Kennzahlkarten:
   echte Gesichter aus den Kundenstimmen, fuenf Sterne, eine Zeile. Wer neu auf
   die Seite kommt, sieht damit zuerst, dass es echte Kunden gibt.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Die Gesichter kommen aus den echten Kundenstimmen weiter unten auf der
   Seite, nicht aus einer Bilddatenbank. Nur echte Portraits: zwei der
   hinterlegten Bilder sind Buchstabenkacheln, die als Gesicht nichts taugen. */
const GESICHTER = testimonials.filter((t) => t.image && t.art === "person").slice(0, 5);

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

            {/* Sozialer Beleg statt Kennzahlkarten: Gesichter, Sterne, eine
                Zeile. Ohne Kachel, damit der Knopf darueber der einzige
                farbige Punkt bleibt. */}
            <motion.div {...rise(0.3)} className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-4">
              <div className="flex -space-x-3">
                {GESICHTER.map((t, i) => (
                  <motion.span
                    key={t.name}
                    className="relative inline-block"
                    initial={reduce ? undefined : { opacity: 0, scale: 0.6, x: -8 }}
                    animate={reduce ? undefined : { opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.42 + i * 0.07 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.name}
                      width={96}
                      height={96}
                      className="h-11 w-11 rounded-full object-cover ring-[3px] ring-canvas"
                      style={{ boxShadow: "0 6px 16px -8px rgba(11,31,52,0.6)" }}
                    />
                  </motion.span>
                ))}
              </div>

              <div className="min-w-0">
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.svg
                        key={i}
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="#FF9900"
                        initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
                        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.62 + i * 0.06 }}
                      >
                        <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.2 6.8L12 17.4 6 20.7l1.2-6.8-5-4.8 6.9-.8L12 2z" />
                      </motion.svg>
                    ))}
                  </span>
                  <span className="text-small font-bold text-ink">60+ Marken</span>
                </span>
                <p className="mt-0.5 text-small text-ink-muted">
                  arbeiten mit uns an ihrem Amazon-Geschäft.
                </p>
              </div>
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
