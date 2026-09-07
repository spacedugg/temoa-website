"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/cases";
import { Reveal } from "../ui/Reveal";

/* ============================================================
   Das ausgelieferte Listing auf der Fallseite.

   Es steht direkt unter dem Kennzahlenband und damit vor der Geschichte:
   ein Besucher soll die Arbeit sehen, bevor er darueber liest. Vorher lag die
   Bildstrecke am Fuss der Seite, hinter Kennzahlen, Geschichte und Badges.

   Aufbau wie auf der Produktseite: grosses Hauptbild, die weiteren Bilder als
   Streifen daneben. Ein gleichmaessiges Raster liess alle Bilder gleich
   wichtig aussehen, und ein Hauptbild ist nicht dasselbe wie ein Bild aus der
   Strecke.

   Kein Bild zweimal: bei Bachgold lagen neun Dateien vor, zwei davon dieselbe
   Aufnahme in zwei Farben. Die Doppelung ist in `lib/cases.ts` aussortiert,
   nicht hier: eine Komponente soll nicht raten muessen, was doppelt ist.
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

function Marke({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink-soft shadow-[0_8px_20px_-14px_rgba(4,20,34,0.5)] ring-1 ring-navy/[0.08]">
      {children}
    </span>
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

export function CaseListingView({ c }: { c: CaseStudy }) {
  const [offen, setOffen] = useState<string | null>(null);
  const listing = c.listing;
  if (!listing) return null;

  return (
    <div className="mx-auto mt-5 max-w-5xl">
      <div className="grid items-start gap-7 lg:grid-cols-[1.45fr_1fr]">
        {/* Die erste Groesse: Hauptbild gross, die Strecke als Streifen daneben. */}
        <Reveal>
          <div>
            <Marke>{listing.titel}</Marke>
            <div className="mt-3 flex items-stretch gap-2.5">
              {/* 15 Prozent, nicht 17: bei 17 war der Streifen aus fuenf
                  Quadraten hoeher als das quadratische Hauptbild und stand
                  darunter hinaus. Mit 15 bleibt er knapp darunter, `stretch`
                  und `justify-between` verteilen die Luft auf beide Enden. */}
              <div className="flex w-[15%] shrink-0 flex-col justify-between gap-2">
                {listing.strecke.map((src) => (
                  <Kachel key={src} src={src} onClick={() => setOffen(src)} className="aspect-square" />
                ))}
              </div>
              <Kachel
                src={listing.haupt}
                onClick={() => setOffen(listing.haupt)}
                className="aspect-square flex-1"
              />
            </div>
          </div>
        </Reveal>

        {/* Die zweite Groesse. Kleiner, weil sie dasselbe Produkt zeigt: sie
            belegt, dass beide Groessen eigenen Content haben. */}
        {listing.zweiter && (
          <Reveal delay={0.08}>
            <div>
              <Marke>{listing.zweiter.titel}</Marke>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <Kachel
                  src={listing.zweiter.haupt}
                  onClick={() => setOffen(listing.zweiter!.haupt)}
                  className="aspect-square"
                />
                {listing.zweiter.strecke.map((src) => (
                  <Kachel key={src} src={src} onClick={() => setOffen(src)} className="aspect-square" />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {offen && <Lupe src={offen} onClose={() => setOffen(null)} />}
    </div>
  );
}
