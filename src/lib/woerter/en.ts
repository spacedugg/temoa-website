import type { Woerterbuch } from "./de";

/* ============================================================
   English version.

   Written, not translated. The German copy leans on "ihr/euch", which has no
   English equivalent, and a word-for-word rendering of it reads like the
   machine-written filler the style rules exist to keep out. The tone is the
   same as the German: premium, calm, factual. No hype, no em dashes.

   Three labels are deliberate choices rather than literal renderings, and
   they are the ones to veto first if they miss:

   - "Designbeispiele" is "Our Work". A literal "Design Examples" reads like a
     folder name; "Our Work" is what an English-speaking brand manager looks
     for.
   - "Internationalisierung" is "International Expansion". "Internationalisation"
     is correct and nobody says it.
   - "Potenzialanalyse buchen" is "Book an account review". The German button
     text is fixed by the style rules, so this needs a decision: it says what
     actually happens in the 30 minutes, without promising an outcome.
   ============================================================ */

export const en: Woerterbuch = {
  rahmen: {
    zumInhalt: "Skip to content",
    zurStartseite: "temoa, to the homepage",
    menueOeffnen: "Open menu",
    menueSchliessen: "Close menu",
    sprache: "Language",
    spracheWaehlen: "Choose language",
    cta: "Book an account review",
  },

  navigation: {
    fullService: "Full Service",
    caseStudies: "Case Studies",
    designbeispiele: "Our Work",
    blog: "Blog",
  },

  leistungen: {
    strategie: "Strategy",
    listingSeo: "Product Images & SEO",
    ppc: "PPC Advertising",
    account: "Account Management",
    international: "International Expansion",
  },

  fusszeile: {
    beschreibung:
      "Amazon full service growth partner. First a listing that sells on its own, then advertising built on top of it.",
    spalteLeistungen: "Services",
    spalteUnternehmen: "Company",
    spalteRecht: "Legal",
    impressum: "Imprint",
    datenschutz: "Privacy Policy",
    agb: "Terms and Conditions",
    cookieEinstellungen: "Cookie settings",
  },

  meta: {
    titel: "temoa · Amazon Full Service Growth Partner",
    beschreibung:
      "We get your Amazon listing to the point where it sells without advertising. After that, PPC scales what already converts. Organic First, PPC Second.",
    ogBeschreibung:
      "Amazon full service: first your listing sells, then advertising scales it. Organic First, PPC Second.",
  },
};
