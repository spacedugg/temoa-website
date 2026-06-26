"use client";

import Image from "next/image";

/* 14 client logos split across three rows so a logo never appears twice
   on screen at once. Each row loops its own subset, slowly, alternating
   direction for a calm, premium feel. */
const all = Array.from({ length: 14 }, (_, i) => `/clients/${i + 1}.png`);
const rows = [all.slice(0, 5), all.slice(5, 10), all.slice(10, 14)];

function LogoRow({ logos, duration, reverse }: { logos: string[]; duration: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
      <div
        className="flex w-max animate-marquee items-center gap-16 md:gap-20"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...logos, ...logos].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-10 w-32 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-11 md:w-36"
          >
            <Image src={src} alt="" fill sizes="144px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Credibility() {
  return (
    <section className="relative border-y border-black/[0.05] bg-white py-12 md:py-16">
      <div className="container-x">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
          60+ Marken vertrauen auf temoa
        </p>
        <div className="space-y-7">
          <LogoRow logos={rows[0]} duration={52} />
          <LogoRow logos={rows[1]} duration={64} reverse />
          <LogoRow logos={rows[2]} duration={58} />
        </div>
      </div>
    </section>
  );
}
