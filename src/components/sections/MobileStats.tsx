"use client";

import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const stats = [
  { value: 30, prefix: "+", suffix: " %", label: "mehr Profitabilität" },
  { value: 60, suffix: "+", label: "betreute Marken" },
  { value: 21, suffix: " Mio €", label: "Umsatz p. a." },
  { value: 98, suffix: " %", label: "Kundenbindung" },
];

export function MobileStats() {
  return (
    <section className="container-x -mt-4 pb-8 lg:hidden">
      <RevealGroup className="grid grid-cols-2 gap-3" stagger={0.06}>
        {stats.map((s) => (
          <RevealItem key={s.label}>
            <div className="card p-5 text-center">
              <div className="text-2xl font-bold tracking-tight text-ink">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium text-ink-muted">{s.label}</div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
