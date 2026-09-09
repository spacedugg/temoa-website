/* ============================================================
   Deutsche Fassung der Seiten-Copy. Die Quelle, gegen die die englische
   geprueft wird.

   Die Rahmen-Beschriftungen (Navigation, Fusszeile, Umschalter) liegen
   getrennt in `rahmen.ts`, weil sie im Browser landen. Hier stehen die
   Metadaten, und hierher zieht die Copy der Sektionen: Seite fuer Seite,
   damit jede Fassung einzeln zu pruefen ist.
   ============================================================ */

export const de = {
  meta: {
    titel: "temoa \u00b7 Amazon Full Service Wachstumspartner",
    beschreibung:
      "Wir bringen euer Amazon-Listing dahin, dass es auch ohne Werbung verkauft. Danach skaliert PPC, was bereits konvertiert. Organic First, PPC Second.",
    ogBeschreibung:
      "Amazon Full Service: Erst verkauft euer Listing, dann skaliert die Werbung. Organic First, PPC Second.",
  },

  start: {
    /* Ueberschrift und Versprechen stehen wortgleich so, wie der Kunde sie
       vorgegeben hat, inklusive der Anrede "deine" statt "eure". Zweimal
       bestaetigt, also nicht anfassen. Die Ueberschrift ist geteilt, weil das
       erste Stueck den Textmarker traegt. */
    hero: {
      eyebrow: "Amazon Full Service",
      titelMark: "Profitables Wachstum",
      titelRest: " für deine Amazon Brand",
      lead: "Mehr Umsatz ist keine Frage des Werbebudgets durch Profi-Umsetzung in Content, Ads, Account Betreuung & Co.",
      ctaZweit: "Case Studies ansehen",
    },
  },
};

/* Kein `as const`: sonst waeren die deutschen Saetze Literaltypen und keine
   Uebersetzung liesse sich dagegen zuweisen. So bleibt die Form erzwungen
   (jeder Schluessel muss da sein und einen String tragen), der Inhalt aber
   frei. */
export type Woerterbuch = typeof de;
