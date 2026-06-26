"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { RevealGroup, RevealItem } from "../ui/Reveal";

export function BlogStrip() {
  return (
    <section className="relative isolate border-t border-black/[0.05] bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <SectionHeading
          eyebrow="Blog"
          size="compact"
          title={
            <>
              Klartext zu <span className="text-gradient">Amazon.</span>
            </>
          }
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {Array.from({ length: 4 }).map((_, i) => (
            <RevealItem key={i}>
              <div className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-3xl">
                <div
                  className="flex aspect-[16/10] items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#eef1f5,#e2e7ee)" }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Platzhalter
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">Artikel</span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink">Thema folgt</h3>
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
