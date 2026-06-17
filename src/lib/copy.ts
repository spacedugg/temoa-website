import type { Block } from "@/components/sections/Blocks";

/* Alle Texte stammen aus der abgestimmten Copywriting-Datei (Stand 2026-06-16). */

export type Hero = { eyebrow: string; lead: string; accent: string; sub: string; chips?: string[] };

/* Preis-Schwellen (ICP-Filter). null = „individuelles Angebot". */
export const pricing: Record<string, string | null> = {
  "full-service": "3.500 €",
  "listing-seo": "3.000 €",
  "ppc-advertising": "2.500 €",
  strategie: null,
  "account-management": null,
  internationalisierung: null,
};

/* Vier Kernleistungen + Internationalisierung als Erweiterung. */
export const services = [
  { slug: "strategie", label: "Strategie", href: "/leistungen/strategie", core: true },
  { slug: "listing-seo", label: "Listing & SEO", href: "/leistungen/listing-seo", core: true },
  { slug: "ppc-advertising", label: "PPC Advertising", href: "/leistungen/ppc-advertising", core: true },
  { slug: "account-management", label: "Account Management", href: "/leistungen/account-management", core: true },
  { slug: "internationalisierung", label: "Internationalisierung", href: "/leistungen/internationalisierung", core: false },
];

/* "Weitere Leistungen" am Seitenende: die anderen Services + Full Service 360°. */
function weitere(slug: string): Block {
  return {
    kind: "bridge",
    eyebrow: "Weitere Leistungen",
    title: "Eine Leistung allein löst nur die halbe Gleichung.",
    links: [
      ...services.filter((s) => s.slug !== slug).map((s) => ({ label: s.label, href: s.href })),
      { label: "Full Service 360°", href: "/full-service", body: "Alle fünf Leistungen kombiniert" },
    ],
  };
}

