"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pille } from "../ui/SectionHeading";
import { KARTE_BREITE, KARTE_HOEHE, LAENDER, NADELN } from "./europa-geo";

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
 * `versatz` schiebt das Schild vom Landepunkt weg. Deutschland, Frankreich,
 * Spanien, Polen und Grossbritannien tragen ihr Schild im Land. Die
 * Niederlande und Belgien sind dafuer zu klein: dort steht das Schild ueber
 * der Nordsee und eine kurze Linie zeigt auf das Land.
 */
type Ziel = { code: string; name: string; versatz?: [number, number] };

const ZIELE: Ziel[] = [
  { code: "DE", name: "Deutschland" },
  { code: "FR", name: "Frankreich" },
  { code: "ES", name: "Spanien" },
  { code: "IT", name: "Italien", versatz: [78, 34] },
  { code: "PL", name: "Polen" },
  { code: "SE", name: "Schweden", versatz: [76, -18] },
  { code: "UK", name: "Großbritannien", versatz: [-86, -46] },
  { code: "NL", name: "Niederlande", versatz: [-92, -54] },
  { code: "BE", name: "Belgien", versatz: [-118, 6] },
];

/* Die USA liegen ausserhalb des Ausschnitts. Das Schild sitzt ueber dem
   Atlantik am linken Rand, der Bogen laeuft von Deutschland dorthin: „und
   ueber den Atlantik". */
const USA_PUNKT: [number, number] = [96, 430];

const START = NADELN.DE;

