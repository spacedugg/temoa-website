/* ============================================================
   Die Eckdaten der Website an einer Stelle.

   Adresse, Name, Firmierung. Sie stehen in den Metadaten, in der sitemap.xml,
   in robots.txt, in den strukturierten Daten und im Vorschaubild. Fuenf
   Stellen, die dieselbe Adresse brauchen, sind fuenf Stellen, an denen eine
   Umstellung vergessen werden kann.

   Die Anschrift ist die des Impressums (`lib/recht/impressum.ts`).
   ============================================================ */

/* Die Adresse mit www ist die, die tatsaechlich ausgeliefert wird: die Seite
   ohne www leitet per 308 dorthin. Canonical, hreflang, Sitemap, robots.txt
   und strukturierte Daten muessen dieselbe Adresse nennen (Modul K1 im
   SEO-Prompt). Die Search-Console-Daten vom 16.10.2026 zeigten 16 Pfade unter
   beiden Hostnamen. Wer die Weiterleitung aendert, aendert auch diese Zeile. */
export const SEITE = {
  url: "https://www.temoa.de",
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
