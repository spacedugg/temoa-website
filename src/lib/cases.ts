/**
 * Echte Case-Study-Daten (6 Marken). Zahlen und Struktur stammen aus den
 * vom Kunden freigegebenen Fällen. Einzelne Formulierungen wurden an die
 * Stilregeln angepasst (keine verbotenen Begriffe), Zahlen bleiben unverändert.
 */

export type Trend = "up" | "down" | "neutral";

export type CaseStat = {
  value: string;
  label: string;
  sublabel?: string;
  trend: Trend;
};

export type ChartPoint = {
  label: string;
  revenueEur: number;
  tacosPct: number | null;
  annotation?: string;
};

export type CaseBadge = { label: string; icon: "trophy" | "award" | "shield" };

/**
 * Die Kennzahlen, an denen sich Amazon-Arbeit messen laesst: Klickrate,
 * Conversion Rate, ACoS, TACoS. Sie stehen in einem eigenen Band, mit dem
 * Kuerzel zuerst und dem Wert danach, weil ein Besucher aus dieser Branche
 * genau danach sucht.
 *
 * Damit dieselbe Zahl nicht zweimal auf der Seite steht, sind diese vier
 * Kennzahlen aus `heroStats` und `subStats` herausgenommen: dort stehen jetzt
 * nur Umsatz, Bestellungen, Raenge und Marktplaetze.
 *
 * `wert` ist entweder ein Stand („9,9 %") oder eine Veraenderung („+52 %"),
 * `von` und `nach` tragen den Weg dorthin, wenn er belegt ist.
 */
export type CaseMetric = {
  kuerzel: "CTR" | "CVR" | "ACoS" | "TACoS";
  name: string;
  wert: string;
  von?: string;
  nach?: string;
  hinweis?: string;
  trend: Trend;
};

/**
 * Ein ausgeliefertes Listing: das Hauptbild, das im Suchergebnis steht, und
 * die weiteren Bilder in ihrer Reihenfolge auf der Produktseite.
 */
export type CaseListing = { titel: string; haupt: string; strecke: string[] };

/**
 * Die ausgelieferte Arbeit eines Falls.
 *
 * Jede Marke liefert anderes Material: bei einer gibt es drei
 * Hauptbildvarianten zu einem Produkt, bei der naechsten ein Hauptbild je
 * Bundle-Groesse, bei der dritten sieben A+ Module. Deshalb ist jeder Teil
 * einzeln zu haben und die Darstellung laesst weg, was fehlt.
 *
 * Fuer die anonymisierte Marke aus Gartenzubehoer bleibt das Feld leer: Bilder
 * wuerden die Marke verraten.
 */
export type CaseArbeit = {
  listing?: CaseListing;
  /** Hauptbildvarianten desselben Produkts, aus denen nach Leistung gewaehlt wird. */
  varianten?: { titel: string; hinweis: string; bilder: string[] };
  /**
   * A+ oder Premium A+ Module, liegende Bahnen von oben nach unten. Sie stehen
   * immer vollstaendig da, ohne Rahmen mit begrenzter Hoehe: der Kunde will
   * den Content sehen, nicht einen Knopf, der ihn aufmacht.
   *
   * Hier gehoert je Modul genau eine Bahn hinein. Kommen mehrere Fassungen
   * desselben Moduls (dieselbe Aufnahme, andere Aussage), darf nur eine davon
   * in die Reihe: untereinander gestapelt liest sich das als Doppelung.
   */
  aplus?: { titel: string; hinweis: string; module: string[] };
};

export type CaseStudy = {
  slug: string;
  displayName: string;
  mono: string; // short brand monogram for the logo badge
  bgImage?: string; // case preview background image
  images?: string[]; // optional extra images shown on the case detail page
  arbeit?: CaseArbeit; // ausgelieferte Arbeit, oben auf der Fallseite
  logo?: string; // brand logo for the preview (omitted for anonymised brands)
  anonymized: boolean;
  industry: string;
  marketplaces: string[];
  timeframe: string;
  accent: string; // hex
  headline: string;
  subheadline: string;
  preview: { value: string; label: string; trend: Trend };
  /**
   * Die drei Schritte des Falls. `body` ist die Aussage in einem oder zwei
   * Saetzen, `punkte` sind die Belege darunter.
   *
   * Vorher stand hier je ein Absatz mit vier bis fuenf Saetzen. Drei solche
   * Absaetze nebeneinander liest niemand: die Zahlen darin gehen unter, und
   * eine Case Study wird nach Zahlen gelesen.
   */
  sections: { heading: string; body: string; punkte?: string[] }[];
  heroStats: CaseStat[];
  /** Klickrate, Conversion Rate, ACoS, TACoS. Leer, wo nichts belegt ist. */
  kennzahlen: CaseMetric[];
  subStats: CaseStat[];
  badges: CaseBadge[];
  chart?: ChartPoint[];
};

