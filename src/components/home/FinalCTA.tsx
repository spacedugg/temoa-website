"use client";

import { Reveal } from "../ui/Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="glow-center relative overflow-hidden rounded-[2.5rem] border border-black/[0.06] bg-white px-6 py-16 text-center shadow-soft md:px-12 md:py-20">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Wie viel Umsatz lässt euer Listing <span className="text-gradient">liegen?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Das zeigen wir euch in einer kostenlosen Potenzialanalyse.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex justify-center">
              <a href="/gespraech-vereinbaren" className="btn-primary !px-8 !py-4 text-base">
                Potenzialanalyse buchen
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Check /> Ohne lange Vertragslaufzeiten
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
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundImage: "var(--brand-gradient)" }}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
