/* ============================================================
   Die vierzehn Kundenlogos.

   Namen und Dateien stehen hier zusammen, weil sie an zwei Stellen gebraucht
   werden: im Band der Startseite (`takt/sections`) und im Streifen auf der
   Seite Case Studies (`sections/SocialProof`). Zwei Listen wuerden beim
   naechsten Logo auseinanderlaufen.

   Die Namen sind aus den gelieferten Dateien abgelesen, nicht geraten. Ohne
   sie steht auf der Startseite ein Band aus vierzehn Bildern, zu denen die
   Seite nichts sagt: ein Vorleseprogramm ueberspringt sie, eine Suchmaschine
   sieht vierzehn Dateien ohne Beschreibung.

   Zwei Dateien sind „Knockout": der Schriftzug steht weiss in einer gefuellten
   farbigen Flaeche. Fuer den dunklen Grund liegen sie freigestellt als
   `-weiss` daneben, siehe `scripts/logos-knockout.mjs`.
   ============================================================ */

export type Kundenlogo = {
  /** Der Markenname, so wie er im Logo steht. */
  marke: string;
  /** Die Datei in ihrer eigenen Farbe, fuer hellen Grund. */
  datei: string;
  /** Die freigestellte weisse Fassung, nur bei den beiden Knockout-Logos. */
  weiss?: string;
};

const NAMEN = [
  "Kijimea",
  "Nicotinell",
  "Heldengrün",
  "Bachgold",
  "Juskys",
  "HECHT",
  "TRUE NATURE",
  "BIG DEAN",
  "uandu",
  "Vitaworld",
  "mypuzzle.com",
  "Shape Republic",
  "zooprinz",
  "FAIRMO",
];

/* Kijimea steht in einem gefuellten Rechteck, Nicotinell in einer Ellipse. */
const KNOCKOUT = new Set([1, 2]);

/* Ein Logo gehoert freigestellt ins Verzeichnis, nicht als schwarzer Zug auf
   weissem Grund: der Filter macht daraus sonst eine weisse Flaeche, in der
   die Marke verschwindet. Nummer 7 kam so und ist mit
   `node scripts/marke-freistellen.mjs fotos-original/clients/7.png
   public/clients/7.webp --dunkel` freigestellt worden. Wer ein Logo tauscht,
   prueft vorher, ob die Datei einen Alphakanal hat. */

export const kundenlogos: Kundenlogo[] = NAMEN.map((marke, i) => {
  const n = i + 1;
  return {
    marke,
    datei: `/clients/${n}.webp`,
    ...(KNOCKOUT.has(n) && { weiss: `/clients/${n}-weiss.webp` }),
  };
});
