"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Station } from "./Station";
import { Zahl } from "./Zahl";

/* ============================================================
   Haltung: die Signalsektion.

   Zwei Dinge auf einmal. Erstens hat der Kunde nach Farbkontrast zwischen
   den Sektionen gefragt: hier ist die eine Flaeche, die ganz in der
   Markenfarbe steht, als Zaesur zwischen dem dunklen Ergebnisblock und den
   hellen Sektionen danach. Zweitens fehlte der Seite bisher eine Haltung.
   Sie erklaerte den Mechanismus, sagte aber nirgends, wofuer temoa steht.

   Der Satz ist die eigene Zeile des Kunden aus seiner Fallstudie.

   Orange traegt ausschliesslich dunklen Text. Deshalb steht hier nur eine
   kurze grosse Aussage und drei belegte Zahlen, kein Fliesstext.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

const belege: { bis: number; vor?: string; nach?: string; text: string }[] = [
  { bis: 30, vor: "Ø +", nach: " %", text: "mehr Profitabilität im Durchschnitt" },
  { bis: 21, nach: " Mio. €", text: "Amazon-Jahresumsatz in unserer Verantwortung" },
  { bis: 98, nach: " %", text: "der Marken verlängern nach Performance" },
];

export function Haltung() {
  const reduce = useReducedMotion();
  const auf = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <Station label="Wofür wir stehen" tone="signal">
      <motion.h2
        {...auf(0)}
        className="title max-w-[18ch] text-balance text-[clamp(2.2rem,1.4rem+2.6vw,3.75rem)]"
      >
        Wachstum, das man <strong>nachrechnen kann.</strong>
      </motion.h2>

      <motion.p {...auf(0.08)} className="signal-leise mt-6 max-w-[48ch] text-pretty text-lead">
        Jede Zahl auf dieser Seite kommt aus einem Konto, das wir betreuen.
      </motion.p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {belege.map((b, i) => (
          <motion.div key={b.text} {...auf(0.12 + i * 0.07)} className="panel-signal p-6 md:p-7">
            <div className="num text-[clamp(2rem,1.4rem+1.6vw,2.8rem)] text-navy">
              <Zahl bis={b.bis} vor={b.vor} nach={b.nach} />
            </div>
            <div className="mt-3 text-small font-bold leading-snug text-navy/80">{b.text}</div>
          </motion.div>
        ))}
      </div>
    </Station>
  );
}
