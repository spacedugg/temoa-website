/* ============================================================
   Die Kundenlogos.

   Namen und Dateien stehen hier zusammen, weil sie an zwei Stellen gebraucht
   werden: im Band der Startseite (`takt/sections`) und im Streifen auf der
   Seite Case Studies (`sections/SocialProof`). Zwei Listen wuerden beim
   naechsten Logo auseinanderlaufen.

   Die Namen sind aus den gelieferten Dateien abgelesen, nicht geraten. Ohne
   sie steht auf der Startseite ein Band aus Bildern, zu denen die
   Seite nichts sagt: ein Vorleseprogramm ueberspringt sie, eine Suchmaschine
   sieht Dateien ohne Beschreibung.

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
  /** Erhaelt bei mehrfarbigen Bildmarken die Kontraste auf dunklem Grund. */
  graustufenAufDunkel?: boolean;
  gross?: boolean;
};

export const kundenlogoZeilen: Kundenlogo[][] = [
  [
    { marke: "Juskys", datei: "/clients/5.webp" },
    { marke: "Nicotinell", datei: "/clients/2.webp", weiss: "/clients/2-weiss.webp", gross: true },
    { marke: "mypuzzle.com", datei: "/clients/11.webp" },
    { marke: "BIG DEAN", datei: "/clients/8.webp" },
    { marke: "Heldengrün", datei: "/clients/3.webp" },
  ],
  [
    { marke: "TRUE NATURE", datei: "/clients/7.webp" },
    { marke: "Kaufmann’s", datei: "/clients/kaufmanns.webp" },
    { marke: "Dr. Paul Koch", datei: "/clients/dr-paul-koch.webp", graustufenAufDunkel: true },
    { marke: "uandu", datei: "/clients/9.webp" },
    { marke: "Bachgold", datei: "/clients/4.webp" },
    { marke: "Shape Republic", datei: "/clients/12.webp" },
  ],
  [
    { marke: "Kijimea", datei: "/clients/1.webp", weiss: "/clients/1-weiss.webp" },
    { marke: "HECHT", datei: "/clients/6.webp" },
    { marke: "FAIRMO", datei: "/clients/14.webp" },
    { marke: "Vitaworld", datei: "/clients/10.webp" },
    { marke: "zooprinz", datei: "/clients/13.webp" },
  ],
];

export const kundenlogos = kundenlogoZeilen.flat();
