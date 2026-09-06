"use client";

import { Pille } from "../ui/SectionHeading";
import { KARTE_BREITE, KARTE_HOEHE, KUGEL, LAENDER, NADELN } from "./welt-geo";

/* ============================================================
   Die Marktplatzgrafik: eine helle Weltkugel mit Blick auf den Atlantik.

   Zehn Fassungen liegen dahinter. Der Fehler war lange derselbe: die Kugel war
   dunkel und damit eine andere Bildfamilie als die uebrigen Illustrationen.
   Dann kam eine Referenz vom Kunden, und die ist hell.

   Diese Fassung baut die Referenz nach:
   - Der Ozean ist ein heller Blauverlauf, das Land eine fast weisse Silhouette
     mit feinen Grenzen und einem Schlagschatten, dadurch steht es wie eine
     aufgelegte Platte auf der Kugel.
   - Die Marktplaetze sind Navy gefuellt. Wo eine Fahne steckt, sieht man auch
     ohne Fahne, dass das Land gemeint ist.
   - Die Nadeln sind Tropfen mit runder Fahne. Die Spitze sitzt auf dem Land,
     der Kopf daneben, damit sich Deutschland, die Niederlande, Belgien und
     Grossbritannien nicht gegenseitig verdecken.
   - Von Deutschland laufen leuchtende Bogen zu jedem Markt und ueber den
     Atlantik in die USA.
   - Die Kugel ist groesser als der Rahmen und unten angeschnitten. Kein
     Rahmen, keine Platte, keine Maske.
   - Keine Bewegung. Der Kunde will hier keine Animation, und die Grafik muss
     nichts vorfuehren.
   ============================================================ */

type Markt = {
  code: string;
  name: string;
  /** Verschiebung des Kopfes gegenueber dem Punkt im Land. */
  ab: [number, number];
};

/* Die Verschiebungen sind von Hand gesetzt und nachgerechnet: die Koepfe
   haben einen Durchmesser von 40 und liegen alle mindestens 68 auseinander.
   In Europa liegen die Punkte so dicht beieinander, dass ein Kopf senkrecht
   ueber seinem Punkt den Nachbarn verdecken wuerde. Sie stehen deshalb im
   Kranz um Europa herum, jeder nach aussen gerueckt, und der Tropfen zeigt
   zurueck auf sein Land. */
const MAERKTE: Markt[] = [
  { code: "US", name: "USA", ab: [0, -70] },
  { code: "UK", name: "Großbritannien", ab: [-104, -70] },
  { code: "SE", name: "Schweden", ab: [10, -85] },
  { code: "NL", name: "Niederlande", ab: [-52, -120] },
  { code: "BE", name: "Belgien", ab: [-88, 20] },
  { code: "PL", name: "Polen", ab: [78, -48] },
  { code: "DE", name: "Deutschland", ab: [58, -74] },
  { code: "FR", name: "Frankreich", ab: [-72, 44] },
  { code: "IT", name: "Italien", ab: [72, 40] },
  { code: "ES", name: "Spanien", ab: [-56, 58] },
];

const KOPF = 20; /* Radius des Nadelkopfes */
/* Die Breite des Stiels am Kopf. Der Tropfen wird aus den Tangenten an einen
   Kreis gebaut; nimmt man dafuer den Kopfradius, wird aus einem 120 Pixel
   langen Stiel ein breiter Keil. Mit einem kleineren Radius bleibt er ein
   Stiel, der sich zur Spitze verjuengt. */
const STIEL = 8;

function punkt(code: string): [number, number] {
  const [x, y] = NADELN[code];
  return [x, y];
}

function kopf(m: Markt): [number, number] {
  const [x, y] = punkt(m.code);
  return [x + m.ab[0], y + m.ab[1]];
}

