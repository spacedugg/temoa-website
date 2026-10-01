import type { RefData, RefListing } from "./references";

/* ============================================================
   Reihenfolge der Listings auf der Seite Designbeispiele.

   Die Listings kommen aus dem Sales Room, die Reihenfolge dort ist
   `reference_listings."order"`. Was dort geloescht oder auf inaktiv gesetzt
   ist, erscheint hier nicht: die Seite liest nur aktive Listings.

   Die Regel sortiert nur um, sie blendet nichts nach Position aus. Die
   Bibliothek wird gedanklich in fuenf gleich grosse Abschnitte geteilt (bei
   Rest bekommen die vorderen Abschnitte je eins mehr) und in der Folge 1, 3,
   4, 2, 5 angezeigt. Damit rutschen Listings, die sonst erst nach mehrmaligem
   „Mehr laden" kommen, nach vorn, ohne dass jemand sie von Hand verschiebt.
   Kommen Listings dazu, teilen sich die Abschnitte von selbst neu auf.

   Die Abschnitte sind ein Rechenweg. Auf der Seite ist davon nichts zu sehen.

   `POSITION_AUSBLENDEN` und `POSITION_NACH_OBEN` wirken auf die Reihenfolge,
   die vor diesem Eingriff auf der Website stand (Spalte „live" in `?debug`).
   Das ist eine Ansage des Kunden („Nummer 36 auf temoa.de raus"). Sobald die
   Kennungen bekannt sind, gehoeren sie in `AUSBLENDEN`: Positionen
   verschieben sich, wenn im Sales Room etwas dazukommt oder wegfaellt.

   `AUSBLENDEN` ist fuer ein Listing, das auf der Website fehlen soll, im Sales
   Room aber bleibt. Es wirkt ueber die Kennung, nicht ueber eine Position.
   Die Kennungen zeigt `/design-beispiele?debug`.

   `NACH_OBEN` setzt ausgewaehlte Listings in genau dieser Folge an den Anfang.
   Ein Eintrag ist eine Kennung oder ein Teil des Titels (Gross- und
   Kleinschreibung egal). Ein Eintrag ohne Treffer wird uebersprungen. Die
   uebrigen Listings folgen in der Abschnittsfolge.

   Mit weniger Listings als Abschnitten bleibt die Reihenfolge, wie sie ist.
   ============================================================ */

export const ABSCHNITT_FOLGE = [1, 3, 4, 2, 5] as const;
/* Positionen in der Reihenfolge, wie sie vor dieser Regel auf der Website
   stand (Sales-Room-Reihenfolge in fuenf Abschnitten, Folge 1, 3, 4, 2, 5),
   ab 1. Der Kunde hat sie dort abgezaehlt. Die Zaehlung bezieht sich auf die
   Reihenfolge ohne diese Eingriffe, sonst verschoeben sich die Nummern beim
   Entfernen. `/design-beispiele?debug` zeigt sie in der Spalte „live". */
export const POSITION_AUSBLENDEN: readonly number[] = [36, 37, 38, 42, 43, 45, 50, 60];
export const POSITION_NACH_OBEN: readonly number[] = [65, 71];

export const AUSBLENDEN: readonly string[] = [];
export const NACH_OBEN: readonly string[] = [];

type MitKennung = { id: string; title?: string | null; images?: { url: string }[] };

function passt(l: MitKennung, schluessel: string): boolean {
  const k = schluessel.toLowerCase();
  if (l.id === schluessel) return true;
  const text = `${l.title ?? ""} ${l.images?.[0]?.url ?? ""}`.toLowerCase();
  return text.includes(k);
}

function inAbschnitten<T>(liste: T[], folge: readonly number[]): T[] {
  const n = folge.length;
  if (liste.length < n) return liste;
  const basis = Math.floor(liste.length / n);
  const mehr = liste.length % n;
  const abschnitte: T[][] = [];
  let start = 0;
  for (let i = 0; i < n; i++) {
    const laenge = basis + (i < mehr ? 1 : 0);
    abschnitte.push(liste.slice(start, start + laenge));
    start += laenge;
  }
  return folge.flatMap((f) => abschnitte[f - 1] ?? []);
}

export function ordneListings<T extends MitKennung>(
  listings: T[],
  folge: readonly number[] = ABSCHNITT_FOLGE,
  ausblenden: readonly string[] = AUSBLENDEN,
  nachOben: readonly string[] = NACH_OBEN,
  posAus: readonly number[] = POSITION_AUSBLENDEN,
  posOben: readonly number[] = POSITION_NACH_OBEN,
): T[] {
  const live = inAbschnitten(listings, folge);
  const weg = new Set(posAus.map((p) => live[p - 1]).filter(Boolean));
  const sichtbar = live.filter((l) => !weg.has(l) && !ausblenden.some((a) => passt(l, a)));
  const oben: T[] = [];
  for (const p of posOben) {
    const t = live[p - 1];
    if (t && sichtbar.includes(t) && !oben.includes(t)) oben.push(t);
  }
  for (const schluessel of nachOben) {
    const treffer = sichtbar.find((l) => !oben.includes(l) && passt(l, schluessel));
    if (treffer) oben.push(treffer);
  }
  return [...oben, ...sichtbar.filter((l) => !oben.includes(l))];
}

/** Wendet die Regel auf die Kategorie Listings an. Die anderen bleiben, wie sie sind. */
export function ordneReferenzen(data: RefData): RefData {
  return { ...data, main_images: ordneListings(data.main_images) };
}

export type OrdnungsZeile = {
  /** Position im Sales Room, ab 1. */
  quelle: number;
  /** Position vor dieser Regel (Sales Room in Abschnittsfolge), ab 1. */
  live: number;
  /** Position auf der Website, ab 1. Leer, wenn das Listing nicht erscheint. */
  anzeige: number | null;
  id: string;
  title: string | null;
  bild: string | null;
};

/** Fuer `?debug`: welches Listing steht wo, und welches erscheint nicht. */
export function beschreibeOrdnung(listings: RefListing[]): OrdnungsZeile[] {
  const angezeigt = ordneListings(listings);
  const live = inAbschnitten(listings, ABSCHNITT_FOLGE);
  return listings.map((l, i) => {
    const pos = angezeigt.indexOf(l);
    return {
      quelle: i + 1,
      live: live.indexOf(l) + 1,
      anzeige: pos === -1 ? null : pos + 1,
      id: l.id,
      title: l.title,
      bild: l.images[0]?.url ?? null,
    };
  });
}
