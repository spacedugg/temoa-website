// Zentrale Inhalte der Startseite (aus docs/messaging-startseite.md).
// Komponenten rendern ausschließlich aus diesen Daten.

export const cta = {
  label: "Potenzial-Gespräch buchen",
  short: "Gespräch buchen",
  micro: "30 Minuten mit der Geschäftsführung. Kein Pitch, keine Folien.",
  href: "#kontakt",
};

export const hero = {
  eyebrow: "Full-Service Amazon-Agentur",
  headline: "Profitables Wachstum auf Amazon. Nicht teuer erkaufter Umsatz.",
  subline:
    "Wir übernehmen euer Amazon-Konto komplett — Strategie, Content, SEO, Advertising, Account Management. Organic First: Erst verkauft das Listing, dann skalieren die Ads.",
};

export const stats = [
  { value: "60+", label: "betreute Marken" },
  { value: "21 Mio. €", label: "betreuter Jahresumsatz" },
  { value: "98 %", label: "Kundenbindung — ohne lange Vertragslaufzeiten" },
  { value: "5", label: "Amazon-Marktplätze" },
];

export const logoBrands = ["Vitaworld", "Bachgold"];

// Freigegebene Kundenlogos (aus dem Sales-Room-Repo, public/clients).
export const clientLogos = [
  { name: "Kijimea", src: "/assets/clients/1.png" },
  { name: "Nicotinell", src: "/assets/clients/2.png" },
  { name: "Heldengrün", src: "/assets/clients/3.png" },
  { name: "Bachgold", src: "/assets/clients/4.png" },
  { name: "Juskys", src: "/assets/clients/5.png" },
  { name: "Hecht", src: "/assets/clients/6.png" },
  { name: "Naturtreu", src: "/assets/clients/7.png" },
  { name: "Big Dean's", src: "/assets/clients/8.png" },
  { name: "uandu", src: "/assets/clients/9.png" },
  { name: "Vitaworld", src: "/assets/clients/10.png" },
  { name: "mypuzzle.com", src: "/assets/clients/11.png" },
  { name: "Shape Republic", src: "/assets/clients/12.png" },
  { name: "zooprinz", src: "/assets/clients/13.png" },
  { name: "FAIRMO", src: "/assets/clients/14.png" },
];

export const partnerBadge = {
  src: "/assets/logos/amazon_spn.png",
  alt: "Amazon SPN Verified Partner",
};

export const problem = {
  headline: "Das Konto läuft. Aber es trägt sich nicht von allein.",
  intro:
    "Ab einer gewissen Größe kippt das Verhältnis: Amazon macht den Umsatz — und frisst dafür eure Woche. Drei Muster sehen wir bei fast jeder Marke, die zu uns kommt:",
  pains: [
    {
      title: "Das Tagesgeschäft frisst die Strategie.",
      text: "Listings pflegen, Kampagnen nachjustieren, Bestände planen, Cases mit dem Seller Support führen. Alles dringend, nichts davon bringt euch weiter. Für die Fragen, die das Geschäft wirklich bewegen — Sortiment, Pricing, neue Märkte — bleibt keine Zeit.",
    },
    {
      title: "Wachstum gibt es nur noch gegen Werbebudget.",
      text: "Mehr Umsatz heißt mehr Ad-Spend. Der Anteil des Umsatzes, der über Werbung läuft, steigt Quartal für Quartal — und mit ihm die Abhängigkeit von Amazons Klickpreisen.",
    },
    {
      title: "Der Umsatz wächst, die Marge nicht.",
      text: "Steigende CPCs, Gebühren, Retouren, Rabattaktionen: Unterm Strich bleibt pro verkaufter Einheit immer weniger. Wachstum, das sich nicht rechnet, ist kein Wachstum — es ist Beschäftigung.",
    },
  ],
  transition: "Das Problem ist selten das Budget. Es ist die Reihenfolge.",
};

export const mechanism = {
  eyebrow: "Warum TEMOA anders arbeitet",
  headline: "Organic First. Erst verkauft das Listing, dann skalieren die Ads.",
  intro:
    "Die meisten Agenturen drehen an der einfachsten Schraube: mehr Budget. Das Problem: Ads bringen Besucher — verkaufen muss das Listing. Wenn Bilder, Texte und Keywords nicht sitzen, bezahlt ihr für Klicks, die nicht konvertieren. Mehr Budget macht diesen Fehler nur teurer.",
  steps: [
    {
      name: "Fundament",
      title: "Strategie und Pricing",
      text: "Welche Produkte tragen das Wachstum, welche Marge ist verteidigbar, wo steht ihr im Wettbewerb.",
    },
    {
      name: "Conversion",
      title: "Content und Listing-SEO",
      text: "Bilder, A+ Content und Keywords, die aus Besuchern Käufer machen — und organische Rankings aufbauen, die ihr nicht pro Klick bezahlt.",
    },
    {
      name: "Skalierung",
      title: "Erst jetzt PPC",
      text: "Auf Listings, die konvertieren, arbeitet jeder Werbe-Euro doppelt: Er verkauft direkt — und stärkt das organische Ranking.",
    },
  ],
  target:
    "Unser Zielbild: 80 % des Umsatzes organisch. Werbung skaliert das Geschäft — sie trägt es nicht.",
};

