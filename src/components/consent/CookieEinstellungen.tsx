"use client";

import { einstellungenOeffnen } from "./useEinwilligung";

/**
 * Der Widerruf.
 *
 * Eine Einwilligung, die man nicht so leicht zurueckziehen kann wie man sie
 * gegeben hat, ist keine (Art. 7 Abs. 3 DSGVO). Deshalb steht dieser Knopf in
 * der Fusszeile, auf jeder Seite, an derselben Stelle wie Impressum und
 * Datenschutz.
 */
export function CookieEinstellungen({
  label,
  className,
}: {
  /** Beschriftung aus dem Woerterbuch, damit der Knopf die Sprache der Seite spricht. */
  label: string;
  className?: string;
}) {
  return (
    <button type="button" onClick={einstellungenOeffnen} className={className}>
      {label}
    </button>
  );
}
