import type { Sprache } from "../i18n";

/* ============================================================
   Rahmen-Beschriftungen: Navigation, Fusszeile, Umschalter, Sprungmarke.

   Bewusst ein eigenes Modul und nicht Teil der grossen Woerterbuecher. Kopf-
   und Fusszeile laufen im Browser, und was sie importieren, landet im Bundle.
   Diese vierzig Zeilen duerfen das, die Copy der Seiten mit ihren
   Zehntausenden Woertern nicht. Die bleibt serverseitig und wird als Prop
   uebergeben.

   Die englische Fassung ist geschrieben, nicht uebersetzt. Drei Bezeichnungen
   sind Entscheidungen und die ersten, die zu widerrufen sind, wenn sie nicht
   treffen:

   - "Designbeispiele" ist "Our Work". "Design Examples" liest sich wie ein
     Ordnername.
   - "Internationalisierung" ist "International Expansion".
     "Internationalisation" ist korrekt und sagt kein Mensch.
   - "Potenzialanalyse buchen" ist "Book an account review". Der deutsche
     Knopftext ist gesetzt, hier braucht es eine eigene Entscheidung: der Satz
     sagt, was in den 30 Minuten passiert, ohne ein Ergebnis zu versprechen.
   ============================================================ */

type Rahmen = {
  rahmen: {
    zumInhalt: string;
    zurStartseite: string;
    menueOeffnen: string;
    menueSchliessen: string;
    sprache: string;
    spracheWaehlen: string;
    cta: string;
  };
  navigation: {
    fullService: string;
    caseStudies: string;
    designbeispiele: string;
    blog: string;
  };
  leistungen: {
    strategie: string;
    listingSeo: string;
    ppc: string;
    account: string;
    international: string;
  };
  fusszeile: {
    beschreibung: string;
    spalteLeistungen: string;
    spalteUnternehmen: string;
    spalteRecht: string;
    impressum: string;
    datenschutz: string;
    agb: string;
    cookieEinstellungen: string;
    /* Steht in der englischen Fusszeile unter den Rechtslinks: die deutsche
       Fassung ist die verbindliche. Auf Deutsch ist die Zeile leer. */
    rechtHinweis: string;
  };
};

export const rahmenWoerter: Record<Sprache, Rahmen> = {
  de: {
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
      rechtHinweis: "",
    },
  },

  en: {
    rahmen: {
      zumInhalt: "Skip to content",
      zurStartseite: "temoa, to the homepage",
      menueOeffnen: "Open menu",
      menueSchliessen: "Close menu",
      sprache: "Language",
      spracheWaehlen: "Choose language",
      cta: "Book an account review",
    },
    navigation: {
      fullService: "Full Service",
      caseStudies: "Case Studies",
      designbeispiele: "Our Work",
      blog: "Blog",
    },
    leistungen: {
      strategie: "Strategy",
      listingSeo: "Product Images & SEO",
      ppc: "PPC Advertising",
      account: "Account Management",
      international: "International Expansion",
    },
    fusszeile: {
      beschreibung:
        "Amazon full service growth partner. First a listing that sells on its own, then advertising built on top of it.",
      spalteLeistungen: "Services",
      spalteUnternehmen: "Company",
      spalteRecht: "Legal",
      impressum: "Imprint",
      datenschutz: "Privacy Policy",
      agb: "Terms and Conditions",
      cookieEinstellungen: "Cookie settings",
      rechtHinweis: "These documents are legally binding in German only.",
    },
  },
};
