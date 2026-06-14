"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";

const founders = [
  {
    name: "Clemens",
    role: "Founder & Sales",
    body: "Erster Ansprechpartner für neue Marken – ehrlich, ohne Verkaufsdruck, mit klarem Blick aufs Potenzial.",
    g: "from-brand-500 to-violet",
  },
  {
    name: "Christoph",
    role: "Founder & Client Success",
    body: "Sorgt dafür, dass aus Strategie messbare Ergebnisse werden – und Kunden langfristig bleiben.",
    g: "from-violet to-cyan",
  },
  {
    name: "Eddie",
    role: "Founder & Operations",
    body: "Hält Prozesse, Tools und Reporting im Griff, damit das Team schnell und sauber umsetzt.",
    g: "from-cyan to-emerald",
  },
];

export function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Das Team"
          title={
            <>
              Direkter Draht <span className="text-gradient">statt Ticketsystem.</span>
            </>
          }
          description="Drei Gründer und ein eingespieltes Team betreuen euren Account – persönlich, nicht über ein anonymes Support-Postfach. Ein fester Marketplace-Consultant betreut nur eine Handvoll Marken."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {founders.map((f) => (
            <RevealItem key={f.name}>
              <TiltCard className="group h-full" intensity={6}>
                <div className="card relative h-full overflow-hidden p-7">
                  {/* avatar placeholder – ersetzbar durch echtes Foto */}
                  <div className={`relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${f.g}`}>
                    <span className="text-6xl font-bold text-white/90">{f.name[0]}</span>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      Foto folgt
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-ink">{f.name}</h3>
                    <p className="text-sm font-semibold text-gradient">{f.role} · TEMOA</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.body}</p>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
