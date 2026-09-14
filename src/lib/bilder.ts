/* ============================================================
   Die kleine Fassung eines Bildes.

   Die Bilder der ausgelieferten Arbeit stehen auf der Seite als Kachel von
   rund 120 bis 400 Pixeln, lassen sich aber anklicken und werden dann fast
   fensterfuellend gezeigt. Beides aus einer Datei zu bedienen heisst, jedem
   Besucher die grosse zu schicken, auch wenn er nie klickt: auf einer
   Fallseite waren das drei Megabyte fuer Kacheln von Daumennagelgroesse.

   `scripts/bilder-anzeigegroesse.mjs` legt deshalb neben jede dieser Dateien
   eine kleine Fassung `-klein`. Auf der Seite steht die kleine, beim Klick
   laedt die grosse.

   Die Liste unten muss zu den Regeln mit `klick: true` in jenem Skript
   passen: ein Pfad, der hier umgeschrieben wird, ohne dass das Skript die
   Datei erzeugt, ist ein fehlendes Bild. Geprueft wird das nicht per Auge,
   sondern indem im Browser jede Seite auf Antworten mit 404 durchgesehen
   wird.

   Adressen, die nicht in die Liste passen, bleiben unveraendert. Die
   Designbeispiele holen ihre Bilder sonst von einem fremden Server, dort
   gibt es keine kleine Fassung.
   ============================================================ */

const MIT_KLEINER_FASSUNG = [
  /* Die ausgelieferte Arbeit in den Case Studies: Bildstrecke, Hauptbild,
     Hauptbildvarianten und weitere Artikel derselben Marke. */
  /^\/case_studies\/[^/]+\/p\d+-\d+\.webp$/,
  /^\/case_studies\/[^/]+\/p\d+-haupt\.webp$/,
  /^\/case_studies\/[^/]+\/p\d+-var-\d+\.webp$/,
  /^\/case_studies\/[^/]+\/p\d+-pal-\d+\.webp$/,
  /* Das Miganeo-Listing traegt die Designbeispiele der Startseite und den
     Rueckfall der Seite Designbeispiele. */
  /^\/bilder\/miganeo\/[la]-\d+\.webp$/,
];

/** Der Pfad zur kleinen Fassung, wenn es eine gibt, sonst der Pfad selbst. */
export function klein(src: string): string {
  return MIT_KLEINER_FASSUNG.some((r) => r.test(src)) ? src.replace(/\.webp$/, "-klein.webp") : src;
}
