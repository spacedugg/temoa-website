"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

const items = [
  { cat: "Strategie", icon: "search" as const, title: "Markt- & Keyword-Analyse", body: "Wer rankt zu welchem Preis auf euren Keywords – und wo der schnellste Hebel liegt." },
  { cat: "Strategie", icon: "margin" as const, title: "Margen- & Preisstrategie", body: "Jede Maßnahme vorab auf Deckungsbeitrag und TACoS gerechnet, bevor wir sie umsetzen." },
  { cat: "Content", icon: "content" as const, title: "Hauptbild, Galerie & A+", body: "Visueller Auftritt, der in Sekunden den Klick holt und jede offene Kauffrage beantwortet." },
  { cat: "Content", icon: "search" as const, title: "Listing-SEO & Backend", body: "Keywords in Titel, Bullets und Backend platziert – auffindbar für Rufus, COSMO und A10." },
  { cat: "Advertising", icon: "ads" as const, title: "Sponsored Ads & Reporting", body: "Sponsored Products, Brands und Display auf Marge gesteuert – mit Reports, die ihr versteht." },
  { cat: "Account", icon: "layers" as const, title: "FBA-Bestand & Forecast", body: "Nachschub und Mengen geplant, damit kein Topseller in den Out-of-Stock rutscht." },
  { cat: "Account", icon: "globe" as const, title: "Neue Marktplätze", body: "Sauberer Roll-out ins Ausland – muttersprachlich aufgesetzt in bis zu fünf Ländern." },
  { cat: "Account", icon: "shield" as const, title: "Account-Health & Cases", body: "Sperren, Buy-Box-Verlust, Seller-Support-Fälle – gelöst, bevor sie Umsatz kosten." },
];

const catColor: Record<string, string> = {
  Strategie: "text-brand-600 bg-brand-50",
  Content: "text-violet bg-violet/10",
  Advertising: "text-emerald-deep bg-emerald/10",
  Account: "text-cyan bg-cyan/10",
};

export function ServicesDetail() {
  return (
    <section id="leistungen" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Im Detail"
            title={
              <>
                Alles, was euer Konto braucht – <span className="text-gradient">in einer Hand.</span>
              </>
            }
          />
          <a href="/full-service" className="btn-ghost shrink-0">Alle Leistungen</a>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {items.map((it) => (
            <RevealItem key={it.title}>
              <div className="group card relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${catColor[it.cat]}`}>
                    <Icon name={it.icon} size={22} />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${catColor[it.cat]}`}>
                    {it.cat}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold leading-snug text-ink">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{it.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
