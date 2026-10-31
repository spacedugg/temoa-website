"use client";

import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { CookieEinstellungen } from "../consent/CookieEinstellungen";
import { Sprachumschalter } from "../i18n/Sprachumschalter";
import { Bewertungsband } from "../ui/Bewertungsband";
import { pfad, spracheAusPfad, STANDARD, type Sprache } from "@/lib/i18n";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

import { blogTopics } from "@/lib/blog-topics";

type Rahmen = (typeof rahmenWoerter)[Sprache];

/* ============================================================
   Fußzeile.

   Drei Bänder, jedes eine Zeile hoch.

     1. Der Kontakt: Adresse links, Knopf rechts, auf einer Linie.
     2. Kennung und Bewertungen links, daneben die drei Verzeichnisse.
     3. Baujahr links, Sprachumschalter rechts.

   Drei Fassungen liegen dahinter. Erst stand der Kontakt als vierte Spalte
   zwischen „Unternehmen" und „Rechtliches" und fiel nicht auf, obwohl er das
   ist, wofür die meisten hier herunterscrollen. Dann bekam er ein eigenes Band,
   aber als hohe Spalte rechts: Adresse, Knopf und Bewertungen untereinander.
   Links stand daneben nur die Kennung. Die Fußzeile kippte damit nach rechts.

   Jetzt läuft der Kontakt in der Breite statt in der Höhe. Damit wird das erste
   Band flach. Die Bewertungen ziehen zur Kennung, die Verzeichnisse rücken
   nach oben neben sie.

   Eine Telefonnummer steht bewusst nicht dabei, die gibt der Kunde später
   frei. Und nur eine Adresse: zwei nebeneinander sind eine Entscheidung, die
   niemand treffen will.
   ============================================================ */

const ADRESSE = "michaelis@temoa.de";

type Spalte = { title: string; links: { label: string; href: string }[]; recht?: boolean };

function spalten(sprache: Sprache, w: Rahmen): Spalte[] {
  const p = (ziel: string) => pfad(sprache, ziel);

  /* Die Rechtstexte liegen nur auf Deutsch vor und sind die verbindliche
     Fassung. Solange die englischen Entwuerfe nicht anwaltlich freigegeben
     sind, verweist auch die englische Fusszeile auf die deutschen Seiten. Ein
     nicht geprueftes Impressum oder eine nicht geprueft uebersetzte
     Datenschutzerklaerung darf nicht als geltender Text dastehen. */
  const rechtsPfad = (ziel: string) => pfad(STANDARD, ziel);

  return [
    {
      title: w.fusszeile.spalteLeistungen,
      links: [
        { label: w.leistungen.strategie, href: p("/leistungen/strategie") },
        { label: w.leistungen.listingSeo, href: p("/leistungen/listing-seo") },
        { label: w.leistungen.ppc, href: p("/leistungen/ppc-advertising") },
        { label: w.leistungen.account, href: p("/leistungen/account-management") },
        { label: w.leistungen.international, href: p("/leistungen/internationalisierung") },
        /* Diese vier stehen bewusst nur hier und nicht im Hauptmenue. Die
           Fusszeile ist der Ort fuer Seiten, die auffindbar sein muessen,
           ohne die Navigation zu verlaengern. */
        { label: w.leistungen.compliance, href: p("/leistungen/compliance-account-health") },
        { label: w.leistungen.fba, href: p("/leistungen/fba-inventory-management") },
        { label: w.leistungen.katalog, href: p("/leistungen/katalog-listing-management") },
        { label: w.leistungen.reporting, href: p("/leistungen/analytics-reporting") },
      ],
    },
    {
      title: w.fusszeile.spalteUnternehmen,
      links: [
        { label: w.navigation.caseStudies, href: p("/ergebnisse") },
        { label: w.navigation.designbeispiele, href: p("/design-beispiele") },
        { label: w.navigation.blog, href: p("/blog") },
        { label: sprache === "de" ? "Temoa OS · interne Datenanalyse" : "Temoa OS · internal analytics", href: p("/temoa-os") },
      ],
    },
    {
      title: w.fusszeile.spalteRecht,
      recht: true,
      links: [
        { label: w.fusszeile.impressum, href: rechtsPfad("/impressum") },
        { label: w.fusszeile.datenschutz, href: rechtsPfad("/datenschutz") },
        /* Die AGB standen bewusst nicht hier, solange die Seite eine Vorlage
           mit Platzhaltern war. Der Text des Kunden liegt jetzt vor. */
        { label: w.fusszeile.agb, href: rechtsPfad("/agb") },
      ],
    },
  ];
}

