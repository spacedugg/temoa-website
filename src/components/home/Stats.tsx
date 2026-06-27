"use client";

import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const stats: { to: number; prefix?: string; suffix: string; label: string }[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung" },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
  { to: 60, suffix: "+", label: "betreute Marken" },
  { to: 5, suffix: "+", label: "internationale Marktplätze" },
];

export function Stats({ tone = "blue" }: { tone?: "blue" | "white" }) {
  return (
    <section className={`relative py-16 md:py-20 ${tone === "blue" ? "bg-[#EDF5FB]" : "bg-white"}`}>
      <div className="container-x">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="text-center">
                <div className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mx-auto mt-3 h-0.5 w-10 rounded-full" style={{ backgroundImage: "var(--brand-gradient)" }} />
                <p className="mt-3 text-sm leading-snug text-ink-muted">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
