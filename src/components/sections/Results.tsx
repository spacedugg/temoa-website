"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { AreaChart } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";

const cases = [
  {
    brand: "FUTUM",
    sector: "Schädlingsbekämpfung · DE",
    metric: 80,
    suffix: " %",
    metricLabel: "organische Verkäufe im Peak",
    quote: "Zum ersten Mal wächst unser Amazon-Umsatz und die Marge gleichzeitig.",
    points: [30, 32, 38, 35, 44, 52, 60, 72],
    color: "#FF9900",
    fill: "rgba(255,153,0,0.16)",
  },
  {
    brand: "HaA",
    sector: "Küche & Haushalt · DE",
    metric: 439,
    prefix: "+",
    suffix: " %",
    metricLabel: "Conversion-Steigerung in 17 Wochen",
    quote: "Wir verkaufen heute überwiegend organisch – Werbung ist Kür, nicht Pflicht.",
    points: [20, 28, 25, 40, 55, 62, 80, 96],
    color: "#FF3131",
    fill: "rgba(255,49,49,0.16)",
  },
  {
    brand: "Gartenmarke",
    sector: "Garten · DE/IT/FR/ES",
    metric: -35,
    suffix: " %",
    metricLabel: "TACoS – über vier Marktplätze",
    quote: "Ein System, vier Länder – endlich vergleichbare Zahlen und planbares Wachstum.",
    points: [80, 72, 68, 58, 50, 46, 40, 34],
    color: "#0E7CA0",
    fill: "rgba(14,124,160,0.16)",
  },
];

export function Results() {
  return (
    <section id="ergebnisse" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ergebnisse"
            title={
              <>
                Echte Zahlen, <span className="text-gradient-emerald">echte Marken.</span>
              </>
            }
            description="Kein Wachstum auf dem Papier, sondern messbare Resultate: mehr Umsatz, bessere Marge und ein gesundes Konto – ein System, Organic First."
          />
          <a href="#kontakt" className="btn-ghost shrink-0">
            Alle Cases
          </a>
        </div>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <RevealItem key={c.brand}>
              <div className="card group relative h-full overflow-hidden p-7 transition-shadow duration-500 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {c.brand}
                  </span>
                  <span className="text-xs font-medium text-ink-faint">{c.sector}</span>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight" style={{ color: c.color }}>
                    <Counter to={c.metric} prefix={c.prefix} suffix={c.suffix} />
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink-muted">{c.metricLabel}</p>

                <AreaChart
                  className="mt-6 h-20 w-full"
                  stroke={c.color}
                  fill={c.fill}
                  points={c.points}
                />

                <p className="mt-6 border-t border-black/[0.06] pt-5 text-[15px] italic leading-relaxed text-ink">
                  „{c.quote}"
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
