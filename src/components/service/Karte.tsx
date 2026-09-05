"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pille } from "../ui/SectionHeading";
import { GITTER, KUGEL, LAENDER, NADELN } from "./europa-geo";

/* ============================================================
   Die Marktplatzkarte auf der Internationalisierungsseite.

   Fuenf Fassungen liegen dahinter, und jede hatte denselben Kern: die Grafik
   hat behauptet, eine Landkarte zu sein, ohne eine zu sein. Ein gezeichneter
   Umriss Westeuropas aus zwanzig Stuetzpunkten sah aus wie ein Klecks. Eine
   Punktkugel hatte keine Laender. Ein Flaggenring behauptete gar keine
   Geografie mehr. Eine Weltkugel aus dem Bildmodell war so weit weg, dass man
   die Laender nicht erkannte.

   Jetzt eine echte Karte: die Umrisse kommen aus Natural Earth
   (`scripts/europa-karte.mjs` rechnet sie in eine Lambert-Projektion und
   schreibt `europa-geo.ts`), der Ausschnitt geht von Portugal bis Polen. Jedes
   Land liegt dort, wo es hingehoert, und jede Flagge auf dem richtigen Land.
   Genau das war der Fehler in der Referenz des Kunden.

   Bewegung: von Deutschland aus laufen Lichtpunkte in die anderen
   Marktplaetze, dauerhaft und leise. Beim Zeigen hebt sich das Land.
   ============================================================ */

const EASE = [0.32, 0.72, 0, 1] as const;

/* ---------------- Flaggen ---------------- */

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
      return (
        <>
          <rect x={-9} y={-9} width={18} height={18} fill="#012169" />
          <path d="M-9-9L9 9M9-9L-9 9" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M-9-9L9 9M9-9L-9 9" stroke="#C8102E" strokeWidth="1.8" />
          <path d="M0-9V9M-9 0H9" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0-9V9M-9 0H9" stroke="#C8102E" strokeWidth="3.4" />
        </>
      );
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
    default:
      return <rect x={-9} y={-9} width={18} height={18} fill="#123A55" />;
  }
}

/* ---------------- Marktplätze ---------------- */

/**
 * Die Schilder stehen neben der Kugel, nicht darauf: auf der Kugel ist Europa
 * zu klein, dort wuerden sich neun Beschriftungen ueberlagern. Eine feine
 * Linie fuehrt von jedem Schild auf seinen Punkt.
 */
type Ziel = { code: string; name: string; y: number; seite: "links" | "rechts" };

const ZIELE: Ziel[] = [
  { code: "SE", name: "Schweden", y: 70, seite: "rechts" },
  { code: "PL", name: "Polen", y: 178, seite: "rechts" },
  { code: "NL", name: "Niederlande", y: 286, seite: "rechts" },
  { code: "DE", name: "Deutschland", y: 394, seite: "rechts" },
  { code: "BE", name: "Belgien", y: 502, seite: "rechts" },
  { code: "UK", name: "Großbritannien", y: 610, seite: "rechts" },
  { code: "FR", name: "Frankreich", y: 718, seite: "rechts" },
  { code: "IT", name: "Italien", y: 826, seite: "rechts" },
  { code: "ES", name: "Spanien", y: 934, seite: "rechts" },
  { code: "US", name: "USA", y: 415, seite: "links" },
];

const SCHILD_H = 76;
const RAND_RECHTS = 1035;
const RAND_LINKS = -35;

/** Breite eines Schildes: Flaggenscheibe, Text, Innenabstaende. */
function breite(name: string) {
  return 130 + name.length * 23;
}

const START = NADELN.DE;

/**
 * Ein Bogen ueber die Kugel. Die Woelbung waechst mit der Entfernung, dadurch
 * sieht die Verbindung nach Amerika aus wie ein Sprung ueber den Atlantik und
 * nicht wie ein Strich auf einer Scheibe.
 */
function bogen(von: [number, number], nach: [number, number]) {
  const [x1, y1] = von;
  const [x2, y2] = nach;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const laenge = Math.hypot(dx, dy) || 1;
  const hebung = Math.min(0.34, 0.16 + laenge / 2600);
  const nx = (-dy / laenge) * laenge * hebung;
  const ny = (dx / laenge) * laenge * hebung;
  /* Immer nach oben ausweichen: so kreuzen sich die Bogen weniger. */
  const richtung = ny > 0 ? -1 : 1;
  return `M${x1},${y1} Q${mx + nx * richtung},${my + ny * richtung} ${x2},${y2}`;
}

