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

    kundenband: {
      label: "Täglich in unserer Verantwortung",
      marken: "Marken",
      marktplaetze: "Marktplätze",
    },

    leistungen: {
      label: "Leistungen",
      titelVor: "Fünf Leistungen, in der ",
      titelMark: "richtigen Reihenfolge.",
      mehr: "Mehr dazu",
      alle: "Alle Leistungen ansehen",
      bildAlt: "Fünf Bereiche liegen im Ring um eine gemeinsame Mitte und sind mit ihr verbunden.",
      /* Die Reihenfolge ist die der Seite und entspricht den Adressen in
         `sections.tsx`. Namen wie in Kopf- und Fusszeile, elfte Runde. */
      liste: [
        { titel: "Strategie", text: "Erst die Daten, dann der Plan." },
        { titel: "Produktbilder & SEO", text: "Aus Klicks werden Käufe." },
        { titel: "PPC Advertising", text: "Profitabel skalieren." },
        { titel: "Account Management", text: "Bestand, Buy-Box, Cases im Griff." },
        { titel: "Internationalisierung", text: "Lokalisieren statt übersetzen." },
      ],
    },

    nachweis: {
      label: "Case Studies",
      titelVor: "Jede Zahl kommt aus einem ",
      titelEm: "Konto, das wir betreuen.",
      caseStudy: "Case Study",
      alle: "Alle Case Studies ansehen",
    },

    befund: {
      label: "Ausgangslage",
      titel: "Das Nötigste reicht auf Amazon nicht.",
      karten: [
        {
          titel: "Zu viele Produkte, zu wenig Zeit",
          text: "Mehrere hundert Artikel liegen bei ein, zwei Leuten, die daneben zehn andere Dinge machen.",
        },
        {
          titel: "Seit dem Launch nichts verändert",
          text: "Bilder, Titel und A+ Content stehen genau so da wie am ersten Tag.",
        },
        {
          titel: "Kampagnen ohne Struktur",
          text: "Auto, Phrase und Exact laufen nebeneinander und bieten gegeneinander.",
        },
        {
          titel: "Berichte, die niemand auswertet",
          text: "Search Query Bericht und Ads-Performance liegen im Konto und werden nicht gelesen.",
        },
      ],
      ursacheLabel: "Die Ursache",
      ursacheSatz: "Vier Symptome, eine Ursache: das Listing überzeugt zu wenige Besucher.",
      ursacheText:
        "Amazon rankt nach Klicks und Käufen. Wer dort zurückliegt, muss Sichtbarkeit dauerhaft einkaufen.",
      ursacheBildAlt:
        "Ein Trichter: viele Besucher laufen oben hinein, unten kommen nur zwei Käufe heraus.",
    },

    verfahren: {
      label: "Unser Vorgehen",
      titelZeile: "Organic First,",
      titelMark: "PPC Second.",
      lead: "Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt zuerst das Listing, dann die Kampagne.",
      verlaufBezahlt: "Umsatz über Werbung",
      verlaufOrganisch: "Umsatz ohne Werbung",
      verlaufAlt:
        "Zehn Säulen nebeneinander, räumlich dargestellt. Der untere Teil jeder Säule steht für den Umsatz über Werbung und ist überall gleich hoch. Der obere Teil steht für den Umsatz ohne Werbung und wächst nach rechts deutlich.",
      schritt1: "Organic First",
      schritt1Text: "Das Listing bringen wir auf Klickrate und Conversion.",
      stufen: [
        { name: "Sichtbarkeit", bedeutung: "im Suchergebnis gefunden werden" },
        { name: "Klickrate (CTR)", bedeutung: "der Klick auf euer Produkt" },
        { name: "Conversion (CVR)", bedeutung: "der Kauf auf der Detailseite" },
      ],
      rankingSignal: "Ranking-Signal",
      stufenBildAlt: "Drei Stufen, durch Pfeile verbunden: Suche, Klick, Kauf.",
      ergebnisLabel: "Ergebnis",
      ergebnisSatz: "Das Listing verkauft ohne Werbung.",
      schritt2: "PPC Second",
      schritt2Text: "Werbung skaliert erst, was schon konvertiert.",
      ppc: [
        {
          titel: "Skalieren, was konvertiert",
          text: "Budget geht auf Suchbegriffe, die auf der Detailseite kaufen.",
        },
        {
          titel: "Platz halten",
          text: "Marke und Bestseller-Begriffe bleiben besetzt, auch gegen Wettbewerber.",
        },
        {
          titel: "Auf Profit steuern",
          text: "Gemessen am TACoS: was Werbung kostet, gemessen am gesamten Umsatz.",
        },
      ],
      unterschiedLabel: "Der Unterschied",
      unterschiedTitel: "Vier Punkte, an denen sich die Arbeit trennt.",
      spalteAlt: "Wie es meistens läuft",
      spalteNeu: "Wie temoa arbeitet",
      gegenueber: [
        {
          alt: "Listing einmal erstellt, danach nur noch Werbung",
          neu: "Hauptbild, Titel und A+ nachgeschärft, bis die Conversion steht",
        },
        {
          alt: "Content nach Gefühl, ohne Datenbasis",
          neu: "Content aus Search Query Report, Wettbewerb und Bewertungen",
        },
        {
          alt: "Sichtbarkeit über Gebote gekauft, Klickpreise steigen jedes Jahr",
          neu: "Die Sichtbarkeit kommt organisch, Werbung legt sich obendrauf",
        },
        {
          alt: "Umsatz um jeden Preis",
          neu: "Jedes Produkt einzeln durchgerechnet, bevor Budget fließt",
        },
      ],
    },

    arbeiten: {
      label: "Designbeispiele",
      titelVor: "So sieht",
      titelEm: "Retail Ready",
      titelNach: " aus.",
      lead1: "Ein komplettes Listing aus unserer Produktion für Miganeo.",
      lead2:
        "Sieben Bilder und sechs Module Premium A+ Content, in dieser Form auf Amazon veröffentlicht.",
      zahlBilder: "Bilder",
      zahlModule: "Module Premium A+",
      mehr: "Mehr Designbeispiele",
      kopfListing: "Listing",
      kopfListingNote: "1 + 6 Bilder",
      kopfAplus: "Premium A+ Content",
      kopfAplusNote: "6 Module",
      /* Die Beschriftungen der sieben Listingbilder, in der Reihenfolge der
         Bildstrecke. Sie beschreiben, was auf dem ausgelieferten Bild steht. */
      bildAlt: [
        "Hauptbild: die Poolabdeckung freigestellt, gefaltet und ausgelegt",
        "Bis zu 8 Grad wärmeres Wasser, Pool zur Hälfte abgedeckt",
        "Die Wärme im Pool behalten, Durchmesser 457 Zentimeter",
        "Handhabung in vier Schritten",
        "Bis zu 70 Prozent weniger Heizkosten",
        "Hält groben Schmutz vom Wasser fern",
        "Familie am Pool, Abdeckung wird abgezogen",
      ],
      /* `{n}` wird durch die Nummer des Moduls ersetzt. */
      aplusAlt: "Premium A+ Modul {n} von 6",
    },

    stimmen: {
      label: "Kundenstimmen",
      titelVor: "Im Wortlaut, ",
      titelMark: "mit Zahlen.",
      sterne: "5 von 5 Sternen",
    },

    mannschaft: {
      label: "Team",
      titel: "Das Team hinter temoa.",
      lead: "Kein Konto liegt bei einer Person. An eurem Sortiment arbeiten mehrere gleichzeitig, jeder in seinem Bereich, mit denselben Zahlen vor sich.",
      bildAlt: "Die Gründer von temoa",
    },
  },
};

/* Kein `as const`: sonst waeren die deutschen Saetze Literaltypen und keine
   Uebersetzung liesse sich dagegen zuweisen. So bleibt die Form erzwungen
   (jeder Schluessel muss da sein und einen String tragen), der Inhalt aber
   frei. */
export type Woerterbuch = typeof de;
