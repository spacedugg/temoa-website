"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

const items = [
  { cat: "Strategie", icon: "search" as const, title: "Wettbewerbs- & Keyword-Analyse", body: "Wer rankt wofür, zu welchem Preis – und wo genau euer Hebel liegt." },
  { cat: "Strategie", icon: "margin" as const, title: "Margenkalkulation & KPIs", body: "Jede Maßnahme wird auf Deckungsbeitrag und TACoS durchgerechnet." },
  { cat: "Content", icon: "content" as const, title: "Bilder, A+ & Premium A+", body: "Hauptbild, Galerie und A+, die in Sekunden den Klick gewinnen und Vertrauen schaffen." },
  { cat: "Content", icon: "search" as const, title: "SEO & Backend-Keywords", body: "Relevante Keywords im Listing und Backend – für Rufus, COSMO & A10." },
  { cat: "Advertising", icon: "ads" as const, title: "PPC Advertising & Reporting", body: "Profitable Kampagnen plus transparente, wöchentliche Reports mit klaren nächsten Schritten." },
  { cat: "Account", icon: "layers" as const, title: "Inventar & FBA-Forecasting", body: "Forecasting und Nachschub, damit ihr nie out-of-stock geht." },
  { cat: "Account", icon: "globe" as const, title: "Internationalisierung", body: "Neue Marktplätze sauber ausrollen – nativ in bis zu fünf Ländern." },
  { cat: "Account", icon: "shield" as const, title: "Compliance & Troubleshooting", body: "Cases, Sperren, Buy-Box-Verlust – wir lösen es, bevor es weh tut." },
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
                Was in <span className="text-gradient">Full Service</span> steckt.
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
