"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const CHIP = [
  "bg-brand-500/10 text-brand-600",
  "bg-cyan/10 text-cyan",
  "bg-red/10 text-red",
  "bg-emerald/10 text-emerald",
  "bg-navy/10 text-navy",
];

const services: { n: string; icon: IconName; name: string; result: string; href: string }[] = [
  { n: "01", icon: "strategy", name: "Strategie & Analyse", result: "Erst die Daten, dann der Plan.", href: "/leistungen/strategie" },
  { n: "02", icon: "content", name: "Content & Listings", result: "Aus Klicks werden Käufe.", href: "/leistungen/listing-seo" },
  { n: "03", icon: "ads", name: "Advertising / PPC", result: "Profitabel skalieren.", href: "/leistungen/ppc-advertising" },
  { n: "04", icon: "account", name: "Account-Management", result: "Bestand, Buy-Box, Cases im Griff.", href: "/leistungen/account-management" },
  { n: "05", icon: "globe", name: "Internationalisierung", result: "Lokalisieren statt übersetzen.", href: "/leistungen/internationalisierung" },
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
          {services.map((s, i) => (
            <RevealItem key={s.n} className="h-full">
              <a href={s.href} className="surface surface-hover group flex h-full flex-col items-center p-5 text-center">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${CHIP[i % CHIP.length]}`}>
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="mt-4 text-sm font-bold leading-snug text-ink">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-snug text-ink-muted">{s.result}</p>
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
