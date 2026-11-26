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

/** Bildgröße und sichtbarer Ausschnitt in Pixeln, mit Platz für antialiasierte Kanten. */
export const logoAusschnitte = {
  "/clients/1-weiss.webp": [200, 112, 37, 43, 127, 34],
  "/clients/1.webp": [200, 112, 14, 1, 172, 110],
  "/clients/10.webp": [200, 112, 4, 10, 191, 84],
  "/clients/11.webp": [200, 112, 4, 14, 192, 90],
  "/clients/12.webp": [200, 112, 6, 29, 188, 53],
  "/clients/13.webp": [200, 112, 9, 27, 185, 56],
  "/clients/14.webp": [200, 66, 0, 0, 200, 66],
  "/clients/2-weiss.webp": [200, 112, 34, 27, 158, 46],
  "/clients/2.webp": [200, 112, 0, 6, 200, 100],
  "/clients/3.webp": [200, 112, 41, 2, 124, 108],
  "/clients/4.webp": [200, 112, 5, 39, 189, 32],
  "/clients/5.webp": [200, 79, 8, 17, 185, 44],
  "/clients/6.webp": [200, 79, 6, 10, 193, 59],
  "/clients/7.webp": [200, 157, 0, 0, 200, 157],
  "/clients/8.webp": [200, 79, 5, 16, 190, 49],
  "/clients/9.webp": [200, 79, 6, 13, 188, 52],
  "/clients/dr-paul-koch.webp": [768, 257, 0, 41, 768, 175],
  "/clients/kaufmanns.webp": [768, 243, 3, 12, 762, 212],
} as const;

export type LogoDatei = keyof typeof logoAusschnitte;

export type Kundenlogo = {
  /** Der Markenname, so wie er im Logo steht. */
  marke: string;
  /** Die Datei in ihrer eigenen Farbe, fuer hellen Grund. */
  datei: LogoDatei;
  /** Die freigestellte weisse Fassung, nur bei den beiden Knockout-Logos. */
  weiss?: LogoDatei;
  /** Erhaelt bei mehrfarbigen Bildmarken die Kontraste auf dunklem Grund. */
  graustufenAufDunkel?: boolean;
};

export const kundenlogoZeilen: Kundenlogo[][] = [
  [
    { marke: "Juskys", datei: "/clients/5.webp" },
    { marke: "Nicotinell", datei: "/clients/2.webp", weiss: "/clients/2-weiss.webp" },
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
