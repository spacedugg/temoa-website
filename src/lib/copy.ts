import type { Block } from "@/components/sections/Blocks";

/* Alle Texte stammen aus der abgestimmten Copywriting-Datei (docs/copy-final.md, Stand 2026-06-17). */

export type Hero = { eyebrow: string; lead: string; accent: string; sub: string; chips?: string[] };

/* Preis-Schwellen (ICP-Filter). null = „individuelles Angebot". */
export const pricing: Record<string, string | null> = {
  "full-service": "3.500 €",
  "listing-seo": "3.000 €",
  "ppc-advertising": "2.500 €",
  strategie: null,
  "account-management": null,
  internationalisierung: null,
};

/* Fünf Leistungen: vier Kernleistungen + Internationalisierung als Erweiterung. */
export const services = [
  { slug: "strategie", label: "Strategie", href: "/leistungen/strategie", core: true },
  { slug: "listing-seo", label: "Listing & SEO", href: "/leistungen/listing-seo", core: true },
  { slug: "ppc-advertising", label: "PPC Advertising", href: "/leistungen/ppc-advertising", core: true },
  { slug: "account-management", label: "Account Management", href: "/leistungen/account-management", core: true },
  { slug: "internationalisierung", label: "Internationalisierung", href: "/leistungen/internationalisierung", core: false },
];

/* „Weitere Leistungen" am Seitenende: die anderen Services + Full Service 360°. */
function weitere(slug: string, title = "Alles greift ineinander."): Block {
  return {
    kind: "bridge",
    eyebrow: "Weitere Leistungen",
    title,
    links: [
      ...services.filter((s) => s.slug !== slug).map((s) => ({ label: s.label, href: s.href })),
      { label: "Full Service 360°", href: "/full-service", body: "Alle Leistungen kombiniert" },
    ],
  };
}