export const cases = {
  headline: "Was Organic First in Zahlen heißt",
  subline:
    "Zwei Beispiele aus laufenden Mandaten. Einzelergebnisse — kein Versprechen, aber ein ehrliches Bild unserer Arbeitsweise.",
  items: [
    {
      brand: "Vitaworld",
      category: "Nahrungsergänzung",
      metric: "Umsatz +147 %, TACoS −44 %",
      metricFrom: "",
      metricTo: "+147 %",
      metricLabel: "Umsatz",
      text: "Ausgangslage: solider Account, aber Wachstum nur über proportional steigendes Werbebudget. Wir haben Hauptbilder, Titel und Kampagnen-Targets neu aufgesetzt: Der Adspend stieg um 39 %, der Umsatz um 147 % — der PPC-Anteil am Umsatz sank von 36 % auf 29 %, der TACoS von 10,4 % auf 5,8 %.",
      note: "Kundenbeispiel, Q1 2025 vs. Q1 2026",
      image: "/assets/img/vitaworld.jpg",
    },
    {
      brand: "Bachgold",
      category: "Bachblüten",
      metric: "TACoS um 35 % gesenkt",
      metricFrom: "",
      metricTo: "−35 %",
      metricLabel: "TACoS",
      text: "Ausgangslage: Wachstum war da, hing aber komplett am Werbebudget. Über organische Rankings und ein bereinigtes Sortiment ist der Anteil des beworbenen Umsatzes deutlich gefallen — der Umsatz nicht.",
      note: "Kundenbeispiel, Zeitraum 12 Monate",
      image: "/assets/img/bachgold.jpg",
    },
  ],
};

export type BrandShape = "square" | "circle" | "u" | "hexagon";

export type ServiceItem = {
  name?: string;
  subBrand?: string;
  shape?: BrandShape;
  title: string;
  text: string;
  href: string;
};

export const services = {
  headline: "Ein Konto, eine Verantwortung: alles, was euer Amazon-Geschäft braucht",
  intro:
    "Wir übernehmen euer Amazon-Konto als Ganzes — nicht als Liste von Einzelaufgaben, sondern als System, in dem jeder Teil auf den anderen aufbaut:",
  // shape/subBrand: Geometrie aus dem TEMOA-Logo-Icon (Subbrand-System
  // aus dem Sales-Room: Strategy Suite, Content Studio, Advertising
  // Engine, Management Hub).
  foundation: {
    name: "Das Fundament",
    subBrand: "Strategy Suite",
    shape: "square" as const,
    title: "Strategie & Pricing",
    text: "Sortiment, Positionierung, Margenlogik. Bevor irgendwo optimiert wird, ist klar, welche Produkte das Wachstum tragen und welcher Preis im Wettbewerb verteidigbar ist.",
    href: "/leistungen/strategie-pricing",
  },
  levers: [
    {
      subBrand: "Content Studio",
      shape: "circle" as const,
      title: "Content & Listing-SEO",
      text: "Produktbilder, A+ Content, Brand Store, Keyword-Architektur. Das Listing ist euer Verkäufer — es arbeitet 24/7, bezahlt wird es nicht pro Klick.",
      href: "/leistungen/content-listing-seo",
    },
    {
      subBrand: "Advertising Engine",
      shape: "u" as const,
      title: "PPC Advertising",
      text: "Sponsored Products, Brands und Display — auf Listings, die konvertieren. Gesteuert auf Profitabilität (TACoS), nicht auf Bruttoumsatz.",
      href: "/leistungen/ppc-advertising",
    },
    {
      title: "Internationalisierung",
      text: "Expansion auf bis zu 5 Marktplätze: Übersetzung mit lokaler Keyword-Recherche, Pan-EU-Logistik, Compliance je Markt.",
      href: "/leistungen/internationalisierung",
    },
  ] satisfies ServiceItem[] as ServiceItem[],
  bracket: {
    name: "Die Klammer",
    subBrand: "Management Hub",
    shape: "hexagon" as const,
    title: "Account Management",
    text: "Bestandsplanung, Buy-Box-Monitoring, Compliance, Seller-Support-Cases und ein monatliches Reporting, das ihr in fünf Minuten versteht. Das Tagesgeschäft, das heute eure Woche frisst — bei uns ist es der Job.",
    href: "/leistungen/account-management",
  },
};

