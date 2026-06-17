"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { caseStudies } from "@/lib/copy";

export function Cases() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Drei Konten, ein Vorgehen"
          title={<>Was passiert, wenn das Fundament <span className="text-gradient">zuerst steht.</span></>}
          description="Schädlingsbekämpfung, Haushalt, Garten – drei Branchen mit demselben Hebel: erst das Listing zum Verkäufer machen, dann die Ads aufdrehen. Jede Kennzahl unten ist ein Einzelfall aus einem konkreten Mandat, kein Durchschnitt und kein Versprechen."
        />
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <RevealItem key={c.brand}>
              <div className="card flex h-full flex-col p-7">
                <span className="text-xs font-medium text-ink-faint">{c.sector}</span>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: c.color }}>{c.metric}</span>
                  <span className="text-base font-bold text-ink">{c.brand}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink-muted">{c.metricLabel}</p>

                <div className="mt-5 rounded-2xl border border-navy/[0.06] bg-canvas-alt p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Ausgangslage</span>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{c.ausgangslage}</p>
                </div>

                <p className="mt-5 flex-1 text-[15px] italic leading-relaxed text-ink">„{c.quote}"</p>
                <p className="mt-4 text-xs text-ink-faint">Kundenbeispiel</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function CasesClosing() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Euer Konto, eure Zahl"
          title={<>Welche Kennzahl steckt <span className="text-gradient">in eurem Konto?</span></>}
          description="In 30 Minuten schauen wir gemeinsam auf eure Marge, eure Listings und den Hebel, der bei euch am schnellsten zieht. Ehrlich eingeschätzt, ohne Verkaufsdruck."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <a href="/gespraech-vereinbaren" className="btn-primary">Gespräch vereinbaren</a>
        </div>
      </div>
    </section>
  );
}
