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
  leistungen: {
    meta: {
      strategie: {
        name: "Strategy",
        beschreibung:
          "Search Query report, advertising performance, sales and traffic, all evaluated. Out of that comes the order of the next steps for your Amazon account.",
      },
      content: {
        name: "Product Images & SEO",
        beschreibung:
          "Main image, listing images, title, bullets and A+ content, built around the two numbers Amazon measures you by: click-through rate and conversion.",
      },
      advertising: {
        name: "PPC Advertising",
        beschreibung:
          "Every product costed out on what is left after fees, FBA and cost of goods. More budget goes only to what turns a profit after that.",
      },
      account: {
        name: "Account Management",
        beschreibung:
          "Buy Box, inventory, account health and pricing, run like a department of your own. That gives you time for product and catalog.",
      },
      international: {
        name: "International Expansion",
        beschreibung:
          "Every marketplace is its own market. Its own keyword research, its own content and its own campaigns, built from scratch for each country.",
      },
    },

    bausteine: {
      knopf: "Book an account review",
      fallLesen: "Read the full case study",
      ausDerPraxis: "From our work",
      dasProblem: "The problem",
      unserAnsatz: "Our approach",
      vorherNachher: "Before / after",
      wasWirUebernehmen: "What we take on",
    },

    contentBand: {
      eyebrow: "What Amazon measures your listing by",
      titel: "Three numbers decide everything.",
      lead: "How often you are shown. How often you are clicked. How often you are bought. Every image and every sentence we write goes into one of these three numbers.",
      karten: [
        {
          titel: "Impression share",
          text: "How often you show up at all when somebody searches for your product.",
        },
        {
          titel: "Click-through rate",
          text: "How many of the people who see you click on your image.",
        },
        {
          titel: "Conversion rate",
          text: "How many of the people who click end up buying.",
        },
      ],
    },

    contentSchau: {
      eyebrow: "Content",
      titelVor: "Every element of your ",
      titelEm: "product page.",
      lead: "From the first image in the search results to the field only Amazon reads.",
      backend: "Backend",
      kacheln: [
        {
          kicker: "Main image",
          titel: "The click is decided in the search results.",
          text: "Next to three other results you have one second. The main image decides whether you are clicked.",
        },
        {
          kicker: "Listing",
          titel: "Seven images that tell one story.",
          text: "Size, use, material, what is in the box. Whoever scrolls through has no question left.",
        },
        {
          kicker: "A+ and Premium A+",
          titel: "The part below the bullets.",
          text: "Wide modules, one under the other. This is where you answer what the order otherwise fails on.",
        },
        {
          kicker: "Brand Story",
          titel: "One product becomes a brand.",
          text: "The band above the detail page leads to your other products instead of to the next seller.",
        },
        {
          kicker: "Title, bullets, backend",
          titel: "Getting found without a word salad.",
          text: "Written to read for people, clear enough for Rufus, COSMO and A10.",
        },
      ],
      merksatzVor: "As long as the listing does not sell on its own, ",
      merksatzMark: "every euro of advertising evaporates.",
    },

    budgetDiagramm: {
      eyebrow: "Where the same budget goes",
      ohneLabel: "Without a clean structure",
      ohneVerloren: "Clicks without an order",
      ohneVerkauf: "Sales",
      mitLabel: "How we build it",
      mitVerkauf: "Sales",
      mitTest: "Testing",
    },

    margenDiagramm: {
      eyebrow: "What is left of a sale",
      kosten: ["Cost of goods", "Amazon fees", "Shipping", "Advertising", "Profit"],
      produktA: "Product A",
      urteilA: "gets more budget",
      produktB: "Product B",
      urteilB: "is held",
    },

    weltkugel: {
      bildAlt:
        "A globe seen across the Atlantic. Germany, France, Italy, Spain, the Netherlands, Belgium, Poland, Sweden and the USA each carry a flag. Glowing lines run from Germany to all the other markets.",
      laender: [
        "Germany",
        "France",
        "Italy",
        "Spain",
        "Netherlands",
        "Belgium",
        "Poland",
        "Sweden",
        "USA",
      ],
    },

    strategie: {
      hero: {
        eyebrow: "Amazon strategy, built for you",
        titelVor: "The answers are already ",
        titelEm: "in your account.",
        lead: "Search Query report, advertising performance, sales and traffic. We evaluate the data you have long since paid for. Out of that comes the order of the next steps.",
        bildAlt: "The reports in the account turn into an order of steps",
      },
      problem: {
        titel: "Why nothing moves in the account.",
        punkte: [
          "The reports sit in the account, and nobody has evaluated them in a long time.",
          "Advertising is turned up before the listing converts.",
          "Margin is never costed out down to the single variation.",
          "There is no order: everything matters, nothing comes first.",
        ],
        bruecke:
          "Whoever does not evaluate the reports optimizes by taste. Over months that costs margin.",
      },
      inhalt: {
        eyebrow: "What is in it",
        titel: "From the analysis to a plan with an order.",
        karten: [
          {
            titel: "Analysis",
            unterzeile: "What the reports say",
            punkte: [
              "Which search terms you are found, clicked and bought on",
              "How many visitors each product gets and how many of them buy",
              "How your share of the market shifts over the months",
              "What every single variation earns after all fees",
            ],
          },
          {
            titel: "Strategy and plan",
            unterzeile: "What follows from it",
            punkte: [
              "Which products should grow and which are only held",
              "A target for ACoS and TACoS",
              "The order: what comes first, what after, what later",
            ],
          },
        ],
      },
      lieferung: {
        eyebrow: "What you hold afterwards",
        titel: "Two documents you can work with.",
        stuecke: [
          {
            kicker: "Document 1",
            titel: "Margin overview per item",
            punkte: [
              "Selling price, Amazon fees, FBA, cost of goods and advertising per variation",
              "What is left at the end, in euros and in percent",
              "Which items deserve growth and which are only held",
            ],
          },
          {
            kicker: "Document 2",
            titel: "Plan for the coming months",
            punkte: [
              "What comes first because it works fast, and what can wait",
              "Which items go into the first content sprint",
              "When campaigns come on top and with what target",
              "How deep we should go into the day-to-day, from watching to taking over",
              "Where inventory runs short before it slows the scaling down",
            ],
          },
        ],
      },
      ergebnis: {
        titel: "Vitaworld, Q1 2025 to Q1 2026",
        zeile: "Costed out first, scaled after: the ad budget rose 39 percent, revenue 147 percent.",
        werte: [
          { wert: "+147%", label: "Revenue", sub: "comparing the two quarters" },
          { wert: "−44%", label: "TACoS", sub: "while revenue grew" },
          {
            wert: "−19.4%",
            label: "Advertising's share of revenue",
            sub: "the growth comes organically",
          },
        ],
      },
      cta: "Do you know where your biggest opportunity is?",
    },

    content: {
      hero: {
        eyebrow: "Product Images & SEO",
        titelVor: "Content that turns clicks ",
        titelEm: "into buyers.",
        lead: "Main image, listing images, title, bullets and A+ content, built around the two numbers Amazon measures you by: click-through rate and conversion.",
        bildAlt: "A product page made of main image, text blocks and further images",
      },
      ansatz: {
        titel: "Good-looking content on its own sells nothing.",
        text: "We build every listing out of the data in your account: what people search for, where visitors drop off, where the competition passes you. Out of that come images and copy that sell and rank organically.",
        bildAlt: "Four search results side by side, one lit up, a rising curve above them",
      },
      vergleich: {
        titel: "What changes with strong content.",
        linksLabel: "Before working together",
        links: [
          "Traffic arrives, the order happens elsewhere",
          "The listing barely shows up in search",
          "Keywords without a system, rankings without a plan",
          "Ad budget runs onto pages that do not convert",
          "Policy violations put the account at risk",
        ],
        rechtsLabel: "How we work",
        rechts: [
          "Retail ready: the content holds before any budget moves",
          "Main image built for click-through rate, not picked by taste",
          "The keywords that actually lead to an order, taken deliberately",
          "A+ content answers the questions the order otherwise fails on",
          "Policy compliant, with no risk to the account",
        ],
      },
      ergebnis: {
        titel: "HaA, a launch over 17 weeks",
        zeile: "Started with no rankings and no reviews. The growth came from conversion, not from budget.",
        werte: [
          { wert: "+439%", label: "Conversion Rate", sub: "launch week to peak" },
          { wert: "×14", label: "Orders per week", sub: "over the same period" },
          { wert: "+46%", label: "Click-through rate", sub: "after a new main image" },
        ],
      },
      cta: "How much revenue are you losing to weak content?",
    },

    advertising: {
      hero: {
        eyebrow: "PPC Advertising",
        titelVor: "Scaling without losing ",
        titelEm: "the margin.",
        lead: "We cost every product out on what is left after fees, FBA and cost of goods. More budget goes only to what turns a profit after that.",
        bildAlt: "Budget goes where a profit is left after costs",
      },
      problem: {
        titel: "Where Amazon advertising burns money.",
        punkte: [
          "A large share of the budget goes to keywords that never turn profitable.",
          "Auto, phrase and exact campaigns bid against each other.",
          "Sponsored Products and Sponsored Brands compete for the same clicks.",
          "Nobody steers at product level, which means nobody steers on actual profit.",
          "Set up once, then left to itself.",
        ],
        bruecke: "Professional PPC starts with the structure, long before the first bid.",
      },
      ansatz: {
        titel: "More budget is not a strategy.",
        text: "Before a product gets more budget, we cost it out: goods, Amazon fees, shipping, advertising. What turns a profit after that, we scale. The rest is held.",
      },
      leistung: {
        titel: "From the margin calculation to the single bid.",
        karten: [
          {
            titel: "Cost it out first, then scale",
            text: "More budget goes only to what turns a profit after every cost.",
          },
          {
            titel: "Campaigns built cleanly",
            text: "Every campaign has one job. None bids against another.",
          },
          {
            titel: "Your brand defended",
            text: "Whoever searches your name lands with you, not with a competitor.",
          },
          {
            titel: "New search terms found continuously",
            text: "What sells moves into its own campaign. What does not, goes out.",
          },
          {
            titel: "Bids adjusted daily",
            text: "Matched to competition, season and placement, not once a month.",
          },
          {
            titel: "Advertising that pulls the ranking with it",
            text: "Measured on TACoS: what advertising costs against total revenue.",
          },
        ],
      },
      ergebnis: {
        titel: "FUTUM, the first full Amazon year",
        zeile: "Two product launches in an urgent-need niche, scaled profitably instead of buying growth.",
        werte: [
          { wert: "−19.7%", label: "ACoS", sub: "while scaling through the launch" },
          { wert: "80%", label: "organic sales", sub: "peak share of total revenue" },
          { wert: "+37.3%", label: "Conversion Rate", sub: "across the whole account" },
        ],
      },
      cta: "Where is your ad budget draining away?",
    },

    account: {
      hero: {
        eyebrow: "Account Management",
        titelVor: "You build the brand. The ",
        titelEm: "day-to-day is on us.",
        lead: "Buy Box, inventory, account health and pricing, run like a department of our own. That gives you time for product and catalog.",
        bildAlt: "The day-to-day run from a console",
      },
      problem: {
        titel: "Most people react once it is already burning.",
        punkte: [
          "Buy Box lost, often unnoticed for days.",
          "Inventory empty, rankings collapse.",
          "Performance drops and nobody sees why.",
          "A policy warning in the inbox, the account at risk.",
        ],
        bruecke: "We step in earlier, before it costs revenue.",
      },
      faelle: {
        eyebrow: "How we work",
        titel: "This is what keeps your account steady.",
        bildAlt: "Buy Box, inventory and account health side by side, a warning light on",
        stuecke: [
          {
            titel: "Buy Box gone, 9:40 in the morning",
            text: "Another seller undercuts you by 40 cents. We see it before noon, check the margin and decide with you: follow or sit it out.",
          },
          {
            titel: "18 days of inventory left before the season",
            text: "Resupply takes 6 weeks to reach the warehouse. We flag it before the item runs out and the ranking goes with it.",
          },
          {
            titel: "A policy warning in the inbox",
            text: "One attribute breaks a new requirement. We write the case, correct the listing and report back once it is settled.",
          },
        ],
      },
      aufgaben: {
        titel: "Eight tasks fewer on your desk.",
        liste: [
          {
            titel: "Buy Box monitoring",
            text: "A loss spotted at once, with its cause: price, availability, another seller.",
          },
          {
            titel: "Inventory and resupply",
            text: "Resupply planned so no bestseller runs out.",
          },
          {
            titel: "Cases and Amazon support",
            text: "We write the tickets, stay on them and escalate when nothing happens.",
          },
          {
            titel: "Creating and maintaining products",
            text: "New items, variations and flat file uploads, including the attributes almost nobody fills in.",
          },
          {
            titel: "Policies watched",
            text: "New Amazon requirements checked and applied before they turn into a warning.",
          },
          {
            titel: "Changes and tests",
            text: "Main image, title or price changed and measured against the period before, instead of by feel.",
          },
          {
            titel: "Pricing and margin",
            text: "Prices steered so growth does not eat the margin.",
          },
          {
            titel: "Fixed calls with you",
            text: "Regular, with clear next steps.",
          },
        ],
      },
      ergebnisBand: {
        badge: "We do the work",
        titel: "You get the results.",
        punkte: [
          "Buy Box losses settled the same day",
          "Resupply planned before inventory tips over",
          "A monthly report with clear next steps",
          "Requests to Amazon support run through us",
        ],
      },
      ergebnis: {
        titel: "A garden accessories brand, 2026 season",
        zeile: "Prepared back in the autumn, so April demand met an account that could carry it.",
        werte: [
          { wert: "−35%", label: "TACoS in the main market", sub: "across the season" },
          { wert: "+21%", label: "Conversion Rate", sub: "main market DE" },
          { wert: "+110%", label: "Clicks in Italy", sub: "with ACoS falling" },
        ],
      },
      cta: "Hand the day-to-day over to us.",
    },

    international: {
      hero: {
        eyebrow: "International Expansion",
        titelVor: "Every country searches ",
        titelEm: "differently.",
        lead: "What sells in Germany does not automatically sell in Italy. Different search terms, different prices, different competition. Every country gets its own research, its own content and its own campaigns.",
        bildAlt: "Every marketplace with its own structure around a shared core",
      },
      problem: {
        titel: "Why new marketplaces so often disappoint.",
        punkte: [
          "Listings get translated instead of written for the market.",
          "Every marketplace has its own search terms and buying habits.",
          "Campaigns from the home market are carried over one to one.",
          "Without local relevance, visibility and conversion do not follow.",
        ],
        bruecke:
          "Different buyers, different search terms, different competition. With us every country starts with its own research, not with a translation.",
      },
      vorgehen: {
        eyebrow: "How we work",
        titel: "What we build again for every marketplace.",
        karten: [
          {
            titel: "Its own keyword research",
            unterzeile: "Every market searches differently",
            text: "For every marketplace we research the search terms again instead of translating them from the home market.",
          },
          {
            titel: "Localized content",
            unterzeile: "Written for the market",
            text: "Main image, title, bullets and A+ content created again per marketplace, in its language and for its culture. Readable for Rufus and COSMO in that market.",
          },
          {
            titel: "Its own campaigns",
            unterzeile: "Steered locally",
            text: "Sponsored Products, Brands and Display set up again per marketplace and steered on the local TACoS.",
          },
          {
            titel: "Market by market",
            unterzeile: "The same full effort",
            text: "The complete work one marketplace gets, the next one gets too. No shortcuts.",
          },
        ],
      },
      karte: {
        eyebrow: "What it looks like",
        titel: "One account, every country built on its own.",
        text: "The home market stays the home market. Every further country gets the complete work all over again, instead of a translation of the first.",
      },
      ergebnis: {
        titel: "Miganeo, summer 2026",
        zeile: "Five marketplaces built in ten weeks, four loose campaigns became 120.",
        werte: [
          { wert: "×20", label: "Revenue abroad", sub: "€8,967 to €179,287" },
          { wert: "9.9%", label: "ACoS", sub: "€299,184 revenue on €29,490 spend" },
          {
            wert: "98.9%",
            label: "outside the brand's own name",
            sub: "newly won, not shifted around",
          },
        ],
      },
      vergleich: {
        titel: "Translated or localized.",
        linksLabel: "Only translated",
        links: [
          "Title translated word for word, missing the search terms",
          "The same keywords as in the home market",
          "Campaigns copied, budget with no local basis",
          "Conversion stays behind the home market",
        ],
        rechtsLabel: "Localized",
        rechts: [
          "Content written again per market, for click-through rate and conversion",
          "Its own keyword research per marketplace",
          "Campaigns set up locally and steered on TACoS",
          "Profitable growth on every new marketplace",
        ],
      },
      cta: "Which market is your next one?",
    },
  },

  fullService: {
    meta: {
      titel: "Full Service · temoa",
      beschreibung:
        "Strategy, content, advertising, account management and new marketplaces for your Amazon account. Five areas, one team, all working from the same numbers.",
    },

    kopf: {
      eyebrow: "Amazon Full Service",
      titelVor: "One team that works together on your ",
      titelMark: "entire Amazon account.",
      lead: "We take on your Amazon account completely, from the analysis to the day-to-day. For every area you get somebody who does it full time.",
      bildAlt: "Five workstations on a platform, all connected to one shared evaluation",
    },

    fuerWen: {
      label: "Who we work with",
      titel: "Is this a fit for your brand?",
      punkte: [
        "Your own brand, from €50,000 revenue a month",
        "Strong products, but little Amazon knowledge in house",
        "The catalog grows faster than the team",
        "Several hundred items across several marketplaces",
      ],
    },

    nichtFuerWen: {
      label: "When it is not a fit",
      titelVor: "And when we ",
      titelMark: "say no.",
      lead: "Four cases where we say in the first call that it makes no sense. Better now than after four months.",
      karten: [
        {
          titel: "You want revenue whatever it costs",
          text: "We can turn campaigns up until the number looks right. We are able to do that, and at the end of the year you have nothing from it.",
        },
        {
          titel: "The listing has to stay as it is",
          text: "If images and copy cannot be touched, only advertising is left. Then clicks get more expensive every year and the margin gets tighter.",
        },
        {
          titel: "You are looking for the cheapest provider",
          text: "Staffing five areas full time costs money. Below €50,000 monthly revenue on Amazon it does not pay off for you.",
        },
        {
          titel: "Decisions take months with you",
          text: "A main image approved in March no longer sells in the season. We need one contact who is allowed to decide.",
        },
      ],
    },

    ausgangslage: {
      label: "The starting point",
      titel: "Why the usual answers fail on Amazon.",
      karten: [
        {
          titel: "The in-house team is too small",
          text: "One person cannot cover strategy, content, advertising and operations at the depth each of them needs.",
        },
        {
          titel: "Separate providers, separate views",
          text: "One steers PPC on ad spend alone, another writes content without looking at inventory. Nobody owns the strategy as a whole.",
        },
        {
          titel: "Amazon is a full-time job",
          text: "20 to 40 hours a week on a platform that keeps changing.",
        },
      ],
      schluss:
        "What hurts is not visible in the account: the search term you never showed up on, and the competitor who took the place from you.",
    },

    bereiche: {
      label: "What we take on",
      titel: "Five areas, each one in full depth.",
      liste: [
        {
          bereich: "Strategy",
          titel: "We read your market down to the single search term.",
          zeile: "Before anything is optimized, it is clear where your revenue sits and which targets are realistic.",
          punkte: [
            "Which search terms bring you revenue and which only cost money",
            "Where you stand in the market, month by month",
            "What is left on every variation after all fees",
          ],
        },
        {
          bereich: "Product Images & SEO",
          titel: "A listing that sells without advertising too.",
          zeile: "Visibility turns into clicks, clicks into orders, until the listing is retail ready.",
          punkte: [
            "The main image first: it decides whether you are clicked in the search results",
            "All product images, A+ through Premium A+ content, brand store and brand story",
            "Title, bullets and the fields in the background, clear enough for Rufus and COSMO",
          ],
        },
        {
          bereich: "PPC Advertising",
          titel: "Clean campaigns, steered on TACoS.",
          zeile: "Once the listing sells organically, PPC adds revenue you can plan with.",
          punkte: [
            "Every campaign with one clear job, none bidding against another",
            "Bids and placements steered separately, top of search deliberately",
            "More expensive on purpose while building new search terms, then back to profit",
          ],
        },
        {
          bereich: "Account Management",
          titel: "Steady operations, protected rankings.",
          zeile: "The operational side, where one mistake costs visibility you built up.",
          punkte: [
            "Buy Box gone? We see it the same day, with its cause",
            "Resupply planned so no bestseller runs out and rankings tip over",
            "Account health watched, cases go to Amazon support through us",
            "Prices steered so growth does not eat the margin",
          ],
        },
        {
          bereich: "International Expansion",
          titel: "Every new marketplace built from the ground up.",
          zeile: "The complete service on further Amazon marketplaces, done again for each market.",
          punkte: [
            "Its own keyword research per marketplace",
            "Content and campaigns set up again for every market",
            "Localize instead of translate",
          ],
        },
      ],
    },

    reporting: {
      label: "Always included",
      titel: "Reporting you understand in five minutes.",
      lead: "No data export for you to evaluate yourself. You get the numbers that matter, and our reading of them.",
      bildAlt: "A floating dashboard with a rising curve, bars and two metric cards.",
      punkte: [
        {
          titel: "What the month brought in",
          text: "Revenue, contribution margin and TACoS per product group, against the month before and against last year.",
        },
        {
          titel: "What caused it",
          text: "Which change caused which swing, and what the competition did over the same period.",
        },
        {
          titel: "What comes next",
          text: "The three moves for the coming month, with the expected effect and what we need from you for them.",
        },
      ],
    },

    unterschied: {
      label: "Working together",
      titelVor: "You get ",
      titelMark: "one team,",
      titelNach: " not three companies.",
      punkte: [
        "One contact for all five areas, not three providers",
        "What stands out in the numbers is changed in the listing the same week",
        "One number holds for everyone: what a product earns is not three different figures",
        "If something goes wrong, it is us. Nobody points at anybody else.",
      ],
    },

    zusammenlauf: {
      bereiche: ["Strategy", "Images", "PPC", "Countries"],
      quelle: "Revenue, margin, TACoS",
      band: "Account Management",
      bandZeile: "Every day, from the first to the last",
    },

    onboarding: {
      label: "The first three weeks",
      titelVor: "From the call to ",
      titelEm: "the first optimization.",
      lead: "No three-day kickoff workshop. You give us access, we get started.",
      schritte: [
        {
          schritt: "Day 0",
          titel: "The call",
          text: "30 minutes with Clemens to get to know each other. If it fits, a second call follows with your numbers.",
        },
        {
          schritt: "Day 1",
          titel: "Access and channel",
          text: "You invite us into Seller Central, we open a shared Slack channel and a drive for all files.",
        },
        {
          schritt: "Week 1",
          titel: "The analysis",
          text: "We cost every product out and set the order. Depending on the size of the catalog that takes up to two weeks. You get the result as a plan, not as a file.",
        },
        {
          schritt: "Week 2 to 3",
          titel: "The work runs",
          text: "A content sprint for the first items, campaigns get rebuilt. From here you see every week what happened.",
        },
      ],
    },

    cta: "Which area is holding your growth back?",
  },

};
