"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";

const services: { n: string; name: string; result: string; href: string; image?: string }[] = [
  { n: "01", name: "Strategie & Analyse", result: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { n: "02", name: "Content & Listings", result: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { n: "03", name: "Advertising / PPC", result: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { n: "04", name: "Account-Management", result: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { n: "05", name: "Internationalisierung", result: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
];

export function FullService() {
  return (
    <section className="relative bg-[#EDF5FB] py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Full Service"
          size="compact"
          title={
            <>
              Fünf Leistungen, in der <span className="text-gradient">richtigen Reihenfolge.</span>
            </>
          }
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
          {services.map((s) => (
            <RevealItem key={s.n} className="h-full">
              <a href={s.href} className="surface surface-hover group flex h-full flex-col overflow-hidden">
                {/* per-service image (placeholder until the graphic is added) */}
                <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-[linear-gradient(135deg,#ffffff,#e7ecf2)]">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Bild</span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-extrabold text-brand-600 shadow-soft ring-1 ring-black/[0.05]">
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold leading-snug text-ink">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-ink-muted">{s.result}</p>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <a href="/full-service" className="btn-ghost">
              Alle Leistungen ansehen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
