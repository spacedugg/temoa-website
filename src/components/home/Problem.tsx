"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const pains: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "Zeit-Engpass.", body: "Listing-Optimierung ist ein Vollzeitjob. Im Tagesgeschäft bleibt sie liegen." },
  { icon: "chart", title: "Nicht auf CTR und CVR optimiert.", body: "Klickrate und Conversion sind die wichtigsten Signale für Amazons Ranking. Wer sie ignoriert, verschenkt Umsatz." },
  { icon: "margin", title: "Umsatz stagniert.", body: "Seit Quartalen seitwärts. Mehr Wachstum gibt es nur über mehr Ad-Spend." },
  { icon: "ads", title: "PPC ohne Conversion.", body: "Klicks ja, Verkauf nein. Jeder Klick auf ein schwaches Listing ist verbranntes Budget." },
  { icon: "layers", title: "KPIs als Black Box.", body: "Ohne TACoS-, ACoS- und Profitabilitätsziele passiert jede Entscheidung aus dem Bauch." },
  { icon: "spark", title: "Content nicht KI-ready.", body: "Rufus und COSMO bewerten Listings anders als früher. Wer das ignoriert, verliert organische Sichtbarkeit." },
  { icon: "rocket", title: "Launches starten blind.", body: "Neue Produkte ohne Wettbewerbs-Analyse: langer Anlauf, später Break-even." },
  { icon: "shield", title: "Alles hängt an einer Person.", body: "Fällt sie aus, steht Amazon still." },
];

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Das Problem"
          title={
            <>
              Das Nötigste reicht auf <span className="text-gradient">Amazon nicht.</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {pains.map((p) => (
            <RevealItem key={p.title}>
              <div className="card group h-full p-6 transition-shadow duration-300 hover:shadow-lift">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-brand-100 bg-brand-50/50 px-7 py-6 text-center">
            <p className="text-base font-medium text-ink md:text-lg">
              Das bekämpft nur Symptome. Die Ursache bleibt: ein Listing, das
              organisch nicht verkauft.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
