// Zentrale Inhalte der Startseite — abgestimmter Stand aus
// docs/copywriting (temoacopywriting.md). Reihenfolge und Platzierung der
// Sektionen sind gesetzt; Formulierungen sind Arbeitsstand.

export const cta = {
  label: "Potenzial-Gespräch buchen",
  short: "Gespräch buchen",
  href: "#kontakt",
};

export const hero = {
  eyebrow: "Full-Service Amazon-Agentur",
  headline: "Amazon-Wachstum, das Marge übrig lässt.",
  subline:
    "Die meisten Accounts wachsen sich arm: mehr Werbung, mehr Umsatz, weniger Gewinn. Wir drehen die Reihenfolge um — erst verkauft euer Listing, dann skalieren die Ads.",
  secondary: { label: "Ergebnisse ansehen", href: "#cases" },
  trust: [
    { value: "60+", text: "Marken arbeiten mit TEMOA" },
    { value: "98 %", text: "bleiben — freiwillig, nicht vertraglich" },
  ],
  trustPhotos: ["/assets/team/Clemens.jpg", "/assets/team/Christoph.jpg", "/assets/team/Eddie.jpg"],
  // Account-Cockpit-Mockup (glaubwürdige Beispielwerte, keine Versprechen)
  cockpit: [
    { value: "+147 %", label: "Umsatz im Quartal" },
    { value: "−44 %", label: "TACoS" },
    { value: "99,2 %", label: "Buy-Box-Anteil" },
    { value: "80 %", label: "organischer Umsatzanteil" },
  ],
  // Listing-Mockup (Vitaworld); Titel/Preis/Bewertungen sind Mock-Werte
  listing: {
    image: "/assets/img/vitaworld.jpg",
    title: "Vitaworld Vitamin D3 + K2 Tropfen, hochdosiert, 50 ml",
    price: "19,90 €",
    reviews: "2.314",
  },
};

export const socialProof = {
  line: "Marken, die uns ihren Account anvertrauen",
  stats: [
    { value: "60+", label: "betreute Marken" },
    { value: "21 Mio. €", label: "betreuter Umsatz" },
    { value: "98 %", label: "Kundenbindung" },
    { value: "5", label: "Marktplätze" },
  ],
};

export const problem = {
  headline: "Kommt euch das bekannt vor?",
  pains: [
    {
      title: "Das Tagesgeschäft frisst die Woche.",
      text: "Listings, Kampagnen, Bestände, Cases — für Strategie bleibt nichts übrig.",
    },
    {
      title: "Wachstum nur noch über Werbung.",
      text: "Mehr Umsatz gibt es nur gegen mehr Budget. Der TACoS steigt, die Marge sinkt.",
    },
    {
      title: "Verteilte Dienstleister.",
      text: "Jeder optimiert seinen Ausschnitt, niemand das Konto als Ganzes. Ergebnisse bleiben unter den Möglichkeiten.",
    },
  ],
};

export const mechanism = {
  eyebrow: "Warum TEMOA anders arbeitet",
  headline: "Eine Leistung trägt die nächste.",
  core:
    "Erst verkauft das Listing (Content + SEO), dann skalieren die Ads profitabel. 8 von 10 Verkäufen sollen ohne Klickkosten laufen — das Listing trägt, die Ads verstärken.",
  steps: [
    { name: "Fundament", title: "Ein Listing, das verkauft" },
    { name: "Ranking", title: "Organische Sichtbarkeit, die trägt" },
    { name: "Ads", title: "Werbung, die verstärkt statt ersetzt" },
  ],
  model:
    "Strategie & Pricing ist das Fundament. Darauf bauen Content, SEO, PPC und Internationalisierung auf — Account Management ist keine Stufe, sondern die Klammer um alles.",
};