/* ---------------- FULL SERVICE (Übersicht) ---------------- */
export const fullService = {
  hero: {
    eyebrow: "Full-Service Amazon-Management",
    lead: "Euer Amazon-Konto führen sollte nicht",
    accent: "euer ganzes Leben bestimmen.",
    sub: "Zwischen PPC, Inventarplanung, Listing-Pflege und Compliance versinken die meisten Marken im Tagesgeschäft – statt am Wachstum zu arbeiten. Übergebt euren kompletten Account an ein eingespieltes Team und konzentriert euch auf eure Marke und neue Produkte.",
  } as Hero,
  blocks: [
    {
      kind: "numbered",
      eyebrow: "Für wen wir arbeiten",
      title: "Full Service ist gemacht für …",
      items: [
        { n: "01", title: "Etablierte Marken, 50–500k €/Monat", body: "Ihr habt ein laufendes Geschäft auf Amazon – jetzt geht es um Profitabilität und Skalierung." },
        { n: "02", title: "Teams, die im Tagesgeschäft feststecken", body: "Listing-Pflege, Kampagnen und Support fressen die Zeit für strategisches Wachstum." },
        { n: "03", title: "Umsatz wächst nur über mehr Ad-Spend", body: "Skalierung wird zunehmend unprofitabel – der organische Hebel fehlt." },
        { n: "04", title: "Marken, die international wachsen wollen", body: "Ein Setup, sauber auf weitere Marktplätze ausgerollt – nativ statt übersetzt." },
      ],
    },
    {
      kind: "compare",
      eyebrow: "Das Problem",
      title: "Selbst machen kostet mehr, als ihr denkt.",
      description:
        "Amazon professionell zu führen heißt 20–40 Stunden pro Woche für Listings, Kampagnen, Forecasting und Support. Wer mitten im Tagesgeschäft steckt, kommt nicht zur Optimierung. Ein internes Team kostet schnell 15.000–30.000 €+ pro Monat. Oder weiter selbst machen – zeitintensiv, mit hohem Risiko teurer Fehler.",
      left: { label: "Internes Team aufbauen", value: "15–30k €", points: ["pro Monat an Gehältern", "20–40 Std./Woche Aufwand", "Hohes Risiko teurer Fehler"] },
      right: { label: "Mit TEMOA", value: "Ein eingespieltes Team", points: ["Hat 60+ Marken skaliert", "Ein Vertrag statt mehrerer Dienstleister", "Auf Marge gesteuert, planbar skaliert"] },
    },
    {
      kind: "rows",
      eyebrow: "Unsere fünf Leistungen",
      title: "Alles für euren Account – aus einer Hand.",
      items: [
        { kicker: "Strategie", title: "Eine klare Strategie, bevor wir loslegen.", body: "Wettbewerbs- und Keyword-Analyse, Margenkalkulation, Preisstrategie und KPI-Steuerung. Wir wissen, wer wofür rankt – und wo euer Hebel liegt.", icon: "strategy", visual: "benchmark", cta: { label: "Mehr zur Strategie", href: "/leistungen/strategie" } },
        { kicker: "Content", title: "Listings, die aus Klicks Käufer machen.", body: "Hauptbilder, Galerie, A+ und Premium A+, SEO-Texte und Backend-Keywords – optimiert für echte Käufer und für Rufus, COSMO und A10.", icon: "content", visual: "serp", cta: { label: "Mehr zur Listing-Optimierung", href: "/leistungen/listing-seo" } },
        { kicker: "Advertising", title: "PPC, das profitabel skaliert.", body: "Komplette Kampagnenstruktur, Bid-Management, Budget-Allokation und Reporting – Sponsored Products, Brands, Display und Video. Streuverluste runter, Return on Ad Spend rauf.", icon: "ads", visual: "funnel", cta: { label: "Mehr zu unserem Advertising", href: "/leistungen/ppc-advertising" } },
        { kicker: "Account Management", title: "Euer Konto läuft – ohne dass ihr ran müsst.", body: "Inventar-Forecasting und FBA-Planung, Buy-Box- und Pricing-Monitoring, Case-Management und Reporting. Ein fester Ansprechpartner statt Ticketsystem.", icon: "account", visual: "dashboard", cta: { label: "Mehr zum Account Management", href: "/leistungen/account-management" } },
        { kicker: "Internationalisierung", title: "Eine Marke, bis zu fünf Marktplätze.", body: "Euer erprobtes Setup nativ auf neue Märkte ausgerollt – lokalisiert statt nur übersetzt, zentral gesteuert und in einem Reporting konsolidiert.", icon: "globe", visual: "markets", cta: { label: "Mehr zur Internationalisierung", href: "/leistungen/internationalisierung" } },
      ],
    },
    {
      kind: "checklist",
      eyebrow: "Alle Leistungen im Überblick",
      title: "Was in Full Service enthalten ist.",
      description: "Ein Team, ein Vertrag – jede Leistung aufgeschlüsselt, damit ihr genau seht, was abgedeckt ist.",
      groups: [
        { title: "Strategie", items: ["Wettbewerbs- & Keyword-Analyse", "Margenkalkulation", "Preisstrategie", "KPI-Steuerung & Zielmarken", "Wachstums-Roadmap"] },
        { title: "Content", items: ["Hauptbilder & Galeriebilder", "A+ / Premium A+", "Listing-Texte (Titel, Bullets, Beschreibung)", "SEO & Backend-Keywords", "Brand Store & Brand Story", "A/B-Tests"] },
        { title: "Advertising", items: ["Sponsored Products & Brands", "Sponsored Display", "Sponsored Brand Video", "Bid- & Budget-Management", "Keyword- & Wettbewerbsanalyse"] },
        { title: "Account Management", items: ["Inventar-Management & FBA-Forecasting", "Buy-Box-Monitoring", "Case-Management", "Compliance & Account-Health", "Performance-Reports"] },
      ],
    },
    {
      kind: "callout",
      eyebrow: "Übergreifend",
      title: "Analytics & Reporting, das Entscheidungen trägt.",
      body: "Monatliche Reports und Live-Dashboards über alle Bereiche – Zahlen, die wir in konkrete nächste Schritte übersetzen, statt euch mit Rohdaten allein zu lassen.",
    },
    {
      kind: "grid",
      eyebrow: "Warum Full Service",
      title: "Alles aus einer Hand – mehr als die Summe der Teile.",
      description: "Einzelne Dienstleister lösen immer nur die Hälfte. Wer Strategie, Content, Advertising und Betrieb verteilt, kämpft mit Lücken zwischen den Gewerken – und am Ende mit verbranntem Budget.",
      items: [
        { title: "Profitabilität vor Umsatz", body: "Wir steuern auf Marge und TACoS – nicht auf Umsatz, der die Marge auffrisst.", icon: "margin" },
        { title: "Ein abgestimmtes System", body: "Eure PPC-Daten schärfen das Listing, das Listing senkt euren ACoS – ein Kreislauf statt vier Silos.", icon: "puzzle" },
        { title: "Organic First als Fundament", body: "Erst trägt das Listing, dann skalieren die Ads – planbares Wachstum.", icon: "layers" },
        { title: "Optimiert für Rufus & COSMO", body: "Content für die KI-Suche von morgen – nicht für den Algorithmus von gestern.", icon: "spark" },
      ],
    },
    {
      kind: "bridge",
      eyebrow: "Einzelne Leistungen im Detail",
      title: "Lieber tiefer einsteigen?",
      links: services.map((s) => ({ label: s.label, href: s.href })),
    },
  ] as Block[],
};

