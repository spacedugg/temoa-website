"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Station";
import { Zahl } from "./Zahl";
import { Neigung } from "./Neigung";

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

/* Die Werte laufen beim Sichtbarwerden auf. Vorher stand die fertige Zahl da
   und wurde ueberflogen. `vor` und `nach` bleiben Text, nur die Zahl zaehlt. */
const readings: { bis: number; vor?: string; nach?: string; label: string; note: string }[] = [
  { bis: 30, vor: "Ø +", nach: " %", label: "Profitabilität", note: "im Durchschnitt" },
  { bis: 21, nach: " Mio. €", label: "Jahresumsatz", note: "in Betreuung" },
  { bis: 98, nach: " %", label: "Kundenbindung", note: "Verlängerung nach Performance" },
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

            {/* Kennzahlen als eigene Karten. Vorher weiss auf hellem Grund und
                still: drei blasse Kaesten, die niemand ansieht. Jetzt dunkle
                Podeste mit einer Kurve, die von allein laeuft. */}
            <motion.div {...rise(0.3)} className="mt-12 grid max-w-[38rem] gap-3 sm:grid-cols-3">
              {readings.map((r, i) => (
                <KennzahlKarte key={r.label} {...r} index={i} reduce={!!reduce} />
              ))}
            </motion.div>
          </div>

          {/* Der Listing-Nachbau kippt leicht zum Zeiger. Deutet an, dass die
              Platte im Raum steht, ohne albern zu wirken. */}
          <motion.div {...rise(0.16)} className="min-w-0">
            <Neigung>
              <ListingKarte />
            </Neigung>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Eine Kennzahl auf dunklem Podest, mit einer Kurve, die sich immer wieder
 * neu zeichnet.
 *
 * Der Kunde wollte, dass sich im Hero etwas bewegt, ohne dass man mit dem
 * Zeiger darueberfahren muss. Die drei Karten laufen versetzt, damit es ein
 * Takt wird und kein Flackern. Bei prefers-reduced-motion steht die Kurve
 * fertig da.
 */
function KennzahlKarte({
  bis,
  vor,
  nach,
  label,
  note,
  index,
  reduce,
}: {
  bis: number;
  vor?: string;
  nach?: string;
  label: string;
  note: string;
  index: number;
  reduce: boolean;
}) {
  const kurven = [
    "M2 26 L14 22 L26 24 L38 15 L50 11 L62 4",
    "M2 24 L14 25 L26 18 L38 19 L50 10 L62 6",
    "M2 27 L14 20 L26 21 L38 13 L50 12 L62 3",
  ];
  return (
    <div className="panel-navy on-dark min-w-0 p-5">
      <div className="flex items-baseline gap-1.5">
        <span className="num text-[clamp(1.35rem,1rem+1.1vw,1.9rem)] text-white">
          <Zahl bis={bis} vor={vor} nach={nach} />
        </span>
      </div>

      <svg
        viewBox="0 0 64 30"
        aria-hidden
        className="mt-3 h-7 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.path
          d={kurven[index % kurven.length]}
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 7, times: [0, 0.45, 0.85, 1], repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }
          }
          style={{ filter: "drop-shadow(0 0 6px rgba(255,153,0,0.45))" }}
        />
      </svg>

      <div className="mt-3 text-[0.75rem] font-bold leading-tight text-white">{label}</div>
      <div className="mt-1 text-[0.7rem] leading-tight text-chalk-faint">{note}</div>
    </div>
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
  /* Eigenes Produkt fuer den Hero. Vorher lag hier dieselbe Flasche wie in
     den Designbeispielen weiter unten; ein Bild soll auf der Seite nur an
     einer Stelle vorkommen. */
  const bilder = [
    { src: "/bilder/h-haupt.webp", alt: "Hauptbild eines Listings: Bratpfanne in Navy mit Holzgriff" },
    { src: "/bilder/h-detail.webp", alt: "Listingbild: Übergang von Griff zu Pfannenkörper" },
    { src: "/bilder/h-szene.webp", alt: "Listingbild: Pfanne auf einem Kochfeld" },
    { src: "/bilder/h-gruppe.webp", alt: "Listingbild: drei Größen nebeneinander" },
  ];
  const reduce = useReducedMotion();
  const [aktiv, setAktiv] = useState(0);

  /* Die Bildstrecke wechselt von allein. Der Kunde wollte Bewegung, ohne dass
     man den Zeiger bemuehen muss. */
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setAktiv((i) => (i + 1) % bilder.length), 3200);
    return () => clearInterval(t);
  }, [reduce, bilder.length]);

  return (
    <div className="relative">
      <div className="panel p-5 md:p-6">
        <div className="grid gap-5 sm:grid-cols-[1.05fr_1fr] md:gap-6">
          {/* Bildstrecke */}
          <div className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-canvas-tint/50">
              {bilder.map((b, i) => (
                <motion.img
                  key={b.src}
                  src={b.src}
                  alt={i === 0 ? b.alt : ""}
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ opacity: i === aktiv ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {bilder.map((b, i) => (
                <button
                  key={b.src}
                  type="button"
                  onClick={() => setAktiv(i)}
                  aria-label={b.alt}
                  className={`overflow-hidden rounded-[0.75rem] bg-canvas-tint/50 transition-shadow ${
                    i === aktiv
                      ? "shadow-[inset_0_0_0_2px_#FF9900]"
                      : "shadow-[inset_0_0_0_1px_rgba(13,36,57,0.06)]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.src} alt="" width={1024} height={1024} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Kaufbereich */}
          <div className="flex min-w-0 flex-col">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-faint">Marke</span>
            <p className="mt-2 text-[1.05rem] font-bold leading-snug text-ink">
              Bratpfanne 28 cm, antihaftbeschichtet, für Induktion
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
