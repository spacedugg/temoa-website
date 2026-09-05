"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* ============================================================
   Der Abschluss-CTA. Eine Fassung für die gesamte Website.

   Vorgeschichte in drei Schritten. Erst lag der Block auf demselben Navy wie
   die Fusszeile darunter, dadurch war nicht zu sehen, wo die Seite endet.
   Dann stand er auf der roten Flaeche, aber Clemens war ein rechteckiges Foto
   mit einer dunkelblauen Platte darueber. Danach war er freigestellt, stand
   aber klein und verloren in der rechten unteren Ecke einer sehr hohen
   Sektion: viel Flaeche fuer drei Zeilen Text.

   Jetzt ist es eine Karte statt einer Sektion. Links das Portraet formatfuellend
   bis an die Unterkante, rechts Aussage, Knopf und zwei Zusagen. Die Karte
   begrenzt die Hoehe, dadurch fuellt Clemens seine Spalte wirklich aus.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Handgezeichneter Pfeil von der Sprechzeile hoch zum Gesicht.
 *
 * Krumm gezeichnet, damit er als Geste liest und nicht als Verbindungslinie
 * in einem Diagramm.
 */
function HandPfeil({ reduce }: { reduce: boolean }) {
  const strich = {
    fill: "none" as const,
    stroke: "rgba(255,255,255,0.8)",
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const zeichnen = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-15% 0px" },
          transition: { duration: 0.65, delay, ease: "easeInOut" as const },
        };

  return (
    <svg viewBox="0 0 74 66" aria-hidden className="pointer-events-none absolute -top-[3.1rem] left-[58%] w-[4.8rem]">
      {/* Der Bogen laeuft von der Sprechzeile nach oben links zum Gesicht. */}
      <motion.path d="M66 62C60 36 46 16 14 9" {...strich} {...zeichnen(0.3)} />
      <motion.path d="M14 9l13 1M14 9l4 12" {...strich} {...zeichnen(0.85)} />
    </svg>
  );
}

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

/** Zwei Zusagen, die etwas wert sind. Standard, wenn eine Seite nichts eigenes mitgibt. */
const ZUSAGEN = [
  "30 Minuten, danach kennt ihr die Zahl, die euer Sortiment noch hergibt",
  "Die Auswertung bleibt bei euch, auch wenn wir nicht zusammenarbeiten",
];

export function Gespraech({
  title,
  sub,
  zusagen = ZUSAGEN,
}: {
  title?: ReactNode;
  sub?: ReactNode;
  zusagen?: string[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="on-signal ground-signal relative overflow-hidden py-14 md:py-20">
      <div className="container-x relative">
        <motion.div
          className="panel-signal grid overflow-hidden md:grid-cols-[0.78fr_1.22fr]"
          initial={reduce ? undefined : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Portraetspalte. Der Schein sitzt hinter dem Kopf, damit die dunkle
              Jacke nicht im dunklen Rot verschwindet. */}
          <div
            className="relative min-h-[18.5rem] overflow-hidden sm:min-h-[20rem] md:min-h-[22rem]"
            style={{
              background:
                "radial-gradient(110% 80% at 50% 18%, rgba(255,158,96,0.45), transparent 62%), rgba(74,6,10,0.4)",
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
                 eigenes `transform` auf das Element und wirft die Verschiebung
                 aus der Klasse weg. Das Bild sass dadurch eine halbe Breite zu
                 weit rechts und war am Rand abgeschnitten. */
              className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto max-w-none object-contain object-bottom"
              style={{ filter: "drop-shadow(0 22px 40px rgba(50,2,6,0.5))" }}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />

            {/* Die Sprechzeile sitzt unten auf dem Portraet, der Pfeil zeigt
                zurueck aufs Gesicht. Zusammen lesen sie sich als Vorstellung. */}
            <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
              <div className="relative inline-block max-w-full">
                <HandPfeil reduce={!!reduce} />
                <div
                  className="rounded-[1.1rem] px-4 py-3"
                  style={{
                    background: "rgba(38,2,4,0.62)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p className="text-[1rem] font-bold leading-tight text-white">Hi, ich bin Clemens.</p>
                  <p className="mt-1 text-small leading-snug text-white/75">
                    Founder. Ich führe das Gespräch selbst.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Textspalte */}
          <div className="relative p-7 sm:p-9 md:p-11 lg:p-12">
            <h2 className="title max-w-[19ch] text-balance text-[clamp(1.8rem,1.2rem+1.9vw,2.7rem)]">
              {title ?? "Wie viel Umsatz lässt euer Listing liegen?"}
            </h2>
            <p className="signal-leise mt-4 max-w-[44ch] text-pretty text-[1.05rem] leading-relaxed">
              {sub ??
                "Wir lesen die Berichte aus eurem Konto und zeigen euch, was euer Sortiment noch hergibt."}
            </p>

            <div className="mt-7">
              <a href="/gespraech-vereinbaren" className="btn-on-dark">
                Potenzialanalyse buchen
                <Pfeilscheibe />
              </a>
            </div>

            <ul className="mt-7 grid gap-2.5">
              {zusagen.map((z) => (
                <li key={z} className="flex items-start gap-3 text-small font-bold leading-snug text-white/90">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: "rgba(255,255,255,0.16)" }}
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
