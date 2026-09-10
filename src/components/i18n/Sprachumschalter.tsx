"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { pfadWechsel, sprachKurz, sprachen, type Sprache } from "@/lib/i18n";

/* ============================================================
   Umschalter.

   Zwei Kuerzel nebeneinander, kein Aufklappmenue. Bei genau zwei Sprachen
   kostet ein Menue einen Klick mehr und verbirgt, dass es die Seite ueberhaupt
   auf Englisch gibt.

   Der Umschalter setzt das Cookie und geht dann auf dieselbe Seite in der
   anderen Sprache. Ohne das Cookie wuerde die Weiche beim naechsten Aufruf
   wieder die Browsersprache nehmen und die Wahl ueberschreiben.

   Das Cookie ist eine Einstellung, die der Besucher selbst trifft, und
   traegt keine Kennung. Es ist damit technisch notwendig im Sinne des TDDDG
   und braucht keine Einwilligung. Es steht trotzdem in der Liste in
   `lib/consent.ts`, damit die Datenschutzerklaerung es nennt.
   ============================================================ */

const COOKIE = "temoa_sprache";
/* Ein Jahr. Laenger als eine Sitzung, damit ein Besucher seine Wahl beim
   naechsten Mal nicht wiederholen muss. */
const HALTBAR = 60 * 60 * 24 * 365;

export function Sprachumschalter({
  aktuell,
  beschriftung,
  ton = "hell",
  groesse = "normal",
  className,
}: {
  aktuell: Sprache;
  /** Was ein Vorleseprogramm ansagt, aus dem Woerterbuch. */
  beschriftung: string;
  /** `hell` auf weissem Grund, `dunkel` auf Navy. */
  ton?: "hell" | "dunkel";
  /**
   * `klein` nur dort, wo mit der Maus geklickt wird: in der Leiste am
   * Rechner. Dort stand der Umschalter vorher so gross wie der Knopf daneben
   * und zog Aufmerksamkeit auf eine Nebensache. Wo der Finger klickt, im
   * Mobilmenue und in der Fusszeile, bleibt `normal`.
   */
  groesse?: "normal" | "klein";
  className?: string;
}) {
  const pathname = usePathname();
  const klein = groesse === "klein";

  return (
    <div
      className={clsx(
        "flex items-center gap-0.5 rounded-full",
        klein ? "p-[2px]" : "p-0.5",
        ton === "dunkel" ? "bg-white/[0.08]" : "bg-ink/[0.06]",
        className
      )}
      role="group"
      aria-label={beschriftung}
    >
      {sprachen.map((s) => {
        const gewaehlt = s === aktuell;
        return (
          <a
            key={s}
            href={pfadWechsel(pathname, s)}
            hrefLang={s}
            aria-current={gewaehlt ? "true" : undefined}
            onClick={() => {
              document.cookie = `${COOKIE}=${s}; path=/; max-age=${HALTBAR}; samesite=lax`;
            }}
            className={clsx(
              /* 40 Pixel hoch und 12 Pixel Schrift: die Untergrenzen aus der
                 Mobilrunde. Ein Umschalter von 32 Pixeln ist auf dem Telefon
                 nicht sicher zu treffen. Die kleine Fassung unterschreitet das
                 bewusst, sie steht nur am Rechner. */
              "grid place-items-center rounded-full font-bold uppercase tracking-[0.08em] transition-colors",
              klein
                ? "h-[1.55rem] min-w-[1.8rem] px-1.5 text-[0.625rem]"
                : "h-10 min-w-[2.5rem] px-2.5 text-[0.75rem]",
              gewaehlt
                ? ton === "dunkel"
                  ? "bg-white text-ink"
                  : "bg-white text-ink shadow-[0_1px_2px_rgba(13,36,57,0.12)]"
                : ton === "dunkel"
                  ? "text-chalk-muted hover:text-white"
                  : "text-ink-muted hover:text-ink"
            )}
          >
            {sprachKurz[s]}
          </a>
        );
      })}
    </div>
  );
}
