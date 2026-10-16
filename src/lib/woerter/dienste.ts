/* ============================================================
   Die vier Leistungsseiten, die aus dem Account Management und der
   Full-Service-Seite herausgewachsen sind: FBA & Inventory, Katalog &
   Listing Management, Software & Account Intelligence, Analytics &
   Reporting.

   Sie teilen einen Aufbau (`DienstBody`), deshalb teilen sie auch die Form
   der Copy. Die Texte stehen hier und nicht in de.ts / en.ts, weil beide
   Dateien schon sehr lang sind; eingebunden werden sie dort unter
   `leistungen.dienste`.

   Grundsaetze, die fuer diese Seiten gelten:
   - Es steht nur, was wir tun oder was ausdruecklich als „in Entwicklung"
     gekennzeichnet ist. Keine Zertifikate, keine erfundenen Zahlen.
   - Die Software ist nicht produktiv. Jeder Satz dazu steht im Konjunktiv
     oder sagt „soll", „geplant", „vorgesehen".
   - Wir bereiten keine Ware physisch vor.
   ============================================================ */

export type Dienst = {
  hero: { eyebrow: string; titelVor: string; titelEm: string; lead: string; bildAlt: string };
  problem: { titel: string; punkte: string[]; bruecke: string };
  kern: {
    eyebrow: string;
    titel: string;
    lead: string;
    karten: { titel: string; unterzeile: string; punkte: string[] }[];
  };
  vorgehen: {
    eyebrow: string;
    titel: string;
    lead: string;
    schritte: { titel: string; unterzeile: string; text: string }[];
  };
  abgrenzung: { eyebrow: string; titel: string; text: string };
  nutzen: { badge: string; titel: string; punkte: string[] };
  expertise: { eyebrow: string; titel: string; karten: { titel: string; text: string }[] };
  cta: string;
};

export type DiensteWoerter = {
  fba: Dienst;
  katalog: Dienst;
  software: Dienst;
  reporting: Dienst;
};

