"use client";

import Image from "next/image";
import { Reveal } from "../ui/Reveal";

const logos = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);
const rowA = logos.slice(0, 7);
const rowB = logos.slice(7);

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max gap-5" style={{ animation: `marquee 38s linear infinite${reverse ? " reverse" : ""}` }}>
      {doubled.map((src, i) => (
        <div
          key={i}
          className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-soft transition-shadow hover:shadow-lift"
        >
          <Image
            src={src}
            alt="Kundenmarke"
            width={160}
            height={70}
            className="max-h-14 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function Clients() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">
            60+ Marken vertrauen TEMOA · 21 Mio € betreuter Umsatz p. a.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10 space-y-5">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent md:w-40" />
        <div className="overflow-hidden">
          <Marquee items={rowA} />
        </div>
        <div className="overflow-hidden">
          <Marquee items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
