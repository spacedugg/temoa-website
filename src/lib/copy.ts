import type { Block } from "@/components/sections/Blocks";

/* Alle Texte stammen aus docs/copywriting.md (abgestimmter Stand). */

export type Hero = { eyebrow: string; lead: string; accent: string; sub: string };

export const servicesList = [
  { label: "Full Service", href: "/full-service", body: "Der komplette Account in einer Hand – alle Bausteine kombiniert." },
  { label: "Strategie & Pricing", href: "/leistungen/strategie-pricing", body: "Das Fundament: Wettbewerb, Marge und Preis – durchgerechnet, bevor investiert wird." },
  { label: "Content & Listing-SEO", href: "/leistungen/content-listing-seo", body: "Hauptbilder, A+ und Brand Store – Sichtbarkeit, die nicht pro Klick kostet." },
  { label: "PPC Advertising", href: "/leistungen/ppc-advertising", body: "Verstärkt, was organisch schon trägt – Gebote auf Deckungsbeitrag gerechnet." },
  { label: "Internationalisierung", href: "/leistungen/internationalisierung", body: "Das erprobte Setup, nativ ausgerollt auf neue Marktplätze." },
  { label: "Account Management", href: "/leistungen/account-management", body: "Die Klammer um alles: Bestand, Buy-Box, Compliance und Reporting." },
];

function bridgeTo(exclude: string): Block {
  return {
    kind: "bridge",
    eyebrow: "Weiter im System",
    title: "Eine Leistung trägt die nächste.",
    links: servicesList.filter((s) => s.href !== exclude),
  };
}

export type LeistungPage = { slug: string; nav: string; hero: Hero; blocks: Block[] };