/* ---------------- FULL SERVICE (Übersicht) ---------------- */
export const fullService = {
  hero: {
    eyebrow: "Full-Service Amazon-Management",
    lead: "Ihr führt die Marke.",
    accent: "Wir führen das Konto.",
    sub: "Das Tagesgeschäft auf Amazon füllt schnell eine ganze Woche – PPC, Inventarplanung, Listing-Pflege, Compliance. Wir übernehmen euren kompletten Account mit einem eingespielten Team, damit ihr wieder an eurer Marke arbeitet statt im Seller Central.",
    chips: ["Ein Team", "Ein Vertrag", "Auf Marge gesteuert", "5+ Marktplätze"],
  } as Hero,
  blocks: [
    {
      kind: "numbered",
      eyebrow: "Für wen wir arbeiten",
      title: "Full Service ist gemacht für …",
      items: [
        { n: "01", title: "Etablierte Marken, 50–500k €/Monat", body: "Ihr habt ein laufendes Geschäft auf Amazon – jetzt geht es um Profitabilität und Skalierung." },
        { n: "02", title: "Teams, die im Tagesgeschäft feststecken", body: "Listing-Pflege, Kampagnen und Cases fressen die Zeit für strategisches Wachstum." },
        { n: "03", title: "Umsatz wächst nur über mehr Ad-Spend", body: "Skalierung wird zunehmend unprofitabel – der organische Hebel fehlt." },
        { n: "04", title: "Marken, die international wachsen wollen", body: "Ein Setup, sauber auf weitere Marktplätze ausgerollt – nativ statt übersetzt." },
      ],
    },
    {
      kind: "numbered",
      eyebrow: "Das System",
      title: "So bauen die Leistungen aufeinander auf.",
      description: "Full Service ist keine Liste von Einzelaufgaben, sondern ein System mit klarer Statik: ein Fundament, darauf die Wachstumshebel, außen herum die Klammer.",
      items: [
        { n: "01", title: "Fundament: Strategie", body: "Sortiment, Marge und Preis – durchgerechnet, bevor irgendwo investiert wird." },
        { n: "02", title: "Conversion: Listing & SEO", body: "Bilder, A+ und Keywords, die aus Besuchern Käufer machen – und organisch ranken, ohne pro Klick zu kosten." },
        { n: "03", title: "Skalierung: PPC & International", body: "Erst auf konvertierenden Listings drehen wir die Ads auf – und rollen das Setup auf neue Märkte aus." },
        { n: "04", title: "Klammer: Account Management", body: "Bestand, Buy-Box, Compliance und Reporting halten den Betrieb zusammen – keine Stufe, sondern die Klammer um alles." },
      ],
    },
    {
      kind: "compare",
      eyebrow: "Das Problem",
      title: "Selbst machen kostet mehr, als ihr denkt.",
      description:
        "Amazon professionell zu führen heißt 20–40 Stunden pro Woche für Listings, Kampagnen, Forecasting und Cases. Wer mitten im Tagesgeschäft steckt, kommt nicht zur Optimierung. Ein internes Team kostet schnell 15.000–30.000 €+ pro Monat – oder ihr macht weiter selbst: zeitintensiv, mit hohem Risiko teurer Fehler.",
      left: { label: "Internes Team aufbauen", value: "15–30k €", points: ["pro Monat an Gehältern", "20–40 Std./Woche Aufwand", "Hohes Risiko teurer Fehler", "Wissen geht, wenn Personen gehen"] },
      right: { label: "Mit TEMOA", value: "Ein eingespieltes Team", points: ["Hat es hunderte Male gemacht", "Ein Vertrag statt mehrerer Dienstleister", "Auf Marge gesteuert, planbar skaliert", "Deutlich unter den Kosten eines eigenen Teams"] },
    },
    {
      kind: "rows",
      eyebrow: "Alle Leistungen aus einer Hand",
      title: "Strategie, Content, Advertising und Betrieb – ineinander verzahnt.",
      items: [
        { kicker: "Strategie", title: "Erst wird gerechnet, dann investiert.", body: "Wettbewerbs- und Keyword-Analyse, Margenkalkulation, Preisstrategie und KPI-Steuerung. Wir wissen, wer wofür rankt – und wo euer Hebel liegt.", icon: "strategy", visual: "benchmark", cta: { label: "Mehr zur Strategie", href: "/leistungen/strategie" } },
        { kicker: "Content", title: "Listings, die aus Klicks Käufer machen.", body: "Hauptbilder, Galerie, A+ und Premium A+, SEO-Texte und Backend-Keywords – optimiert für echte Käufer und für Rufus, COSMO und A10.", icon: "content", visual: "serp", cta: { label: "Mehr zur Listing-Optimierung", href: "/leistungen/listing-seo" } },
        { kicker: "Advertising", title: "PPC, das auf Marge gerechnet wird.", body: "Komplette Kampagnenarchitektur, Bid-Management, Budget-Allokation und Reporting – Sponsored Products, Brands und Display. Streuverluste runter, Return on Ad Spend rauf.", icon: "ads", visual: "funnel", cta: { label: "Mehr zu unserem Advertising", href: "/leistungen/ppc-advertising" } },
        { kicker: "Account Management", title: "Euer Konto läuft – ohne dass ihr ran müsst.", body: "Inventar-Forecasting und FBA-Planung, Buy-Box- und Pricing-Monitoring, Case-Management und Reporting. Ein fester Ansprechpartner statt Ticketsystem.", icon: "account", visual: "dashboard", cta: { label: "Mehr zum Account Management", href: "/leistungen/account-management" } },
        { kicker: "Erweiterung", title: "Internationalisierung – fünf Marktplätze.", body: "Euer erprobtes Setup nativ auf neue Märkte ausgerollt – lokalisiert statt nur übersetzt, zentral gesteuert. Als Erweiterung zu den vier Kernleistungen.", icon: "globe", visual: "markets", cta: { label: "Mehr zur Internationalisierung", href: "/leistungen/internationalisierung" } },
      ],
    },
    {
      kind: "checklist",
      eyebrow: "Alle Leistungen im Überblick",
      title: "Was in Full Service enthalten ist.",
      description: "Vier Bereiche, ein Team, ein Vertrag – jede Leistung aufgeschlüsselt, damit ihr genau seht, was abgedeckt ist.",
      groups: [
        { title: "Strategie", items: ["Wettbewerbs- & Keyword-Analyse", "Margenkalkulation", "Preisstrategie", "KPI-Steuerung & Zielmarken", "Wachstums-Roadmap"] },
        { title: "Content", items: ["Hauptbilder & Galeriebilder", "A+ / Premium A+", "Listing-Texte (Titel, Bullets, Beschreibung)", "SEO & Backend-Keywords", "Brand Store & Brand Story", "A/B-Tests"] },
        { title: "Advertising", items: ["Sponsored Products & Brands", "Sponsored Display", "Sponsored Brands Video", "Bid- & Budget-Management", "Keyword- & Wettbewerbsanalyse"] },
        { title: "Account Management", items: ["Inventar-Management & FBA-Forecasting", "Buy-Box-Monitoring", "Case-Management", "Compliance & Account-Health", "Performance-Reports"] },
      ],
    },
    {
      kind: "callout",
      eyebrow: "Übergreifend",
      title: "Analytics & Reporting, das Entscheidungen trägt.",
      body: "Monatliche Reports und Live-Dashboards über alle Bereiche – Zahlen, die wir in konkrete nächste Schritte übersetzen, statt euch mit Rohdaten allein zu lassen.",
    },
    {
      kind: "compare",
      eyebrow: "Aus der Praxis",
      title: "Wie sich das Bild verändern kann.",
      description: "Ein Beispiel aus einem Kundenprojekt – kein Versprechen, sondern ein ehrliches Bild unserer Arbeitsweise: erst das Fundament, dann skalieren.",
      left: { label: "Vorher", value: "Wachstum nur über Ad-Spend", points: ["Umsatz wächst nur gegen mehr Budget", "Werbung trägt, statt zu verstärken", "Performance je Marktplatz uneinheitlich"] },
      right: { label: "Nach dem Umbau", value: "Organic First, profitabel skaliert", points: ["ROAS 4,8×", "−35 % TACoS", "4 Marktplätze, ein Reporting"] },
    },
    {
      kind: "grid",
      eyebrow: "Warum Full Service",
      title: "Alles aus einer Hand – mehr als die Summe der Teile.",
      description: "Einzelne Dienstleister lösen immer nur die Hälfte. Wer Strategie, Content, Advertising und Betrieb verteilt, kämpft mit Lücken zwischen den Gewerken – und am Ende mit verbranntem Budget.",
      items: [
        { title: "Profitabilität vor Umsatz", body: "Wir steuern auf Marge und TACoS – nicht auf Umsatz, der die Marge auffrisst.", icon: "margin" },
        { title: "Ein abgestimmtes System", body: "Strategie, Content, Ads und Betrieb greifen ineinander statt gegeneinander.", icon: "puzzle" },
        { title: "Organic First als Fundament", body: "Erst trägt das Listing, dann skalieren die Ads – planbares Wachstum.", icon: "layers" },
        { title: "Optimiert für Rufus & COSMO", body: "Content für die KI-Suche von morgen – nicht für den Algorithmus von gestern.", icon: "spark" },
      ],
    },
    {
      kind: "qa",
      eyebrow: "Häufige Fragen",
      title: "Full Service – ehrlich beantwortet.",
      items: [
        { q: "Wie viel Aufwand ist die Übergabe für uns?", a: "Wenige Stunden, verteilt über die ersten Wochen: Zugänge, ein Kickoff-Termin, offene Fragen zu Sortiment und Lieferkette. Wir arbeiten mit einer festen Onboarding-Checkliste – ihr müsst nichts vorbereiten, was wir nicht konkret anfragen. Im laufenden Betrieb bleiben rund 2–4 Stunden pro Monat für Calls und Reviews." },
        { q: "Was bleibt bei euch, was liegt bei uns?", a: "Wir verantworten den Betrieb – Strategie, Content, Advertising und Account-Management. Bei euch bleiben die Entscheidungen, die nur ihr treffen könnt: Sortiment, Lieferkette, Preis-Leitplanken und Markenführung. Konto, Kampagnen und Daten gehören immer euch." },
        { q: "Wie schnell sehen wir Ergebnisse?", a: "In den ersten 30–60 Tagen die schnellen Hebel: Streuverluste raus, offene Optimierungen umgesetzt. Nach 60–90 Tagen greifen Rankings und Effizienz spürbar. Die eigentliche Transformation – nachhaltiges, profitables Wachstum – braucht 6–12 Monate." },
        { q: "Warum nicht einfach intern aufbauen?", a: "Ein internes Team mit derselben Abdeckung kostet schnell mehrere Vollzeitstellen – plus Tools, Einarbeitung und das Risiko, dass Wissen mit Personen geht. Ihr bekommt bei uns Spezialisten für jeden Hebel, ohne selbst einstellen, einarbeiten und halten zu müssen." },
        { q: "Wie sicher ist der Zugriff auf unser Konto?", a: "Wir arbeiten als Benutzer in eurem Seller Central, mit den Rechten, die für die Betreuung nötig sind. Ihr behaltet die volle Kontrolle und könnt den Zugriff jederzeit entziehen." },
        { q: "Wie lange bindet uns ein Vertrag?", a: "Quartalsweise kündbar – keine Jahresbindung, keine Ausstiegsgebühren. 98 % unserer Kunden bleiben, aber sie bleiben wegen der Ergebnisse, nicht wegen der Paragrafen." },
        { q: "Für wen lohnt sich Full Service nicht?", a: "Unter etwa 50.000 € Monatsumsatz auf Amazon steht unser Honorar in keinem guten Verhältnis zum Hebel – das sagen wir im ersten Gespräch ehrlich. Und wenn ihr nur eine Einzelleistung sucht, etwa reines Kampagnenmanagement, ist eine unserer Einzelleistungen der bessere Weg." },
      ],
    },
    {
      kind: "bridge",
      eyebrow: "Einzelne Leistungen im Detail",
      title: "Lieber tiefer einsteigen?",
      links: services.map((s) => ({ label: s.label, href: s.href })),
    },
  ] as Block[],
};