export function Fusszeile() {
  const sprache = spracheAusPfad(usePathname());
  const w = rahmenWoerter[sprache];
  const cols = spalten(sprache, w);

  return (
    <footer className="on-dark relative bg-navy text-chalk">
      <div className="container-x">
        {/* Band eins: der Kontakt, auf einer Linie. Die Adresse steht in der
            Größe einer Überschrift, weil sie hier die Überschrift ist. */}
        <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:py-14">
          <div className="min-w-0">
            <span className="text-label font-bold uppercase text-chalk-faint">
              {w.fusszeile.spalteKontakt}
            </span>
            <a
              href={`mailto:${ADRESSE}`}
              className="mt-2 block break-all text-[1.4rem] font-extrabold leading-tight tracking-[-0.015em] text-white transition-colors hover:text-brand-500 md:text-[1.9rem]"
            >
              {ADRESSE}
            </a>
          </div>
          <a
            href={pfad(sprache, "/gespraech-vereinbaren")}
            className="btn-on-dark w-fit shrink-0"
          >
            {w.rahmen.cta}
            <span className="disc" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h13m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Band zwei: Kennung und Bewertungen links, die Verzeichnisse daneben.
            Die erste Spalte ist breiter, sie trägt drei Zeilen Text. */}
        <div className="grid gap-10 border-t border-white/10 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo variant="white" />
            <p className="mt-5 max-w-[34ch] text-small leading-relaxed text-chalk-muted">
              {w.fusszeile.beschreibung}
            </p>
            <Bewertungsband
              ton="dunkel"
              titel={w.fusszeile.bewertungen}
              className="mt-7 max-w-[15rem]"
            />
          </div>

          {/* Die Bezeichnungen der Spalten waren `h2`. Damit standen auf jeder
              Seite vier weitere Ueberschriften derselben Stufe wie die
              Sektionen des Inhalts. Die Gliederung eines Dokuments endete
              damit mit "Leistungen, Unternehmen, Rechtliches, Sprache". Jetzt traegt
              jede Spalte einen eigenen Navigationsbereich mit Namen: ein
              Vorleseprogramm findet sie weiter, die Gliederung bleibt frei. */}
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <span className="block text-label font-bold uppercase text-chalk-faint">{c.title}</span>
              <ul className="mt-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="flex min-h-[2.75rem] items-center text-small text-chalk-muted transition-colors hover:text-brand-500"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                {/* Der Widerruf gehoert dorthin, wo Impressum und Datenschutz
                    stehen, nicht in eine eigene Ecke. */}
                {c.recht && (
                  <li>
                    <CookieEinstellungen
                      label={w.fusszeile.cookieEinstellungen}
                      className="flex min-h-[2.75rem] items-center text-small text-chalk-muted transition-colors hover:text-brand-500"
                    />
                  </li>
                )}
                {c.recht && w.fusszeile.rechtHinweis && (
                  <li className="mt-2 max-w-[24ch] text-[0.75rem] leading-snug text-chalk-faint">
                    {w.fusszeile.rechtHinweis}
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <nav aria-label={sprache === "de" ? "Amazon-Ratgeber nach Thema" : "Amazon guides by topic"} className="border-t border-white/10 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-label font-bold uppercase text-chalk-faint">
              {sprache === "de" ? "Amazon-Wissen für Marken und Händler" : "Amazon guides for brands and sellers"}
            </span>
            <a href={pfad(sprache, "/blog")} className="inline-flex min-h-12 items-center text-small text-chalk-muted hover:text-brand-500">
              {sprache === "de" ? "Alle Ratgeber ansehen" : "Browse all guides"} <span aria-hidden className="ml-2">↗</span>
            </a>
          </div>
          <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: sprache === "de" ? "Werbung & Profitabilität" : "Advertising & profitability", links: [
                ["amazon-werbung-inkrementalitaet", "Zusätzliche Werbewirkung messen", "Measure incremental ad impact"],
                ["amazon-dsp-budget", "DSP-Testbudget planen", "Plan a DSP test budget"],
                ["amazon-cpc-conversion-analyse", "CPC & Conversion analysieren", "Analyse CPC & conversion"],
                ["amazon-acos-senken", "ACoS gezielt senken", "Lower ACoS deliberately"],
                ["amazon-ppc-auktion", "PPC-Gebote verstehen", "Understand PPC bids"],
                ["ppc-kosten-senken", "PPC-Kosten senken", "Reduce PPC costs"],
                ["kampagnenstruktur-ppc", "Kampagnen strukturieren", "Structure campaigns"],
                ["business-reports", "Business Reports auswerten", "Analyse Business Reports"],
                ["fba-gebuehren-rechner", "Deckungsbeitrag kalkulieren", "Calculate contribution"],
              ] },
              { title: sprache === "de" ? "Content & Conversion" : "Content & conversion", links: [
                ["amazon-content-experimente", "Content-Experimente planen", "Plan content experiments"],
                ["amazon-keyword-recherche", "Keywords priorisieren", "Prioritise keywords"],
                ["amazon-ki-sichtbarkeit", "Produktdaten & KI-Sichtbarkeit", "Product facts & AI visibility"],
                ["amazon-ki-kaufagenten", "KI-Kaufagenten & Produktdaten", "AI shopping agents & product facts"],
                ["amazon-vine-kalkulation", "Vine wirtschaftlich einsetzen", "Evaluate Vine economics"],
                ["search-query-performance", "Suchanfragen analysieren", "Analyse search queries"],
                ["produkttitel-optimieren", "Amazon-Titel & Item Highlights", "Amazon titles & Item Highlights"],
                ["conversion-rate-optimierung", "Conversion verbessern", "Improve conversion"],
                ["brand-store-funnel", "Brand Store optimieren", "Optimise your Brand Store"],
              ] },
              { title: sprache === "de" ? "Wachstum & Betrieb" : "Growth & operations", links: [
                ["amazon-produktlaunch", "Produktlaunch planen", "Plan a product launch"],
                ["amazon-kanalstrategie-marken", "Vertriebskanäle abstimmen", "Align sales channels"],
                ["amazon-featured-offer-analyse", "Featured Offer analysieren", "Analyse the Featured Offer"],
                ["amazon-account-health", "Account-Risiken steuern", "Manage account risks"],
                ["amazon-gebuehren-2026", "Gebühren 2026 je SKU prüfen", "Review 2026 fees by SKU"],
                ["skalierung-ueber-1-5m", "Wachstumsplateaus lösen", "Resolve growth constraints"],
                ["inventar-cashflow", "Bestand & Cashflow planen", "Plan stock & cash flow"],
                ["wie-oft-zahlt-amazon", "Auszahlung & DD+7", "Payments & DD+7"],
                ["support-cases-loesen", "Support-Fälle lösen", "Resolve support cases"],
                ["amazon-marketingagenturen-vergleich", "Amazon-Agenturen vergleichen", "Compare Amazon agencies"],
              ] },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="font-bold text-white">{group.title}</h3>
                <ul className="mt-3 space-y-1">{group.links.map(([slug, de, en]) => <li key={slug}>
                  <a className="flex min-h-11 items-center text-small text-chalk-muted hover:text-brand-500" href={pfad(sprache, `/blog/${slug}`)}>{sprache === "de" ? de : en}</a>
                </li>)}</ul>
              </div>
            ))}
            <div>
              <h3 className="font-bold text-white">{sprache === "de" ? "Themen & Entscheidungen" : "Topics & decisions"}</h3>
              <ul className="mt-3 space-y-1">
                {blogTopics.map((topic) => <li key={topic.slug}><a className="flex min-h-11 items-center text-small text-chalk-muted hover:text-brand-500" href={pfad(sprache, `/blog/kategorie/${topic.slug}`)}>{topic.label[sprache]}</a></li>)}
                <li><a className="flex min-h-11 items-center text-small text-chalk-muted hover:text-brand-500" href={pfad(sprache, "/blog/vergleiche")}>{sprache === "de" ? "Vergleiche & Partnerwahl" : "Comparisons & partners"}</a></li>
                <li><a className="flex min-h-11 items-center text-small text-chalk-muted hover:text-brand-500" href={pfad(sprache, "/blog/grundlagen")}>{sprache === "de" ? "Begriffe & Grundlagen" : "Terms & fundamentals"}</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Band drei: Baujahr und Sprache. Der Umschalter stand vorher als
            vierte Spalte neben den Verzeichnissen und sah dort aus wie eins. */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-small text-chalk-faint sm:flex-row sm:items-center">
          <span className="[font-variant-numeric:tabular-nums]">© {new Date().getFullYear()} temoa</span>
          <Sprachumschalter
            aktuell={sprache}
            beschriftung={w.rahmen.spracheWaehlen}
            ton="dunkel"
            className="w-fit"
          />
        </div>
      </div>
    </footer>
  );
}
