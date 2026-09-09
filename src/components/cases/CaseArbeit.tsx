"use client";

import { useState } from "react";
import type { CaseProdukt, CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";

/* ============================================================
   Die ausgelieferte Arbeit auf der Fallseite.

   Sie steht am Schluss des Falls, hinter Kennzahlen und Geschichte. Vorher
   lag sie direkt unter dem Kennzahlenband: wer bei drei Produkten mit
   Listing, Varianten und A+ ankam, hatte ueber tausend Pixel Bilder hinter
   sich, bevor ein Wort darueber stand, was gemacht wurde.

   Ein Block je Produkt, weil jede Marke anderes Material hat: bei Bachgold ein
   Produkt mit drei Hauptbildvarianten und sechs A+ Modulen, bei Miganeo drei
   Produkte mit je eigener A+ Seite. Jeder Teil ist einzeln zu haben, und was
   fehlt, wird weggelassen.

   Ein Block hat drei Teile:

   1. Das Listing. Aufbau wie auf der Produktseite: grosses Hauptbild, die
      weiteren Bilder als Streifen daneben. Ein gleichmaessiges Raster liess
      alle Bilder gleich wichtig aussehen, und ein Hauptbild ist nicht dasselbe
      wie ein Bild aus der Strecke.
   2. Die Hauptbildvarianten. Fuer ein Produkt entstehen mehrere Hauptbilder,
      welches bleibt, entscheidet die Klickrate. Die Erklaerung dazu steht nur
      am ersten Produkt: dreimal derselbe Satz liest niemand.
   3. Der A+ Content, vollstaendig und ohne Abstand zwischen den Bahnen. Kein
      Rahmen mit begrenzter Hoehe und kein Knopf: der Kunde will den Content
      sehen.
   4. Das Listing-Video, wo eines vorliegt. Mit Standbild und `preload="none"`
      laedt die Seite davon kein Byte, bis jemand auf Abspielen drueckt: das
      Video ist die mit Abstand groesste Datei einer Fallseite.

   Kein Bild zweimal: welche Datei welche Rolle hat, steht in `lib/cases.ts`
   und in `scripts/case-arbeit-bilder.mjs`. Eine Komponente soll nicht raten
   muessen, was doppelt ist.
   ============================================================ */

const VARIANTEN_HINWEIS =
  "Für ein Produkt entstehen mehrere Hauptbilder. Welches bleibt, entscheidet die Klickrate im Suchergebnis.";

const PALETTE_HINWEIS =
  "Ein Hauptbild je Artikel, alle im selben Aufbau. So bleibt die Marke im Suchergebnis wiedererkennbar, egal welches Produkt jemand findet.";

/**
 * Ein Produktbild in einer Kachel.
 *
 * `object-contain` und nicht `cover`: die Hauptbilder liegen teils quadratisch
 * und teils in 4 zu 5 vor. Bei `cover` schneidet die quadratische Kachel einem
 * hohen Bild oben und unten je zehn Prozent ab, und dort steht bei diesen
 * Bildern das Produkt.
 */
export function Kachel({
  src,
  onClick,
  className = "",
}: {
  src: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-20px_rgba(4,20,34,0.5)] ring-1 ring-navy/[0.08] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </button>
  );
}

export function Lupe({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Schließen"
        className="fixed right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink shadow-lift"
        onClick={onClose}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/** Die Bezeichnung eines Teils: Pille mit Leuchtpunkt, wie ueberall sonst. */
function Teil({ label, titel, hinweis }: { label: string; titel: string; hinweis?: string }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-soft shadow-[0_8px_20px_-14px_rgba(4,20,34,0.5)] ring-1 ring-navy/[0.08]">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        {label}
      </span>
      <h3 className="mt-2.5 text-[1.05rem] font-bold leading-snug text-ink">{titel}</h3>
      {hinweis && <p className="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-ink-muted">{hinweis}</p>}
    </div>
  );
}

/**
 * Der A+ Content, vollstaendig und ohne Abstand zwischen den Bahnen.
 *
 * Zwei Vorfassungen hatten einen Rahmen mit begrenzter Hoehe und einen Knopf
 * darunter. Beide sind raus: der Schnitt lag mitten in einer Bahn und sah aus
 * wie ein Fehler, und ein Knopf zwischen dem Besucher und der Arbeit hat
 * keinen Zweck.
 *
 * Ohne Luft zwischen den Bahnen, wie auf der Produktseite: die Grafiken laufen
 * ineinander, mit Abstand reisst sie mitten im Bild auseinander.
 */
function APlus({ bahnen }: { bahnen: string[] }) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)] ring-1 ring-navy/[0.08]">
      <div className="overflow-hidden rounded-[0.7rem]">
        {bahnen.map((src) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt="" loading="lazy" className="block w-full" />
        ))}
      </div>
    </div>
  );
}

