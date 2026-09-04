"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";

/**
 * Hero der Startseite.
 *
 * Frühere Fassung: „00 · Der Auftrag" in einer eigenen Spalte, daneben eine
 * abstrakte Drahtgitter-Grafik. Ein Besucher hat daran in den ersten Sekunden
 * nicht erkannt, dass es um Amazon geht, und die Grafik hat kein Produkt
 * gezeigt.
 *
 * Jetzt steht Amazon in der ersten Zeile, und rechts liegt ein Listing, wie
 * temoa es baut. Die Produktaufnahmen kommen aus Bilddateien, die gesamte
 * Beschriftung zeichnet der Code. Deshalb ist die Schrift scharf und richtig
 * gesetzt, statt von einem Bildmodell verunglückt zu werden.
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

            <motion.div
              {...rise(0.3)}
              className="mt-12 grid max-w-[34rem] grid-cols-3 gap-x-6 border-t border-ink/[0.09] pt-7"
            >
              {readings.map((r) => (
                <div key={r.label} className="min-w-0">
                  <div className="num text-[clamp(1.3rem,1rem+1vw,1.8rem)] text-ink">{r.value}</div>
                  <div className="mt-2 text-[0.7rem] font-bold leading-tight text-ink">{r.label}</div>
                  <div className="mt-1 text-[0.7rem] leading-tight text-ink-faint">{r.note}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...rise(0.16)} className="min-w-0">
            <ListingKarte />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Produktdetailseite als Nachbau: Bildstrecke links, Kaufbereich rechts.
 *
 * Kein Amazon-Logo und keine Amazon-Oberfläche, nur der Aufbau einer
 * Produktseite. Auch keine erfundenen Leistungszahlen im Bild, die belegten
 * Kennzahlen stehen im Textblock daneben.
 */
function ListingKarte() {
  const galerie = [
    { src: "/bilder/p-detail.webp", alt: "Listingbild: Verschluss im Detail" },
    { src: "/bilder/p-szene.webp", alt: "Listingbild: Flasche auf einer Küchenarbeitsplatte" },
    { src: "/bilder/p-gruppe.webp", alt: "Listingbild: drei Farbvarianten nebeneinander" },
  ];

  return (
    <div className="relative">
      <div className="rounded-panel bg-white p-5 shadow-[0_40px_90px_-45px_rgba(2,48,71,0.5)] ring-1 ring-inset ring-ink/[0.07] md:p-6">
        <div className="grid gap-5 sm:grid-cols-[1.05fr_1fr] md:gap-6">
          {/* Bildstrecke */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-inner bg-canvas-tint/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bilder/p-haupt.webp"
                alt="Hauptbild eines Listings: matte Isolierflasche in Navy auf weißem Grund"
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {galerie.map((g) => (
                <div
                  key={g.src}
                  className="overflow-hidden rounded-[0.625rem] bg-canvas-tint/50 ring-1 ring-inset ring-ink/[0.06]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} width={1024} height={1024} className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Kaufbereich */}
          <div className="flex min-w-0 flex-col">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-faint">Marke</span>
            <p className="mt-2 text-[1.05rem] font-bold leading-snug text-ink">
              Isolierflasche 750 ml, doppelwandig, 24 h kalt
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FF9900">
                    <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.2 6.8L12 17.4 6 20.7l1.2-6.8-5-4.8 6.9-.8L12 2z" />
                  </svg>
                ))}
              </span>
              <span className="text-[0.7rem] text-ink-faint">1.284 Bewertungen</span>
            </div>

            <div className="mt-5 border-t border-ink/[0.08] pt-5">
              <div className="flex items-baseline gap-2">
                <span className="num text-[1.9rem] text-ink">34,90 €</span>
                <span className="text-[0.7rem] text-ink-faint">inkl. MwSt.</span>
              </div>
              <p className="mt-1.5 text-[0.75rem] font-bold text-signal-pos">Auf Lager</p>
            </div>

            {/* Die Bausteine, die temoa an so einem Listing tatsächlich baut */}
            <ul className="mt-5 space-y-2.5 border-t border-ink/[0.08] pt-5">
              {["Hauptbild und 6 Listingbilder", "Titel, Bullets und Backend-Felder", "A+ Content und Brand Store"].map(
                (t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="text-[0.8rem] leading-snug text-ink-muted">{t}</span>
                  </li>
                )
              )}
            </ul>

            <div
              aria-hidden
              className="mt-6 grid min-h-[2.5rem] place-items-center rounded-[0.625rem] bg-brand-500 text-[0.8rem] font-bold text-navy"
            >
              In den Einkaufswagen
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.7rem] text-ink-faint">
        Beispiel-Listing aus unserer Produktion, Produkt und Preis frei erfunden.
      </p>
    </div>
  );
}
