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
  /* Der Abschluss-CTA steht auf jeder Seite. Deshalb liegt seine Copy hier
     und nicht im grossen Woerterbuch: `takt/Gespraech` erkennt die Sprache
     selbst, wie Kopf- und Fusszeile, statt dass sie durch fuenfzehn Seiten
     durchgereicht wird. Die Ueberschrift wird pro Seite ueberschrieben, hier
     steht die der Startseite. */
  gespraech: {
    titel: string;
    zusagen: [string, string];
    portraetAlt: string;
    portraetName: string;
    portraetRolle: string;
  };
  /* Die Einwilligungsschicht. Sie steht auf jeder Seite, deshalb hier und
     nicht im grossen Woerterbuch. Die Kategorien und Dienste selbst stehen in
     `lib/consent.ts` und nur dort, damit Banner und Datenschutzerklaerung
     nicht auseinander laufen koennen. */
  consent: {
    titel: string;
    titelDetails: string;
    text: string;
    datenschutz: string;
    nurNotwendig: string;
    anpassen: string;
    alleAkzeptieren: string;
    auswahlSpeichern: string;
    zurueck: string;
    impressum: string;
    immerAktiv: string;
    nurMitEinwilligung: string;
    /* Was ein Vorleseprogramm zum Schalter einer Kategorie ansagt.
       `{name}` wird durch den Namen der Kategorie ersetzt. */
    schalter: string;
    /* Die Beschriftungen der Platte, die anstelle einer Einbettung steht. */
    gateKnopf: string;
    gateAusweich: string;
    gateHinweisVor: string;
    /* In der Datenschutzerklaerung, unter der Liste der Dienste. */
    tabelleDienst: string;
    tabelleAnbieter: string;
    tabelleZweck: string;
    tabelleSpeicher: string;
    tabelleGrundlage: string;
    widerrufVor: string;
    widerrufNach: string;
  };
  fusszeile: {
    beschreibung: string;
    spalteLeistungen: string;
    spalteUnternehmen: string;
    spalteKontakt: string;
    spalteRecht: string;
    /* Steht als kleine Zeile unter der Adresse, damit nicht zwei Adressen
       ohne Zuordnung untereinander stehen. */
    kontaktPerson: string;
    kontaktAllgemein: string;
    kontaktTermin: string;
    /* Ueber den Verweisen auf Trustpilot und Google. */
    bewertungen: string;
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
    gespraech: {
      titel: "Wie viel Umsatz lässt euer Listing liegen?",
      /* Der Ablauf, wie er wirklich ist: ein kurzes erstes Gespraech zum
         Kennenlernen, die vorbereitete Auswertung erst danach. Kein Blick in
         den Account vorab. Die Dauer steht an acht Stellen, siehe zwanzigste
         Runde. */
      zusagen: [
        "30 Minuten, in denen wir eure Lage verstehen und ihr uns kennenlernt",
        "Passt es, folgt ein zweites Gespräch, für das wir eure Zahlen vorbereiten",
      ],
      portraetAlt: "Clemens, Founder und Sales bei temoa",
      portraetName: "Hi, ich bin Clemens.",
      portraetRolle: "Founder. Ihr sprecht mit mir.",
    },
    consent: {
      titel: "Kurz zu Cookies",
      titelDetails: "Was ihr zulassen wollt",
      text: "Diese Website braucht für sich selbst keine Cookies. Für das Erstgespräch liegt der Terminkalender bei einem externen Dienst. Der wird erst geladen, wenn ihr zustimmt. Was dabei passiert, steht in der",
      datenschutz: "Datenschutzerklärung",
      nurNotwendig: "Nur notwendige",
      anpassen: "Anpassen",
      alleAkzeptieren: "Alle akzeptieren",
      auswahlSpeichern: "Auswahl speichern",
      zurueck: "Zurück",
      impressum: "Impressum",
      immerAktiv: "immer aktiv",
      nurMitEinwilligung: "nur mit Einwilligung",
      schalter: "{name} zulassen",
      gateKnopf: "Einmal zulassen und laden",
      gateAusweich: "Beim Anbieter öffnen",
      gateHinweisVor: "Was dabei übertragen wird, steht in der",
      tabelleDienst: "Dienst",
      tabelleAnbieter: "Anbieter",
      tabelleZweck: "Zweck",
      tabelleSpeicher: "Speicherung",
      tabelleGrundlage: "Grundlage",
      widerrufVor: "Eure Entscheidung könnt ihr jederzeit ändern:",
      widerrufNach:
        ". Wir speichern sie im lokalen Speicher eures Browsers, mit Zeitpunkt, als Nachweis nach Art. 7 Abs. 1 DSGVO. Ein Widerruf wirkt sofort, für die Zukunft.",
    },
    fusszeile: {
      beschreibung:
        "Amazon Full Service Wachstumspartner. Erst ein Listing, das organisch verkauft, dann Werbung, die darauf aufbaut.",
      spalteLeistungen: "Leistungen",
      spalteUnternehmen: "Unternehmen",
      spalteKontakt: "Kontakt",
      spalteRecht: "Rechtliches",
      kontaktPerson: "Clemens Michaelis",
      kontaktAllgemein: "Allgemeine Anfragen",
      kontaktTermin: "Termin buchen",
      bewertungen: "Bewertungen",
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
    gespraech: {
      titel: "How much revenue is your listing leaving on the table?",
      zusagen: [
        "30 minutes for us to understand where you stand and for you to get to know us",
        "If it fits, a second call follows, and we prepare your numbers for it",
      ],
      portraetAlt: "Clemens, founder and sales at temoa",
      portraetName: "Hi, I am Clemens.",
      portraetRolle: "Founder. You will be talking to me.",
    },
    consent: {
      titel: "A word on cookies",
      titelDetails: "What you want to allow",
      text: "This website needs no cookies of its own. For the first call, the booking calendar is hosted by an external service. It is only loaded once you consent. What happens then is set out in the",
      datenschutz: "privacy policy",
      nurNotwendig: "Essential only",
      anpassen: "Customize",
      alleAkzeptieren: "Accept all",
      auswahlSpeichern: "Save selection",
      zurueck: "Back",
      impressum: "Imprint",
      immerAktiv: "always on",
      nurMitEinwilligung: "only with consent",
      schalter: "Allow {name}",
      gateKnopf: "Allow once and load",
      gateAusweich: "Open at the provider",
      gateHinweisVor: "What gets transmitted is set out in the",
      tabelleDienst: "Service",
      tabelleAnbieter: "Provider",
      tabelleZweck: "Purpose",
      tabelleSpeicher: "Storage",
      tabelleGrundlage: "Legal basis",
      widerrufVor: "You can change your decision at any time:",
      widerrufNach:
        ". We store it in your browser's local storage, with a timestamp, as the record required by Art. 7(1) GDPR. A withdrawal takes effect at once, for the future.",
    },
    fusszeile: {
      beschreibung:
        "Amazon full service growth partner. First a listing that sells on its own, then advertising built on top of it.",
      spalteLeistungen: "Services",
      spalteUnternehmen: "Company",
      spalteKontakt: "Contact",
      spalteRecht: "Legal",
      kontaktPerson: "Clemens Michaelis",
      kontaktAllgemein: "General enquiries",
      kontaktTermin: "Book a call",
      bewertungen: "Reviews",
      impressum: "Imprint",
      datenschutz: "Privacy Policy",
      agb: "Terms and Conditions",
      cookieEinstellungen: "Cookie settings",
      rechtHinweis: "These documents are legally binding in German only.",
    },
  },
};
