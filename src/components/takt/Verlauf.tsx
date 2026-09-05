"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";

/* ============================================================
   Verlauf: was sich zwischen Werbung und organischem Umsatz verschiebt.

   Erste Fassung war ein einzelner steigender Balkenverlauf mit der
   Achsenbeschriftung „Vor der Ueberarbeitung" und „Nach zwoelf Monaten",
   dazu die Ueberschrift „Organische Verkaeufe wachsen weiter, wenn die
   Werbung pausiert" und daneben „Ø +30 % Profitabilitaet". Drei Aussagen,
   die nichts miteinander zu tun hatten, und eine Zeitachse, die ein
   Versprechen behauptet hat, das niemand einloesen kann.

   Jetzt zeigt das Bild genau eine Sache, naemlich die Aussage der Sektion:
   unten liegt das orange Band, der Umsatz ueber Werbung, und es bleibt ueber
   die ganze Breite gleich hoch. Darueber waechst die gruene Flaeche, der
   Umsatz ohne Werbung. Keine Zeitachse, keine Werte an den Flaechen, weil es
   der Mechanismus ist und kein Fall.

   Bei prefers-reduced-motion steht alles sofort im Endzustand.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Anteile der Hoehe, keine Zahlenangaben. Das organische Wachstum zieht an,
   das Werbeband bleibt konstant dick. */
const organisch = [0.08, 0.1, 0.09, 0.13, 0.17, 0.2, 0.26, 0.33, 0.42, 0.53, 0.66, 0.8];

const BASIS = 68;
const WERBUNG_OBEN = 56; /* konstante Hoehe: das Werbebudget bleibt gleich */
const SKALA = 48;
const LINKS = 4;
const RECHTS = 196;

function x(i: number) {
  return LINKS + (i * (RECHTS - LINKS)) / (organisch.length - 1);
}
/* Die organische Flaeche liegt AUF dem Werbeband, nicht darunter. Nur so
   sieht man, dass unten nichts dazukommt und oben alles waechst. */
function yOrganisch(i: number) {
  return WERBUNG_OBEN - organisch[i] * SKALA;
}

function linie(f: (i: number) => number) {
  return organisch.map((_, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${f(i).toFixed(1)}`).join(" ");
}

const flaecheWerbung = `M${LINKS},${WERBUNG_OBEN} L${RECHTS},${WERBUNG_OBEN} L${RECHTS},${BASIS} L${LINKS},${BASIS} Z`;
const flaecheOrganisch = `${linie(yOrganisch)} L${RECHTS},${WERBUNG_OBEN} L${LINKS},${WERBUNG_OBEN} Z`;
const linieWerbung = `M${LINKS},${WERBUNG_OBEN} L${RECHTS},${WERBUNG_OBEN}`;

export function Verlauf() {
  const ref = useRef<HTMLDivElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const zeigen = reduce || drin;
  const id = useId().replace(/:/g, "");

  return (
    <div ref={ref} className="panel relative overflow-hidden p-6 md:p-9">
      <span aria-hidden className="halo -right-16 -top-24 h-72 w-72 opacity-70" />

      <div className="relative">
        <span className="inline-flex items-center gap-2.5">
          <span aria-hidden className="node-glow" />
          <span className="text-label font-bold uppercase text-ink-soft">Was sich verschiebt</span>
        </span>
        <p className="mt-4 max-w-[38ch] text-balance text-[1.2rem] font-bold leading-snug text-ink md:text-[1.5rem]">
          Das Werbebudget bleibt gleich. Alles, was darüber wächst, verkauft ihr ohne Werbung.
        </p>
      </div>

      <svg
        viewBox="0 0 200 76"
        className="relative mt-8 w-full"
        role="img"
        aria-label="Unten ein Band gleicher Höhe für den Umsatz über Werbung, darüber eine Fläche für den Umsatz ohne Werbung, die nach rechts deutlich wächst."
      >
        <defs>
          <linearGradient id={`${id}-org`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={`${id}-ads`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF9900" stopOpacity="0.7" />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <motion.rect
              x="0"
              y="0"
              height="76"
              initial={reduce ? undefined : { width: 0 }}
              animate={zeigen ? { width: 200 } : {}}
              transition={{ duration: 1.6, ease: EASE }}
              width={reduce ? 200 : undefined}
            />
          </clipPath>
        </defs>

        <g clipPath={`url(#${id}-clip)`}>
          <path d={flaecheWerbung} fill={`url(#${id}-ads)`} />
          <path d={flaecheOrganisch} fill={`url(#${id}-org)`} />
          <path
            d={linie(yOrganisch)}
            fill="none"
            stroke="#16A34A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={linieWerbung} fill="none" stroke="#E07C00" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>

      {/* Legende. Sie sagt, welche Flaeche was ist, mehr braucht das Bild nicht. */}
      <div className="relative mt-6 flex flex-wrap gap-x-7 gap-y-2">
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-ink">
          <span aria-hidden className="h-3 w-3 rounded-[0.3rem]" style={{ background: "#FF9900" }} />
          Umsatz über Werbung
        </span>
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-ink">
          <span aria-hidden className="h-3 w-3 rounded-[0.3rem]" style={{ background: "#22C55E" }} />
          Umsatz ohne Werbung
        </span>
      </div>
    </div>
  );
}
