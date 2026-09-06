"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* ============================================================
   Der Abschluss-CTA. Eine Fassung für die gesamte Website.

   Fuenf Fassungen liegen dahinter, und jede hatte einen eigenen Fehler: der
   Block lag auf demselben Navy wie die Fusszeile, Clemens war ein Rechteck mit
   einer Platte darauf, er stand klein in der Ecke einer hohen Sektion, dann
   lag eine Glasplatte auf seinem Gesicht und ein Pfeil zeigte auf sein Kinn,
   und zuletzt lag alles auf einer roten Flaeche mit drei Absaetzen Text.

   Jetzt: heller Sektionsgrund, darauf eine dunkle Karte. Rot ist raus, das ist
   auf dieser Website die Farbe fuer Probleme und nicht fuer die wichtigste
   Aktion. Im Text steht nur noch, was es sein muss: eine Ueberschrift, der
   Knopf, zwei Zusagen. Wer spricht, steht am Bild, nicht im Text.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

function Pfeilscheibe() {
  return (
    <span className="disc" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h13m0 0l-5-5m5 5l-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Zwei Zusagen, die den Ablauf beschreiben, wie er wirklich ist: ein kurzes
 * erstes Gespraech zum Kennenlernen, die vorbereitete Auswertung erst danach.
 */
const ZUSAGEN = [
  "25 Minuten, in denen wir eure Lage verstehen und ihr uns kennenlernt",
  "Passt es, folgt ein zweites Gespräch, für das wir eure Zahlen vorbereiten",
];

export function Gespraech({
  title,
  zusagen = ZUSAGEN,
}: {
  title?: ReactNode;
  zusagen?: string[];
}) {
  const reduce = useReducedMotion();

  /* Mehr Luft nach oben und unten, damit niemand versehentlich vorbeiscrollt.
     Die Karte selbst bleibt so hoch, dass Bild, Ueberschrift, Knopf und
     Zusagen zusammen in einen Bildschirm passen, auf dem Telefon wie am
     Rechner. */
  return (
    <section className="ground-tint relative py-20 md:py-28">
      <div className="container-x relative">
        <motion.div
          className="panel-navy on-dark relative grid overflow-hidden md:grid-cols-[0.72fr_1.28fr]"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Portraetspalte.
              Der Grund ist orange, nicht blau: die Karte ist dunkelblau, und
              ein blaues Feld darin hebt das Portraet nicht heraus. Orange
              neben Navy ist der staerkste Kontrast, den die Marke hat.

              Die Rundung sitzt auch auf dieser Spalte selbst: ein Bild mit
              `filter` bricht in manchen Browsern aus dem `overflow-hidden` der
              Karte aus, dadurch stand unten links eine eckige Ecke an einer
              sonst runden Karte. */}
          <div
            className="relative min-h-[15rem] overflow-hidden rounded-t-[1.75rem] sm:min-h-[20rem] md:min-h-[25rem] md:rounded-t-none md:rounded-l-[1.75rem]"
            style={{
              background:
                "radial-gradient(95% 62% at 50% 14%, #FFC77E 0%, rgba(255,199,126,0) 62%), linear-gradient(168deg, #FFA51F 0%, #FF8A00 46%, #E06A00 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/team/clemens-frei.webp"
              alt="Clemens, Founder und Sales bei temoa"
              width={900}
              height={855}
              loading="lazy"
              /* Mittig ueber `inset-x-0` und `mx-auto`, nicht ueber
                 `-translate-x-1/2`: framer-motion schreibt beim Einlaufen ein
                 eigenes `transform` und wirft die Verschiebung aus der Klasse
                 weg. */
              className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto max-w-none object-contain object-bottom"
              /* Ein warmer Schatten unter dem Freisteller, sonst klebt er
                 auf der orangen Flaeche. */
              style={{ filter: "drop-shadow(0 24px 38px rgba(122,52,0,0.45))" }}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />

            {/* Der Fuss der Spalte laeuft ins Dunkle aus. Vorher stand die
                Zeile mit einem Schatten frei auf dem Foto, das sah nach
                Notloesung aus: eine Platte darauf ist verboten, ein Schatten
                allein traegt nicht. Ein Verlauf ist beides nicht, er gibt der
                Schrift einen Grund, ohne eine Kante ins Bild zu setzen.
                Weiss auf Orange waere zu schwach, deshalb laeuft der Verlauf
                ins Dunkelbraun und nicht ins Navy: auf einer orangen Flaeche
                liest sich Braun als ihr eigener Schatten, Navy als zweite
                Farbe. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%]"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,17,0,0.96) 0%, rgba(58,21,0,0.86) 24%, rgba(72,27,0,0.45) 58%, rgba(90,34,0,0) 100%)",
              }}
            />

            {/* Wer spricht, steht am Bild, nicht im Text. */}
            <div className="absolute inset-x-6 bottom-6">
              <p className="text-[1.15rem] font-extrabold leading-tight tracking-[-0.01em] text-white">
                Hi, ich bin Clemens.
              </p>
              <p className="mt-1 text-small leading-snug text-white/85">Founder. Ihr sprecht mit mir.</p>
            </div>
          </div>

          {/* Textspalte: Ueberschrift, Knopf, zwei Zusagen. Sonst nichts. */}
          <div className="relative flex flex-col justify-center p-7 sm:p-9 md:p-11 lg:p-12">
            <h2 className="title max-w-[20ch] text-balance text-[clamp(1.8rem,1.2rem+1.9vw,2.7rem)] text-white">
              {title ?? "Wie viel Umsatz lässt euer Listing liegen?"}
            </h2>

            <div className="mt-8">
              <a href="/gespraech-vereinbaren" className="btn-on-dark">
                Potenzialanalyse buchen
                <Pfeilscheibe />
              </a>
            </div>

            <ul className="mt-8 grid gap-2.5">
              {zusagen.map((z) => (
                <li key={z} className="flex items-start gap-3 text-small font-bold leading-snug text-chalk">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    /* Die Scheibe bleibt gedämpft, der Haken ist weiß
                       darauf. Ein oranger Haken in einem Kreis von 20 Pixeln
                       ist auf dunklem Grund nur ein Fleck; ein dunkler wäre
                       ein dunkles Zeichen auf oranger Fläche. Weiß ist das
                       Einzige, was hier trägt. */
                    style={{ background: "rgba(255,153,0,0.13)" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12.5l5.5 5.5L20 7"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {z}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
