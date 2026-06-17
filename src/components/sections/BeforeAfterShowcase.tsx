"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { BeforeAfter } from "../ui/BeforeAfter";
import { LISTING_SETS } from "@/lib/showcase";

const pairs = LISTING_SETS.filter((s) => s.before && s.after).slice(0, 2);

export function BeforeAfterShowcase() {
  if (pairs.length === 0) return null;
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Vorher / Nachher"
          title={
            <>
              Dasselbe Produkt, <span className="text-gradient">neu inszeniert.</span>
            </>
          }
          description="Schiebt den Regler: links das Hauptbild, mit dem die Marke gestartet ist, rechts unsere Version. Genau dieser Unterschied entscheidet im Suchergebnis über den Klick."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {pairs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div>
                <BeforeAfter before={p.before!} after={p.after} />
                <p className="mt-3 text-center text-sm text-ink-faint">{p.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