function bogen(von: [number, number], nach: [number, number], hebung = 0.22) {
  const [x1, y1] = von;
  const [x2, y2] = nach;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const laenge = Math.hypot(dx, dy) || 1;
  /* Der Bogen weicht immer nach oben aus, dadurch kreuzen sich die Linien
     weniger und die Karte bleibt lesbar. */
  const nx = (-dy / laenge) * laenge * hebung;
  const ny = (dx / laenge) * laenge * hebung;
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
  const [px, py] = NADELN[ziel.code];
  const [vx, vy] = ziel.versatz ?? [0, 0];
  const cx = px + vx;
  const cy = py + vy;
  const breite = 96;
  const hoehe = 46;
  const gezeigt = aktiv === ziel.code;
  const zustand = reduce || an;

  return (
    <motion.g
      onMouseEnter={() => setAktiv(ziel.code)}
      onMouseLeave={() => setAktiv(null)}
      style={{ cursor: "default" }}
      initial={false}
      animate={{ opacity: zustand ? 1 : 0, scale: zustand ? 1 : 0.7 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 + index * 0.07 }}
    >
      {/* Linie vom Schild zum Land, nur wenn das Schild versetzt steht. */}
      {ziel.versatz && (
        <line
          x1={cx + (vx < 0 ? breite / 2 : -breite / 2)}
          y1={cy}
          x2={px}
          y2={py}
          stroke="rgba(11,31,52,0.35)"
          strokeWidth="2"
        />
      )}
      {ziel.versatz && <circle cx={px} cy={py} r={5} fill="#0A1E2B" />}

      <motion.g
        animate={{ y: gezeigt && !reduce ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <rect
          x={cx - breite / 2}
          y={cy - hoehe / 2}
          width={breite}
          height={hoehe}
          rx={hoehe / 2}
          fill="#ffffff"
          stroke={gezeigt ? "rgba(255,153,0,0.85)" : "rgba(11,31,52,0.1)"}
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 6px 14px rgba(11,31,52,0.22))" }}
        />
        <g transform={`translate(${cx - breite / 2 + 25} ${cy}) scale(1.4)`}>
          <g clipPath="url(#karte-flagge)">
            <Flagge code={ziel.code} />
          </g>
          <circle r={9} fill="none" stroke="rgba(11,31,52,0.2)" strokeWidth="1.2" />
        </g>
        <text
          x={cx - breite / 2 + 44}
          y={cy + 10}
          fill="#0A1E2B"
          fontSize="28"
          fontWeight="800"
          style={{ letterSpacing: "0.01em" }}
        >
          {ziel.code}
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
     die Karte nach zwei Sekunden trotzdem da. Eine leere Flaeche ist der
     schlimmste Fehler, den eine Animation machen kann. */
  useEffect(() => {
    if (imBild) setAn(true);
    const t = setTimeout(() => setAn(true), 2000);
    return () => clearTimeout(t);
  }, [imBild]);

  const zustand = reduce || an;
  const verbindungen = [
    ...ZIELE.filter((z) => z.code !== "DE").map((z) => ({
      code: z.code,
      d: bogen(START, NADELN[z.code]),
    })),
    { code: "US", d: bogen(START, USA_PUNKT, 0.16) },
  ];

  return (
    <div className="relative" ref={huelle}>
      <svg
        viewBox={`0 0 ${KARTE_BREITE} ${KARTE_HOEHE}`}
        className="relative w-full"
        role="img"
        aria-label="Karte von Europa mit den Amazon-Marktplätzen Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen, Schweden und Großbritannien, dazu ein Verweis auf die USA."
      >
        <defs>
          <clipPath id="karte-flagge">
            <circle r={9} />
          </clipPath>
        </defs>

        {/* Kein Grund hinter der Karte: eine getoente Flaeche steht als
            Rechteck auf der Sektion, und genau solche Kaesten in Kaesten sind
            hier unerwuenscht. Der Sektionsgrund reicht. */}

        {/* Die Laender. Marktplaetze in Navy, der Rest als ruhige Umgebung,
            damit Europa als Europa lesbar ist. */}
        <g>
          {LAENDER.map((l) => {
            const markt = Boolean(l.code);
            const gezeigt = aktiv !== null && aktiv === l.code;
            return (
              <motion.path
                key={l.name}
                d={l.d}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={markt ? 2 : 1.2}
                strokeLinejoin="round"
                initial={false}
                animate={{
                  opacity: zustand ? 1 : 0,
                  fill: gezeigt ? "#1B4E70" : markt ? "#12395A" : "#CBDAE6",
                }}
                transition={{ duration: markt ? 0.5 : 0.7, delay: markt ? 0.15 : 0, ease: EASE }}
                onMouseEnter={markt ? () => setAktiv(l.code) : undefined}
                onMouseLeave={markt ? () => setAktiv(null) : undefined}
              />
            );
          })}
        </g>

        {/* Verbindungen von Deutschland aus. Die Grundlinie liegt fest, der
            Lichtpunkt laeuft als kurzer Strich darauf entlang: das ist eine
            gestrichelte Linie, deren Versatz sich bewegt. Robust in jedem
            Browser, anders als Bewegung entlang eines Pfades. */}
        <g>
          {verbindungen.map((v, i) => (
            <g key={v.code}>
              <motion.path
                d={v.d}
                fill="none"
                stroke="rgba(255,153,0,0.42)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeDasharray={v.code === "US" ? "10 12" : undefined}
                initial={false}
                animate={{ pathLength: zustand ? 1 : 0, opacity: zustand ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: EASE }}
              />
              {!reduce && (
                <motion.path
                  d={v.d}
                  fill="none"
                  stroke="#FF9900"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="26 1200"
                  style={{ filter: "drop-shadow(0 0 6px rgba(255,153,0,0.9))" }}
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={zustand ? { strokeDashoffset: [0, -1226], opacity: [0, 1, 1, 0] } : {}}
                  transition={{
                    duration: 2.6,
                    delay: 1.1 + i * 0.42,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.85, 1],
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {/* Der Startmarkt pulst leise weiter, damit klar ist, wo alles beginnt. */}
        {!reduce && zustand && (
          <motion.circle
            cx={START[0]}
            cy={START[1]}
            r={12}
            fill="none"
            stroke="#FF9900"
            strokeWidth="3"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: `${START[0]}px ${START[1]}px` }}
          />
        )}
        <circle cx={START[0]} cy={START[1]} r={7} fill="#FF9900" style={{ filter: "drop-shadow(0 0 8px rgba(255,153,0,0.9))" }} />

        {/* Die Schilder */}
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

        {/* Die USA am linken Rand, ueber dem Atlantik. */}
        <motion.g
          initial={false}
          animate={{ opacity: zustand ? 1 : 0, scale: zustand ? 1 : 0.7 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.15 }}
        >
          <rect
            x={USA_PUNKT[0] - 60}
            y={USA_PUNKT[1] - 23}
            width={120}
            height={46}
            rx={23}
            fill="#0A1E2B"
            style={{ filter: "drop-shadow(0 6px 14px rgba(11,31,52,0.3))" }}
          />
          <g transform={`translate(${USA_PUNKT[0] - 36} ${USA_PUNKT[1]}) scale(1.4)`}>
            <g clipPath="url(#karte-flagge)">
              <Flagge code="US" />
            </g>
            <circle r={9} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
          </g>
          <text x={USA_PUNKT[0] - 17} y={USA_PUNKT[1] + 10} fill="#ffffff" fontSize="28" fontWeight="800">
            USA
          </text>
        </motion.g>

        {/* Pille wie im Rest der Website, hier als Bildunterschrift im Bild. */}
        <motion.g
          initial={false}
          animate={{ opacity: zustand ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <rect x={26} y={26} width={214} height={54} rx={27} fill="#ffffff" stroke="rgba(11,31,52,0.08)" strokeWidth="2" style={{ filter: "drop-shadow(0 6px 14px rgba(11,31,52,0.14))" }} />
          <circle cx={58} cy={53} r={9} fill="#FF9900" />
          <text x={78} y={63} fill="#0A1E2B" fontSize="27" fontWeight="800" style={{ letterSpacing: "0.06em" }}>
            PAN-EU
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

/**
 * Die Sektion um die Karte: links die Karte, rechts der Text.
 *
 * Vorher stand die Grafik ueber die volle Breite unter einer zentrierten
 * Ueberschrift, dadurch wurde die Sektion sehr hoch fuer eine kurze Aussage.
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
            <p className="mt-6 max-w-[42ch] text-small text-ink-faint">
              Pan-EU: Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen und
              Schweden. Dazu Großbritannien und die USA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