/**
 * Das Listing-Video.
 *
 * `preload="none"` und ein Standbild aus dem Video selbst: ohne das wuerden
 * beim Aufruf der Seite vier Megabyte geladen, die die meisten Besucher nie
 * abspielen. `playsInline` verhindert, dass iOS die Wiedergabe in den
 * Vollbildmodus reisst.
 */
function Video({ quelle, poster }: { quelle: string; poster: string }) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)] ring-1 ring-navy/[0.08]">
      <video
        className="block w-full rounded-[0.7rem] bg-navy-deep"
        controls
        preload="none"
        poster={poster}
        playsInline
      >
        <source src={quelle} type="video/mp4" />
      </video>
    </div>
  );
}

function Produkt({
  p,
  mitHinweis,
  oeffne,
}: {
  p: CaseProdukt;
  mitHinweis: boolean;
  oeffne: (src: string) => void;
}) {
  const hatVarianten = (p.varianten?.length ?? 0) > 0;

  const listing = (
    <Reveal>
      <div>
        <Teil label="Listing" titel={p.titel} />
        <div className="mt-4 flex items-start gap-3">
          {/* Der Streifen laeuft in zwei Spalten, nicht in einer.

              In einer Spalte muss die Summe der Quadrate unter der Hoehe des
              quadratischen Hauptbilds bleiben, das ergibt bei sechs Bildern
              14 Prozent Breite: die Listingbilder waren Briefmarken neben
              einem sehr grossen Hauptbild. In zwei Spalten halbiert sich die
              Zahl der Zeilen, und die Breite folgt daraus:

                Zeilen  = aufgerundet n/2
                Streifen = 2 / (2 + Zeilen)

              Bei sechs Bildern sind das 40 Prozent Streifen zu 60 Prozent
              Hauptbild, jedes Listingbild also 20 statt 14 Prozent breit.
              Beide Spalten enden auf derselben Hoehe. */}
          <div
            className="grid shrink-0 grid-cols-2 gap-3"
            style={{ width: `${(200 / (2 + Math.ceil(p.strecke.length / 2))).toFixed(2)}%` }}
          >
            {p.strecke.map((src, i) => (
              <Kachel
                key={src}
                src={src}
                onClick={() => oeffne(src)}
                /* Bei ungerader Anzahl bliebe in der letzten Zeile eine
                   Luecke rechts. Das letzte Bild laeuft deshalb ueber beide
                   Spalten und steht mittig in seiner Zeile, in derselben
                   Groesse wie die anderen. */
                className={
                  p.strecke.length % 2 === 1 && i === p.strecke.length - 1
                    ? "col-span-2 mx-auto aspect-square w-[calc(50%-0.375rem)]"
                    : "aspect-square"
                }
              />
            ))}
          </div>
          <Kachel src={p.haupt} onClick={() => oeffne(p.haupt)} className="aspect-square min-w-0 flex-1" />
        </div>
      </div>
    </Reveal>
  );

  const video = p.video && (
    <Reveal delay={0.12}>
      <div>
        <Teil label="Video" titel="Das Listing-Video" />
        <div className="mt-4">
          <Video quelle={p.video.quelle} poster={p.video.poster} />
        </div>
      </div>
    </Reveal>
  );

  const palette = p.palette && p.palette.length > 0 && (
    <Reveal delay={0.14}>
      <div className="rounded-[1.4rem] bg-white/70 p-5 shadow-[inset_0_0_0_1px_rgba(2,48,71,0.08)]">
        <Teil
          label="Produktpalette"
          titel={`${p.palette.length} weitere Artikel im selben Bildstil`}
          hinweis={PALETTE_HINWEIS}
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {p.palette.map((src) => (
            <Kachel key={src} src={src} onClick={() => oeffne(src)} className="aspect-square" />
          ))}
        </div>
      </div>
    </Reveal>
  );

  const varianten = hatVarianten && p.varianten && (
    <Reveal delay={0.1}>
      <div className="rounded-[1.4rem] bg-white/70 p-5 shadow-[inset_0_0_0_1px_rgba(2,48,71,0.08)]">
        <Teil
          label="Hauptbild"
          titel={`${p.varianten.length} Varianten des Hauptbilds`}
          hinweis={mitHinweis ? VARIANTEN_HINWEIS : undefined}
        />
        {/* Zwei Varianten in zwei Spalten, drei und mehr in drei: bei festen
            drei Spalten stand neben zwei Bildern eine leere Zelle und beide
            waren schmaler als noetig. */}
        <div className={`mt-4 grid gap-3 ${p.varianten.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {p.varianten.map((src) => (
            <Kachel key={src} src={src} onClick={() => oeffne(src)} className="aspect-square" />
          ))}
        </div>
      </div>
    </Reveal>
  );

  /* Ohne A+ Content waere die rechte Spalte leer. Dann rueckt stattdessen die
     Variantenreihe dorthin, und das Listing steht allein links. */
  if (!p.aplus) {
    return (
      <div className="grid items-start gap-7 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          {listing}
          {video}
        </div>
        <div className="space-y-6">
          {varianten}
          {palette}
        </div>
      </div>
    );
  }

  /* Links das Listing, Video und die Varianten, rechts der A+ Content in
     voller Laenge. Die Varianten stehen links, weil die A+ Spalte deutlich
     hoeher ist als das Listing: sonst bliebe darunter eine leere Flaeche. */
  return (
    <div className="grid items-start gap-7 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-6">
        {listing}
        {video}
        {varianten}
        {palette}
      </div>
      <Reveal delay={0.08}>
        <div>
          <Teil label="Premium A+ Content" titel={p.aplus.titel} />
          <div className="mt-4">
            <APlus bahnen={p.aplus.bahnen} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Der Kopf der Sektion.
 *
 * Er sagt ausdruecklich, dass die Bilder ein Ausschnitt sind. Eine Marke wie
 * Futum hat weit mehr Artikel, als hier stehen; ohne diesen Satz liest sich
 * die Reihe wie das ganze Sortiment, und dann sieht die Arbeit kleiner aus,
 * als sie ist.
 */
function Vorspann({ marke }: { marke: string }) {
  return (
    <Reveal>
      <div className="mb-8 max-w-[52ch]">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-soft shadow-[0_8px_20px_-14px_rgba(4,20,34,0.5)] ring-1 ring-navy/[0.08]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Ausgelieferte Arbeit
        </span>
        <h3 className="mt-3 text-[1.35rem] font-extrabold leading-snug tracking-tight text-ink md:text-2xl">
          Ein Einblick, nicht das ganze Sortiment.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
          Gezeigt sind einzelne Produkte aus der Arbeit für {marke}. Die Marke ist deutlich größer,
          gearbeitet wurde an entsprechend mehr Artikeln.
        </p>
      </div>
    </Reveal>
  );
}

export function CaseArbeitView({ c }: { c: CaseStudy }) {
  const [gross, setGross] = useState<string | null>(null);
  const produkte = c.arbeit?.produkte;
  if (!produkte || produkte.length === 0) return null;

  /* Der erklaerende Satz zu den Varianten steht nur am ersten Produkt, das
     welche hat. */
  const erstesMitVarianten = produkte.findIndex((p) => (p.varianten?.length ?? 0) > 0);

  return (
    /* Breiter als der uebrige Fall: in dieser Spalte stehen Listing,
       Varianten und A+ nebeneinander, und die Bilder sind der Inhalt. */
    <div className="mx-auto mt-10 max-w-6xl">
      <Vorspann marke={c.displayName} />
      {produkte.map((p, i) => (
        <div
          key={p.titel}
          /* Eine feine Linie zwischen den Produkten. Ohne sie laufen drei
             Bloecke mit demselben Aufbau ineinander, und man sieht nicht, wo
             ein Produkt endet. */
          className={i > 0 ? "mt-10 border-t border-navy/[0.09] pt-10" : ""}
        >
          <Produkt p={p} mitHinweis={i === erstesMitVarianten} oeffne={setGross} />
        </div>
      ))}

      {gross && <Lupe src={gross} onClose={() => setGross(null)} />}
    </div>
  );
}