export const cases: CaseStudy[] = [
  {
    slug: "miganeo",
    displayName: "Miganeo",
    mono: "M",
    bgImage: "/case_studies/miganeo.webp",
    anonymized: false,
    industry: "Pool, Garten und Outdoor",
    marketplaces: ["DE", "FR", "IT", "ES", "NL", "BE"],
    timeframe: "Mai bis August 2026",
    accent: "#12A0A8",
    headline: "Aus vier Kampagnen im Ausland wurden 120",
    subheadline:
      "Fünf Marktplätze liefen nebenher. Nach einem Sommer kommt der größte Teil des Wachstums von dort.",
    preview: { value: "×20", label: "Umsatz im Ausland", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "In Deutschland lief der Account gut. Im Ausland lief er nebenher.",
        punkte: [
          "8.967 € Umsatz im Ausland in einem Vierteljahr",
          "Vier einzelne Kampagnen für fünf offene Marktplätze",
          "Niemand im Haus hatte die Zeit, sie aufzubauen",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Jeder Marktplatz bekam die volle Arbeit neu.",
        punkte: [
          "Eigene Keyword-Recherche und eigene Texte in der Landessprache",
          "Aus 4 Kampagnen im Ausland wurden 120, über sechs Marktplätze 157",
          "66 beworbene Artikel",
          "Hauptbilder und Produktdetailseiten der wichtigsten Artikel neu",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Der größte Teil des Wachstums kommt heute aus dem Ausland.",
        punkte: [
          "Umsatz im Ausland von 8.967 € auf 179.287 €",
          "98,9 % davon über Suchbegriffe außerhalb des Markennamens",
          "Die neue Struktur in Deutschland holt 20,6 % mehr Umsatz aus dem gleichen Werbeeinsatz",
        ],
      },
    ],
    heroStats: [
      { value: "×20", label: "Umsatz im Ausland", sublabel: "8.967 € auf 179.287 €", trend: "up" },
      { value: "299.184 €", label: "Umsatz über Werbung", sublabel: "bei 29.490 € Einsatz", trend: "up" },
      {
        value: "98,9 %",
        label: "Umsatz außerhalb der eigenen Marke",
        sublabel: "neu gewonnen, nicht umgebucht",
        trend: "up",
      },
    ],
    kennzahlen: [
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "9,9 %", hinweis: "über alle sechs Marktplätze", trend: "down" },
      { kuerzel: "TACoS", name: "Total Advertising Cost of Sales", wert: "6,02 %", hinweis: "Werbekosten am Gesamtumsatz", trend: "down" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+24,7 %", hinweis: "Sandfilteranlagen, nach neuen Produktbildern", trend: "up" },
    ],
    subStats: [
      { value: "+149,5 %", label: "Umsatz Trampolin-Zubehör", sublabel: "11.059 € auf 27.587 €", trend: "up" },
      { value: "+38,3 %", label: "Umsatz Bootsmotoren", sublabel: "269.759 € auf 372.998 €", trend: "up" },
    ],
    badges: [{ label: "Effizienzziel des Kunden übertroffen", icon: "trophy" }],
  },
  {
    /* Bachgold.
       Grundlage ist die vom Kunden gelieferte Fallstudie als PDF: Zahlen,
       Zitat und die Bilder beider Listings stammen daraus.

       In diesem Fall lag das Kampagnenmanagement nicht bei uns, die Arbeit war
       Markenauftritt und Content. Der Text sagt deshalb nichts ueber Werbung,
       weder im Vorgehen noch im Ergebnis: was wir nicht gemacht haben, steht
       hier auch nicht. `kennzahlen` bleibt aus demselben Grund leer.

       1,68 Mio. Euro sind fuer sich genommen keine aussergewoehnliche Summe.
       Aussergewoehnlich ist die Grundlage: ein einziges Produkt und die Arbeit
       am Content. Genau das muss die Seite sagen, sonst liest die Zahl sich
       kleiner als sie ist. */
    slug: "bachgold",
    displayName: "BACHGOLD",
    mono: "B",
    bgImage: "/case_studies/bachgold.webp",
    logo: "/case_studies/bachgold-logo.webp",
    /* Nur die vom Kunden gelieferten Dateien in voller Aufloesung. Die neun
       Bilder, die vorher aus dem PDF der Fallstudie geholt waren, sind
       geloescht: drei davon sind dieselben Aufnahmen wie hier, nur 600 Pixel
       gross, und dasselbe Bild zweimal auf einer Seite ist ein Fehler.

       Gezeigt wird deshalb die XL-Groesse. Dass es die 500-ml-Variante mit
       eigenem Content gibt, steht als Angabe unter den Kennzahlen. */
    arbeit: {
      listing: {
        titel: "Wasserfilter XL, 800 ml",
        haupt: "/case_studies/bachgold/l-haupt.webp",
        strecke: [1, 2, 3, 4, 5].map((n) => `/case_studies/bachgold/l-${n}.webp`),
      },
      varianten: {
        titel: "Drei Varianten des Hauptbilds",
        hinweis:
          "Für ein Produkt entstehen mehrere Hauptbilder. Welches bleibt, entscheidet die Klickrate im Suchergebnis.",
        bilder: [1, 2, 3].map((n) => `/case_studies/bachgold/haupt-${n}.webp`),
      },
      aplus: {
        titel: "Premium A+ Content",
        hinweis: "Sechs Module, eines unter dem anderen, unter den Bullets der Produktseite.",
        module: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/bachgold/aplus-${n}.webp`),
      },
    },
    anonymized: false,
    industry: "Outdoor-Wasserfilter",
    marketplaces: ["DE", "FR", "IT", "ES", "NL", "US"],
    timeframe: "15 Monate",
    accent: "#2C7A5E",
    headline: "Ein Produkt, nur Content, 1,68 Mio. €",
    subheadline:
      "Kein breites Sortiment hinter der Zahl: ein Outdoor-Wasserfilter in zwei Größen, dazu Produktbilder, Premium A+ Content, Brand Story und Brand Store.",
    preview: { value: "1,68 Mio. €", label: "Umsatz in 15 Monaten", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Ein in der Schweiz entwickelter und patentierter Wasserfilter stand auf Amazon wie beliebige Ware.",
        punkte: [
          "Kein Auftritt, an dem ein Käufer die Marke wiedererkennt",
          "Outdoor-Charakter und praktischer Nutzen kamen beide nicht an",
          "Ein Produkt, zwei Größen, kein Sortiment im Rücken",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Zuerst die Markenidentität, dann der Content darauf.",
        punkte: [
          "Hauptbild und Listingbilder für beide Größen neu",
          "Premium A+ Content und Brand Story",
          "Brand Store als Einstieg in das Sortiment",
          "Angelegt für die Übertragung auf weitere Länder",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Produktbilder, Content und Verpackung zeigen heute dieselbe Marke.",
        punkte: [
          "Bestseller-Rang 1 in der Nische Wasserfilter",
          "1.677.538 € in 15 Monaten, aus einem einzigen Produkt",
          "Sechs Marktplätze, von Deutschland bis in die USA",
          "Zwei weitere Produkte in Vorbereitung",
        ],
      },
    ],
    heroStats: [
      { value: "1.677.538 €", label: "Umsatz", sublabel: "in 15 Monaten, aus einem Produkt", trend: "up" },
      { value: "Rang 1", label: "Bestseller Wasserfilter", sublabel: "Nische dauerhaft besetzt", trend: "up" },
      { value: "6", label: "Marktplätze", sublabel: "Europa und die USA", trend: "neutral" },
    ],
    kennzahlen: [],
    subStats: [
      {
        value: "Premium A+",
        label: "Content-Stufe für beide Größen",
        sublabel: "dazu die Brand Story",
        trend: "neutral",
      },
      {
        value: "Brand Store",
        label: "neu aufgebaut",
        sublabel: "Einstieg in das gesamte Sortiment",
        trend: "neutral",
      },
      {
        value: "2",
        label: "Größen, je eigener Content",
        sublabel: "500 ml und 800 ml",
        trend: "neutral",
      },
    ],
    badges: [{ label: "Bestseller-Rang 1 Wasserfilter", icon: "trophy" }],
  },
  {
    slug: "vitaworld",
    displayName: "Vitaworld",
    mono: "V",
    bgImage: "/case_studies/vitaworld.webp",
    logo: "/case_studies/vitaworld-logo.webp",
    /* Listing und A+ zeigen zwei verschiedene Artikel derselben Marke. Das ist
       Absicht: bei Vitaworld laeuft derselbe Aufbau ueber die ganze
       Produktpalette, und genau das soll man sehen. Die Hauptbilder der
       Bundle-Groessen liegen noch nicht vor, `varianten` bleibt deshalb leer. */
    arbeit: {
      listing: {
        titel: "PEA 600 mg",
        haupt: "/case_studies/vitaworld/l-haupt.webp",
        strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/vitaworld/l-${n}.webp`),
      },
      /* Die Lieferung enthielt sieben Dateien, davon vier (2a bis 2d) dieselbe
         Aufnahme mit vier verschiedenen Aussagen. Untereinander gestapelt sah
         das aus wie ein Fehler: viermal dieselbe Flasche. In der Reihe steht
         deshalb eine davon. */
      aplus: {
        titel: "Premium A+ Content",
        hinweis: "Der Aufbau für Taurin 850 mg. Dieselbe Vorlage läuft über die weiteren Artikel.",
        module: [1, 2, 6, 7].map((n) => `/case_studies/vitaworld/aplus-${n}.webp`),
      },
    },
    anonymized: false,
    industry: "Nahrungsergänzung",
    marketplaces: ["DE"],
    timeframe: "Q1 2025 vs Q1 2026",
    accent: "#FF3131",
    headline: "Mehr organische Stärke, weniger PPC-Abhängigkeit",
    subheadline: "Profitabler wachsen statt teurer werben.",
    preview: { value: "+147 %", label: "Umsatzwachstum", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Ein solider Account auf Amazon DE, der am Werbedruck hing.",
        punkte: [
          "Wachstum nur mit proportional steigenden Werbekosten",
          "36 % des Gesamtumsatzes kamen über Werbung",
          "FR, IT, ES und NL noch nicht gestartet",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Der Weg lief über Conversion-Stärke und organische Rankings.",
        punkte: [
          "Hauptbilder, Titel und Targets neu aufgesetzt",
          "Werbebudget um 39 % erhöht",
          "Umsatz im gleichen Zeitraum um 147 % gestiegen",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Vitaworld wächst heute überproportional organisch.",
        punkte: [
          "Anteil der Werbung am Gesamtumsatz von 36 % auf 29 %",
          "Marke und Produktdetailseiten treiben das Wachstum",
          "FR, IT, ES und NL stehen in den Startlöchern",
        ],
      },
    ],
    heroStats: [
      { value: "+147 %", label: "Umsatz", sublabel: "131k € auf 326k € pro Quartal", trend: "up" },
      { value: "×3,2", label: "Bestellungen", sublabel: "5.019 auf 16.073 pro Quartal", trend: "up" },
      { value: "−19,4 %", label: "PPC-Anteil am Gesamtumsatz", sublabel: "von 36 % auf 29 %", trend: "down" },
    ],
    kennzahlen: [
      { kuerzel: "CTR", name: "Klickrate in der Suche", wert: "+52 %", von: "0,44 %", nach: "0,67 %", trend: "up" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+50 %", von: "18,6 %", nach: "27,9 %", trend: "up" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "−30 %", von: "30,9 %", nach: "21,6 %", trend: "down" },
      { kuerzel: "TACoS", name: "Total Advertising Cost of Sales", wert: "−44 %", von: "10,4 %", nach: "5,8 %", trend: "down" },
    ],
    subStats: [],
    badges: [],
    chart: [
      { label: "Jan 25", revenueEur: 31892, tacosPct: 10.0 },
      { label: "Feb 25", revenueEur: 30078, tacosPct: 7.4, annotation: "temoa Onboarding" },
      { label: "Mär 25", revenueEur: 51524, tacosPct: 11.2 },
      { label: "Apr 25", revenueEur: 58842, tacosPct: 9.5 },
      { label: "Mai 25", revenueEur: 57406, tacosPct: 8.2 },
      { label: "Jun 25", revenueEur: 56643, tacosPct: 8.4 },
      { label: "Jul 25", revenueEur: 73804, tacosPct: 9.2 },
      { label: "Aug 25", revenueEur: 69997, tacosPct: 10.9 },
      { label: "Sep 25", revenueEur: 88709, tacosPct: 5.9 },
      { label: "Okt 25", revenueEur: 75884, tacosPct: 6.7 },
      { label: "Nov 25", revenueEur: 85597, tacosPct: 5.2 },
      { label: "Dez 25", revenueEur: 92719, tacosPct: 5.8 },
      { label: "Jan 26", revenueEur: 94961, tacosPct: 8.5 },
      { label: "Feb 26", revenueEur: 100985, tacosPct: 5.3 },
      { label: "Mär 26", revenueEur: 103693, tacosPct: 4.7 },
    ],
  },
  {
    slug: "haa",
    displayName: "HaA",
    mono: "H",
    bgImage: "/case_studies/HaA.webp",
    logo: "/case_studies/haa-logo.webp",
    anonymized: false,
    industry: "Küche und Haushalt",
    marketplaces: ["DE"],
    timeframe: "2026",
    accent: "#FF9900",
    headline: "Vom Cold Launch zu Top-Performance in 17 Wochen",
    subheadline:
      "Organic First gestartet, mit kleinem Werbebudget aufgebaut. Am Ende eine Conversion Rate, die etablierte Marken selten sehen.",
    preview: { value: "+439 %", label: "Conversion Rate", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Ein Launch ohne alles: keine Rankings, keine Bewertungen, kein etabliertes Werbebudget.",
        punkte: [
          "Wachstum musste über Conversion und Sichtbarkeit kommen",
          "Ein großes Werbebudget stand nicht zur Verfügung",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Erst das Fundament, dann der Werbedruck.",
        punkte: [
          "Retail Readiness und Conversion-Optimierung vorweg",
          "Produktdetailseiten auf die Kaufentscheidung ausgerichtet",
          "Saubere Kampagnenstruktur, Targets gezielter bespielt",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Nach 17 Wochen eine Conversion Rate, die etablierte Marken selten sehen.",
        punkte: [
          "Conversion Rate von 5,5 % auf 32,5 %",
          "Wöchentliche Bestellungen ver-14-facht",
          "Die Accountsperrung in KW 10 war nach zwei Wochen erledigt",
        ],
      },
    ],
    heroStats: [
      { value: "×14", label: "Bestellungen pro Woche", sublabel: "28 auf 397", trend: "up" },
      { value: "+900 %", label: "Klicks pro Woche", sublabel: "ohne großes Werbebudget", trend: "up" },
      { value: "17", label: "Wochen vom Launch zur Spitze", trend: "neutral" },
    ],
    kennzahlen: [
      { kuerzel: "CTR", name: "Klickrate in der Suche", wert: "+46 %", trend: "up" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+439 %", von: "5,5 %", nach: "32,5 %", trend: "up" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "13,5 %", hinweis: "trotz Launch aus dem Stand", trend: "down" },
    ],
    subStats: [],
    badges: [
      { label: "Bestseller in der Nische", icon: "trophy" },
      { label: "Recovery der Account-Sperrung in 2 Wochen", icon: "shield" },
    ],
  },
  {
    slug: "futum",
    displayName: "FUTUM",
    mono: "F",
    bgImage: "/case_studies/futum.webp",
    logo: "/case_studies/futum-logo.webp",
    anonymized: false,
    industry: "Schädlingsbekämpfung",
    marketplaces: ["DE"],
    timeframe: "Kunde seit 2024",
    accent: "#2A9BD8",
    headline: "Profitable Skalierung in der Akut-Nische",
    subheadline:
      "Zwei Produktlaunches in einer Nische, in der Käufer akut eine Lösung brauchen und kaum vergleichen.",
    preview: { value: "+37,3 %", label: "Conversion Rate", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Zwei Produktlaunches in einer Nische, in der Käufer akut eine Lösung brauchen.",
        punkte: [
          "Kaum Recherche, kaum Vergleich vor dem Kauf",
          "Sichtbarkeit und Effizienz müssen vom ersten Tag sitzen",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Vier Stellschrauben parallel.",
        punkte: [
          "Content und Retail Readiness",
          "Kampagnen-Setup über alle Werbeformate",
          "Positionierung auf problemlösenden Suchbegriffen",
          "Pricing als Wachstumstreiber",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Das erste volle Amazon-Jahr 2025 lief profitabel.",
        punkte: [
          "392.327 € Umsatz und 17.042 Bestellungen",
          "Organischer Anteil bis 80 %",
          "Bestseller- und Amazon's-Choice-Badge kamen dazu",
        ],
      },
    ],
    heroStats: [
      { value: "392.327 €", label: "Umsatz 2025", sublabel: "erstes volles Jahr auf Amazon", trend: "up" },
      { value: "17.042", label: "Bestellungen 2025", trend: "up" },
      { value: "80 %", label: "Organische Verkäufe", sublabel: "Spitzenanteil am Gesamtumsatz", trend: "up" },
    ],
    kennzahlen: [
      { kuerzel: "CTR", name: "Klickrate in der Suche", wert: "+30 %", trend: "up" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+37,3 %", hinweis: "auf Ebene des ganzen Kontos", trend: "up" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "−19,7 %", hinweis: "im Tief bei 19,99 %", trend: "down" },
    ],
    subStats: [],
    badges: [
      { label: "FUTUM Maulwurfskugeln", icon: "trophy" },
      { label: "FUTUM Holzwurm-Spray", icon: "award" },
    ],
  },
  {
    slug: "marke-gartenzubehoer",
    displayName: "Marke aus Gartenzubehör",
    mono: "G",
    bgImage: "/case_studies/rainfactory.webp",
    anonymized: true,
    industry: "Gartenzubehör",
    marketplaces: ["DE", "IT", "FR", "ES"],
    timeframe: "Q1 bis Q2 2026",
    accent: "#0E7CA0",
    headline: "Saisonale Nachfrage profitabel skaliert",
    subheadline:
      "Frühzeitig vorbereitet, dann über vier europäische Marktplätze parallel aufgebaut.",
    preview: { value: "−35 %", label: "TACoS im Hauptmarkt", trend: "down" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Eine Marke mit klarer Saisonalität: die Hauptnachfrage fällt auf April und Mai.",
        punkte: [
          "Ein kurzes Fenster entscheidet über das Jahr",
          "Die Grundlagen entstanden im Herbst davor",
        ],
      },
      {
        heading: "Unser Vorgehen",
        body: "Früh vorbereiten, dann über vier Marktplätze parallel aufbauen.",
        punkte: [
          "Listing- und Content-Optimierung vorweg",
          "DE, IT, FR und ES gleichzeitig",
          "Kampagnenstruktur auf höhere Nachfrage vorbereitet",
        ],
      },
      {
        heading: "Ergebnis",
        body: "Die Nachfragespitze wurde in Wachstum übersetzt.",
        punkte: [
          "Hauptmarkt Deutschland: effizienter bei höherem Volumen",
          "Italien wächst als Sekundärmarkt mit",
          "Die Saison war vorbereitet, bevor sie begann",
        ],
      },
    ],
    heroStats: [
      { value: "4", label: "Marktplätze parallel", sublabel: "DE, IT, FR, ES", trend: "neutral" },
      { value: "+110 %", label: "Klicks Italien", sublabel: "Sekundärmarkt zur Saison", trend: "up" },
      { value: "April, Mai", label: "Hauptsaison", sublabel: "vorbereitet ab dem Herbst davor", trend: "neutral" },
    ],
    kennzahlen: [
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+21 %", hinweis: "Hauptmarkt Deutschland", trend: "up" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "−14 %", hinweis: "Hauptmarkt Deutschland", trend: "down" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "−18 %", hinweis: "Italien, bei steigendem Traffic", trend: "down" },
      { kuerzel: "TACoS", name: "Total Advertising Cost of Sales", wert: "−35 %", hinweis: "Hauptmarkt Deutschland", trend: "down" },
    ],
    subStats: [],
    badges: [],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
