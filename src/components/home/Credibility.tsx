"use client";

import Image from "next/image";
import { Counter } from "../ui/Counter";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);

const stats: { to: number; prefix?: string; suffix: string; label: string }[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung" },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
  { to: 60, suffix: "+", label: "betreute Marken" },
  { to: 5, suffix: "+", label: "internationale Marktplätze" },
];

export function Credibility() {
  return (
    <section className="relative border-y border-black/[0.05] bg-white py-12 md:py-16">
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

        {/* Stats: clean numbers, no charts */}
        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="text-center">
                <div className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div
                  className="mx-auto mt-3 h-0.5 w-10 rounded-full"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                />
                <p className="mt-3 text-sm leading-snug text-ink-muted">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
