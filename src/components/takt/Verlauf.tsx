"use client";

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   Verlauf: der Graph, der sich aufbaut.

   Der Kunde wollte mehr Performance-Charakter und ausdruecklich einen
   Graphen, der sich aufbaut, als wuerden Verkaeufe steigen. Vorher stand
   an dieser Stelle nur ein fertiges Bild.

   Was hier gezeichnet wird, ist schematisch und traegt bewusst keine
   Werte an der Kurve: erfundene Leistungszahlen in einer Grafik sind laut
   Projektvorgabe nicht erlaubt. Beziffert ist nur, was belegt ist.

   Bei prefers-reduced-motion steht alles sofort im Endzustand.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/** Die zwoelf Balken. Werte sind Anteile der Hoehe, keine Zahlenangaben. */
const balken = [0.22, 0.26, 0.24, 0.31, 0.35, 0.33, 0.42, 0.5, 0.56, 0.66, 0.78, 0.94];

/* Die Kurve laeuft ueber denselben Verlauf, etwas darueber. */
const KURVE = balken
  .map((v, i) => {
    const x = 6 + (i * 88) / (balken.length - 1);
    const y = 62 - v * 50;
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  })
  .join(" ");

/** Zaehlt eine Zahl hoch, sobald sie im Bild ist. */
function Zahl({ bis, suffix = "", vorzeichen = "" }: { bis: number; suffix?: string; vorzeichen?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [wert, setWert] = useState(reduce ? bis : 0);

  useEffect(() => {
    if (!drin || reduce) return;
    const steuerung = animate(0, bis, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setWert(Math.round(v)),
    });
    return () => steuerung.stop();
  }, [drin, reduce, bis]);

  return (
    <span ref={ref} className="[font-variant-numeric:tabular-nums]">
      {vorzeichen}
      {wert}
      {suffix}
    </span>
  );
}

export function Verlauf() {
  const ref = useRef<HTMLDivElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const zeigen = reduce || drin;

  return (
    <div ref={ref} className="panel relative overflow-hidden p-6 md:p-8">
      <span aria-hidden className="halo -right-16 -top-20 h-64 w-64 opacity-80" />

      <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="node-glow" />
            <span className="text-label font-bold uppercase text-ink-soft">Was sich aufbaut</span>
          </span>
          <p className="mt-3 max-w-[34ch] text-balance text-[1.15rem] font-bold leading-snug text-ink md:text-[1.35rem]">
            Organische Verkäufe wachsen weiter, wenn die Werbung pausiert.
          </p>
        </div>

        {/* Belegte Angabe, keine Fantasiezahl an der Kurve. */}
        <div className="kpi shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="num text-[1.7rem] text-ink">
              Ø <Zahl bis={30} suffix=" %" vorzeichen="+" />
            </span>
            <span
              aria-hidden
              className="grid h-6 w-6 place-items-center rounded-lg"
              style={{ background: "#16A34A14", color: "#16A34A" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6m0 0h-7m7 0v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className="mt-1 text-[0.75rem] font-bold leading-tight text-ink">Profitabilität</div>
        </div>
      </div>

      <div className="relative mt-7">
        <svg viewBox="0 0 100 70" className="w-full" role="img" aria-label="Ein Verlauf, der über zwölf Schritte ansteigt. Schematische Darstellung ohne Werte.">
          <defs>
            <linearGradient id="verlauf-flaeche" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9900" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FF9900" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="verlauf-balken" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b6cb0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2b6cb0" stopOpacity="0.16" />
            </linearGradient>
          </defs>

          {/* Grundlinie */}
          <line x1="4" y1="62.5" x2="96" y2="62.5" stroke="rgba(13,36,57,0.12)" strokeWidth="0.5" />

          {/* Balken: wachsen einer nach dem anderen aus der Grundlinie */}
          {balken.map((v, i) => {
            const breite = 4.6;
            const x = 6 + (i * 88) / (balken.length - 1) - breite / 2;
            const hoehe = v * 50;
            return (
              <motion.rect
                key={i}
                x={x}
                width={breite}
                rx="1.2"
                fill="url(#verlauf-balken)"
                initial={reduce ? undefined : { y: 62, height: 0 }}
                animate={zeigen ? { y: 62 - hoehe, height: hoehe } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.055, ease: EASE }}
                y={reduce ? 62 - hoehe : undefined}
                height={reduce ? hoehe : undefined}
              />
            );
          })}

          {/* Flaeche unter der Kurve */}
          <motion.path
            d={`${KURVE} L94,62.5 L6,62.5 Z`}
            fill="url(#verlauf-flaeche)"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={zeigen ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
          />

          {/* Die Kurve zeichnet sich */}
          <motion.path
            d={KURVE}
            fill="none"
            stroke="#FF9900"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={zeigen ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.25, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(255,153,0,0.6))" }}
          />

          {/* Leuchtpunkt am Ende, sobald die Kurve steht */}
          <motion.circle
            cx="94"
            cy={(62 - balken[balken.length - 1] * 50).toFixed(2)}
            r="2"
            fill="#FF9900"
            initial={reduce ? undefined : { scale: 0, opacity: 0 }}
            animate={zeigen ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 1.7 }}
            style={{ transformOrigin: "94px 15px", filter: "drop-shadow(0 0 6px rgba(255,153,0,0.9))" }}
          />
        </svg>

        {/* Zwei Marken auf der Zeitachse, ohne Zahlenwerte. */}
        <div className="mt-1 flex justify-between text-[0.68rem] font-semibold text-ink-faint">
          <span>Vor der Überarbeitung</span>
          <span>Nach zwölf Monaten</span>
        </div>
      </div>

      <p className="relative mt-5 border-t border-ink/[0.07] pt-4 text-[0.72rem] leading-relaxed text-ink-faint">
        Schematische Darstellung des Verlaufs, ohne Werte an der Kurve. Beziffert ist nur die
        durchschnittliche Steigerung der Profitabilität über die von uns betreuten Marken.
      </p>
    </div>
  );
}