/* ---------------- Flaggen ----------------
   Alle Fahnen sind auf den Nullpunkt zentriert und `b` breit, `h` hoch. Sie
   werden in einen Kreis geschnitten, links und rechts faellt also etwas weg.
   Keine Schrift, keine Wappen: bei 40 Pixeln zaehlt nur das Farbmuster. */

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
          <path
            d={`M${-b / 2} ${-h / 2}L${b / 2} ${h / 2}M${b / 2} ${-h / 2}L${-b / 2} ${h / 2}`}
            stroke="#FFFFFF"
            strokeWidth={h * 0.24}
          />
          <path
            d={`M${-b / 2} ${-h / 2}L${b / 2} ${h / 2}M${b / 2} ${-h / 2}L${-b / 2} ${h / 2}`}
            stroke="#C8102E"
            strokeWidth={h * 0.11}
          />
          <path d={`M0 ${-h / 2}V${h / 2}M${-b / 2} 0H${b / 2}`} stroke="#FFFFFF" strokeWidth={h * 0.36} />
          <path d={`M0 ${-h / 2}V${h / 2}M${-b / 2} 0H${b / 2}`} stroke="#C8102E" strokeWidth={h * 0.2} />
        </>
      );
    case "US":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#FFFFFF" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect
              key={i}
              x={-b / 2}
              y={-h / 2 + i * (h / 13)}
              width={b}
              height={h / 13}
              fill="#B31942"
            />
          ))}
          <rect x={-b / 2} y={-h / 2} width={b * 0.42} height={h * 0.54} fill="#0A3161" />
        </>
      );
    default:
      return <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#123A55" />;
  }
}

/* ---------------- Tropfen ----------------
   Die Nadel ist ein Kreis mit einer Spitze. Beide Tangenten vom Punkt an den
   Kreis bilden die Flanken, dazwischen laeuft der grosse Bogen des Kreises.
   Damit stimmt die Form auch dann, wenn der Kopf seitlich neben seinem Punkt
   sitzt, was in Europa bei jeder zweiten Nadel so ist. */
function tropfen(cx: number, cy: number, r: number, tx: number, ty: number) {
  const dx = tx - cx;
  const dy = ty - cy;
  const d = Math.hypot(dx, dy);
  if (d <= r * 1.05) return "";
  const winkel = Math.atan2(dy, dx);
  const beta = Math.acos(r / d);
  const p1 = [cx + r * Math.cos(winkel + beta), cy + r * Math.sin(winkel + beta)];
  const p2 = [cx + r * Math.cos(winkel - beta), cy + r * Math.sin(winkel - beta)];
  /* Von der Spitze zur einen Flanke, aussen um den Kreis herum, zurueck zur
     Spitze. `1 1` ist der grosse Bogen im Uhrzeigersinn. */
  return `M${tx.toFixed(1)} ${ty.toFixed(1)}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}A${r} ${r} 0 1 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z`;
}

/* ---------------- Bogen ---------------- */

