import type { Woerterbuch } from "./de";

/* ============================================================
   English version of the page copy.

   Written, not translated. The German copy leans on "ihr/euch", which has no
   English equivalent, and a word-for-word rendering reads like the
   machine-written filler the style rules exist to keep out. Same tone as the
   German: premium, calm, factual. No hype, no em dashes.
   ============================================================ */

export const en: Woerterbuch = {
  meta: {
    titel: "temoa \u00b7 Amazon Full Service Growth Partner",
    beschreibung:
      "We get your Amazon listing to the point where it sells without advertising. After that, PPC scales what already converts. Organic First, PPC Second.",
    ogBeschreibung:
      "Amazon full service: first your listing sells, then advertising scales it. Organic First, PPC Second.",
  },

  start: {
    /* The German headline and promise are dictated by the client word for
       word, down to the informal "deine". English has no equivalent of that
       distinction, so the tone carries it instead: direct, no hedging.

       The lead mirrors the German rhetorical move ("is not a question of ad
       budget"). That is close to the "not X, but Y" pattern the style rules
       ban, and it stays anyway: the construction is the client's own core
       claim, not a filler phrase. */
    hero: {
      eyebrow: "Amazon Full Service",
      titelMark: "Profitable growth",
      titelRest: " for your Amazon brand",
      lead: "More revenue is not a question of ad budget. It is a question of execution: content, advertising, account management.",
      ctaZweit: "See the case studies",
    },

    kundenband: {
      label: "In our hands every day",
      marken: "brands",
      marktplaetze: "marketplaces",
    },

    leistungen: {
      label: "Services",
      titelVor: "Five services, in the ",
      titelMark: "right order.",
      mehr: "More on this",
      alle: "See all services",
      bildAlt: "Five areas sit in a ring around a shared center, each connected to it.",
      /* Same names as the header and footer. US spelling throughout: the
         audience is brands selling on Amazon worldwide, and amazon.com is the
         largest of those marketplaces. */
      liste: [
        { titel: "Strategy", text: "Data first, then the plan." },
        { titel: "Product Images & SEO", text: "Clicks turn into orders." },
        { titel: "PPC Advertising", text: "Scale profitably." },
        { titel: "Account Management", text: "Inventory, Buy Box and cases under control." },
        { titel: "International Expansion", text: "Localize instead of translate." },
      ],
    },

    nachweis: {
      label: "Case Studies",
      titelVor: "Every figure comes from an ",
      titelEm: "account we work on.",
      caseStudy: "Case Study",
      alle: "See all case studies",
    },

    befund: {
      label: "The starting point",
      titel: "The bare minimum does not sell on Amazon.",
      karten: [
        {
          titel: "Too many products, too little time",
          text: "Several hundred items sit with one or two people who handle ten other things as well.",
        },
        {
          titel: "Nothing has changed since launch",
          text: "Images, titles and A+ content look exactly as they did on day one.",
        },
        {
          titel: "Campaigns without structure",
          text: "Auto, phrase and exact run side by side and bid against each other.",
        },
        {
          titel: "Reports nobody evaluates",
          text: "The Search Query report and the advertising data sit in the account and stay unopened.",
        },
      ],
      ursacheLabel: "The cause",
      ursacheSatz: "Four symptoms, one cause: the listing convinces too few visitors.",
      ursacheText:
        "Amazon ranks on clicks and orders. Fall behind on those and visibility has to be bought, permanently.",
      ursacheBildAlt:
        "A funnel: many visitors go in at the top, only two orders come out at the bottom.",
    },

    verfahren: {
      label: "How we work",
      titelZeile: "Organic First,",
      titelMark: "PPC Second.",
      lead: "Click-through rate and conversion decide where Amazon shows your product. So the listing comes first, the campaign after it.",
      verlaufBezahlt: "Revenue through advertising",
      verlaufOrganisch: "Revenue without advertising",
      verlaufAlt:
        "Ten columns side by side, drawn in three dimensions. The lower part of each column stands for revenue through advertising and is the same height throughout. The upper part stands for revenue without advertising and grows markedly to the right.",
      schritt1: "Organic First",
      schritt1Text: "We build the listing for click-through rate and conversion.",
      stufen: [
        { name: "Visibility", bedeutung: "being found in the search results" },
        { name: "Click-through rate (CTR)", bedeutung: "the click on your product" },
        { name: "Conversion (CVR)", bedeutung: "the order on the detail page" },
      ],
      rankingSignal: "Ranking signal",
      stufenBildAlt: "Three stages joined by arrows: search, click, order.",
      ergebnisLabel: "Result",
      ergebnisSatz: "The listing sells without advertising.",
      schritt2: "PPC Second",
      schritt2Text: "Advertising scales what already converts.",
      ppc: [
        {
          titel: "Scale what converts",
          text: "Budget goes to the search terms that order on the detail page.",
        },
        {
          titel: "Hold the ground",
          text: "Brand and bestseller terms stay covered, competitors included.",
        },
        {
          titel: "Steer on profit",
          text: "Measured on TACoS: what advertising costs against total revenue.",
        },
      ],
      unterschiedLabel: "The difference",
      unterschiedTitel: "Four points where the work parts ways.",
      spalteAlt: "How it usually goes",
      spalteNeu: "How temoa works",
      gegenueber: [
        {
          alt: "Listing built once, advertising from then on",
          neu: "Main image, title and A+ sharpened until conversion holds",
        },
        {
          alt: "Content by gut feeling, with no data behind it",
          neu: "Content built from the Search Query report, the competition and the reviews",
        },
        {
          alt: "Visibility bought through bids, and click prices rise every year",
          neu: "Visibility comes organically, advertising sits on top of it",
        },
        {
          alt: "Revenue at any cost",
          neu: "Every product costed out on its own before budget moves",
        },
      ],
    },

    arbeiten: {
      label: "Our Work",
      titelVor: "This is what",
      titelEm: "Retail Ready",
      titelNach: " looks like.",
      lead1: "A complete listing from our production for Miganeo.",
      lead2:
        "Seven images and six modules of Premium A+ content, published on Amazon in exactly this form.",
      zahlBilder: "images",
      zahlModule: "Premium A+ modules",
      mehr: "More of our work",
      kopfListing: "Listing",
      kopfListingNote: "1 + 6 images",
      kopfAplus: "Premium A+ Content",
      kopfAplusNote: "6 modules",
      /* The seven listing images carry their own captions: they went to
         Amazon this way. These lines describe what is on them. */
      bildAlt: [
        "Main image: the pool cover cut out, folded and laid out",
        "Water up to 8 degrees warmer, pool half covered",
        "Keeping the heat in the pool, diameter 457 centimeters",
        "Handling in four steps",
        "Up to 70 percent lower heating costs",
        "Keeps coarse dirt out of the water",
        "Family at the pool, cover being pulled off",
      ],
      /* `{n}` is replaced with the number of the module. */
      aplusAlt: "Premium A+ module {n} of 6",
    },

    stimmen: {
      label: "Client Reviews",
      titelVor: "In their words, ",
      titelMark: "with the numbers.",
      anfuehrungAuf: "“",
      anfuehrungZu: "”",
      sterne: "5 out of 5 stars",
    },

    mannschaft: {
      label: "Team",
      titel: "The team behind temoa.",
      lead: "No account rests on one person. Several people work on your catalog at the same time, each in their own area, all looking at the same numbers.",
      bildAlt: "The founders of temoa",
    },
  },
};
