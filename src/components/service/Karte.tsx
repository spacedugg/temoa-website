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

/* Wo die Grafik ausläuft. Senkrecht großzügig, waagerecht nur am rechten Rand
   zum Text hin: links liegt die Kante ohnehin außerhalb des Bildschirms. */
const FADE_Y = "linear-gradient(to bottom, transparent 0%, #000 11%, #000 88%, transparent 100%)";
const FADE_X = "linear-gradient(to right, #000 0%, #000 86%, transparent 100%)";

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
 * Ein Schild mit Flagge und Name, dazu eine feine Linie auf den Punkt im Land.
 * Auf der Kugel selbst ist Europa zu klein fuer neun Beschriftungen, sie
 * wuerden sich ueberlagern.
 *
 * `kante` ist die Stelle, an der die Leitlinie das Schild verlaesst.
 * `richtung` sagt, auf welcher Seite davon das Schild steht: „links" heisst,
 * das Schild liegt links der Kante und die Linie laeuft nach rechts.
 */
type Ziel = { code: string; name: string; y: number; richtung: "links" | "rechts" };

/* Die neun europaeischen Schilder stehen als Spalte ueber dem Atlantik, links
   von Europa. Neben Europa ist kein Platz mehr: die Kugel fuellt den Rahmen,
   und Europa liegt am rechten Rand. Die Reihenfolge folgt der Lage der Punkte
   von Nord nach Sued, sonst kreuzen sich die Leitlinien. Die USA tragen ihr
   Schild direkt neben dem Punkt. */
const KANTE_EU = 880;
const KANTE_US = 205;

const ZIELE: Ziel[] = [
  { code: "SE", name: "Schweden", y: 160, richtung: "links" },
  { code: "PL", name: "Polen", y: 240, richtung: "links" },
  { code: "DE", name: "Deutschland", y: 320, richtung: "links" },
  { code: "NL", name: "Niederlande", y: 400, richtung: "links" },
  { code: "UK", name: "Großbritannien", y: 480, richtung: "links" },
  { code: "BE", name: "Belgien", y: 560, richtung: "links" },
  { code: "FR", name: "Frankreich", y: 640, richtung: "links" },
  { code: "IT", name: "Italien", y: 720, richtung: "links" },
  { code: "ES", name: "Spanien", y: 800, richtung: "links" },
  { code: "US", name: "USA", y: 390, richtung: "rechts" },
];

const SCHILD_H = 60;

