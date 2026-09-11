/**
 * Regel fuer alle Zahlen auf dieser Seite: nur relative Werte, keine
 * absoluten. „ACoS um 30 Prozent gesenkt" steht da, „von 30,9 auf 21,6
 * Prozent" nicht, und Umsaetze und Bestellzahlen stehen gar nicht da: der
 * Weg von X auf Y ist die Zahl, die ein Wettbewerber mitliest, und einem
 * Besucher sagt sie ohne Marge und Sortiment nichts.
 *
 * Zwei Faelle sind ausgenommen, beide auf ausdruecklichen Wunsch des Kunden:
 * Miganeo steht in allem so, wie es ist, und bei Bachgold bleibt der Umsatz
 * von 1,68 Mio. Euro, weil er die Aussage des Falls traegt (ein Produkt, nur
 * Content).
 *
 * Echte Case-Study-Daten (6 Marken). Zahlen und Struktur stammen aus den
 * vom Kunden freigegebenen Fällen. Einzelne Formulierungen wurden an die
 * Stilregeln angepasst (keine verbotenen Begriffe), Zahlen bleiben unverändert.
 */

import type { Sprache } from "./i18n";
import { faelleEn, type FallEn } from "./cases-en";

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

/**
 * Eine Auszeichnung unter einem Fall.
 *
 * `bestseller` und `tipp` sind die beiden Abzeichen, die Amazon selbst
 * vergibt. Sie werden gezeichnet, wie sie auf Amazon stehen: „Bestseller"
 * weiss auf Orange, „Amazons Tipp" weiss auf Schwarz. Ein Trophaeen-Zeichen
 * mit einer Umschreibung daneben war beides nicht, und wer die Abzeichen aus
 * dem Suchergebnis kennt, erkennt sie sofort wieder.
 *
 * `hinweis` ist alles, was Amazon nicht vergibt. Dort bleibt die Pille mit
 * einem Zeichen in der Fallfarbe.
 */
export type CaseBadge =
  | { art: "bestseller" | "tipp"; label: string }
  | { art: "hinweis"; label: string; icon: "trophy" | "award" | "shield" };

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
 * Ein Produkt mit der Arbeit, die daran gemacht wurde.
 *
 * `haupt` ist das Bild, das im Suchergebnis steht, `strecke` sind die weiteren
 * Bilder in ihrer Reihenfolge auf der Produktseite. `varianten` sind weitere
 * Fassungen des Hauptbilds: fuer ein Produkt entstehen mehrere, welches bleibt,
 * entscheidet die Klickrate.
 *
 * `aplus.bahnen` traegt entweder die Module einzeln (Amazon liefert sie in
 * 2,44 zu 1) oder die ganze A+ Seite als ein hohes Bild. Beides kommt vor,
 * weil der Kunde beides liefert, und beides laeuft gleich: ohne Abstand
 * untereinander, in voller Laenge.
 *
 * `palette` sind Hauptbilder weiterer Artikel derselben Marke im selben
 * Bildstil. Das ist etwas anderes als `varianten`: dort mehrere Fassungen
 * eines Hauptbilds, hier ein Hauptbild je Artikel.
 *
 * `video` ist das Listing-Video. `poster` ist Pflicht: mit Standbild und
 * `preload="none"` laedt die Seite vom Video kein Byte, bis jemand auf
 * Abspielen drueckt.
 */
export type CaseProdukt = {
  titel: string;
  haupt: string;
  strecke: string[];
  varianten?: string[];
  palette?: string[];
  aplus?: { titel: string; bahnen: string[] };
  video?: { quelle: string; poster: string };
};

/**
 * Die ausgelieferte Arbeit eines Falls: ein oder mehrere Produkte.
 *
 * Jede Marke liefert anderes Material: bei einer drei Hauptbildvarianten zu
 * einem Produkt, bei der naechsten drei Produkte mit je eigener A+ Seite.
 * Deshalb ist jeder Teil einzeln zu haben und die Darstellung laesst weg, was
 * fehlt.
 *
 * Fuer die anonymisierte Marke aus Gartenzubehoer bleibt das Feld leer: jedes
 * Produktbild wuerde die Marke verraten.
 */
