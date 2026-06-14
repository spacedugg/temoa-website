"use client";

import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";

const founders = [
  {
    name: "Clemens",
    role: "Founder & Sales",
    body: "Erster Ansprechpartner für neue Marken – ehrlich, ohne Verkaufsdruck, mit klarem Blick aufs Potenzial.",
    img: "/team/Clemens.jpg",
    accent: "from-brand-500/30 to-transparent",
  },
  {
    name: "Christoph",
    role: "Founder & Client Success",
    body: "Sorgt dafür, dass aus Strategie messbare Ergebnisse werden – und Kunden langfristig bleiben.",
    img: "/team/Christoph.jpg",
    accent: "from-red/30 to-transparent",
  },
  {
    name: "Eddie",
    role: "Founder & Operations",
    body: "Hält Prozesse, Tools und Reporting im Griff, damit das Team schnell und sauber umsetzt.",
    img: "/team/Eddie.jpg",
    accent: "from-cyan/30 to-transparent",
  },
];

const team = [
  { name: "Marvin", img: "/team/Marvin.jpg" },
  { name: "Ole", img: "/team/Ole.jpg" },
  { name: "Jonas", img: "/team/Jonas.jpg" },
  { name: "Marina", img: "/team/Marina.jpg" },
  { name: "Dias", img: "/team/Dias.jpg" },
  { name: "Vadim", img: "/team/Vadim.jpg" },
  { name: "Anzelika", img: "/team/Anzelika.jpg" },
  { name: "Burak", img: "/team/Burak.jpeg" },
  { name: "Noor", img: "/team/Noor.jpeg" },
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
                <div className="card relative h-full overflow-hidden p-3">
                  <div className="relative h-72 overflow-hidden rounded-2xl">
                    <Image
                      src={f.img}
                      alt={`${f.name} – ${f.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${f.accent} mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent p-5 pt-16">
                      <h3 className="text-xl font-bold text-white">{f.name}</h3>
                      <p className="text-sm font-semibold text-brand-300">{f.role}</p>
                    </div>
                  </div>
                  <p className="px-3 py-4 text-sm leading-relaxed text-ink-muted">{f.body}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Team strip */}
        <div className="mt-14 rounded-3xl border border-navy/10 bg-canvas-alt p-7 md:p-9">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-ink">Spezialisten für jeden Hebel.</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Strategie, Content, Advertising und Account Management – abgedeckt von Menschen,
                die ihr Handwerk beherrschen.
              </p>
            </div>
            <RevealGroup className="flex flex-wrap gap-3" stagger={0.05}>
              {team.map((m) => (
                <RevealItem key={m.name}>
                  <div className="group flex flex-col items-center gap-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-navy/10 transition-transform duration-300 group-hover:-translate-y-1">
                      <Image src={m.img} alt={m.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-ink-muted">{m.name}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