/** Ein Bogen von Punkt zu Punkt. Die Woelbung waechst mit der Entfernung. */
function bogen(von: [number, number], nach: [number, number], staerke: number) {
  const [x1, y1] = von;
  const [x2, y2] = nach;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  /* Nach aussen woelben, also weg vom Mittelpunkt der Kugel. */
  const rx = mx - KUGEL.cx;
  const ry = my - KUGEL.cy;
  const laenge = Math.hypot(rx, ry) || 1;
  const weite = Math.hypot(x2 - x1, y2 - y1);
  const s = staerke * weite;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(mx + (rx / laenge) * s).toFixed(1)} ${(my + (ry / laenge) * s).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/* ---------------- Die Kugel ---------------- */

const MARKT_CODES = new Set(MAERKTE.map((m) => m.code));

export function Weltkugel() {
  const start = punkt("DE");

  return (
    <svg
      viewBox={`0 0 ${KARTE_BREITE} ${KARTE_HOEHE}`}
      className="w-full"
      role="img"
      aria-label="Eine Weltkugel mit Blick über den Atlantik. In Deutschland, Frankreich, Italien, Spanien, den Niederlanden, Belgien, Polen, Schweden, Großbritannien und den USA steckt je eine Fahne. Von Deutschland laufen leuchtende Linien zu allen anderen Märkten."
    >
      <defs>
        <radialGradient id="wk-ozean" cx="30%" cy="16%" r="92%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#e3eef8" />
          <stop offset="72%" stopColor="#c2daee" />
          <stop offset="100%" stopColor="#a3c2de" />
        </radialGradient>

        {/* Die Schattenseite. Innen nichts, zum Rand hin ein kuehler Ton: das
            macht aus der Scheibe eine Kugel. */}
        <radialGradient id="wk-woelbung" cx="34%" cy="20%" r="86%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="62%" stopColor="rgba(120,160,196,0)" />
          <stop offset="88%" stopColor="rgba(96,138,180,0.22)" />
          <stop offset="100%" stopColor="rgba(70,112,156,0.42)" />
        </radialGradient>

        <linearGradient id="wk-nadel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB43C" />
          <stop offset="100%" stopColor="#EF7C00" />
        </linearGradient>

        <clipPath id="wk-kugel">
          <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} />
        </clipPath>

        {/* Das Land liegt als Platte auf dem Wasser. */}
        <filter id="wk-relief" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3d6690" floodOpacity="0.28" />
        </filter>

        <filter id="wk-glut" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id="wk-kopfschatten" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#8a4a00" floodOpacity="0.35" />
        </filter>

        {MAERKTE.map((m) => {
          const [kx, ky] = kopf(m);
          return (
            <clipPath key={m.code} id={`wk-f-${m.code}`}>
              <circle cx={kx} cy={ky} r={KOPF - 6} />
            </clipPath>
          );
        })}
      </defs>

      {/* Der Ozean */}
      <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} fill="url(#wk-ozean)" />

      {/* Das Land */}
      <g clipPath="url(#wk-kugel)">
        <g filter="url(#wk-relief)">
          {LAENDER.map((l, i) => {
            const markt = l.code && MARKT_CODES.has(l.code);
            return (
              <path
                key={`${l.name}-${i}`}
                d={l.d}
                fill={markt ? "#2C4E79" : "#F4F8FC"}
                stroke={markt ? "#22406B" : "#D2E0EE"}
                strokeWidth={markt ? 1.2 : 1}
                strokeLinejoin="round"
              />
            );
          })}
        </g>
        <circle cx={KUGEL.cx} cy={KUGEL.cy} r={KUGEL.r} fill="url(#wk-woelbung)" />
      </g>

      {/* Die Verbindungen. Erst breit und weich als Glut, darauf die feine
          Linie: das leuchtet, ohne dass ein Filter ueber die ganze Grafik
          laufen muss. */}
      <g fill="none" strokeLinecap="round">
        <g stroke="#FF9900" strokeWidth="6" opacity="0.3" filter="url(#wk-glut)">
          {MAERKTE.filter((m) => m.code !== "DE").map((m) => (
            <path key={m.code} d={bogen(start, punkt(m.code), m.code === "US" ? 0.1 : 0.17)} />
          ))}
        </g>
        <g stroke="#FFA51F" strokeWidth="2.6">
          {MAERKTE.filter((m) => m.code !== "DE").map((m) => (
            <path key={m.code} d={bogen(start, punkt(m.code), m.code === "US" ? 0.1 : 0.17)} />
          ))}
        </g>
      </g>

      {/* Die Nadeln */}
      {MAERKTE.map((m) => {
        const [px, py] = punkt(m.code);
        const [kx, ky] = kopf(m);
        return (
          <g key={m.code}>
            <title>{m.name}</title>
            {/* Der Punkt im Land, mit Lichthof. */}
            <circle cx={px} cy={py} r="9" fill="#FF9900" opacity="0.4" filter="url(#wk-glut)" />
            <circle cx={px} cy={py} r="4.5" fill="#FFC46B" />

            <g filter="url(#wk-kopfschatten)">
              <path d={tropfen(kx, ky, STIEL, px, py)} fill="url(#wk-nadel)" />
              <circle cx={kx} cy={ky} r={KOPF} fill="url(#wk-nadel)" />
              <circle cx={kx} cy={ky} r={KOPF - 5.5} fill="#ffffff" />
            </g>
            <g clipPath={`url(#wk-f-${m.code})`}>
              <g transform={`translate(${kx} ${ky})`}>
                <Flagge code={m.code} b={KOPF * 2.5} h={KOPF * 1.66} />
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Sektion um die Kugel: links die Grafik, rechts der Text.
 *
 * Grafik oben und Text darunter machte aus einer kurzen Aussage eine sehr hohe
 * Sektion.
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
          <div className="mx-auto w-full min-w-0 max-w-[46rem]">
            <Weltkugel />
            {/* Auf dem Telefon ist die Grafik rund dreihundert Pixel breit, eine
                Fahne darin waere sieben Pixel gross. Deshalb stehen die Namen
                dort noch einmal als Liste darunter. */}
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
