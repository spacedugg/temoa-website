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
  },
};
