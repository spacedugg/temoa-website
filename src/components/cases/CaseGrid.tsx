"use client";

import { cases, type CaseStudy } from "@/lib/cases";
import { Flagge } from "../ui/Flagge";
import { Markenlogo } from "../ui/Markenlogo";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

function mesh(accent: string) {
  return {
    backgroundColor: "#0A1E2B",
    backgroundImage: `radial-gradient(130% 120% at 12% 0%, ${accent} 0%, ${accent}00 48%), radial-gradient(120% 120% at 100% 100%, ${accent}55 0%, transparent 55%), linear-gradient(155deg, #0A1E2B 35%, #021C2B 100%)`,
  } as React.CSSProperties;
}

function CaseTile({ c }: { c: CaseStudy }) {
  return (
    <a
      href={`/ergebnisse/${c.slug}`}
      className="group relative isolate flex h-72 flex-col overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 md:h-80"
      style={mesh(c.accent)}
    >
      {c.bgImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.bgImage} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-2">
          {c.logo ? (
            <Markenlogo logo={c.logo} name={c.displayName} auf="dunkel" className="h-9" />
          ) : (
            <span className="rounded-full bg-black/35 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {c.displayName}
            </span>
          )}
          {/* Fahnen statt Kuerzel. Auf dem Bild reicht die Fahne allein, der
              Name steht auf der Fallseite. */}
          <span className="ml-auto flex items-center gap-1 rounded-full bg-black/35 px-2 py-1.5 backdrop-blur-sm">
            {c.marketplaces.map((code) => (
              <Flagge key={code} code={code} className="h-3.5 w-[1.2rem] text-white" />
            ))}
          </span>
        </div>

        <div className="mt-auto">
          <div className="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl">{c.preview.value}</div>
          <div className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70">{c.preview.label}</div>
          <h3 className="mt-3 max-w-md text-balance text-lg font-bold leading-snug text-white">{c.headline}</h3>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
            Case Study öffnen
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export function CaseGrid() {
  return (
    <section className="relative ground py-16 md:py-20">
      <div className="container-x">
        <RevealGroup className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2" stagger={0.08}>
          {cases.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseTile c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-sm text-ink-faint">Klickt eine Marke an für die ganze Case Study.</p>
        </Reveal>
      </div>
    </section>
  );
}
