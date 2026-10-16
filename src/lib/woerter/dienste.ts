/* ============================================================
   Die drei Leistungsseiten, die aus dem Account Management und der
   Full-Service-Seite herausgewachsen sind: FBA & Inventory, Katalog &
   Listing Management, Analytics & Reporting.

   Sie teilen einen Aufbau (`DienstBody`), deshalb teilen sie auch die Form
   der Copy. Die Texte stehen hier und nicht in de.ts / en.ts, weil beide
   Dateien schon sehr lang sind; eingebunden werden sie dort unter
   `leistungen.dienste`.

   Grundsaetze, die fuer diese Seiten gelten:
   - Es steht nur, was wir tun oder was ausdruecklich als „in Entwicklung"
     gekennzeichnet ist. Keine Zertifikate, keine erfundenen Zahlen.
   - Wir bereiten keine Ware physisch vor.
   - Jeder Fachbegriff wird beim ersten Auftreten erklaert, und jede
     Ankuendigung („drei Fragen") wird im selben Absatz aufgeloest. Eine
     Brueckenzeile, die auf etwas verweist, das vier Sektionen spaeter
     steht, liest sich wie ein Text ohne Inhalt.
   - Der Einstieg und die FAQ tragen die Suchbegriffe der Seite im
     Fliesstext. Die FAQ geht als FAQPage in die strukturierten Daten, die
     Texte stehen deshalb nur hier und werden an beiden Stellen gelesen.
   ============================================================ */

export type Dienst = {
  hero: { eyebrow: string; titelVor: string; titelEm: string; lead: string; bildAlt: string };
  /* Kurz erklaert: ein Lead aus hoechstens zwei Saetzen und drei bis vier
     Begriffskacheln. Frueher standen hier drei Absaetze Fliesstext, und die
     Seite las sich wie ein Blogbeitrag. */
  einstieg: { eyebrow: string; titel: string; lead: string; begriffe: { begriff: string; text: string }[] };
  problem: { titel: string; punkte: string[]; bruecke: string };
  kern: {
    eyebrow: string;
    titel: string;
    lead: string;
    karten: { titel: string; unterzeile: string; text: string; punkte: string[] }[];
  };
  /* `ablauf` nur, wenn ein Schritt aus dem anderen folgt. Sind es drei
     Fragen oder drei Teile, die nebeneinander stehen, ist es `spalten`.
     `zusatz` ist, was sich wiederholt oder dazukommt (zum Beispiel der
     Monatsbericht): ein eigener Streifen, kein weiterer Schritt. */
  vorgehen: {
    art: "ablauf" | "spalten";
    eyebrow: string;
    titel: string;
    lead: string;
    schritte: { titel: string; unterzeile: string; text: string }[];
    zusatz?: { titel: string; text: string };
  };
  grenzen: {
    eyebrow: string;
    titel: string;
    ja: { titel: string; punkte: string[] };
    nein: { titel: string; punkte: string[] };
    link?: { text: string; href: string };
  };
  nutzen: { badge: string; titel: string; punkte: string[] };
  faq: { eyebrow: string; titel: string; fragen: { frage: string; antwort: string }[] };
  cta: string;
};

export type DiensteWoerter = {
  fba: Dienst;
  katalog: Dienst;
  reporting: Dienst;
};

