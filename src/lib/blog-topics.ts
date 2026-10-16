import type { Sprache } from "./i18n";

type Text = Record<Sprache, string>;
type Einstieg = { slug: string; question: Text; answer: Text };
export type BlogTopic = {
  slug: string;
  label: Text;
  title: Text;
  intro: Text;
  service: string;
  serviceLabel: Text;
  starts: Einstieg[];
};

// Client-safe navigation data. Article bodies and filesystem access stay on the server.
export const blogTopics: BlogTopic[] = [
  {
    slug: "ppc-advertising",
    label: { de: "Amazon-Werbung & ACoS", en: "Amazon ads & ACoS" },
    title: { de: "Amazon PPC: Kennzahlen, Kosten und Kampagnen", en: "Amazon PPC: metrics, costs and campaigns" },
    intro: { de: "Amazon PPC profitabel steuern: Trennt Markenverteidigung und Neukundengewinnung, setzt Budgets nach Deckungsbeitrag und findet die Ursache steigender Werbekosten. Die Analysen verbinden Kampagnenstruktur, Listing-Conversion und die Wirtschaftlichkeit eures Sortiments.", en: "Amazon PPC means paying for each ad click. Whether it pays off depends on your margins, listing conversion and the contribution to total sales. These guides explain the metrics and the decisions behind campaign management." },
    service: "/leistungen/ppc-advertising", serviceLabel: { de: "Amazon PPC betreuen lassen", en: "Amazon PPC management" },
    starts: [
      { slug: "ppc-kosten-senken", question: { de: "Wo verliert eure Werbung Deckungsbeitrag?", en: "Where do your ads lose contribution?" }, answer: { de: "Trennt Gebote, Suchanfragen und Conversion, bevor ihr Budgets kürzt.", en: "Separate bidding, search terms and conversion before cutting budgets." } },
      { slug: "kampagnenstruktur-ppc", question: { de: "Welche Kampagnen verdienen mehr Budget?", en: "Which campaigns deserve more budget?" }, answer: { de: "Eine klare Struktur macht Markenverteidigung, Neukundengewinnung und Tests getrennt steuerbar.", en: "A clear structure separates brand defence, acquisition and experiments." } },
      { slug: "business-reports", question: { de: "Warum sinkt Umsatz trotz stabiler Werbekennzahlen?", en: "Why do sales fall despite stable ad metrics?" }, answer: { de: "Zerlegt die Veränderung in Traffic, Kaufleistung und Erlös pro Einheit.", en: "Break the change into traffic, purchasing performance and revenue per unit." } },
    ],
  },
  {
    slug: "listing-seo",
    label: { de: "Amazon SEO & Produktbilder", en: "Amazon SEO & product images" },
    title: { de: "Amazon SEO, Produktbilder und Conversion", en: "Amazon SEO, product images and conversion" },
    intro: { de: "Ein gutes Listing macht ein Produkt auffindbar und beantwortet die Fragen vor dem Kauf. Die Ratgeber helfen euch, Titel, Produktbilder, A+ Content und Brand Store aufeinander abzustimmen und mögliche Ursachen schwacher Conversion zu erkennen.", en: "A useful listing helps shoppers find a product and answers their questions before buying. These guides connect titles, product images, A+ content and brand stores with the reasons shoppers do or do not convert." },
    service: "/leistungen/listing-seo", serviceLabel: { de: "Produktbilder und Amazon SEO", en: "Product images and Amazon SEO" },
    starts: [
      { slug: "search-query-performance", question: { de: "Bei welchen Suchanfragen verliert ihr Käufe?", en: "Which search queries lose purchases?" }, answer: { de: "Vergleicht Klick- und Kaufanteile, um Content-Tests gezielt zu priorisieren.", en: "Compare click and purchase shares to prioritise content experiments." } },
      { slug: "produkttitel-optimieren", question: { de: "Wie verbessert ihr einen Produkttitel?", en: "How can you improve a product title?" }, answer: { de: "Produkttyp, wichtige Eigenschaften und verständliche Suchbegriffe geben Orientierung. Der Leitfaden zeigt die Reihenfolge.", en: "Product type, relevant attributes and clear search terms help shoppers understand the offer. Start with the title guide." } },
      { slug: "a-plus-content", question: { de: "Wofür lohnt sich A+ Content?", en: "What is A+ content useful for?" }, answer: { de: "A+ Content bietet Platz für Anwendung, Unterschiede und Kaufargumente, die Bilder und Stichpunkte ergänzen.", en: "A+ content gives you room to explain uses, differences and reasons to buy alongside images and bullet points." } },
      { slug: "conversion-rate-optimierung", question: { de: "Warum werden aus Klicks keine Käufe?", en: "Why are clicks not turning into orders?" }, answer: { de: "Prüft Angebot, Bildsprache und offene Kundenfragen gemeinsam. Der Beitrag führt durch die wichtigsten Ansatzpunkte.", en: "Review the offer, imagery and unanswered customer questions together. The guide walks through the main checks." } },
    ],
  },
  {
    slug: "fba-logistik",
    label: { de: "FBA, Gebühren & Lagerbestand", en: "FBA, fees & inventory" },
    title: { de: "Amazon FBA: Gebühren, Versand und Bestand", en: "Amazon FBA: fees, fulfilment and inventory" },
    intro: { de: "FBA-Kosten und Bestandsplanung entscheiden mit darüber, wie viel Wachstum ihr finanzieren könnt. Kalkuliert Gebühren pro ASIN, plant Nachbestellungen entlang der Liquidität und prüft den passenden Versandmix für euer Sortiment.", en: "With Fulfillment by Amazon (FBA), Amazon stores and ships your products. Selling fees, storage costs and cash tied up in stock still matter to your calculation. Start here to compare fulfilment options and plan inventory." },
    service: "/leistungen/fba-inventory-management", serviceLabel: { de: "FBA und Bestandsplanung bei temoa", en: "FBA and inventory planning at temoa" },
    starts: [
      { slug: "fbm-vs-fba", question: { de: "FBA oder FBM: Wer sollte versenden?", en: "FBA or FBM: who should fulfil orders?" }, answer: { de: "Vergleicht Kosten, Lieferfähigkeit und operative Kontrolle für eure Produkte. Beide Modelle haben unterschiedliche Voraussetzungen.", en: "Compare cost, delivery capability and operational control for your products. Each model has different requirements." } },
      { slug: "seller-gebuehren-ueberblick", question: { de: "Welche Amazon-Gebühren müsst ihr einplanen?", en: "Which Amazon fees should you budget for?" }, answer: { de: "Der Überblick ordnet Verkaufs-, Versand- und Lagergebühren ein. Konkrete Sätze prüft ihr für euren Marktplatz und eure Produkte.", en: "The overview explains selling, fulfilment and storage fees. Check current rates for your marketplace and products." } },
      { slug: "inventar-cashflow", question: { de: "Wie viel Bestand ist sinnvoll?", en: "How much stock should you hold?" }, answer: { de: "Lieferzeit, Nachfrage und verfügbare Liquidität bestimmen die Bestandsplanung. Der Ratgeber erklärt die Zusammenhänge.", en: "Lead times, demand and available cash shape inventory planning. The guide explains how they connect." } },
    ],
  },
  {
    slug: "marke-account",
    label: { de: "Markenschutz & Verkäuferkonto", en: "Brand protection & seller accounts" },
    title: { de: "Amazon Markenschutz und Account Health", en: "Amazon brand protection and account health" },
    intro: { de: "Markenrechte, Listingprobleme und Kontosperrungen brauchen unterschiedliche Lösungen. Wählt den Ratgeber passend zum konkreten Hinweis in Seller Central. Er führt euch zu den Informationen und Unterlagen, die ihr für die weitere Klärung braucht.", en: "Brand rights, listing issues and account suspensions require different responses. Choose the guide that matches the notice in Seller Central, then identify the information and documents needed to resolve it." },
    service: "/leistungen/compliance-account-health", serviceLabel: { de: "Unterstützung bei Compliance und Account Health", en: "Compliance and account health support" },
    starts: [
      { slug: "account-gesperrt", question: { de: "Was tun bei einem gesperrten Verkäuferkonto?", en: "What should you do if your seller account is suspended?" }, answer: { de: "Zuerst braucht ihr den konkreten Sperrgrund und die angeforderten Nachweise. Der Beitrag hilft, die nächsten Schritte zu ordnen.", en: "Start with the stated reason and requested evidence. The guide helps you organise the next steps." } },
      { slug: "brand-registry", question: { de: "Was bringt die Amazon Brand Registry?", en: "What does Amazon Brand Registry offer?" }, answer: { de: "Die Markenregistrierung eröffnet Werkzeuge für Markeninhaber. Hier lest ihr, wofür sie gedacht ist und wie die Anmeldung abläuft.", en: "Brand registration provides tools for brand owners. Learn what they do and how enrolment works." } },
      { slug: "support-cases-loesen", question: { de: "Wie kommt ihr bei einem Support-Fall weiter?", en: "How can you move a support case forward?" }, answer: { de: "Ein klar beschriebener Fehler und zusammenhängende Nachweise erleichtern die Bearbeitung. Der Leitfaden zeigt die Struktur eines Falls.", en: "A clearly described issue and coherent evidence help case handling. The guide explains how to structure a case." } },
    ],
  },
  {
    slug: "strategie",
    label: { de: "Verkaufen & Wachstum auf Amazon", en: "Selling & growing on Amazon" },
    title: { de: "Auf Amazon verkaufen: Strategie und Wachstum", en: "Selling on Amazon: strategy and growth" },
    intro: { de: "Bevor ihr Sortiment oder Werbebudget ausbaut, braucht ihr ein passendes Geschäftsmodell und eine tragfähige Kalkulation. Diese Ratgeber verbinden Positionierung, Vertriebsmodell und operative Voraussetzungen mit den nächsten Wachstumsentscheidungen.", en: "Before expanding your range or ad budget, you need a suitable business model and viable economics. These guides connect positioning, selling models and operational requirements with your next growth decisions." },
    service: "/leistungen/strategie", serviceLabel: { de: "Amazon-Strategie mit temoa entwickeln", en: "Develop your Amazon strategy with temoa" },
    starts: [
      { slug: "skalierung-ueber-1-5m", question: { de: "Was begrenzt eure nächste Wachstumsstufe?", en: "What limits your next stage of growth?" }, answer: { de: "Prüft Nachfrage, Sortiment, Prozesse und Kapital, bevor ihr mehr Werbebudget einsetzt.", en: "Review demand, product range, processes and cash before increasing ad spend." } },
      { slug: "vendor-vs-seller-central", question: { de: "Vendor oder Seller Central?", en: "Vendor or Seller Central?" }, answer: { de: "Die Modelle unterscheiden sich darin, an wen ihr verkauft und welche Aufgaben ihr selbst steuert. Vergleicht die Folgen für eure Marke.", en: "The models differ in who you sell to and which responsibilities you control. Compare what that means for your brand." } },
      { slug: "amazon-marketingstrategie-ueberblick", question: { de: "Wie greifen Content, Werbung und Marke ineinander?", en: "How do content, ads and brand strategy fit together?" }, answer: { de: "Die Marketingübersicht verbindet die einzelnen Maßnahmen zu einer nachvollziehbaren Reihenfolge.", en: "The marketing overview connects individual activities into a practical sequence." } },
    ],
  },
  {
    slug: "ki-zukunft",
    label: { de: "KI-Suche & Listing-Optimierung", en: "AI search & listing optimization" },
    title: { de: "Amazon KI-Suche: Listings und Kundenfragen", en: "Amazon AI search: listings and shopper questions" },
    intro: { de: "Bei einer Produktsuche in Alltagssprache müssen Eigenschaften, Anwendung und Grenzen eines Produkts verständlich sein. Hier verbindet ihr den Überblick zur KI-Suche mit praktischen Ratgebern zu Kundenfragen und visueller Produktsuche. Eine bestimmte Platzierung lässt sich daraus nicht ableiten.", en: "Conversational product search needs clear information about features, uses and limitations. Connect the AI search overview with practical guides on shopper questions and visual search. These changes do not guarantee placement." },
    service: "/leistungen/listing-seo", serviceLabel: { de: "Verständliche Listings und Produktbilder", en: "Clear listings and product images" },
    starts: [
      { slug: "alexa-for-shopping-ki-suche", question: { de: "Was verändert KI bei der Produktsuche?", en: "What does AI change about product search?" }, answer: { de: "Der Überblick erklärt, welche Rolle verständliche Produktinformationen bei sprachbasierten Kaufentscheidungen spielen.", en: "The overview explains the role of clear product information in conversational shopping." } },
      { slug: "kundenfragen-seo", question: { de: "Welche Kundenfragen gehören ins Listing?", en: "Which shopper questions belong in a listing?" }, answer: { de: "Wiederkehrende Fragen zu Eignung, Anwendung und Lieferumfang zeigen, welche Antworten im Angebot fehlen.", en: "Repeated questions about suitability, use and package contents reveal missing information." } },
      { slug: "visual-search-optimierung", question: { de: "Wie helfen Bilder bei der Produktsuche?", en: "How can images help product search?" }, answer: { de: "Klare Motive machen Form und Anwendung erkennbar. Der Beitrag ordnet visuelle Suche aus Verkäufersicht ein.", en: "Clear imagery makes shape and use recognisable. The guide considers visual search from a seller's perspective." } },
    ],
  },
  {
    slug: "zusammenarbeit",
    label: { de: "Amazon-Partner auswählen", en: "Choosing an Amazon partner" },
    title: { de: "Amazon-Partner auswählen und zusammenarbeiten", en: "Choosing and working with an Amazon partner" },
    intro: { de: "Die passende Unterstützung hängt davon ab, welche Aufgaben euer Team selbst übernimmt und wo Wissen oder Kapazität fehlen. Vergleicht Leistungsumfang, Zuständigkeiten und Zusammenarbeit, bevor ihr Angebote nur nach dem Preis bewertet.", en: "The right support depends on what your team handles and where expertise or capacity is missing. Compare scope, responsibilities and working arrangements before judging proposals on price alone." },
    service: "/full-service", serviceLabel: { de: "Amazon Full Service bei temoa", en: "Amazon full service at temoa" },
    starts: [
      { slug: "amazon-agentur-waehlen", question: { de: "Woran erkennt ihr einen passenden Amazon-Partner?", en: "How do you choose the right Amazon partner?" }, answer: { de: "Der Leitfaden hilft, Erfahrung, Leistungsumfang und Verantwortlichkeiten im Auswahlgespräch zu prüfen.", en: "Use the guide to assess experience, scope and responsibilities during selection." } },
      { slug: "fullservice-vs-spezialagentur", question: { de: "Full Service oder spezialisierte Unterstützung?", en: "Full service or specialist support?" }, answer: { de: "Vergleicht beide Modelle anhand eurer internen Kapazität und der Aufgaben, die zusammen gesteuert werden müssen.", en: "Compare both models against internal capacity and the work that needs coordinated management." } },
      { slug: "agentur-engagieren-ablauf", question: { de: "Wie startet eine Zusammenarbeit?", en: "How does a working relationship start?" }, answer: { de: "Von der Bestandsaufnahme bis zu Zuständigkeiten und Abstimmung: Der Beitrag erklärt den Einstieg.", en: "From the initial account review to responsibilities and communication, the guide explains the start." } },
    ],
  },
];

