"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { cases } from "@/lib/cases";

function TrendArrow({ trend, className }: { trend: "up" | "down" | "neutral"; className?: string }) {
  if (trend === "neutral") return null;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      {trend === "up" ? (
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative scroll-mt-24 bg-white py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Case Studies"
          size="compact"
          title={
            <>
              Ergebnisse statt <span className="text-gradient">Versprechen.</span>
            </>
          }
          description="Vier Marken, vier Ausgangslagen, echte Zahlen."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {cases.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <a
                href={`/ergebnisse#${c.slug}`}
                className="surface surface-hover group flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-base font-bold text-ink">{c.displayName}</span>
                    <p className="mt-0.5 text-xs text-ink-faint">{c.industry}</p>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.accent }} />
                </div>

                {/* Headline metric, large for hierarchy */}
                <div className="mt-5 rounded-2xl bg-navy/[0.03] p-4 ring-1 ring-black/[0.04]">
                  <div className="flex items-center gap-1.5" style={{ color: c.accent }}>
                    <span className="text-[2rem] font-extrabold leading-none tracking-tight">{c.preview.value}</span>
                    <TrendArrow trend={c.preview.trend} className="mt-1" />
                  </div>
                  <div className="mt-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {c.preview.label}
                  </div>
                </div>

                <h3 className="mt-5 text-sm font-bold leading-snug text-ink">{c.headline}</h3>

                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-ink-faint">
                  <span>{c.marketplaces.join(" · ")}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-ink-muted transition-colors group-hover:text-ink">
                    Case ansehen
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-ink-faint">
          Echte Kundenprojekte. Eine Marke auf Wunsch anonymisiert.
        </p>
      </div>
    </section>
  );
}