function Schild({
  ziel,
  aktiv,
  setAktiv,
  an,
  index,
  reduce,
}: {
  ziel: Ziel;
  aktiv: string | null;
  setAktiv: (c: string | null) => void;
  an: boolean;
  index: number;
  reduce: boolean;
}) {
  const w = breite(ziel.name);
  const rechts = ziel.seite === "rechts";
  const kante = rechts ? RAND_RECHTS : RAND_LINKS;
  const x = rechts ? kante : kante - w;
  const [px, py] = NADELN[ziel.code];
  const gezeigt = aktiv === ziel.code;
  const zustand = reduce || an;
  const verzoegerung = 0.35 + index * 0.06;

  return (
    <motion.g
      onMouseEnter={() => setAktiv(ziel.code)}
      onMouseLeave={() => setAktiv(null)}
      style={{ cursor: "default" }}
      initial={false}
      animate={{ opacity: zustand ? 1 : 0 }}
      transition={{ duration: 0.5, delay: verzoegerung }}
    >
      {/* Leitlinie vom Schild auf den Punkt. */}
      <motion.path
        d={`M${kante},${ziel.y} C${rechts ? kante - 120 : kante + 120},${ziel.y} ${(kante + px) / 2},${py} ${px},${py}`}
        fill="none"
        stroke={gezeigt ? "rgba(255,153,0,0.95)" : "rgba(11,31,52,0.28)"}
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: zustand ? 1 : 0 }}
        transition={{ duration: 0.6, delay: verzoegerung, ease: EASE }}
      />

      {/* Punkt auf dem Land. */}
      <motion.g
        initial={false}
        animate={{ opacity: zustand ? 1 : 0, scale: zustand ? (gezeigt ? 1.25 : 1) : 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: verzoegerung + 0.2 }}
        style={{ transformOrigin: `${px}px ${py}px` }}
      >
        <circle cx={px} cy={py} r={13} fill="rgba(255,153,0,0.25)" />
        <circle cx={px} cy={py} r={6.5} fill="#FF9900" style={{ filter: "drop-shadow(0 0 7px rgba(255,153,0,0.95))" }} />
      </motion.g>

      {/* Das Schild. */}
      <motion.g
        animate={{ y: gezeigt && !reduce ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <rect
          x={x}
          y={ziel.y - SCHILD_H / 2}
          width={w}
          height={SCHILD_H}
          rx={SCHILD_H / 2}
          fill="#ffffff"
          stroke={gezeigt ? "rgba(255,153,0,0.8)" : "rgba(11,31,52,0.09)"}
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 10px 20px rgba(11,31,52,0.16))" }}
        />
        <g transform={`translate(${x + 44} ${ziel.y}) scale(2.05)`}>
          <g clipPath="url(#karte-flagge)">
            <Flagge code={ziel.code} />
          </g>
          <circle r={9} fill="none" stroke="rgba(11,31,52,0.2)" strokeWidth="1.2" />
        </g>
        <text
          x={x + 80}
          y={ziel.y + 13}
          fill="#0A1E2B"
          fontSize="42"
          fontWeight="700"
          style={{ letterSpacing: "-0.01em" }}
        >
          {ziel.name}
        </text>
      </motion.g>
    </motion.g>
  );
}

