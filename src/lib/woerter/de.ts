/* ============================================================
   Deutsche Fassung. Die Quelle, gegen die die englische geprueft wird.

   Hier stehen nur die Rahmen-Elemente: Navigation, Fusszeile, Umschalter,
   Seitentitel. Die Copy der Sektionen zieht in weiteren Schritten nach,
   Seite fuer Seite, damit jede Fassung einzeln zu pruefen ist.
   ============================================================ */

export const de = {
  rahmen: {
    zumInhalt: "Zum Inhalt springen",
    zurStartseite: "temoa, zur Startseite",
    menueOeffnen: "Menü öffnen",
    menueSchliessen: "Menü schließen",
    sprache: "Sprache",
    spracheWaehlen: "Sprache wählen",
    cta: "Potenzialanalyse buchen",
  },

  navigation: {
    fullService: "Full Service",
    caseStudies: "Case Studies",
    designbeispiele: "Designbeispiele",
    blog: "Blog",
  },

  leistungen: {
    strategie: "Strategie",
    listingSeo: "Produktbilder & SEO",
    ppc: "PPC Advertising",
    account: "Account Management",
    international: "Internationalisierung",
  },

  fusszeile: {
    beschreibung:
      "Amazon Full Service Wachstumspartner. Erst ein Listing, das organisch verkauft, dann Werbung, die darauf aufbaut.",
    spalteLeistungen: "Leistungen",
    spalteUnternehmen: "Unternehmen",
    spalteRecht: "Rechtliches",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    agb: "AGB",
    cookieEinstellungen: "Cookie-Einstellungen",
  },

  meta: {
    titel: "temoa · Amazon Full Service Wachstumspartner",
    beschreibung:
      "Wir bringen euer Amazon-Listing dahin, dass es auch ohne Werbung verkauft. Danach skaliert PPC, was bereits konvertiert. Organic First, PPC Second.",
    ogBeschreibung:
      "Amazon Full Service: Erst verkauft euer Listing, dann skaliert die Werbung. Organic First, PPC Second.",
  },
};

/* Kein `as const`: sonst waeren die deutschen Saetze Literaltypen und keine
   Uebersetzung liesse sich dagegen zuweisen. So bleibt die Form erzwungen
   (jeder Schluessel muss da sein und einen String tragen), der Inhalt aber
   frei. */
export type Woerterbuch = typeof de;
