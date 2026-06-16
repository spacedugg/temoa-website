"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { caseStudies } from "@/lib/copy";

export function Cases() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <RevealGroup className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <RevealItem key={c.brand}>
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-ink">{c.brand}</span>
                  <span className="rounded-full bg-canvas-alt px-2.5 py-1 text-[11px] font-medium text-ink-muted">{c.category}</span>
                </div>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: c.color }}>{c.metric}</span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: `${c.color}1A`, color: c.color }}>{c.second}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink-muted">{c.metricLabel}</p>
                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ink">{c.body}</p>
                <p className="mt-5 text-xs text-ink-faint">{c.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function CasesClosing() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Euer Konto"
          title={<>Wird eure Marke die <span className="text-gradient">nächste Case?</span></>}
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <a href="/gespraech-vereinbaren" className="btn-primary">Potenzial-Gespräch buchen</a>
        </div>
      </div>
    </section>
  );
}
