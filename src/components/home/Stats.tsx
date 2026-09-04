"use client";

import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Kennzahlenband.
 *
 * Vorher standen die vier Zahlen nackt auf dem Grund, jede mit einem kurzen
 * orangen Strich darunter. Das Theme fuehrt Kennzahlen als Karten, damit sie
 * als Block lesbar sind und nicht als Text im Weissraum.
 */
const stats: { to: number; prefix?: string; suffix: string; label: string; trend?: boolean }[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung", trend: true },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
  { to: 60, suffix: "+", label: "betreute Marken" },
  { to: 5, suffix: "+", label: "internationale Marktplätze" },
];

function Trend() {
  return (
    <span
      aria-hidden
      className="grid h-6 w-6 place-items-center rounded-lg"
      style={{ background: "#16A34A14", color: "#16A34A" }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M6 18L18 6m0 0h-7m7 0v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Stats({ tone = "blue" }: { tone?: "blue" | "white" }) {
  return (
    <section className={`section-y-sm relative ${tone === "blue" ? "ground-tint" : "ground"}`}>
      <div className="container-x">
        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="kpi flex h-full flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl font-extrabold leading-none tracking-tight text-ink [font-variant-numeric:tabular-nums] md:text-4xl">
                    <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                  {s.trend && <Trend />}
                </div>
                <p className="text-[0.82rem] leading-snug text-ink-muted">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
