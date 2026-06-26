"use client";

import { Reveal } from "../ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center shadow-glow md:px-12 md:py-20"
          style={{ backgroundImage: "var(--brand-gradient)", backgroundSize: "150% 150%" }}
        >
          {/* soft light blobs for depth */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -right-10 h-60 w-60 rounded-full bg-white/15 blur-3xl" />

          <Reveal>
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
              Wie viel Umsatz lässt euer Listing liegen?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Das zeigen wir euch in einer kostenlosen Potenzialanalyse.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="relative mt-8 flex justify-center">
              <a
                href="/gespraech-vereinbaren"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
              >
                Potenzialanalyse buchen
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <Check /> Ihr verlängert nach Performance
              </span>
              <span className="inline-flex items-center gap-2">
                <Check /> 98 % Kundenbindung
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-white">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
