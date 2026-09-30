import type { RefData } from "./references";

/* ============================================================
   Reihenfolge der Listings auf der Seite Designbeispiele.

   Die Listings kommen aus dem Sales Room, die Reihenfolge dort ist
   `reference_listings."order"`. Die Regel hier ist eine Uebergangsloesung und
   arbeitet nach Position, nicht nach Kennung: im Repo liegt keine Kopie der
   Bibliothek (`src/data/references.json` ist leer), die Kennungen sind von hier
   aus nicht zu sehen.

   Positionen zaehlen ab 1 in der Reihenfolge des Sales Room.

   - `reihenfolge`: diese Listings stehen vorn, in dieser Folge.
   - `entfernen`: diese Listings erscheinen nicht.
   - Alles, was in keiner der beiden Listen steht, folgt danach in der
     urspruenglichen Reihenfolge.

   Sobald die Reihenfolge im Sales Room selbst so gesetzt ist (Reihenfolge
   aendern, das sechste Listing auf inaktiv), gehoert diese Regel geloescht.
   Sonst wird doppelt umsortiert.

   Die Regel greift nur, wenn die Liste mindestens `MINDESTZAHL` Listings
   hat, also den Stand, auf den sie geschrieben wurde. Bei weniger bleibt die
   Bibliothek unangetastet, damit ein geloeschtes Listing nicht dazu fuehrt,
   dass ein falsches verschwindet.
   ============================================================ */

export const LISTING_ORDNUNG = {
  reihenfolge: [1, 3, 4, 2, 5],
  entfernen: [6],
} as const;

const MINDESTZAHL = 6;

export function ordneListings<T>(
  listings: T[],
  reihenfolge: readonly number[] = LISTING_ORDNUNG.reihenfolge,
  entfernen: readonly number[] = LISTING_ORDNUNG.entfernen,
  mindest: number = MINDESTZAHL,
): T[] {
  if (listings.length < mindest) return listings;
  const vorn = reihenfolge.map((p) => listings[p - 1]).filter((l): l is T => l !== undefined);
  const benutzt = new Set([...reihenfolge, ...entfernen].map((p) => p - 1));
  const rest = listings.filter((_, i) => !benutzt.has(i));
  return [...vorn, ...rest];
}

/** Wendet die Regel auf die Kategorie Listings an. Die anderen bleiben, wie sie sind. */
export function ordneReferenzen(data: RefData): RefData {
  return { ...data, main_images: ordneListings(data.main_images) };
}
