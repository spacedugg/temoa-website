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

  return (
    <section className="ground-tint relative py-16 md:py-20">
      <div className="container-x relative">
        <motion.div
          className="panel-navy on-dark relative grid overflow-hidden md:grid-cols-[0.72fr_1.28fr]"
          initial={reduce ? undefined : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Portraetspalte.
              Die Rundung sitzt auch auf dieser Spalte selbst: ein Bild mit
              `filter` bricht in manchen Browsern aus dem `overflow-hidden` der
              Karte aus, dadurch stand unten links eine eckige Ecke an einer
              sonst runden Karte. */}
          <div
            className="relative min-h-[17rem] overflow-hidden rounded-t-[1.75rem] sm:min-h-[20rem] md:min-h-[23rem] md:rounded-t-none md:rounded-l-[1.75rem]"
            style={{
              background:
                "radial-gradient(120% 95% at 50% 108%, rgba(255,153,0,0.3), transparent 58%), radial-gradient(90% 70% at 50% 6%, rgba(112,178,214,0.3), transparent 62%), linear-gradient(170deg, #17405d 0%, #0d2540 100%)",
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
              className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto max-w-none object-contain object-bottom"
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />

            {/* Wer spricht, steht am Bild. Ohne Platte darunter: eine Kachel
                auf einem Gesicht sieht nach Aufkleber aus, ein Schatten unter
                der Schrift reicht. */}
            <div
              className="absolute inset-x-5 bottom-5"
              style={{ textShadow: "0 2px 10px rgba(6,20,34,0.85), 0 1px 2px rgba(6,20,34,0.9)" }}
            >
              <p className="text-[1rem] font-bold leading-tight text-white">Hi, ich bin Clemens.</p>
              <p className="mt-0.5 text-small leading-snug text-white/80">
                Founder. Ich führe das Gespräch selbst.
              </p>
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
                    style={{ background: "rgba(255,153,0,0.2)" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12.5l5.5 5.5L20 7"
                        stroke="#FF9900"
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
