"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ============================================================
   Globus: ein Konto, viele Marktplätze.

   Drei Fassungen liegen dahinter. Erst ein gezeichneter Umriss Westeuropas,
   der aus zwanzig Stützpunkten wie ein grauer Klecks aussah. Dann eine
   Punktkugel mit sieben namenlosen Knoten: die stand still und sagte nichts.

   Jetzt dreht sich die Kugel wirklich, und die Marktplätze laufen als
   Flaggenring darum. Vorne sind sie groß und hell, hinten laufen sie hinter
   der Kugel durch und werden klein und blass. Dadurch hat die Grafik Tiefe
   und Bewegung, ohne Geografie zu behaupten, die ein Punktraster nicht halten
   kann.

   Flaggen auf Länder zu setzen, wäre der Fehler aus der Referenz des Kunden
   gewesen: dort saßen Flaggen auf den falschen Ländern. Ein Ring behauptet
   keine Position, er zeigt Reichweite.

   Alles gezeichnet, nichts generiert. Ein Bildmodell setzt Flaggen falsch.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

const R = 74;
const CX = 100;
const CY = 100;
const RAD = Math.PI / 180;

/* Der Ring liegt schräg im Bild, sonst sähe er aus wie ein Gürtel. */
const RING_A = R * 1.34; /* große Halbachse */
const RING_B = R * 0.46; /* kleine Halbachse */
const RING_NEIGUNG = -17 * RAD;

/* ---------------- Punktraster der Kugel ---------------- */

const GITTER: { lat: number; lon: number }[] = [];
for (let lat = -80; lat <= 80; lat += 8) {
  const ring = Math.cos(lat * RAD);
  const schritt = 8 / Math.max(ring, 0.22);
  for (let lon = -180; lon < 180; lon += schritt) GITTER.push({ lat, lon });
}

/**
 * Das Raster für einen Drehwinkel in drei Tiefenbänder rechnen.
 *
 * Ein Pfad je Band statt dreihundert einzelner Kreise: so wechselt pro Bild
 * nur ein Attribut und nicht dreihundert Elemente. Die Deckkraft je Band
 * erzeugt die Wölbung, Punkte auf der Rückseite fallen weg.
 */
function rasterPfade(drehung: number): string[] {
  const baender: string[][] = [[], [], []];
  for (const g of GITTER) {
    const la = g.lat * RAD;
    const lo = (g.lon + drehung) * RAD;
    const z = Math.cos(la) * Math.cos(lo);
    if (z <= 0.03) continue;
    const x = CX + R * Math.cos(la) * Math.sin(lo);
    const y = CY - R * Math.sin(la);
    const r = 0.5 + z * 0.75;
    const band = z > 0.66 ? 0 : z > 0.33 ? 1 : 2;
    baender[band].push(
      `M${x.toFixed(1)} ${y.toFixed(1)}m-${r.toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(r * 2).toFixed(
        2
      )} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 -${(r * 2).toFixed(2)} 0`
    );
  }
  return baender.map((b) => b.join(""));
}

const BAND_DECKKRAFT = [0.55, 0.34, 0.18];

/* ---------------- Flaggen ---------------- */

/* Gezeichnet in einem Quadrat von -9 bis 9, rund beschnitten. Klein genug,
   dass Details nicht zählen, groß genug, dass jede Flagge erkennbar ist. */

function Waagerecht({ farben }: { farben: string[] }) {
  const h = 18 / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-9} y={-9 + i * h} width={18} height={h} fill={f} />
      ))}
    </>
  );
}

function Senkrecht({ farben }: { farben: string[] }) {
  const b = 18 / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-9 + i * b} y={-9} width={b} height={18} fill={f} />
      ))}
    </>
  );
}

function UnionJack({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-9} y={-9} width={18} height={18} fill="#012169" />
      <path d="M-9-9L9 9M9-9L-9 9" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M-9-9L9 9M9-9L-9 9" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M0-9V9M-9 0H9" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0-9V9M-9 0H9" stroke="#C8102E" strokeWidth="3.4" />
    </g>
  );
}