export const diensteDe: DiensteWoerter = {
  /* ------------------------------------------------------------
     FBA & Inventory Management
     ------------------------------------------------------------ */
  fba: {
    hero: {
      eyebrow: "FBA & Inventory",
      titelVor: "Amazon FBA und Inventory Management: ",
      titelEm: "Bestand und Sendungen im Griff.",
      lead: "Wir planen Sendungen, überwachen Bestand und Gebühren und führen Fälle bei Amazon, für Marken in Seller Central und Vendor Central. Die Arbeit findet im Konto statt, nicht im Lager.",
      bildAlt: "Bestandsanzeige, Sendungsplan und Gebührenübersicht nebeneinander",
    },
    problem: {
      titel: "Bestand ist Umsatz, und er wird oft zu spät betrachtet.",
      punkte: [
        "Ein Bestseller läuft leer, das Ranking bricht mit ihm weg.",
        "Überbestand bindet Kapital und kostet Lagergebühren.",
        "Eine Sendung steht im Wareneingang still, niemand fragt nach.",
        "Gebührenabweichungen fallen erst im Monatsabschluss auf.",
      ],
      bruecke: "Wir sehen es vorher und handeln im Konto.",
    },
    kern: {
      eyebrow: "Leistungen",
      titel: "Was wir bei FBA und Inventory laufend übernehmen.",
      lead: "Bestand, Sendungen und Gebühren laufen im Konto zusammen. Wir halten sie im Blick und greifen ein, bevor ein Artikel leerläuft oder ein Fehler Geld kostet.",
      karten: [
        {
          titel: "Bestand überwachen",
          unterzeile: "Täglich im Blick",
          punkte: [
            "FBA Inventory Monitoring je Artikel und Marktplatz",
            "Reichweitenanalyse und Stockout Monitoring",
            "Inventory Health, Überbestand und Langsamdreher",
            "Bestandsabweichungen zwischen Konto und Lager",
          ],
        },
        {
          titel: "Sendungen planen",
          unterzeile: "Vom Sendungsplan bis zum Wareneingang",
          punkte: [
            "Sendungspläne in Seller Central anlegen und einreichen",
            "Versandvorlagen mit Maßen, Gewicht und Verpackungsart",
            "Inbound Shipment Monitoring und Sendungsstatus",
            "Stranded Inventory erkennen und auflösen",
          ],
        },
        {
          titel: "Nachschub und Kosten steuern",
          unterzeile: "Reichweite, Vorlaufzeit, Gebühren",
          punkte: [
            "Replenishment-Planung nach Reichweite und Vorlaufzeit",
            "Entscheidung FBA oder FBM je Artikel",
            "FBA Fee Monitoring und Gebührenabweichungen",
            "Überwachung der FBA-Verfügbarkeit",
          ],
        },
        {
          titel: "Fälle bei Amazon führen",
          unterzeile: "Bis zur Entscheidung",
          punkte: [
            "Fälle zu Wareneingang und Mengenabweichungen eröffnen",
            "Nachhalten und eskalieren, wenn Amazon nicht antwortet",
            "Unterstützung bei digitalen FBA-Sendungsprozessen",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Ablauf",
      titel: "So läuft die Steuerung ab.",
      lead: "Erst die Bestandsaufnahme, dann feste Regeln, danach der laufende Betrieb mit einem Monatsreport.",
      schritte: [
        {
          titel: "Bestandsaufnahme",
          unterzeile: "Konto und Lager abgleichen",
          text: "Wir lesen Bestand, Reichweiten und Gebühren je Artikel aus und gleichen sie mit eurem Lager ab.",
        },
        {
          titel: "Regeln festlegen",
          unterzeile: "Nachschub und Versandweg",
          text: "Je Artikel steht fest, ab welcher Reichweite nachbestellt wird und ob FBA oder FBM mehr übrig lässt.",
        },
        {
          titel: "Laufender Betrieb",
          unterzeile: "Sendungen und Monitoring",
          text: "Sendungspläne, Statusprüfung und Abweichungen laufen im festen Rhythmus, Fälle bei Amazon führen wir zu Ende.",
        },
        {
          titel: "Rückmeldung",
          unterzeile: "Monatsreport",
          text: "Ihr bekommt die Zahlen und die nächsten Schritte, damit bei der Nachbestellung nichts nach Gefühl entschieden wird.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Abgrenzung",
      titel: "Was wir nicht tun.",
      text: "Physische Arbeiten an der Ware gehören nicht zu unseren Leistungen: kein Etikettieren, Verpacken oder Bündeln und keine Qualitätskontrolle im Lager. Das bleibt bei eurem Lager oder Prep-Partner. Wir steuern FBA und Inventory digital und operativ im Amazon-Konto.",
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Weniger Lücken im Regal.",
      punkte: [
        "Kein Bestseller läuft leer",
        "Lagerkosten für Ladenhüter bleiben klein",
        "Sendungen kommen mit stimmigen Angaben im Lager an",
        "Gebührenabweichungen fallen auf, bevor sie sich summieren",
      ],
    },
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Was dahintersteht.",
      karten: [
        { titel: "60+ Marken", text: "betreut, in Seller Central und in Vendor Central." },
        {
          titel: "5+ Marktplätze",
          text: "Nachfrage, Vorlaufzeit und Gebühren sind je Markt verschieden, deshalb planen wir Bestand je Marktplatz.",
        },
        {
          titel: "21 Mio. EUR",
          text: "betreuter Amazon-Jahresumsatz über alle Leistungen, bei dem Bestand und Verfügbarkeit mitgesteuert werden.",
        },
      ],
    },
    cta: "Wie lange reicht euer Bestand wirklich?",
  },

  /* ------------------------------------------------------------
     Katalog & Listing Management
     ------------------------------------------------------------ */
  katalog: {
    hero: {
      eyebrow: "Katalog & Listing Management",
      titelVor: "Amazon Katalog und Listing Management: ",
      titelEm: "sauber angelegt, laufend gepflegt.",
      lead: "Neue Produkte, Varianten und Änderungen pflegen wir im Katalog bis ins letzte Attribut: Titel, Bullet Points, Backend-Suchbegriffe, Bilder und Varianten, für Seller Central und Vendor Central.",
      bildAlt: "Produktreihe mit hervorgehobenem Artikel, verbunden mit einer Auswertung",
    },
    problem: {
      titel: "Ein Katalog, der gewachsen ist statt geplant.",
      punkte: [
        "Pflichtfelder fehlen, das Produkt fällt aus Filtern und Suchergebnissen.",
        "Varianten stehen einzeln, Bewertungen verteilen sich.",
        "Dubletten und falsch zusammengeführte Angebote bleiben liegen.",
        "Änderungen laufen von Hand, bei hunderten Artikeln dauert das Wochen.",
      ],
      bruecke: "Wir räumen auf und halten den Katalog sauber.",
    },
    kern: {
      eyebrow: "Leistungen",
      titel: "Was wir im Katalog übernehmen.",
      lead: "Vieles, was über die Auffindbarkeit eines Produkts entscheidet, steht in Feldern, die auf der Detailseite gar nicht auftauchen. Wir pflegen sie für euer ganzes Sortiment.",
      karten: [
        {
          titel: "Produkte anlegen",
          unterzeile: "Von der ersten ASIN an richtig",
          punkte: [
            "Neue Produkte und Varianten anlegen, auch ohne ASIN über EAN oder GTIN",
            "Attribute und Pflichtfelder je Kategorie und Produkttyp",
            "Eltern-Kind-Beziehungen und Variationsthemen",
          ],
        },
        {
          titel: "Inhalte pflegen",
          unterzeile: "Auffindbarkeit und Conversion",
          punkte: [
            "Titel, Bullet Points und Beschreibung nach Amazons Vorgaben",
            "Backend-Suchbegriffe: Synonyme, Schreibweisen, Tippfehler",
            "Hauptbild, Listingbilder, A+ Content und Brand Store",
            "Lokalisierung für weitere Marktplätze",
          ],
        },
        {
          titel: "Katalog bereinigen",
          unterzeile: "Dubletten, tote ASINs, Fehlzuordnungen",
          punkte: [
            "Katalogfehler und Dubletten erkennen und melden",
            "Falsch zusammengeführte Angebote und Varianten korrigieren",
            "Listing-Status, unterdrückte und inaktive Angebote prüfen",
          ],
        },
        {
          titel: "Massenpflege",
          unterzeile: "Hunderte Artikel auf einmal",
          punkte: [
            "Flat Files und Uploads statt Handarbeit",
            "Preis-, Attribut- und Bildänderungen im Block",
            "Verarbeitungsberichte prüfen und Fehler beheben",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Ablauf",
      titel: "Vom Ist-Stand zum gepflegten Katalog.",
      lead: "Wir beginnen mit dem, was heute im Konto steht, und enden bei einem Katalog, der sich gebündelt ändern lässt.",
      schritte: [
        {
          titel: "Ist-Stand lesen",
          unterzeile: "Katalog und Listing-Status",
          text: "Wir ziehen Attribute, Varianten und Status je ASIN und markieren Lücken, Dubletten und Fehlzuordnungen.",
        },
        {
          titel: "Vorlagen festlegen",
          unterzeile: "Pflichtfelder je Produkttyp",
          text: "Je Produkttyp steht fest, welche Angaben nötig sind und woher sie kommen.",
        },
        {
          titel: "Anlegen und ändern",
          unterzeile: "Einzeln oder per Flat File",
          text: "Neue Produkte entstehen sauber von Anfang an, Änderungen laufen gebündelt über Uploads.",
        },
        {
          titel: "Prüfen und halten",
          unterzeile: "Laufende Kontrolle",
          text: "Verarbeitungsberichte und Listing-Status werden geprüft, damit Fehler nicht unbemerkt Sichtbarkeit kosten.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Zusammenspiel",
      titel: "Katalog und Content gehören zusammen.",
      text: "Die Inhalte selbst, also Bilder, Texte, A+ Content und Brand Story, entstehen im Bereich Produktbilder & SEO. Hier geht es um das Fundament darunter: Struktur, Attribute und Pflege.",
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Produkte, die gefunden werden.",
      punkte: [
        "Produkte erscheinen in Filtern und Suchergebnissen",
        "Varianten sammeln Bewertungen an einer Stelle",
        "Änderungen laufen gebündelt statt einzeln",
        "Weniger Ablehnungen und Rückfragen von Amazon",
      ],
    },
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Was dahintersteht.",
      karten: [
        { titel: "60+ Marken", text: "betreut, von der Produktanlage bis zur laufenden Pflege." },
        {
          titel: "Flat Files im Alltag",
          text: "Massenänderungen und Neuanlagen laufen über Uploads, mit Prüfung der Verarbeitungsberichte.",
        },
        {
          titel: "Seller Central und Vendor Central",
          text: "Wir arbeiten in beiden Kontotypen und kennen ihre Unterschiede bei Katalog und Inhalten.",
        },
      ],
    },
    cta: "Wie sauber ist euer Katalog?",
  },

  /* ------------------------------------------------------------
     Software & Account Intelligence
     ------------------------------------------------------------ */
  software: {
    hero: {
      eyebrow: "Software",
      titelVor: "Amazon Software und Account Intelligence: ",
      titelEm: "alle Daten an einer Stelle.",
      lead: "Wir entwickeln eine Software, die Amazon-Daten aus Katalog, Werbung, Bestand und Account Health an einer Stelle zusammenführt. Sie ist in Entwicklung und noch nicht für Kunden freigeschaltet.",
      bildAlt: "Mehrere Auswertungen zu einer Übersicht zusammengeführt",
    },
    problem: {
      titel: "Die Daten liegen verteilt.",
      punkte: [
        "Katalog, Werbung und Bestand stehen in getrennten Oberflächen.",
        "Für jede Auswertung werden Zahlen zusammengesucht.",
        "Auffälligkeiten fallen erst auf, wenn jemand nachschaut.",
        "Änderungen an vielen Produkten kosten Tage.",
      ],
      bruecke: "Eine Plattform soll das an einer Stelle zusammenführen.",
    },
    kern: {
      eyebrow: "Geplanter Funktionsumfang",
      titel: "Was die Plattform können soll.",
      lead: "Die Funktionen folgen den Aufgaben, die wir in betreuten Konten täglich erledigen. Sie sollen unserem Team und unseren Kunden zeigen, was im Konto passiert, und die Arbeit darin steuern.",
      karten: [
        {
          titel: "Katalog und Content",
          unterzeile: "In Entwicklung",
          punkte: [
            "Produkte und Artikel anlegen und aktualisieren",
            "Content erstellen, verwalten und an Amazon übertragen",
            "Freigabe durch den Kunden vor der Übertragung",
          ],
        },
        {
          titel: "Advertising",
          unterzeile: "In Entwicklung",
          punkte: [
            "Kampagnen auswerten und anpassen",
            "Suchbegriffe und Gebote steuern",
            "Neue Kampagnen nach festem Namensschema anlegen",
          ],
        },
        {
          titel: "Margen und Reporting",
          unterzeile: "In Entwicklung",
          punkte: [
            "Marge je Produkt und Variante",
            "Umsatz, Kosten und Kennzahlen als Dashboard",
            "Search Query Report und Zeitraumvergleiche",
          ],
        },
        {
          titel: "Account Health und Bestand",
          unterzeile: "In Entwicklung",
          punkte: [
            "Listing-Status, Buy-Box und Preise im Blick",
            "Bestand und FBA mit Hinweisen bei Auffälligkeiten",
            "Übersicht über offene Fälle",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Datenfluss",
      titel: "So sollen die Daten in die Plattform kommen.",
      lead: "Der Weg ist so angelegt, dass Kunden jeden Schritt selbst erteilen und jederzeit entziehen können.",
      schritte: [
        {
          titel: "Autorisierung",
          unterzeile: "Durch den Kunden",
          text: "Der Kunde erteilt den Zugriff in seinem Amazon-Konto und legt fest, welche Daten freigegeben sind.",
        },
        {
          titel: "Abruf",
          unterzeile: "Selling Partner API",
          text: "Die Daten sollen über die Amazon Selling Partner API (SP-API) abgerufen werden, im Rahmen der von Amazon genehmigten Rollen.",
        },
        {
          titel: "Auswertung",
          unterzeile: "Je Konto getrennt",
          text: "Die Daten werden je Kunde getrennt ausgewertet und nur für die beauftragten Services genutzt.",
        },
        {
          titel: "Steuerung",
          unterzeile: "Durch unser Team",
          text: "Unser Team nutzt die Auswertung, um Maßnahmen im Konto zu planen und umzusetzen.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Stand und Datennutzung",
      titel: "In Entwicklung, nicht produktiv.",
      text: "Für autorisierte Kunden soll die Software Amazon-Daten ausschließlich verarbeiten, um die jeweils beauftragten Services und Funktionen bereitzustellen. Der Zugriff erfolgt auf Basis der vom Kunden erteilten Autorisierung und der von Amazon genehmigten Rollen und Berechtigungen. Derzeit ist keine Funktion für Kunden freigeschaltet.",
    },
    nutzen: {
      badge: "Ziel der Plattform",
      titel: "Eine Übersicht statt vieler Oberflächen.",
      punkte: [
        "Katalog, Werbung und Bestand an einer Stelle",
        "Auffälligkeiten melden sich, ihr müsst nicht suchen",
        "Freigaben und Änderungen laufen nachvollziehbar",
        "Unser Team arbeitet mit denselben Zahlen wie ihr",
      ],
    },
    expertise: {
      eyebrow: "Einordnung",
      titel: "Wie wir die Plattform sehen.",
      karten: [
        {
          titel: "Aus der Praxis gebaut",
          text: "Jede Funktion entsteht aus einer Aufgabe, die wir in betreuten Konten täglich erledigen.",
        },
        {
          titel: "Ergänzung, kein Ersatz",
          text: "Die Plattform unterstützt die Arbeit unseres Teams. Entscheidungen im Konto treffen weiter Menschen.",
        },
        {
          titel: "Schrittweise",
          text: "Funktionen werden einzeln freigeschaltet, sobald sie fertig sind. Bis dahin arbeiten wir in den bestehenden Werkzeugen.",
        },
      ],
    },
    cta: "Welche Zahlen fehlen euch im Alltag?",
  },

  /* ------------------------------------------------------------
     Analytics & Reporting
     ------------------------------------------------------------ */
  reporting: {
    hero: {
      eyebrow: "Analytics & Reporting",
      titelVor: "Amazon Analytics und Reporting: ",
      titelEm: "Zahlen, die ihr in fünf Minuten versteht.",
      lead: "Umsatz, Deckungsbeitrag, TACoS, Search Query Report und Werbedaten aus Seller Central und Vendor Central, aufbereitet und eingeordnet. Ihr bekommt, worauf es ankommt, und dazu, was wir als Nächstes tun.",
      bildAlt: "Ein schwebendes Dashboard mit steigender Kurve, Balken und zwei Kennzahlkarten",
    },
    problem: {
      titel: "Viele Zahlen, wenige Antworten.",
      punkte: [
        "Berichte liegen in fünf Oberflächen, keine zeigt das ganze Bild.",
        "Der Umsatz steigt, was davon übrig bleibt, sagt niemand.",
        "Kennzahlen widersprechen sich je nach Quelle.",
        "Der Monatsbericht erklärt, was war, nicht was zu tun ist.",
      ],
      bruecke: "Ein Report muss drei Fragen beantworten.",
    },
    kern: {
      eyebrow: "Auswertungen",
      titel: "Was wir für euch auswerten.",
      lead: "Kein Datenexport zum Selbstauswerten. Ihr bekommt die Zahlen, auf die es ankommt, und dazu unsere Einordnung.",
      karten: [
        {
          titel: "Verkauf und Marge",
          unterzeile: "Was bleibt, nicht nur was kommt",
          punkte: [
            "Umsatz, Bestellungen und Deckungsbeitrag je Produktgruppe",
            "Marge je Produkt nach Gebühren, FBA und Wareneinsatz",
            "Business Reports mit Sitzungen und Conversion",
            "Vergleich mit Vormonat und Vorjahr",
          ],
        },
        {
          titel: "Werbung",
          unterzeile: "ACoS und TACoS im Zusammenhang",
          punkte: [
            "ACoS und TACoS je Kampagne und Produkt",
            "Suchbegriffe, Platzierungen und Budgets",
            "Anteil der Werbung am Umsatz",
            "Wirkung einzelner Änderungen im Vorher-Nachher-Vergleich",
          ],
        },
        {
          titel: "Suche und Markt",
          unterzeile: "Wo ihr gegenüber dem Markt steht",
          punkte: [
            "Search Query Report: Klickrate und Conversion gegen den Markt",
            "Rankings und Suchvolumen der wichtigsten Keywords",
            "Share of Voice gegenüber den Wettbewerbern",
          ],
        },
        {
          titel: "Account und Bestand",
          unterzeile: "Was den Verkauf bremsen kann",
          punkte: [
            "Account Health und Buy-Box-Anteil",
            "Bestand, Reichweite und FBA-Gebühren",
            "Retouren und Gründe",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Der Report",
      titel: "Drei Fragen, eine Besprechung.",
      lead: "Ein Report, den eine Geschäftsführung liest, beantwortet nicht nur, was passiert ist. Er sagt auch, warum und was jetzt folgt.",
      schritte: [
        {
          titel: "Was der Monat gebracht hat",
          unterzeile: "Zahlen im Vergleich",
          text: "Umsatz, Deckungsbeitrag und TACoS je Produktgruppe, gegen den Vormonat und gegen das Vorjahr.",
        },
        {
          titel: "Woran es lag",
          unterzeile: "Ursache statt Symptom",
          text: "Welche Änderung welchen Ausschlag verursacht hat, dazu was der Wettbewerb im selben Zeitraum gemacht hat.",
        },
        {
          titel: "Was als Nächstes ansteht",
          unterzeile: "Drei Maßnahmen",
          text: "Die drei Maßnahmen für den kommenden Monat, mit erwartetem Effekt und dem, was wir dafür von euch brauchen.",
        },
        {
          titel: "Besprechung",
          unterzeile: "Mit euch",
          text: "Wir gehen den Report gemeinsam durch und legen die Reihenfolge der nächsten Schritte fest.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Eine Zahl für alle",
      titel: "Eine Zahl gilt für alle.",
      text: "Was ein Produkt verdient, steht nicht dreimal verschieden im Raum. Strategie, Content und Werbung rechnen mit derselben Marge, damit Entscheidungen auf demselben Stand beruhen.",
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Entscheidungen auf einer Grundlage.",
      punkte: [
        "Ihr seht Marge, nicht nur Umsatz",
        "Ursachen sind benannt, nicht nur Ausschläge",
        "Die nächsten Schritte stehen im Report",
        "Nichts müsst ihr selbst zusammensuchen",
      ],
    },
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Was dahintersteht.",
      karten: [
        { titel: "Ø +30 %", text: "durchschnittliche Steigerung der Profitabilität in betreuten Konten." },
        { titel: "21 Mio. EUR", text: "betreuter Amazon-Jahresumsatz, der in dieser Form ausgewertet wird." },
        { titel: "60+ Marken", text: "mit einheitlichem Reporting, vergleichbar über Produkte und Marktplätze." },
      ],
    },
    cta: "Welche Zahl fehlt euch für die nächste Entscheidung?",
  },
};

export const diensteEn: DiensteWoerter = {
  fba: {
    hero: {
      eyebrow: "FBA & inventory",
      titelVor: "Amazon FBA and inventory management: ",
      titelEm: "stock and shipments under control.",
      lead: "We plan shipments, monitor stock and fees, and handle cases with Amazon, for brands in Seller Central and Vendor Central. The work happens in the account, not in the warehouse.",
      bildAlt: "Stock level, shipment plan and fee overview side by side",
    },
    problem: {
      titel: "Stock is revenue, and it is often looked at too late.",
      punkte: [
        "A bestseller runs out and the ranking drops with it.",
        "Overstock ties up capital and costs storage fees.",
        "A shipment sits at goods receipt and nobody follows up.",
        "Fee deviations only show up at the monthly close.",
      ],
      bruecke: "We see it earlier and act in the account.",
    },
    kern: {
      eyebrow: "Services",
      titel: "What we handle in FBA and inventory, day by day.",
      lead: "Stock, shipments and fees come together in the account. We keep an eye on them and step in before an item runs out or a mistake costs money.",
      karten: [
        {
          titel: "Monitor stock",
          unterzeile: "Watched daily",
          punkte: [
            "FBA inventory monitoring per item and marketplace",
            "Coverage analysis and stockout monitoring",
            "Inventory health, overstock and slow movers",
            "Stock deviations between account and warehouse",
          ],
        },
        {
          titel: "Plan shipments",
          unterzeile: "From shipment plan to goods receipt",
          punkte: [
            "Create and submit shipment plans in Seller Central",
            "Shipping templates with dimensions, weight and packaging type",
            "Inbound shipment monitoring and shipment status",
            "Detect and resolve stranded inventory",
          ],
        },
        {
          titel: "Steer replenishment and costs",
          unterzeile: "Coverage, lead time, fees",
          punkte: [
            "Replenishment planning by coverage and lead time",
            "FBA or FBM decision per item",
            "FBA fee monitoring and fee deviations",
            "Monitoring of FBA availability",
          ],
        },
        {
          titel: "Handle cases with Amazon",
          unterzeile: "Until a decision",
          punkte: [
            "Open cases for goods receipt and quantity deviations",
            "Follow up and escalate when Amazon does not respond",
            "Support with digital FBA shipment processes",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Process",
      titel: "How the steering works.",
      lead: "First the stock review, then fixed rules, then day-to-day operation with a monthly report.",
      schritte: [
        {
          titel: "Stock review",
          unterzeile: "Reconcile account and warehouse",
          text: "We read stock, coverage and fees per item and reconcile them with your warehouse.",
        },
        {
          titel: "Set the rules",
          unterzeile: "Replenishment and shipping route",
          text: "For each item it is set when to reorder and whether FBA or FBM leaves more margin.",
        },
        {
          titel: "Daily operation",
          unterzeile: "Shipments and monitoring",
          text: "Shipment plans, status checks and deviations run on a fixed rhythm, and we see cases with Amazon through to the end.",
        },
        {
          titel: "Feedback",
          unterzeile: "Monthly report",
          text: "You get the numbers and the next steps, so reorders are not decided by gut feeling.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Scope",
      titel: "What we do not do.",
      text: "Physical work on the goods is not part of our services: no labelling, packing or bundling and no quality control in the warehouse. That stays with your warehouse or prep partner. We steer FBA and inventory digitally and operationally in the Amazon account.",
    },
    nutzen: {
      badge: "What you get",
      titel: "Fewer gaps on the shelf.",
      punkte: [
        "No bestseller runs out",
        "Storage costs for slow movers stay small",
        "Shipments arrive with consistent data",
        "Fee deviations show up before they add up",
      ],
    },
    expertise: {
      eyebrow: "Experience",
      titel: "What stands behind it.",
      karten: [
        { titel: "60+ brands", text: "managed, in Seller Central and in Vendor Central." },
        {
          titel: "5+ marketplaces",
          text: "Demand, lead time and fees differ by market, so we plan stock per marketplace.",
        },
        {
          titel: "EUR 21 million",
          text: "managed annual Amazon revenue across all services, with stock and availability steered along with it.",
        },
      ],
    },
    cta: "How long does your stock really last?",
  },

  katalog: {
    hero: {
      eyebrow: "Catalog & listing management",
      titelVor: "Amazon catalog and listing management: ",
      titelEm: "set up cleanly, maintained continuously.",
      lead: "We maintain new products, variations and changes in the catalog down to the last attribute: titles, bullet points, backend search terms, images and variations, for Seller Central and Vendor Central.",
      bildAlt: "A product line with one item highlighted, linked to an analysis",
    },
    problem: {
      titel: "A catalog that grew instead of being planned.",
      punkte: [
        "Required fields are missing, so the product drops out of filters and search results.",
        "Variations stand alone and reviews are spread thin.",
        "Duplicates and wrongly merged offers stay in place.",
        "Changes are made by hand, and for hundreds of items that takes weeks.",
      ],
      bruecke: "We clean it up and keep the catalog clean.",
    },
    kern: {
      eyebrow: "Services",
      titel: "What we handle in the catalog.",
      lead: "Much of what decides whether a product can be found sits in fields that never appear on the detail page. We maintain them across your whole range.",
      karten: [
        {
          titel: "Create products",
          unterzeile: "Right from the first ASIN",
          punkte: [
            "Create new products and variations, also without an ASIN via EAN or GTIN",
            "Attributes and required fields per category and product type",
            "Parent-child relationships and variation themes",
          ],
        },
        {
          titel: "Maintain content",
          unterzeile: "Findability and conversion",
          punkte: [
            "Titles, bullet points and description according to Amazon's rules",
            "Backend search terms: synonyms, spellings, typos",
            "Main image, listing images, A+ Content and Brand Store",
            "Localization for further marketplaces",
          ],
        },
        {
          titel: "Clean up the catalog",
          unterzeile: "Duplicates, dead ASINs, wrong assignments",
          punkte: [
            "Detect and report catalog errors and duplicates",
            "Correct wrongly merged offers and variations",
            "Check listing status, suppressed and inactive offers",
          ],
        },
        {
          titel: "Bulk maintenance",
          unterzeile: "Hundreds of items at once",
          punkte: [
            "Flat files and uploads instead of manual work",
            "Price, attribute and image changes in one block",
            "Check processing reports and fix errors",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Process",
      titel: "From the current state to a maintained catalog.",
      lead: "We start with what the account holds today and end with a catalog that can be changed in bundles.",
      schritte: [
        {
          titel: "Read the current state",
          unterzeile: "Catalog and listing status",
          text: "We pull attributes, variations and status per ASIN and mark gaps, duplicates and wrong assignments.",
        },
        {
          titel: "Set the templates",
          unterzeile: "Required fields per product type",
          text: "For each product type it is set which data is needed and where it comes from.",
        },
        {
          titel: "Create and change",
          unterzeile: "Individually or by flat file",
          text: "New products start clean, changes run in bundles through uploads.",
        },
        {
          titel: "Check and maintain",
          unterzeile: "Ongoing control",
          text: "Processing reports and listing status are checked, so errors do not quietly cost visibility.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "How it fits together",
      titel: "Catalog and content belong together.",
      text: "The content itself, meaning images, texts, A+ Content and Brand Story, is created in product images & SEO. This page is about the foundation underneath: structure, attributes and maintenance.",
    },
    nutzen: {
      badge: "What you get",
      titel: "Products that get found.",
      punkte: [
        "Products appear in filters and search results",
        "Variations collect reviews in one place",
        "Changes run in bundles instead of one by one",
        "Fewer rejections and queries from Amazon",
      ],
    },
    expertise: {
      eyebrow: "Experience",
      titel: "What stands behind it.",
      karten: [
        { titel: "60+ brands", text: "managed, from product creation to ongoing maintenance." },
        {
          titel: "Flat files in daily work",
          text: "Bulk changes and new listings run through uploads, with processing reports checked.",
        },
        {
          titel: "Seller Central and Vendor Central",
          text: "We work in both account types and know their differences in catalog and content.",
        },
      ],
    },
    cta: "How clean is your catalog?",
  },

  software: {
    hero: {
      eyebrow: "Software",
      titelVor: "Amazon software and account intelligence: ",
      titelEm: "all data in one place.",
      lead: "We are developing software that brings Amazon data from catalog, advertising, stock and account health into one place. It is in development and not yet available to customers.",
      bildAlt: "Several analyses merged into a single overview",
    },
    problem: {
      titel: "The data is scattered.",
      punkte: [
        "Catalog, advertising and stock sit in separate interfaces.",
        "Every analysis means gathering numbers first.",
        "Anomalies are only noticed when someone looks.",
        "Changes across many products cost days.",
      ],
      bruecke: "A platform is meant to bring this together in one place.",
    },
    kern: {
      eyebrow: "Planned scope",
      titel: "What the platform is meant to do.",
      lead: "The functions follow the tasks we handle in managed accounts every day. They are meant to show our team and our customers what is happening in the account, and to steer the work in it.",
      karten: [
        {
          titel: "Catalog and content",
          unterzeile: "In development",
          punkte: [
            "Create and update products and items",
            "Create, manage and transfer content to Amazon",
            "Customer approval before the transfer",
          ],
        },
        {
          titel: "Advertising",
          unterzeile: "In development",
          punkte: [
            "Analyze and adjust campaigns",
            "Steer search terms and bids",
            "Create new campaigns following a fixed naming scheme",
          ],
        },
        {
          titel: "Margins and reporting",
          unterzeile: "In development",
          punkte: [
            "Margin per product and variation",
            "Revenue, costs and metrics as a dashboard",
            "Search Query Report and period comparisons",
          ],
        },
        {
          titel: "Account health and stock",
          unterzeile: "In development",
          punkte: [
            "Listing status, Buy Box and prices at a glance",
            "Stock and FBA with alerts on anomalies",
            "Overview of open cases",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Data flow",
      titel: "How data is meant to reach the platform.",
      lead: "The path is designed so that customers grant each step themselves and can withdraw it at any time.",
      schritte: [
        {
          titel: "Authorization",
          unterzeile: "By the customer",
          text: "The customer grants access in their Amazon account and decides which data is shared.",
        },
        {
          titel: "Retrieval",
          unterzeile: "Selling Partner API",
          text: "The data is meant to be retrieved through the Amazon Selling Partner API (SP-API), within the roles approved by Amazon.",
        },
        {
          titel: "Analysis",
          unterzeile: "Separate per account",
          text: "Data is analyzed separately per customer and used only for the services that were ordered.",
        },
        {
          titel: "Steering",
          unterzeile: "By our team",
          text: "Our team uses the analysis to plan and carry out measures in the account.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Status and data use",
      titel: "In development, not live.",
      text: "For authorized customers, the software is meant to process Amazon data solely to provide the services and functions that were ordered. Access is based on the authorization granted by the customer and on the roles and permissions approved by Amazon. At present, no function is available to customers.",
    },
    nutzen: {
      badge: "Goal of the platform",
      titel: "One overview instead of many interfaces.",
      punkte: [
        "Catalog, advertising and stock in one place",
        "Anomalies report themselves, you do not have to search",
        "Approvals and changes stay traceable",
        "Our team works with the same numbers you see",
      ],
    },
    expertise: {
      eyebrow: "Perspective",
      titel: "How we see the platform.",
      karten: [
        {
          titel: "Built from practice",
          text: "Every function starts with a task we handle in managed accounts every day.",
        },
        {
          titel: "A supplement, not a replacement",
          text: "The platform supports our team's work. People still make the decisions in the account.",
        },
        {
          titel: "Step by step",
          text: "Functions are released one at a time, once they are ready. Until then we work in the existing tools.",
        },
      ],
    },
    cta: "Which numbers are you missing day to day?",
  },

  reporting: {
    hero: {
      eyebrow: "Analytics & reporting",
      titelVor: "Amazon analytics and reporting: ",
      titelEm: "numbers you understand in five minutes.",
      lead: "Revenue, contribution margin, TACoS, Search Query Report and advertising data from Seller Central and Vendor Central, prepared and put in context. You get what matters, and what we do next.",
      bildAlt: "A floating dashboard with a rising curve, bars and two metric cards",
    },
    problem: {
      titel: "Many numbers, few answers.",
      punkte: [
        "Reports sit in five interfaces, none shows the full picture.",
        "Revenue rises, but nobody says what is left of it.",
        "Metrics contradict each other depending on the source.",
        "The monthly report explains what was, not what to do.",
      ],
      bruecke: "A report has to answer three questions.",
    },
    kern: {
      eyebrow: "Analyses",
      titel: "What we analyze for you.",
      lead: "No data export to evaluate yourself. You get the numbers that matter, together with our assessment.",
      karten: [
        {
          titel: "Sales and margin",
          unterzeile: "What is left, not just what comes in",
          punkte: [
            "Revenue, orders and contribution margin per product group",
            "Margin per product after fees, FBA and cost of goods",
            "Business reports with sessions and conversion",
            "Comparison with the previous month and year",
          ],
        },
        {
          titel: "Advertising",
          unterzeile: "ACoS and TACoS in context",
          punkte: [
            "ACoS and TACoS per campaign and product",
            "Search terms, placements and budgets",
            "Share of advertising in revenue",
            "Effect of individual changes in a before-and-after comparison",
          ],
        },
        {
          titel: "Search and market",
          unterzeile: "Where you stand against the market",
          punkte: [
            "Search Query Report: click rate and conversion against the market",
            "Rankings and search volume of the most important keywords",
            "Share of voice compared with competitors",
          ],
        },
        {
          titel: "Account and stock",
          unterzeile: "What can slow down sales",
          punkte: [
            "Account health and Buy Box share",
            "Stock, coverage and FBA fees",
            "Returns and their reasons",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "The report",
      titel: "Three questions, one meeting.",
      lead: "A report that management reads does not only answer what happened. It also says why and what follows.",
      schritte: [
        {
          titel: "What the month brought",
          unterzeile: "Numbers compared",
          text: "Revenue, contribution margin and TACoS per product group, against the previous month and the previous year.",
        },
        {
          titel: "What caused it",
          unterzeile: "Cause, not symptom",
          text: "Which change caused which swing, and what the competition did in the same period.",
        },
        {
          titel: "What comes next",
          unterzeile: "Three measures",
          text: "The three measures for the coming month, with expected effect and what we need from you.",
        },
        {
          titel: "Meeting",
          unterzeile: "With you",
          text: "We go through the report together and set the order of the next steps.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "One number for everyone",
      titel: "One number applies to everyone.",
      text: "What a product earns is not stated three different ways. Strategy, content and advertising work with the same margin, so decisions rest on the same basis.",
    },
    nutzen: {
      badge: "What you get",
      titel: "Decisions on one basis.",
      punkte: [
        "You see margin, not only revenue",
        "Causes are named, not just swings",
        "The next steps are in the report",
        "You do not have to collect anything yourself",
      ],
    },
    expertise: {
      eyebrow: "Experience",
      titel: "What stands behind it.",
      karten: [
        { titel: "Ø +30 %", text: "average increase in profitability across managed accounts." },
        { titel: "EUR 21 million", text: "managed annual Amazon revenue, analyzed in this form." },
        { titel: "60+ brands", text: "with consistent reporting, comparable across products and marketplaces." },
      ],
    },
    cta: "Which number are you missing for the next decision?",
  },
};
