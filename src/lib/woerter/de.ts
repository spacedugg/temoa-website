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
      /* Deutsche Anfuehrungszeichen unten und oben. Im Englischen stehen
         beide oben und sehen anders aus. */
      anfuehrungAuf: "„",
      anfuehrungZu: "“",
      sterne: "5 von 5 Sternen",
    },

    mannschaft: {
      label: "Team",
      titel: "Das Team hinter temoa.",
      lead: "Kein Konto liegt bei einer Person. An eurem Sortiment arbeiten mehrere gleichzeitig, jeder in seinem Bereich, mit denselben Zahlen vor sich.",
      bildAlt: "Die Gründer von temoa",
    },
  },
  /* ============================================================
     Die fuenf Leistungsseiten.

     `meta` traegt Name und Beschreibung fuer den Seitentitel. Die Adressen
     bleiben deutsch, auch auf der englischen Seite: sie sind gesetzt, ein
     Wechsel bricht Verweise und Suchergebnisse.

     `bausteine` sind die Beschriftungen, die in den Bausteinen selbst
     stecken und nicht in der Copy einer einzelnen Seite: der Knopf im
     Seitenkopf, der Link unter einem Fall, die Laender an der Weltkugel, die
     Beschriftungen der beiden Diagramme.
     ============================================================ */
  leistungen: {
    meta: {
      strategie: {
        name: "Strategie",
        beschreibung:
          "Search Query Bericht, Ads-Performance, Verkäufe und Traffic ausgewertet. Daraus entsteht die Reihenfolge der nächsten Schritte für euren Amazon-Account.",
      },
      content: {
        name: "Produktbilder & SEO",
        beschreibung:
          "Hauptbild, Listingbilder, Titel, Bullets und A+ Content, ausgerichtet auf die beiden Zahlen, an denen Amazon euch misst: Klickrate und Conversion.",
      },
      advertising: {
        name: "PPC Advertising",
        beschreibung:
          "Jedes Produkt darauf durchgerechnet, was nach Gebühren, FBA und Wareneinsatz übrig bleibt. Mehr Budget bekommt nur, was danach Gewinn bringt.",
      },
      account: {
        name: "Account Management",
        beschreibung:
          "Buy-Box, Bestand, Konto-Gesundheit und Pricing steuern wir wie einen eigenen Geschäftsbereich. So gewinnt ihr Zeit für Produkt und Sortiment.",
      },
      international: {
        name: "Internationalisierung",
        beschreibung:
          "Jeder Marktplatz ist ein eigener Markt. Eigene Keyword-Recherche, eigener Content und eigene Kampagnen, für jedes Land neu aufgebaut.",
      },
    },

    bausteine: {
      knopf: "Potenzialanalyse buchen",
      fallLesen: "Ganze Case Study lesen",
      ausDerPraxis: "Aus der Praxis",
      dasProblem: "Das Problem",
      unserAnsatz: "Unser Ansatz",
      vorherNachher: "Vorher / Nachher",
      wasWirUebernehmen: "Was wir übernehmen",
    },

    /* Die drei Zahlen, an denen Content gemessen wird. Der Kunde nennt diese
       Sektion den Nordstern der Content-Seite. */
    contentBand: {
      eyebrow: "Woran Amazon euer Listing misst",
      titel: "Drei Zahlen entscheiden alles.",
      lead: "Wie oft ihr gezeigt werdet. Wie oft geklickt wird. Wie oft gekauft wird. Jedes Bild und jeder Satz, den wir schreiben, zahlt auf eine dieser drei Zahlen ein.",
      /* Die Ueberschriften hiessen einmal „Höherer Impressionsanteil" und
         „Conversion Rate Uplift": zwei Steigerungsbehauptungen und ein
         englischer Brocken. Jetzt steht dort die Kennzahl, die Aussage macht
         der Satz darunter. */
      karten: [
        {
          titel: "Impressionsanteil",
          text: "Wie oft ihr überhaupt auftaucht, wenn jemand euer Produkt sucht.",
        },
        {
          titel: "Klickrate",
          text: "Wie viele von denen, die euch sehen, auf euer Bild klicken.",
        },
        {
          titel: "Conversion Rate",
          text: "Wie viele von denen, die klicken, am Ende kaufen.",
        },
      ],
    },

    contentSchau: {
      eyebrow: "Content",
      titelVor: "Jedes Element eurer ",
      titelEm: "Produktseite.",
      lead: "Vom ersten Bild im Suchergebnis bis zum Feld, das nur Amazon liest.",
      backend: "Backend",
      kacheln: [
        {
          kicker: "Hauptbild",
          titel: "Der Klick fällt im Suchergebnis.",
          text: "Neben drei anderen Treffern habt ihr eine Sekunde. Das Hauptbild entscheidet, ob geklickt wird.",
        },
        {
          kicker: "Listing",
          titel: "Sieben Bilder, die zusammen erzählen.",
          text: "Größe, Anwendung, Material, Lieferumfang. Wer scrollt, hat danach keine Frage mehr offen.",
        },
        {
          kicker: "A+ und Premium A+",
          titel: "Der Teil unter den Bullets.",
          text: "Liegende Module, eines unter dem anderen. Hier beantwortet ihr, woran der Kauf sonst scheitert.",
        },
        {
          kicker: "Brand Story",
          titel: "Aus einem Produkt wird eine Marke.",
          text: "Das Band über der Detailseite führt zu euren anderen Produkten, statt zum nächsten Anbieter.",
        },
        {
          kicker: "Titel, Bullets, Backend",
          titel: "Gefunden werden, ohne Wortsalat.",
          text: "Lesbar für Menschen geschrieben, verständlich für Rufus, COSMO und A10.",
        },
      ],
      merksatzVor: "Solange das Listing nicht von allein verkauft, ",
      merksatzMark: "verpufft jeder Euro Werbung.",
    },

    budgetDiagramm: {
      eyebrow: "Wohin dasselbe Budget fließt",
      ohneLabel: "Ohne saubere Struktur",
      ohneVerloren: "Klicks ohne Kauf",
      ohneVerkauf: "Verkäufe",
      mitLabel: "So bauen wir es auf",
      mitVerkauf: "Verkäufe",
      mitTest: "Test",
    },

    /* Bewusst ohne Zahlen: ein Kostenanteil in Prozent waere eine erfundene
       Angabe, die Breiten reichen aus, um die Reihenfolge zu zeigen. */
    margenDiagramm: {
      eyebrow: "Was von einem Verkauf übrig bleibt",
      kosten: ["Wareneinsatz", "Amazon-Gebühren", "Versand", "Werbung", "Gewinn"],
      produktA: "Produkt A",
      urteilA: "bekommt mehr Budget",
      produktB: "Produkt B",
      urteilB: "wird gehalten",
    },

    weltkugel: {
      bildAlt:
        "Eine Weltkugel mit Blick über den Atlantik. In Deutschland, Frankreich, Italien, Spanien, den Niederlanden, Belgien, Polen, Schweden und den USA steckt je eine Fahne. Von Deutschland laufen leuchtende Linien zu allen anderen Märkten.",
      /* Neun Maerkte, in der Reihenfolge der Kuerzel in `Weltkugel`.
         Grossbritannien ist nicht dabei: eine Fahne in der Liste, die im Bild
         fehlt, faellt sofort auf. */
      laender: [
        "Deutschland",
        "Frankreich",
        "Italien",
        "Spanien",
        "Niederlande",
        "Belgien",
        "Polen",
        "Schweden",
        "USA",
      ],
    },

    strategie: {
      hero: {
        eyebrow: "Individuelle Amazon-Strategie",
        titelVor: "Die Antworten liegen ",
        titelEm: "in eurem Konto.",
        lead: "Search Query Bericht, Ads-Performance, Verkäufe und Traffic. Wir werten die Daten aus, die ihr längst bezahlt habt. Daraus entsteht die Reihenfolge der nächsten Schritte.",
        bildAlt: "Aus den Berichten im Konto entsteht eine Reihenfolge",
      },
      problem: {
        titel: "Warum im Konto nichts vorangeht.",
        punkte: [
          "Die Berichte liegen im Konto, ausgewertet hat sie zuletzt niemand.",
          "Werbung wird hochgefahren, bevor das Listing konvertiert.",
          "Die Marge wird nie bis auf die einzelne Variante durchgerechnet.",
          "Es fehlt eine Reihenfolge: alles ist wichtig, nichts kommt zuerst.",
        ],
        bruecke:
          "Wer die Berichte nicht auswertet, optimiert nach Geschmack. Das kostet über Monate Marge.",
      },
      inhalt: {
        eyebrow: "Was drinsteckt",
        titel: "Von der Analyse zum priorisierten Fahrplan.",
        karten: [
          {
            titel: "Analyse",
            unterzeile: "Was in den Berichten steht",
            punkte: [
              "Zu welchen Suchbegriffen ihr gefunden, geklickt und gekauft werdet",
              "Wie viele Besucher jedes Produkt bekommt und wie viele davon kaufen",
              "Wie sich euer Anteil am Markt über die Monate verändert",
              "Was jede einzelne Variante nach allen Gebühren verdient",
            ],
          },
          {
            titel: "Strategie & Fahrplan",
            unterzeile: "Was daraus folgt",
            punkte: [
              "Welche Produkte wachsen sollen und welche nur gehalten werden",
              "Ein Zielwert für ACoS und TACoS",
              "Die Reihenfolge: was zuerst, was danach, was später",
            ],
          },
        ],
      },
      lieferung: {
        eyebrow: "Was ihr danach in der Hand habt",
        titel: "Zwei Dokumente, mit denen ihr arbeiten könnt.",
        stuecke: [
          {
            kicker: "Dokument 1",
            titel: "Margenübersicht je Artikel",
            punkte: [
              "Verkaufspreis, Amazon-Gebühren, FBA, Wareneinsatz und Werbung je Variante",
              "Was am Ende übrig bleibt, in Euro und in Prozent",
              "Welche Artikel Wachstum verdienen und welche nur gehalten werden",
            ],
          },
          {
            kicker: "Dokument 2",
            titel: "Fahrplan für die nächsten Monate",
            punkte: [
              "Was zuerst kommt, weil es schnell wirkt, und was warten kann",
              "Welche Artikel in den ersten Content-Sprint gehen",
              "Ab wann Kampagnen dazugeschaltet werden und mit welchem Ziel",
              "Wie tief wir ins Tagesgeschäft gehen sollen, von Beobachten bis Übernehmen",
              "Wo der Bestand knapp wird, bevor er die Skalierung ausbremst",
            ],
          },
        ],
      },
      ergebnis: {
        titel: "Vitaworld, Q1 2025 auf Q1 2026",
        zeile: "Erst durchgerechnet, dann skaliert: das Werbebudget stieg um 39 %, der Umsatz um 147 %.",
        werte: [
          { wert: "+147 %", label: "Umsatz", sub: "im Vergleich der beiden Quartale" },
          { wert: "−44 %", label: "TACoS", sub: "bei wachsendem Umsatz" },
          {
            wert: "−19,4 %",
            label: "Anteil der Werbung am Umsatz",
            sub: "das Wachstum kommt organisch",
          },
        ],
      },
      cta: "Wisst ihr, wo euer größtes Potenzial liegt?",
    },

    content: {
      hero: {
        eyebrow: "Produktbilder & SEO",
        titelVor: "Content, der aus Klicks ",
        titelEm: "Käufer macht.",
        lead: "Hauptbild, Listingbilder, Titel, Bullets und A+ Content, ausgerichtet auf die beiden Zahlen, an denen Amazon euch misst: Klickrate und Conversion.",
        bildAlt: "Produktseite aus Hauptbild, Textblöcken und weiteren Bildern",
      },
      ansatz: {
        titel: "Schöner Content allein verkauft nichts.",
        text: "Wir entwickeln jedes Listing aus den Daten eures Kontos: wonach gesucht wird, an welcher Stelle Besucher abspringen, wo der Wettbewerb an euch vorbeizieht. Daraus entstehen Bilder und Texte, die verkaufen und organisch ranken.",
        bildAlt: "Vier Treffer nebeneinander, einer leuchtet, darüber eine steigende Kurve",
      },
      vergleich: {
        titel: "Was sich mit starkem Content ändert.",
        linksLabel: "Vor der Zusammenarbeit",
        links: [
          "Traffic kommt, gekauft wird woanders",
          "Das Listing taucht in der Suche kaum auf",
          "Keywords ohne System, Rankings ohne Plan",
          "Werbebudget läuft auf Seiten, die nicht konvertieren",
          "Richtlinienverstöße gefährden das Konto",
        ],
        rechtsLabel: "So arbeiten wir",
        rechts: [
          "Retail Ready: der Content steht, bevor Budget fließt",
          "Hauptbild auf die Klickrate ausgelegt, nicht nach Geschmack gewählt",
          "Keywords, die tatsächlich zum Kauf führen, gezielt besetzt",
          "A+ Content beantwortet die Fragen, an denen der Kauf sonst scheitert",
          "Richtlinienkonform, ohne Risiko fürs Konto",
        ],
      },
      ergebnis: {
        titel: "HaA, Launch über 17 Wochen",
        zeile: "Ohne Rankings, ohne Bewertungen gestartet. Das Wachstum kam aus Conversion, nicht aus Budget.",
        werte: [
          { wert: "+439 %", label: "Conversion Rate", sub: "Launch-Woche bis Spitze" },
          { wert: "×14", label: "Bestellungen pro Woche", sub: "im selben Zeitraum" },
          { wert: "+46 %", label: "Click-Through-Rate", sub: "nach neuem Hauptbild" },
        ],
      },
      cta: "Wie viel Umsatz verliert ihr an schwachem Content?",
    },

    advertising: {
      hero: {
        eyebrow: "PPC Advertising",
        titelVor: "Skalieren, ohne die ",
        titelEm: "Marge zu verlieren.",
        lead: "Wir rechnen jedes Produkt darauf durch, was nach Gebühren, FBA und Wareneinsatz übrig bleibt. Mehr Budget bekommt nur, was danach Gewinn bringt.",
        bildAlt: "Budget geht dorthin, wo nach Kosten Gewinn bleibt",
      },
      problem: {
        titel: "Wo Amazon-Werbung Geld verbrennt.",
        punkte: [
          "Ein großer Teil des Budgets fließt in Keywords, die nie profitabel werden.",
          "Auto-, Phrase- und Exact-Kampagnen bieten gegeneinander.",
          "Sponsored Products und Sponsored Brands konkurrieren um dieselben Klicks.",
          "Niemand steuert auf Produktebene, also auf den tatsächlichen Gewinn.",
          "Einmal aufgesetzt, dann sich selbst überlassen.",
        ],
        bruecke: "Professionelles PPC beginnt bei der Struktur, lange vor dem ersten Gebot.",
      },
      ansatz: {
        titel: "Mehr Budget ist keine Strategie.",
        text: "Bevor ein Produkt mehr Budget bekommt, rechnen wir es durch: Wareneinsatz, Amazon-Gebühren, Versand, Werbung. Was danach Gewinn bringt, skalieren wir. Der Rest wird gehalten.",
      },
      leistung: {
        titel: "Von der Margenrechnung bis zum einzelnen Gebot.",
        karten: [
          {
            titel: "Erst rechnen, dann skalieren",
            text: "Mehr Budget bekommt nur, was nach allen Kosten Gewinn bringt.",
          },
          {
            titel: "Kampagnen sauber aufgebaut",
            text: "Jede Kampagne hat eine Aufgabe. Keine bietet gegen die andere.",
          },
          {
            titel: "Eure Marke verteidigt",
            text: "Wer nach eurem Namen sucht, landet bei euch, nicht beim Wettbewerb.",
          },
          {
            titel: "Neue Suchbegriffe laufend gesucht",
            text: "Was verkauft, wandert in die eigene Kampagne. Was nicht, fliegt raus.",
          },
          {
            titel: "Gebote täglich nachgezogen",
            text: "Angepasst an Wettbewerb, Saison und Platzierung, nicht einmal im Monat.",
          },
          {
            titel: "Werbung, die das Ranking mitzieht",
            text: "Gemessen am TACoS: was Werbung kostet, gemessen am gesamten Umsatz.",
          },
        ],
      },
      ergebnis: {
        titel: "FUTUM, erstes volles Amazon-Jahr",
        zeile: "Zwei Produktlaunches in einer Akut-Nische, profitabel skaliert statt Wachstum eingekauft.",
        werte: [
          { wert: "−19,7 %", label: "ACoS", sub: "trotz Launch-Skalierung" },
          { wert: "80 %", label: "organische Verkäufe", sub: "Spitzenanteil am Gesamtumsatz" },
          { wert: "+37,3 %", label: "Conversion Rate", sub: "auf Ebene des ganzen Kontos" },
        ],
      },
      cta: "Wo versickert euer Werbebudget?",
    },

    account: {
      hero: {
        eyebrow: "Account Management",
        titelVor: "Ihr baut die Marke. Das ",
        titelEm: "Tagesgeschäft liegt bei uns.",
        lead: "Buy-Box, Bestand, Konto-Gesundheit und Pricing steuern wir wie einen eigenen Geschäftsbereich. So gewinnt ihr Zeit für Produkt und Sortiment.",
        bildAlt: "Tagesgeschäft an einem Pult gesteuert",
      },
      problem: {
        titel: "Die meisten reagieren erst, wenn es brennt.",
        punkte: [
          "Buy-Box verloren, oft tagelang unbemerkt.",
          "Bestände leer, Rankings brechen weg.",
          "Performance bricht ein, niemand sieht den Grund.",
          "Policy-Warnung im Postfach, das Konto in Gefahr.",
        ],
        bruecke: "Wir greifen früher ein, bevor es Umsatz kostet.",
      },
      faelle: {
        eyebrow: "Wie wir arbeiten",
        titel: "So bleibt euer Account stabil.",
        bildAlt:
          "Buy-Box, Bestand und Konto-Gesundheit nebeneinander, eine Warnleuchte meldet",
        stuecke: [
          {
            titel: "Buy-Box weg, 9:40 Uhr",
            text: "Ein Mehranbieter unterbietet euch um 40 Cent. Wir sehen es am Vormittag, prüfen die Marge und entscheiden mit euch: mitgehen oder aussitzen.",
          },
          {
            titel: "Noch 18 Tage Bestand vor der Saison",
            text: "Der Nachschub braucht 6 Wochen bis ins Lager. Wir melden das, bevor der Artikel leerläuft und das Ranking mit ihm.",
          },
          {
            titel: "Richtlinienwarnung im Postfach",
            text: "Ein Attribut verstößt gegen eine neue Vorgabe. Wir schreiben den Case, korrigieren das Listing und melden zurück, wenn es erledigt ist.",
          },
        ],
      },
      aufgaben: {
        titel: "Acht Aufgaben weniger auf eurem Tisch.",
        liste: [
          {
            titel: "Buy-Box-Monitoring",
            text: "Verlust sofort erkannt, samt Ursache: Preis, Verfügbarkeit, Mehranbieter.",
          },
          {
            titel: "Bestand und Nachschub",
            text: "Nachschub geplant, damit kein Bestseller leerläuft.",
          },
          {
            titel: "Cases und Amazon-Support",
            text: "Wir schreiben die Tickets, hängen hinterher und eskalieren, wenn nichts passiert.",
          },
          {
            titel: "Produkte anlegen und pflegen",
            text: "Neue Artikel, Varianten und Flat-File-Uploads, inklusive der Attribute, die kaum jemand füllt.",
          },
          {
            titel: "Richtlinien im Blick",
            text: "Neue Amazon-Vorgaben werden geprüft und umgesetzt, bevor sie zur Warnung werden.",
          },
          {
            titel: "Änderungen und Tests",
            text: "Hauptbild, Titel oder Preis geändert und gegen den Vorzeitraum gemessen, statt nach Gefühl.",
          },
          {
            titel: "Pricing und Marge",
            text: "Preise gesteuert, damit Wachstum nicht die Marge frisst.",
          },
          {
            titel: "Feste Termine mit euch",
            text: "Regelmäßig, mit klaren nächsten Schritten.",
          },
        ],
      },
      ergebnisBand: {
        badge: "Wir machen die Arbeit",
        titel: "Ihr bekommt die Ergebnisse.",
        punkte: [
          "Buy-Box-Verluste am selben Tag geklärt",
          "Nachschub geplant, bevor der Bestand kippt",
          "Monatsreport mit klaren nächsten Schritten",
          "Anfragen an den Amazon-Support laufen über uns",
        ],
      },
      ergebnis: {
        titel: "Marke aus Gartenzubehör, Saison 2026",
        zeile: "Schon im Herbst vorbereitet, damit die Nachfrage im April auf einen Account trifft, der sie aushält.",
        werte: [
          { wert: "−35 %", label: "TACoS im Hauptmarkt", sub: "über die Saison" },
          { wert: "+21 %", label: "Conversion Rate", sub: "Hauptmarkt DE" },
          { wert: "+110 %", label: "Klicks Italien", sub: "bei sinkendem ACoS" },
        ],
      },
      cta: "Gebt das Tagesgeschäft an uns ab.",
    },

    international: {
      hero: {
        eyebrow: "Internationalisierung",
        titelVor: "Jedes Land sucht ",
        titelEm: "anders.",
        lead: "Was in Deutschland verkauft, verkauft in Italien nicht automatisch. Andere Suchbegriffe, andere Preise, anderer Wettbewerb. Jedes Land bekommt eigene Recherche, eigenen Content und eigene Kampagnen.",
        bildAlt: "Jeder Marktplatz mit eigenem Aufbau um einen gemeinsamen Kern",
      },
      problem: {
        titel: "Warum neue Marktplätze oft enttäuschen.",
        punkte: [
          "Listings werden übersetzt, statt für den Markt geschrieben.",
          "Jeder Marktplatz hat eigene Suchbegriffe und Kaufgewohnheiten.",
          "Kampagnen aus dem Startmarkt werden eins zu eins übernommen.",
          "Ohne lokale Relevanz bleiben Sichtbarkeit und Conversion aus.",
        ],
        bruecke:
          "Andere Käufer, andere Suchbegriffe, anderer Wettbewerb. Deshalb beginnt bei uns jedes Land mit einer eigenen Recherche, nicht mit einer Übersetzung.",
      },
      vorgehen: {
        eyebrow: "Unser Vorgehen",
        titel: "Was wir für jeden Marktplatz neu machen.",
        karten: [
          {
            titel: "Eigene Keyword-Recherche",
            unterzeile: "Jeder Markt sucht anders",
            text: "Für jeden Marktplatz recherchieren wir die Suchbegriffe neu, statt sie aus dem Startmarkt zu übersetzen.",
          },
          {
            titel: "Lokalisierter Content",
            unterzeile: "Geschrieben für den Markt",
            text: "Hauptbild, Titel, Bullets und A+ Content je Marktplatz neu erstellt, sprachlich und kulturell. KI-ready für Rufus und COSMO im jeweiligen Markt.",
          },
          {
            titel: "Eigene Kampagnen",
            unterzeile: "Lokal gesteuert",
            text: "Sponsored Products, Brands und Display je Marktplatz neu aufgesetzt und über den lokalen TACoS gesteuert.",
          },
          {
            titel: "Markt für Markt",
            unterzeile: "Der gleiche volle Aufwand",
            text: "Die komplette Arbeit, die ein Marktplatz bekommt, bekommt auch der nächste. Ohne Abkürzung.",
          },
        ],
      },
      karte: {
        eyebrow: "Wie es aussieht",
        titel: "Ein Konto, jedes Land für sich aufgebaut.",
        text: "Der Startmarkt bleibt der Startmarkt. Jedes weitere Land bekommt die komplette Arbeit noch einmal, statt eine Übersetzung des ersten.",
      },
      ergebnis: {
        titel: "Miganeo, Sommer 2026",
        zeile: "Fünf Marktplätze in zehn Wochen aufgebaut, aus vier losen Kampagnen wurden 120.",
        werte: [
          { wert: "×20", label: "Umsatz im Ausland", sub: "8.967 € auf 179.287 €" },
          { wert: "9,9 %", label: "ACoS", sub: "299.184 € Umsatz bei 29.490 € Einsatz" },
          {
            wert: "98,9 %",
            label: "außerhalb der eigenen Marke",
            sub: "neu gewonnen, nicht umgebucht",
          },
        ],
      },
      vergleich: {
        titel: "Übersetzt oder lokalisiert.",
        linksLabel: "Nur übersetzt",
        links: [
          "Titel wörtlich übersetzt, an den Suchbegriffen vorbei",
          "Gleiche Keywords wie im Startmarkt",
          "Kampagnen kopiert, Budget ohne lokalen Bezug",
          "Conversion bleibt hinter dem Startmarkt zurück",
        ],
        rechtsLabel: "Lokalisiert",
        rechts: [
          "Content je Markt neu geschrieben, auf Klickrate und Conversion",
          "Eigene Keyword-Recherche pro Marktplatz",
          "Kampagnen lokal aufgesetzt und über den TACoS gesteuert",
          "Profitables Wachstum auf jedem neuen Marktplatz",
        ],
      },
      cta: "Welcher Markt ist euer nächster?",
    },
  },

  /* ============================================================
     Die Uebersichtsseite Full Service.

     `zusammenlauf` sind die Beschriftungen der Grafik unter „Zusammenarbeit".
     Vier Kacheln von rund achtzig Pixeln tragen dort Kurzformen, nicht die
     vollen Namen der Leistungen: das ist die eine Ausnahme von der Regel der
     elften Runde, dass die fuenf Leistungen ueberall gleich heissen.
     ============================================================ */
  fullService: {
    meta: {
      titel: "Full Service · temoa",
      beschreibung:
        "Strategie, Content, Advertising, Account Management und neue Marktplätze für euren Amazon-Account. Fünf Bereiche, ein Team, alle mit denselben Zahlen.",
    },

    kopf: {
      eyebrow: "Amazon Full Service",
      titelVor: "Ein eingespieltes Team für euren ",
      titelMark: "kompletten Amazon-Account.",
      lead: "Wir übernehmen euren Amazon-Account vollständig, von der Analyse bis zum Tagesgeschäft. Für jeden Bereich bekommt ihr jemanden, der ihn hauptberuflich macht.",
      bildAlt:
        "Fünf Arbeitsplätze auf einem Podest, alle verbunden mit einer gemeinsamen Auswertung",
    },

    fuerWen: {
      label: "Für wen wir arbeiten",
      titel: "Passt das zu eurer Marke?",
      /* Die Ueberschrift traegt die Aussage allein, dafuer ein paar Woerter
         laenger, und das Icon wird gross. */
      punkte: [
        "Eigene Marke, ab 50.000 € Umsatz im Monat",
        "Starke Produkte, aber wenig Amazon-Wissen im Haus",
        "Das Sortiment wächst schneller als das Team",
        "Mehrere hundert Artikel auf mehreren Marktplätzen",
      ],
    },

    nichtFuerWen: {
      label: "Wann es nicht passt",
      titelVor: "Und wann wir ",
      titelMark: "absagen.",
      lead: "Vier Fälle, in denen wir im ersten Gespräch sagen, dass es keinen Sinn hat. Lieber jetzt als nach vier Monaten.",
      karten: [
        {
          titel: "Ihr wollt Umsatz, egal was er kostet",
          text: "Wir drehen Kampagnen so lange auf, bis die Zahl stimmt: das können wir, aber davon habt ihr am Jahresende nichts.",
        },
        {
          titel: "Das Listing soll bleiben, wie es ist",
          text: "Wenn Bilder und Texte nicht angefasst werden dürfen, bleibt nur Werbung. Dann werden Klicks jedes Jahr teurer und die Marge enger.",
        },
        {
          titel: "Ihr sucht den günstigsten Anbieter",
          text: "Fünf Bereiche hauptberuflich zu besetzen, kostet Geld. Unter 50.000 € Monatsumsatz auf Amazon rechnet sich das für euch nicht.",
        },
        {
          titel: "Entscheidungen dauern bei euch Monate",
          text: "Ein Hauptbild, das im März freigegeben wird, verkauft nicht mehr in der Saison. Wir brauchen einen Ansprechpartner, der entscheiden darf.",
        },
      ],
    },

    ausgangslage: {
      label: "Ausgangslage",
      titel: "Warum die üblichen Lösungen an Amazon scheitern.",
      karten: [
        {
          titel: "Internes Team zu klein",
          text: "Eine Person kann Strategie, Content, Werbung und Betrieb nicht in der nötigen Tiefe abdecken.",
        },
        {
          titel: "Einzeldienstleister, getrennte Sicht",
          text: "Einer steuert PPC nur auf Werbeausgaben, einer erstellt Content ohne Blick auf den Bestand. Die Gesamtstrategie verantwortet niemand.",
        },
        {
          titel: "Amazon ist ein Vollzeitjob",
          text: "20 bis 40 Stunden pro Woche auf einer Plattform, die sich ständig verändert.",
        },
      ],
      schluss:
        "Was weh tut, sieht man nicht im Konto: der Suchbegriff, auf dem ihr nie aufgetaucht seid, und der Wettbewerber, der euch den Platz abgenommen hat.",
    },

    bereiche: {
      label: "Was wir übernehmen",
      titel: "Fünf Bereiche, jeder in voller Tiefe.",
      /* Jeder Bereich traegt seinen Namen. Vorher stand ueber Block 01 nur
         die Ueberschrift; wer nicht schon wusste, dass das die Strategie ist,
         hat es an dieser Stelle nicht erfahren. */
      liste: [
        {
          bereich: "Strategie",
          titel: "Wir lesen euren Markt bis auf den einzelnen Suchbegriff.",
          zeile: "Bevor optimiert wird, steht fest, wo eure Umsätze liegen und welche Ziele realistisch sind.",
          punkte: [
            "Welche Suchbegriffe euch Umsatz bringen und welche nur Geld kosten",
            "Wo ihr im Markt steht, Monat für Monat",
            "Was bei jeder Variante nach allen Gebühren übrig bleibt",
          ],
        },
        {
          bereich: "Produktbilder & SEO",
          titel: "Ein Listing, das auch ohne Werbung verkauft.",
          zeile: "Aus Sichtbarkeit werden Klicks, aus Klicks Käufe, bis das Listing Retail Ready ist.",
          punkte: [
            "Zuerst das Hauptbild: es entscheidet, ob im Suchergebnis geklickt wird",
            "Alle Produktbilder, A+ bis Premium A+ Content, Brand Store und Markengeschichte",
            "Titel, Bullets und die Felder im Hintergrund, verständlich für Rufus und COSMO",
          ],
        },
        {
          bereich: "PPC Advertising",
          titel: "Saubere Kampagnen, gesteuert am TACoS.",
          zeile: "Sobald das Listing organisch verkauft, bringt PPC planbaren Umsatz dazu.",
          punkte: [
            "Jede Kampagne mit einer klaren Aufgabe, keine bietet gegen die andere",
            "Gebote und Platzierungen getrennt gesteuert, Top-of-Search gezielt",
            "Beim Aufbau neuer Suchbegriffe bewusst teurer, danach zurück auf Profit",
          ],
        },
        {
          bereich: "Account Management",
          titel: "Stabiler Betrieb, geschützte Rankings.",
          zeile: "Operative Themen, bei denen ein Fehler aufgebaute Sichtbarkeit kostet.",
          punkte: [
            "Buy-Box weg? Wir sehen es am selben Tag, samt Ursache",
            "Nachschub geplant, damit kein Bestseller leerläuft und Rankings kippen",
            "Konto-Gesundheit im Blick, Fälle laufen über uns zum Amazon-Support",
            "Preise so gesteuert, dass Wachstum die Marge nicht auffrisst",
          ],
        },
        {
          bereich: "Internationalisierung",
          titel: "Jeder neue Marktplatz von Grund auf aufgebaut.",
          zeile: "Der komplette Service auf weiteren Amazon-Marktplätzen, je Markt neu gemacht.",
          punkte: [
            "Eigene Keyword-Recherche je Marktplatz",
            "Content und Kampagnen für jeden Markt neu aufgesetzt",
            "Lokalisieren statt übersetzen",
          ],
        },
      ],
    },

    reporting: {
      label: "Immer enthalten",
      titel: "Reporting, das ihr in fünf Minuten versteht.",
      lead: "Kein Datenexport zum Selbstauswerten. Ihr bekommt die Zahlen, auf die es ankommt, und dazu unsere Einordnung.",
      bildAlt: "Ein schwebendes Dashboard mit steigender Kurve, Balken und zwei Kennzahlkarten.",
      /* Ein Report, den eine Geschaeftsfuehrung liest, beantwortet drei
         verschiedene Fragen: Was ist passiert, warum, und was machen wir
         jetzt. Vorher stand hier dreimal derselbe Rueckblick. */
      punkte: [
        {
          titel: "Was der Monat gebracht hat",
          text: "Umsatz, Deckungsbeitrag und TACoS je Produktgruppe, gegen den Vormonat und gegen das Vorjahr.",
        },
        {
          titel: "Woran es lag",
          text: "Welche Änderung welchen Ausschlag verursacht hat, dazu was der Wettbewerb im selben Zeitraum gemacht hat.",
        },
        {
          titel: "Was als Nächstes ansteht",
          text: "Die drei Maßnahmen für den kommenden Monat, mit erwartetem Effekt und dem, was wir dafür von euch brauchen.",
        },
      ],
    },

    unterschied: {
      label: "Zusammenarbeit",
      titelVor: "Bei euch arbeitet ",
      titelMark: "ein Team,",
      titelNach: " nicht drei Firmen.",
      punkte: [
        "Ein Ansprechpartner für alle fünf Bereiche, nicht drei Dienstleister",
        "Was in den Zahlen auffällt, ist in derselben Woche im Listing geändert",
        "Eine Zahl gilt für alle: was ein Produkt verdient, steht nicht dreimal verschieden im Raum",
        "Läuft etwas schief, sind wir es. Keiner zeigt auf den anderen.",
      ],
    },

    zusammenlauf: {
      /* Kurzformen: die Kacheln sind auf dem Telefon rund achtzig Pixel breit.
         Das weiche Trennzeichen in „Produktbilder" muss bleiben, sonst steht
         dort „Produktbil" ueber „der", ohne Bindestrich. */
      bereiche: ["Strategie", "Produkt­bilder", "PPC", "Länder"],
      quelle: "Umsatz, Marge, TACoS",
      band: "Account Management",
      bandZeile: "Jeden Tag, vom ersten bis zum letzten",
    },

    onboarding: {
      label: "Die ersten drei Wochen",
      titelVor: "Vom Gespräch bis ",
      titelEm: "zur ersten Optimierung.",
      lead: "Kein Kickoff-Workshop über drei Tage. Ihr gebt uns Zugang, wir fangen an.",
      schritte: [
        {
          schritt: "Tag 0",
          titel: "Das Gespräch",
          text: "30 Minuten mit Clemens zum Kennenlernen. Passt es, folgt ein zweiter Termin mit euren Zahlen.",
        },
        {
          schritt: "Tag 1",
          titel: "Zugänge und Kanal",
          text: "Ihr ladet uns in Seller Central ein, wir öffnen einen gemeinsamen Slack-Kanal und ein Drive für alle Dateien.",
        },
        {
          schritt: "Woche 1",
          titel: "Die Analyse",
          text: "Wir rechnen jedes Produkt durch und legen die Reihenfolge fest. Je nach Größe des Sortiments dauert das bis zu zwei Wochen. Ihr bekommt das Ergebnis als Fahrplan, nicht als Datei.",
        },
        {
          schritt: "Woche 2 bis 3",
          titel: "Die Arbeit läuft",
          text: "Content-Sprint für die ersten Artikel, Kampagnen werden umgebaut. Ab hier seht ihr jede Woche, was passiert ist.",
        },
      ],
    },

    cta: "Welcher Bereich bremst euer Wachstum?",
  },

  /* ============================================================
     Die Case Studies: Uebersicht und Fallseiten.

     Die Zahlen, Ueberschriften und Belege der sechs Faelle stehen nicht hier,
     sondern in `lib/cases.ts` und `lib/cases-en.ts`. Hier steht der Rahmen
     darum: Bezeichnungen, Ueberschriften der Seiten und die Beschriftungen
     der Bausteine.
     ============================================================ */
  faelle: {
    meta: {
      titel: "Case Studies · temoa",
      beschreibung:
        "Sechs Marken auf Amazon mit Ausgangslage, Vorgehen und Ergebnis: profitabel ausgebauter Umsatz, ein Produkt von null aufgebaut, ein Bestseller-Rang und vier Marktplätze parallel.",
      /* Steht vor „· Case Study · temoa" im Titel einer Fallseite. */
      fallTitel: "Case Study · temoa",
    },

    kopf: {
      eyebrow: "Case Studies",
      titelVor: "Sechs Marken, die ",
      titelEm: "profitabel gewachsen sind.",
      /* Vorher: „Fünf Konten, vollständig nachgerechnet." Nachrechnen ist,
         was ein Steuerberater tut, und es sagt nichts über das Ergebnis. */
      lead: "Marken aus verschiedenen Kategorien. Wir haben ihren Umsatz profitabel ausgebaut, neue Produkte eingeführt und weitere Länder erschlossen. Je Fall mit Zeitraum und den Zahlen aus dem Konto.",
    },

    /* Vorzeichen und Einheit gehoeren zur Sprache: „Ø" ist die deutsche
       Abkuerzung fuer den Durchschnitt, „Mio." die deutsche fuer Millionen. */
    kennzahlen: [
      { vor: "Ø +", nach: " %", label: "Profitabilitätssteigerung" },
      { vor: "", nach: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
      { vor: "", nach: "+", label: "betreute Marken" },
      { vor: "", nach: "+", label: "internationale Marktplätze" },
    ],

    bindung: {
      nach: " %",
      zeile: "der Marken verlängern nach Performance.",
      zusatz: "Verlängert wird, wenn die Zahlen dafür sprechen.",
    },

    raster: {
      oeffnen: "Case Study öffnen",
      hinweis: "Klickt eine Marke an für die ganze Case Study.",
    },

    diagramm: {
      umsatz: "Umsatz pro Monat",
      tacos: "TACoS",
      bildAlt: "Umsatz- und TACoS-Verlauf",
    },

    /* „Bestseller" und „Amazons Tipp" sind Zitate aus dem Suchergebnis, keine
       Auszeichnungen, die temoa vergibt. Sie stehen so, wie Amazon sie im
       jeweiligen Marktplatz schreibt. */
    abzeichen: {
      bestseller: "Bestseller",
      tipp: "Amazons Tipp",
    },

    arbeit: {
      eyebrow: "Ausgelieferte Arbeit",
      titel: "Ein Einblick, nicht das ganze Sortiment.",
      /* `{marke}` wird durch den Namen der Marke ersetzt. */
      lead: "Gezeigt sind einzelne Produkte aus der Arbeit für {marke}. Die Marke ist deutlich größer, gearbeitet wurde an entsprechend mehr Artikeln.",
      listing: "Listing",
      video: "Video",
      videoTitel: "Das Listing-Video",
      /* `{n}` wird durch die Zahl der Artikel ersetzt. */
      paletteTitel: "{n} weitere Artikel im selben Bildstil",
      palette: "Produktpalette",
      paletteHinweis:
        "Ein Hauptbild je Artikel, alle im selben Aufbau. So bleibt die Marke im Suchergebnis wiedererkennbar, egal welches Produkt jemand findet.",
      hauptbild: "Hauptbild",
      /* `{n}` wird durch die Zahl der Varianten ersetzt. */
      varianten: "{n} Varianten des Hauptbilds",
      variantenHinweis:
        "Für ein Produkt entstehen mehrere Hauptbilder. Welches bleibt, entscheidet die Klickrate im Suchergebnis.",
      aplus: "Premium A+ Content",
      schliessen: "Schließen",
    },

    galerie: {
      titel: "Mehr aus diesem Projekt",
    },

    weitere: {
      eyebrow: "Weitere Marken",
      titel: "Andere Konten, dieselbe Arbeit.",
      alle: "Alle Case Studies",
    },

    cta: "Was wäre bei euch möglich?",

    fallCta: {
      titel: "Solche Ergebnisse für eure Marke?",
      zusagen: [
        "Ihr bekommt eine Einschätzung zu eurem Sortiment, keine Standardpräsentation",
        "Wir sagen auch ab, wenn wir bei euch keinen Weg sehen",
      ],
    },
  },

  /* ============================================================
     Die Buchungsseite und der Fahrplan darauf.

     Die Dauer des Erstgespraechs steht an mehreren Stellen dieser Datei:
     im Ablauf, in den drei Punkten unter der Ueberschrift, in der FAQ und in
     der Abschlusszeile. Wer sie aendert, sucht nach „30 Minuten"
     beziehungsweise „30 minutes" und geht alle durch. Die Zusagen im
     Abschluss-CTA stehen in `rahmen.ts`.
     ============================================================ */
  buchung: {
    meta: {
      titel: "Potenzialanalyse buchen · temoa",
      beschreibung:
        "Kostenlose Potenzialanalyse: 30 Minuten zum Kennenlernen, danach ein zweiter Termin mit euren aufbereiteten Zahlen. Unverbindlich.",
    },

    kopf: {
      eyebrow: "Kostenlose Potenzialanalyse",
      titelVor: "Erst lernen wir uns kennen, ",
      titelEm: "dann die Zahlen.",
      lead: "Ein kurzes erstes Gespräch, in dem wir eure Lage verstehen und ihr uns kennenlernt.",
      punkte: [
        "30 Minuten, per Video, ohne Vorbereitung auf eurer Seite",
        "Wir fragen nach Sortiment, Zielen und dem, was gerade klemmt",
        "Am Ende wisst ihr, ob es passt und wie der nächste Schritt aussieht",
      ],
      knopf: "Zum Kalender",
      portraetAlt: "Clemens, euer Ansprechpartner bei temoa",
      portraetName: "Hi, ich bin Clemens.",
      portraetRolle: "Founder. Ihr sprecht mit mir.",
    },

    /* Belegte Zahlen aus den Case Studies. Sie stehen hier und nicht in
       `cases.ts`, weil hier die Marke dazugehoert. */
    zahlen: [
      { wert: "+147 %", label: "Umsatz, Vitaworld" },
      { wert: "+439 %", label: "Conversion Rate, HaA" },
      { wert: "−35 %", label: "TACoS, Marke aus Gartenzubehör" },
    ],

    /* Der Ablauf, wie er wirklich laeuft: erst ein kurzes Kennenlernen, dann
       ein zweiter Termin mit vorbereiteten Zahlen, dann die Entscheidung. */
    ablauf: {
      eyebrow: "Ablauf",
      titelVor: "Vom ersten Termin bis ",
      titelEm: "zur Entscheidung.",
      schritte: [
        {
          schritt: "Schritt 1",
          titel: "Erstgespräch, 30 Minuten",
          text: "Wir hören, wo ihr steht: Sortiment, Ziele, was gerade klemmt. Ihr hört, wie wir arbeiten.",
        },
        {
          schritt: "Schritt 2",
          titel: "Zweiter Termin mit euren Zahlen",
          text: "Passt es für beide Seiten, bereiten wir eure Zahlen auf und gehen sie mit euch durch.",
        },
        {
          schritt: "Schritt 3",
          titel: "Ihr entscheidet",
          text: "Ihr wisst, welche Schritte zuerst kommen und was sie bringen sollen. Alles Weitere entscheidet ihr.",
        },
      ],
    },

    passt: {
      eyebrow: "Für wen",
      titelVor: "Wann sich das Gespräch ",
      titelEm: "lohnt.",
      jaLabel: "Passt, wenn",
      ja: [
        "Ihr seid eine etablierte Marke mit eigenem Sortiment auf Amazon.",
        "Bei euch kümmern sich ein, zwei Leute um Amazon und die Zeit reicht nicht.",
        "Ihr wollt profitabel wachsen, nicht Umsatz um jeden Preis.",
        "Ihr seht Amazon als Vertriebskanal, in den ihr investiert.",
      ],
      neinLabel: "Passt nicht, wenn",
      nein: [
        "Euer Amazon-Umsatz liegt unter 50.000 € im Monat, dann fehlt den Produkten der Traffic.",
        "Ihr sucht den günstigsten Anbieter.",
        "Ihr wollt garantierte Rankings und schnelle Tricks.",
        "Amazon ist bei euch ein Nebenkanal, in den nichts investiert wird.",
      ],
    },

    kalender: {
      eyebrow: "Termin",
      titelVor: "Sucht euch ",
      titelEm: "einen Termin.",
      lead: "Ihr bekommt sofort eine Bestätigung mit dem Videolink.",
    },

    faqTitelVor: "Bevor ihr ",
    faqTitelEm: "bucht.",
    faq: [
      {
        frage: "Was kostet die Potenzialanalyse?",
        antwort: "Nichts. Die Analyse und das Gespräch sind kostenlos und unverbindlich.",
      },
      {
        frage: "Wie lange dauert das Gespräch?",
        antwort:
          "Das erste Gespräch dauert etwa 30 Minuten und dient dem Kennenlernen. Passt es für beide Seiten, folgt ein zweiter Termin, für den wir eure Zahlen aufbereiten.",
      },
      {
        frage: "Was braucht ihr von uns?",
        antwort: "Euren Markennamen und kurz euer Ziel. Mehr braucht es für das erste Gespräch nicht.",
      },
      {
        frage: "Sind wir danach gebunden?",
        antwort: "Nein. Ihr entscheidet nach dem Gespräch, ob es weitergeht.",
      },
      {
        frage: "Mit wem sprechen wir?",
        antwort:
          "Direkt mit Clemens, einem der drei Gründer von temoa. Er kann euren Account fachlich einschätzen und tut das im Gespräch auch.",
      },
      {
        frage: "Wie schnell geht es nach dem Gespräch los?",
        antwort:
          "Sobald Umfang und Ziel abgestimmt sind. Wir richten einen gemeinsamen Google Drive ein, dort legt ihr die Assets ab, die wir nicht schon auf Amazon finden. Mehr braucht es nicht. Wettbewerb, Produkte und Zielgruppe analysieren wir selbst, ohne dass ihr dafür in weiteren Terminen sitzt.",
      },
      {
        frage: "Für wen lohnt sich das?",
        antwort:
          "Für etablierte Marken mit eigenem Sortiment und ab etwa 50.000 € Amazon-Umsatz im Monat. Darunter läuft zu wenig Traffic über die Produkte, um daraus verlässliche Schlüsse zu ziehen.",
      },
    ],

    abschluss: {
      titel: "Nehmt euch die 30 Minuten.",
      lead: "Danach wisst ihr, ob wir zueinander passen. Alles Weitere entscheidet ihr danach.",
      knopf: "Termin sichern",
    },

    cal: {
      /* Die Attrappe steht nur, wenn kein Kalender hinterlegt ist. */
      tage: ["Mo", "Di", "Mi", "Do", "Fr"],
      dauer: "30 Min.",
      knopf: "Potenzialanalyse buchen",
      sperreTitel: "Der Terminkalender liegt bei Cal.com",
      sperreGrund:
        "Damit ihr die freien Zeiten hier direkt sehen könnt, laden wir den Kalender von Cal.com. Dabei geht eine Verbindung dorthin, und Cal.com setzt eigene Cookies. Ohne eure Zustimmung passiert das nicht.",
      direkt: "Termin direkt bei Cal.com buchen",
      laedt: "Kalender wird geladen …",
      dieseWoche: "Diese Woche",
      attrappe: "Beispielansicht. Die Online-Buchung läuft über Cal.com.",
      freieZeiten: "Freie Zeiten",
    },

    fahrplan: {
      eyebrow: "Fahrplan",
      titelVor: "Die ersten ",
      titelMark: "90 Tage.",
      tage: "90 Tage",
      /* Die Farbe der drei Monate im Kalender: weiss, orange, grün. */
      monate: ["Analyse", "Umsetzung", "Skalierung"],
      fussVor: "Ab Tag 91",
      fussRest: " läuft die Betreuung weiter: monatlicher Report, Strategie- und Performance-Calls.",
      phasen: [
        {
          zeitraum: "Tag 1 bis 30",
          titel: "Analyse",
          lead: "Der erste Monat gehört der Analyse. Am Tag eins beginnt die Strategie.",
          punkte: [
            "Der gesamte Account wird gesichtet: Katalog, ASINs, Kampagnen- und Gebotsstrukturen",
            "PPC-Berichte, Verkäufe, Traffic und der Search Query Report werden ausgewertet",
            "Inventar und Konto-Gesundheit geprüft, offensichtlich verlorenes Werbebudget gestoppt",
            "Zum Monatsende steht die Übersicht: Produkte, Margen, was funktioniert und was nicht",
          ],
        },
        {
          zeitraum: "Tag 31 bis 60",
          titel: "Umsetzung",
          lead: "Jetzt wird gebaut, auf der Grundlage aus Monat eins.",
          punkte: [
            "Hauptbild, Listingbilder, Titel, Bullets, Backend-Felder und A+ Content neu",
            "Listings auf Suche, Klickrate und Conversion ausgerichtet, lesbar für Rufus, COSMO und A10",
            "Kampagnenstrukturen neu aufgebaut, gesteuert über ACoS und TACoS",
            "Inventar bleibt im Blick, neue Produkte werden eingeplant, wenn sie anstehen",
          ],
        },
        {
          zeitraum: "Tag 61 bis 90",
          titel: "Skalierung",
          lead: "Was gewinnt, bekommt mehr.",
          punkte: [
            "Budget geht auf die Kampagnen und Suchbegriffe, die konvertieren",
            "Content-Tests: A+ Module und Hauptbilder werden nachgezogen",
            "Zum Quartalsende die Roadmap fürs nächste Quartal, sortiert nach den größten Chancen",
          ],
        },
      ],
    },
  },

  design: {
    meta: {
      titel: "Designbeispiele · temoa",
      beschreibung:
        "Amazon-Content von temoa: Hauptbild, Bilderstrecke, A+ und Premium A+, Brand Store und Brand Story, jeweils so angeordnet, wie es auf Amazon verkauft.",
    },
    kopf: {
      eyebrow: "Designbeispiele",
      titelVor: "So sieht ",
      titelEm: "Retail Ready",
      titelNach: " aus.",
      lead: "Vom Hauptbild bis zur Brand Story: jedes Format so aufgebaut, wie es auf Amazon konvertiert.",
    },
    /* Die vier Kategorien in der Reihenfolge der Reiter. „EBC Content" ist
       der Begriff, den Amazon frueher fuer A+ benutzt hat und der in der
       Branche haengengeblieben ist; er steht so im Original. */
    reiter: ["Produktbilder", "EBC Content", "Brand Stores", "Brand Stories"],
    hinweise: [
      "Hauptbild und sechs Listingbilder aus unserer Produktion für Miganeo.",
      "Sechs Module Premium A+ Content aus unserer Produktion für Miganeo.",
      "Brand Stores zeigen wir im Gespräch am Konto, nicht als Screenshot.",
      "Brand Stories zeigen wir im Gespräch am Konto, nicht als Screenshot.",
    ],
    vorher: "Vorherige Karten",
    weiter: "Weitere Karten",
    /* Die drei Knoepfe der Grossansicht. Sie standen fest auf Deutsch im
       Code und sagten damit auf der englischen Seite das Falsche an. */
    schliessen: "Schließen",
    zurueck: "Vorheriges Beispiel",
    vor: "Nächstes Beispiel",
    /* `{a}` ist die Zahl der gezeigten, `{b}` die aller Beispiele. */
    zaehler: "{a} von {b} Beispielen",
    mehrLaden: "Mehr laden",
    cta: "Und wie sieht euer Listing aus?",
  },

  blog: {
    meta: {
      titel: "Blog · temoa",
      beschreibung:
        "Klartext zu Amazon: PPC, Listing & SEO, FBA, Markenschutz und Strategie. Über 80 Beiträge, thematisch geordnet.",
      beitragTitel: "Blog · temoa",
    },
    kopf: {
      eyebrow: "Blog",
      titelVor: "Klartext zu ",
      titelEm: "Amazon.",
      lead: "Über 80 Beiträge zu Werbung, Listings, Logistik und Strategie. Nach Themen geordnet, ohne Fülltext.",
    },
    /* `{n}` wird durch die Zahl der Beitraege ersetzt. */
    einBeitrag: "1 Beitrag",
    beitraege: "{n} Beiträge",
    empfohlen: "Empfohlene Beiträge",
    alleThemen: "Alle Themen",
    inhalt: "Inhalt",
    weiterlesen: "Weiterlesen",
    lesezeit: "{n} Min. Lesezeit",
    lesen: "Lesen",
    cta: "Lieber direkt über euren Account sprechen?",
    beitragCta: "Genug gelesen, Zeit für Ergebnisse?",
    /* Steht auf der englischen Blogseite, solange nicht alle Beitraege
       uebersetzt sind. Auf Deutsch ist die Zeile leer. */
    teilweise: "",
  },

};

/* Kein `as const`: sonst waeren die deutschen Saetze Literaltypen und keine
   Uebersetzung liesse sich dagegen zuweisen. So bleibt die Form erzwungen
   (jeder Schluessel muss da sein und einen String tragen), der Inhalt aber
   frei. */
export type Woerterbuch = typeof de;
