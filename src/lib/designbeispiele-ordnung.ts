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

   `NACH_OBEN` setzt ausgewaehlte Listings in genau dieser Folge an den Anfang.
   Ein Eintrag ist eine Kennung oder ein Teil des Titels (Gross- und
   Kleinschreibung egal). Ein Eintrag ohne Treffer wird uebersprungen. Die
   uebrigen Listings folgen in der Abschnittsfolge.

   Mit weniger Listings als Abschnitten bleibt die Reihenfolge, wie sie ist.
   ============================================================ */

export const ABSCHNITT_FOLGE = [1, 3, 4, 2, 5] as const;
/* Die sechs Listings, die im Sales Room geloescht sind, auf der Website aber
   noch stehen (alter Stand der Datenbank). Gesucht wird ueber Teile von Titel
   oder Bilddatei, solange die Kennungen nicht bekannt sind. */
export const AUSBLENDEN: readonly string[] = [
  "Blumtal",
  "Trachea",
  "Zimmerpflanze",
  "Teak",
  "Cookeez",
  "Fincci",
];
export const NACH_OBEN: readonly string[] = [
  "Scotty",
  "Camera",
  "Störte",
  "Harkam",
  "Koffer",
  "Munddusche",
  "Motor",
  "Extractor",
  "Power X-Change",
];

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
): T[] {
  const sichtbar = listings.filter((l) => !ausblenden.some((a) => passt(l, a)));
  const oben: T[] = [];
  for (const schluessel of nachOben) {
    const treffer = sichtbar.find((l) => !oben.includes(l) && passt(l, schluessel));
    if (treffer) oben.push(treffer);
  }
  const rest = sichtbar.filter((l) => !oben.includes(l));
  return [...oben, ...inAbschnitten(rest, folge)];
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
