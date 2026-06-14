"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { BarChart } from "../ui/MiniChart";
import { TiltCard } from "../ui/TiltCard";

const cards = [
  {
    icon: "margin" as const,
    title: "Marge statt Vanity-Umsatz",
    body: "Wir steuern auf Profitabilität und TACoS – nicht auf Umsatz, der die Marge auffrisst. Ihr wachst und verdient daran.",
    accent: "emerald",
  },
  {
    icon: "puzzle" as const,
    title: "Ein Partner für alles",
    body: "Strategie, Content, Advertising und Account-Management greifen ineinander – statt euch an drei Dienstleistern aufzureiben.",
    accent: "brand",
  },
  {
    icon: "chart" as const,
    title: "Planbar & transparent",
    body: "Klare KPIs, wöchentliche Reports und ein fester Ansprechpartner. Kein Blindflug, keine Blackbox.",
    accent: "violet",
  },
];

export function WhyTemoa() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Warum TEMOA"
          title={
            <>
              Warum Marken mit uns arbeiten – <span className="text-gradient">und bleiben.</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <RevealItem key={c.title}>
              <TiltCard className="group h-full">
                <div className="card noise relative h-full overflow-hidden p-8">
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        c.accent === "emerald"
                          ? "rgba(16,185,129,0.35)"
                          : c.accent === "violet"
                          ? "rgba(151,71,255,0.35)"
                          : "rgba(98,88,247,0.35)",
                    }}
                  />
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${
                      c.accent === "emerald"
                        ? "bg-emerald/10 text-emerald-deep"
                        : c.accent === "violet"
                        ? "bg-violet/10 text-violet"
                        : "bg-brand-50 text-brand-600"
                    }`}
                  >
                    <Icon name={c.icon} size={26} />
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold text-ink">{c.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-ink-muted">{c.body}</p>

                  {c.accent === "brand" && (
                    <div className="relative mt-6 flex items-center gap-4 rounded-2xl border border-black/[0.05] bg-canvas-alt p-3">
                      {["Umsatz", "Marge", "TACoS"].map((t, i) => (
                        <div key={t} className="flex flex-1 flex-col items-center gap-2">
                          <BarChart className="h-10 w-full" values={[40, 70, 55, 90]} highlight={i} />
                          <span className="text-[11px] font-medium text-ink-muted">{t}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