function Flagge({ code }: { code: string }) {
  switch (code) {
    case "DE":
      return <Waagerecht farben={["#000000", "#DD0000", "#FFCE00"]} />;
    case "FR":
      return <Senkrecht farben={["#002395", "#FFFFFF", "#ED2939"]} />;
    case "IT":
      return <Senkrecht farben={["#008C45", "#F4F5F0", "#CD212A"]} />;
    case "NL":
      return <Waagerecht farben={["#AE1C28", "#FFFFFF", "#21468B"]} />;
    case "BE":
      return <Senkrecht farben={["#000000", "#FAE042", "#ED2939"]} />;
    case "PL":
      return <Waagerecht farben={["#FFFFFF", "#DC143C"]} />;
    case "ES":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#AA151B" />
          <rect x={-9} y={-4.5} width={18} height={9} fill="#F1BF00" />
        </>
      );
    case "SE":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#005293" />
          <rect x={-3.4} y={-9} width={3.6} height={18} fill="#FECB00" />
          <rect x={-9} y={-1.8} width={18} height={3.6} fill="#FECB00" />
        </>
      );
    case "UK":
      return <UnionJack />;
    case "US":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} x={-9} y={-9 + i * (18 / 13)} width={18} height={18 / 13} fill="#B31942" />
          ))}
          <rect x={-9} y={-9} width={8.4} height={7.7} fill="#0A3161" />
          {[
            [-7.2, -7.2],
            [-4.2, -7.2],
            [-5.7, -5.4],
            [-7.2, -3.6],
            [-4.2, -3.6],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.7} fill="#FFFFFF" />
          ))}
        </>
      );
    case "CA":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#FFFFFF" />
          <rect x={-9} y={-9} width={5} height={18} fill="#D80621" />
          <rect x={4} y={-9} width={5} height={18} fill="#D80621" />
          <path
            d="M0-5.6l1.1 2.3 2.3-.6-.8 2.3 2.5 1.5-2.1 1 .5 2.1-2.3-.4-.3 2.4L0 6.9l-1.4-1.9-.3-2.4-2.3.4.5-2.1-2.1-1 2.5-1.5-.8-2.3 2.3.6z"
            fill="#D80621"
          />
        </>
      );
    case "JP":
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#FFFFFF" />
          <circle cx={0} cy={0} r={5.2} fill="#BC002D" />
        </>
      );
    case "AE":
      return (
        <>
          <Waagerecht farben={["#00732F", "#FFFFFF", "#000000"]} />
          <rect x={-9} y={-9} width={5.2} height={18} fill="#FF0000" />
        </>
      );
    default:
      return <rect x={-9} y={-9} width={18} height={18} fill="#123A55" />;
  }
}

/* Zwölf Flaggen im Ring. Mehr passt nicht nebeneinander, ohne dass sie sich
   überlappen; die vollständige Liste steht als Text unter der Grafik. */
const RING = ["DE", "UK", "FR", "IT", "ES", "NL", "SE", "PL", "US", "CA", "JP", "AE"];

const MARKTPLAETZE = [
  "Deutschland",
  "Großbritannien",
  "Frankreich",
  "Italien",
  "Spanien",
  "Niederlande",
  "Belgien",
  "Schweden",
  "Polen",
  "USA",
  "Kanada",
  "Mexiko",
  "Japan",
  "Vereinigte Arabische Emirate",
];

type Punkt = { code: string; x: number; y: number; s: number; o: number; vorne: boolean };

function ringPositionen(winkel: number): Punkt[] {
  const n = RING.length;
  return RING.map((code, i) => {
    const t = winkel * RAD + (i * 2 * Math.PI) / n;
    const ex = RING_A * Math.cos(t);
    const ey = RING_B * Math.sin(t);
    /* Der Ring ist gekippt, die Flaggen bleiben aufrecht: deshalb wird der
       Punkt gedreht und nicht die Gruppe. */
    const x = CX + ex * Math.cos(RING_NEIGUNG) - ey * Math.sin(RING_NEIGUNG);
    const y = CY + ex * Math.sin(RING_NEIGUNG) + ey * Math.cos(RING_NEIGUNG);
    const tiefe = Math.sin(t); /* +1 vorne, -1 hinten */
    return {
      code,
      x,
      y,
      s: 0.56 + 0.34 * ((tiefe + 1) / 2),
      o: 0.42 + 0.58 * ((tiefe + 1) / 2),
      vorne: tiefe >= 0,
    };
  });
}

