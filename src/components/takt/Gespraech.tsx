"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* ============================================================
   Der Abschluss-CTA. Eine Fassung für die gesamte Website.

   Vier Fassungen liegen dahinter. Erst lag der Block auf demselben Navy wie
   die Fusszeile darunter, dadurch war nicht zu sehen, wo die Seite endet.
   Dann stand Clemens als rechteckiges Foto mit einer dunkelblauen Platte
   darueber. Dann klein und verloren in der Ecke einer sehr hohen Sektion.
   Dann freigestellt, aber mit einer Glasplatte auf dem Bild und einem Pfeil,
   der von dieser Platte auf sein Kinn zeigte: eine Kachel auf einem Gesicht,
   und eine Geste, die nirgendwohin fuehrte.

   Jetzt: Clemens steht frei in seiner Spalte, ohne Aufbau darauf. Die
   Sprechzeile steht im Text, wo sie Kontrast hat. Der handgezeichnete Pfeil
   geht ueber das Bild hinaus und endet auf dem Knopf, er zeigt also auf die
   Handlung und nicht auf ein Gesicht.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Handgezeichneter Pfeil vom Portraet auf den Knopf.
 *
 * Er haengt am Knopf und nicht an der Karte: dadurch sitzt er auf jeder Seite
 * richtig, egal wie lang die Ueberschrift darueber ist. Nach links ragt er aus
 * der Textspalte heraus ueber das Bild, die Karte schneidet ihn erst an ihrem
 * eigenen Rand.
 */
function HandPfeil({ reduce }: { reduce: boolean }) {
  const strich = {
    fill: "none" as const,
    stroke: "rgba(255,255,255,0.92)",
    strokeWidth: 3.4,
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
          transition: { duration: 0.7, delay, ease: "easeInOut" as const },
        };

  return (
    <svg
      viewBox="0 0 240 112"
      aria-hidden
      className="pointer-events-none absolute -left-[15.5rem] -top-[3rem] z-20 hidden w-[16rem] md:block"
      style={{ filter: "drop-shadow(0 2px 6px rgba(90,4,10,0.45))" }}
    >
      <motion.path d="M8 92C36 26 132 4 228 56" {...strich} {...zeichnen(0.3)} />
      <motion.path d="M228 56l-25-3M228 56l-9 22" {...strich} {...zeichnen(0.95)} />
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

/**
 * Zwei Zusagen, die etwas wert sind.
 *
 * Sie beschreiben den Ablauf, wie er wirklich ist: ein kurzes erstes
 * Gespraech zum Kennenlernen, und erst danach die vorbereitete Auswertung.
 * Vorher stand hier, dass wir vorab in den Account schauen, das stimmt nicht.
 */
const ZUSAGEN = [
  "25 Minuten, in denen wir eure Lage verstehen und ihr uns kennenlernt",
  "Passt es, folgt ein zweites Gespräch, für das wir eure Zahlen vorbereiten",
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
          className="panel-signal relative grid overflow-hidden md:grid-cols-[0.78fr_1.22fr]"
          initial={reduce ? undefined : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Portraetspalte. Nichts liegt auf dem Bild, der Schein dahinter
              hebt die dunkle Jacke vom Rot ab. */}
          <div
            className="relative min-h-[17rem] overflow-hidden sm:min-h-[20rem] md:min-h-[23rem]"
            style={{
              background:
                "radial-gradient(110% 80% at 50% 16%, rgba(255,186,130,0.42), transparent 62%), rgba(120,8,16,0.28)",
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
                 aus der Klasse weg. */
              className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto max-w-none object-contain object-bottom"
              style={{ filter: "drop-shadow(0 22px 40px rgba(70,2,8,0.45))" }}
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            />
          </div>

          {/* Textspalte */}
          <div className="relative p-7 sm:p-9 md:p-11 lg:p-12">
            <p className="text-[1.05rem] font-bold leading-tight text-white">Hi, ich bin Clemens.</p>
            <p className="signal-leise mt-1 text-small">Founder. Ich führe das Gespräch selbst.</p>

            <h2 className="title mt-5 max-w-[19ch] text-balance text-[clamp(1.8rem,1.2rem+1.9vw,2.7rem)]">
              {title ?? "Wie viel Umsatz lässt euer Listing liegen?"}
            </h2>
            <p className="signal-leise mt-4 max-w-[44ch] text-pretty text-[1.05rem] leading-relaxed">
              {sub ?? "Ein kurzes Gespräch, in dem wir eure Lage verstehen und sagen, wo wir Potenzial sehen."}
            </p>

            <div className="relative mt-7 inline-block">
              <HandPfeil reduce={!!reduce} />
              <a href="/gespraech-vereinbaren" className="btn-on-dark relative z-10">
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
                    style={{ background: "rgba(255,255,255,0.18)" }}
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
