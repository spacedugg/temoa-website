"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Marktkarte: Europa und die Marktplätze darauf.

   Auf der Internationalisierungs-Seite stand bisher kein Bild, das zeigt,
   worum es geht. Der Kunde hat nach einer Grafik gefragt, die die Ausbreitung
   über mehrere Länder andeutet.

   Gezeichnet statt fotografiert, weil Bildmodelle Landesgrenzen und
   Beschriftungen falsch setzen. Die Umrisse sind bewusst grob: es ist ein
   Schema, keine Landkarte. Die Punkte leuchten nacheinander auf, verbunden
   mit dem Startmarkt in der Mitte.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* Grober Umriss Westeuropas, ein einziger Pfad. Der Maßstab ist frei. */
const UMRISS =
  "M96 18 L118 14 L140 22 L152 40 L168 44 L182 62 L176 84 L188 104 L178 124 L156 132 " +
  "L140 152 L118 158 L96 150 L74 158 L56 148 L44 128 L52 108 L38 92 L44 70 L62 58 " +
  "L70 36 Z";

/* Der Startmarkt liegt in der Mitte, die weiteren Märkte ringsum. Die
   Bezeichnungen sind Ländercodes, keine Leistungsangaben. */
const maerkte = [
  { code: "DE", x: 112, y: 78, start: true },
  { code: "NL", x: 88, y: 62 },
  { code: "FR", x: 74, y: 106 },
  { code: "IT", x: 126, y: 124 },
  { code: "ES", x: 56, y: 134 },
  { code: "BE", x: 82, y: 82 },
  { code: "PL", x: 148, y: 66 },
  { code: "SE", x: 126, y: 34 },
];

export function Marktkarte() {
  const reduce = useReducedMotion();
  const start = maerkte[0];

  return (
    <div className="panel relative overflow-hidden p-6 md:p-8">
      <span aria-hidden className="halo -right-16 -top-20 h-64 w-64 opacity-70" />

      <div className="relative">
        <span className="inline-flex items-center gap-2.5">
          <span aria-hidden className="node-glow" />
          <span className="text-label font-bold uppercase text-ink-soft">Ein Konto, mehrere Länder</span>
        </span>
      </div>

      <svg
        viewBox="0 0 230 175"
        className="relative mt-6 w-full"
        role="img"
        aria-label="Schematische Karte Westeuropas. Vom deutschen Marktplatz in der Mitte führen leuchtende Verbindungen zu sieben weiteren Ländern."
      >
        <path d={UMRISS} fill="rgba(10,30,43,0.05)" stroke="rgba(10,30,43,0.14)" strokeWidth="1.2" />

        {maerkte.slice(1).map((m, i) => (
          <motion.line
            key={`v-${m.code}`}
            x1={start.x}
            y1={start.y}
            x2={m.x}
            y2={m.y}
            stroke="#FF9900"
            strokeWidth="1.1"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE }}
            style={{ filter: "drop-shadow(0 0 3px rgba(255,153,0,0.7))" }}
          />
        ))}

        {maerkte.map((m, i) => (
          <motion.g
            key={m.code}
            initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 16,
              delay: m.start ? 0.1 : 0.5 + (i - 1) * 0.12,
            }}
            style={{ transformOrigin: `${m.x}px ${m.y}px` }}
          >
            <circle
              cx={m.x}
              cy={m.y}
              r={m.start ? 12 : 10}
              fill={m.start ? "#0A1E2B" : "#ffffff"}
              stroke={m.start ? "#FF9900" : "rgba(10,30,43,0.14)"}
              strokeWidth={m.start ? 1.8 : 1}
              style={m.start ? { filter: "drop-shadow(0 0 8px rgba(255,153,0,0.6))" } : undefined}
            />
            <text
              x={m.x}
              y={m.y + 3.2}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill={m.start ? "#ffffff" : "#0A1E2B"}
            >
              {m.code}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="relative mt-5 flex flex-wrap gap-x-6 gap-y-2">
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-ink">
          <span aria-hidden className="h-3 w-3 rounded-full bg-navy" />
          Startmarkt
        </span>
        <span className="inline-flex items-center gap-2.5 text-small font-bold text-ink">
          <span aria-hidden className="h-3 w-3 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(10,30,43,0.2)]" />
          Eigene Recherche, eigener Content, eigene Kampagnen
        </span>
      </div>
    </div>
  );
}
