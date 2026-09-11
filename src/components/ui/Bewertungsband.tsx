"use client";

import { usePathname } from "next/navigation";
import { bewertungsprofile, type Bewertungsprofil } from "@/lib/bewertungen";
import { spracheAusPfad } from "@/lib/i18n";

/* ============================================================
   Bewertungen bei Google und Trustpilot.

   Zwei Zeilen, je Dienst eine: Sterne, Durchschnitt, Name.

   Ob die Zeile verlinkt ist, entscheidet die Stelle. In der Fusszeile ja:
   dort sucht jemand gezielt nach Belegen. Der Verweis oeffnet einen neuen
   Tab. Bei den Kundenstimmen nein: dort steht der Beleg mitten im Lesefluss,
   und ein Pfeil nach aussen ist an dieser Stelle eine Einladung, die Seite zu
   verlassen. Die Zahl allein sagt dort, was zu sagen ist.

   Die Anzahl der Bewertungen steht nicht dabei, der Durchschnitt schon. Er
   steht als Zahl neben den Sternen, weil "viereinhalb von fuenf" aus vier
   gefuellten Quadraten und einem halben niemand ablaesst. Die Sterne sind
   trotzdem anteilig gefuellt: die Zahl sagt es, das Bild zeigt es.

   Die Schreibweise haengt an der Sprache. Im Deutschen trennt das Komma die
   Dezimalen, im Englischen der Punkt; "4.5" waere auf Deutsch falsch.

   Die Zeichen sind gezeichnet, nicht die Markenlogos der beiden Dienste: fuer
   die braeuchte es deren offizielle Dateien. Liegen die im Verzeichnis
   `public/marken`, treten sie an diese Stelle.
   ============================================================ */

const FARBEN = {
  google: { voll: "#FBBC04", leer: "#D9E0E8" },
  trustpilot: { voll: "#00B67A", leer: "#DCDCE6" },
} as const;

/** Fünfzackiger Stern, auf 24 Einheiten gezeichnet. */
function Stern({ fill }: { fill: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  );
}

/** Trustpilot zeichnet seine Sterne weiß in einem gefüllten Quadrat. */
function Kasten({ fill }: { fill: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <rect width="24" height="24" fill={fill} />
      <path
        d="M12 4.5l2.3 5 5.5.6-4.1 3.6 1.1 5.4L12 16.3 7.2 19.1l1.1-5.4L4.2 10l5.5-.6L12 4.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * Fünf Sterne, anteilig gefüllt.
 *
 * Die gefüllte Reihe liegt als eigene Ebene über der leeren und wird auf den
 * Anteil beschnitten. Die innere Reihe steht dabei auf `w-max`: ohne das
 * schrumpfen die Sterne mit dem Ausschnitt, statt beschnitten zu werden.
 */
function Sterne({ dienst, wert }: { dienst: Bewertungsprofil["dienst"]; wert: number }) {
  const farbe = FARBEN[dienst];
  const anteil = Math.max(0, Math.min(5, wert)) / 5;
  const Zeichen = dienst === "trustpilot" ? Kasten : Stern;
  const reihe = (fill: string) => (
    <span className="flex w-max gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Zeichen key={i} fill={fill} />
      ))}
    </span>
  );

  return (
    <span className="relative inline-flex shrink-0">
      {reihe(farbe.leer)}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${anteil * 100}%` }}
      >
        {reihe(farbe.voll)}
      </span>
    </span>
  );
}

export function Bewertungsband({
  ton = "hell",
  titel,
  verlinkt = true,
  className,
}: {
  ton?: "hell" | "dunkel";
  /** Kleine Zeile darüber. Weglassen, wenn der Zusammenhang klar ist. */
  titel?: string;
  /** `false` zeigt nur die Bewertung, ohne Verweis und ohne Pfeil. */
  verlinkt?: boolean;
  className?: string;
}) {
  const sprache = spracheAusPfad(usePathname());
  if (bewertungsprofile.length === 0) return null;
  const dunkel = ton === "dunkel";
  const zahl = (wert: number) =>
    wert.toLocaleString(sprache === "de" ? "de-DE" : "en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  return (
    <div className={className}>
      {titel && (
        <span
          className={`block text-label font-bold uppercase ${dunkel ? "text-chalk-faint" : "text-ink-faint"}`}
        >
          {titel}
        </span>
      )}
      <ul
        className={`mt-3 divide-y ${
          dunkel ? "divide-white/[0.09]" : "divide-ink/[0.09]"
        }`}
      >
        {bewertungsprofile.map((b) => {
          const inhalt = (
            <>
              {b.wert !== null && <Sterne dienst={b.dienst} wert={b.wert} />}
              {b.wert !== null && (
                <span
                  className={`text-small font-extrabold [font-variant-numeric:tabular-nums] ${
                    dunkel ? "text-white" : "text-ink"
                  }`}
                >
                  {zahl(b.wert)}
                </span>
              )}
              <span className="truncate text-small">{b.name}</span>
            </>
          );
          const beschriftung =
            b.wert === null ? b.name : `${b.name}, ${zahl(b.wert)} von 5 Sternen`;
          const reihe = `flex min-h-[2.75rem] items-center gap-2.5 py-1.5 ${
            dunkel ? "text-chalk-muted" : "text-ink-muted"
          }`;

          return (
            <li key={b.dienst}>
              {verlinkt ? (
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={beschriftung}
                  className={`group ${reihe} transition-colors ${
                    dunkel ? "hover:text-white" : "hover:text-ink"
                  }`}
                >
                  {inhalt}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="ml-auto shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M7 17L17 7m0 0h-7m7 0v7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <span className={reihe} aria-label={beschriftung}>
                  {inhalt}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
