"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";


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
              Profitables Wachstum für eure <span className="em mark">Amazon-Marke.</span>
            </motion.h1>

            {/* Der zweite Satz stand im Entwurf des Kunden als ein Satz mit
                „durch Profi-Umsetzung". Zwei Saetze daraus, weil der Anschluss
                sonst grammatisch nicht traegt, und ohne „Profi": was wir
                koennen, zeigen die Faelle darunter. */}
            <motion.p {...rise(0.14)} className="mt-7 max-w-[46ch] text-pretty text-lead text-ink-muted">
              Mehr Umsatz ist keine Frage des Werbebudgets. Es ist eine Frage der Umsetzung: Content,
              Ads, Account-Betreuung und neue Marktplätze.
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

          {/* Die Hero-Grafik. Ein Bild, kein Effekt.

              Sieben Fassungen liegen dahinter: ein Drahtgitter, ein
              Listing-Nachbau, derselbe aus Code, eine weiche 3D-Szene, fuenf
              Entwuerfe im Rendering-Stil und zuletzt eine Komposition aus
              echtem Listing, Telefonrahmen und Zahlkarten. Der Kunde hat
              zuletzt gesagt: lieber kein Effekt, dafuer ein Bild, das steht.
              Also ein fotorealistisches Bild, ohne Bewegung, ohne Schraeglage,
              ohne schwebende Karten. Die Schrift auf dem Telefon ist bewusst
              nur ein Balken: aus einem Bildmodell kommt keine Schrift. */}
          <motion.div {...rise(0.16)} className="relative min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bilder/h-f2.webp"
              alt="Ein Telefon zeigt eine Produktseite, darum herum die weiteren Bilder desselben Produkts."
              width={1536}
              height={1152}
              className="w-full rounded-[1.75rem] shadow-[0_1px_2px_rgba(13,36,57,0.05),0_40px_70px_-38px_rgba(13,36,57,0.45)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
