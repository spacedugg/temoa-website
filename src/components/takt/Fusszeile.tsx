"use client";

import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { CookieEinstellungen } from "../consent/CookieEinstellungen";
import { Sprachumschalter } from "../i18n/Sprachumschalter";
import { Bewertungsband } from "../ui/Bewertungsband";
import { pfad, spracheAusPfad, STANDARD, type Sprache } from "@/lib/i18n";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

type Rahmen = (typeof rahmenWoerter)[Sprache];

/** Fußzeile als Planfuß: Kennung links, Spalten rechts, alles auf Hairlines. */

type Link = {
  label: string;
  href: string;
  /** Kleine Zeile ueber dem Wert, damit zwei Adressen zuzuordnen sind. */
  note?: string;
  /** Mit Pfeil und in Weiss: der Weg zum Termin ist kein Listeneintrag. */
  betont?: boolean;
};

type Spalte = { title: string; links: Link[]; recht?: boolean };

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
      ],
    },
    {
      title: w.fusszeile.spalteUnternehmen,
      links: [
        { label: w.navigation.caseStudies, href: p("/ergebnisse") },
        { label: w.navigation.designbeispiele, href: p("/design-beispiele") },
        { label: w.navigation.blog, href: p("/blog") },
      ],
    },
    /* Kontakt steht in der Fusszeile, weil dort gesucht wird, wer erreichbar
       ist. Eine Telefonnummer ist bewusst nicht dabei, die gibt der Kunde
       spaeter frei. */
    {
      title: w.fusszeile.spalteKontakt,
      links: [
        {
          label: "michaelis@temoa.de",
          href: "mailto:michaelis@temoa.de",
          note: w.fusszeile.kontaktPerson,
        },
        {
          label: "info@temoa.de",
          href: "mailto:info@temoa.de",
          note: w.fusszeile.kontaktAllgemein,
        },
        { label: w.fusszeile.kontaktTermin, href: p("/gespraech-vereinbaren"), betont: true },
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
        <div className="grid gap-10 py-16 sm:grid-cols-2 md:gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr_1fr]">
          <div>
            <Logo variant="white" />
            <p className="mt-5 max-w-[34ch] text-small leading-relaxed text-chalk-muted">
              {w.fusszeile.beschreibung}
            </p>
            <Bewertungsband ton="dunkel" titel={w.fusszeile.bewertungen} className="mt-7 max-w-[19rem]" />
            <Sprachumschalter
              aktuell={sprache}
              beschriftung={w.rahmen.spracheWaehlen}
              ton="dunkel"
              className="mt-7 w-fit"
            />
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-label font-bold uppercase text-chalk-faint">{c.title}</h2>
              <ul className="mt-3">
                {c.links.map((l) =>
                  l.betont ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-small font-bold text-white transition-colors hover:text-brand-500"
                      >
                        {l.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h13m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </li>
                  ) : l.note ? (
                    <li key={l.label} className="pt-3 first:pt-0">
                      <span className="block text-[0.75rem] text-chalk-faint">{l.note}</span>
                      <a
                        href={l.href}
                        className="flex min-h-[2.25rem] items-center break-all text-small text-chalk-muted transition-colors hover:text-brand-500"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="flex min-h-[2.75rem] items-center text-small text-chalk-muted transition-colors hover:text-brand-500"
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                )}
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
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 text-small text-chalk-faint">
          <span className="[font-variant-numeric:tabular-nums]">© {new Date().getFullYear()} temoa</span>
        </div>
      </div>
    </footer>
  );
}