export const leistungen: Record<string, LeistungPage> = {
  "strategie-pricing": {
    slug: "strategie-pricing",
    nav: "Strategie & Pricing",
    hero: {
      eyebrow: "Strategie & Pricing",
      lead: "Erst wird gerechnet.",
      accent: "Dann investiert.",
      sub: "Das Fundament jedes Accounts: Wettbewerb, Marge und Preis – durchgerechnet, bevor irgendwo investiert wird.",
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Wettbewerbsanalyse", title: "Der Abstand ist kein Problem. Er ist euer Potenzial.", body: "Benchmark-Vergleich zum Kategorie-Führer: Wir zeigen, wo ihr im Wettbewerb steht – und welcher Abstand sich in Umsatz übersetzen lässt.", icon: "search" },
          { kicker: "Margenkalkulation", title: "Die Marge. Schwarz auf weiß.", body: "Deckungsbeitrag je Verkauf – durchgerechnet vor jeder Maßnahme. Investiert wird erst, wenn die Zahl steht.", icon: "margin" },
          { kicker: "Ziele", title: "Ziele, die nachgehalten werden.", body: "Quartalsziele und feste Reviews. Fortschritt wird gemessen, nicht behauptet.", icon: "target" },
          { kicker: "Ablauf", title: "Von null auf Zielbild in drei Wochen.", body: "Zugänge, Audit, Zielbild: In drei Wochen steht ein durchgerechneter Plan – keine Folienshow.", icon: "chart" },
        ],
      },
      bridgeTo("/leistungen/strategie-pricing"),
    ],
  },

  "content-listing-seo": {
    slug: "content-listing-seo",
    nav: "Content & Listing-SEO",
    hero: {
      eyebrow: "Content & Listing-SEO",
      lead: "Euer bester Verkäufer",
      accent: "schläft nie.",
      sub: "Das Listing verkauft rund um die Uhr – wenn es gut ist. Bilder, A+ und Keywords, die aus Klicks Käufer machen und organisch ranken.",
    },
    blocks: [
      {
        kind: "grid",
        eyebrow: "Die 6 Bausteine",
        title: "Sechs Bausteine. Ein Schaufenster, das verkauft.",
        items: [
          { title: "Hauptbild & Galerie", body: "Der erste Eindruck, der über den Klick entscheidet.", icon: "content" },
          { title: "A+ & Premium A+", body: "Module, die Vorteile zeigen statt nur beschreiben.", icon: "layers" },
          { title: "Titel, Bullets & Texte", body: "Verkaufstext statt Datenblatt – führt zur Kaufentscheidung.", icon: "search" },
          { title: "SEO & Backend-Keywords", body: "Relevanz im Listing und Backend – für A10, Rufus & COSMO.", icon: "target" },
          { title: "Brand Store", body: "Eine Markenwelt, die Cross-Selling und Wiederkauf trägt.", icon: "globe" },
          { title: "A/B-Tests", body: "Entscheidungen am Markt geprüft, nicht im Bauchgefühl.", icon: "chart" },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Typische Fehler",
        title: "Wo Listings Geld liegen lassen.",
        cols: 2,
        items: [
          { title: "Hauptbild ohne USP", body: "Austauschbar statt unterscheidbar – der Klick geht zur Konkurrenz.", icon: "content" },
          { title: "Bullets wie ein Datenblatt", body: "Merkmale statt Nutzen – die Kaufeinwände bleiben unbeantwortet.", icon: "search" },
          { title: "Basic-A+ statt Premium", body: "Verschenkte Fläche, auf der Vertrauen entstehen könnte.", icon: "layers" },
          { title: "Kein Brand Store", body: "Keine Markenwelt, kein Cross-Selling, kein Wiederkauf.", icon: "globe" },
        ],
      },
      {
        kind: "callout",
        eyebrow: "Amazon-KI",
        title: "Gebaut für A10, Rufus und COSMO.",
        body: "Strukturierte Inhalte, die nicht nur Menschen überzeugen, sondern auch die KI-Suche von morgen versteht.",
      },
      bridgeTo("/leistungen/content-listing-seo"),
    ],
  },

  "ppc-advertising": {
    slug: "ppc-advertising",
    nav: "PPC Advertising",
    hero: {
      eyebrow: "PPC Advertising",
      lead: "Ads als Verstärker.",
      accent: "Nicht als Lebenserhaltung.",
      sub: "Werbung verstärkt, was organisch schon trägt – gesteuert auf Profitabilität, nicht auf Bruttoumsatz.",
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Kampagnen-Architektur", title: "Jeder Euro hat eine Aufgabe.", body: "Sponsored Products, Brands, Display und DSP – sauber getrennt nach Zweck, statt alles in einen Topf zu werfen.", icon: "ads", bullets: ["Sponsored Products", "Sponsored Brands", "Sponsored Display", "DSP"] },
          { kicker: "Optimierungs-Kreislauf", title: "Der Kreislauf, der euer Konto schärft.", body: "Wöchentliches Keyword-Harvesting, Negativierung und Gebote auf Deckungsbeitrag – kontinuierlich, nicht einmalig.", icon: "target" },
          { kicker: "Funnel", title: "Vom Sichtkontakt zum Kauf.", body: "Impressionen, Klicks, Käufe – mit CTR und CVR im Blick, an jedem Schritt des Funnels.", icon: "chart" },
          { kicker: "Arbeitsweise", title: "Einmal aufsetzen reicht nicht. Wir takten wöchentlich.", body: "Kampagnen werden mehrmals pro Woche justiert – Gebote, Budgets, Suchbegriffe.", icon: "spark" },
        ],
      },
      {
        kind: "qa",
        eyebrow: "FAQ",
        title: "Drei Fragen, ehrlich beantwortet.",
        items: [
          { q: "Warum nicht einfach mehr Budget?", a: "Ads bringen Besucher – verkaufen muss das Listing. Stimmt die Conversion nicht, macht mehr Budget den Fehler nur teurer. Erst trägt das Listing, dann skalieren die Ads." },
          { q: "Was ist ein guter TACoS?", a: "Es gibt keinen Pauschalwert. Ein guter TACoS hängt von Marge und Ziel ab – wir steuern auf Deckungsbeitrag, nicht auf eine Zahl auf dem Papier." },
          { q: "Übernehmt ihr bestehende Kampagnen?", a: "Ja. Wir analysieren das vorhandene Setup, behalten, was funktioniert, und strukturieren den Rest neu – nach Zweck und Profitabilität." },
        ],
      },
      bridgeTo("/leistungen/ppc-advertising"),
    ],
  },

  internationalisierung: {
    slug: "internationalisierung",
    nav: "Internationalisierung",
    hero: {
      eyebrow: "Internationalisierung",
      lead: "Übersetzen kann jeder.",
      accent: "Lokalisieren verkauft.",
      sub: "Das in Deutschland erprobte Setup, Markt für Markt nativ ausgerollt – nicht Wort für Wort übersetzt.",
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Vergleich", title: "Wort für Wort übersetzt verkauft nicht.", body: "Maschinelle Übersetzung verfehlt Suchbegriffe und Tonalität. Native Lokalisierung trifft, wonach im Land wirklich gesucht wird.", icon: "globe" },
          { kicker: "Vorgehen", title: "Ein Playbook, mehrfach ausgerollt.", body: "Das in DE erprobte Setup Markt für Markt: Listing, SEO, Ads und Compliance je Land.", icon: "layers" },
          { kicker: "Beweis", title: "Funktioniert das? Hat es schon.", body: "Gartenmarke: ein Playbook, vier Länder – TACoS −35 % im Heimatmarkt. Kundenbeispiel, kein Versprechen.", icon: "shield" },
          { kicker: "Marktplätze", title: "Fünf Marktplätze, zentral gesteuert.", body: "Ein Reporting über alle Länder hinweg – vergleichbare Zahlen, eine Steuerung.", icon: "globe" },
        ],
      },
      bridgeTo("/leistungen/internationalisierung"),
    ],
  },

  "account-management": {
    slug: "account-management",
    nav: "Account Management",
    hero: {
      eyebrow: "Account Management",
      lead: "Der Betrieb,",
      accent: "der euer Konto ruhig hält.",
      sub: "Bestand, Buy-Box, Compliance und Reporting – das Tagesgeschäft, das heute eure Woche frisst, ist bei uns der Job.",
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Monitoring", title: "Der Alarm, den ihr nie seht.", body: "Probleme werden behoben, bevor sie teuer werden: Listing-Hijacker, Suspendierungen, Cases mit dem Seller Support.", icon: "shield" },
          { kicker: "Bestand", title: "Bestand ist Ranking.", body: "FBA-Forecasting und Reorder-Punkte – Out-of-Stock kostet das Ranking, nicht nur den Umsatz.", icon: "layers" },
          { kicker: "Buy-Box", title: "Die Buy-Box verliert man leise.", body: "Laufendes Monitoring und Pricing, damit die Buy-Box bei euch bleibt.", icon: "target" },
          { kicker: "Reporting", title: "Reporting ohne Rohdaten-Friedhof.", body: "Zahlen in Entscheidungen übersetzt – wöchentlich, in fünf Minuten verständlich.", icon: "chart" },
        ],
      },
      { kind: "callout", eyebrow: "Zusammengefasst", title: "Vier Routinen. Ein ruhiges Konto.", body: "Monitoring, Bestand, Buy-Box und Reporting greifen ineinander – damit euer Konto läuft, ohne dass ihr ran müsst." },
      bridgeTo("/leistungen/account-management"),
    ],
  },
};

