"use client";

/* Drei Entwuerfe fuer die Marktplatzgrafik. Nur zur Ansicht, nicht Teil der
   Website. Alles ohne Bewegung, die Kugel deutlich weiter herausgezoomt:
   der Radius ist gut das Doppelte des sichtbaren Kreises statt des Vierfachen,
   dadurch stimmt das Verhaeltnis von Land zu Kugel. */

import { GITTER, KUGEL, LAENDER, NADELN } from "./europa-geo-weit";

const MAERKTE: { code: string; name: string; ab?: [number, number] }[] = [
  { code: "DE", name: "Deutschland" },
  { code: "FR", name: "Frankreich", ab: [-8, 14] },
  { code: "IT", name: "Italien" },
  { code: "ES", name: "Spanien" },
  { code: "NL", name: "Niederlande", ab: [-22, -16] },
  { code: "BE", name: "Belgien", ab: [-26, 12] },
  { code: "PL", name: "Polen" },
  { code: "SE", name: "Schweden" },
  { code: "UK", name: "Großbritannien", ab: [-14, -6] },
];

const MITTE: [number, number] = [KUGEL.cx, KUGEL.cy];
const R = KUGEL.r;

function stelle(m: { code: string; ab?: [number, number] }): [number, number] {
  const [x, y] = NADELN[m.code];
  const [dx, dy] = m.ab ?? [0, 0];
  return [x + dx, y + dy];
}

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
        </>
      );
    default:
      return <rect x={-9} y={-9} width={18} height={18} fill="#123A55" />;
  }
}

function FlaggenScheibe({ x, y, code, r = 26 }: { x: number; y: number; code: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFFFFF" style={{ filter: "drop-shadow(0 6px 10px rgba(3,12,22,0.5))" }} />
      <g transform={`translate(${x} ${y}) scale(${(r - 4) / 9})`}>
        <g clipPath="url(#ent-flagge)">
          <Flagge code={code} />
        </g>
        <circle r={9} fill="none" stroke="rgba(11,31,52,0.18)" strokeWidth="1" />
      </g>
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <clipPath id="ent-flagge">
        <circle r={9} />
      </clipPath>
      <clipPath id="ent-kugel">
        <circle cx={MITTE[0]} cy={MITTE[1]} r={R} />
      </clipPath>
      {/* Weich, matt, Licht von oben links: die Sprache der uebrigen Bilder. */}
      <radialGradient id="ent-matt" cx="33%" cy="27%" r="82%">
        <stop offset="0%" stopColor="#4A7FA8" />
        <stop offset="45%" stopColor="#26527A" />
        <stop offset="100%" stopColor="#122F4C" />
      </radialGradient>
      <radialGradient id="ent-glas" cx="34%" cy="26%" r="80%">
        <stop offset="0%" stopColor="#1E5480" />
        <stop offset="52%" stopColor="#0E3352" />
        <stop offset="100%" stopColor="#061726" />
      </radialGradient>
      <radialGradient id="ent-tiefe" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="rgba(3,10,20,0)" />
        <stop offset="100%" stopColor="rgba(3,10,20,0.55)" />
      </radialGradient>
      <linearGradient id="ent-podest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2C4C6E" />
        <stop offset="100%" stopColor="#16324D" />
      </linearGradient>
    </defs>
  );
}

/* ============ Entwurf 1: matte Kugel im Stil der 3D-Bilder ============ */

export function EntwurfEins() {
  return (
    <svg viewBox="0 0 1000 1160" className="w-full">
      <Defs />
      <ellipse
        cx={MITTE[0]}
        cy={MITTE[1] + R + 46}
        rx={R * 0.72}
        ry={R * 0.1}
        fill="rgba(11,31,52,0.2)"
        style={{ filter: "blur(22px)" }}
      />
      <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-matt)" />
      <g clipPath="url(#ent-kugel)">
        {LAENDER.map((l) => (
          <path
            key={l.name}
            d={l.d}
            fill={l.code ? "#DDE9F2" : "#9FBCD2"}
            stroke={l.code ? "rgba(11,31,52,0.16)" : "rgba(11,31,52,0.1)"}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        ))}
        <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-tiefe)" />
      </g>
      {/* Lichtkante oben links, wie bei einem matten Koerper. */}
      <circle
        cx={MITTE[0]}
        cy={MITTE[1]}
        r={R - 2}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
        strokeDasharray={`${R * 2.6} ${R * 6.3}`}
        strokeDashoffset={R * 1.9}
        style={{ filter: "blur(5px)" }}
      />
      {MAERKTE.map((m) => {
        const [x, y] = stelle(m);
        return <FlaggenScheibe key={m.code} x={x} y={y} code={m.code} />;
      })}

      {/* USA unter der Kugel, dahin fuehrt ein feiner Bogen. */}
      <path
        d={`M${MITTE[0] - R * 0.86},${MITTE[1] + R * 0.44} Q${MITTE[0] - R * 1.1},${MITTE[1] + R * 0.96} 200,1064`}
        fill="none"
        stroke="rgba(255,153,0,0.6)"
        strokeWidth="3"
        strokeDasharray="8 10"
        strokeLinecap="round"
      />
      <FlaggenScheibe x={168} y={1064} code="US" r={28} />
      <text x={210} y={1074} fill="#0A1E2B" fontSize="30" fontWeight="700">
        USA
      </text>
    </svg>
  );
}

