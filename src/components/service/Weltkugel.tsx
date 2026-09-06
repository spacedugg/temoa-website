"use client";

import { Pille } from "../ui/SectionHeading";
import { KUGEL, LAENDER, NADELN } from "./welt-geo";

/* ============================================================
   Die Marktplatzgrafik: eine helle Weltkugel mit Blick auf den Atlantik.

   Acht Fassungen liegen dahinter, und der Fehler war jedes Mal derselbe: die
   Kugel war dunkel und damit eine andere Bildfamilie als die uebrigen
   Illustrationen der Website. Der Kunde hat eine Referenz geschickt, und die
   ist hell: eine matte, helle Kugel auf hellem Grund, das Land als Silhouette
   mit feiner Struktur, kleine weisse Schilder mit Flagge und Laenderkuerzel
   direkt am Punkt, dazu leuchtende Bogen vom Startmarkt zu den anderen.

   - Kein dunkler Grund, keine Platte, kein Rahmen, keine Maske.
   - Keine Bewegung. Der Kunde will hier keine Animation.
   - Der ganze sichtbare Halbrund: links Nordamerika, rechts Europa und
     Afrika. Dadurch stimmt das Verhaeltnis von Land zu Kugel, und der Bogen
     ueber den Atlantik ergibt Sinn.
   - Die Schilder tragen das Kuerzel, nicht den Namen: neun Namen um ein
     kleines Europa herum sind eine Wand aus Schrift. Der ganze Name steht im
     Titel des Schildes fuer Screenreader.
   ============================================================ */

const MITTE: [number, number] = [KUGEL.cx, KUGEL.cy];
const R = KUGEL.r;

/* Schild und Punkt. `ab` ist die Verschiebung des Schildes gegenueber seinem
   Punkt: Europa ist auf einer ganzen Kugel klein, die Schilder liegen deshalb
   im Kranz darum und zeigen mit einem kurzen Stiel auf ihr Land. */
type Markt = { code: string; name: string; ab: [number, number] };

const MAERKTE: Markt[] = [
  { code: "SE", name: "Schweden", ab: [-91, -54] },
  { code: "NL", name: "Niederlande", ab: [-136, -62] },
  { code: "PL", name: "Polen", ab: [110, -50] },
  { code: "UK", name: "Großbritannien", ab: [-169, -20] },
  { code: "DE", name: "Deutschland", ab: [144, -7] },
  { code: "BE", name: "Belgien", ab: [-183, 44] },
  { code: "IT", name: "Italien", ab: [105, 23] },
  { code: "FR", name: "Frankreich", ab: [-154, 82] },
  { code: "ES", name: "Spanien", ab: [41, 70] },
  { code: "US", name: "USA", ab: [0, -66] },
];

const SCHILD_H = 40;
const SCHILD_B = 96;

function stelle(m: Markt): [number, number] {
  const [x, y] = NADELN[m.code];
  return [x + m.ab[0], y + m.ab[1]];
}

/* ---------------- Flaggen ---------------- */

function Waagerecht({ farben, b, h }: { farben: string[]; b: number; h: number }) {
  const s = h / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-b / 2} y={-h / 2 + i * s} width={b} height={s} fill={f} />
      ))}
    </>
  );
}

function Senkrecht({ farben, b, h }: { farben: string[]; b: number; h: number }) {
  const s = b / farben.length;
  return (
    <>
      {farben.map((f, i) => (
        <rect key={i} x={-b / 2 + i * s} y={-h / 2} width={s} height={h} fill={f} />
      ))}
    </>
  );
}

