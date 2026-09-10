"use client";

import { usePathname } from "next/navigation";
import { kategorienFuer } from "@/lib/consent";
import { spracheAusPfad } from "@/lib/i18n";
import { rahmenWoerter } from "@/lib/woerter/rahmen";
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
  const sprache = spracheAusPfad(usePathname());
  const w = rahmenWoerter[sprache].consent;
  return (
    <div className="mt-4 space-y-4">
      {kategorienFuer(sprache).map((k) => (
        <div key={k.id} className="rounded-2xl bg-canvas-tint p-5 shadow-[inset_0_0_0_1px_rgba(13,36,57,0.07)]">
          <p className="text-[1rem] font-bold text-ink">
            {k.name}
            <span className="ml-2 align-middle text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
              {k.pflicht ? w.immerAktiv : w.nurMitEinwilligung}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{k.beschreibung}</p>

          {k.dienste.map((d) => (
            <dl key={d.name} className="mt-4 grid gap-x-6 gap-y-2 border-t border-ink/[0.08] pt-4 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">{w.tabelleDienst}</dt>
              <dd className="text-sm font-bold text-ink">{d.name}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">{w.tabelleAnbieter}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.anbieter}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">{w.tabelleZweck}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.zweck}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">{w.tabelleSpeicher}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.speicher}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-faint">{w.tabelleGrundlage}</dt>
              <dd className="text-sm leading-relaxed text-ink-muted">{d.grundlage}</dd>
            </dl>
          ))}
        </div>
      ))}

      <p className="text-sm leading-relaxed text-ink-muted">
        {w.widerrufVor}{" "}
        <CookieEinstellungen
          label={rahmenWoerter[sprache].fusszeile.cookieEinstellungen}
          className="font-bold text-navy underline decoration-brand-500 decoration-2 underline-offset-2"
        />
        {w.widerrufNach}
      </p>
    </div>
  );
}
