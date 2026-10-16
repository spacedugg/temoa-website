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
  einstieg: { eyebrow: string; titel: string; absaetze: string[] };
  problem: { titel: string; punkte: string[]; bruecke: string };
  kern: {
    eyebrow: string;
    titel: string;
    lead: string;
    karten: { titel: string; unterzeile: string; text: string; punkte: string[] }[];
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
      eyebrow: "Worum es geht",
      titel: "Warum die Bestandsplanung bei Amazon über den Umsatz entscheidet",
      absaetze: [
        "Ein Artikel, der nicht lieferbar ist, verkauft nicht. Auf Amazon kostet das doppelt: Neben dem entgangenen Umsatz fällt das Produkt in der Sichtbarkeit zurück. Nach dem Auffüllen dauert es, bis es die alte Position im Suchergebnis wieder erreicht.",
        "Zu viel Bestand ist die Gegenseite desselben Problems. Ware, die lange im Amazon-Lager liegt, verursacht Lagergebühren. Für Ware mit langer Lagerzeit erhebt Amazon zusätzliche Aufschläge. Das Kapital steckt dann in Artikeln, die sich langsam drehen. Für die Artikel, die gerade laufen, fehlt es.",
        "Bestandsplanung heißt deshalb, für jeden Artikel drei Dinge zu wissen: wie viele Tage der Bestand reicht (die Reichweite), wie lange eine Lieferung von der Bestellung bis ins Amazon-Lager braucht (die Vorlaufzeit) und bei welchem Stand nachbestellt wird. Wir rechnen das je Artikel und je Marktplatz, legen die Regeln mit euch fest und halten sie im laufenden Betrieb ein.",
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
      lead: "Vier Aufgaben decken ab, was im FBA-Betrieb Umsatz oder Geld kostet, wenn es liegen bleibt.",
      karten: [
        {
          titel: "Bestand überwachen",
          unterzeile: "Reichweite und Verfügbarkeit je Artikel",
          text: "Die Reichweite sagt, wie viele Tage der aktuelle Bestand bei der derzeitigen Verkaufsgeschwindigkeit reicht. Wir berechnen sie je Artikel und Marktplatz und melden, wenn ein Artikel auf einen Lieferengpass (Stockout) zuläuft.",
          punkte: [
            "Reichweite je Artikel und Marktplatz berechnen",
            "Stockout-Warnung, bevor der Bestand aufgebraucht ist",
            "Überbestand und Langsamdreher über die Inventory Health erkennen",
            "Abweichungen zwischen Konto und eurem Lager klären",
          ],
        },
        {
          titel: "Sendungen planen",
          unterzeile: "Vom Sendungsplan bis zum Wareneingang",
          text: "Eine FBA-Sendung beginnt mit einem Sendungsplan in Seller Central: Welche Artikel gehen in welcher Menge in welches Amazon-Lager? Wir legen den Plan an, hinterlegen Maße, Gewicht und Verpackungsart und verfolgen die Sendung bis zum Wareneingang.",
          punkte: [
            "Sendungspläne anlegen und einreichen",
            "Versandvorlagen mit Maßen, Gewicht und Verpackungsart pflegen",
            "Sendungsstatus und Wareneingang überwachen",
            "Stranded Inventory auflösen: Bestand im Amazon-Lager ohne aktives Angebot",
          ],
        },
        {
          titel: "Nachschub und Kosten steuern",
          unterzeile: "Reichweite, Vorlaufzeit, Gebühren",
          text: "Wann nachbestellt wird, ergibt sich aus Reichweite und Vorlaufzeit. Ob ein Artikel über FBA oder im eigenen Versand (FBM) mehr Marge lässt, rechnen wir je Artikel nach. Die FBA-Gebühren behalten wir im Blick.",
          punkte: [
            "Nachbestellpunkt je Artikel festlegen",
            "Entscheidung zwischen FBA und FBM je Artikel rechnen",
            "FBA-Gebühren und Gebührenabweichungen überwachen",
            "Verfügbarkeit im FBA-Programm prüfen",
          ],
        },
        {
          titel: "Fälle bei Amazon führen",
          unterzeile: "Bis zur Entscheidung",
          text: "Fehlen nach dem Wareneingang Einheiten oder weichen Mengen ab, eröffnen wir den Fall beim Amazon Support, reichen die Nachweise ein und halten nach, bis Amazon entschieden hat.",
          punkte: [
            "Fälle zu Wareneingang und Mengenabweichungen eröffnen",
            "Nachweise einreichen und Fristen halten",
            "Bei ausbleibender Antwort eskalieren",
            "Digitale FBA-Sendungsprozesse begleiten",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Ablauf",
      titel: "In vier Schritten zur laufenden Bestandssteuerung",
      lead: "Zuerst die Bestandsaufnahme, danach feste Regeln, dann der laufende Betrieb. Am Ende jedes Monats steht ein Bericht.",
      schritte: [
        {
          titel: "Bestandsaufnahme",
          unterzeile: "Konto und Lager abgleichen",
          text: "Wir lesen Bestand, Reichweite und Gebühren je Artikel aus dem Konto aus und vergleichen sie mit dem Stand in eurem Lager. Abweichungen und Ladenhüter sind danach benannt.",
        },
        {
          titel: "Regeln festlegen",
          unterzeile: "Nachbestellpunkt und Versandweg",
          text: "Je Artikel steht fest, bei welcher Reichweite nachbestellt wird und ob FBA oder FBM mehr Marge lässt. Grundlage sind Verkaufsgeschwindigkeit, Vorlaufzeit und Gebühren.",
        },
        {
          titel: "Laufender Betrieb",
          unterzeile: "Sendungen und Monitoring",
          text: "Wir legen Sendungspläne an, prüfen den Sendungsstatus und melden Abweichungen im festen Rhythmus. Fälle bei Amazon führen wir bis zur Entscheidung.",
        },
        {
          titel: "Monatsbericht",
          unterzeile: "Zahlen und nächste Schritte",
          text: "Ihr bekommt die Reichweiten, die Gebühren und eine Liste der Artikel, bei denen jetzt nachbestellt oder abverkauft werden sollte. Die Bestellmenge entscheidet ihr, die Datengrundlage kommt von uns.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Abgrenzung",
      titel: "Was wir nicht tun",
      text: "Physische Arbeiten an der Ware gehören nicht zu unseren Leistungen: kein Etikettieren, Verpacken oder Bündeln und keine Qualitätskontrolle im Lager. Das bleibt bei eurem Lager oder Prep-Partner. Wir planen und steuern FBA und Inventory digital im Amazon-Konto, also Sendungen, Bestand, Gebühren und Fälle.",
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
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Erfahrung aus dem Tagesgeschäft",
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
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu FBA und Inventory Management",
      fragen: [
        {
          frage: "Was bedeutet Reichweite bei FBA?",
          antwort:
            "Die Reichweite gibt an, für wie viele Tage der aktuelle Bestand bei der derzeitigen Verkaufsgeschwindigkeit reicht. Man teilt den Bestand durch den durchschnittlichen Tagesverkauf. Zusammen mit der Vorlaufzeit der Lieferung bestimmt der Wert, wann nachbestellt werden muss.",
        },
        {
          frage: "Was ist Stranded Inventory?",
          antwort:
            "So nennt Amazon Bestand, der im Amazon-Lager liegt, zu dem es aber kein aktives Angebot gibt, etwa weil ein Listing unterdrückt oder geschlossen wurde. Die Ware verursacht Lagerkosten und ist nicht bestellbar. Wir erkennen diese Fälle im Konto und lösen sie auf, indem wir das Angebot wiederherstellen oder einen Entfernungsauftrag auslösen.",
        },
        {
          frage: "Bereitet ihr Ware für Amazon vor, zum Beispiel mit Etiketten?",
          antwort:
            "Nein. Etikettieren, Verpacken und Bündeln gehören nicht zu unseren Leistungen, das bleibt bei eurem Lager oder Prep-Partner. Wir planen die Sendung im Konto, überwachen den Status und führen Fälle bei Amazon.",
        },
        {
          frage: "Arbeitet ihr in Seller Central und in Vendor Central?",
          antwort:
            "Ja, in beiden. Die Abläufe unterscheiden sich: In Seller Central steuert die Marke Bestand und Sendungen selbst, in Vendor Central bestellt Amazon bei euch nach. Wir kennen beide Wege und planen entsprechend.",
        },
        {
          frage: "Was kostet es, wenn ein beworbener Artikel nicht lieferbar ist?",
          antwort:
            "Läuft ein beworbener Artikel leer, bezahlt ihr Klicks, die nicht zum Kauf führen können. Wir stimmen Bestand und Kampagnen aufeinander ab, damit das Budget nur dort läuft, wo Ware verfügbar ist.",
        },
        {
          frage: "Wie bekommen wir mit, was ihr im Bestand tut?",
          antwort:
            "Über den Monatsbericht mit Reichweiten, Gebühren und den nächsten Schritten sowie über die Besprechung dazu. Auffälligkeiten dazwischen, etwa ein Artikel kurz vor dem Stockout, melden wir direkt.",
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
      titelVor: "Amazon Katalogpflege und Listing Management: ",
      titelEm: "sauber angelegt, laufend gepflegt.",
      lead: "Wir legen Produkte und Varianten im Amazon-Katalog an und halten sie aktuell: Attribute, Pflichtfelder, Backend-Suchbegriffe, Bilder und Variantenstruktur, für Seller Central und Vendor Central. Neue Produkte starten vollständig, bestehende Listings werden gebündelt gepflegt.",
      bildAlt: "Produktreihe mit hervorgehobenem Artikel, verbunden mit einer Auswertung",
    },
    einstieg: {
      eyebrow: "Worum es geht",
      titel: "Was Katalogpflege auf Amazon leistet",
      absaetze: [
        "Ein Produkt auf Amazon besteht aus mehr als Titel, Bildern und Bullet Points. Hinter der Detailseite liegen Dutzende Felder, die Amazon Attribute nennt: Marke, Material, Größe, Farbe, Produkttyp, Zielgruppe und viele mehr. Welche davon Pflicht sind, hängt von der Kategorie ab.",
        "Diese Angaben entscheiden, ob ein Produkt in den Filtern der Kategorie erscheint, welchen Suchanfragen es zugeordnet wird und ob Amazon es überhaupt freischaltet. Dazu kommen die Backend-Suchbegriffe: ein Feld, das Kunden nicht sehen, aus dem Amazon aber Synonyme und Schreibvarianten bezieht.",
        "Katalogpflege heißt, diese Struktur sauber anzulegen und dauerhaft zu halten: neue Produkte vollständig, Varianten in der richtigen Familie, Änderungen gebündelt per Flat File. Ein Flat File ist eine Tabellenvorlage, mit der sich viele Produkte auf einmal anlegen oder ändern lassen.",
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
          text: "Neue Produkte entstehen mit allen Pflichtangaben für Kategorie und Produkttyp, auch ohne ASIN (Amazons Produktnummer) über EAN oder GTIN. Varianten wie Farbe oder Größe ordnen wir in eine Familie (Parent-Child), damit sich Bewertungen an einer Stelle sammeln.",
          punkte: [
            "Produkte und Varianten anlegen",
            "Pflichtattribute je Kategorie und Produkttyp erfassen",
            "Eltern-Kind-Beziehung und Variationsthema festlegen",
          ],
        },
        {
          titel: "Inhalte pflegen",
          unterzeile: "Auffindbarkeit und Conversion",
          text: "Titel, Bullet Points und Beschreibung folgen Amazons Vorgaben für Länge und Aufbau. In den Backend-Suchbegriffen stehen Synonyme, Schreibweisen und Tippfehler, die im sichtbaren Text keinen Platz haben.",
          punkte: [
            "Titel, Bullet Points und Beschreibung nach Amazons Vorgaben",
            "Backend-Suchbegriffe pflegen",
            "Hauptbild, Listingbilder, A+ Content und Brand Store einpflegen",
            "Inhalte für weitere Marktplätze lokalisieren",
          ],
        },
        {
          titel: "Katalog bereinigen",
          unterzeile: "Dubletten, Fehlzuordnungen, Listing-Status",
          text: "Im gewachsenen Katalog stehen oft doppelte ASINs, falsch zugeordnete Angebote und unterdrückte Listings. Wir erfassen sie, melden Katalogfehler an Amazon und korrigieren die Struktur.",
          punkte: [
            "Katalogfehler und Dubletten erkennen und melden",
            "Falsch zusammengeführte Angebote und Varianten korrigieren",
            "Unterdrückte und inaktive Angebote prüfen und wieder aktivieren",
          ],
        },
        {
          titel: "Massenpflege",
          unterzeile: "Hunderte Artikel auf einmal",
          text: "Mit einem Flat File ändern wir Preise, Attribute oder Bilder für viele Artikel in einem Durchgang, statt jedes Listing einzeln zu öffnen.",
          punkte: [
            "Neuanlagen und Änderungen per Flat File hochladen",
            "Preis-, Attribut- und Bildänderungen im Block",
            "Verarbeitungsberichte prüfen und Fehler beheben",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Ablauf",
      titel: "Vom Ist-Zustand zum gepflegten Katalog",
      lead: "Wir beginnen mit dem, was heute im Konto steht. Am Ende steht ein Katalog, den ihr gebündelt ändern könnt.",
      schritte: [
        {
          titel: "Ist-Zustand lesen",
          unterzeile: "Katalog und Listing-Status",
          text: "Wir lesen Attribute, Varianten und Status je ASIN aus und markieren Lücken, Dubletten und Fehlzuordnungen. Daraus entsteht eine Liste der Korrekturen nach Dringlichkeit.",
        },
        {
          titel: "Vorlagen festlegen",
          unterzeile: "Pflichtfelder je Produkttyp",
          text: "Je Produkttyp legen wir fest, welche Angaben nötig sind und woher sie kommen, etwa aus euren Produktdaten oder dem Datenblatt des Herstellers.",
        },
        {
          titel: "Anlegen und ändern",
          unterzeile: "Einzeln oder per Flat File",
          text: "Neue Produkte starten vollständig. Änderungen an vielen Artikeln laufen gebündelt über Uploads, damit sie an einem Tag live sind und nicht über Wochen verteilt.",
        },
        {
          titel: "Prüfen und halten",
          unterzeile: "Laufende Kontrolle",
          text: "Nach jedem Upload lesen wir den Verarbeitungsbericht und beheben Fehler. Den Listing-Status prüfen wir weiter, damit ein unterdrücktes Angebot nicht unbemerkt Sichtbarkeit kostet.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Zusammenspiel",
      titel: "Katalog und Content gehören zusammen",
      text: "Bilder, Texte, A+ Content und Brand Story entstehen im Bereich Produktbilder & SEO. Katalog und Listing Management sorgt dafür, dass diese Inhalte auf einem sauberen Fundament stehen: richtige Struktur, vollständige Attribute, gepflegte Varianten. Das eine ohne das andere verschenkt Wirkung.",
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
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Erfahrung aus dem Tagesgeschäft",
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
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu Katalogpflege und Listing Management",
      fragen: [
        {
          frage: "Was ist ein Flat File bei Amazon?",
          antwort:
            "Ein Flat File ist eine Tabellenvorlage, in der jede Zeile ein Produkt und jede Spalte ein Attribut ist. Amazon liest die Datei ein und legt Produkte an oder ändert sie. Für viele Artikel ist das schneller und weniger fehleranfällig als die Pflege einzelner Listings.",
        },
        {
          frage: "Was sind Backend-Suchbegriffe?",
          antwort:
            "Backend-Suchbegriffe sind ein Feld im Listing, das Kunden nicht sehen. Dort stehen Begriffe, nach denen gesucht wird, die im Titel oder in den Bullet Points aber keinen Platz haben: Synonyme, andere Schreibweisen und häufige Tippfehler. Amazon begrenzt die Länge, deshalb braucht das Feld eine sorgfältige Auswahl.",
        },
        {
          frage: "Was ist eine Variantenfamilie (Parent-Child)?",
          antwort:
            "Eine Variantenfamilie fasst Produkte zusammen, die sich nur in einem Merkmal wie Farbe oder Größe unterscheiden. Der Parent ist die übergeordnete Produktseite, die Children sind die einzelnen Varianten. Kunden wählen auf einer Seite aus. Die Bewertungen gelten für die ganze Familie.",
        },
        {
          frage: "Könnt ihr Produkte ohne ASIN anlegen?",
          antwort:
            "Ja. Hat ein Produkt noch keine ASIN, legen wir es mit EAN, GTIN oder einer anderen gültigen Produktkennung neu an. Existiert es bereits im Amazon-Katalog, ordnen wir euer Angebot der vorhandenen ASIN zu.",
        },
        {
          frage: "Was passiert, wenn Amazon einen Upload ablehnt?",
          antwort:
            "Jeder Upload erzeugt einen Verarbeitungsbericht. Wir lesen ihn und beheben die Fehler, etwa fehlende Pflichtfelder oder ungültige Werte. Danach laden wir die korrigierten Zeilen erneut hoch.",
        },
        {
          frage: "Wer erstellt Bilder und Texte für die Listings?",
          antwort:
            "Die Inhalte entstehen im Bereich Produktbilder & SEO. Katalog und Listing Management pflegt die Struktur darunter und bringt die Inhalte ins Konto.",
        },
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
      eyebrow: "Worum es geht",
      titel: "Amazon Reporting, das erklärt statt aufzulisten",
      absaetze: [
        "Amazon verteilt seine Zahlen auf viele Berichte: Business Reports für Umsatz und Sitzungen, die Werbekonsole für Kampagnen, den Search Query Report für das Suchverhalten, dazu Bestand und Gebühren in Seller Central. Jeder Bericht zeigt einen Teil. Was am Ende pro Produkt verdient wird, zeigt keiner.",
        "Wir führen diese Quellen für euch zusammen und rechnen auf Produktebene: Umsatz, Deckungsbeitrag nach Amazon-Gebühren und Wareneinsatz, ACoS und TACoS. Der ACoS setzt die Werbekosten ins Verhältnis zum Umsatz, den die Werbung selbst erzeugt hat. Der TACoS setzt sie ins Verhältnis zum gesamten Umsatz, also auch zum organischen. Steigt der Umsatz, während der TACoS sinkt, wächst das Geschäft schneller als die Werbekosten.",
        "Der Search Query Report zeigt, mit welchen Suchbegriffen Kunden eure Produkte finden und wie sich Klickrate und Conversion Rate gegenüber dem Markt verhalten. Daran sehen wir, ob ein Listing zu selten angezeigt wird, zu wenige Klicks bekommt oder zu wenige davon in Käufe verwandelt.",
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
          text: "Umsatz allein sagt nicht, was bleibt. Der Deckungsbeitrag zeigt, was nach Amazon-Gebühren, FBA-Kosten und Wareneinsatz übrig ist. Wir rechnen ihn je Produkt und stellen ihn dem Vormonat und dem Vorjahr gegenüber.",
          punkte: [
            "Umsatz, Bestellungen und Deckungsbeitrag je Produktgruppe",
            "Marge je Produkt nach Gebühren und Wareneinsatz",
            "Business Reports mit Sitzungen und Conversion Rate",
            "Vergleich mit Vormonat und Vorjahr",
          ],
        },
        {
          titel: "Werbung",
          unterzeile: "ACoS und TACoS im Zusammenhang",
          text: "Erst beide Kennzahlen zusammen zeigen, ob Werbung Wachstum erzeugt oder nur Umsatz bezahlt, der ohnehin gekommen wäre. Deshalb stehen ACoS und TACoS je Kampagne und je Produkt nebeneinander.",
          punkte: [
            "ACoS und TACoS je Kampagne und Produkt",
            "Suchbegriffe, Platzierungen und Budgets",
            "Anteil der Werbung am Gesamtumsatz",
            "Wirkung einzelner Änderungen im Vorher-Nachher-Vergleich",
          ],
        },
        {
          titel: "Suche und Markt",
          unterzeile: "Wo ihr gegenüber dem Markt steht",
          text: "Der Search Query Report vergleicht, wie oft eure Produkte nach einer Suche gesehen, angeklickt und gekauft werden, im Verhältnis zum Markt. So zeigt sich, ob das Problem bei der Sichtbarkeit, beim Bild oder beim Angebot liegt.",
          punkte: [
            "Klickrate und Conversion Rate gegenüber dem Markt",
            "Rankings und Suchvolumen der wichtigsten Keywords",
            "Share of Voice: euer Anteil an der Sichtbarkeit gegenüber den Wettbewerbern",
          ],
        },
        {
          titel: "Account und Bestand",
          unterzeile: "Was den Verkauf bremsen kann",
          text: "Manche Einbrüche haben ihre Ursache nicht in Werbung oder Listing. Eine sinkende Account Health, ein verlorener Buy-Box-Anteil oder ein leerer Bestand drücken den Umsatz, ohne dass es in den Werbezahlen auftaucht.",
          punkte: [
            "Account Health und Buy-Box-Anteil (wie oft euer Angebot im Kaufbutton steht)",
            "Bestand, Reichweite und FBA-Gebühren",
            "Retouren und ihre Gründe",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Der Report",
      titel: "So ist der Monatsreport aufgebaut",
      lead: "Der Report beantwortet die drei Fragen vom Anfang und endet in einer Besprechung mit euch.",
      schritte: [
        {
          titel: "Was ist passiert?",
          unterzeile: "Zahlen im Vergleich",
          text: "Umsatz, Deckungsbeitrag und TACoS je Produktgruppe, gegen den Vormonat und gegen das Vorjahr gestellt.",
        },
        {
          titel: "Woran hat es gelegen?",
          unterzeile: "Ursache statt Symptom",
          text: "Welche Änderung welchen Ausschlag verursacht hat, dazu was der Wettbewerb im selben Zeitraum gemacht hat.",
        },
        {
          titel: "Was tun wir als Nächstes?",
          unterzeile: "Drei Maßnahmen",
          text: "Die drei wichtigsten Maßnahmen für den kommenden Monat, mit dem erwarteten Effekt und dem, was wir dafür von euch brauchen.",
        },
        {
          titel: "Besprechung",
          unterzeile: "Mit euch",
          text: "Wir gehen den Report gemeinsam durch und legen die Reihenfolge der nächsten Schritte fest.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Eine Rechengrundlage",
      titel: "Alle Bereiche rechnen mit derselben Marge",
      text: "Was ein Produkt verdient, steht nicht dreimal verschieden im Raum. Content, Werbung und Strategie arbeiten mit derselben Marge je Produkt, damit sich Entscheidungen auf dieselbe Zahl beziehen. Wird ein Produkt beworben, das nach Gebühren kaum etwas übrig lässt, zeigt der Report das, bevor das Budget verbraucht ist.",
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
    expertise: {
      eyebrow: "Erfahrung",
      titel: "Erfahrung aus dem Tagesgeschäft",
      karten: [
        { titel: "Ø +30 %", text: "durchschnittliche Steigerung der Profitabilität in betreuten Konten." },
        { titel: "21 Mio. EUR", text: "betreuter Amazon-Jahresumsatz, der in dieser Form ausgewertet wird." },
        { titel: "60+ Marken", text: "mit einheitlichem Reporting, vergleichbar über Produkte und Marktplätze." },
      ],
    },
    faq: {
      eyebrow: "Häufige Fragen",
      titel: "Fragen zu Amazon Reporting und Analytics",
      fragen: [
        {
          frage: "Was ist der Unterschied zwischen ACoS und TACoS?",
          antwort:
            "Der ACoS (Advertising Cost of Sales) setzt die Werbekosten ins Verhältnis zum Umsatz, der durch Werbung entstanden ist. Der TACoS (Total ACoS) setzt sie ins Verhältnis zum gesamten Umsatz, auch zum organischen. Ein sinkender TACoS bei steigendem Umsatz bedeutet, dass die Werbung einen kleineren Teil des Geschäfts ausmacht.",
        },
        {
          frage: "Was ist der Search Query Report?",
          antwort:
            "Der Search Query Report ist ein Bericht aus Amazons Brand Analytics. Er zeigt, mit welchen Suchbegriffen Kunden eure Produkte finden und wie sich Impressionen, Klicks und Käufe im Vergleich zum Markt verhalten. Voraussetzung ist in der Regel die Markenregistrierung bei Amazon.",
        },
        {
          frage: "Warum zeigt ihr den Deckungsbeitrag und nicht nur den Umsatz?",
          antwort:
            "Umsatz sagt nicht, was nach Gebühren, Versand, Retouren und Wareneinsatz bleibt. Zwei Produkte mit gleichem Umsatz können sehr verschieden viel verdienen. Der Deckungsbeitrag zeigt, welche Produkte das Wachstum finanzieren und welche nur Umsatz erzeugen.",
        },
        {
          frage: "Welche Daten braucht ihr von uns?",
          antwort:
            "Für die Auswertung genügen die Berichte aus Seller Central oder Vendor Central. Für die Marge brauchen wir zusätzlich euren Wareneinsatz je Produkt, denn den kennt Amazon nicht. Den Zugriff auf das Konto erteilt ihr selbst und könnt ihn jederzeit ändern.",
        },
        {
          frage: "Wie oft bekommen wir einen Report?",
          antwort:
            "Einmal im Monat, mit einer gemeinsamen Besprechung. Auffälligkeiten dazwischen, etwa ein plötzlicher Einbruch, melden wir, ohne auf den Monatsabschluss zu warten.",
        },
        {
          frage: "Arbeitet ihr auch mit Daten aus Vendor Central?",
          antwort:
            "Ja. Die verfügbaren Berichte unterscheiden sich zwischen Seller Central und Vendor Central. Wir werten aus, was das jeweilige Konto liefert. Wo Daten fehlen, sagen wir es.",
        },
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
      eyebrow: "What this is about",
      titel: "Why inventory planning decides revenue on Amazon",
      absaetze: [
        "An item that is out of stock does not sell. On Amazon that costs twice: besides the lost sales the product drops in visibility, and after restocking it takes time to win back its old position in the search results.",
        "Too much stock is the opposite problem. Goods that sit in the Amazon warehouse for a long time cause storage fees, and Amazon adds surcharges for stock that has been there for long. Capital ends up in items that turn slowly and is missing for the ones that sell right now.",
        "Inventory planning therefore means knowing three things for every item: how many days the stock lasts (days of cover), how long a delivery takes from the order to the Amazon warehouse (lead time) and at which stock level to reorder. We calculate this per item and per marketplace, agree the rules with you and keep to them in daily operation.",
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
      lead: "Four tasks cover what costs revenue or money in FBA operations when it is left alone.",
      karten: [
        {
          titel: "Monitor stock",
          unterzeile: "Days of cover and availability per item",
          text: "Days of cover tells you how many days the current stock lasts at the current sales rate. We calculate it per item and marketplace and raise a flag when an item is heading for a stockout.",
          punkte: [
            "Calculate days of cover per item and marketplace",
            "Stockout warning before the stock is used up",
            "Spot overstock and slow movers through inventory health",
            "Clarify deviations between account and your warehouse",
          ],
        },
        {
          titel: "Plan shipments",
          unterzeile: "From shipment plan to goods receipt",
          text: "An FBA shipment starts with a shipment plan in Seller Central: which items go to which Amazon warehouse, and in what quantity? We create the plan, store dimensions, weight and packaging type, and follow the shipment through to goods receipt.",
          punkte: [
            "Create and submit shipment plans",
            "Maintain shipping templates with dimensions, weight and packaging type",
            "Monitor shipment status and goods receipt",
            "Resolve stranded inventory: stock in the Amazon warehouse without an active offer",
          ],
        },
        {
          titel: "Steer replenishment and costs",
          unterzeile: "Days of cover, lead time, fees",
          text: "When to reorder follows from days of cover and lead time. Whether an item leaves more margin through FBA or through your own shipping (FBM) we calculate per item, and we keep an eye on FBA fees.",
          punkte: [
            "Set the reorder point per item",
            "Calculate the FBA or FBM decision per item",
            "Monitor FBA fees and fee deviations",
            "Check availability in the FBA programme",
          ],
        },
        {
          titel: "Handle cases with Amazon",
          unterzeile: "Until a decision",
          text: "If units are missing after goods receipt or quantities differ, we open the case with Amazon Support, submit the evidence and follow up until Amazon has decided.",
          punkte: [
            "Open cases for goods receipt and quantity deviations",
            "Submit evidence and keep deadlines",
            "Escalate when there is no reply",
            "Support digital FBA shipment processes",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Process",
      titel: "Four steps to steady inventory control",
      lead: "First the stock review, then fixed rules, then daily operation. A report follows at the end of every month.",
      schritte: [
        {
          titel: "Stock review",
          unterzeile: "Reconcile account and warehouse",
          text: "We read stock, days of cover and fees per item from the account and compare them with the position in your warehouse. Deviations and slow movers are named afterwards.",
        },
        {
          titel: "Set the rules",
          unterzeile: "Reorder point and shipping route",
          text: "For each item it is set at which days of cover to reorder and whether FBA or FBM leaves more margin. The basis is sales rate, lead time and fees.",
        },
        {
          titel: "Daily operation",
          unterzeile: "Shipments and monitoring",
          text: "We create shipment plans, check shipment status and report deviations on a fixed rhythm. We see cases with Amazon through to a decision.",
        },
        {
          titel: "Monthly report",
          unterzeile: "Numbers and next steps",
          text: "You get days of cover, fees and a list of items to reorder or sell down now. You decide the order quantity, the data comes from us.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "Scope",
      titel: "What we do not do",
      text: "Physical work on the goods is not part of our services: no labelling, packing or bundling and no quality control in the warehouse. That stays with your warehouse or prep partner. We plan and steer FBA and inventory digitally in the Amazon account: shipments, stock, fees and cases.",
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
    expertise: {
      eyebrow: "Experience",
      titel: "Experience from daily operations",
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
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about FBA and inventory management",
      fragen: [
        {
          frage: "What does days of cover mean in FBA?",
          antwort:
            "Days of cover states for how many days the current stock lasts at the current sales rate. You divide the stock by the average daily sales. Together with the lead time of the delivery, the value determines when to reorder.",
        },
        {
          frage: "What is stranded inventory?",
          antwort:
            "Amazon uses the term for stock that sits in the Amazon warehouse without an active offer, for example because a listing was suppressed or closed. The goods cost storage fees and cannot be ordered. We find these cases in the account and resolve them by restoring the offer or triggering a removal order.",
        },
        {
          frage: "Do you prepare goods for Amazon, for example with labels?",
          antwort:
            "No. Labelling, packing and bundling are not part of our services, that stays with your warehouse or prep partner. We plan the shipment in the account, monitor its status and handle cases with Amazon.",
        },
        {
          frage: "Do you work in Seller Central and in Vendor Central?",
          antwort:
            "Yes, in both. The processes differ: in Seller Central the brand steers stock and shipments itself, in Vendor Central Amazon reorders from you. We know both routes and plan accordingly.",
        },
        {
          frage: "What does it cost when an advertised item is out of stock?",
          antwort:
            "If an advertised item runs out, you pay for clicks that cannot lead to a purchase. We align stock and campaigns so that budget only runs where goods are available.",
        },
        {
          frage: "How do we see what you do on inventory?",
          antwort:
            "Through the monthly report with days of cover, fees and next steps, and through the call about it. Anything unusual in between, such as an item shortly before a stockout, we report directly.",
        },
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
      eyebrow: "What this is about",
      titel: "What catalog management does on Amazon",
      absaetze: [
        "A product on Amazon consists of more than a title, images and bullet points. Behind the detail page sit dozens of fields that Amazon calls attributes: brand, material, size, colour, product type, target group and many more. Which of them are required depends on the category.",
        "These details decide whether a product appears in the category filters, which search queries it is matched to and whether Amazon activates it at all. Then there are the backend search terms: a field customers never see, from which Amazon takes synonyms and spelling variants.",
        "Catalog management means setting this structure up cleanly and keeping it that way: new products complete, variations in the right family, changes in bulk by flat file. A flat file is a spreadsheet template that creates or changes many products at once.",
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
          text: "New products are created with all required details for the category and product type, even without an ASIN (Amazon's product number) via EAN or GTIN. We place variations such as colour or size in one family (parent-child), so reviews collect in one place.",
          punkte: [
            "Create products and variations",
            "Capture required attributes per category and product type",
            "Set the parent-child relationship and variation theme",
          ],
        },
        {
          titel: "Maintain content",
          unterzeile: "Discoverability and conversion",
          text: "Titles, bullet points and description follow Amazon's rules for length and structure. The backend search terms hold synonyms, spellings and typos that have no room in the visible text.",
          punkte: [
            "Titles, bullet points and description per Amazon's rules",
            "Maintain backend search terms",
            "Add main image, listing images, A+ Content and Brand Store",
            "Localise content for further marketplaces",
          ],
        },
        {
          titel: "Clean up the catalog",
          unterzeile: "Duplicates, mismatches, listing status",
          text: "A grown catalog often holds duplicate ASINs, wrongly assigned offers and suppressed listings. We record them, report catalog errors to Amazon and correct the structure.",
          punkte: [
            "Detect and report catalog errors and duplicates",
            "Correct wrongly merged offers and variations",
            "Check suppressed and inactive offers and reactivate them",
          ],
        },
        {
          titel: "Bulk maintenance",
          unterzeile: "Hundreds of items at once",
          text: "With a flat file we change prices, attributes or images for many items in one pass instead of opening each listing separately.",
          punkte: [
            "Upload new products and changes by flat file",
            "Price, attribute and image changes in bulk",
            "Check processing reports and fix errors",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "Process",
      titel: "From the current state to a maintained catalog",
      lead: "We start with what is in the account today and end with a catalog you can change in bulk.",
      schritte: [
        {
          titel: "Read the current state",
          unterzeile: "Catalog and listing status",
          text: "We read attributes, variations and status per ASIN and mark gaps, duplicates and mismatches. This produces a list of corrections by urgency.",
        },
        {
          titel: "Set the templates",
          unterzeile: "Required fields per product type",
          text: "For each product type we define which details are needed and where they come from, for example your product data or the manufacturer's data sheet.",
        },
        {
          titel: "Create and change",
          unterzeile: "Singly or by flat file",
          text: "New products start complete. Changes to many items run in bulk through uploads, so they go live on one day and not spread over weeks.",
        },
        {
          titel: "Check and maintain",
          unterzeile: "Ongoing control",
          text: "After every upload we read the processing report and fix errors. We keep checking the listing status so that a suppressed offer does not cost visibility unnoticed.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "How it fits together",
      titel: "Catalog and content belong together",
      text: "Images, texts, A+ Content and brand story are created in the product images & SEO area. Catalog and listing management makes sure this content stands on a clean foundation: the right structure, complete attributes, maintained variations. One without the other wastes impact.",
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
    expertise: {
      eyebrow: "Experience",
      titel: "Experience from daily operations",
      karten: [
        { titel: "60+ brands", text: "managed, from product setup to ongoing maintenance." },
        {
          titel: "Flat files every day",
          text: "Bulk changes and new listings run through uploads, with the processing reports checked.",
        },
        {
          titel: "Seller Central and Vendor Central",
          text: "We work in both account types and know their differences in catalog and content.",
        },
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about catalog and listing management",
      fragen: [
        {
          frage: "What is a flat file on Amazon?",
          antwort:
            "A flat file is a spreadsheet template in which every row is a product and every column an attribute. Amazon reads the file and creates or changes products. For many items this is faster and less error-prone than maintaining single listings.",
        },
        {
          frage: "What are backend search terms?",
          antwort:
            "Backend search terms are a listing field customers do not see. It holds terms people search for that have no room in the title or bullet points: synonyms, other spellings and common typos. Amazon limits the length, so the field needs a careful selection.",
        },
        {
          frage: "What is a variation family (parent-child)?",
          antwort:
            "A variation family groups products that differ only in one attribute such as colour or size. The parent is the overarching product page, the children are the individual variations. Customers choose on one page, and the reviews apply to the whole family.",
        },
        {
          frage: "Can you create products without an ASIN?",
          antwort:
            "Yes. If a product has no ASIN yet, we create it with an EAN, GTIN or another valid product identifier. If it already exists in the Amazon catalog, we match your offer to the existing ASIN.",
        },
        {
          frage: "What happens when Amazon rejects an upload?",
          antwort:
            "Every upload produces a processing report. We read it, fix the errors, for example missing required fields or invalid values, and upload the corrected rows again.",
        },
        {
          frage: "Who creates the images and texts for the listings?",
          antwort:
            "The content is created in the product images & SEO area. Catalog and listing management maintains the structure underneath and brings the content into the account.",
        },
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
      eyebrow: "What this is about",
      titel: "Amazon reporting that explains instead of listing",
      absaetze: [
        "Amazon spreads its numbers across many reports: business reports for revenue and sessions, the advertising console for campaigns, the Search Query Report for search behaviour, plus stock and fees in Seller Central. Each report shows one part. What a product earns in the end, none of them shows.",
        "We bring these sources together for you and calculate at product level: revenue, contribution margin after Amazon fees and cost of goods, ACoS and TACoS. ACoS puts advertising cost in relation to the revenue the advertising itself generated. TACoS puts it in relation to total revenue, organic included. If revenue rises while TACoS falls, the business grows faster than advertising cost.",
        "The Search Query Report shows which search terms customers use to find your products and how click rate and conversion rate compare with the market. From it we see whether a listing is shown too rarely, gets too few clicks or turns too few of them into purchases.",
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
          text: "Revenue alone does not say what is left. Contribution margin shows what remains after Amazon fees, FBA costs and cost of goods. We calculate it per product and compare it with the previous month and the previous year.",
          punkte: [
            "Revenue, orders and contribution margin per product group",
            "Margin per product after fees and cost of goods",
            "Business reports with sessions and conversion rate",
            "Comparison with previous month and previous year",
          ],
        },
        {
          titel: "Advertising",
          unterzeile: "ACoS and TACoS in context",
          text: "Only both metrics together show whether advertising creates growth or merely pays for revenue that would have come anyway. That is why ACoS and TACoS stand side by side per campaign and per product.",
          punkte: [
            "ACoS and TACoS per campaign and product",
            "Search terms, placements and budgets",
            "Share of advertising in total revenue",
            "Effect of individual changes in a before-and-after comparison",
          ],
        },
        {
          titel: "Search and market",
          unterzeile: "Where you stand against the market",
          text: "The Search Query Report compares how often your products are seen, clicked and bought after a search, relative to the market. It shows whether the problem lies in visibility, in the image or in the offer.",
          punkte: [
            "Click rate and conversion rate against the market",
            "Rankings and search volume of the most important keywords",
            "Share of voice: your share of visibility against competitors",
          ],
        },
        {
          titel: "Account and stock",
          unterzeile: "What can slow sales down",
          text: "Some drops do not originate in advertising or listing. A falling account health, a lost Buy Box share or empty stock pull revenue down without showing in the advertising numbers.",
          punkte: [
            "Account health and Buy Box share (how often your offer is behind the buy button)",
            "Stock, days of cover and FBA fees",
            "Returns and their reasons",
          ],
        },
      ],
    },
    vorgehen: {
      eyebrow: "The report",
      titel: "How the monthly report is built",
      lead: "The report answers the three questions from the start and ends in a call with you.",
      schritte: [
        {
          titel: "What happened?",
          unterzeile: "Numbers in comparison",
          text: "Revenue, contribution margin and TACoS per product group, set against the previous month and the previous year.",
        },
        {
          titel: "Why did it happen?",
          unterzeile: "Cause, not symptom",
          text: "Which change caused which swing, plus what the competition did in the same period.",
        },
        {
          titel: "What do we do next?",
          unterzeile: "Three measures",
          text: "The three most important measures for the coming month, with the expected effect and what we need from you.",
        },
        {
          titel: "Review call",
          unterzeile: "With you",
          text: "We go through the report together and set the order of the next steps.",
        },
      ],
    },
    abgrenzung: {
      eyebrow: "One basis for calculation",
      titel: "Every area calculates with the same margin",
      text: "What a product earns is not stated three different ways. Content, advertising and strategy work with the same margin per product, so decisions refer to the same number. If a product is advertised that leaves hardly anything after fees, the report shows it before the budget is spent.",
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
    expertise: {
      eyebrow: "Experience",
      titel: "Experience from daily operations",
      karten: [
        { titel: "Ø +30 %", text: "average increase in profitability in managed accounts." },
        { titel: "EUR 21 million", text: "managed annual Amazon revenue, analysed in this form." },
        { titel: "60+ brands", text: "with uniform reporting, comparable across products and marketplaces." },
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      titel: "Questions about Amazon reporting and analytics",
      fragen: [
        {
          frage: "What is the difference between ACoS and TACoS?",
          antwort:
            "ACoS (advertising cost of sales) puts advertising cost in relation to the revenue generated by advertising. TACoS (total ACoS) puts it in relation to total revenue, organic included. A falling TACoS with rising revenue means advertising makes up a smaller part of the business.",
        },
        {
          frage: "What is the Search Query Report?",
          antwort:
            "The Search Query Report is a report from Amazon Brand Analytics. It shows which search terms customers use to find your products and how impressions, clicks and purchases compare with the market. It usually requires a brand registered with Amazon.",
        },
        {
          frage: "Why do you show contribution margin and not just revenue?",
          antwort:
            "Revenue does not say what remains after fees, shipping, returns and cost of goods. Two products with the same revenue can earn very different amounts. Contribution margin shows which products finance the growth and which only create revenue.",
        },
        {
          frage: "What data do you need from us?",
          antwort:
            "The reports from Seller Central or Vendor Central are enough for the analysis. For margin we also need your cost of goods per product, because Amazon does not know it. You grant account access yourself and can change it at any time.",
        },
        {
          frage: "How often do we get a report?",
          antwort:
            "Once a month, with a review call. Anything unusual in between, such as a sudden drop, we report without waiting for the monthly close.",
        },
        {
          frage: "Do you also work with Vendor Central data?",
          antwort:
            "Yes. The available reports differ between Seller Central and Vendor Central. We analyse what the account provides and say where data is missing.",
        },
      ],
    },
    cta: "Which number are you missing for your next decision?",
  },
};
