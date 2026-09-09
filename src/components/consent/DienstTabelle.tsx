"use client";

import { KATEGORIEN } from "@/lib/consent";
import { CookieEinstellungen } from "./CookieEinstellungen";

/**
 * Die Dienste in der Datenschutzerklaerung.
 *
 * Rendert dieselbe Liste, die das Banner anbietet (`lib/consent`). Damit
 * koennen Banner und Erklaerung nicht auseinander laufen: es gibt nur ein
 * Verzeichnis, und ein neuer Dienst erscheint automatisch an beiden Stellen.
 *
 * Keine echte Tabelle, sondern Karten mit Beschriftungen: eine Tabelle mit
 * fuenf Spalten ist auf dem Telefon nicht lesbar.
 */
export function DienstTabelle() {
  return (
    <div className="mt-4 space-y-4">
      {KATEGORIEN.map((k) => (
        <div key={k.id} className="rounded-2xl bg-canvas-tint p-5 shadow-[inset_0_0_0_1px_rgba(13,36,57,0.07)]">
          <p className="text-[1rem] font-bold text-ink">
            {k.name}
            <span className="ml-2 align-middle text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
              {k.pflicht ? "immer aktiv" : "nur mit Einwilligung"}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{k.beschreibung}</p>

          {k.dienste.map((d) => (
            <dl key={d.name} className="mt-4 grid gap-x-6 gap-y-2 border-t border-ink/[0.08] pt-4 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Dienst</dt>
              <dd className="text-sm font-bold text-ink">{d.name}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Anbieter</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.anbieter}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Zweck</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.zweck}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Speicherung</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.speicher}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">Grundlage</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.grundlage}</dd>
            </dl>
          ))}
        </div>
      ))}

      <p className="text-sm leading-relaxed text-ink-muted">
        Eure Entscheidung könnt ihr jederzeit ändern:{" "}
        <CookieEinstellungen className="font-bold text-navy underline decoration-brand-500 decoration-2 underline-offset-2" />
        . Wir speichern sie im lokalen Speicher eures Browsers, mit Zeitpunkt, als Nachweis nach
        Art. 7 Abs. 1 DSGVO. Ein Widerruf wirkt sofort, für die Zukunft.
      </p>
    </div>
  );
}
