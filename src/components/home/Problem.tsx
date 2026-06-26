"use client";

import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Ambient } from "../ui/Ambient";
import { Icon, type IconName } from "../ui/Icon";

const pains: { icon: IconName; title: string; body: string; lead?: boolean }[] = [
  { icon: "target", title: "Zeit-Engpass", body: "Listing-Optimierung ist ein Vollzeitjob. Im Tagesgeschäft bleibt sie liegen.", lead: true },
  { icon: "chart", title: "Nicht auf CTR und CVR optimiert", body: "Klickrate und Conversion sind die wichtigsten Ranking-Signale. Wer sie ignoriert, verschenkt Umsatz." },
  { icon: "margin", title: "Umsatz stagniert", body: "Seit Quartalen seitwärts. Mehr Wachstum gibt es nur über mehr Ad-Spend." },
  { icon: "ads", title: "PPC ohne Conversion", body: "Klicks ja, Verkauf nein. Jeder Klick auf ein schwaches Listing ist verbranntes Budget." },
  { icon: "search", title: "KPIs als Black Box", body: "Ohne TACoS-, ACoS- und Profitabilitätsziele entscheidet der Bauch." },
  { icon: "spark", title: "Content nicht KI-ready", body: "Rufus und COSMO bewerten Listings neu. Wer das ignoriert, verliert organische Sichtbarkeit." },
  { icon: "rocket", title: "Launches starten blind", body: "Neue Produkte ohne Wettbewerbs-Analyse: langer Anlauf, später Break-even." },
  { icon: "account", title: "Alles hängt an einer Person", body: "Fällt sie aus, steht Amazon still." },
];

export function Problem() {
  return (
    <section className="relative isolate bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Das Problem
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
              Das Nötigste reicht auf <span className="text-gradient">Amazon nicht.</span>
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {pains.map((p) => (
            <RevealItem key={p.title}>
              <div
                className={`glass glass-hover group flex h-full flex-col items-center rounded-3xl p-5 text-center md:items-start md:text-left ${
                  p.lead ? "ring-2 ring-brand-300/70" : ""
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-soft ring-1 ring-black/[0.04] ${
                    p.lead ? "text-white" : "bg-white text-brand-600"
                  }`}
                  style={p.lead ? { backgroundImage: "var(--brand-gradient)" } : undefined}
                >
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className="mt-4 text-balance text-base font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-brand-100 bg-white/70 px-5 py-4 shadow-soft backdrop-blur">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-red text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </span>
            <p className="text-balance text-sm font-medium leading-snug text-ink md:text-base">
              Das bekämpft nur Symptome. Die Ursache bleibt: ein Listing, das organisch nicht verkauft.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