/* ---------------- SERVICE-DETAILSEITEN ---------------- */
export const serviceDetails: Record<string, { nav: string; hero: Hero; blocks: Block[] }> = {
  strategie: {
    nav: "Strategie",
    hero: {
      eyebrow: "Strategie",
      lead: "Euer Amazon-Erfolg beginnt mit",
      accent: "einer klaren Strategie.",
      sub: "Wettbewerb, Keywords, Margen und KPIs – wir bauen das Fundament, auf dem Content und Advertising erst profitabel werden.",
      chips: ["Wettbewerbsanalyse", "Margenkalkulation", "KPI-Steuerung", "Roadmap"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Analyse", title: "Wir sehen, wo eure echten Chancen liegen.", body: "Wer rankt wofür, zu welchem Preis – und auf welchen Begriffen ihr mit überschaubarem Aufwand nach oben kommt. Statt Bauchgefühl ein klares Bild eurer Position. Genau diese Keyword-Lücken werden später zur Roadmap für Content und Advertising.", icon: "search", visual: "serp" },
          { kicker: "Share of Voice", title: "Der Abstand ist euer Potenzial.", body: "Eure Sichtbarkeit gegen die fünf stärksten Wettbewerber – plus CTR- und CVR-Vergleich je ASIN.", icon: "chart", visual: "benchmark" },
          { kicker: "Marge & Preis", title: "Wachstum ist erst dann gut, wenn es profitabel ist.", body: "Wir rechnen jede Maßnahme bis auf den Deckungsbeitrag durch – Amazon-Gebühren, FBA, Wareneinsatz, Werbekosten. Daraus entstehen Preis-Korridore, die Marge und Buy-Box gleichzeitig schützen. So skaliert ihr Umsatz, ohne dass die Profitabilität still und leise verschwindet.", icon: "margin", visual: "donut" },
          { kicker: "KPI-Steuerung", title: "Klare Zielmarken – und ein Plan dorthin.", body: "Wir definieren Zielwerte für TACoS, ACoS und Profitabilität und steuern Monat für Monat dagegen. Daraus wird eine priorisierte Roadmap, in der jeder Schritt einen erwarteten Umsatz-Impact hat.", icon: "target", visual: "kpis", bullets: ["Ziel: 14 % TACoS", "−38 % TACoS (Mandatsbeispiel)", "Monatlicher Review-Takt"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "In vier Schritten zum Zielbild.",
        items: [
          { n: "1", title: "Audit & Analyse", body: "Margen, Keywords und Wettbewerb auf den Tisch – Status quo schwarz auf weiß." },
          { n: "2", title: "Zielbild & KPIs", body: "Klare Zielmarken für Umsatz, Marge und Effizienz." },
          { n: "3", title: "Roadmap", body: "Priorisierte Maßnahmen nach Umsatz-Impact." },
          { n: "4", title: "Laufende Steuerung", body: "Monatliche Reviews, nachjustieren gegen die Ziele." },
        ],
      },
      weitere("strategie"),
    ],
  },

  "listing-seo": {
    nav: "Listing & SEO",
    hero: {
      eyebrow: "Listing & SEO",
      lead: "Listings, die aus Klicks",
      accent: "Käufer machen.",
      sub: "Eure Produktlistings sind euer digitales Schaufenster – gebaut für echte Käufer und für die KI-Suche von Rufus, COSMO und A10.",
      chips: ["Hauptbild & Galerie", "A+ / Premium A+", "SEO & Backend", "Brand Store"],
    },
    blocks: [
      {
        kind: "grid",
        eyebrow: "Was wir machen",
        title: "Jedes Element zieht den Klick eine Stufe näher zum Kauf.",
        items: [
          { title: "Hauptbild & Galerie", body: "Bilder, die in Sekunden den Klick gewinnen – mit USP, Maßstab und Lifestyle.", icon: "content" },
          { title: "A+ & Premium A+", body: "Markenwelt und Module, die Vertrauen schaffen und den Warenkorb heben.", icon: "layers" },
          { title: "Listing-Texte", body: "Titel, Bullets und Beschreibung – klar, relevant und konversionsstark.", icon: "search" },
          { title: "SEO & Backend-Keywords", body: "Relevante Begriffe im Listing und Backend – für Rufus, COSMO & A10.", icon: "target" },
          { title: "Brand Store & Brand Story", body: "Eine konsistente Markenwelt über alle ASINs – CI-konform aufgebaut.", icon: "globe" },
          { title: "A/B-Tests", body: "Bilder und Texte gegeneinander getestet – Entscheidungen mit Daten.", icon: "chart" },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Typische Schwachstellen",
        title: "Wo Listings Umsatz liegen lassen.",
        cols: 2,
        items: [
          { title: "Hauptbild ohne USP", body: "Austauschbar statt klickstark – der erste Eindruck verpufft.", icon: "content" },
          { title: "Nur Basic-A+ oder Textwüsten", body: "Kein A+, irrelevante Module oder zusammengewürfelt statt geführt.", icon: "layers" },
          { title: "Titel & Bullets schwach", body: "Titel zu kurz, Bullets wie ein Datenblatt, keine Long-Tails.", icon: "search" },
          { title: "Kein Brand Store", body: "Keine Markenwelt, nicht alle ASINs, nicht CI-konform.", icon: "globe" },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Retail-ready in vier Schritten.",
        items: [
          { n: "01", title: "Retail-Readiness-Audit", body: "Wo Bilder, A+ und SEO heute Conversion kosten." },
          { n: "02", title: "Content-Konzept", body: "Bildsprache, A+-Story und Keyword-Architektur." },
          { n: "03", title: "Produktion", body: "Bilder, A+ und Texte aus einer Hand umgesetzt." },
          { n: "04", title: "SEO & A/B-Tests", body: "Feinschliff über Tests – laufend optimiert." },
        ],
      },
      weitere("listing-seo"),
    ],
  },

  "ppc-advertising": {
    nav: "PPC Advertising",
    hero: {
      eyebrow: "Advertising",
      lead: "PPC, das",
      accent: "profitabel skaliert.",
      sub: "Advertising ist meist der größte Posten im Budget. Wir senken Streuverluste und steigern den Return on Ad Spend – statt Budget zu verbrennen.",
      chips: ["Sponsored Products", "Sponsored Brands", "Sponsored Display", "Steuerung auf TACoS"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Architektur", title: "Eine Struktur, in der jeder Euro eine Aufgabe hat.", body: "Sponsored Products, Brands und Display – sauber getrennt nach Ziel und Match-Typ. So sehen wir auf einen Blick, welche Kampagne erobert, welche verteidigt und welche skaliert. Keine Blackbox, in der gut und schlecht laufende Begriffe denselben Topf teilen.", icon: "ads", visual: "adformats" },
          { kicker: "Keyword-Harvesting", title: "Gewinner finden, Verlierer ausschließen.", body: "Auto-Kampagnen finden neue Suchbegriffe. Was konvertiert, wandert in eigene Performance-Kampagnen mit eigenem Gebot. Was nur Geld kostet, wird zum Negativ-Keyword. Dieser Kreislauf läuft wöchentlich – euer Konto wird mit jeder Woche effizienter.", icon: "target", visual: "serp" },
          { kicker: "Effizienz", title: "Weniger Streuverlust, mehr Rendite.", body: "Wir senken den ACoS, ohne Umsatz abzuwürgen: bessere Begriffe, bessere Gebote, bessere Ziel-Listings. Das Ergebnis ist ein ROAS, der planbar nach oben geht.", icon: "chart", visual: "funnel", bullets: ["−30 % ACoS", "4,8× ROAS", "+62 % Werbeumsatz"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Konsequent optimiert, Woche für Woche.",
        items: [
          { n: "1", title: "Keyword-Testing", body: "Schnell herausfinden, welche Begriffe wirklich verkaufen." },
          { n: "2", title: "Wöchentliche Optimierung", body: "Gebote und Negativ-Keywords laufend nachgezogen." },
          { n: "3", title: "Migration der Gewinner", body: "Erfolgreiche Begriffe in eigene Kampagnen überführt." },
          { n: "4", title: "Profitabel skalieren", body: "Budget dorthin, wo der ROAS stimmt." },
        ],
      },
      weitere("ppc-advertising"),
    ],
  },

  "account-management": {
    nav: "Account Management",
    hero: {
      eyebrow: "Account Management",
      lead: "Euer Konto, professionell geführt –",
      accent: "ohne Ticketsystem.",
      sub: "Ein fester Ansprechpartner, der euer Konto kennt und proaktiv steuert: Bestände, Buy-Box, Compliance und Reporting im Blick – damit ihr euch aufs Wesentliche konzentriert.",
      chips: ["Inventarmanagement", "Buy-Box-Monitoring", "Compliance", "Reporting"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Inventar", title: "Nie ausverkauft, nie unnötig gebunden.", body: "Wir prognostizieren Nachfrage und setzen Reorder-Punkte, bevor der Bestand kritisch wird. Out-of-stock kostet Ranking – Überbestand bindet Kapital. Wir halten die Mitte. Ihr seht jederzeit, wann nachbestellt werden muss – ohne böse Überraschung.", icon: "layers", visual: "dashboard" },
          { kicker: "Buy-Box & Health", title: "Buy-Box halten, Konto gesund halten.", body: "Preis, Verfügbarkeit und Versand steuern wir so, dass ihr die Buy-Box haltet – und überwachen Account-Health und Policy-Themen, bevor daraus eine Sperre wird. Fällt etwas auf, lösen wir es – nicht ihr.", icon: "shield", visual: "kpis" },
          { kicker: "Reporting", title: "Zahlen, die in Entscheidungen übersetzt sind.", body: "Monatliche Reports und Live-Dashboards – und ein fester Ansprechpartner, der sie mit euch durchgeht. Keine Rohdaten zum Selbstdeuten, sondern klare nächste Schritte.", icon: "chart", visual: "donut", bullets: ["1 fester Ansprechpartner", "Monatlich Report & Review", "Volle Konto-Transparenz"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Euer Konto läuft – im Hintergrund.",
        items: [
          { n: "1", title: "Onboarding & Setup", body: "Zugänge, Prozesse und Verantwortlichkeiten sauber aufgesetzt." },
          { n: "2", title: "Forecasting & Monitoring", body: "Bestände, Buy-Box und Pricing laufend im Blick." },
          { n: "3", title: "Compliance & Cases", body: "Account-Health proaktiv, Fälle schnell gelöst." },
          { n: "4", title: "Reporting & Reviews", body: "Monatliche Reports, wöchentliche Calls, Quartals-Review." },
        ],
      },
      weitere("account-management"),
    ],
  },

  internationalisierung: {
    nav: "Internationalisierung",
    hero: {
      eyebrow: "Internationalisierung",
      lead: "Euer Erfolg in Deutschland –",
      accent: "nativ auf neue Märkte.",
      sub: "Wir übersetzen nicht, wir lokalisieren: Content, PPC und Account-Management nativ pro Marktplatz – lokal recherchiert, lokal formuliert, lokal optimiert. Und alles konsolidiert in einem Gesamtbild, damit ihr über alle Länder hinweg vergleichbare Zahlen habt.",
      chips: ["Bis zu 5 Marktplätze", "Lokalisierte Listings", "Markt-Pricing", "PPC pro Land"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Roll-out", title: "Ein Setup, Markt für Markt ausgerollt.", body: "Wir nehmen euer erprobtes Setup aus Deutschland und übertragen es strukturiert auf weitere Marktplätze – mit Markt-Analyse und lokaler Logistik. Ihr seht jederzeit, welcher Markt live ist und wie weit der nächste Launch ist.", icon: "globe", visual: "markets" },
          { kicker: "Lokalisieren statt übersetzen", title: "Wort-für-Wort übersetzt verkauft nicht.", body: "Eine reine Übersetzung trifft weder die Suchbegriffe noch den Ton im Zielmarkt. Wir recherchieren lokal, formulieren nativ und bauen Content, der dort rankt und konvertiert – nicht nur verstanden wird.", icon: "content", visual: "serp", bullets: ["+110 % Klicks (IT)", "+21 % Conversion", "4 Marktplätze"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Ein Playbook, mehrfach ausgerollt.",
        description: "Wir schärfen euer Best-Practice-Setup im Heimatmarkt und übertragen es strukturiert auf weitere Länder – nativ lokalisiert, zentral gesteuert.",
        items: [
          { n: "01", title: "Playbook (DE)", body: "Best-Practice-Setup im Heimatmarkt schärfen." },
          { n: "02", title: "Lokalisierung", body: "Listings, Keywords und Content nativ pro Markt." },
          { n: "03", title: "Roll-out", body: "Strukturierter Launch in IT, FR und ES." },
          { n: "04", title: "Cross-Market-Steuerung", body: "Einheitliches Reporting über alle Märkte." },
        ],
      },
      weitere("internationalisierung"),
    ],
  },
};

/* ---------------- CASE STUDIES ---------------- */
export const caseStudies = [
  {
    brand: "FUTUM",
    sector: "Schädlingsbekämpfung · DE",
    metric: "80 %",
    metricLabel: "organische Verkäufe im Peak",
    ausgangslage: "Starke Abhängigkeit von Paid-Traffic, dünner organischer Anteil und ein ACoS, der die Marge auffraß.",
    quote: "Wir verkaufen heute überwiegend organisch – Werbung ist Kür, nicht Pflicht.",
    color: "#FF9900",
  },
  {
    brand: "HaA",
    sector: "Küche & Haushalt · DE",
    metric: "+439 %",
    metricLabel: "Conversion-Steigerung in 17 Wochen",
    ausgangslage: "Hohe Werbeausgaben bei stagnierendem Umsatz, schwache Listings und kein klares KPI-Bild. Das Konto wuchs nicht – es wurde nur teurer.",
    quote: "Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig.",
    color: "#FF3131",
  },
  {
    brand: "Gartenmarke",
    sector: "Garten · DE/IT/FR/ES",
    metric: "−35 %",
    metricLabel: "TACoS – über vier Marktplätze",
    ausgangslage: "Internationale Expansion ohne lokalisierte Listings, inkonsistente Performance je Marktplatz und kein einheitliches Reporting.",
    quote: "Ein System, vier Länder – endlich vergleichbare Zahlen und planbares Wachstum.",
    color: "#0E7CA0",
  },
];