export const comparisonGroups = [
  {
    title: { de: "Versand und Vertriebsmodell", en: "Fulfilment and selling model" },
    text: { de: "Wer verkauft an wen, wer versendet und wer trägt den operativen Aufwand? Diese Vergleiche helfen bei der Wahl eures Modells.", en: "Who sells to whom, who ships orders and who handles operations? These comparisons help you choose a model." },
    slugs: ["fbm-vs-fba", "vendor-vs-seller-central", "fba-vs-dropshipping"],
  },
  {
    title: { de: "Werbung und Kennzahlen", en: "Advertising and metrics" },
    text: { de: "ACoS und TACoS beantworten unterschiedliche Fragen. Auch Anzeigenformate solltet ihr nach Aufgabe und Ziel vergleichen.", en: "ACoS and TACoS answer different questions. Compare ad formats by their role and objective as well." },
    slugs: ["tacos-erklaert", "roas-berechnen", "sponsored-brands-display"],
  },
  {
    title: { de: "Die passende Unterstützung", en: "The right support" },
    text: { de: "Prüft, welche Aufgaben ihr abgeben möchtet und welche im eigenen Team bleiben. Daraus ergibt sich der passende Leistungsumfang.", en: "Decide which tasks to delegate and which stay with your team. That sets the scope you need." },
    slugs: ["fullservice-vs-spezialagentur", "ppc-agentur-auswahl", "amazon-agentur-waehlen"],
  },
];

export const comparisonCopy = {
  title: { de: "Amazon-Vergleiche: FBA, Werbung und Partnerwahl", en: "Amazon comparisons: FBA, ads and partners" },
  intro: { de: "FBA oder FBM, Vendor oder Seller, Full Service oder Spezialist: Hier findet ihr die vorhandenen Vergleiche und Entscheidungshilfen nach Fragestellung geordnet. Beginnt mit der Entscheidung, die für eure Marke gerade ansteht.", en: "FBA or FBM, vendor or seller, full service or specialist: browse comparisons and decision guides by question. Start with the decision your brand needs to make next." },
};

export function getTopic(slug: string) {
  return blogTopics.find((topic) => topic.slug === slug);
}
