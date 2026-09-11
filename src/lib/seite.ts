/* ============================================================
   Die Eckdaten der Website an einer Stelle.

   Adresse, Name, Firmierung. Sie stehen in den Metadaten, in der sitemap.xml,
   in robots.txt, in den strukturierten Daten und im Vorschaubild. Fuenf
   Stellen, die dieselbe Adresse brauchen, sind fuenf Stellen, an denen eine
   Umstellung vergessen werden kann.

   Die Anschrift ist die des Impressums (`lib/recht/impressum.ts`).
   ============================================================ */

export const SEITE = {
  url: "https://temoa.de",
  name: "temoa",
  firma: "Temoa GmbH",
  email: "info@temoa.de",
  anschrift: {
    strasse: "Am Brink 2",
    plz: "23883",
    ort: "Seedorf",
    land: "DE",
  },
  /* Profile, die zur Firma gehoeren. Sie sind die Belege, ueber die eine
     Suchmaschine die Angaben auf dieser Seite mit anderen Quellen abgleicht. */
  profile: ["https://de.trustpilot.com/review/temoa.de"],
} as const;
