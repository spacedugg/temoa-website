"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";

/* ============================================================
   Verlauf: was sich zwischen Werbung und organischem Umsatz verschiebt.

   Drei Fassungen liegen dahinter. Erst ein steigender Balkenverlauf mit einer
   erfundenen Zeitachse. Dann eine flache Flaeche ueber die ganze Breite: unten
   ein oranger Block, darueber eine gruene Flaeche. Der Kunde hat die zweite
   verworfen, und er hat recht: sie war sehr gross, sehr flach und hat fuer den
   Platz, den sie nahm, kaum etwas gesagt.

   Jetzt ein isometrischer Stapel auf dunklem Grund. Jede Saeule steht fuer
   einen Zeitraum und besteht aus zwei Teilen: unten der Umsatz ueber Werbung,
   ueberall gleich hoch, oben der Umsatz ohne Werbung, der nach rechts waechst.
   Die Aussage ist dieselbe, aber man sieht sie in einem Blick, das Bild ist
   halb so hoch und steht neben der Aussage statt darunter.

   Keine Zeitachse und keine Werte an den Saeulen: es ist der Mechanismus und
   kein Fall. Bei prefers-reduced-motion steht alles sofort im Endzustand.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Isometrie, 2:1. Ein Schritt nach rechts auf der Grundflaeche geht nach
   rechts unten, ein Schritt nach hinten nach links unten. Die Saeulen stehen
   auf einer Linie, auf der sich beides aufhebt, dadurch steht die Reihe
   waagerecht im Bild und trotzdem raeumlich. */
const A = 30; /* halbe Breite eines Rasterschritts */
const B = 17; /* halbe Hoehe eines Rasterschritts */
const CX = 52;
const CY = 178;
const SEITE = 0.66; /* Kantenlaenge der Saeule in Rasterschritten */
const SCHRITT = 0.86; /* Abstand der Saeulen */

/** Grundflaeche eines Punktes ins Bild rechnen. */
function pkt(ix: number, iy: number, hoehe = 0): [number, number] {
  return [CX + (ix - iy) * A, CY + (ix + iy) * B - hoehe];
}

/** Die drei sichtbaren Flaechen eines Quaders. */
function quader(i: number, unten: number, oben: number) {
  const gx = i * SCHRITT;
  const gy = -i * SCHRITT;
  const s = SEITE;
  const P = (dx: number, dy: number, h: number) => pkt(gx + dx, gy + dy, h);
  const zu = (punkte: [number, number][]) => punkte.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return {
    deckel: zu([P(0, 0, oben), P(s, 0, oben), P(s, s, oben), P(0, s, oben)]),
    rechts: zu([P(s, 0, oben), P(s, s, oben), P(s, s, unten), P(s, 0, unten)]),
    links: zu([P(0, s, oben), P(s, s, oben), P(s, s, unten), P(0, s, unten)]),
  };
}

/* Anteile, keine Zahlen. Das Werbeband bleibt gleich, das organische Wachstum
   zieht an. */
const WERBUNG = 34;
const ORGANISCH = [4, 6, 9, 14, 20, 28, 38, 51, 67, 88];

/* Die Seitenflaechen sind die Farbe im Schatten, der Deckel die Farbe im
   Licht. Zu dunkle Seiten machen aus Orange ein Braun. */
const FARBEN = {
  werbung: { deckel: "#FFC46B", rechts: "#E07C00", links: "#FFA524" },
  organisch: { deckel: "#8AF0B4", rechts: "#127F49", links: "#22C55E" },
};