export type CaseArbeit = { produkte: CaseProdukt[] };

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
    logo: "/case_studies/miganeo-logo.webp",
    /* Drei Produkte, weil bei Miganeo genau das die Arbeit war: derselbe
       Aufbau ueber ein breites Sortiment. Jedes Produkt hat eigene
       Hauptbildvarianten und eine eigene A+ Seite; die A+ Dateien liegen hier
       als ganze Seite vor, nicht als einzelne Module. */
    arbeit: {
      produkte: [
        {
          titel: "Komplett-Trampolin",
          haupt: "/case_studies/miganeo/p1-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/miganeo/p1-${n}.webp`),
          varianten: [1, 2].map((n) => `/case_studies/miganeo/p1-var-${n}.webp`),
          aplus: { titel: "Premium A+, die ganze Seite", bahnen: ["/case_studies/miganeo/p1-aplus.webp"] },
        },
        {
          titel: "Elektro-Bootsmotor, 32 lbs",
          haupt: "/case_studies/miganeo/p2-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/miganeo/p2-${n}.webp`),
          varianten: [1, 2].map((n) => `/case_studies/miganeo/p2-var-${n}.webp`),
          aplus: { titel: "Premium A+, die ganze Seite", bahnen: ["/case_studies/miganeo/p2-aplus.webp"] },
        },
        {
          titel: "Solarfolie für runde Pools",
          haupt: "/case_studies/miganeo/p3-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/miganeo/p3-${n}.webp`),
          varianten: [1, 2, 3].map((n) => `/case_studies/miganeo/p3-var-${n}.webp`),
          aplus: { titel: "Premium A+, die ganze Seite", bahnen: ["/case_studies/miganeo/p3-aplus.webp"] },
        },
      ],
    },
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
    badges: [{ art: "hinweis", label: "Effizienzziel des Kunden übertroffen", icon: "trophy" }],
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
      produkte: [
        {
          titel: "Wasserfilter XL, 800 ml",
          haupt: "/case_studies/bachgold/p1-haupt.webp",
          strecke: [1, 2, 3, 4, 5].map((n) => `/case_studies/bachgold/p1-${n}.webp`),
          varianten: [1, 2, 3].map((n) => `/case_studies/bachgold/p1-var-${n}.webp`),
          aplus: {
            titel: "Sechs Module",
            bahnen: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/bachgold/p1-aplus-${n}.webp`),
          },
        },
      ],
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
    badges: [{ art: "bestseller", label: "Rang 1 in der Nische Wasserfilter" }],
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
      produkte: [
        {
          titel: "PEA 600 mg",
          haupt: "/case_studies/vitaworld/p1-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/vitaworld/p1-${n}.webp`),
          palette: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/vitaworld/p1-pal-${n}.webp`),
          aplus: {
            titel: "Vier Module für Taurin 850 mg",
            bahnen: [1, 2, 3, 4].map((n) => `/case_studies/vitaworld/p1-aplus-${n}.webp`),
          },
        },
      ],
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
          "Ein gutes Drittel des Umsatzes kam über Werbung",
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
          "Anteil der Werbung am Gesamtumsatz um 19 % gesunken",
          "Marke und Produktdetailseiten treiben das Wachstum",
          "FR, IT, ES und NL stehen in den Startlöchern",
        ],
      },
    ],
    heroStats: [
      { value: "+147 %", label: "Umsatz", sublabel: "im Vergleich der beiden Quartale", trend: "up" },
      { value: "×3,2", label: "Bestellungen", sublabel: "im selben Zeitraum", trend: "up" },
      { value: "−19,4 %", label: "Anteil der Werbung am Umsatz", sublabel: "das Wachstum kommt organisch", trend: "down" },
    ],
    kennzahlen: [
      { kuerzel: "CTR", name: "Klickrate in der Suche", wert: "+52 %", hinweis: "nach neuen Hauptbildern und Titeln", trend: "up" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+50 %", trend: "up" },
      { kuerzel: "ACoS", name: "Advertising Cost of Sales", wert: "−30 %", trend: "down" },
      { kuerzel: "TACoS", name: "Total Advertising Cost of Sales", wert: "−44 %", trend: "down" },
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
    /* Ein Produkt, aber sechs Hauptbilder: eines je Bundle-Groesse von einem
       bis dreissig Liter. Derselbe Bildstil laeuft ueber die ganze Staffelung,
       und genau das soll die Reihe zeigen. */
    arbeit: {
      produkte: [
        {
          titel: "Bio-Ethanol, 1 bis 30 Liter",
          haupt: "/case_studies/haa/p1-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6, 7].map((n) => `/case_studies/haa/p1-${n}.webp`),
          varianten: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/haa/p1-var-${n}.webp`),
          aplus: { titel: "Premium A+, die ganze Seite", bahnen: ["/case_studies/haa/p1-aplus.webp"] },
          video: { quelle: "/case_studies/haa/p1-video.mp4", poster: "/case_studies/haa/p1-video.webp" },
        },
      ],
    },
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
          "Conversion Rate mehr als verfünffacht",
          "Wöchentliche Bestellungen ver-14-facht",
          "Die Accountsperrung in KW 10 war nach zwei Wochen erledigt",
        ],
      },
    ],
    heroStats: [
      { value: "×14", label: "Bestellungen pro Woche", sublabel: "Launch-Woche bis Spitze", trend: "up" },
      { value: "+900 %", label: "Klicks pro Woche", sublabel: "ohne großes Werbebudget", trend: "up" },
      { value: "17", label: "Wochen vom Launch zur Spitze", trend: "neutral" },
    ],
    kennzahlen: [
      { kuerzel: "CTR", name: "Klickrate in der Suche", wert: "+46 %", trend: "up" },
      { kuerzel: "CVR", name: "Conversion Rate", wert: "+439 %", hinweis: "Launch-Woche bis Spitze", trend: "up" },
    ],
    subStats: [],
    badges: [
      { art: "bestseller", label: "Bio-Ethanol in seiner Nische" },
      { art: "hinweis", label: "Recovery der Account-Sperrung in 2 Wochen", icon: "shield" },
    ],
  },
  {
    slug: "futum",
    displayName: "FUTUM",
    mono: "F",
    bgImage: "/case_studies/futum.webp",
    logo: "/case_studies/futum-logo.webp",
    /* Vier Produkte, weil bei Futum genau das die Arbeit ist: derselbe Aufbau
       ueber mehrere Artikel, je mit eigenen Hauptbildvarianten. Zum
       Silberfischspray liegt kein A+ Content in der Lieferung, deshalb fehlt
       er dort. */
    arbeit: {
      produkte: [
        {
          titel: "Maulwurfskugeln",
          haupt: "/case_studies/futum/p1-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p1-${n}.webp`),
          varianten: [1, 2, 3, 4].map((n) => `/case_studies/futum/p1-var-${n}.webp`),
          aplus: {
            titel: "Sechs Module",
            bahnen: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p1-aplus-${n}.webp`),
          },
        },
        {
          titel: "Wühlmausgranulat",
          haupt: "/case_studies/futum/p2-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p2-${n}.webp`),
          varianten: [1, 2].map((n) => `/case_studies/futum/p2-var-${n}.webp`),
          aplus: {
            titel: "Sechs Module",
            bahnen: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p2-aplus-${n}.webp`),
          },
        },
        {
          titel: "Spot-on für Hunde",
          haupt: "/case_studies/futum/p3-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p3-${n}.webp`),
          varianten: [1, 2].map((n) => `/case_studies/futum/p3-var-${n}.webp`),
          aplus: {
            titel: "Sechs Module",
            bahnen: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p3-aplus-${n}.webp`),
          },
          video: {
            quelle: "/case_studies/futum/p3-video.mp4",
            poster: "/case_studies/futum/p3-video.webp",
          },
        },
        {
          titel: "Silberfischspray",
          haupt: "/case_studies/futum/p4-haupt.webp",
          strecke: [1, 2, 3, 4, 5, 6].map((n) => `/case_studies/futum/p4-${n}.webp`),
          varianten: [1, 2].map((n) => `/case_studies/futum/p4-var-${n}.webp`),
        },
      ],
    },
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
          "Beide Produkte profitabel skaliert",
          "Organischer Anteil bis 80 %",
          "Bestseller- und Amazon's-Choice-Badge kamen dazu",
        ],
      },
    ],
    /* Hier stehen die drei Kennzahlen oben in der Karte und nicht im Band
       darunter. „Zwei Produktlaunches" und „vier Produkte mit eigenem
       Content" standen vorher an den drei grossen Plaetzen und sagten nichts:
       die Marke hat deutlich mehr Artikel, und die Zahl der Launches ist
       keine Leistung. Das Band entfaellt dafuer, sonst stuende dieselbe Zahl
       zweimal auf der Seite. */
    heroStats: [
      { value: "+30 %", label: "CTR", sublabel: "Klickrate in der Suche", trend: "up" },
      { value: "+37,3 %", label: "CVR", sublabel: "Conversion Rate, ganzes Konto", trend: "up" },
      { value: "−19,7 %", label: "ACoS", sublabel: "trotz Skalierung im Launch", trend: "down" },
    ],
    kennzahlen: [],
    subStats: [],
    badges: [
      { art: "bestseller", label: "Maulwurfskugeln" },
      { art: "tipp", label: "Holzwurm-Spray" },
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

/**
 * Alternativtext fuer das Markenfoto eines Falls.
 *
 * Steht hier, weil dasselbe Foto an vier Stellen vorkommt: im Band der
 * Startseite, im Raster auf `/ergebnisse`, im Kopf der Fallseite und unter
 * "Weitere Case Studies". Vier Stellen mit vier verschiedenen Texten waeren
 * vier Gelegenheiten, es beim naechsten Mal zu vergessen.
 *
 * `muster` kommt aus dem Woerterbuch und traegt `{marke}` und `{branche}`.
 */
export function markenfotoAlt(c: CaseStudy, muster: string): string {
  return muster.replace("{marke}", c.displayName).replace("{branche}", c.industry);
}

/* ============================================================
   Englische Fassung.

   Die Uebersetzungen liegen in `cases-en.ts` und werden hier ueber die
   Reihenfolge zugeordnet. Weicht eine Laenge ab, bricht der Bau ab: eine
   stille Verschiebung waere der schlimmere Fehler, dann stuende unter einer
   Ueberschrift ein Beleg, der nicht dazu gehoert. Diese Datei wird nur auf
   dem Server gelesen, der Abbruch faellt also beim Bauen und nie beim
   Besucher.

   Uebersetzt wird die Copy, nicht die Struktur: Trend, Kuerzel, Farbe,
   Bildpfade, Marktplaetze und Zahlenreihen des Diagramms bleiben, wie sie in
   dieser Datei stehen. `wert` und `value` sind die eine Ausnahme, weil ein
   deutsch gesetzter Zahlenwert ("9,9 %") im Englischen etwas anderes bedeutet.
   ============================================================ */

function gleichLang<A, B>(slug: string, feld: string, a: A[], b: B[]): void {
  if (a.length !== b.length) {
    throw new Error(
      `cases-en: ${slug}.${feld} hat ${b.length} Eintraege, die deutsche Fassung ${a.length}. ` +
        `Die Zuordnung laeuft ueber die Reihenfolge, also muessen beide gleich lang sein.`
    );
  }
}

function uebersetze(c: CaseStudy, en: FallEn): CaseStudy {
  gleichLang(c.slug, "sections", c.sections, en.sections);
  gleichLang(c.slug, "heroStats", c.heroStats, en.heroStats);
  gleichLang(c.slug, "kennzahlen", c.kennzahlen, en.kennzahlen);
  gleichLang(c.slug, "subStats", c.subStats, en.subStats);
  gleichLang(c.slug, "badges", c.badges, en.badges);
  gleichLang(c.slug, "chart", c.chart ?? [], en.chart ?? []);
  gleichLang(c.slug, "arbeit.produkte", c.arbeit?.produkte ?? [], en.produkte ?? []);

  return {
    ...c,
    displayName: en.displayName ?? c.displayName,
    industry: en.industry,
    timeframe: en.timeframe,
    headline: en.headline,
    subheadline: en.subheadline,
    preview: { ...c.preview, value: en.preview.value, label: en.preview.label },
    sections: c.sections.map((s, i) => {
      const e = en.sections[i];
      gleichLang(c.slug, `sections[${i}].punkte`, s.punkte ?? [], e.punkte ?? []);
      return { heading: e.heading, body: e.body, punkte: s.punkte && e.punkte };
    }),
    heroStats: c.heroStats.map((x, i) => ({ ...x, ...en.heroStats[i] })),
    kennzahlen: c.kennzahlen.map((x, i) => ({
      ...x,
      name: en.kennzahlen[i].name,
      wert: en.kennzahlen[i].wert,
      /* `hinweis` faellt weg, wenn die englische Fassung keinen hat: sonst
         stuende dort der deutsche Satz. */
      hinweis: en.kennzahlen[i].hinweis,
    })),
    subStats: c.subStats.map((x, i) => ({ ...x, ...en.subStats[i] })),
    badges: c.badges.map((b, i) => ({ ...b, label: en.badges[i] })),
    chart: c.chart?.map((pkt, i) => ({
      ...pkt,
      label: en.chart![i].label,
      annotation: en.chart![i].annotation,
    })),
    arbeit: c.arbeit && {
      produkte: c.arbeit.produkte.map((prod, i) => {
        const e = en.produkte![i];
        return {
          ...prod,
          titel: e.titel,
          aplus: prod.aplus && { ...prod.aplus, titel: e.aplus ?? prod.aplus.titel },
        };
      }),
    },
  };
}

const faelleEnglisch = cases.map((c) => {
  const en = faelleEn[c.slug];
  /* `Record` prueft die Schluessel nicht, `slug` ist ein String. Ein neuer
     Fall ohne englische Fassung faellt deshalb hier auf und nicht erst als
     leere Seite. */
  if (!en) throw new Error(`cases-en: fuer "${c.slug}" fehlt die englische Fassung.`);
  return uebersetze(c, en);
});

export function faelleFuer(sprache: Sprache): CaseStudy[] {
  return sprache === "de" ? cases : faelleEnglisch;
}

/**
 * Was das Fall-Band der Startseite braucht, und sonst nichts.
 *
 * Die Sektion laeuft im Browser. Wuerde sie `cases` selbst importieren, laege
 * die ganze Sammlung im Bundle, mit allen Bildlisten der ausgelieferten
 * Arbeit, und seit es die englische Fassung gibt zweimal. Diese neun Felder
 * sind das, was auf einem Streifen steht.
 */
export type FallVorschau = {
  slug: string;
  displayName: string;
  logo?: string;
  bgImage?: string;
  /** Fuer den Alternativtext des Markenfotos. */
  industry: string;
  accent: string;
  headline: string;
  preview: { value: string; label: string; trend: Trend };
};

export function vorschauFuer(sprache: Sprache): FallVorschau[] {
  return faelleFuer(sprache).map((c) => ({
    slug: c.slug,
    displayName: c.displayName,
    logo: c.logo,
    bgImage: c.bgImage,
    industry: c.industry,
    accent: c.accent,
    headline: c.headline,
    preview: c.preview,
  }));
}

export function fallFuer(sprache: Sprache, slug: string): CaseStudy | undefined {
  return faelleFuer(sprache).find((c) => c.slug === slug);
}
