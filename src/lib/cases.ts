/**
 * Echte Case-Study-Daten (4 Marken). Zahlen und Struktur stammen aus den
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

export type CaseStudy = {
  slug: string;
  displayName: string;
  anonymized: boolean;
  industry: string;
  marketplaces: string[];
  timeframe: string;
  accent: string; // hex
  headline: string;
  subheadline: string;
  preview: { value: string; label: string; trend: Trend };
  sections: { heading: string; body: string }[];
  heroStats: CaseStat[];
  subStats: CaseStat[];
  badges: CaseBadge[];
  chart?: ChartPoint[];
};

export const cases: CaseStudy[] = [
  {
    slug: "vitaworld",
    displayName: "Vitaworld",
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
        body: "Solider Account auf Amazon DE, aber stark abhängig vom PPC-Druck. Wachstum war nur mit proportional steigenden Werbekosten möglich. FR, IT, ES und NL noch nicht ausgerollt.",
      },
      {
        heading: "Unser Vorgehen",
        body: "Fokus auf Conversion-Stärke und organische Rankings statt reiner Werbeskalierung. Hauptbilder, Titel und Targets neu aufgesetzt. Der Adspend stieg nur um 39 %, der Umsatz dagegen um 147 %.",
      },
      {
        heading: "Ergebnis",
        body: "Der PPC-Anteil am Gesamtumsatz sank von 36 % auf 29 %. Vitaworld wächst jetzt überproportional organisch. Marke und Produktdetailseiten treiben das Wachstum. FR, IT, ES, NL stehen in den Startlöchern.",
      },
    ],
    heroStats: [
      { value: "+147 %", label: "Umsatz", sublabel: "131k € auf 326k € pro Quartal", trend: "up" },
      { value: "−44 %", label: "TACoS", sublabel: "von 10,4 % auf 5,8 %", trend: "down" },
      { value: "−19,4 %", label: "PPC-Anteil am Gesamtumsatz", sublabel: "von 36 % auf 29 %", trend: "down" },
    ],
    subStats: [
      { value: "+50 %", label: "Conversion Rate", sublabel: "von 18,6 % auf 27,9 %", trend: "up" },
      { value: "+52 %", label: "Click-Through-Rate", sublabel: "von 0,44 % auf 0,67 %", trend: "up" },
      { value: "×3,2", label: "Bestellungen", sublabel: "5.019 auf 16.073 pro Quartal", trend: "up" },
      { value: "−30 %", label: "ACoS", sublabel: "30,9 % auf 21,6 %", trend: "down" },
    ],
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
    anonymized: false,
    industry: "Küche und Haushalt",
    marketplaces: ["DE"],
    timeframe: "2026",
    accent: "#FF9900",
    headline: "Vom Cold Launch zu Top-Performance in 17 Wochen",
    subheadline:
      "Organic-First gestartet, mit kleinem Werbebudget aufgebaut. Erreicht eine Conversion-Stärke, die etablierte Marken selten erreichen.",
    preview: { value: "+439 %", label: "Conversion Rate", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Neuer Marken-Launch ohne organische Rankings, ohne Bewertungen, ohne etabliertes Werbebudget. Wachstum musste über Conversion und organische Sichtbarkeit kommen, nicht über reines Spending.",
      },
      {
        heading: "Unser Vorgehen",
        body: "Statt mit Werbedruck zu starten, zuerst das Fundament: Retail Readiness, Conversion-Optimierung und saubere Kampagnenstruktur. Produktdetailseiten konsequent auf die Kaufentscheidung ausgerichtet, Targets gezielter bespielt.",
      },
      {
        heading: "Ergebnis",
        body: "Conversion Rate von 5,5 % auf 32,5 % gehoben, eine Account-Performance, die viele etablierte Marken nie erreichen. ACoS auf 13,5 % gedrückt. Wöchentliche Bestellungen ver-14-facht. Die Amazon-Accountsperrung in KW10 hat die Skalierung nur kurz gebremst.",
      },
    ],
    heroStats: [
      { value: "32,5 %", label: "Conversion Rate", trend: "up" },
      { value: "13,5 %", label: "ACoS", trend: "down" },
      { value: "+439 %", label: "CR-Steigerung", sublabel: "Launch-Woche bis Peak", trend: "up" },
    ],
    subStats: [
      { value: "×14", label: "Bestellungen pro Woche", sublabel: "28 auf 397", trend: "up" },
      { value: "+46 %", label: "Click-Through-Rate", trend: "up" },
      { value: "+900 %", label: "Klicks pro Woche", trend: "up" },
    ],
    badges: [
      { label: "Bestseller in der Nische", icon: "trophy" },
      { label: "Recovery der Account-Sperrung in 2 Wochen", icon: "shield" },
    ],
  },
  {
    slug: "futum",
    displayName: "FUTUM",
    anonymized: false,
    industry: "Schädlingsbekämpfung",
    marketplaces: ["DE"],
    timeframe: "Kunde seit 2024",
    accent: "#2A9BD8",
    headline: "Profitable Skalierung in der Akut-Nische",
    subheadline:
      "Strukturiert aufgebaut, profitabel skaliert. Sichtbare Trust-Signale am Amazon-Marktplatz erreicht.",
    preview: { value: "+37,3 %", label: "Conversion Rate", trend: "up" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Neue Produktlaunches in der Schädlingsbekämpfung, einer Nische, in der Käufer nicht recherchieren, sondern akut eine Problemlösung wollen. Sichtbarkeit und Effizienz müssen vom ersten Tag sitzen.",
      },
      {
        heading: "Unser Vorgehen",
        body: "Vier Stellschrauben parallel: Content und Retail Readiness, sauberes Kampagnen-Setup über alle Werbeformate, gezielte Positionierung auf problemlösungs-relevanten Suchbegriffen, Pricing als Wachstumstreiber.",
      },
      {
        heading: "Ergebnis",
        body: "Im ersten vollen Amazon-Jahr 2025: 392.327 € Umsatz und 17.042 Bestellungen. ACoS im Tief bei 19,99 %, organischer Anteil bis 80 %. Wachstum profitabel skaliert, nicht eingekauft. Bestseller- und Amazon's-Choice-Badges als zusätzliche Trust-Signale.",
      },
    ],
    heroStats: [
      { value: "−19,7 %", label: "ACoS", sublabel: "trotz Launch-Skalierung", trend: "down" },
      { value: "+37,3 %", label: "Conversion Rate", sublabel: "Account-Ebene", trend: "up" },
      { value: "+30 %", label: "Click-Through-Rate", sublabel: "in der Suche", trend: "up" },
    ],
    subStats: [
      { value: "80 %", label: "Organische Verkäufe", sublabel: "Peak-Anteil am Gesamtumsatz", trend: "up" },
      { value: "17.042", label: "Bestellungen 2025", trend: "up" },
      { value: "392.327 €", label: "Umsatz 2025", trend: "up" },
    ],
    badges: [
      { label: "FUTUM Maulwurfskugeln", icon: "trophy" },
      { label: "FUTUM Holzwurm-Spray", icon: "award" },
    ],
  },
  {
    slug: "marke-gartenzubehoer",
    displayName: "Marke aus Gartenzubehör",
    anonymized: true,
    industry: "Gartenzubehör",
    marketplaces: ["DE", "IT", "FR", "ES"],
    timeframe: "Q1 bis Q2 2026",
    accent: "#0E7CA0",
    headline: "Saisonale Nachfrage profitabel skaliert",
    subheadline:
      "Frühzeitig vorbereitet, dann über vier europäische Marktplätze parallel ausgerollt.",
    preview: { value: "−35 %", label: "TACoS im Hauptmarkt", trend: "down" },
    sections: [
      {
        heading: "Ausgangslage",
        body: "Marke mit klarer Saisonalität, die Hauptnachfrage fällt auf April und Mai. Schon im Herbst wurden die Grundlagen für die kommende Saison gelegt, statt erst zum Saisonstart zu reagieren.",
      },
      {
        heading: "Unser Vorgehen",
        body: "Frühe Listing- und Content-Optimierung, paralleler Aufbau von vier europäischen Marktplätzen (DE, IT, FR, ES), Kampagnenstruktur so vorbereitet, dass höhere Nachfrage effizient absorbiert wird.",
      },
      {
        heading: "Ergebnis",
        body: "Hauptmarkt DE: TACoS um 35 % gesenkt, Conversion Rate +21 %, ACoS −14 %. Italien: Klicks +110 % bei sinkendem ACoS. Die saisonale Nachfrage wurde profitabel in Wachstum übersetzt, statt sie nur abzugreifen.",
      },
    ],
    heroStats: [
      { value: "−35 %", label: "TACoS", sublabel: "Hauptmarkt DE, Saison-Skalierung", trend: "down" },
      { value: "+21 %", label: "Conversion Rate", sublabel: "Hauptmarkt DE", trend: "up" },
      { value: "−14 %", label: "ACoS", sublabel: "Hauptmarkt DE", trend: "down" },
    ],
    subStats: [
      { value: "+110 %", label: "Klicks Italien", sublabel: "Sekundärmarkt zur Saison", trend: "up" },
      { value: "−18 %", label: "ACoS Italien", sublabel: "bei steigendem Traffic", trend: "down" },
      { value: "4", label: "Marktplätze parallel", sublabel: "DE, IT, FR, ES", trend: "neutral" },
    ],
    badges: [],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
