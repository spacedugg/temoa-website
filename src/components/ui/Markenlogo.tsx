"use client";

import { useState } from "react";

/* ============================================================
   Das Logo einer Kundenmarke.

   Eine Stelle fuer alle: Kopf der Fallseite, Raster der Case Studies, Band der
   Startseite, „Weitere Case Studies" und der Ergebnis-Block der
   Leistungsseiten.

   Das Logo liegt direkt auf der Kachel, nicht auf einer weissen Flaeche. Die
   weisse Kachel darunter war die Vorfassung und sah nach Aufkleber aus: ein
   heller Kasten auf einem Foto, der mit dem Bild nichts zu tun hat. Statt
   Farbe traegt das Logo jetzt eine Silhouette, und die Richtung entscheidet
   der Grund:

   - auf dunklem Grund weiss, mit einem weichen Schatten dahinter, damit es
     auch ueber einer hellen Stelle des Fotos steht
   - auf hellem Grund schwarz

   Gerechnet wird das mit `filter`, nicht mit einer zweiten Datei je Marke:
   `brightness(0)` macht jedes deckende Pixel schwarz, `invert(1)` daraus
   weiss. Die Deckkraft der Datei bleibt erhalten, deshalb muessen die Logos
   freigestellt vorliegen. Miganeo kam als weisser Schriftzug auf blauer
   Flaeche; `scripts/marke-freistellen.mjs` macht daraus die freigestellte
   Fassung.

   Die Groesse ist ein Kasten aus Hoehe UND Breite, nie eine Hoehe allein: HaA
   ist ein rundes Siegel (1 zu 1), Miganeo ein langer Schriftzug (4 zu 1). Bei
   gleicher Hoehe waere das Siegel ein Punkt neben einem Plakat. Mit einem
   Kasten und `object-contain` fuellt der Schriftzug die Breite und das Siegel
   die Hoehe. Die Hoehe wird deshalb ueberall reichlich gesetzt und die Breite
   begrenzt den langen Schriftzug, nicht umgekehrt: sonst ist das Siegel nur
   so hoch wie ein Schriftzug breit sein darf, und das sind bei HaA 44 Pixel,
   in denen die umlaufende Schrift ein Fleck ist.
   ============================================================ */

export function Markenlogo({
  logo,
  name,
  className = "h-10 w-32",
  auf = "hell",
}: {
  logo?: string;
  name: string;
  /** Der Kasten, in dem das Logo steht: Hoehe und Breite als Tailwind-Klassen. */
  className?: string;
  auf?: "hell" | "dunkel";
}) {
  const [fehlt, setFehlt] = useState(false);
  if (!logo || fehlt) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logo}
      alt={name}
      className={`max-w-full self-start object-contain object-left ${className}`}
      style={{
        filter:
          auf === "dunkel"
            ? "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(2,16,28,0.55))"
            : "brightness(0)",
      }}
      /* Sichtbar, bis das Laden fehlschlaegt, und nicht umgekehrt: ein Bild,
         das beim Aufbau der Seite schon im Zwischenspeicher liegt, ist fertig,
         bevor React seinen `onLoad` daranhaengt. Der Aufruf kommt dann nie. */
      onError={() => setFehlt(true)}
    />
  );
}
