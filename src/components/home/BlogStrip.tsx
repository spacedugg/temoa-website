"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function BlogStrip() {
  return (
    <section className="relative border-t border-black/[0.06] py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Wissen"
          title={
            <>
              Klartext zu <span className="text-gradient">Amazon.</span>
            </>
          }
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {Array.from({ length: 4 }).map((_, i) => (
            <RevealItem key={i}>
              <div className="card group flex h-full flex-col overflow-hidden">
                <div className="flex aspect-[16/10] items-center justify-center border-b border-dashed border-navy/15 bg-canvas-alt/60">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Platzhalter
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">Artikel</span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink">
                    Thema folgt
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Inhalte liefert das temoa-Team in Kürze.
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