/* ---------------- SERVICE-DETAILSEITEN ---------------- */
export const serviceDetails: Record<string, { nav: string; hero: Hero; blocks: Block[] }> = {
  strategie: {
    nav: "Strategie",
    hero: {
      eyebrow: "Strategie",
      lead: "Erst wird gerechnet.",
      accent: "Dann investiert.",
      sub: "Wettbewerb, Keywords, Margen und KPIs – wir bauen das Fundament, auf dem Content und Advertising erst profitabel werden. Bevor irgendwo investiert wird, ist klar, welche Produkte das Wachstum tragen und welcher Preis verteidigbar ist.",
      chips: ["Wettbewerbsanalyse", "Margenkalkulation", "KPI-Steuerung", "Roadmap"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Analyse", title: "Wir sehen, wo eure echten Chancen liegen.", body: "Wer rankt wofür, zu welchem Preis – und auf welchen Begriffen ihr mit überschaubarem Aufwand nach oben kommt. Statt Bauchgefühl ein klares Bild eurer Position im Wettbewerb. Genau diese Keyword-Lücken werden später zur Roadmap für Content und Advertising.", icon: "search", visual: "serp" },
          { kicker: "Share of Voice", title: "Der Abstand ist kein Problem. Er ist euer Potenzial.", body: "Eure Sichtbarkeit gegen die fünf stärksten Wettbewerber – plus CTR- und CVR-Vergleich je ASIN. Was die anderen vor euch holen, ist genau das, was noch in eurem Konto steckt.", icon: "chart", visual: "benchmark" },
          { kicker: "Marge & Preis", title: "Wachstum ist erst dann gut, wenn es profitabel ist.", body: "Wir rechnen jede Maßnahme bis auf den Deckungsbeitrag durch: Amazon-Gebühren, FBA, Wareneinsatz und Werbekosten. Daraus entstehen Preis-Korridore, die Marge und Buy-Box gleichzeitig schützen. So skaliert ihr Umsatz, ohne dass die Profitabilität still und leise verschwindet.", icon: "margin", visual: "donut" },
          { kicker: "KPI-Steuerung", title: "Klare Zielmarken – und ein Plan dorthin.", body: "Wir definieren Zielwerte für TACoS, ACoS und Profitabilität und steuern Monat für Monat dagegen. Daraus wird eine priorisierte Roadmap, in der jeder Schritt einen erwarteten Umsatz-Impact hat.", icon: "target", visual: "kpis", bullets: ["14 % TACoS-Ziel", "Monatlicher Review-Takt", "Roadmap nach Umsatz-Impact"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Von null auf Zielbild – in drei bis vier Wochen.",
        items: [
          { n: "1", title: "Audit & Analyse", body: "Margen, Keywords und Wettbewerb auf den Tisch – Status quo schwarz auf weiß." },
          { n: "2", title: "Zielbild & KPIs", body: "Klare Zielmarken für Umsatz, Marge und Effizienz." },
          { n: "3", title: "Roadmap", body: "Priorisierte Maßnahmen nach Umsatz-Impact." },
          { n: "4", title: "Laufende Steuerung", body: "Monatliche Reviews, nachjustieren gegen die Ziele." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Häufige Fragen",
        title: "Strategie – ehrlich beantwortet.",
        items: [
          { q: "Bekommen wir nur eine Folienpräsentation?", a: "Nein. Ihr bekommt eine durchgerechnete Roadmap: Margen je Produkt, Keyword-Lücken, Preis-Korridore und priorisierte Maßnahmen mit erwartetem Umsatz-Impact – keine Folienshow, sondern ein Arbeitsplan." },
          { q: "Wie lange dauert die Strategiephase?", a: "In der Regel drei bis vier Wochen von Lesezugriff bis fertigem Zielbild. Danach steuern wir die KPIs monatlich nach." },
          { q: "Was ist ein realistisches TACoS-Ziel?", a: "Das hängt von Kategorie, Marge und Wettbewerb ab – eine pauschale Zahl wäre unseriös. Als Orientierung arbeiten wir oft auf einen TACoS-Korridor um 14 % hin und leiten den Zielwert aus eurer konkreten Marge ab." },
          { q: "Können wir Strategie ohne den Rest buchen?", a: "Ja. Strategie ist als Einzelleistung möglich – das Angebot stellen wir individuell zusammen. Den größten Hebel entfaltet sie, wenn Content und Advertising direkt auf der Roadmap aufsetzen." },
        ],
      },
      weitere("strategie", "Die Strategie ist der Plan. Das hier ist die Umsetzung."),
    ],
  },

  "listing-seo": {
    nav: "Listing & SEO",
    hero: {
      eyebrow: "Content",
      lead: "Euer bester Verkäufer",
      accent: "schläft nie.",
      sub: "Euer Listing verkauft rund um die Uhr – wenn es gut ist. Wir bauen es für echte Käufer und für die KI-Suche von Rufus, COSMO und A10: Bilder, A+ und Keywords, die aus Klicks zahlende Käufer machen.",
      chips: ["Hauptbild & Galerie", "A+ / Premium A+", "SEO & Backend", "Brand Store"],
    },
    blocks: [
      {
        kind: "callout",
        eyebrow: "Warum Listings unterperformen",
        title: "Steht euer Produkt auf Seite 10?",
        body: "Dann liegt es selten am Produkt – meist am Listing. Amazon zieht über 750 Datenfelder für Ranking und Conversion heran; die meisten Seller optimieren keine 10 % davon. Genau dort liegt der Umsatz, den ihr gerade an besser optimierte Wettbewerber verliert.",
      },
      {
        kind: "grid",
        eyebrow: "Was wir machen",
        title: "Vom ersten Klick bis zum Kauf.",
        items: [
          { title: "Hauptbild & Galerie", body: "Bilder, die in Sekunden den Klick gewinnen – mit USP, Maßstab und Lifestyle.", icon: "content" },
          { title: "A+ & Premium A+", body: "Markenwelt und Module, die Vertrauen schaffen und den Warenkorb heben.", icon: "layers" },
          { title: "Listing-Texte", body: "Titel, Bullets und Beschreibung – klar, relevant und konversionsstark.", icon: "search" },
          { title: "SEO & Backend-Keywords", body: "Relevante Begriffe im Listing und Backend – für Rufus, COSMO & A10.", icon: "target" },
          { title: "Brand Store & Brand Story", body: "Eine konsistente Markenwelt über alle ASINs – CI-konform aufgebaut.", icon: "globe" },
          { title: "A/B-Tests", body: "Bilder und Texte gegeneinander getestet – Entscheidungen mit Daten, nicht mit Bauchgefühl.", icon: "chart" },
        ],
      },
      {
        kind: "rows",
        items: [
          { kicker: "750+ Datenfelder", title: "Was Amazon wirklich betrachtet.", body: "Ranking entsteht aus weit mehr als Titel und Bild. Wir optimieren alle drei Ebenen: das Offensichtliche (Titel, Bullets, Hauptbild), das Verborgene (Backend-Keywords, Browse-Nodes, Attribute) und das Strategische (Kategorie, Varianten, Suchbegriff-Beziehungen) – nicht nur das, was jeder sieht.", icon: "layers", visual: "fields" },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Typische Schwachstellen",
        title: "Wo Listings Umsatz liegen lassen.",
        cols: 2,
        items: [
          { title: "Hauptbild ohne USP", body: "Austauschbar statt klickstark – der erste Eindruck verpufft.", icon: "content" },
          { title: "Nur Basic-A+ oder Textwüsten", body: "Kein A+, irrelevante Module oder zusammengewürfelt statt geführt.", icon: "layers" },
          { title: "Titel & Bullets schwach", body: "Titel zu kurz, Bullets wie ein Datenblatt, keine Long-Tails.", icon: "search" },
          { title: "Kein Brand Store", body: "Keine Markenwelt, nicht alle ASINs, nicht CI-konform.", icon: "globe" },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Retail-ready in vier Schritten.",
        items: [
          { n: "01", title: "Retail-Readiness-Audit", body: "Wo Bilder, A+ und SEO heute Conversion kosten." },
          { n: "02", title: "Content-Konzept", body: "Bildsprache, A+-Story und Keyword-Architektur." },
          { n: "03", title: "Produktion", body: "Bilder, A+ und Texte aus einer Hand umgesetzt." },
          { n: "04", title: "SEO & A/B-Tests", body: "Feinschliff über Tests – laufend optimiert." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Häufige Fragen",
        title: "Listing & SEO – ehrlich beantwortet.",
        items: [
          { q: "Wie schnell wirkt eine Optimierung?", a: "Die Umsetzung (Recherche, Texte, Bilder) dauert meist ein bis zwei Wochen. Bis Amazon die Änderungen indexiert und sich Rankings und Conversion spürbar bewegen, rechnet mit 30–60 Tagen." },
          { q: "Könnt ihr Platz 1 garantieren?", a: "Nein – und keine seriöse Agentur kann das. Zu viele Faktoren liegen außerhalb unserer Kontrolle. Wir garantieren saubere Arbeit auf allen Ranking-Ebenen und machen jede Verbesserung an Daten fest, nicht an Versprechen." },
          { q: "Wie testet ihr, was wirklich besser konvertiert?", a: "Über A/B-Tests von Bildern, Titeln und A+-Modulen. Damit ein Ergebnis belastbar ist, lassen wir Tests mindestens rund 10 Wochen bzw. ab etwa 400 Produktseiten-Aufrufen laufen – sonst entscheidet der Zufall." },
          { q: "Schadet eine Überarbeitung dem bestehenden Ranking?", a: "Nicht, wenn sie sauber gemacht ist. Wir gehen schrittweise vor und beobachten die Wirkung, statt mit einem Schlag alles umzustellen." },
          { q: "Optimiert ihr auch internationale Listings?", a: "Ja – und zwar lokalisiert, nicht nur übersetzt. Jeder Marktplatz bekommt eigene Keyword-Recherche und nativ formulierten Content. Mehr dazu unter Internationalisierung." },
        ],
      },
      weitere("listing-seo"),
    ],
  },

  "ppc-advertising": {
    nav: "PPC Advertising",
    hero: {
      eyebrow: "Advertising",
      lead: "Ads als Verstärker.",
      accent: "Nicht als Lebenserhaltung.",
      sub: "Advertising ist meist der größte Posten im Budget. Wir senken Streuverluste und steigern den Return on Ad Spend – Werbung verstärkt, was organisch schon trägt, statt es zu ersetzen. Gesteuert auf TACoS, nicht auf Bruttoumsatz.",
      chips: ["Sponsored Products", "Sponsored Brands", "Sponsored Display", "Steuerung auf TACoS"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Architektur", title: "Jeder Euro hat eine Aufgabe.", body: "Sponsored Products, Brands und Display – sauber getrennt nach Ziel und Match-Typ. So sehen wir auf einen Blick, welche Kampagne erobert, welche verteidigt und welche skaliert. Keine Black-Box, in der gut und schlecht laufende Begriffe denselben Topf teilen.", icon: "ads", visual: "adformats" },
          { kicker: "Keyword-Harvesting", title: "Gewinner finden, Verlierer ausschließen.", body: "Auto-Kampagnen finden neue Suchbegriffe. Was konvertiert, wandert in eigene Performance-Kampagnen mit eigenem Gebot. Was nur Geld kostet, wird zum Negativ-Keyword. Dieser Kreislauf läuft wöchentlich – euer Konto wird mit jeder Woche effizienter.", icon: "target", visual: "harvest" },
          { kicker: "Effizienz", title: "Weniger Streuverlust, mehr Rendite.", body: "Wir senken den ACoS, ohne Umsatz abzuwürgen: bessere Begriffe, bessere Gebote, bessere Landing-Listings. Das Ergebnis ist ein ROAS, der planbar nach oben geht.", icon: "chart", visual: "funnel", bullets: ["−30 % ACoS", "4,8× ROAS", "Steuerung auf TACoS"] },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Kampagnen-Architektur",
        title: "Eine Struktur, in der nichts im selben Topf landet.",
        items: [
          { title: "Auto & Manual", body: "Auto-Kampagnen entdecken, manuelle Kampagnen skalieren – beide mit klarer Rolle.", icon: "target" },
          { title: "Match-Type-Strategie", body: "Exact, Phrase und Broad sauber getrennt – pro Begriff der passende Hebel.", icon: "search" },
          { title: "Sponsored Products", body: "Das Fundament: Platzierungen direkt in Suche und auf Produktseiten.", icon: "ads" },
          { title: "Sponsored Brands", body: "Markenbanner über den Ergebnissen – inkl. Video – für Sichtbarkeit und Marke.", icon: "content" },
          { title: "Sponsored Display", body: "Retargeting und gezielte Platzierung auf Wettbewerber-ASINs.", icon: "layers" },
          { title: "Brand-Defense & Segmentierung", body: "Eigene Markenbegriffe verteidigen, Kampagnen nach Produktlinie, Marge und Ziel trennen.", icon: "shield" },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Der Kreislauf",
        title: "Einmal aufsetzen reicht nicht. Wir takten.",
        description: "Performance entsteht durch Kadenz, nicht durch ein einmaliges Setup. Drei Takte, ein Ziel: jede Woche ein effizienteres Konto.",
        items: [
          { n: "01", title: "Täglich · Kontrolle", body: "Kampagnen im Blick – Probleme abfangen, bevor sie Budget kosten." },
          { n: "02", title: "Wöchentlich · Optimierung", body: "Gebote nachziehen, Budgets umschichten, Negativ-Keywords ergänzen, Gewinner migrieren." },
          { n: "03", title: "Monatlich · Strategie-Review", body: "Struktur, Ziele und Budget-Allokation auf den Prüfstand." },
          { n: "04", title: "Laufend · Skalieren", body: "Control → Dominate → Expand: Budget dorthin, wo der ROAS stimmt, dann neue Begriffe und Platzierungen erschließen." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Häufige Fragen",
        title: "PPC – ehrlich beantwortet.",
        items: [
          { q: "Warum nicht einfach das Budget erhöhen?", a: "Weil mehr Budget einen schwachen Hebel nur teurer macht. Ads bringen Besucher – verkaufen muss das Listing. Erst wenn Struktur, Begriffe und Conversion stimmen, bringt zusätzliches Budget zusätzlichen profitablen Umsatz." },
          { q: "Was ist ein guter TACoS?", a: "Es gibt keinen universellen Wert – er hängt von Marge, Kategorie und Phase ab. Wir steuern bewusst auf TACoS statt nur ACoS, weil TACoS auch den organischen Umsatz berücksichtigt. Den Zielwert leiten wir aus eurer konkreten Marge ab." },
          { q: "Warum TACoS statt ACoS?", a: "ACoS misst nur die Effizienz der Werbung für sich. TACoS setzt die Werbekosten ins Verhältnis zum gesamten Umsatz – inklusive organischer Verkäufe. Ein sinkender TACoS heißt: Werbung treibt paid und organisch effizient. Das ist echte Profitabilität." },
          { q: "Wie schnell sehen wir Ergebnisse?", a: "Erste Verbesserungen – weniger Streuverlust, sauberere Struktur – meist in 30–45 Tagen. Spürbare ACoS-Senkung und Wachstum in 60–90 Tagen. Die beste Performance entsteht über die Monate, weil der Harvesting-Kreislauf kompoundiert." },
          { q: "Braucht ihr eine lange Vertragslaufzeit?", a: "Nein. Quartalsweise kündbar. Wir empfehlen mindestens ein Quartal für eine faire Bewertung – danach bleibt ihr, wenn die Zahlen stimmen." },
        ],
      },
      weitere("ppc-advertising"),
    ],
  },

  "account-management": {
    nav: "Account Management",
    hero: {
      eyebrow: "Account Management",
      lead: "Der Betrieb, der euer Konto",
      accent: "ruhig hält.",
      sub: "Ein fester Ansprechpartner, der euer Konto kennt und proaktiv steuert: Bestände, Buy-Box, Compliance und Reporting im Blick – damit ihr euch aufs Wesentliche konzentriert. Menschen statt Ticketsystem.",
      chips: ["Inventarmanagement", "Buy-Box-Monitoring", "Compliance", "Reporting"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Inventar", title: "Bestand ist Ranking.", body: "Wir prognostizieren Nachfrage und setzen Reorder-Punkte, bevor der Bestand kritisch wird. Out-of-stock kostet Ranking – Überbestand bindet Kapital. Wir halten die Mitte. Ihr seht jederzeit, wann nachbestellt werden muss – ohne böse Überraschung.", icon: "layers", visual: "dashboard" },
          { kicker: "Buy-Box & Health", title: "Die Buy-Box verliert man leise.", body: "Preis, Verfügbarkeit und Versand steuern wir so, dass ihr die Buy-Box haltet – und überwachen Account-Health und Policy-Themen, bevor daraus eine Sperre wird. Fällt etwas auf, lösen wir es – nicht ihr.", icon: "shield", visual: "kpis" },
          { kicker: "Reporting", title: "Zahlen, die in Entscheidungen übersetzt sind.", body: "Monatliche Reports und Live-Dashboards – und ein fester Ansprechpartner, der sie mit euch durchgeht. Keine Rohdaten zum Selbstdeuten, sondern klare nächste Schritte.", icon: "chart", visual: "donut", bullets: ["1 fester Ansprechpartner", "Monatlich Report & Review", "100 % Transparenz"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Vier Routinen. Ein ruhiges Konto.",
        items: [
          { n: "1", title: "Onboarding & Setup", body: "Zugänge, Prozesse und Verantwortlichkeiten sauber aufgesetzt." },
          { n: "2", title: "Forecasting & Monitoring", body: "Bestände, Buy-Box und Pricing laufend im Blick." },
          { n: "3", title: "Compliance & Cases", body: "Account-Health proaktiv, Fälle schnell gelöst." },
          { n: "4", title: "Reporting & Reviews", body: "Monatliche Reports, regelmäßige Calls, Quartals-Review." },
        ],
      },
      {
        kind: "qa",
        eyebrow: "Häufige Fragen",
        title: "Account Management – ehrlich beantwortet.",
        items: [
          { q: "Bekommen wir einen festen Ansprechpartner oder ein Ticketsystem?", a: "Einen festen Ansprechpartner, der euer Konto kennt – erreichbar per Mail, Telefon und Video. Kein anonymes Support-Postfach, bei dem ihr jedes Mal von vorn erklärt." },
          { q: "Wie viel Zeit kostet uns das laufend?", a: "Wenig. Den Betrieb übernehmen wir; bei euch bleiben rund 2–4 Stunden pro Monat für Calls und Reviews – plus die Entscheidungen, die nur ihr treffen könnt." },
          { q: "Wie sicher ist der Zugriff auf unser Konto?", a: "Wir arbeiten als Benutzer in eurem Seller Central mit den Rechten, die für die Betreuung nötig sind. Ihr behaltet die volle Kontrolle und könnt den Zugriff jederzeit entziehen. Konto und Daten gehören immer euch." },
          { q: "Was passiert bei einer Sperre oder einem dringenden Case?", a: "Wir überwachen Account-Health und Policy-Themen proaktiv und greifen ein, bevor etwas eskaliert. Tritt ein Fall auf, übernehmen wir die Kommunikation mit Amazon – nicht ihr." },
          { q: "Lässt sich Account Management einzeln buchen?", a: "Ja – als Einzelleistung mit individuellem Angebot. Den größten Hebel entfaltet es im Zusammenspiel mit Strategie, Content und Advertising." },
        ],
      },
      weitere("account-management"),
    ],
  },

  internationalisierung: {
    nav: "Internationalisierung",
    hero: {
      eyebrow: "Internationalisierung",
      lead: "Übersetzen kann jeder.",
      accent: "Lokalisieren verkauft.",
      sub: "Wir übersetzen nicht, wir lokalisieren: Content, PPC und Account-Management nativ pro Marktplatz – lokal recherchiert, lokal formuliert, lokal optimiert. Und alles konsolidiert in einem Gesamtbild, damit ihr über alle Länder hinweg vergleichbare Zahlen habt.",
      chips: ["5+ Marktplätze", "Lokalisierte Listings", "Markt-Pricing", "PPC pro Land"],
    },
    blocks: [
      {
        kind: "rows",
        items: [
          { kicker: "Roll-out", title: "Ein Setup, Markt für Markt ausgerollt.", body: "Wir nehmen euer erprobtes Setup aus Deutschland und übertragen es strukturiert auf weitere Marktplätze – mit Markt-Analyse und lokaler Logistik. Ihr seht jederzeit, welcher Markt live ist und wie weit der nächste Launch ist.", icon: "globe", visual: "markets" },
          { kicker: "Lokalisieren statt übersetzen", title: "Wort für Wort übersetzt verkauft nicht.", body: "Eine reine Übersetzung trifft weder die Suchbegriffe noch den Ton im Zielmarkt. Wir recherchieren lokal, formulieren nativ und bauen Content, der dort rankt und konvertiert – nicht nur verstanden wird.", icon: "content", visual: "serp", bullets: ["Lokale Keyword-Recherche je Markt", "Nativ formuliert, nicht übersetzt", "4 Marktplätze (Case Gartenmarke)"] },
        ],
      },
      {
        kind: "numbered",
        eyebrow: "Unser Vorgehen",
        title: "Ein Playbook, mehrfach ausgerollt.",
        description: "Wir schärfen euer Best-Practice-Setup im Heimatmarkt und übertragen es strukturiert auf weitere Länder – nativ lokalisiert, zentral gesteuert.",
        items: [
          { n: "01", title: "Playbook (DE)", body: "Best-Practice-Setup im Heimatmarkt schärfen." },
          { n: "02", title: "Lokalisierung", body: "Listings, Keywords und Content nativ pro Markt." },
          { n: "03", title: "Roll-out", body: "Strukturierter Launch in FR, IT, ES und NL." },
          { n: "04", title: "Cross-Market-Steuerung", body: "Einheitliches Reporting über alle Märkte." },
        ],
      },
      {
        kind: "callout",
        eyebrow: "Fünf Marktplätze",
        title: "Fünf Märkte, zentral gesteuert, ein Reporting.",
        body: "DE, FR, IT, ES und NL – jeder Markt nativ lokalisiert, alle zusammen in einem konsolidierten Reporting. So vergleicht ihr Länder auf einer Datenbasis, statt fünf Insellösungen zu jonglieren.",
      },
      {
        kind: "qa",
        eyebrow: "Häufige Fragen",
        title: "Internationalisierung – ehrlich beantwortet.",
        items: [
          { q: "Reicht nicht eine gute Übersetzung?", a: "Nein. Eine Übersetzung trifft selten die Suchbegriffe und den Ton im Zielmarkt. Wir recherchieren je Land eigene Keywords und formulieren nativ – sonst rankt der Content nicht und konvertiert schlechter." },
          { q: "Welche Marktplätze deckt ihr ab?", a: "Die fünf großen EU-Marktplätze: Deutschland, Frankreich, Italien, Spanien und die Niederlande – zentral gesteuert, mit einem gemeinsamen Reporting." },
          { q: "Wie lange dauert ein Markt-Launch?", a: "Das hängt von Sortiment und Logistik ab. Weil wir euer erprobtes DE-Setup als Playbook nutzen, läuft jeder weitere Markt strukturiert und schneller als der erste – den konkreten Fahrplan legen wir im Projekt fest." },
          { q: "Müssen wir vorher in Deutschland stark sein?", a: "Es hilft. Ein im Heimatmarkt geschärftes Setup ist die Vorlage, die wir ausrollen. Steht dieses Fundament noch nicht, beginnen wir dort – sonst skaliert ihr Schwächen mit." },
        ],
      },
      weitere("internationalisierung"),
    ],
  },
};

/* ---------------- CASE STUDIES ---------------- */
export const caseStudies = [
  {
    brand: "FUTUM",
    sector: "Schädlingsbekämpfung · DE",
    metric: "80 %",
    metricLabel: "organische Verkäufe im Peak",
    ausgangslage: "Starke Abhängigkeit von Paid-Traffic, dünner organischer Anteil und ein ACoS, der die Marge auffraß.",
    quote: "Wir verkaufen heute überwiegend organisch – Werbung ist Kür, nicht Pflicht.",
    color: "#FF9900",
  },
  {
    brand: "HaA",
    sector: "Küche & Haushalt · DE",
    metric: "+439 %",
    metricLabel: "Conversion-Steigerung in 17 Wochen",
    ausgangslage: "Hohe Werbeausgaben bei stagnierendem Umsatz, schwache Listings und kein klares KPI-Bild. Das Konto wuchs nicht – es wurde nur teurer.",
    quote: "Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig.",
    color: "#FF3131",
  },
  {
    brand: "Gartenmarke",
    sector: "Garten · DE/IT/FR/ES",
    metric: "−35 %",
    metricLabel: "TACoS – über vier Marktplätze",
    ausgangslage: "Internationale Expansion ohne lokalisierte Listings, inkonsistente Performance je Marktplatz und kein einheitliches Reporting.",
    quote: "Ein System, vier Länder – endlich vergleichbare Zahlen und planbares Wachstum.",
    color: "#0E7CA0",
  },
];