export const cases = {
  headline: "Versprechen kann jeder. Hier sind Zahlen.",
  note: "Kundenbeispiele — Einzelergebnisse, kein Versprechen.",
  items: [
    {
      brand: "Vitaworld",
      category: "Nahrungsergänzung",
      metric: "+147 %",
      metricLabel: "Umsatz in einem Quartal",
      sub: "TACoS −44 %",
    },
    {
      brand: "FUTUM",
      category: "Schädlingsbekämpfung",
      metric: "8 von 10",
      metricLabel: "Verkäufen laufen heute ohne Klickkosten",
      sub: "Organic First in Reinform",
    },
  ],
  portfolio: { value: "60+", text: "Marken im Portfolio", link: "Alle Cases ansehen" },
};

export const services = {
  headline: "Strategie, Content, Ads und Betrieb greifen ineinander.",
  intro:
    "Bei verteilten Dienstleistern optimiert jeder seinen Ausschnitt — und das Konto bleibt unter den Möglichkeiten. Bei uns arbeitet ein Team an einem Plan, mit denselben Zielen.",
  items: [
    { title: "Full Service", text: "Der komplette Account in einer Hand — alle Bausteine kombiniert.", href: "/leistungen/full-service" },
    { title: "Strategie & Pricing", text: "Das Fundament: Wettbewerb, Marge und Preis — durchgerechnet, bevor investiert wird.", href: "/leistungen/strategie-pricing" },
    { title: "Content", text: "Hauptbilder, A+ und Brand Store — Listings, die aus Klicks Käufer machen.", href: "/leistungen/content-listing-seo" },
    { title: "SEO", text: "Sichtbarkeit, die nicht pro Klick kostet — gebaut für A10, Rufus und COSMO.", href: "/leistungen/content-listing-seo" },
    { title: "PPC Advertising", text: "Verstärkt, was organisch schon trägt — Gebote auf Deckungsbeitrag gerechnet.", href: "/leistungen/ppc-advertising" },
    { title: "Internationalisierung", text: "Das erprobte Setup, nativ ausgerollt auf neue Marktplätze.", href: "/leistungen/internationalisierung" },
    { title: "Account Management", text: "Die Klammer um alles: Bestand, Buy-Box, Compliance und Reporting.", href: "/leistungen/account-management" },
  ],
};

export const steps = {
  headline: "So starten wir.",
  items: [
    {
      title: "Potenzial-Gespräch",
      duration: "30 Min",
      text: "Wir schauen gemeinsam auf Konto, Marge und Hebel — und sagen ehrlich, ob wir helfen können.",
    },
    {
      title: "Analyse & Plan",
      duration: "Woche 1–3",
      text: "Zugänge, Audit, Zielbild. Ihr bekommt einen durchgerechneten Plan, keine Folienshow.",
    },
    {
      title: "Übernahme & Betrieb",
      duration: "laufend",
      text: "Wir führen das Konto, ihr seht wöchentlich Zahlen und Entscheidungen. Euer Aufwand: wenige Stunden pro Monat.",
    },
  ],
};

export const trustSection = {
  retention: {
    value: "98 %",
    headline: "Zusammenarbeit, die freiwillig hält.",
    text: "Wir binden quartalsweise statt mit langen Laufzeiten. Geblieben wird wegen der Ergebnisse — nicht wegen der Paragrafen.",
  },
  faq: [
    {
      q: "Wie viel Aufwand ist die Übergabe für uns?",
      a: "Wenige Stunden, verteilt über die ersten Wochen: Zugänge, ein Kickoff, offene Fragen zu Sortiment und Lieferkette. Wir arbeiten mit einer festen Onboarding-Checkliste.",
    },
    {
      q: "Wem gehören Konto, Kampagnen und Daten?",
      a: "Euch. Immer. Wir arbeiten als Benutzer in eurem Seller Central — wenn ihr geht, nehmt ihr alles mit, inklusive Dokumentation.",
    },
    {
      q: "Wann lohnt sich TEMOA nicht?",
      a: "Unter etwa 50.000 € Monatsumsatz steht unser Honorar in keinem guten Verhältnis zum Hebel — das sagen wir im ersten Gespräch ehrlich.",
    },
    {
      q: "Wie schnell sieht man Ergebnisse?",
      a: "Content- und Kampagnen-Hebel greifen in den ersten Wochen, organische Rankings brauchen Monate. Im Plan steht transparent, welche Maßnahme wann wirkt — Termine, die niemand halten kann, versprechen wir nicht.",
    },
  ],
};

