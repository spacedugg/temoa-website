"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pille } from "../ui/SectionHeading";
import { GITTER, KUGEL, LAENDER, NADELN } from "./europa-geo";

/* ============================================================
   Die Marktplatzgrafik auf der Internationalisierungsseite.

   Sieben Fassungen liegen dahinter, und die Fehler waren immer dieselben zwei:
   entweder war die Geografie falsch (gezeichnete Umrisse, Flaggen auf den
   falschen Laendern, ein Ring ohne Karte), oder die Darstellung war ein Kasten
   auf der Seite (eine Scheibe mitten im Weissraum, zuletzt ein rechteckiger
   Ausschnitt mit weichem Auslauf, der wie ein schlecht freigestelltes Bild
   aussah).

   Diese Fassung:

   - Eine Kugel, nah an Europa herangefahren. Der Radius ist ein Vielfaches des
     sichtbaren Kreises, dadurch sind die Laender gross. Gitternetz, Lichtkante
     und Schattenseite machen daraus eine Kugel und keine Landkarte.
   - Der Kreis steht ohne Rahmen, ohne Platte und ohne Maske auf dem Grund der
     Seite, mit einem Schatten darunter. Nichts laeuft aus, nichts hat eine
     Kante.
   - Die Flagge steckt im Land, nicht in einer Pille am Bildrand. Keine
     Leitlinien mehr. Wo zwei Laender zu klein und zu nah beieinander liegen
     (Niederlande und Belgien), sitzt die Flagge daneben statt darin.
   - Die USA liegen bei diesem Zoom hinter dem Horizont. Sie stehen als eigener
     Punkt unterhalb der Kugel, ein Bogen laeuft vom westlichen Rand dorthin.
     Das ist eine Route ueber den Atlantik, keine Beschriftungslinie.

   Die Umrisse kommen aus Natural Earth, `scripts/europa-karte.mjs` rechnet die
   Projektion und schreibt `europa-geo.ts`. Jede Flagge liegt auf ihrem Land.
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

type Markt = {
  code: string;
  name: string;
  /* Verschiebung gegenüber dem Punkt im Land, in Einheiten des Bildes.
     Nur dort gesetzt, wo zwei Länder zu nah beieinander liegen, als dass zwei
     Flaggen nebeneinander passen: die Niederlande rücken in die Nordsee,
     Belgien an den Ärmelkanal. */
  ab?: [number, number];
};

const MAERKTE: Markt[] = [
  { code: "DE", name: "Deutschland" },
  { code: "FR", name: "Frankreich" },
  { code: "IT", name: "Italien" },
  { code: "ES", name: "Spanien" },
  { code: "NL", name: "Niederlande", ab: [-30, -34] },
  { code: "BE", name: "Belgien", ab: [-26, 10] },
  { code: "PL", name: "Polen" },
  { code: "SE", name: "Schweden" },
  { code: "UK", name: "Großbritannien", ab: [-16, 0] },
];

const BREITE = 1000;
const HOEHE = 1080;
/* Die Kugel sitzt oben, unter ihr bleibt Platz für den Punkt USA. */
const MITTE: [number, number] = [KUGEL.cx, KUGEL.cy - 40];
const RADIUS = KUGEL.r;
const FLAGGE_R = 34;

/** Wo eine Flagge steht: Punkt im Land plus die gesetzte Verschiebung. */
function stelle(m: Markt): [number, number] {
  const [x, y] = NADELN[m.code];
  const [dx, dy] = m.ab ?? [0, 0];
  return [x + dx, y - 40 + dy];
}

/* Der Punkt USA, unterhalb der Kugel. Er liegt bewusst außerhalb des Kreises:
   bei diesem Zoom liegt Amerika hinter dem Horizont, und eine Flagge im
   Atlantik wäre schlicht falsch. */
const USA: [number, number] = [176, 990];
/* Wo der Bogen die Kugel verlässt: am westlichen Rand, auf Höhe der Biskaya. */
const ATLANTIK: [number, number] = [MITTE[0] - RADIUS * 0.93, MITTE[1] + RADIUS * 0.36];

const START = NADELN.DE;

/**
 * Ein Bogen von Deutschland in einen anderen Markt. Die Wölbung wächst mit der
 * Entfernung, dadurch sieht die Verbindung nach Amerika aus wie ein Sprung über
 * den Atlantik und nicht wie ein Strich auf einer Fläche.
 */
function bogen(von: [number, number], nach: [number, number], staerke = 0.22) {
  const [x1, y1] = von;
  const [x2, y2] = nach;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const laenge = Math.hypot(dx, dy) || 1;
  const nx = -dy * staerke;
  const ny = dx * staerke;
  /* Immer nach oben ausweichen, sonst kreuzen sich die Bogen. */
  const richtung = ny > 0 ? -1 : 1;
  return { d: `M${x1},${y1} Q${mx + nx * richtung},${my + ny * richtung} ${x2},${y2}`, laenge };
}

