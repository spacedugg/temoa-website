"use client";

import Image from "next/image";
import { Counter } from "../ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Sparkline } from "../ui/MockKit";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);

const stats: {
  to: number;
  prefix?: string;
  suffix: string;
  label: string;
  spark: number[];
  color: string;
}[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung", spark: [10, 12, 11, 16, 15, 22, 30], color: "#FF9900" },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz", spark: [6, 9, 8, 12, 14, 18, 21], color: "#FF8A1F" },
  { to: 60, suffix: "+", label: "betreute Marken", spark: [20, 28, 33, 41, 48, 54, 60], color: "#FF6B1F" },
  { to: 5, suffix: "+", label: "internationale Marktplätze", spark: [1, 2, 2, 3, 4, 4, 5], color: "#FF3131" },
];

export function Credibility() {
  return (
    <section className="relative border-y border-black/[0.05] bg-white py-12 md:py-14">
      <div className="container-x">
        {/* Logo marquee */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-12">
            {[...logos, ...logos].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative h-9 w-28 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32"
              >
                <Image src={src} alt="" fill sizes="128px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats as glass KPI cards */}
        <RevealGroup className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white/80 p-5 shadow-soft backdrop-blur transition-shadow duration-300 hover:shadow-lift">
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-200/30 blur-2xl" />
                <div className="text-3xl font-extrabold tracking-tight text-ink md:text-[2.25rem]">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-1.5 text-xs leading-snug text-ink-muted md:text-sm">{s.label}</p>
                <Sparkline values={s.spark} color={s.color} className="mt-3 h-8 w-full" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