function FlaggenScheibe({ p, clip }: { p: Punkt; clip: string }) {
  return (
    <g transform={`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) scale(${p.s.toFixed(3)})`} opacity={p.o}>
      <circle r={10.4} fill="rgba(6,26,40,0.85)" />
      <g clipPath={`url(#${clip})`}>
        <Flagge code={p.code} />
      </g>
      <circle r={9} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.3} />
    </g>
  );
}

export function Marktkarte() {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const huelle = useRef<HTMLDivElement>(null);
  const sichtbar = useInView(huelle, { margin: "-10% 0px" });

  /* Ein Zustand für beide Drehungen. Die Kugel dreht sich etwas schneller als
     der Ring, dadurch liest man beide als eigenständige Bewegung. */
  const [winkel, setWinkel] = useState(0);

  useEffect(() => {
    if (reduce || !sichtbar) return;
    let laufend = true;
    let letzte = performance.now();
    let konto = 0;
    const takt = (jetzt: number) => {
      if (!laufend) return;
      const dt = jetzt - letzte;
      letzte = jetzt;
      konto += dt;
      /* Auf 30 Bilder je Sekunde begrenzt: mehr sieht man an einer so
         langsamen Drehung nicht, kostet aber doppelt. */
      if (konto >= 33) {
        const schub = konto;
        konto = 0;
        setWinkel((w) => (w + schub * 0.0075) % 360);
      }
      requestAnimationFrame(takt);
    };
    const h = requestAnimationFrame(takt);
    return () => {
      laufend = false;
      cancelAnimationFrame(h);
    };
  }, [reduce, sichtbar]);

  const pfade = rasterPfade(winkel * 1.35);
  const punkte = ringPositionen(winkel);

  return (
    <div className="relative" ref={huelle}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[64px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), transparent 68%)" }}
      />

      <svg
        viewBox="0 0 200 200"
        className="relative mx-auto w-full max-w-[27rem]"
        role="img"
        aria-label="Eine sich drehende Kugel aus Punkten, umlaufen von den Flaggen der Amazon-Marktplätze."
      >
        <defs>
          <radialGradient id={`${id}-kugel`} cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#2C5573" />
            <stop offset="62%" stopColor="#153950" />
            <stop offset="100%" stopColor="#0A2135" />
          </radialGradient>
          <clipPath id={`${id}-flagge`}>
            <circle r={9} />
          </clipPath>
        </defs>

        {/* Hinter der Kugel: die Flaggen auf der Rückseite des Rings. */}
        <g>
          {punkte
            .filter((p) => !p.vorne)
            .map((p) => (
              <FlaggenScheibe key={p.code} p={p} clip={`${id}-flagge`} />
            ))}
        </g>

        <motion.g
          initial={reduce ? undefined : { scale: 0.88, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX} cy={CY} r={R} fill={`url(#${id}-kugel)`} />
          {pfade.map((d, i) => (
            <path key={i} d={d} fill="#9FC4DC" opacity={BAND_DECKKRAFT[i]} />
          ))}
          {/* Nur eine helle Kante. Ein oranger Lichtrand als Farbverlauf wurde
              ueber dem dunklen Blau braun und sah aus wie ein Rahmen. */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(190,222,240,0.22)" strokeWidth="1" />
        </motion.g>

        {/* Vor der Kugel: die Flaggen auf der Vorderseite. */}
        <g>
          {punkte
            .filter((p) => p.vorne)
            .map((p) => (
              <FlaggenScheibe key={p.code} p={p} clip={`${id}-flagge`} />
            ))}
        </g>
      </svg>

      {/* Die Namen stehen als Text darunter. Auf einer Kugel wären sie
          Kleinstschrift, und die Liste ist länger als der Ring. */}
      <div className="relative mt-7 flex flex-wrap justify-center gap-2">
        {MARKTPLAETZE.map((l, i) => (
          <motion.span
            key={l}
            className={
              i === 0
                ? "rounded-full bg-navy px-3.5 py-1.5 text-small font-bold text-white"
                : "rounded-full bg-white px-3.5 py-1.5 text-small font-bold text-ink shadow-soft ring-1 ring-navy/[0.07]"
            }
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
          >
            {l}
          </motion.span>
        ))}
        <span className="rounded-full px-3.5 py-1.5 text-small font-bold text-ink-faint">und weitere</span>
      </div>
    </div>
  );
}
