"use client";

import { useState } from "react";

/* ============================================================
   Das Logo einer Kundenmarke.

   Eine Stelle fuer alle: das Logo steht auf der Fallseite, im Raster der
   Case Studies, im Band der Startseite, unter „Weitere Case Studies" und im
   Ergebnis-Block der Leistungsseiten. Vorher gab es zwei Fassungen mit
   demselben Fehler, und beide waren unsichtbar.

   Der Fehler: das Element stand auf `display: none`, bis `onLoad` feuerte.
   Ein Bild, das beim Aufbau der Seite schon im Zwischenspeicher liegt, ist
   fertig, bevor React seinen `onLoad` daranhaengt. Der Aufruf kam dann nie,
   und das Logo blieb verborgen. Jetzt umgekehrt: sichtbar, bis das Laden
   fehlschlaegt.

   Alle vier Kundenlogos sind dunkel bis mittelhell. Auf hellem Grund stehen
   sie deshalb frei, auf dunklem Grund brauchen sie eine weisse Flaeche
   darunter, sonst verschwinden sie im Foto.

   Die Groesse wird ueber eine Hoehe UND eine Breite begrenzt, nie nur ueber
   die Hoehe: HaA ist ein rundes Siegel mit umlaufender Schrift (1200 zu
   1200), Bachgold ein Schriftzug (400 zu 225). Bei gleicher Hoehe waere das
   Siegel ein Punkt von 24 Pixeln. Mit einem Kasten und `object-contain`
   fuellt der Schriftzug die Breite und das Siegel die Hoehe.
   ============================================================ */

export function Markenlogo({
  logo,
  name,
  className = "h-7",
  auf = "hell",
}: {
  logo?: string;
  name: string;
  /** Hoehe des Logos, als Tailwind-Klasse. */
  className?: string;
  /** Grund, auf dem es steht. Auf dunklem Grund kommt eine weisse Kachel dazu. */
  auf?: "hell" | "dunkel";
}) {
  const [fehlt, setFehlt] = useState(false);
  if (!logo || fehlt) return null;

  const bild = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logo}
      alt={name}
      className={`max-w-[8.5rem] object-contain object-left ${className}`}
      style={{ maxWidth: "100%" }}
      onError={() => setFehlt(true)}
    />
  );

  if (auf === "hell") return bild;

  return (
    /* `w-fit` und `self-start`: in einer Spalte mit `flex` zieht sich eine
       Kachel sonst ueber die ganze Breite, und im Band der Startseite lag der
       weisse Streifen quer ueber dem Foto. */
    <span className="inline-flex w-fit max-w-full items-center self-start rounded-[0.6rem] bg-white/95 px-2.5 py-1.5 shadow-[0_10px_24px_-16px_rgba(4,16,28,0.9)] ring-1 ring-black/[0.06] backdrop-blur">
      {bild}
    </span>
  );
}
