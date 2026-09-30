import type { RefData, RefListing } from "./references";

/* ============================================================
   Auswahl und Reihenfolge der Listings auf der Seite Designbeispiele.

   Die Listings kommen aus dem Sales Room, die Reihenfolge dort ist
   `reference_listings."order"`. Die Regel hier ist eine Uebergangsloesung und
   arbeitet nach Position, nicht nach Kennung: im Repo liegt keine Kopie der
   Bibliothek (`src/data/references.json` ist leer), die Kennungen sind von hier
   aus nicht zu sehen.

   Zwei Schritte, nur fuer die Kategorie Listings:

   1. Die ersten `ENTFERNE_ERSTE` Listings erscheinen nicht. Das sind die
      sechs, die der Kunde als Beispiele gezeigt hat und die weg sollen.
   2. Der Rest wird in `ABSCHNITT_FOLGE.length` Abschnitte gleicher Groesse
      geteilt (bei Rest bekommen die vorderen Abschnitte je eins mehr) und in
      der Folge der Abschnitte angezeigt: 1, 3, 4, 2, 5. Damit rutschen Listings,
      die sonst erst nach mehrmaligem „Mehr laden" kommen, nach vorn, ohne dass
      jemand sie von Hand verschiebt. Kommen Listings dazu, teilen sich die
      Abschnitte von selbst neu auf.

   Hier wird nichts geloescht. Die Listings bleiben im Sales Room, sie
   erscheinen nur nicht auf der Website.

   Sobald die Bibliothek im Sales Room selbst so gepflegt ist (die sechs auf
   inaktiv, Reihenfolge gesetzt), gehoert diese Regel geloescht. Sonst wird
   doppelt sortiert und verworfen.

   Hat die Liste nicht mehr Eintraege als `ENTFERNE_ERSTE`, bleibt sie
   unangetastet: sonst stuende auf der Seite nur noch das erfundene
   Beispielprodukt.
   ============================================================ */

export const ENTFERNE_ERSTE = 6;
export const ABSCHNITT_FOLGE = [1, 3, 4, 2, 5] as const;

export function ordneListings<T>(
  listings: T[],
  entferneErste: number = ENTFERNE_ERSTE,
  folge: readonly number[] = ABSCHNITT_FOLGE,
): T[] {
  if (listings.length <= entferneErste) return listings;
  const rest = listings.slice(entferneErste);
  const n = folge.length;
  /* Weniger Listings als Abschnitte: Umsortieren waere sinnlos. */
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
