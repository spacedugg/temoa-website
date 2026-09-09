/* ============================================================
   Flaggen der Amazon-Marktplaetze.

   Gezeichnet, nicht als Emoji: 🇩🇪 wird unter Windows nicht als Fahne
   gerendert, dort stehen dann die beiden Buchstaben „DE" da. Ein Bild je Land
   waere ebenfalls falsch, es sind neun weitere Dateien fuer Flaechen, die aus
   drei Rechtecken bestehen.

   `FlaggeForm` sind die Formen, auf den Nullpunkt zentriert, zum Einsetzen in
   ein bestehendes SVG. `Flagge` ist die fertige kleine Fahne mit Rundung und
   Kante, wie sie in den Case Studies neben dem Laendernamen steht.
   ============================================================ */

export const LAENDER: Record<string, string> = {
  DE: "Deutschland",
  FR: "Frankreich",
  IT: "Italien",
  ES: "Spanien",
  NL: "Niederlande",
  BE: "Belgien",
  PL: "Polen",
  SE: "Schweden",
  US: "USA",
  GB: "Großbritannien",
};

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

/** Die Formen einer Fahne, zentriert auf (0,0). Keine Schrift, keine Wappen. */
export function FlaggeForm({ code, b = 26, h = 18 }: { code: string; b?: number; h?: number }) {
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
    case "GB":
      return (
        <>
          <rect x={-b / 2} y={-h / 2} width={b} height={h} fill="#012169" />
          <path
            d={`M${-b / 2} ${-h / 2} L${b / 2} ${h / 2} M${b / 2} ${-h / 2} L${-b / 2} ${h / 2}`}
            stroke="#FFFFFF"
            strokeWidth={h * 0.2}
          />
          <path
            d={`M${-b / 2} ${-h / 2} L${b / 2} ${h / 2} M${b / 2} ${-h / 2} L${-b / 2} ${h / 2}`}
            stroke="#C8102E"
            strokeWidth={h * 0.1}
          />
          <path d={`M0 ${-h / 2} V${h / 2} M${-b / 2} 0 H${b / 2}`} stroke="#FFFFFF" strokeWidth={h * 0.32} />
          <path d={`M0 ${-h / 2} V${h / 2} M${-b / 2} 0 H${b / 2}`} stroke="#C8102E" strokeWidth={h * 0.18} />
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

/**
 * Die kleine Fahne mit Rundung und feiner Kante.
 *
 * Die Kante ist noetig, weil vier der Fahnen weiss oder fast weiss beginnen
 * (NL, FR, IT, PL, US): ohne Kante haetten sie auf hellem Grund keinen Rand.
 */
export function Flagge({
  code,
  className = "h-4 w-[1.4rem]",
}: {
  code: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="-13 -9 26 18"
      className={`shrink-0 overflow-hidden rounded-[0.2rem] ${className}`}
      role="img"
      aria-label={LAENDER[code] ?? code}
    >
      <FlaggeForm code={code} />
      <rect
        x="-13"
        y="-9"
        width="26"
        height="18"
        rx="1.6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Eine Reihe von Fahnen mit Kuerzel, wie in den Case Studies. */
export function Flaggenreihe({
  codes,
  hell = false,
  className = "",
}: {
  codes: string[];
  hell?: boolean;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {codes.map((code) => (
        <li
          key={code}
          title={LAENDER[code] ?? code}
          className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] ${
            hell
              ? "bg-white/10 text-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]"
              : "bg-navy/[0.06] text-ink-soft shadow-[inset_0_0_0_1px_rgba(2,48,71,0.1)]"
          }`}
        >
          <Flagge code={code} className={`h-3.5 w-[1.2rem] ${hell ? "text-white" : "text-navy"}`} />
          {code}
        </li>
      ))}
    </ul>
  );
}