/* ============ Entwurf 2: Kugel auf dem Podest, mit Ring ============ */

export function EntwurfZwei() {
  return (
    <svg viewBox="0 0 1000 1160" className="w-full">
      <Defs />
      {/* Podest wie bei den uebrigen Illustrationen. */}
      <ellipse cx={MITTE[0]} cy={MITTE[1] + R + 96} rx={R * 0.8} ry={R * 0.2} fill="url(#ent-podest)" />
      <ellipse cx={MITTE[0]} cy={MITTE[1] + R + 76} rx={R * 0.8} ry={R * 0.2} fill="#20456A" />
      <ellipse cx={MITTE[0]} cy={MITTE[1] + R + 60} rx={R * 0.62} ry={R * 0.15} fill="rgba(6,20,34,0.35)" style={{ filter: "blur(14px)" }} />

      <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-matt)" />
      <g clipPath="url(#ent-kugel)">
        {LAENDER.map((l) => (
          <path
            key={l.name}
            d={l.d}
            fill={l.code ? "#E6F0F7" : "#A7C2D6"}
            stroke="rgba(11,31,52,0.12)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        ))}
        <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-tiefe)" />
      </g>

      {/* Der orange Ring liegt hinter der Kugel oben und vor ihr unten. */}
      <path
        d={`M${MITTE[0] - R * 1.14},${MITTE[1] + R * 0.16} a${R * 1.14} ${R * 0.3} 0 0 1 ${R * 2.28} 0`}
        fill="none"
        stroke="rgba(255,153,0,0.45)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M${MITTE[0] - R * 1.14},${MITTE[1] + R * 0.16} a${R * 1.14} ${R * 0.3} 0 0 0 ${R * 2.28} 0`}
        fill="none"
        stroke="#FF9900"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {MAERKTE.map((m) => {
        const [x, y] = stelle(m);
        return (
          <g key={m.code}>
            {/* Fahnenstange: die Scheibe steht auf dem Land. */}
            <line x1={x} y1={y} x2={x} y2={y - 34} stroke="rgba(11,31,52,0.35)" strokeWidth="3" strokeLinecap="round" />
            <circle cx={x} cy={y} r={5} fill="#FF9900" />
            <FlaggenScheibe x={x} y={y - 56} code={m.code} r={24} />
          </g>
        );
      })}

      <FlaggenScheibe x={168} y={1064} code="US" r={28} />
      <text x={210} y={1074} fill="#0A1E2B" fontSize="30" fontWeight="700">
        USA
      </text>
      <path
        d={`M${MITTE[0] - R * 0.9},${MITTE[1] + R * 0.5} Q${MITTE[0] - R * 1.15},${MITTE[1] + R * 1.0} 202,1058`}
        fill="none"
        stroke="rgba(255,153,0,0.6)"
        strokeWidth="3"
        strokeDasharray="8 10"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============ Entwurf 3: dunkle Kugel, Flaggen als Reihe darunter ============ */

export function EntwurfDrei() {
  return (
    <svg viewBox="0 0 1000 1160" className="w-full">
      <Defs />
      <ellipse
        cx={MITTE[0]}
        cy={MITTE[1] + R + 40}
        rx={R * 0.7}
        ry={R * 0.09}
        fill="rgba(11,31,52,0.22)"
        style={{ filter: "blur(20px)" }}
      />
      <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-glas)" />
      <g clipPath="url(#ent-kugel)">
        {GITTER.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(190,222,240,0.12)" strokeWidth="1.2" />
        ))}
        {LAENDER.map((l) => (
          <path
            key={l.name}
            d={l.d}
            fill={l.code ? "#3D86BC" : "#1B4A6E"}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        ))}
        <circle cx={MITTE[0]} cy={MITTE[1]} r={R} fill="url(#ent-tiefe)" />
      </g>
      <circle cx={MITTE[0]} cy={MITTE[1]} r={R - 1} fill="none" stroke="rgba(214,236,250,0.35)" strokeWidth="2" />

      {/* Auf der Kugel nur Punkte, die Flaggen stehen darunter in einer Reihe. */}
      {MAERKTE.map((m) => {
        const [x, y] = NADELN[m.code];
        return (
          <g key={m.code}>
            <circle cx={x} cy={y} r={13} fill="rgba(255,153,0,0.28)" />
            <circle cx={x} cy={y} r={6.5} fill="#FF9900" />
          </g>
        );
      })}

      <g>
        {[...MAERKTE.map((m) => m.code), "US"].map((code, i) => (
          <FlaggenScheibe key={code} x={104 + i * 82} y={1076} code={code} r={26} />
        ))}
      </g>
    </svg>
  );
}
