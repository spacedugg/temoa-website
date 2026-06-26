"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { RevealGroup, RevealItem } from "../ui/Reveal";

type Case = {
  brand: string;
  focus: string;
  start: string;
  action: string;
  result: string;
  metric: string;
  period: string;
  accent: string;
  placeholder?: boolean;
};

const cases: Case[] = [
  {
    brand: "Vita-World",
    focus: "Profitabilität (TACoS)",
    start: "5k Bestellungen, hoher Werbedruck",
    action: "Listing auf CTR und CVR optimiert, PPC über TACoS gesteuert",
    result: "16k Bestellungen, +50 % CVR",
    metric: "TACoS 5,8 %",
    period: "Q1 2026",
    accent: "#FF9900",
  },
  {
    brand: "Greenfood",
    focus: "Organisches Ranking",
    start: "Wachstum nur über Ad-Spend",
    action: "Organisches Fundament aufgebaut, dann profitabel skaliert",
    result: "Umsatz verdoppelt",
    metric: "x2 Umsatz",
    period: "6 Monate",
    accent: "#FF3131",
  },
  {
    brand: "Bachgold",
    focus: "Launch / Retail Readiness",
    start: "Nische Wasserfilter, starker Wettbewerb",
    action: "Branding, Produktbilder und Retail Readiness",
    result: "Bestseller Rang #1 in der Nische",
    metric: "#1 Nische",
    period: "laufend",
    accent: "#0E7CA0",
  },
  {
    brand: "Marke 4",
    focus: "Internationalisierung",
    start: "Erprobtes Setup im Heimatmarkt",
    action: "Listings und Kampagnen je Marktplatz lokalisiert",
    result: "Rollout EU & US",
    metric: "5+ Marktplätze",
    period: "laufend",
    accent: "#023047",
    placeholder: true,
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative isolate scroll-mt-24 bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <SectionHeading
          eyebrow="Case Studies"
          size="compact"
          title={
            <>
              Ergebnisse statt <span className="text-gradient">Versprechen.</span>
            </>
          }
          description="Vier Marken, vier Ausgangslagen."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {cases.map((c) => (
            <RevealItem key={c.brand} className="h-full">
              <div className="glass glass-hover group flex h-full flex-col rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-ink">{c.brand}</span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                </div>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                  {c.focus}
                </span>

                <div
                  className="mt-5 rounded-2xl px-4 py-4 text-center text-white shadow-lift"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  <div className="text-2xl font-extrabold tracking-tight">{c.metric}</div>
                  <div className="mt-0.5 text-xs font-medium opacity-90">{c.result}</div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Start</dt>
                    <dd className="mt-0.5 leading-snug text-ink-muted">{c.start}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Was wir taten</dt>
                    <dd className="mt-0.5 leading-snug text-ink-muted">{c.action}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-ink-faint">
                  <span>{c.period}</span>
                  {c.placeholder && <span className="italic">Daten folgen</span>}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-ink-faint">
          Echte Kundenprojekte. Zahlen und Freigaben werden vor Veröffentlichung final bestätigt.
        </p>
      </div>
    </section>
  );
}