export function EuropaKarte() {
  const reduce = useReducedMotion();
  const huelle = useRef<HTMLDivElement>(null);
  const imBild = useInView(huelle, { once: true, margin: "-10% 0px" });
  const [an, setAn] = useState(false);
  const [aktiv, setAktiv] = useState<string | null>(null);

  /* Sicherheitsnetz: falls der Beobachter in einem Browser nicht ausloest, ist
     die Kugel nach zwei Sekunden trotzdem da. Eine leere Flaeche ist der
     schlimmste Fehler, den eine Animation machen kann. */
  useEffect(() => {
    if (imBild) setAn(true);
    const t = setTimeout(() => setAn(true), 2000);
    return () => clearTimeout(t);
  }, [imBild]);

  const zustand = reduce || an;
  const verbindungen = ZIELE.filter((z) => z.code !== "DE").map((z) => ({
    code: z.code,
    d: bogen(START, NADELN[z.code]),
  }));

  return (
    <div className="relative" ref={huelle}>
      <svg
        viewBox="-380 -40 1880 1080"
        className="relative w-full"
        role="img"
        aria-label="Eine Weltkugel mit Blick auf den Nordatlantik. Markiert sind die Amazon-Marktplätze Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen, Schweden, Großbritannien und die USA."
      >
        <defs>
          <clipPath id="karte-flagge">
            <circle r={9} />
          </clipPath>
          {/* Die Kugel: Licht von oben links, Schatten zum unteren Rand. */}
          <radialGradient id="kugel-flaeche" cx="34%" cy="26%" r="82%">
            <stop offset="0%" stopColor="#1E5480" />
            <stop offset="55%" stopColor="#123B5C" />
            <stop offset="100%" stopColor="#08192B" />
          </radialGradient>
          {/* Nur eine feine helle Kante. Ein oranger Lichtrand als Verlauf
              wird ueber dem dunklen Blau braun und sieht aus wie ein Rahmen. */}
          <radialGradient id="kugel-rand" cx="50%" cy="50%" r="50%">
            <stop offset="94%" stopColor="rgba(190,222,240,0)" />
            <stop offset="99.5%" stopColor="rgba(214,236,250,0.5)" />
            <stop offset="100%" stopColor="rgba(190,222,240,0)" />
          </radialGradient>
          <clipPath id="kugel-clip">
            <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} />
          </clipPath>
        </defs>

        <motion.g
          initial={false}
          animate={{ opacity: zustand ? 1 : 0, scale: zustand ? 1 : 0.94 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: `${KUGEL.cx}px ${KUGEL.cy}px` }}
        >
          {/* Schein hinter der Kugel, damit sie im Raum steht. */}
          <circle cx={KUGEL.cx} cy={KUGEL.cy + 26} r={KUGEL.r} fill="rgba(11,31,52,0.16)" style={{ filter: "blur(28px)" }} />
          <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} fill="url(#kugel-flaeche)" />

          <g clipPath="url(#kugel-clip)">
            {/* Gitternetz zuerst, danach die Laender darueber. */}
            {GITTER.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="rgba(190,222,240,0.14)" strokeWidth="1.4" />
            ))}

            {LAENDER.map((l) => {
              const markt = Boolean(l.code);
              const gezeigt = aktiv !== null && aktiv === l.code;
              return (
                <motion.path
                  key={l.name}
                  d={l.d}
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth={markt ? 1.6 : 1}
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ fill: gezeigt ? "#5CA6D8" : markt ? "#3D86BC" : "#1B4A6E" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onMouseEnter={markt ? () => setAktiv(l.code) : undefined}
                  onMouseLeave={markt ? () => setAktiv(null) : undefined}
                />
              );
            })}

            {/* Lichtkante oben links, Schatten unten rechts: das macht aus dem
                Kreis eine Kugel. */}
            <circle
              cx={KUGEL.cx}
              cy={KUGEL.cy}
              r={KUGEL.r}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="3"
              style={{ filter: "blur(6px)" }}
            />
            <ellipse
              cx={KUGEL.cx + KUGEL.r * 0.5}
              cy={KUGEL.cy + KUGEL.r * 0.55}
              rx={KUGEL.r * 0.95}
              ry={KUGEL.r * 0.9}
              fill="rgba(4,14,24,0.42)"
              style={{ filter: "blur(60px)" }}
            />
          </g>
          <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} fill="url(#kugel-rand)" />
        </motion.g>

        {/* Verbindungen von Deutschland aus, mit einem Lichtpunkt, der immer
            wieder darueber laeuft. */}
        <g clipPath="url(#kugel-clip)">
          {verbindungen.map((v, i) => (
            <g key={v.code}>
              <motion.path
                d={v.d}
                fill="none"
                stroke="rgba(255,153,0,0.5)"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: zustand ? 1 : 0, opacity: zustand ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: EASE }}
              />
              {!reduce && (
                <motion.path
                  d={v.d}
                  fill="none"
                  stroke="#FFB347"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="24 1400"
                  style={{ filter: "drop-shadow(0 0 6px rgba(255,153,0,0.9))" }}
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={zustand ? { strokeDashoffset: [0, -1424], opacity: [0, 1, 1, 0] } : {}}
                  transition={{
                    duration: 2.8,
                    delay: 1.1 + i * 0.4,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.85, 1],
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {/* Der Startmarkt pulst leise weiter. */}
        {!reduce && zustand && (
          <motion.circle
            cx={START[0]}
            cy={START[1]}
            r={11}
            fill="none"
            stroke="#FF9900"
            strokeWidth="3"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: `${START[0]}px ${START[1]}px` }}
          />
        )}

        {ZIELE.map((z, i) => (
          <Schild
            key={z.code}
            ziel={z}
            aktiv={aktiv}
            setAktiv={setAktiv}
            an={an}
            index={i}
            reduce={!!reduce}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Die Sektion um die Kugel: links die Grafik, rechts der Text.
 */
export function MarktSektion({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="ground-tint relative isolate py-20 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <EuropaKarte />
          <div>
            {eyebrow && <Pille>{eyebrow}</Pille>}
            <h2 className="title mt-6 max-w-[18ch] text-balance text-[clamp(1.9rem,1.3rem+1.7vw,2.9rem)] text-ink">
              {title}
            </h2>
            {text && <p className="mt-5 max-w-[42ch] text-pretty text-lead text-ink-muted">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
