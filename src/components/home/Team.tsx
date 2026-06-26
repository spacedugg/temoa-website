"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/* Drei Lifestyle-Bilder statt Einzelporträts. Echte Bilder liefert der Kunde. */
const shots = [
  { label: "Team beim Kickoff" },
  { label: "Im Tagesgeschäft" },
  { label: "Strategie-Session" },
];

export function Team() {
  return (
    <section id="team" className="relative bg-[#EDF5FB] py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Team"
          size="compact"
          title={
            <>
              Das Team hinter <span className="text-gradient">temoa.</span>
            </>
          }
          description="Amazon-Spezialisten, die eure Marke kennen wie die eigene."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {shots.map((s) => (
            <RevealItem key={s.label}>
              <div className="group relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06]">
                <div
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ background: "linear-gradient(135deg,#eef1f5,#e2e7ee)" }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    {s.label}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/55 to-transparent p-4 pt-12">
                  <span className="text-sm font-semibold text-white">temoa</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