export const diensteDe: DiensteWoerter = {
  /* ------------------------------------------------------------
     FBA & Inventory Management
     ------------------------------------------------------------ */
  fba: {
    hero: {
      eyebrow: "FBA & Inventory",
      titelVor: "Amazon FBA Bestandsplanung und Inventory Management: ",
      titelEm: "Ware lieferbar, Gebühren unter Kontrolle.",
      lead: "Wir planen eure FBA-Sendungen, berechnen die Reichweite je Artikel und überwachen Bestand und Gebühren im Amazon-Konto, für Seller Central und Vendor Central. Kein Bestseller läuft leer, kein Ladenhüter bindet Kapital. Die Arbeit findet im Konto statt, nicht im Lager.",
      bildAlt: "Bestandsanzeige, Sendungsplan und Gebührenübersicht nebeneinander",
    },
    einstieg: {
      eyebrow: "Kurz erklärt",
      titel: "FBA Bestandsplanung heißt: rechtzeitig nachbestellen, nicht zu viel einlagern",
      lead: "Ist ein Artikel nicht lieferbar, verkauft er nicht und fällt im Ranking zurück. Liegt zu viel im Amazon-Lager, kostet das Gebühren und bindet Kapital.",
      begriffe: [
        { begriff: "Reichweite", text: "Die Zahl der Tage, die der Bestand bei der aktuellen Verkaufsgeschwindigkeit reicht." },
        { begriff: "Stockout", text: "Der Lieferengpass: Der Artikel ist nicht mehr bestellbar und das Ranking leidet." },
        { begriff: "Stranded Inventory", text: "Ware im Amazon-Lager ohne aktives Angebot, etwa nach einem unterdrückten Listing." },
        { begriff: "FBM", text: "Fulfillment by Merchant: Ihr versendet selbst, statt Amazon die Auslieferung zu überlassen." },
      ],
    },
    problem: {
      titel: "Bestand wird meist erst betrachtet, wenn schon etwas schiefgelaufen ist.",
      punkte: [
        "Ein Bestseller läuft leer. Mit ihm fällt das Ranking.",
        "Überbestand bindet Kapital und kostet Lagergebühren.",
        "Eine Sendung steht im Wareneingang still. Niemand fragt bei Amazon nach.",
        "Gebührenabweichungen fallen erst im Monatsabschluss auf, wenn sie sich schon summiert haben.",
      ],
      bruecke: "Wir prüfen Bestand, Sendungen und Gebühren laufend und greifen ein, bevor daraus ein Verlust wird.",
    },
    kern: {
      eyebrow: "Leistungen",
      titel: "Was wir bei FBA und Inventory Management übernehmen",
      lead: "Vier Aufgaben, die im FBA-Betrieb Umsatz oder Geld kosten, wenn sie liegen bleiben.",
      karten: [
        {
          titel: "Bestand überwachen",
          unterzeile: "Reichweite und Verfügbarkeit je Artikel",
          text: "Wir berechnen die Reichweite je Artikel und Marktplatz und melden, wenn ein Artikel auf den Stockout zuläuft.",
          punkte: [
            "Stockout-Warnung vor dem Lieferengpass",
            "Überbestand und Langsamdreher erkennen",
            "Abweichungen zwischen Konto und Lager klären",
          ],
        },
        {
          titel: "Sendungen planen",
          unterzeile: "Vom Sendungsplan bis zum Wareneingang",
          text: "Wir legen den Sendungsplan in Seller Central an und verfolgen die Sendung bis zum Wareneingang.",
          punkte: [
            "Sendungspläne und Versandvorlagen pflegen",
            "Sendungsstatus überwachen",
            "Stranded Inventory auflösen",
          ],
        },
        {
          titel: "Nachschub und Kosten steuern",
          unterzeile: "Reichweite, Vorlaufzeit, Gebühren",
          text: "Aus Reichweite und Vorlaufzeit ergibt sich der Nachbestellpunkt, die Gebühren behalten wir je Artikel im Blick.",
          punkte: [
            "Nachbestellpunkt je Artikel festlegen",
            "FBA oder FBM je Artikel rechnen",
            "Gebührenabweichungen melden",
          ],
        },
        {
          titel: "Fälle bei Amazon führen",
          unterzeile: "Bis zur Entscheidung",
          text: "Fehlen nach dem Wareneingang Einheiten, eröffnen wir den Fall und halten nach, bis Amazon entschieden hat.",
          punkte: [
            "Fälle zu Mengenabweichungen eröffnen",
            "Nachweise einreichen, Fristen halten",
            "Bei ausbleibender Antwort eskalieren",
          ],
        },
      ],
    },
    vorgehen: {
      art: "ablauf",
      eyebrow: "Ablauf",
      titel: "In drei Schritten zur laufenden Bestandssteuerung",
      lead: "Erst die Bestandsaufnahme, dann feste Regeln, dann der laufende Betrieb.",
      schritte: [
        { titel: "Bestandsaufnahme", unterzeile: "Konto und Lager abgleichen", text: "Wir lesen Bestand, Reichweite und Gebühren je Artikel aus und vergleichen sie mit eurem Lager. Abweichungen und Ladenhüter sind danach benannt." },
        { titel: "Regeln festlegen", unterzeile: "Nachbestellpunkt und Versandweg", text: "Je Artikel steht fest, bei welcher Reichweite nachbestellt wird und ob FBA oder FBM mehr Marge lässt." },
        { titel: "Laufender Betrieb", unterzeile: "Sendungen und Monitoring", text: "Wir legen Sendungspläne an, prüfen den Status und melden Abweichungen im festen Rhythmus." },
      ],
      zusatz: { titel: "Jeden Monat", text: "Ihr bekommt die Reichweiten, die Gebühren und eine Liste der Artikel, bei denen nachbestellt oder abverkauft werden sollte. Die Bestellmenge entscheidet ihr." },
    },
    grenzen: {
      eyebrow: "Abgrenzung",
      titel: "Digital im Konto, nicht im Lager",
      ja: { titel: "Das übernehmen wir", punkte: [
        "Sendungen planen und verfolgen",
        "Bestand, Reichweite und Gebühren überwachen",
        "Fälle bei Amazon führen",
      ] },
      nein: { titel: "Das bleibt bei euch oder Dritten", punkte: [
        "Etikettieren, Verpacken und Bündeln",
        "Qualitätskontrolle im Lager",
        "Die Entscheidung über die Bestellmenge",
      ] },
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Verfügbare Ware und kleinere Lagerkosten.",
      punkte: [
        "Bestseller bleiben lieferbar",
        "Ladenhüter binden weniger Kapital",
        "Sendungen kommen mit stimmigen Angaben im Lager an",
        "Gebührenabweichungen fallen auf, bevor sie sich summieren",
      ],
    },
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu FBA und Inventory Management",
      fragen: [
        { frage: "Was bedeutet Reichweite bei FBA?", antwort: "Die Reichweite zeigt, für wie viele Tage der Bestand bei der aktuellen Verkaufsgeschwindigkeit reicht: Bestand geteilt durch den durchschnittlichen Tagesverkauf. Zusammen mit der Vorlaufzeit bestimmt sie, wann nachbestellt wird." },
        { frage: "Was ist Stranded Inventory?", antwort: "So nennt Amazon Ware im Lager, zu der es kein aktives Angebot gibt, etwa nach einem unterdrückten Listing. Sie verursacht Lagerkosten und ist nicht bestellbar. Wir stellen das Angebot wieder her oder lösen einen Entfernungsauftrag aus." },
        { frage: "Bereitet ihr Ware für Amazon vor, zum Beispiel mit Etiketten?", antwort: "Nein. Etikettieren, Verpacken und Bündeln bleiben bei eurem Lager oder Prep-Partner. Wir planen die Sendung im Konto, überwachen den Status und führen Fälle bei Amazon." },
        { frage: "Arbeitet ihr in Seller Central und in Vendor Central?", antwort: "Ja, in beiden. In Seller Central steuert die Marke Bestand und Sendungen selbst, in Vendor Central bestellt Amazon bei euch nach. Wir planen für beide Wege." },
        { frage: "Was kostet es, wenn ein beworbener Artikel nicht lieferbar ist?", antwort: "Ihr bezahlt Klicks, die nicht zum Kauf führen können. Wir stimmen Bestand und Kampagnen aufeinander ab, damit das Budget nur dort läuft, wo Ware verfügbar ist." },
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
      titelVor: "Amazon Katalogpflege und Listing Management: ",
      titelEm: "sauber angelegt, laufend gepflegt.",
      lead: "Wir legen Produkte und Varianten im Amazon-Katalog an und halten sie aktuell: Attribute, Pflichtfelder, Backend-Suchbegriffe, Bilder und Variantenstruktur, für Seller Central und Vendor Central. Neue Produkte starten vollständig, bestehende Listings werden gebündelt gepflegt.",
      bildAlt: "Produktreihe mit hervorgehobenem Artikel, verbunden mit einer Auswertung",
    },
    einstieg: {
      eyebrow: "Kurz erklärt",
      titel: "Was Katalogpflege auf Amazon leistet",
      lead: "Hinter jeder Produktseite liegen Dutzende Felder, die Amazon Attribute nennt. Die Katalogpflege hält sie vollständig und richtig, denn davon hängt ab, ob ein Produkt in Filtern erscheint und ob Amazon es freischaltet.",
      begriffe: [
        { begriff: "Attribute", text: "Angaben wie Marke, Material, Größe und Farbe. Welche Pflicht sind, hängt von der Kategorie ab." },
        { begriff: "Parent-Child", text: "Eine Variantenfamilie: Der Parent ist die gemeinsame Produktseite, die Children sind Farben oder Größen." },
        { begriff: "Flat File", text: "Eine Tabellenvorlage, mit der sich viele Produkte auf einmal anlegen oder ändern lassen." },
        { begriff: "Backend-Suchbegriffe", text: "Ein Feld, das Kunden nicht sehen. Dort stehen Synonyme und Schreibweisen, die im Text keinen Platz haben." },
      ],
    },
    problem: {
      titel: "Ein Katalog, der gewachsen ist, statt geplant zu werden.",
      punkte: [
        "Pflichtfelder fehlen. Das Produkt fällt aus Filtern und Suchergebnissen.",
        "Varianten stehen einzeln. Die Bewertungen verteilen sich auf mehrere Seiten.",
        "Dubletten und falsch zusammengeführte Angebote bleiben bestehen.",
        "Änderungen laufen von Hand. Bei hunderten Artikeln dauert das Wochen.",
      ],
      bruecke: "Wir bereinigen den Katalog einmal gründlich und pflegen ihn danach laufend.",
    },
    kern: {
      eyebrow: "Leistungen",
      titel: "Was wir im Katalog übernehmen",
      lead: "Vier Aufgaben, vom ersten Produkt bis zur Pflege hunderter Artikel.",
      karten: [
        {
          titel: "Produkte anlegen",
          unterzeile: "Von der ersten ASIN an richtig",
          text: "Neue Produkte entstehen mit allen Pflichtangaben, auch ohne ASIN über EAN oder GTIN.",
          punkte: [
            "Produkte und Varianten anlegen",
            "Pflichtattribute je Kategorie erfassen",
            "Parent-Child-Familie festlegen",
          ],
        },
        {
          titel: "Inhalte pflegen",
          unterzeile: "Auffindbarkeit und Conversion",
          text: "Titel, Bullet Points und Beschreibung folgen Amazons Vorgaben, in die Backend-Suchbegriffe kommen Synonyme und Schreibweisen.",
          punkte: [
            "Titel, Bullets und Beschreibung pflegen",
            "Backend-Suchbegriffe pflegen",
            "Inhalte für weitere Marktplätze lokalisieren",
          ],
        },
        {
          titel: "Katalog bereinigen",
          unterzeile: "Dubletten, Fehlzuordnungen, Listing-Status",
          text: "Wir erfassen doppelte ASINs, falsch zugeordnete Angebote und unterdrückte Listings und melden Katalogfehler an Amazon.",
          punkte: [
            "Dubletten erkennen und melden",
            "Falsche Zuordnungen korrigieren",
            "Unterdrückte Angebote reaktivieren",
          ],
        },
        {
          titel: "Massenpflege",
          unterzeile: "Hunderte Artikel auf einmal",
          text: "Mit einem Flat File ändern wir Preise, Attribute oder Bilder für viele Artikel in einem Durchgang.",
          punkte: [
            "Neuanlagen und Änderungen per Flat File",
            "Verarbeitungsberichte prüfen",
            "Fehler beheben und neu hochladen",
          ],
        },
      ],
    },
    vorgehen: {
      art: "ablauf",
      eyebrow: "Ablauf",
      titel: "Vom Ist-Zustand zum gepflegten Katalog",
      lead: "Wir beginnen mit dem, was heute im Konto steht.",
      schritte: [
        { titel: "Ist-Zustand lesen", unterzeile: "Katalog und Listing-Status", text: "Wir lesen Attribute, Varianten und Status je ASIN aus und markieren Lücken, Dubletten und Fehlzuordnungen." },
        { titel: "Vorlagen festlegen", unterzeile: "Pflichtfelder je Produkttyp", text: "Je Produkttyp steht fest, welche Angaben nötig sind und woher sie kommen, etwa aus euren Produktdaten." },
        { titel: "Anlegen und ändern", unterzeile: "Einzeln oder per Flat File", text: "Neue Produkte starten vollständig. Änderungen an vielen Artikeln gehen gebündelt live, an einem Tag." },
        { titel: "Prüfen und halten", unterzeile: "Laufende Kontrolle", text: "Nach jedem Upload lesen wir den Verarbeitungsbericht und beheben Fehler. Den Listing-Status prüfen wir weiter." },
      ],
    },
    grenzen: {
      eyebrow: "Zusammenspiel",
      titel: "Die Struktur liegt hier, die Inhalte bei Produktbilder & SEO",
      ja: { titel: "Das übernehmen wir", punkte: [
        "Struktur, Attribute und Varianten",
        "Uploads und Verarbeitungsberichte",
        "Listing-Status und Katalogfehler",
      ] },
      nein: { titel: "Das gehört zu Produktbilder & SEO", punkte: [
        "Hauptbild und Listingbilder",
        "Texte, A+ Content und Brand Story",
        "Keyword-Recherche für Titel und Bullets",
      ] },
      link: { text: "Produktbilder & SEO ansehen", href: "/leistungen/listing-seo" },
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Produkte, die gefunden und freigeschaltet werden.",
      punkte: [
        "Produkte erscheinen in Filtern und Suchergebnissen",
        "Varianten sammeln Bewertungen an einer Stelle",
        "Änderungen laufen gebündelt statt einzeln",
        "Weniger Ablehnungen und Rückfragen von Amazon",
      ],
    },
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu Katalogpflege und Listing Management",
      fragen: [
        { frage: "Was ist ein Flat File bei Amazon?", antwort: "Ein Flat File ist eine Tabellenvorlage, in der jede Zeile ein Produkt und jede Spalte ein Attribut ist. Amazon liest die Datei ein und legt Produkte an oder ändert sie. Für viele Artikel ist das schneller und weniger fehleranfällig als die Pflege einzelner Listings." },
        { frage: "Was sind Backend-Suchbegriffe?", antwort: "Backend-Suchbegriffe sind ein Feld im Listing, das Kunden nicht sehen. Dort stehen Synonyme, andere Schreibweisen und häufige Tippfehler, die im Titel oder in den Bullet Points keinen Platz haben. Amazon begrenzt die Länge, deshalb braucht das Feld eine sorgfältige Auswahl." },
        { frage: "Was ist eine Variantenfamilie (Parent-Child)?", antwort: "Sie fasst Produkte zusammen, die sich nur in einem Merkmal wie Farbe oder Größe unterscheiden. Kunden wählen auf einer Seite aus. Die Bewertungen gelten für die ganze Familie." },
        { frage: "Könnt ihr Produkte ohne ASIN anlegen?", antwort: "Ja. Hat ein Produkt noch keine ASIN, legen wir es mit EAN, GTIN oder einer anderen gültigen Produktkennung neu an. Existiert es schon im Katalog, ordnen wir euer Angebot der vorhandenen ASIN zu." },
        { frage: "Was passiert, wenn Amazon einen Upload ablehnt?", antwort: "Jeder Upload erzeugt einen Verarbeitungsbericht. Wir lesen ihn und beheben die Fehler, etwa fehlende Pflichtfelder. Danach laden wir die korrigierten Zeilen erneut hoch." },
      ],
    },
    cta: "Wie sauber ist euer Katalog?",
  },

  /* ------------------------------------------------------------
     Analytics & Reporting
     ------------------------------------------------------------ */
  reporting: {
    hero: {
      eyebrow: "Analytics & Reporting",
      titelVor: "Amazon Reporting und Performance Report: ",
      titelEm: "Zahlen, die erklären, was zu tun ist.",
      lead: "Wir werten Umsatz, Deckungsbeitrag, ACoS, TACoS und den Search Query Report aus Seller Central und Vendor Central aus und ordnen sie ein. Jeden Monat bekommt ihr einen Report, der sagt, was passiert ist, woran es lag und was wir als Nächstes tun.",
      bildAlt: "Ein schwebendes Dashboard mit steigender Kurve, Balken und zwei Kennzahlkarten",
    },
    einstieg: {
      eyebrow: "Kurz erklärt",
      titel: "Amazon Reporting, das erklärt statt aufzulisten",
      lead: "Amazon verteilt seine Zahlen auf viele Berichte, aber keiner zeigt, was pro Produkt verdient wird. Wir führen die Quellen zusammen und rechnen auf Produktebene.",
      begriffe: [
        { begriff: "ACoS", text: "Die Werbekosten im Verhältnis zum Umsatz, den die Werbung erzeugt hat." },
        { begriff: "TACoS", text: "Die Werbekosten im Verhältnis zum gesamten Umsatz, auch zum organischen. Sinkt er bei steigendem Umsatz, wächst das Geschäft schneller als die Werbekosten." },
        { begriff: "Search Query Report", text: "Ein Bericht aus Brand Analytics: Mit welchen Suchbegriffen Kunden euch finden und wie Klicks und Käufe im Vergleich zum Markt laufen." },
        { begriff: "Deckungsbeitrag", text: "Was je Produkt nach Amazon-Gebühren, Versand und Wareneinsatz übrig bleibt." },
      ],
    },
    problem: {
      titel: "Viele Zahlen, aber wenige Antworten.",
      punkte: [
        "Die Berichte liegen in fünf Oberflächen. Keine zeigt das ganze Bild.",
        "Der Umsatz steigt, aber niemand sagt, was davon nach Gebühren und Werbung übrig bleibt.",
        "Kennzahlen widersprechen sich, je nachdem, aus welcher Quelle sie stammen.",
        "Der Monatsbericht erklärt, was war, aber nicht, was jetzt zu tun ist.",
      ],
      bruecke: "Ein guter Report beantwortet drei Fragen: Was ist passiert? Woran hat es gelegen? Was tun wir als Nächstes?",
    },
    kern: {
      eyebrow: "Auswertungen",
      titel: "Was wir für euch auswerten",
      lead: "Kein Datenexport zum Selbstauswerten. Ihr bekommt die Zahlen, auf die es ankommt, samt unserer Einordnung.",
      karten: [
        {
          titel: "Verkauf und Marge",
          unterzeile: "Was bleibt, nicht nur, was hereinkommt",
          text: "Wir rechnen den Deckungsbeitrag je Produkt und stellen ihn dem Vormonat und dem Vorjahr gegenüber.",
          punkte: [
            "Umsatz und Deckungsbeitrag je Produktgruppe",
            "Marge je Produkt nach Gebühren und Wareneinsatz",
            "Sitzungen und Conversion Rate aus den Business Reports",
          ],
        },
        {
          titel: "Werbung",
          unterzeile: "ACoS und TACoS im Zusammenhang",
          text: "Erst beide Kennzahlen zusammen zeigen, ob Werbung Wachstum erzeugt oder Umsatz bezahlt, der ohnehin gekommen wäre.",
          punkte: [
            "ACoS und TACoS je Kampagne und Produkt",
            "Suchbegriffe, Platzierungen und Budgets",
            "Vorher-Nachher-Vergleich einzelner Änderungen",
          ],
        },
        {
          titel: "Suche und Markt",
          unterzeile: "Wo ihr gegenüber dem Markt steht",
          text: "Der Search Query Report zeigt, ob das Problem bei der Sichtbarkeit, beim Bild oder beim Angebot liegt.",
          punkte: [
            "Klickrate und Conversion Rate gegenüber dem Markt",
            "Rankings und Suchvolumen der wichtigsten Keywords",
            "Share of Voice gegenüber Wettbewerbern",
          ],
        },
        {
          titel: "Account und Bestand",
          unterzeile: "Was den Verkauf bremsen kann",
          text: "Account Health, Buy-Box-Anteil und Bestand drücken den Umsatz, ohne in den Werbezahlen aufzutauchen.",
          punkte: [
            "Account Health und Buy-Box-Anteil",
            "Bestand, Reichweite und FBA-Gebühren",
            "Retouren und ihre Gründe",
          ],
        },
      ],
    },
    vorgehen: {
      art: "spalten",
      eyebrow: "Der Report",
      titel: "Drei Fragen, die jeder Report beantwortet",
      lead: "Danach geht ihr ihn mit uns durch.",
      schritte: [
        { titel: "Was ist passiert?", unterzeile: "Zahlen im Vergleich", text: "Umsatz, Deckungsbeitrag und TACoS je Produktgruppe, gegen Vormonat und Vorjahr gestellt." },
        { titel: "Woran hat es gelegen?", unterzeile: "Ursache statt Symptom", text: "Welche Änderung welchen Ausschlag verursacht hat und was der Wettbewerb im selben Zeitraum getan hat." },
        { titel: "Was tun wir als Nächstes?", unterzeile: "Drei Maßnahmen", text: "Die drei wichtigsten Maßnahmen für den Folgemonat, mit erwartetem Effekt und dem, was wir von euch brauchen." },
      ],
      zusatz: { titel: "Besprechung mit euch", text: "Wir gehen den Report gemeinsam durch und legen die Reihenfolge der nächsten Schritte fest." },
    },
    grenzen: {
      eyebrow: "Abgrenzung",
      titel: "Auswertung und Einordnung, keine Buchhaltung",
      ja: { titel: "Das übernehmen wir", punkte: [
        "Zahlen aus Seller Central und Vendor Central zusammenführen",
        "Deckungsbeitrag je Produkt rechnen",
        "Ursachen benennen und nächste Schritte vorschlagen",
      ] },
      nein: { titel: "Das liegt bei euch oder Dritten", punkte: [
        "Steuerliche Auswertung und Buchhaltung",
        "Euren Wareneinsatz: den liefert ihr",
        "Daten, die das Konto nicht hergibt",
      ] },
    },
    nutzen: {
      badge: "Was ihr davon habt",
      titel: "Entscheidungen auf einer gemeinsamen Grundlage.",
      punkte: [
        "Ihr seht Marge, nicht nur Umsatz",
        "Ursachen sind benannt, nicht nur Ausschläge",
        "Die nächsten Schritte stehen im Report",
        "Ihr müsst nichts selbst zusammensuchen",
      ],
    },
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu Amazon Reporting und Analytics",
      fragen: [
        { frage: "Was ist der Unterschied zwischen ACoS und TACoS?", antwort: "Der ACoS setzt die Werbekosten ins Verhältnis zum Umsatz, der durch Werbung entstanden ist. Der TACoS setzt sie ins Verhältnis zum gesamten Umsatz, auch zum organischen. Ein sinkender TACoS bei steigendem Umsatz heißt: Die Werbung macht einen kleineren Teil des Geschäfts aus." },
        { frage: "Was ist der Search Query Report?", antwort: "Ein Bericht aus Amazons Brand Analytics. Er zeigt, mit welchen Suchbegriffen Kunden eure Produkte finden und wie sich Impressionen, Klicks und Käufe im Vergleich zum Markt verhalten. Voraussetzung ist in der Regel die Markenregistrierung bei Amazon." },
        { frage: "Warum zeigt ihr den Deckungsbeitrag und nicht nur den Umsatz?", antwort: "Zwei Produkte mit gleichem Umsatz können sehr verschieden viel verdienen. Der Deckungsbeitrag zeigt, welche Produkte das Wachstum finanzieren und welche nur Umsatz erzeugen." },
        { frage: "Welche Daten braucht ihr von uns?", antwort: "Die Berichte aus Seller Central oder Vendor Central genügen für die Auswertung. Für die Marge brauchen wir euren Wareneinsatz je Produkt, den kennt Amazon nicht. Wo Daten fehlen, sagen wir es." },
        { frage: "Wie oft bekommen wir einen Report?", antwort: "Einmal im Monat, mit einer gemeinsamen Besprechung. Auffälligkeiten dazwischen, etwa ein plötzlicher Einbruch, melden wir, ohne auf den Monatsabschluss zu warten." },
      ],
    },
    cta: "Welche Zahl fehlt euch für die nächste Entscheidung?",
  },
};