// CTA-Banner (globales Element vor dem Footer)
export const banner = {
  headline: "Lasst uns ausrechnen, was in eurem Konto steckt.",
  text: "30 Minuten mit Clemens. Wir schauen auf euer Konto, eure Marge und eure größten Hebel — und sagen ehrlich, ob wir helfen können.",
  bullets: [
    "Kostenlos und unverbindlich",
    "Konkrete Hebel statt Verkaufsshow",
    "Quartalsweise kündbar, keine Knebelverträge",
  ],
  photo: "/assets/team/Clemens.jpg",
  person: "Clemens",
  role: "Geschäftsführung",
};

export const footer = {
  description:
    "Full-Service Amazon-Agentur. Wir führen euren Account: Strategie, Content, Advertising und Betrieb — profitabel und nachvollziehbar.",
};

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

export const navServices = [
  { title: "Full Service", href: "/leistungen/full-service" },
  { title: "Strategie & Pricing", href: "/leistungen/strategie-pricing" },
  { title: "Content & SEO", href: "/leistungen/content-listing-seo" },
  { title: "PPC Advertising", href: "/leistungen/ppc-advertising" },
  { title: "Internationalisierung", href: "/leistungen/internationalisierung" },
  { title: "Account Management", href: "/leistungen/account-management" },
];

// Bild-getragene Zusatz-Sektionen (Stil 11).
export const contentShowcase = {
  eyebrow: "Content & Listing-SEO",
  headline: "Euer bester Verkäufer schläft nie.",
  text: "Das Listing arbeitet rund um die Uhr — wenn es gut ist. Gleiches Produkt, anderer Umsatz.",
  beforeLabel: "Vorher",
  afterLabel: "Nachher",
  before: { image: "/assets/img/bachgold.jpg", title: "Bachgold Bachblüten Tropfen Nr. 39, 20 ml", price: "14,90 €", reviews: "312" },
  after: { image: "/assets/img/bachgold.jpg", title: "Bachgold Original Bachblüten Tropfen Nr. 39 · alkoholfrei · vegan · 20 ml", price: "14,90 €", reviews: "1.872" },
};

export const reporting = {
  eyebrow: "Account Management",
  headline: "Zahlen, die ihr in fünf Minuten versteht.",
  text: "Das Tagesgeschäft, das heute eure Woche frisst, ist bei uns der Job — und jede Woche seht ihr, was es gebracht hat.",
  points: ["Bestandsplanung & Reorder-Punkte", "Buy-Box- und Hijacker-Monitoring", "Wöchentliches Reporting in Klartext"],
};

export const team = {
  eyebrow: "Das Team",
  headline: "Menschen statt Ticketsystem.",
  text: "Eure Marke wird von Menschen geführt, die man kennt — nicht von einer Warteschlange. Drei Regeln, die wir uns selbst auferlegt haben:",
  principles: ["Eine Handvoll Marken pro Consultant", "Antwort am selben Tag", "Review im Kalender, nicht im Postfach"],
  photos: [
    "/assets/team/Clemens.jpg", "/assets/team/Christoph.jpg", "/assets/team/Eddie.jpg",
    "/assets/team/Marina.jpg", "/assets/team/Dias.jpg", "/assets/team/Jonas.jpg",
    "/assets/team/Anzelika.jpg", "/assets/team/Marvin.jpg", "/assets/team/Ole.jpg",
    "/assets/team/Vadim.jpg",
  ],
};
