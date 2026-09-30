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

   `AUSBLENDEN` ist fuer ein Listing, das auf der Website fehlen soll, im Sales
   Room aber bleibt. Es wirkt ueber die Kennung, nicht ueber eine Position.
   Die Kennungen zeigt `/design-beispiele?debug`.

   Mit weniger Listings als Abschnitten bleibt die Reihenfolge, wie sie ist.
   ============================================================ */

export const ABSCHNITT_FOLGE = [1, 3, 4, 2, 5] as const;
export const AUSBLENDEN: readonly string[] = [];

export function ordneListings<T extends { id: string }>(
  listings: T[],
  folge: readonly number[] = ABSCHNITT_FOLGE,
  ausblenden: readonly string[] = AUSBLENDEN,
): T[] {
  const rest = listings.filter((l) => !ausblenden.includes(l.id));
  const n = folge.length;
  if (rest.length < n) return rest;

  const basis = Math.floor(rest.length / n);
  const mehr = rest.length % n;
  const abschnitte: T[][] = [];
  let start = 0;
  for (let i = 0; i < n; i++) {
    const laenge = basis + (i < mehr ? 1 : 0);
    abschnitte.push(rest.slice(start, start + laenge));
    start += laenge;
  }
  return folge.flatMap((f) => abschnitte[f - 1] ?? []);
}

/** Wendet die Regel auf die Kategorie Listings an. Die anderen bleiben, wie sie sind. */
export function ordneReferenzen(data: RefData): RefData {
  return { ...data, main_images: ordneListings(data.main_images) };
}

export type OrdnungsZeile = {
  /** Position im Sales Room, ab 1. */
  quelle: number;
  /** Position auf der Website, ab 1. Leer, wenn das Listing nicht erscheint. */
  anzeige: number | null;
  id: string;
  title: string | null;
  bild: string | null;
};

/** Fuer `?debug`: welches Listing steht wo, und welches erscheint nicht. */
export function beschreibeOrdnung(listings: RefListing[]): OrdnungsZeile[] {
  const angezeigt = ordneListings(listings);
  return listings.map((l, i) => {
    const pos = angezeigt.indexOf(l);
    return {
      quelle: i + 1,
      anzeige: pos === -1 ? null : pos + 1,
      id: l.id,
      title: l.title,
      bild: l.images[0]?.url ?? null,
    };
  });
}
