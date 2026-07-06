"use client";

import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const ICOLOR = ["text-brand-600", "text-cyan", "text-red", "text-navy"];

const pains: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "Zeit-Engpass", body: "Listing-Optimierung ist ein Vollzeitjob. Im Tagesgeschäft bleibt sie liegen." },
  { icon: "chart", title: "Falsche Signale", body: "Klickrate und Conversion, die wichtigsten Ranking-Signale, werden ignoriert." },
  { icon: "ads", title: "PPC ohne Conversion", body: "Jeder Klick auf ein schwaches Listing ist verbranntes Budget." },
  { icon: "account", title: "Abhängig von einer Person", body: "Fällt sie aus, steht Amazon still." },
];

export function Problem() {
  return (
    <section className="relative bg-[#EDF5FB] py-20 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Das Problem
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Das Nötigste reicht auf <span className="text-gradient">Amazon nicht.</span>
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.06}>
          {pains.map((p, i) => (
            <RevealItem key={p.title} className="h-full">
              <div className="surface surface-hover flex h-full flex-col items-center p-5 text-center">
                <span className={ICOLOR[i % ICOLOR.length]}>
                  <Icon name={p.icon} size={30} />
                </span>
                <h3 className="mt-4 text-balance text-base font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white px-6 py-6 text-center shadow-lift ring-1 ring-black/[0.05]">
            <span className="eyebrow justify-center !text-red">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Die Ursache
            </span>
            <p className="mt-3 text-balance text-lg font-semibold leading-snug text-ink md:text-xl">
              Das bekämpft nur Symptome. Was bleibt, ist{" "}
              <span className="text-gradient">ein Listing, das organisch nicht verkauft.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
