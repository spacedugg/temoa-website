"use client";

import Image from "next/image";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);

const stats: {
  to: number;
  prefix?: string;
  suffix: string;
  label: string;
}[] = [
  { to: 30, prefix: "Ø +", suffix: " %", label: "Profitabilitätssteigerung" },
  { to: 21, suffix: " Mio. €", label: "betreuter Amazon-Jahresumsatz" },
  { to: 60, suffix: "+", label: "betreute Marken" },
  { to: 5, suffix: "+", label: "internationale Marktplätze" },
];

export function Credibility() {
  return (
    <section className="relative border-y border-black/[0.05] bg-white py-14 md:py-16">
      <div className="container-x">
        {/* Logo marquee */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-12">
            {[...logos, ...logos].map((src, i) => (
              <div key={`${src}-${i}`} className="relative h-9 w-28 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32">
                <Image src={src} alt="" fill sizes="128px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <div className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm leading-snug text-ink-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
