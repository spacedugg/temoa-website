"use client";

import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { CookieEinstellungen } from "../consent/CookieEinstellungen";
import { Sprachumschalter } from "../i18n/Sprachumschalter";
import { pfad, spracheAusPfad, STANDARD, type Sprache } from "@/lib/i18n";
import { rahmenWoerter } from "@/lib/woerter/rahmen";

type Rahmen = (typeof rahmenWoerter)[Sprache];

/** Fußzeile als Planfuß: Kennung links, Spalten rechts, alles auf Hairlines. */

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
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <Logo variant="white" />
            <p className="mt-5 max-w-[34ch] text-small leading-relaxed text-chalk-muted">
              {w.fusszeile.beschreibung}
            </p>
            <Sprachumschalter
              aktuell={sprache}
              beschriftung={w.rahmen.spracheWaehlen}
              ton="dunkel"
              className="mt-6 w-fit"
            />
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-label font-bold uppercase text-chalk-faint">{c.title}</h2>
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
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 py-6 text-small text-chalk-faint md:flex-row md:items-center">
          <span className="[font-variant-numeric:tabular-nums]">© {new Date().getFullYear()} temoa</span>
          <a
            href="mailto:info@temoa.de"
            className="flex min-h-[2.75rem] items-center transition-colors hover:text-brand-500"
          >
            info@temoa.de
          </a>
        </div>
      </div>
    </footer>
  );
}