export const steps = {
  headline: "Von „mal sprechen“ bis „läuft“ — in drei Schritten",
  items: [
    {
      title: "Potenzial-Gespräch",
      duration: "30 Minuten",
      text: "Ihr sprecht mit Clemens, Geschäftsführung — nicht mit einem Vertriebler. Wir wollen verstehen, wo ihr steht und ob wir zueinander passen. Wenn nicht, sagen wir das.",
    },
    {
      title: "Account-Analyse",
      duration: "ca. 1 Woche",
      text: "Ihr gebt uns Lesezugriff auf euer Seller Central. Wir analysieren Listings, Kampagnen, Rankings und Margenstruktur und zeigen euch konkret, wo Potenzial liegt — und wo nicht. Euer Aufwand: den Zugang freischalten.",
    },
    {
      title: "Übernahme",
      duration: "2–4 Wochen bis zur vollen Verantwortung",
      text: "Strukturiertes Onboarding entlang einer festen Checkliste. Ihr braucht dafür insgesamt wenige Stunden — danach führen wir das Konto, und ihr bekommt eure Woche zurück.",
    },
  ],
};

export const faq = {
  headline: "Die Fragen, die ihr zu Recht stellt",
  items: [
    {
      q: "Wie viel Aufwand ist die Übergabe für uns?",
      a: "Wenige Stunden, verteilt über die ersten Wochen: Zugänge, ein Kickoff-Termin, offene Fragen zu Sortiment und Lieferkette. Wir arbeiten mit einer festen Onboarding-Checkliste — ihr müsst nichts vorbereiten, was wir nicht konkret anfragen.",
    },
    {
      q: "Wem gehören Konto, Kampagnen und Daten?",
      a: "Euch. Immer. Wir arbeiten als Benutzer in eurem Seller Central — keine Konten, Kampagnen oder Markenregistrierungen, die bei uns liegen. Wenn ihr geht, nehmt ihr alles mit, inklusive vollständiger Dokumentation.",
    },
    {
      q: "Was, wenn es nicht funktioniert?",
      a: "Unsere Verträge sind quartalsweise kündbar. Keine Jahresbindung, keine Ausstiegsgebühren. 98 % unserer Kunden bleiben — aber sie bleiben, weil es funktioniert, nicht weil ein Vertrag sie hält.",
    },
    {
      q: "Für wen lohnt sich TEMOA nicht?",
      a: "Unter etwa 50.000 € Monatsumsatz auf Amazon steht unser Honorar in keinem guten Verhältnis zum Hebel — dann sagen wir das im ersten Gespräch. Dasselbe gilt, wenn ihr nur eine Einzelleistung sucht, etwa reines Kampagnenmanagement: Unser Modell funktioniert, weil wir das ganze Konto verantworten.",
    },
    {
      q: "Was kostet das? (zur Einordnung)",
      a: "Das Honorar hängt vom Umfang des Kontos ab — dazu machen wir im Gespräch eine klare Aussage, vorher wäre jede Zahl unseriös. Zur Einordnung: Ein internes Team, das Strategie, Content, SEO, PPC und Account Management abdeckt, kostet mehrere Vollzeitstellen — plus Tools, Einarbeitung und das Risiko, dass Wissen mit Personen geht.",
    },
  ],
};

export const closing = {
  headline: "Lasst uns über euer Konto sprechen.",
  text: "30 Minuten mit Clemens, Geschäftsführung von TEMOA. Ihr bekommt eine ehrliche Einschätzung, wo euer Konto steht und was drin ist — auch dann, wenn die Antwort lautet: Ihr braucht uns (noch) nicht.",
  micro: "Unverbindlich. Kein Pitch. Termin direkt im Kalender wählen.",
  photo: "/assets/team/Clemens.jpg",
  person: "Clemens",
  role: "Geschäftsführung",
};

export const midCta = {
  question: "Wie viel Potenzial steckt in eurem Konto?",
  label: cta.label,
};

export const navServices = [
  { title: "Full Service", href: "/leistungen/full-service" },
  { title: "Strategie & Pricing", href: "/leistungen/strategie-pricing" },
  { title: "Content & Listing-SEO", href: "/leistungen/content-listing-seo" },
  { title: "PPC Advertising", href: "/leistungen/ppc-advertising" },
  { title: "Internationalisierung", href: "/leistungen/internationalisierung" },
  { title: "Account Management", href: "/leistungen/account-management" },
];