function Saeule({
  i,
  zeigen,
  reduce,
}: {
  i: number;
  zeigen: boolean;
  reduce: boolean;
}) {
  const w = quader(i, 0, WERBUNG);
  const o = quader(i, WERBUNG, WERBUNG + ORGANISCH[i]);
  const fuss = pkt(i * SCHRITT + SEITE / 2, -i * SCHRITT + SEITE / 2, 0);

  return (
    <motion.g
      initial={reduce ? undefined : { scaleY: 0.06, opacity: 0 }}
      animate={zeigen ? { scaleY: 1, opacity: 1 } : {}}
      transition={{ duration: 0.75, delay: 0.1 + i * 0.075, ease: EASE }}
      style={{ transformOrigin: `${fuss[0]}px ${fuss[1]}px` }}
    >
      {/* Unten das Werbeband, ueberall gleich hoch. */}
      <polygon points={w.links} fill={FARBEN.werbung.links} />
      <polygon points={w.rechts} fill={FARBEN.werbung.rechts} />
      <polygon points={w.deckel} fill={FARBEN.werbung.deckel} opacity="0.25" />
      {/* Darueber der organische Umsatz. */}
      <polygon points={o.links} fill={FARBEN.organisch.links} />
      <polygon points={o.rechts} fill={FARBEN.organisch.rechts} />
      <polygon points={o.deckel} fill={FARBEN.organisch.deckel} />
      <polygon
        points={o.deckel}
        fill="none"
        stroke="rgba(214,255,232,0.9)"
        strokeWidth="1"
        style={{ filter: "drop-shadow(0 0 5px rgba(110,231,160,0.85))" }}
      />
    </motion.g>
  );
}

export function Verlauf() {
  const ref = useRef<HTMLDivElement>(null);
  const drin = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const zeigen = reduce || drin;
  const id = useId().replace(/:/g, "");

  /* Das Raster unter den Saeulen. Es macht aus der Reihe eine Flaeche, auf der
     sie steht. */
  const raster: string[] = [];
  for (let k = -1; k <= ORGANISCH.length; k++) {
    const a = pkt(k * SCHRITT - 0.5, -k * SCHRITT - 0.5);
    const b = pkt(k * SCHRITT + 1.2, -k * SCHRITT + 1.2);
    raster.push(`M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`);
  }

  /* Die Linie laeuft auf Hoehe des Werbebands von der ersten bis zur letzten
     Saeule. Die Mittelpunkte der Saeulen liegen auf einer Waagerechten,
     deshalb ist auch die Linie waagerecht. */
  const linkeKante = pkt(-0.5 + SEITE / 2, 0.5 + SEITE / 2, WERBUNG);
  const rechteKante = pkt(
    (ORGANISCH.length - 1) * SCHRITT + 0.5 + SEITE / 2,
    -(ORGANISCH.length - 1) * SCHRITT - 0.5 + SEITE / 2,
    WERBUNG
  );
  const hoehenlinie = `M${linkeKante[0].toFixed(1)},${linkeKante[1].toFixed(1)} L${rechteKante[0].toFixed(1)},${rechteKante[1].toFixed(1)}`;

  return (
    <div ref={ref} className="on-dark panel-navy relative overflow-hidden p-6 md:p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full opacity-70 blur-[60px]"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.34), transparent 70%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-16 h-56 w-56 rounded-full opacity-60 blur-[60px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.3), transparent 70%)" }}
      />

      <svg
        viewBox="0 0 578 214"
        className="relative w-full"
        role="img"
        aria-label="Zehn Säulen nebeneinander, räumlich dargestellt. Der untere Teil jeder Säule steht für den Umsatz über Werbung und ist überall gleich hoch. Der obere Teil steht für den Umsatz ohne Werbung und wächst nach rechts deutlich."
      >
        <defs>
          <linearGradient id={`${id}-boden`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <g>
          {raster.map((d, i) => (
            <path key={i} d={d} stroke={`url(#${id}-boden)`} strokeWidth="1" fill="none" />
          ))}
        </g>

        {/* Die Hoehenlinie ueber den orangen Sockeln. Sie sagt, was der Text
            daneben sagt: unten bleibt es gleich, oben waechst es. */}
        <motion.path
          d={hoehenlinie}
          fill="none"
          stroke="rgba(255,196,107,0.85)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
          animate={zeigen ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        />

        {ORGANISCH.map((_, i) => (
          <Saeule key={i} i={i} zeigen={zeigen} reduce={!!reduce} />
        ))}

      </svg>

      {/* Legende. Sie sagt, welcher Teil was ist, mehr braucht das Bild nicht. */}
      <div className="relative mt-5 flex flex-wrap gap-x-7 gap-y-2 border-t border-white/[0.1] pt-5">
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-white">
          <span aria-hidden className="h-3 w-3 rounded-[0.3rem]" style={{ background: "#FF9900" }} />
          Umsatz über Werbung
        </span>
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-white">
          <span aria-hidden className="h-3 w-3 rounded-[0.3rem]" style={{ background: "#22C55E" }} />
          Umsatz ohne Werbung
        </span>
      </div>
    </div>
  );
}