/** Breite eines Schildes: Flaggenscheibe, Text, Innenabstaende. */
function breite(name: string) {
  return 92 + name.length * 17;
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
  const hebung = Math.min(0.3, 0.14 + laenge / 3200);
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
  const nachRechts = ziel.richtung === "links";
  const kante = nachRechts ? KANTE_EU : KANTE_US;
  /* Die Kante bleibt fest, das Schild waechst nach hinten weg: so steht die
     Spalte buendig, egal wie lang der Name ist. */
  const x = nachRechts ? kante - w : kante;
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
        d={`M${kante},${ziel.y} C${nachRechts ? kante + 120 : kante - 120},${ziel.y} ${(kante + px) / 2},${py} ${px},${py}`}
        fill="none"
        /* Hell, nicht dunkel: die Linie läuft über die dunkle Kugel. */
        stroke={gezeigt ? "rgba(255,153,0,0.95)" : "rgba(214,236,250,0.32)"}
        strokeWidth={gezeigt ? 2.6 : 1.8}
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
        <g transform={`translate(${x + 34} ${ziel.y}) scale(1.6)`}>
          <g clipPath="url(#karte-flagge)">
            <Flagge code={ziel.code} />
          </g>
          <circle r={9} fill="none" stroke="rgba(11,31,52,0.2)" strokeWidth="1.2" />
        </g>
        <text
          x={x + 60}
          y={ziel.y + 10}
          fill="#0A1E2B"
          fontSize="30"
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
      {/* Der weiche Auslauf. Ohne ihn steht die dunkle Kugel als Kasten auf der
          hellen Fläche, mit ihm läuft sie oben, unten und zum Text hin aus der
          Sektion heraus und sitzt in der Seite statt darauf.

          Zwei verschachtelte Hüllen, weil ein Element nur eine Maske trägt:
          außen senkrecht, innen waagerecht. `mask-composite` würde beides in
          einem Element schaffen, kann aber nicht jeder Browser. */}
      <div
        /* Auf dem Telefon reicht die Grafik über den Innenabstand der Seite
           hinaus bis an beide Ränder, die Flaggenliste darunter nicht. */
        className="relative -mx-6 md:-mx-8 lg:mx-0"
        style={{
          maskImage: FADE_Y,
          WebkitMaskImage: FADE_Y,
        }}
      >
      <div style={{ maskImage: FADE_X, WebkitMaskImage: FADE_X }}>
      <svg
        viewBox="0 0 1520 960"
        className="relative w-full"
        role="img"
        aria-label="Eine Weltkugel mit Blick auf den Nordatlantik. Markiert sind die Amazon-Marktplätze Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen, Schweden, Großbritannien und die USA."
      >
        <defs>
          <clipPath id="karte-flagge">
            <circle r={9} />
          </clipPath>
          {/* Das Licht auf der Kugel. Der Kern liegt über dem Atlantik, links
              oberhalb von Europa, nicht in der Ecke des Rahmens: die Kugel ist
              viel größer als der Ausschnitt, ein Kern in Bruchteilen ihrer
              Fläche säße sonst irgendwo im Nichts. Angaben in Nutzerkoordinaten
              (`gradientUnits`), damit sie sich auf den Rahmen beziehen. */}
          <radialGradient
            id="kugel-flaeche"
            gradientUnits="userSpaceOnUse"
            cx={640}
            cy={210}
            r={880}
          >
            <stop offset="0%" stopColor="#235E8C" />
            <stop offset="45%" stopColor="#123B5C" />
            <stop offset="100%" stopColor="#071726" />
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
          {/* Der Grund. Die Kugel ist größer als der Rahmen, in den Ecken
              reicht sie trotzdem nicht ganz heran. Ein Rechteck im äußersten
              Ton des Verlaufs schließt sie, sonst stünde dort ein Stück heller
              Seite und man sähe den Rand einer Kugel, die keinen haben darf. */}
          <rect width={1520} height={960} fill="#071726" />
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

            {/* Schatten zur unteren rechten Ecke: das gibt der Fläche Tiefe.
                Eine Lichtkante am Rand der Kugel gibt es nicht mehr, der Rand
                liegt außerhalb des Ausschnitts. */}
            <ellipse
              cx={KUGEL.cx + KUGEL.r * 0.5}
              cy={KUGEL.cy + KUGEL.r * 0.55}
              rx={KUGEL.r * 0.95}
              ry={KUGEL.r * 0.9}
              fill="rgba(4,14,24,0.42)"
              style={{ filter: "blur(60px)" }}
            />
          </g>
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

        {/* Auf dem Telefon wäre die Schrift in den Schildern fünf Pixel groß.
            Dort steht die Kugel allein, die Namen kommen darunter als Liste. */}
        <g className="hidden md:inline">
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
        </g>

        {/* Auf dem Telefon nur die Punkte auf den Ländern. */}
        <g className="md:hidden">
          {ZIELE.map((z) => {
            const [px, py] = NADELN[z.code];
            return (
              <g key={z.code}>
                <circle cx={px} cy={py} r={16} fill="rgba(255,153,0,0.25)" />
                <circle
                  cx={px}
                  cy={py}
                  r={8}
                  fill="#FF9900"
                  style={{ filter: "drop-shadow(0 0 8px rgba(255,153,0,0.95))" }}
                />
              </g>
            );
          })}
        </g>
      </svg>
      </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2 md:hidden">
        {ZIELE.map((z) => (
          <li
            key={z.code}
            className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_16px_-10px_rgba(11,31,52,0.5)] ring-1 ring-navy/[0.08]"
          >
            <svg width="18" height="18" viewBox="-9 -9 18 18" aria-hidden className="shrink-0 rounded-full">
              <g clipPath="url(#karte-flagge)">
                <Flagge code={z.code} />
              </g>
            </svg>
            <span className="text-[0.8rem] font-bold text-ink">{z.name}</span>
          </li>
        ))}
      </ul>
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
    /* `overflow-hidden`, weil die Grafik links aus dem Container und oben und
       unten aus der Sektion läuft. Genau das soll sie: ein Ausschnitt, der
       weitergeht, keine Scheibe, die mittig auf der Fläche liegt. */
    <section className="ground-tint relative isolate overflow-hidden py-16 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4">
          {/* Der negative Rand links ist genau der Rand des Containers: die
              Grafik reicht bis an den Bildschirmrand, und trotzdem wird nichts
              von ihr abgeschnitten. `max()` fängt schmale Fenster ab, dort ist
              es nur der Innenabstand. */}
          <div className="min-w-0 lg:-my-16 lg:-ml-[calc(max(2rem,(100vw-80rem)/2+2rem))]">
            <EuropaKarte />
          </div>
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