export const caseStudies = [
  {
    brand: "Vitaworld",
    category: "Nahrungsergänzung",
    metric: "+147 %",
    metricLabel: "Umsatz in einem Quartal",
    second: "TACoS −44 %",
    body: "Solider Account, aber Wachstum nur über proportional steigendes Werbebudget. Nach Neuaufbau von Hauptbildern, Titeln und Kampagnen-Targets stieg der Umsatz um 147 % – der TACoS fiel von 10,4 % auf 5,8 %.",
    note: "Kundenbeispiel, Q1 2025 vs. Q1 2026",
    color: "#FF9900",
  },
  {
    brand: "FUTUM",
    category: "Marke auf Amazon",
    metric: "8 von 10",
    metricLabel: "Verkäufe ohne Klickkosten",
    second: "Organic First",
    body: "Heute laufen 8 von 10 Verkäufen organisch – ohne Klickkosten. Werbung verstärkt das Geschäft, sie trägt es nicht mehr.",
    note: "Kundenbeispiel",
    color: "#FF3131",
  },
  {
    brand: "Gartenmarke",
    category: "Garten · DE/FR/IT/ES",
    metric: "−35 %",
    metricLabel: "TACoS im Heimatmarkt",
    second: "4 Länder, ein Playbook",
    body: "Ein Playbook, vier Länder. Über organische Rankings und ein bereinigtes Sortiment sank der beworbene Umsatzanteil deutlich – der Umsatz nicht.",
    note: "Kundenbeispiel, Zeitraum 12 Monate",
    color: "#0E7CA0",
  },
];

export const principles = [
  { title: "Eine Handvoll Marken pro Consultant", body: "Keine Massenbetreuung. Wer euer Konto führt, hat den Kopf frei dafür." },
  { title: "Antwort am selben Tag", body: "Kein Ticketsystem, das Tage verschluckt. Ihr habt feste Ansprechpartner." },
  { title: "Review im Kalender, nicht im Postfach", body: "Feste Termine gegen klare Ziele – statt Reportings, die niemand öffnet." },
];

export const designPrinciples = [
  { title: "Den Klick gewinnen", body: "Hauptbild und Galerie, die im Suchergebnis auffallen und zum Öffnen bewegen.", icon: "content" as const },
  { title: "Vertrauen aufbauen", body: "A+ und Brand Store, die Qualität zeigen, statt sie nur zu behaupten.", icon: "shield" as const },
  { title: "Einwände lösen", body: "Jeder Bildplatz beantwortet eine Kauffrage – bis kein Zweifel mehr bleibt.", icon: "target" as const },
];
