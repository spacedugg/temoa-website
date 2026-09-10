import type { CaseStudy } from "./cases";

/* ============================================================
   Englische Fassung der Faelle.

   Sie liegt neben `cases.ts` und nicht darin. Die deutsche Datei ist mit
   Zahlen, Bildpfaden und Anmerkungen ohnehin lang; jedes Feld dort ein
   zweites Mal in Englisch haette sie unlesbar gemacht, und die englische
   Fassung waere ueber siebenhundert Zeilen verstreut gewesen statt an einer
   Stelle pruefbar.

   Zugeordnet wird ueber die Reihenfolge: der dritte Punkt der zweiten Sektion
   hier gehoert zum dritten Punkt der zweiten Sektion dort. Das ist knapp, und
   deshalb prueft `faelleFuer` in `cases.ts` jede Laenge und bricht den Bau ab,
   wenn eine nicht stimmt. Eine stille Verschiebung waere der schlimmere
   Fehler: dann stuende unter einer Ueberschrift ein Beleg, der nicht dazu
   gehoert.

   Zahlen werden umgesetzt, nicht uebernommen. „9,9 %" liest sich im
   Englischen als etwas anderes, „1.677.538 €" als eine Zahl mit drei
   Dezimalstellen. Also Punkt statt Komma, Komma statt Punkt, das
   Waehrungszeichen vorn.

   Ausgenommen bleibt, was Amazon selbst so nennt: ACoS, TACoS, CTR, CVR,
   Premium A+, Brand Store, Brand Story.
   ============================================================ */

type Zahlenpaar = { value: string; label: string; sublabel?: string };

export type FallEn = {
  displayName?: string;
  industry: string;
  timeframe: string;
  headline: string;
  subheadline: string;
  preview: { value: string; label: string };
  sections: { heading: string; body: string; punkte?: string[] }[];
  heroStats: Zahlenpaar[];
  kennzahlen: { name: string; wert: string; hinweis?: string }[];
  subStats: Zahlenpaar[];
  badges: string[];
  chart?: { label: string; annotation?: string }[];
  produkte?: { titel: string; aplus?: string }[];
};

const APLUS_SEITE = "Premium A+, the full page";
const APLUS_MODULE = "Six modules";

