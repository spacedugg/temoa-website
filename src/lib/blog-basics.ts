import type { Sprache } from "./i18n";

type Text = Record<Sprache, string>;
type Entry = { slug: string; question: Text; answer: Text };
export const basicsCopy = {
  title: { de: "Amazon-Grundlagen für Marken und Händler", en: "Amazon basics for brands and sellers" },
  intro: { de: "Ihr verkauft auf Amazon oder prüft den Einstieg für eure Marke? Hier findet ihr verständliche Antworten zu Werbung, Verkaufsgebühren und Produktseiten. Startet mit der Frage, die euch gerade beschäftigt.", en: "Selling on Amazon or considering it for your brand? Find clear answers about advertising, selling fees and product pages. Start with the question that matters to your business right now." },
};
export const basicsGroups: { title: Text; text: Text; entries: Entry[] }[] = [
  {
    title: { de: "Werbung verstehen", en: "Understand advertising" },
    text: { de: "Diese Kennzahlen helfen euch, Werbekosten und Umsatz einzuordnen.", en: "These metrics help you understand ad spend and sales." },
    entries: [
      { slug: "acos-erklaert", question: { de: "Was ist ACoS?", en: "What is ACoS?" }, answer: { de: "Was euch das Verhältnis von Werbekosten zu Werbeumsatz sagt und wie ihr es berechnet.", en: "What ad spend as a share of attributed sales tells you, and how to calculate it." } },
      { slug: "tacos-erklaert", question: { de: "Was ist TACoS?", en: "What is TACoS?" }, answer: { de: "Wie ihr eure Werbeausgaben im Verhältnis zum gesamten Amazon-Umsatz betrachtet.", en: "How to assess ad spend in relation to your total Amazon sales." } },
      { slug: "roas-berechnen", question: { de: "Was ist ROAS?", en: "What is ROAS?" }, answer: { de: "Wie viel zugerechneter Werbeumsatz auf einen Euro Werbekosten entfällt.", en: "How much attributed ad revenue each euro of ad spend generates." } },
    ],
  },
  {
    title: { de: "Verkauf und Versand einordnen", en: "Understand selling and fulfilment" },
    text: { de: "Klärt die Grundlagen, bevor ihr euer Sortiment und eure Marge plant.", en: "Understand the basics before planning your range and margins." },
    entries: [
      { slug: "fbm-vs-fba", question: { de: "Was ist Amazon FBA?", en: "What is Amazon FBA?" }, answer: { de: "Was Amazon bei Lagerung und Versand übernimmt und wie sich FBA vom Eigenversand unterscheidet.", en: "What Amazon handles in storage and shipping, and how FBA differs from fulfilling orders yourself." } },
      { slug: "seller-gebuehren-ueberblick", question: { de: "Was kostet es, auf Amazon zu verkaufen?", en: "What does selling on Amazon cost?" }, answer: { de: "Welche Verkaufs-, Versand- und Lagergebühren in eure Kalkulation gehören.", en: "Which selling, fulfilment and storage fees belong in your cost calculation." } },
      { slug: "vendor-vs-seller-central", question: { de: "Was ist der Unterschied zwischen Seller und Vendor?", en: "What is the difference between seller and vendor?" }, answer: { de: "Direkt an Endkunden verkaufen oder Amazon beliefern: zwei Vertriebsmodelle für eure Marke.", en: "Selling directly to shoppers or supplying Amazon: two selling models for your brand." } },
    ],
  },
  {
    title: { de: "Produkt und Marke sichtbar machen", en: "Make your product and brand visible" },
    text: { de: "Lernt die Begriffe kennen, die euch bei der Arbeit am Listing begegnen.", en: "Get familiar with the terms you encounter when working on a product listing." },
    entries: [
      { slug: "a-plus-content", question: { de: "Was ist A+ Content?", en: "What is A+ content?" }, answer: { de: "Wie zusätzliche Bilder und Inhalte eure Produktbeschreibung ergänzen können.", en: "How additional images and content can support your product description." } },
      { slug: "brand-registry", question: { de: "Was ist die Amazon Brand Registry?", en: "What is Amazon Brand Registry?" }, answer: { de: "Wofür Markeninhaber die Markenregistrierung nutzen und welche Voraussetzungen zählen.", en: "Why brand owners use brand registration and which requirements matter." } },
      { slug: "bsr-erklaert", question: { de: "Was bedeutet der Amazon-Bestseller-Rang?", en: "What does Amazon's Best Sellers Rank mean?" }, answer: { de: "Was der BSR über die Verkaufsposition in einer Kategorie aussagt und wo seine Grenzen liegen.", en: "What BSR says about sales position within a category, and its limitations." } },
    ],
  },
];
