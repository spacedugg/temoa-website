/* ============================================================
   Interne Links von Blogbeitraegen auf Leistungen und Faelle.

   Vorher hatte keiner der 83 Beitraege einen Link auf eine Leistungsseite
   oder einen Fall. Wer einen Ratgeber las, kam nur ueber den Abschluss-Knopf
   weiter, und Google bekam keinen Hinweis, welche Leistungsseite zu welchem
   Thema gehoert.

   Die Zuordnung laeuft ueber die Kategorie, einzelne Beitraege haben eine
   eigene. Ankertexte nennen das Ziel, nicht „hier klicken". Faelle stehen nur
   dort, wo der Fall das Thema wirklich zeigt: ein Link auf einen Fall, der
   nichts mit dem Beitrag zu tun hat, ist ein Wegweiser in die falsche Richtung.
   ============================================================ */

import type { Sprache } from "@/lib/i18n";

type Text = { de: string; en: string };
type Ziel = { href: string; anker: Text; text: Text };

const ZIELE = {
  ppc: {
    href: "/leistungen/ppc-advertising",
    anker: { de: "PPC Advertising bei temoa", en: "PPC advertising at temoa" },
    text: {
      de: "Wie wir Kampagnen auf Deckungsbeitrag, ACoS und TACoS steuern.",
      en: "How we steer campaigns on contribution margin, ACoS and TACoS.",
    },
  },
  listing: {
    href: "/leistungen/listing-seo",
    anker: { de: "Produktbilder & SEO bei temoa", en: "Product images & SEO at temoa" },
    text: {
      de: "Hauptbild, Listingbilder, Titel, Bullets und A+ Content für mehr Klicks und Conversion.",
      en: "Main image, listing images, title, bullets and A+ content for more clicks and conversion.",
    },
  },
  account: {
    href: "/leistungen/account-management",
    anker: { de: "Account Management bei temoa", en: "Account management at temoa" },
    text: {
      de: "Buy-Box, Bestand, Pricing und Konto-Gesundheit im Tagesgeschäft.",
      en: "Buy Box, inventory, pricing and account health in day-to-day operations.",
    },
  },
  fba: {
    href: "/leistungen/fba-inventory-management",
    anker: { de: "FBA und Inventory bei temoa", en: "FBA and inventory at temoa" },
    text: {
      de: "Sendungen planen, Bestand steuern und Versandwege festlegen, alles im Konto.",
      en: "Planning shipments, steering stock and choosing fulfilment routes, all inside the account.",
    },
  },
  compliance: {
    href: "/leistungen/compliance-account-health",
    anker: { de: "Compliance und Account Health bei temoa", en: "Compliance and account health at temoa" },
    text: {
      de: "Wie wir Sperrungen, Nachweisanfragen und Katalogfälle bei Amazon bearbeiten.",
      en: "How we handle suspensions, documentation requests and catalog cases with Amazon.",
    },
  },
  strategie: {
    href: "/leistungen/strategie",
    anker: { de: "Amazon Strategie bei temoa", en: "Amazon strategy at temoa" },
    text: {
      de: "Aus Search Query Bericht, Ads-Performance und Verkäufen entsteht die Reihenfolge der nächsten Schritte.",
      en: "The Search Query report, ad performance and sales set the order of the next steps.",
    },
  },
  fullService: {
    href: "/full-service",
    anker: { de: "Amazon Full Service bei temoa", en: "Amazon full service at temoa" },
    text: {
      de: "Strategie, Content, Advertising, Account Management und neue Marktplätze aus einem Team.",
      en: "Strategy, content, advertising, account management and new marketplaces from one team.",
    },
  },
  fallVitaworld: {
    href: "/ergebnisse/vitaworld",
    anker: { de: "Case Study Vitaworld", en: "Case study Vitaworld" },
    text: {
      de: "Mehr organische Stärke, weniger PPC-Abhängigkeit.",
      en: "More organic strength, less PPC dependence.",
    },
  },
  fallBachgold: {
    href: "/ergebnisse/bachgold",
    anker: { de: "Case Study Bachgold", en: "Case study Bachgold" },
    text: {
      de: "Ein Produkt, nur Content: was Listing und A+ Content allein erreicht haben.",
      en: "One product, content only: what listing and A+ content achieved on their own.",
    },
  },
  fallHaa: {
    href: "/ergebnisse/haa",
    anker: { de: "Case Study HaA", en: "Case study HaA" },
    text: {
      de: "Die Accountsperrung in KW 10 war nach zwei Wochen erledigt.",
      en: "The account suspension in week 10 was resolved after two weeks.",
    },
  },
  faelle: {
    href: "/ergebnisse",
    anker: { de: "Case Studies von temoa", en: "Case studies by temoa" },
    text: {
      de: "Sechs Marken mit Ausgangslage, Vorgehen und Ergebnis.",
      en: "Six brands with starting point, the work and the result.",
    },
  },
} satisfies Record<string, Ziel>;

type Schluessel = keyof typeof ZIELE;

const NACH_KATEGORIE: Record<string, Schluessel[]> = {
  "Amazon PPC & Advertising": ["ppc", "fallVitaworld"],
  "Listing, SEO & Conversion": ["listing", "fallBachgold"],
  "FBA, Logistik & Inventar": ["fba", "account"],
  "Marke schützen & Account-Management": ["compliance", "account", "fallHaa"],
  "Strategie & Geschäftsmodelle": ["strategie", "fullService"],
  "Operativ & Kundenservice": ["account", "fullService"],
  "KI & Zukunft": ["listing", "strategie"],
  "Agentur & Zusammenarbeit": ["fullService", "faelle"],
};

/* Beitraege, deren Thema eine andere Leistung trifft als ihre Kategorie. */
const NACH_BEITRAG: Record<string, Schluessel[]> = {
  "account-gesperrt": ["compliance", "fallHaa", "account"],
  "approval-needed": ["compliance", "account"],
  "support-cases-loesen": ["compliance", "account"],
  "hijacker-entfernen": ["compliance", "account"],
  "transparency-programm": ["compliance", "account"],
  "brand-registry": ["compliance", "listing"],
  "kundenfragen-seo": ["listing", "fallBachgold"],
  "visual-search-optimierung": ["listing", "fallBachgold"],
  "amazon-attribution": ["ppc", "strategie"],
  "tarif-zoll-strategie": ["ppc", "strategie"],
  "peak-season": ["fba", "ppc"],
  "ppc-intelligence-wettbewerb": ["ppc", "strategie"],
  "competitor-intelligence": ["strategie", "listing"],
};

export type BeitragsLink = { href: string; anker: string; text: string };

export function beitragsLinks(slug: string, kategorie: string, sprache: Sprache): BeitragsLink[] {
  const schluessel = NACH_BEITRAG[slug] ?? NACH_KATEGORIE[kategorie] ?? ["fullService"];
  return schluessel.slice(0, 3).map((k) => {
    const z: Ziel = ZIELE[k];
    return { href: z.href, anker: z.anker[sprache], text: z.text[sprache] };
  });
}
