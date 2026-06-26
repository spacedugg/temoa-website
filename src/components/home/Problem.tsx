"use client";

import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const pains: { icon: IconName; title: string; body: string; lead?: boolean }[] = [
  { icon: "target", title: "Zeit-Engpass", body: "Listing-Optimierung ist ein Vollzeitjob. Im Tagesgeschäft bleibt sie liegen.", lead: true },
  { icon: "ads", title: "PPC ohne Conversion", body: "Klicks ja, Verkauf nein. Jeder Klick auf ein schwaches Listing ist verbranntes Budget." },
  { icon: "margin", title: "Umsatz stagniert", body: "Seit Quartalen seitwärts. Mehr Wachstum gibt es nur über mehr Ad-Spend." },
  { icon: "layers", title: "KPIs als Black Box", body: "Ohne TACoS-, ACoS- und Profitabilitätsziele entscheidet der Bauch." },
  { icon: "spark", title: "Content nicht KI-ready", body: "Rufus und COSMO bewerten Listings neu. Wer das ignoriert, verliert Sichtbarkeit." },
];

export function Problem() {
  return (
    <section className="section-fade relative py-20 md:py-24">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Das Problem
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 max-w-xl text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            Das Nötigste reicht auf <span className="text-gradient">Amazon nicht.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          {pains.map((p) => (
            <RevealItem key={p.title}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  p.lead
                    ? "border-brand-200 bg-brand-50/70 shadow-soft"
                    : "border-black/[0.06] bg-white/80 shadow-soft"
                }`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-black/[0.04]">
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                <span className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-brand-500 to-red transition-all duration-300 group-hover:w-10" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 rounded-full border border-brand-100 bg-white/70 px-6 py-3.5 text-center shadow-soft backdrop-blur">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-red text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </span>
            <p className="text-sm font-medium text-ink md:text-base">
              Das bekämpft nur Symptome. Die Ursache bleibt: ein Listing, das organisch nicht verkauft.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
