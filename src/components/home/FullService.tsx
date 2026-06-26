"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const services: {
  n: string;
  icon: IconName;
  name: string;
  result: string;
  body: string;
  deliverables: string[];
  href: string;
}[] = [
  {
    n: "01",
    icon: "strategy",
    name: "Strategie & Analyse",
    result: "Erst die Daten, dann der Plan.",
    body: "Search Query Report, Wettbewerb, Keywords, Margen: Wir finden, wo eure Umsätze liegen und setzen klare ACoS- und TACoS-Ziele.",
    deliverables: ["Wettbewerbsanalyse", "Keyword-Recherche", "Margenanalyse", "KPI-Steuerung"],
    href: "/leistungen/strategie",
  },
  {
    n: "02",
    icon: "content",
    name: "Content & Listings",
    result: "Aus Klicks werden Käufe.",
    body: "Hauptbild und Produktbilder, Amazon A+ bis Premium A+ Content, Brand Store und Markengeschichte. Dazu SEO über Titel, Bullets und Backend, KI-ready für Rufus, COSMO und A10.",
    deliverables: ["Hauptbild & Produktbilder", "Amazon A+ und Premium A+", "Brand Store", "SEO (Titel, Bullets, Backend)"],
    href: "/leistungen/listing-seo",
  },
  {
    n: "03",
    icon: "ads",
    name: "Advertising / PPC",
    result: "Profitabel skalieren.",
    body: "Sobald euer Listing organisch verkauft, bringt PPC planbaren Umsatz. Wir steuern Kampagnen, Gebote und Budgets über euren TACoS.",
    deliverables: ["Kampagnenstruktur", "Bid- und Budget-Management", "Profitabilität (ACoS, TACoS)"],
    href: "/leistungen/ppc-advertising",
  },
  {
    n: "04",
    icon: "account",
    name: "Account-Management",
    result: "Bestand, Buy-Box, Cases. Im Griff.",
    body: "Wir managen Inventar und Forecasting, überwachen die Buy-Box, liefern Reporting und übernehmen das Case-Handling mit Amazon. Euer Amazon-Geschäft hängt nicht mehr an einer einzigen Person.",
    deliverables: ["Inventar & Forecasting", "Buy-Box-Überwachung", "Reporting", "Account-Health & Cases"],
    href: "/leistungen/account-management",
  },
  {
    n: "05",
    icon: "globe",
    name: "Internationalisierung",
    result: "Lokalisieren statt übersetzen.",
    body: "Was in einem Markt verkauft, rollen wir auf weitere aus, EU und US. Listings und Kampagnen passen wir an jeden Marktplatz an.",
    deliverables: ["Rollout EU & US", "Lokalisierung", "Marktspezifische Kampagnen"],
    href: "/leistungen/internationalisierung",
  },
];

export function FullService() {
  return (
    <section className="relative isolate bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <SectionHeading
          eyebrow="Full Service"
          size="compact"
          title={
            <>
              Fünf Leistungen, in der <span className="text-gradient">richtigen Reihenfolge.</span>
            </>
          }
        />

        {/* 3 + 2 layout, both rows full width so nothing looks orphaned */}
        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6" stagger={0.07}>
          {services.map((s, i) => {
            const span =
              i < 3 ? "lg:col-span-2" : i === 4 ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-3";
            return (
              <RevealItem key={s.n} className={`h-full ${span}`}>
                <a href={s.href} className="glass glass-hover group flex h-full flex-col rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-black/[0.04]">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span className="text-sm font-extrabold text-gradient">{s.n}</span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{s.name}</p>
                  <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">{s.result}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1 text-xs font-medium text-ink-muted">
                        {d}
                      </li>
                    ))}
                  </ul>
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a href="/full-service" className="btn-ghost">
              Alle Leistungen ansehen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
