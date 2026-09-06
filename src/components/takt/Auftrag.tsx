"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";
import { Neigung } from "./Neigung";

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

   Jetzt eine freigestellte 3D-Szene im Stil der uebrigen Bilder der Website:
   die Produktseite als Platte, davor der Einkaufswagen, dahinter die
   steigenden Balken, verbunden durch eine gluehende orange Linie. Dunkle
   Koerper auf hellem Grund, dadurch steht sie. Bewegung macht der Code: die
   Szene schwebt, kippt zum Zeiger und traegt einen Lichthof, der leise atmet.

   Unter dem Knopf stand zwischendurch sozialer Beleg mit Kundengesichtern und
   Sternen. Der Kunde hat ihn wieder gestrichen: der Hero bleibt knapp, die
   Kundenlogos kommen direkt darunter im Kundenband.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

export function Auftrag() {
  const reduce = useReducedMotion();
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

          {/* Die Hero-Grafik. Ein Bild, das der Code bewegt: schweben,
              kippen, ein Lichthof, der atmet. */}
          <motion.div {...rise(0.16)} className="relative min-w-0">
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.3), transparent 68%)" }}
              animate={reduce ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <Neigung>
              <motion.img
                src="/bilder/h-buehne.webp"
                alt="Eine Produktseite als Platte, davor ein Einkaufswagen, dahinter steigende Balken, verbunden durch eine leuchtende Linie."
                width={1280}
                height={960}
                className="relative w-full"
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 34px 46px rgba(11,31,52,0.22))" }}
              />
            </Neigung>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
