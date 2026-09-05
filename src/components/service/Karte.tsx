"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/* ============================================================
   Globus: ein Konto, mehrere Marktplätze.

   Erste Fassung war ein gezeichneter Umriss Westeuropas. Aus zwanzig
   Stützpunkten wird keine Landkarte, sie sah aus wie ein grauer Klecks,
   und die Länderpunkte darauf lagen an Stellen, die niemand wiedererkennt.

   Deshalb jetzt keine Landkarte, sondern eine Kugel: ein Punktraster auf
   einer Sphäre, ein Lichtrand, der Startmarkt als leuchtender Knoten und
   Bögen zu den weiteren Marktplätzen. Das behauptet keine Geografie, die es
   nicht halten kann, und sagt trotzdem, worum es geht.

   Gezeichnet statt generiert: ein Bildmodell setzt Ländergrenzen und
   Flaggen falsch, das war in der Referenz des Kunden selbst zu sehen.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

const R = 62;
const CX = 78;
const CY = 78;

/**
 * Punktraster auf der Kugel.
 *
 * Breitenkreise als Ellipsen, Punkte darauf nach Längengrad. Punkte auf der
 * abgewandten Seite werden übersprungen, dadurch wirkt die Kugel massiv.
 * Die Deckkraft fällt zum Rand hin ab, das erzeugt die Wölbung.
 */
function raster() {
  const punkte: { x: number; y: number; r: number; o: number }[] = [];
  for (let lat = -70; lat <= 70; lat += 14) {
    const rad = (lat * Math.PI) / 180;
    const y = CY - R * Math.sin(rad);
    const ringR = R * Math.cos(rad);
    const schritt = Math.max(14, 18 / Math.cos(rad));
    for (let lon = -180; lon < 180; lon += schritt) {
      const lonRad = (lon * Math.PI) / 180;
      const z = Math.cos(lonRad);
      if (z <= 0.06) continue; /* Rückseite */
      const x = CX + ringR * Math.sin(lonRad);
      const tiefe = z;
      punkte.push({ x, y, r: 0.85 + tiefe * 0.8, o: 0.16 + tiefe * 0.34 });
    }
  }
  return punkte;
}
const PUNKTE = raster();

/* Der Startmarkt sitzt in der Mitte der sichtbaren Halbkugel, die weiteren
   Marktplätze liegen darum. Bewusst ohne Ländernamen an der Kugel: die
   Bezeichnungen stehen als Liste daneben. */
const knoten = [
  { x: 78, y: 62, start: true },
  { x: 55, y: 44 },
  { x: 100, y: 46 },
  { x: 44, y: 76 },
  { x: 108, y: 78 },
  { x: 66, y: 98 },
  { x: 96, y: 102 },
];

const laender = ["Deutschland", "Frankreich", "Italien", "Spanien", "Niederlande", "Belgien", "Polen", "Schweden"];

export function Marktkarte() {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const start = knoten[0];

  return (
    <div className="relative">
      {/* Kein Rahmen, keine Platte: die Kugel sitzt direkt auf dem Grund,
          wie alle freigestellten Illustrationen dieser Website. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[60px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.3), transparent 68%)" }}
      />

      <svg
        viewBox="0 0 156 172"
        className="relative mx-auto w-full max-w-[24rem]"
        role="img"
        aria-label="Eine Kugel aus Punkten. Vom Startmarkt in der Mitte führen leuchtende Bögen zu sechs weiteren Marktplätzen."
      >
        <defs>
          <radialGradient id={`${id}-kugel`} cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#2C5573" />
            <stop offset="62%" stopColor="#153950" />
            <stop offset="100%" stopColor="#0A2135" />
          </radialGradient>
          <radialGradient id={`${id}-rand`} cx="50%" cy="50%" r="50%">
            <stop offset="82%" stopColor="rgba(255,153,0,0)" />
            <stop offset="97%" stopColor="rgba(255,153,0,0.5)" />
            <stop offset="100%" stopColor="rgba(255,153,0,0)" />
          </radialGradient>
        </defs>

        {/* Der Körper der Kugel */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          fill={`url(#${id}-kugel)`}
          initial={reduce ? undefined : { scale: 0.86, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle cx={CX} cy={CY} r={R} fill={`url(#${id}-rand)`} />

        {/* Das Punktraster */}
        <motion.g
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {PUNKTE.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#9FC4DC" opacity={p.o} />
          ))}
        </motion.g>

        {/* Bögen vom Startmarkt zu den weiteren Marktplätzen. Der Bogen hebt
            sich von der Kugel ab, dadurch liest man ihn als Verbindung über
            die Oberfläche statt als Strich darauf. */}
        {knoten.slice(1).map((k, i) => {
          const mx = (start.x + k.x) / 2;
          const my = (start.y + k.y) / 2;
          const dx = k.x - start.x;
          const dy = k.y - start.y;
          const laenge = Math.hypot(dx, dy);
          const hebung = laenge * 0.42;
          const nx = (-dy / laenge) * hebung;
          const ny = (dx / laenge) * hebung;
          const richtung = ny > 0 ? -1 : 1;
          return (
            <motion.path
              key={`b-${i}`}
              d={`M${start.x},${start.y} Q${mx + nx * richtung},${my + ny * richtung} ${k.x},${k.y}`}
              fill="none"
              stroke="#FF9900"
              strokeWidth="1.1"
              strokeLinecap="round"
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.9 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.65, delay: 0.5 + i * 0.11, ease: EASE }}
              style={{ filter: "drop-shadow(0 0 3px rgba(255,153,0,0.8))" }}
            />
          );
        })}

        {/* Die Knoten. Der Startmarkt ist größer und pulsiert leise weiter. */}
        {knoten.map((k, i) => (
          <motion.g
            key={`k-${i}`}
            initial={reduce ? undefined : { opacity: 0, scale: 0.3 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ type: "spring", stiffness: 280, damping: 16, delay: k.start ? 0.35 : 0.75 + i * 0.09 }}
            style={{ transformOrigin: `${k.x}px ${k.y}px` }}
          >
            {k.start && !reduce && (
              <motion.circle
                cx={k.x}
                cy={k.y}
                r="5"
                fill="none"
                stroke="#FF9900"
                strokeWidth="1"
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                style={{ transformOrigin: `${k.x}px ${k.y}px` }}
              />
            )}
            <circle
              cx={k.x}
              cy={k.y}
              r={k.start ? 4.6 : 3}
              fill={k.start ? "#FF9900" : "#FFFFFF"}
              style={{
                filter: k.start
                  ? "drop-shadow(0 0 7px rgba(255,153,0,0.95))"
                  : "drop-shadow(0 0 4px rgba(255,255,255,0.7))",
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Die Marktplätze als Liste unter der Kugel. Namen gehören in den Text,
          nicht als Kleinstschrift auf eine Kugel. */}
      <div className="relative mt-8 flex flex-wrap justify-center gap-2">
        {laender.map((l, i) => (
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
            transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
          >
            {l}
          </motion.span>
        ))}
        <span className="rounded-full px-3.5 py-1.5 text-small font-bold text-ink-faint">und weitere</span>
      </div>
    </div>
  );
}