function Flagge({ code, b = 26, h = 18 }: { code: string; b?: number; h?: number }) {
  switch (code) {
    case "DE":
      return <Waagerecht farben={["#000000", "#DD0000", "#FFCE00"]} b={b} h={h} />;
    case "FR":
      return <Senkrecht farben={["#002395", "#FFFFFF", "#ED2939"]} b={b} h={h} />;
    case "IT":
      return <Senkrecht farben={["#008C45", "#F4F5F0", "#CD212A"]} b={b} h={h} />;
    case "NL":
      return <Waagerecht farben={["#AE1C28", "#FFFFFF", "#21468B"]} b={b} h={h} />;
    case "BE":
      return <Senkrecht farben={["#000000", "#FAE042", "#ED2939"]} b={b} h={h} />;
    case "PL":
      return <Waagerecht farben={["#FFFFFF", "#DC143C"]} b={b} h={h} />;
    case "ES":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#AA151B" />
          <rect x={-b / 2} y={-h / 4} width={b} height={h / 2} fill="#F1BF00" />
        </>
      );
    case "SE":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#005293" />
          <rect x={-b / 2 + b * 0.28} y={-h / 2} width={b * 0.16} height={h} fill="#FECB00" />
          <rect x={-b / 2} y={-h * 0.09} width={b} height={h * 0.18} fill="#FECB00" />
        </>
      );
    case "UK":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#012169" />
          <path d={`M${-b / 2} ${-h / 2}L${b / 2} ${h / 2}M${b / 2} ${-h / 2}L${-b / 2} ${h / 2}`} stroke="#FFFFFF" strokeWidth={h * 0.24} />
          <path d={`M${-b / 2} ${-h / 2}L${b / 2} ${h / 2}M${b / 2} ${-h / 2}L${-b / 2} ${h / 2}`} stroke="#C8102E" strokeWidth={h * 0.11} />
          <path d={`M0 ${-h / 2}V${h / 2}M${-b / 2} 0H${b / 2}`} stroke="#FFFFFF" strokeWidth={h * 0.36} />
          <path d={`M0 ${-h / 2}V${h / 2}M${-b / 2} 0H${b / 2}`} stroke="#C8102E" strokeWidth={h * 0.2} />
        </>
      );
    case "US":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} x={-b / 2} y={-h / 2 + i * (h / 13)} width={b} height={h / 13} fill="#B31942" />
          ))}
          <rect x={-b / 2} y={-h / 2} width={b * 0.42} height={h * 0.54} fill="#0A3161" />
        </>
      );
    default:
      return <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#123A55" />;
  }
}

/* ---------------- Bogen ---------------- */

/** Ein Bogen von Punkt zu Punkt. Die Woelbung waechst mit der Entfernung. */
function bogen(von: [number, number], nach: [number, number], staerke: number) {
  const [x1, y1] = von;
  const [x2, y2] = nach;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = -dy * staerke;
  const ny = dx * staerke;
  const richtung = ny > 0 ? -1 : 1;
  return `M${x1},${y1} Q${mx + nx * richtung},${my + ny * richtung} ${x2},${y2}`;
}

const START = NADELN.DE;

