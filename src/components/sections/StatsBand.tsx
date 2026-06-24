"use client";

import { RevealGroup, RevealItem } from "../ui/Reveal";
import { Counter } from "../ui/Counter";

const stats = [
  { value: 60, prefix: "", suffix: "+", label: "betreute Marken" },
  { value: 21, prefix: "", suffix: " Mio. €", label: "betreuter Jahresumsatz" },
  { value: 98, prefix: "", suffix: " %", label: "Kundenbindung, ohne lange Laufzeiten" },
  { value: 5, prefix: "", suffix: "+", label: "Amazon-Marktplätze" },
];

export function StatsBand() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container-x">
        <div className="rounded-[2rem] border border-navy/[0.07] bg-white p-8 shadow-soft md:p-12">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="text-center">
                <div className="text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm leading-snug text-ink-muted">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
