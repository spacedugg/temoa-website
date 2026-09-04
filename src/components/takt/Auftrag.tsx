"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ListingSzene } from "./Grafiken";

/**
 * Station 00.
 *
 * Aufbau mit Ebenen statt flacher Reihung: Die Bildplatte läuft rechts über
 * den Containerrand hinaus, die Kennzahlen liegen als eigene Platte darüber
 * und über die untere Bildkante. So entsteht Tiefe, ohne dass ein Element
 * schreien muss.
 */

const readings = [
  { value: "Ø +30 %", label: "Profitabilität", note: "im Durchschnitt" },
  { value: "21 Mio. €", label: "Jahresumsatz", note: "in Betreuung" },
  { value: "98 %", label: "Kundenbindung", note: "Verlängerung nach Performance" },
];

export function Auftrag() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.32, 0.72, 0, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-60 h-[46rem] w-[46rem] rounded-full opacity-90 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.13), transparent 65%)" }}
      />

      <div className="container-x relative">
        <div className="grid gap-y-12 pb-28 pt-32 md:grid-cols-[8rem_1fr] md:gap-x-14 md:pb-36 md:pt-40 lg:grid-cols-[10rem_1fr]">
          <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
            <motion.span {...rise(0)} className="num text-[3.5rem] text-ink/10 md:text-[4.5rem]">
              00
            </motion.span>
            <motion.span
              {...rise(0.05)}
              className="text-label font-bold uppercase text-brand-800 md:border-t md:border-ink/10 md:pt-4"
            >
              Der Auftrag
            </motion.span>
          </div>

          <div className="grid min-w-0 items-center gap-y-16 lg:grid-cols-[1fr_0.92fr] lg:gap-x-16">
            <div className="min-w-0">
              <motion.h1
                {...rise(0.08)}
                className="display max-w-[15ch] text-balance text-[clamp(2.6rem,1.7rem+3vw,4.25rem)] text-ink"
              >
                Wachstum ist keine Frage des{" "}
                <span className="em text-brand-700">Werbebudgets.</span>
              </motion.h1>

              <motion.p {...rise(0.16)} className="mt-8 max-w-[48ch] text-pretty text-lead text-ink-muted">
                Wir bringen euer Listing dahin, dass es auch ohne Werbung verkauft. Danach skaliert
                PPC, was bereits konvertiert.
              </motion.p>

              <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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

            <motion.div {...rise(0.18)} className="relative lg:-mr-[max(0px,calc((100vw-80rem)/2+2rem))]">
              <div className="rounded-[1.25rem] bg-canvas-tint/60 p-6 md:p-8">
                <ListingSzene />
              </div>

              <motion.div
                {...rise(0.34)}
                className="relative z-10 -mt-14 ml-4 mr-8 rounded-[1.25rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(2,48,71,0.45)] sm:ml-8 md:p-7 lg:-ml-14 lg:mr-16"
              >
                <div className="grid grid-cols-3 gap-x-5">
                  {readings.map((r) => (
                    <div key={r.label} className="min-w-0">
                      <div className="num text-[clamp(1.35rem,1rem+1.1vw,1.9rem)] text-ink">{r.value}</div>
                      <div className="mt-2.5 text-[0.7rem] font-bold leading-tight text-ink">{r.label}</div>
                      <div className="mt-1 text-[0.7rem] leading-tight text-ink-faint">{r.note}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