export function Weltkugel() {
  return (
    <svg
      viewBox="0 0 1000 1030"
      className="w-full"
      role="img"
      aria-label="Eine Weltkugel mit Blick auf den Atlantik. Auf Europa sind die Amazon-Marktplätze Deutschland, Frankreich, Italien, Spanien, Niederlande, Belgien, Polen, Schweden und Großbritannien markiert, links auf Nordamerika die USA. Von Deutschland laufen Verbindungen in alle anderen Märkte."
    >
      <defs>
        <clipPath id="wk-kugel">
          <circle cx={MITTE[0]} cy={MITTE[1]} r={R} />
        </clipPath>
        {/* Matte, helle Kugel: Licht von oben links, die Tiefe sitzt unten
            rechts. Kein Glanzpunkt, das waere Glas. */}
        <radialGradient id="wk-flaeche" cx="32%" cy="24%" r="86%">
          <stop offset="0%" stopColor="#FBFDFF" />
          <stop offset="42%" stopColor="#D8E4F1" />
          <stop offset="100%" stopColor="#86A0BE" />
        </radialGradient>
        <radialGradient id="wk-tiefe" cx="50%" cy="50%" r="50%">
          <stop offset="62%" stopColor="rgba(60,90,125,0)" />
          <stop offset="100%" stopColor="rgba(60,90,125,0.35)" />
        </radialGradient>
        {/* Feines Punktraster auf dem Land: das gibt der Flaeche Material,
            ohne dass eine zweite Farbe dazukommt. */}
        <pattern id="wk-raster" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.35" fill="#A9BFD6" />
        </pattern>
        <filter id="wk-schein" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="weich" />
          <feMerge>
            <feMergeNode in="weich" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Schatten unter der Kugel. */}
      <ellipse
        cx={MITTE[0]}
        cy={MITTE[1] + R + 36}
        rx={R * 0.66}
        ry={R * 0.075}
        fill="rgba(60,90,125,0.22)"
        style={{ filter: "blur(18px)" }}
      />

      <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#wk-flaeche)" />

      <g clipPath="url(#wk-kugel)">
        {LAENDER.map((l) => (
          <g key={l.name}>
            <path d={l.d} fill="#F1F6FB" />
            <path d={l.d} fill="url(#wk-raster)" opacity="0.75" />
            <path d={l.d} fill="none" stroke="rgba(94,124,158,0.35)" strokeWidth="0.9" strokeLinejoin="round" />
          </g>
        ))}
        <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#wk-tiefe)" />

        {/* Die Verbindungen vom Startmarkt. Sie liegen auf der Kugel, deshalb
            werden sie mit ihr beschnitten. */}
        {MAERKTE.filter((m) => m.code !== "DE").map((m) => (
          <path
            key={m.code}
            d={bogen(START, NADELN[m.code], m.code === "US" ? 0.16 : 0.24)}
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth={m.code === "US" ? 3 : 1.8}
            strokeLinecap="round"
            style={{
              filter:
                m.code === "US"
                  ? "drop-shadow(0 0 7px rgba(255,153,0,0.95))"
                  : "drop-shadow(0 0 4px rgba(255,153,0,0.75))",
            }}
          />
        ))}
      </g>

      {/* Die Lichtkante der Kugel. */}
      <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
      <circle cx={MITTE[0]} cy={MITTE[1]} r={R + 1} fill="none" stroke="rgba(94,124,158,0.28)" strokeWidth="1.5" />

      {/* Punkte und Schilder. Der Punkt steht immer, das Schild nur ab
          Tablet: auf dem Telefon waere die Schrift darin acht Pixel gross.
          Dort stehen die Namen unter der Kugel. */}
      {MAERKTE.map((m) => {
        const [px, py] = NADELN[m.code];
        const [sx, sy] = stelle(m);
        const links = m.ab[0] < 0;
        return (
          <g key={m.code}>
            <title>{m.name}</title>
            <g className="hidden md:inline">
              {/* Stiel vom Schild auf den Punkt. */}
              <line
                x1={sx + (links ? SCHILD_B / 2 - 6 : -SCHILD_B / 2 + 6)}
                y1={sy}
                x2={px}
                y2={py}
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px rgba(255,153,0,0.85))" }}
              />
            </g>
            {/* Der Punkt auf dem Land. */}
            <g style={{ filter: "url(#wk-schein)" }}>
              <circle cx={px} cy={py} r={11} fill="rgba(255,153,0,0.32)" />
              <circle cx={px} cy={py} r={6} fill="#FF9900" />
              <circle cx={px} cy={py} r={2.4} fill="#FFF6E8" />
            </g>
            {/* Das Schild. */}
            <g className="hidden md:inline">
              <rect
                x={sx - SCHILD_B / 2}
                y={sy - SCHILD_H / 2}
                width={SCHILD_B}
                height={SCHILD_H}
                rx={12}
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 6px 12px rgba(60,90,125,0.28))" }}
              />
              <g transform={`translate(${sx - SCHILD_B / 2 + 26} ${sy})`}>
                <Flagge code={m.code} />
                <rect x={-13} y={-9} width={26} height={18} rx={3} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1.2" />
              </g>
              <text
                x={sx - SCHILD_B / 2 + 48}
                y={sy + 8}
                fill="#0A1E2B"
                fontSize="23"
                fontWeight="700"
                style={{ letterSpacing: "0.01em" }}
              >
                {m.code}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
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
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div className="mx-auto w-full min-w-0 max-w-[42rem]">
            <Weltkugel />
            {/* Auf dem Telefon tragen die Namen die Grafik, nicht die
                Schilder: darin waere die Schrift acht Pixel gross. */}
            <ul className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
              {MAERKTE.map((m) => (
                <li
                  key={m.code}
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_6px_16px_-10px_rgba(60,90,125,0.6)] ring-1 ring-navy/[0.08]"
                >
                  <svg width="20" height="14" viewBox="-13 -9 26 18" aria-hidden className="shrink-0 rounded-[2px]">
                    <Flagge code={m.code} />
                  </svg>
                  <span className="text-[0.8rem] font-bold text-ink">{m.name}</span>
                </li>
              ))}
            </ul>
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