/* ---------------- Die Kugel ---------------- */

export function EuropaKarte() {
  const reduce = useReducedMotion();
  const huelle = useRef<HTMLDivElement>(null);
  const imBild = useInView(huelle, { once: true, margin: "-10% 0px" });
  const [an, setAn] = useState(false);
  const [aktiv, setAktiv] = useState<string | null>(null);

  /* Sicherheitsnetz: löst der Beobachter in einem Browser nicht aus, ist die
     Kugel nach zwei Sekunden trotzdem da. Eine leere Fläche ist der schlimmste
     Fehler, den eine Animation machen kann. */
  useEffect(() => {
    if (imBild) setAn(true);
    const t = setTimeout(() => setAn(true), 2000);
    return () => clearTimeout(t);
  }, [imBild]);

  const zustand = reduce || an;
  const start: [number, number] = [START[0], START[1] - 40];

  const verbindungen = MAERKTE.filter((m) => m.code !== "DE").map((m) => ({
    code: m.code,
    ...bogen(start, stelle(m), 0.18),
  }));
  const nachUsa = bogen(start, USA, 0.16);

  return (
    /* Das leise Schweben liegt auf der ganzen Grafik, nicht auf der Kugel
       allein: sonst wandert die Kugel unter den Flaggen weg. */
    <motion.div
      className="relative"
      ref={huelle}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox={`0 0 ${BREITE} ${HOEHE}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Eine Weltkugel mit Blick auf Europa. Auf ihren Ländern stehen die Flaggen der Amazon-Marktplätze Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen, Schweden und Großbritannien, unterhalb der Kugel die der USA."
      >
        <defs>
          <clipPath id="karte-flagge">
            <circle r={9} />
          </clipPath>
          <clipPath id="kugel-clip">
            <circle cx={MITTE[0]} cy={MITTE[1]} r={RADIUS} />
          </clipPath>
          {/* Das Meer. Licht von oben links, Schatten zur unteren rechten
              Kante: das macht aus dem Kreis eine Kugel. */}
          <radialGradient id="kugel-flaeche" cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#2A6B9C" />
            <stop offset="52%" stopColor="#123B5C" />
            <stop offset="100%" stopColor="#06182A" />
          </radialGradient>
          {/* Die Schattenseite: ein Ring, der nur am Rand liegt. */}
          <radialGradient id="kugel-tiefe" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="rgba(3,10,20,0)" />
            <stop offset="100%" stopColor="rgba(3,10,20,0.62)" />
          </radialGradient>
        </defs>

        <motion.g
          initial={false}
          animate={{ opacity: zustand ? 1 : 0, scale: zustand ? 1 : 0.95 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformOrigin: `${MITTE[0]}px ${MITTE[1]}px` }}
        >
          {/* Schatten unter der Kugel, damit sie auf der Seite steht statt auf
              ihr zu kleben. */}
          <ellipse
            cx={MITTE[0]}
            cy={MITTE[1] + RADIUS * 0.99}
            rx={RADIUS * 0.78}
            ry={RADIUS * 0.1}
            fill="rgba(11,31,52,0.22)"
            style={{ filter: "blur(26px)" }}
          />

          <circle cx={MITTE[0]} cy={MITTE[1]} r={RADIUS} fill="url(#kugel-flaeche)" />

          <g clipPath="url(#kugel-clip)">
            {/* Gitternetz zuerst, die Länder darüber. */}
            {GITTER.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(190,222,240,0.13)"
                strokeWidth="1.3"
                transform="translate(0 -40)"
              />
            ))}

            <g transform="translate(0 -40)">
              {LAENDER.map((l) => {
                const markt = Boolean(l.code);
                const gezeigt = aktiv !== null && aktiv === l.code;
                return (
                  <motion.path
                    key={l.name}
                    d={l.d}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={markt ? 1.4 : 0.9}
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ fill: gezeigt ? "#5CA6D8" : markt ? "#387DB0" : "#1A4767" }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onMouseEnter={markt ? () => setAktiv(l.code) : undefined}
                    onMouseLeave={markt ? () => setAktiv(null) : undefined}
                  />
                );
              })}
            </g>

            {/* Die Bogen von Deutschland in die anderen Märkte. Sie liegen
                unter den Flaggen und bleiben leise. */}
            {verbindungen.map((v, i) => (
              <g key={v.code}>
                <path d={v.d} fill="none" stroke="rgba(255,153,0,0.3)" strokeWidth="2" strokeLinecap="round" />
                {!reduce && zustand && (
                  <motion.path
                    d={v.d}
                    fill="none"
                    stroke="#FFB65C"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeDasharray={`26 ${Math.round(v.laenge * 1.4)}`}
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: [0, -Math.round(v.laenge * 1.4 + 26)], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.6,
                      delay: 1 + i * 0.35,
                      repeat: Infinity,
                      repeatDelay: 2.6,
                      ease: "easeInOut",
                      times: [0, 0.12, 0.85, 1],
                    }}
                  />
                )}
              </g>
            ))}

            {/* Die Schattenseite ganz oben, damit sie über Land und Meer
                liegt. */}
            <circle
              cx={MITTE[0]}
              cy={MITTE[1]}
              r={RADIUS}
              fill="url(#kugel-tiefe)"
              style={{ pointerEvents: "none" }}
            />
          </g>

          {/* Die Lichtkante der Kugel. */}
          <circle
            cx={MITTE[0]}
            cy={MITTE[1]}
            r={RADIUS - 1}
            fill="none"
            stroke="rgba(214,236,250,0.4)"
            strokeWidth="2"
            style={{ pointerEvents: "none" }}
          />

          {/* Der Weg über den Atlantik zu den USA. Er verlässt die Kugel am
              westlichen Rand: Amerika liegt bei diesem Zoom hinter dem
              Horizont. */}
          <path
            d={`M${ATLANTIK[0]},${ATLANTIK[1]} Q${ATLANTIK[0] - 150},${ATLANTIK[1] + 190} ${USA[0] + FLAGGE_R + 6},${USA[1] - 10}`}
            fill="none"
            stroke="rgba(255,153,0,0.55)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="7 9"
          />
          {!reduce && zustand && (
            <motion.circle
              r={5}
              fill="#FF9900"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              style={{ offsetPath: `path("${nachUsa.d}")` } as React.CSSProperties}
            />
          )}
        </motion.g>

        {/* Die Flaggen. Sie stehen im Land, nicht am Bildrand. */}
        {MAERKTE.map((m, i) => {
          const [x, y] = stelle(m);
          const gezeigt = aktiv === m.code;
          return (
            <motion.g
              key={m.code}
              onMouseEnter={() => setAktiv(m.code)}
              onMouseLeave={() => setAktiv(null)}
              initial={false}
              animate={{ opacity: zustand ? 1 : 0, scale: zustand ? (gezeigt ? 1.12 : 1) : 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 + i * 0.07 }}
              style={{ transformOrigin: `${x}px ${y}px`, cursor: "default" }}
            >
              <title>{m.name}</title>
              <circle
                cx={x}
                cy={y}
                r={FLAGGE_R}
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 8px 14px rgba(3,12,22,0.55))" }}
              />
              <g transform={`translate(${x} ${y}) scale(${(FLAGGE_R - 5) / 9})`}>
                <g clipPath="url(#karte-flagge)">
                  <Flagge code={m.code} />
                </g>
                <circle r={9} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1" />
              </g>
              {/* Beim Zeigen steht der Name über der Flagge. */}
              <motion.text
                x={x}
                y={y - FLAGGE_R - 16}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="30"
                fontWeight="700"
                initial={false}
                animate={{ opacity: gezeigt ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ letterSpacing: "-0.01em", filter: "drop-shadow(0 2px 6px rgba(3,12,22,0.9))" }}
              >
                {m.name}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Der Punkt USA unter der Kugel. */}
        <motion.g
          initial={false}
          animate={{ opacity: zustand ? 1 : 0, scale: zustand ? 1 : 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.1 }}
          style={{ transformOrigin: `${USA[0]}px ${USA[1]}px` }}
        >
          <title>USA</title>
          <circle
            cx={USA[0]}
            cy={USA[1]}
            r={FLAGGE_R}
            fill="#FFFFFF"
            style={{ filter: "drop-shadow(0 8px 16px rgba(11,31,52,0.3))" }}
          />
          <g transform={`translate(${USA[0]} ${USA[1]}) scale(${(FLAGGE_R - 5) / 9})`}>
            <g clipPath="url(#karte-flagge)">
              <Flagge code="US" />
            </g>
            <circle r={9} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1" />
          </g>
          <text
            x={USA[0] + FLAGGE_R + 18}
            y={USA[1] + 11}
            fill="#0A1E2B"
            fontSize="32"
            fontWeight="700"
            style={{ letterSpacing: "-0.01em" }}
          >
            USA
          </text>
        </motion.g>
      </svg>
    </motion.div>
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
    <section className="ground-tint relative isolate py-16 md:py-24">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="mx-auto w-full min-w-0 max-w-[41rem]">
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
