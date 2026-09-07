"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";

/* ============================================================
   Die ausgelieferte Arbeit auf der Fallseite.

   Sie steht direkt unter dem Kennzahlenband und damit vor der Geschichte:
   ein Besucher soll die Arbeit sehen, bevor er darueber liest.

   Drei Teile, jeder einzeln zu haben, weil jede Marke anderes Material hat:

   1. Das Listing. Aufbau wie auf der Produktseite: grosses Hauptbild, die
      weiteren Bilder als Streifen daneben. Ein gleichmaessiges Raster liess
      alle Bilder gleich wichtig aussehen, und ein Hauptbild ist nicht dasselbe
      wie ein Bild aus der Strecke.
   2. Die Hauptbildvarianten. Fuer ein Produkt entstehen mehrere Hauptbilder,
      welches bleibt, entscheidet die Klickrate. Das ist eine Aussage ueber die
      Arbeitsweise und braucht deshalb eine eigene Reihe.
   3. Die A+ Module. Sie sind 2,44 mal so breit wie hoch; sechs davon
      untereinander sind hoeher als der ganze Rest der Sektion. Deshalb ein
      Rahmen, der genau zwei Module hoch ist, dazu ein Knopf, der ihn
      aufmacht.

   Kein Bild zweimal: welche Datei welche Rolle hat, steht in `lib/cases.ts`
   und in `scripts/case-arbeit-bilder.mjs`. Eine Komponente soll nicht raten
   muessen, was doppelt ist.
   ============================================================ */

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
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
 * Die A+ Module in einem Rahmen mit begrenzter Hoehe.
 *
 * Der Rahmen ist genau zwei Module hoch, gerechnet aus dem Seitenverhaeltnis
 * eines Moduls (`aspect-ratio`), damit der Schnitt auf einer Modulkante sitzt.
 * Vorher stand dort eine feste Hoehe in rem: der Schnitt lag mitten in einer
 * Zeile Schrift und sah aus wie ein Fehler, und der weisse Auslauf darunter
 * war auf weissen Modulen ohnehin nicht zu sehen.
 *
 * Ohne Abstand untereinander, wie auf der Produktseite: mit Luft dazwischen
 * reissen die Module mitten im Bild auseinander.
 */
function APlus({
  module: bahnen,
  verhaeltnis,
  offen,
  aufmachen,
}: {
  module: string[];
  verhaeltnis: number;
  offen: boolean;
  aufmachen: () => void;
}) {
  const sichtbar = Math.min(2, bahnen.length);
  return (
    <div>
      <div className="overflow-hidden rounded-[1.1rem] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(4,20,34,0.55)] ring-1 ring-navy/[0.08]">
        <div
          className="overflow-hidden rounded-[0.7rem]"
          style={offen ? undefined : { aspectRatio: `${verhaeltnis} / ${sichtbar}` }}
        >
          {bahnen.map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={src} src={src} alt="" loading="lazy" className="block w-full" />
          ))}
        </div>
      </div>
      {!offen && bahnen.length > sichtbar && (
        <button type="button" onClick={aufmachen} className="btn-text mt-3">
          Alle {bahnen.length} Module zeigen
        </button>
      )}
    </div>
  );
}

export function CaseArbeitView({ c }: { c: CaseStudy }) {
  const [gross, setGross] = useState<string | null>(null);
  const [aplusOffen, setAplusOffen] = useState(false);
  const arbeit = c.arbeit;
  if (!arbeit) return null;
  const { listing, varianten, aplus } = arbeit;

  return (
    <div className="mx-auto mt-6 max-w-5xl space-y-8">
      {/* Listing links, A+ Module rechts: beide zeigen dieselbe Produktseite,
          einmal oben und einmal unter den Bullets. */}
      {(listing || aplus) && (
        <div className="grid items-start gap-7 lg:grid-cols-[1.3fr_1fr]">
          {listing && (
            <Reveal>
              <div>
                <Teil label="Listing" titel={listing.titel} />
                <div className="mt-4 flex items-stretch gap-2.5">
                  {/* Der Streifen ist so breit, dass seine Quadrate zusammen
                      knapp unter der Hoehe des quadratischen Hauptbilds
                      bleiben. Bei fuenf Bildern sind das 15 Prozent, bei sechs
                      13: rechnet man das nicht, steht der Streifen unter dem
                      Hauptbild hinaus. */}
                  <div
                    className="flex shrink-0 flex-col justify-between gap-2"
                    style={{ width: `${Math.min(17, 92 / (listing.strecke.length + 1))}%` }}
                  >
                    {listing.strecke.map((src) => (
                      <Kachel key={src} src={src} onClick={() => setGross(src)} className="aspect-square" />
                    ))}
                  </div>
                  <Kachel
                    src={listing.haupt}
                    onClick={() => setGross(listing.haupt)}
                    className="aspect-square flex-1"
                  />
                </div>
              </div>
            </Reveal>
          )}

          {aplus && (
            <Reveal delay={0.08}>
              <div>
                <Teil label={aplus.titel} titel={`${aplus.module.length} Module`} hinweis={aplus.hinweis} />
                <div className="mt-4">
                  <APlus
                    module={aplus.module}
                    verhaeltnis={aplus.verhaeltnis ?? 2.44}
                    offen={aplusOffen}
                    aufmachen={() => setAplusOffen(true)}
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {/* Die Hauptbildvarianten in einer Reihe. Sie sagen etwas ueber die
          Arbeitsweise, nicht ueber das Produkt, und stehen deshalb fuer sich. */}
      {varianten && varianten.bilder.length > 0 && (
        <Reveal delay={0.1}>
          <div className="rounded-[1.4rem] bg-white/70 p-5 shadow-[inset_0_0_0_1px_rgba(2,48,71,0.08)] md:p-6">
            <Teil label="Hauptbild" titel={varianten.titel} hinweis={varianten.hinweis} />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {varianten.bilder.map((src) => (
                <Kachel key={src} src={src} onClick={() => setGross(src)} className="aspect-square" />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {gross && <Lupe src={gross} onClose={() => setGross(null)} />}
    </div>
  );
}