export const faelleEn: Record<CaseStudy["slug"], FallEn> = {
  miganeo: {
    industry: "Pool, garden and outdoor",
    timeframe: "May to August 2026",
    headline: "Four campaigns abroad became 120",
    subheadline:
      "Five marketplaces were running on the side. After one summer, most of the growth comes from them.",
    preview: { value: "×20", label: "Revenue abroad" },
    sections: [
      {
        heading: "The starting point",
        body: "In Germany the account was doing well. Abroad it was running on the side.",
        punkte: [
          "€8,967 revenue abroad in one quarter",
          "Four single campaigns for five open marketplaces",
          "Nobody in house had the time to build them out",
        ],
      },
      {
        heading: "How we worked",
        body: "Every marketplace got the full work from scratch.",
        punkte: [
          "Its own keyword research and its own copy in the local language",
          "Four campaigns abroad became 120, and 157 across all six marketplaces",
          "66 advertised items",
          "New main images and detail pages for the most important items",
        ],
      },
      {
        heading: "Result",
        body: "Most of the growth comes from abroad today.",
        punkte: [
          "Revenue abroad from €8,967 to €179,287",
          "98.9 percent of it through search terms outside the brand name",
          "The new structure in Germany gets 20.6 percent more revenue out of the same ad spend",
        ],
      },
    ],
    heroStats: [
      { value: "×20", label: "Revenue abroad", sublabel: "€8,967 to €179,287" },
      { value: "€299,184", label: "Revenue through advertising", sublabel: "on €29,490 spend" },
      {
        value: "98.9%",
        label: "Revenue outside the brand's own name",
        sublabel: "newly won, not shifted around",
      },
    ],
    kennzahlen: [
      { name: "Advertising Cost of Sales", wert: "9.9%", hinweis: "across all six marketplaces" },
      { name: "Total Advertising Cost of Sales", wert: "6.02%", hinweis: "ad spend against total revenue" },
      { name: "Conversion Rate", wert: "+24.7%", hinweis: "sand filter systems, after new product images" },
    ],
    subStats: [
      { value: "+149.5%", label: "Revenue, trampoline accessories", sublabel: "€11,059 to €27,587" },
      { value: "+38.3%", label: "Revenue, boat motors", sublabel: "€269,759 to €372,998" },
    ],
    badges: ["Client's efficiency target beaten"],
    produkte: [
      { titel: "Complete trampoline", aplus: APLUS_SEITE },
      { titel: "Electric boat motor, 32 lbs", aplus: APLUS_SEITE },
      { titel: "Solar cover for round pools", aplus: APLUS_SEITE },
    ],
  },

  bachgold: {
    industry: "Outdoor water filters",
    timeframe: "15 months",
    headline: "One product, content only, €1.68M",
    subheadline:
      "No broad catalog behind that figure: one outdoor water filter in two sizes, plus product images, Premium A+ content, brand story and brand store.",
    preview: { value: "€1.68M", label: "Revenue in 15 months" },
    sections: [
      {
        heading: "The starting point",
        body: "A water filter developed and patented in Switzerland sat on Amazon like any other item.",
        punkte: [
          "No presence a buyer would recognize the brand by",
          "Neither the outdoor character nor the practical use came across",
          "One product, two sizes, no catalog behind it",
        ],
      },
      {
        heading: "How we worked",
        body: "First the brand identity, then the content on top of it.",
        punkte: [
          "New main image and listing images for both sizes",
          "Premium A+ content and brand story",
          "Brand store as the way into the catalog",
          "Built so it carries over into further countries",
        ],
      },
      {
        heading: "Result",
        body: "Product images, content and packaging show the same brand today.",
        punkte: [
          "Bestseller rank 1 in the water filter niche",
          "€1,677,538 in 15 months, from a single product",
          "Six marketplaces, from Germany to the USA",
          "Two further products in preparation",
        ],
      },
    ],
    heroStats: [
      { value: "€1,677,538", label: "Revenue", sublabel: "in 15 months, from one product" },
      { value: "Rank 1", label: "Bestseller, water filters", sublabel: "niche held for good" },
      { value: "6", label: "Marketplaces", sublabel: "Europe and the USA" },
    ],
    kennzahlen: [],
    subStats: [
      { value: "Premium A+", label: "Content tier for both sizes", sublabel: "plus the brand story" },
      { value: "Brand Store", label: "built from scratch", sublabel: "the way into the whole catalog" },
      { value: "2", label: "Sizes, each with its own content", sublabel: "500 ml and 800 ml" },
    ],
    badges: ["Rank 1 in the water filter niche"],
    produkte: [{ titel: "Water filter XL, 800 ml", aplus: APLUS_MODULE }],
  },

  vitaworld: {
    industry: "Food supplements",
    timeframe: "Q1 2025 vs Q1 2026",
    headline: "More organic strength, less dependence on PPC",
    subheadline: "Growing more profitably instead of advertising more expensively.",
    preview: { value: "+147%", label: "Revenue growth" },
    sections: [
      {
        heading: "The starting point",
        body: "A solid account on Amazon DE that hung on advertising pressure.",
        punkte: [
          "Growth only with ad costs rising in proportion",
          "A good third of revenue came through advertising",
          "FR, IT, ES and NL not launched yet",
        ],
      },
      {
        heading: "How we worked",
        body: "The route ran through conversion strength and organic rankings.",
        punkte: [
          "Main images, titles and targets set up again",
          "Ad budget raised by 39 percent",
          "Revenue up 147 percent over the same period",
        ],
      },
      {
        heading: "Result",
        body: "Vitaworld now grows disproportionately through organic sales.",
        punkte: [
          "Advertising's share of total revenue down 19 percent",
          "Brand and detail pages drive the growth",
          "FR, IT, ES and NL are ready to go",
        ],
      },
    ],
    heroStats: [
      { value: "+147%", label: "Revenue", sublabel: "comparing the two quarters" },
      { value: "×3.2", label: "Orders", sublabel: "over the same period" },
      {
        value: "−19.4%",
        label: "Advertising's share of revenue",
        sublabel: "the growth comes organically",
      },
    ],
    kennzahlen: [
      { name: "Click-through rate in search", wert: "+52%", hinweis: "after new main images and titles" },
      { name: "Conversion Rate", wert: "+50%" },
      { name: "Advertising Cost of Sales", wert: "−30%" },
      { name: "Total Advertising Cost of Sales", wert: "−44%" },
    ],
    subStats: [],
    badges: [],
    chart: [
      { label: "Jan 25" },
      { label: "Feb 25", annotation: "temoa onboarding" },
      { label: "Mar 25" },
      { label: "Apr 25" },
      { label: "May 25" },
      { label: "Jun 25" },
      { label: "Jul 25" },
      { label: "Aug 25" },
      { label: "Sep 25" },
      { label: "Oct 25" },
      { label: "Nov 25" },
      { label: "Dec 25" },
      { label: "Jan 26" },
      { label: "Feb 26" },
      { label: "Mar 26" },
    ],
    produkte: [{ titel: "PEA 600 mg", aplus: "Four modules for Taurine 850 mg" }],
  },

  haa: {
    industry: "Kitchen and home",
    timeframe: "2026",
    headline: "From cold launch to top performance in 17 weeks",
    subheadline:
      "Started Organic First, built on a small ad budget. At the end, a conversion rate established brands rarely see.",
    preview: { value: "+439%", label: "Conversion Rate" },
    sections: [
      {
        heading: "The starting point",
        body: "A launch with nothing behind it: no rankings, no reviews, no established ad budget.",
        punkte: [
          "Growth had to come from conversion and visibility",
          "A large ad budget was not available",
        ],
      },
      {
        heading: "How we worked",
        body: "The foundation first, the advertising pressure after.",
        punkte: [
          "Retail readiness and conversion work up front",
          "Detail pages aimed at the buying decision",
          "Clean campaign structure, targets worked more precisely",
        ],
      },
      {
        heading: "Result",
        body: "After 17 weeks, a conversion rate established brands rarely see.",
        punkte: [
          "Conversion rate more than five times higher",
          "Weekly orders 14 times higher",
          "The account suspension in week 10 was cleared within two weeks",
        ],
      },
    ],
    heroStats: [
      { value: "×14", label: "Orders per week", sublabel: "launch week to peak" },
      { value: "+900%", label: "Clicks per week", sublabel: "without a large ad budget" },
      { value: "17", label: "Weeks from launch to peak" },
    ],
    kennzahlen: [
      { name: "Click-through rate in search", wert: "+46%" },
      { name: "Conversion Rate", wert: "+439%", hinweis: "launch week to peak" },
    ],
    subStats: [],
    badges: ["Bio-ethanol in its niche", "Account suspension cleared in 2 weeks"],
    produkte: [{ titel: "Bio-ethanol, 1 to 30 liters", aplus: APLUS_SEITE }],
  },

  futum: {
    industry: "Pest control",
    timeframe: "Client since 2024",
    headline: "Profitable scaling in an urgent-need niche",
    subheadline:
      "Two product launches in a niche where buyers need a solution right now and barely compare.",
    preview: { value: "+37.3%", label: "Conversion Rate" },
    sections: [
      {
        heading: "The starting point",
        body: "Two product launches in a niche where buyers need a solution right now.",
        punkte: [
          "Barely any research, barely any comparison before buying",
          "Visibility and efficiency have to hold from day one",
        ],
      },
      {
        heading: "How we worked",
        body: "Four adjustments at once.",
        punkte: [
          "Content and retail readiness",
          "Campaign setup across all ad formats",
          "Positioning on problem-solving search terms",
          "Pricing as a growth driver",
        ],
      },
      {
        heading: "Result",
        body: "The first full Amazon year, 2025, ran profitably.",
        punkte: [
          "Both products scaled profitably",
          "Organic share up to 80 percent",
          "The Bestseller and Amazon's Choice badges came on top",
        ],
      },
    ],
    heroStats: [
      { value: "+30%", label: "CTR", sublabel: "click-through rate in search" },
      { value: "+37.3%", label: "CVR", sublabel: "conversion rate, whole account" },
      { value: "−19.7%", label: "ACoS", sublabel: "while scaling through the launch" },
    ],
    kennzahlen: [],
    subStats: [],
    badges: ["Mole repellent balls", "Woodworm spray"],
    produkte: [
      { titel: "Mole repellent balls", aplus: APLUS_MODULE },
      { titel: "Vole repellent granules", aplus: APLUS_MODULE },
      { titel: "Spot-on for dogs", aplus: APLUS_MODULE },
      { titel: "Silverfish spray" },
    ],
  },

  "marke-gartenzubehoer": {
    displayName: "Garden accessories brand",
    industry: "Garden accessories",
    timeframe: "Q1 to Q2 2026",
    headline: "Seasonal demand scaled profitably",
    subheadline:
      "Prepared early, then built out across four European marketplaces at once.",
    preview: { value: "−35%", label: "TACoS in the main market" },
    sections: [
      {
        heading: "The starting point",
        body: "A brand with clear seasonality: peak demand falls in April and May.",
        punkte: [
          "A short window decides the year",
          "The groundwork was laid the autumn before",
        ],
      },
      {
        heading: "How we worked",
        body: "Prepare early, then build out across four marketplaces at once.",
        punkte: [
          "Listing and content work up front",
          "DE, IT, FR and ES at the same time",
          "Campaign structure prepared for higher demand",
        ],
      },
      {
        heading: "Result",
        body: "The demand peak turned into growth.",
        punkte: [
          "Main market Germany: more efficient at higher volume",
          "Italy grows alongside as a secondary market",
          "The season was prepared before it began",
        ],
      },
    ],
    heroStats: [
      { value: "4", label: "Marketplaces in parallel", sublabel: "DE, IT, FR, ES" },
      { value: "+110%", label: "Clicks in Italy", sublabel: "secondary market for the season" },
      { value: "April, May", label: "Peak season", sublabel: "prepared from the autumn before" },
    ],
    kennzahlen: [
      { name: "Conversion Rate", wert: "+21%", hinweis: "main market Germany" },
      { name: "Advertising Cost of Sales", wert: "−14%", hinweis: "main market Germany" },
      { name: "Advertising Cost of Sales", wert: "−18%", hinweis: "Italy, with rising traffic" },
      { name: "Total Advertising Cost of Sales", wert: "−35%", hinweis: "main market Germany" },
    ],
    subStats: [],
    badges: [],
  },
};