export const diensteEn: DiensteWoerter = {
  /* ------------------------------------------------------------
     FBA & Inventory Management
     ------------------------------------------------------------ */
  fba: {
    hero: {
      eyebrow: "FBA & inventory",
      titelVor: "Amazon inventory planning and FBA management: ",
      titelEm: "stock available, fees under control.",
      lead: "We plan your FBA shipments, calculate days of cover per item and monitor stock and fees in the Amazon account, for Seller Central and Vendor Central. No bestseller runs out, no slow mover ties up capital. The work happens in the account, not in the warehouse.",
      bildAlt: "Stock level, shipment plan and fee overview side by side",
    },
    einstieg: {
      eyebrow: "In brief",
      titel: "FBA inventory planning means reordering in time without overstocking",
      lead: "An item that is out of stock does not sell and drops in the ranking. Too much stock in the Amazon warehouse costs fees and ties up capital.",
      begriffe: [
        { begriff: "Days of cover", text: "The number of days the stock lasts at the current sales rate." },
        { begriff: "Stockout", text: "The supply gap: the item can no longer be ordered and the ranking suffers." },
        { begriff: "Stranded inventory", text: "Stock in the Amazon warehouse without an active offer, for example after a suppressed listing." },
        { begriff: "FBM", text: "Fulfilled by merchant: you ship yourself instead of leaving delivery to Amazon." },
      ],
    },
    problem: {
      titel: "Stock is usually looked at only after something has already gone wrong.",
      punkte: [
        "A bestseller runs out, and the ranking falls with it.",
        "Overstock ties up capital and costs storage fees.",
        "A shipment sits at goods receipt and nobody follows up with Amazon.",
        "Fee deviations only show up at the monthly close, when they have already added up.",
      ],
      bruecke: "We check stock, shipments and fees continuously and step in before a loss occurs.",
    },
    kern: {
      eyebrow: "Services",
      titel: "What we handle in FBA and inventory management",
      lead: "Four tasks that cost revenue or money in FBA operations when they are left alone.",
      karten: [
        {
          titel: "Monitor stock",
          unterzeile: "Days of cover and availability per item",
          text: "We calculate days of cover per item and marketplace and flag it when an item is heading for a stockout.",
          punkte: [
            "Stockout warning before the supply gap",
            "Spot overstock and slow movers",
            "Clarify deviations between account and warehouse",
          ],
        },
        {
          titel: "Plan shipments",
          unterzeile: "From shipment plan to goods receipt",
          text: "We create the shipment plan in Seller Central and follow the shipment through to goods receipt.",
          punkte: [
            "Maintain shipment plans and shipping templates",
            "Monitor shipment status",
            "Resolve stranded inventory",
          ],
        },
        {
          titel: "Steer replenishment and costs",
          unterzeile: "Days of cover, lead time, fees",
          text: "Days of cover and lead time give the reorder point, and we keep an eye on fees per item.",
          punkte: [
            "Set the reorder point per item",
            "Calculate FBA or FBM per item",
            "Report fee deviations",
          ],
        },
        {
          titel: "Handle cases with Amazon",
          unterzeile: "Through to a decision",
          text: "If units are missing after goods receipt, we open the case and follow up until Amazon has decided.",
          punkte: [
            "Open cases for quantity deviations",
            "Submit evidence and keep deadlines",
            "Escalate if there is no reply",
          ],
        },
      ],
    },
    vorgehen: {
      art: "ablauf",
      eyebrow: "Process",
      titel: "Three steps to steady inventory control",
      lead: "First the stock review, then fixed rules, then daily operation.",
      schritte: [
        { titel: "Stock review", unterzeile: "Compare account and warehouse", text: "We read stock, days of cover and fees per item and compare them with your warehouse. Deviations and slow movers are named afterwards." },
        { titel: "Set the rules", unterzeile: "Reorder point and shipping route", text: "For each item it is set at which days of cover to reorder and whether FBA or FBM leaves more margin." },
        { titel: "Daily operation", unterzeile: "Shipments and monitoring", text: "We create shipment plans, check the status and report deviations on a fixed rhythm." },
      ],
      zusatz: { titel: "Every month", text: "You get days of cover, fees and a list of items to reorder or sell down. You decide the order quantity." },
    },
    grenzen: {
      eyebrow: "Scope",
      titel: "Digital in the account, not in the warehouse",
      ja: { titel: "What we handle", punkte: [
        "Plan and track shipments",
        "Monitor stock, days of cover and fees",
        "Handle cases with Amazon",
      ] },
      nein: { titel: "What stays with you or third parties", punkte: [
        "Labelling, packing and bundling",
        "Quality control in the warehouse",
        "The decision on the order quantity",
      ] },
    },
    nutzen: {
      badge: "What you get",
      titel: "Available stock and lower storage costs.",
      punkte: [
        "Bestsellers stay in stock",
        "Slow movers tie up less capital",
        "Shipments arrive with consistent data",
        "Fee deviations show up before they add up",
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about FBA and inventory management",
      fragen: [
        { frage: "What does days of cover mean in FBA?", antwort: "Days of cover shows how many days the stock lasts at the current sales rate: stock divided by average daily sales. Together with the lead time it determines when to reorder." },
        { frage: "What is stranded inventory?", antwort: "Amazon uses the term for stock in the warehouse that has no active offer, for example after a suppressed listing. It causes storage costs and cannot be ordered. We restore the offer or trigger a removal order." },
        { frage: "Do you prepare goods for Amazon, for example with labels?", antwort: "No. Labelling, packing and bundling stay with your warehouse or prep partner. We plan the shipment in the account, monitor the status and handle cases with Amazon." },
        { frage: "Do you work in Seller Central and in Vendor Central?", antwort: "Yes, in both. In Seller Central the brand controls stock and shipments itself, in Vendor Central Amazon reorders from you. We plan for both routes." },
        { frage: "What does it cost if an advertised item is out of stock?", antwort: "You pay for clicks that cannot lead to a purchase. We align stock and campaigns so that the budget only runs where goods are available." },
      ],
    },
    cta: "How long does your stock really last?",
  },

  /* ------------------------------------------------------------
     Catalog & Listing Management
     ------------------------------------------------------------ */
  katalog: {
    hero: {
      eyebrow: "Catalog & listing management",
      titelVor: "Amazon catalog management and listing management: ",
      titelEm: "set up cleanly, maintained continuously.",
      lead: "We create products and variations in the Amazon catalog and keep them up to date: attributes, required fields, backend search terms, images and variation structure, for Seller Central and Vendor Central. New products start complete, existing listings are maintained in bulk.",
      bildAlt: "A product line with one item highlighted, linked to an analysis",
    },
    einstieg: {
      eyebrow: "In brief",
      titel: "What catalog management does on Amazon",
      lead: "Behind every product page sit dozens of fields that Amazon calls attributes. Catalog management keeps them complete and correct, because they decide whether a product appears in filters and whether Amazon activates it.",
      begriffe: [
        { begriff: "Attributes", text: "Details such as brand, material, size and colour. Which ones are required depends on the category." },
        { begriff: "Parent-child", text: "A variation family: the parent is the shared product page, the children are colours or sizes." },
        { begriff: "Flat file", text: "A spreadsheet template for creating or changing many products at once." },
        { begriff: "Backend search terms", text: "A field customers cannot see. It holds synonyms and spellings that do not fit in the visible text." },
      ],
    },
    problem: {
      titel: "A catalog that grew instead of being planned.",
      punkte: [
        "Required fields are missing, and the product drops out of filters and search results.",
        "Variations stand alone, and reviews are spread across several pages.",
        "Duplicates and wrongly merged offers stay in place.",
        "Changes are made by hand, and for hundreds of items that takes weeks.",
      ],
      bruecke: "We clean the catalog up once, thoroughly, and maintain it continuously afterwards.",
    },
    kern: {
      eyebrow: "Services",
      titel: "What we handle in the catalog",
      lead: "Four tasks, from the first product to maintaining hundreds of items.",
      karten: [
        {
          titel: "Create products",
          unterzeile: "Right from the first ASIN",
          text: "New products start with all required details, also without an ASIN through EAN or GTIN.",
          punkte: [
            "Create products and variations",
            "Capture required attributes per category",
            "Set up the parent-child family",
          ],
        },
        {
          titel: "Maintain content",
          unterzeile: "Findability and conversion",
          text: "Title, bullet points and description follow Amazon guidelines, and the backend search terms hold synonyms and spellings.",
          punkte: [
            "Maintain titles, bullets and description",
            "Maintain backend search terms",
            "Localise content for further marketplaces",
          ],
        },
        {
          titel: "Clean up the catalog",
          unterzeile: "Duplicates, mismatches, listing status",
          text: "We record duplicate ASINs, wrongly matched offers and suppressed listings and report catalog errors to Amazon.",
          punkte: [
            "Detect and report duplicates",
            "Correct wrong matches",
            "Reactivate suppressed offers",
          ],
        },
        {
          titel: "Bulk maintenance",
          unterzeile: "Hundreds of items at once",
          text: "With a flat file we change prices, attributes or images for many items in one pass.",
          punkte: [
            "New listings and changes through flat files",
            "Check processing reports",
            "Fix errors and upload again",
          ],
        },
      ],
    },
    vorgehen: {
      art: "ablauf",
      eyebrow: "Process",
      titel: "From the current state to a maintained catalog",
      lead: "We start with what is in the account today.",
      schritte: [
        { titel: "Read the current state", unterzeile: "Catalog and listing status", text: "We read attributes, variations and status per ASIN and mark gaps, duplicates and mismatches." },
        { titel: "Set the templates", unterzeile: "Required fields per product type", text: "For each product type it is set which details are needed and where they come from, for example your product data." },
        { titel: "Create and change", unterzeile: "Individually or by flat file", text: "New products start complete. Changes to many items go live in bulk, on one day." },
        { titel: "Check and maintain", unterzeile: "Ongoing control", text: "After every upload we read the processing report and fix errors. We keep checking the listing status." },
      ],
    },
    grenzen: {
      eyebrow: "How it fits together",
      titel: "The structure is here, the content sits with product images & SEO",
      ja: { titel: "What we handle", punkte: [
        "Structure, attributes and variations",
        "Uploads and processing reports",
        "Listing status and catalog errors",
      ] },
      nein: { titel: "What belongs to product images & SEO", punkte: [
        "Main image and listing images",
        "Copy, A+ content and brand story",
        "Keyword research for titles and bullets",
      ] },
      link: { text: "See product images & SEO", href: "/leistungen/listing-seo" },
    },
    nutzen: {
      badge: "What you get",
      titel: "Products that are found and activated.",
      punkte: [
        "Products appear in filters and search results",
        "Variations collect reviews in one place",
        "Changes run in bulk instead of one by one",
        "Fewer rejections and queries from Amazon",
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about catalog and listing management",
      fragen: [
        { frage: "What is a flat file on Amazon?", antwort: "A flat file is a spreadsheet template in which every row is a product and every column an attribute. Amazon reads the file and creates or changes products. For many items it is faster and less error-prone than maintaining single listings." },
        { frage: "What are backend search terms?", antwort: "Backend search terms are a listing field that customers cannot see. They hold synonyms, other spellings and common typos that do not fit in the title or bullet points. Amazon limits the length, so the field needs a careful selection." },
        { frage: "What is a variation family (parent-child)?", antwort: "It groups products that differ in only one attribute such as colour or size. Customers choose on one page, and the reviews apply to the whole family." },
        { frage: "Can you create products without an ASIN?", antwort: "Yes. If a product has no ASIN yet, we create it with an EAN, GTIN or another valid product identifier. If it already exists in the catalog, we match your offer to the existing ASIN." },
        { frage: "What happens if Amazon rejects an upload?", antwort: "Every upload produces a processing report. We read it, fix the errors, for example missing required fields, and upload the corrected rows again." },
      ],
    },
    cta: "How clean is your catalog?",
  },

  /* ------------------------------------------------------------
     Analytics & Reporting
     ------------------------------------------------------------ */
  reporting: {
    hero: {
      eyebrow: "Analytics & reporting",
      titelVor: "Amazon reporting and performance reports: ",
      titelEm: "numbers that explain what to do.",
      lead: "We analyse revenue, contribution margin, ACoS, TACoS and the Search Query Report from Seller Central and Vendor Central and put them in context. Every month you get a report that says what happened, why it happened and what we do next.",
      bildAlt: "A floating dashboard with a rising curve, bars and two metric cards",
    },
    einstieg: {
      eyebrow: "In brief",
      titel: "Amazon reporting that explains instead of listing",
      lead: "Amazon spreads its numbers across many reports, but none shows what each product earns. We bring the sources together and calculate at product level.",
      begriffe: [
        { begriff: "ACoS", text: "Advertising cost relative to the revenue the advertising generated." },
        { begriff: "TACoS", text: "Advertising cost relative to total revenue, organic included. If it falls while revenue rises, the business grows faster than the ad spend." },
        { begriff: "Search Query Report", text: "A Brand Analytics report: which search terms customers use to find you and how clicks and purchases compare with the market." },
        { begriff: "Contribution margin", text: "What is left per product after Amazon fees, shipping and cost of goods." },
      ],
    },
    problem: {
      titel: "Plenty of numbers, few answers.",
      punkte: [
        "Reports sit in five interfaces, and none shows the whole picture.",
        "Revenue rises, but nobody says what is left after fees and advertising.",
        "Metrics contradict each other depending on the source.",
        "The monthly report explains what was, but not what to do now.",
      ],
      bruecke: "A good report answers three questions: What happened? Why did it happen? What do we do next?",
    },
    kern: {
      eyebrow: "Analyses",
      titel: "What we analyse for you",
      lead: "No data export to analyse yourself. You get the numbers that matter, plus our interpretation.",
      karten: [
        {
          titel: "Sales and margin",
          unterzeile: "What is left, not just what comes in",
          text: "We calculate the contribution margin per product and set it against the previous month and the previous year.",
          punkte: [
            "Revenue and contribution margin per product group",
            "Margin per product after fees and cost of goods",
            "Sessions and conversion rate from the business reports",
          ],
        },
        {
          titel: "Advertising",
          unterzeile: "ACoS and TACoS in context",
          text: "Only both metrics together show whether advertising creates growth or pays for revenue that would have come anyway.",
          punkte: [
            "ACoS and TACoS per campaign and product",
            "Search terms, placements and budgets",
            "Before-and-after comparison of single changes",
          ],
        },
        {
          titel: "Search and market",
          unterzeile: "Where you stand against the market",
          text: "The Search Query Report shows whether the problem lies in visibility, in the image or in the offer.",
          punkte: [
            "Click rate and conversion rate against the market",
            "Rankings and search volume of the key keywords",
            "Share of voice against competitors",
          ],
        },
        {
          titel: "Account and stock",
          unterzeile: "What can slow sales down",
          text: "Account health, buy box share and stock depress revenue without showing up in the advertising numbers.",
          punkte: [
            "Account health and buy box share",
            "Stock, days of cover and FBA fees",
            "Returns and their reasons",
          ],
        },
      ],
    },
    vorgehen: {
      art: "spalten",
      eyebrow: "The report",
      titel: "Three questions every report answers",
      lead: "Afterwards you go through it with us.",
      schritte: [
        { titel: "What happened?", unterzeile: "Numbers in comparison", text: "Revenue, contribution margin and TACoS per product group, set against the previous month and year." },
        { titel: "Why did it happen?", unterzeile: "Cause instead of symptom", text: "Which change caused which swing and what the competition did in the same period." },
        { titel: "What do we do next?", unterzeile: "Three actions", text: "The three most important actions for the coming month, with expected effect and what we need from you." },
      ],
      zusatz: { titel: "Review call with you", text: "We go through the report together and set the order of the next steps." },
    },
    grenzen: {
      eyebrow: "Scope",
      titel: "Analysis and interpretation, not bookkeeping",
      ja: { titel: "What we handle", punkte: [
        "Bring together numbers from Seller Central and Vendor Central",
        "Calculate contribution margin per product",
        "Name causes and propose next steps",
      ] },
      nein: { titel: "What stays with you or third parties", punkte: [
        "Tax reporting and bookkeeping",
        "Your cost of goods: you supply it",
        "Data the account does not provide",
      ] },
    },
    nutzen: {
      badge: "What you get",
      titel: "Decisions on a shared basis.",
      punkte: [
        "You see margin, not just revenue",
        "Causes are named, not just swings",
        "The next steps are in the report",
        "You do not have to gather anything yourself",
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about Amazon reporting and analytics",
      fragen: [
        { frage: "What is the difference between ACoS and TACoS?", antwort: "ACoS relates advertising cost to the revenue generated by advertising. TACoS relates it to total revenue, organic included. A falling TACoS with rising revenue means advertising makes up a smaller part of the business." },
        { frage: "What is the Search Query Report?", antwort: "A report from Amazon Brand Analytics. It shows which search terms customers use to find your products and how impressions, clicks and purchases compare with the market. It usually requires brand registry with Amazon." },
        { frage: "Why do you show contribution margin and not just revenue?", antwort: "Two products with the same revenue can earn very different amounts. Contribution margin shows which products finance growth and which only generate revenue." },
        { frage: "What data do you need from us?", antwort: "The reports from Seller Central or Vendor Central are enough for the analysis. For margin we need your cost of goods per product, which Amazon does not know. Where data is missing, we say so." },
        { frage: "How often do we get a report?", antwort: "Once a month, with a joint call. We flag anything in between, such as a sudden drop, without waiting for the month end." },
      ],
    },
    cta: "Which number are you missing for your next decision?",
  },
};
