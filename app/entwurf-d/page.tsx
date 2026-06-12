"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ListingMock } from "@/components/mockups/ListingMock";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import {
  cta,
  hero,
  stats,
  problem,
  mechanism,
  cases,
  services,
  steps,
  faq,
  closing,
  midCta,
} from "@/lib/content";

/*
 * Entwurf D — „Raster": grafisch-schweizerische Richtung.
 * Harte Kanten, sichtbares Liniengerüst, Versatz-Schatten wie Druckebenen,
 * die Geometrie des Logos (Quadrat, Kreis, U-Form) als Gestaltungssystem.
 * Keine runden Ecken, keine weichen Schatten, keine Karten-Stapel.
 */

const hairline = "border-[#023047]/15";

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-3 border-2 border-brand-navy bg-brand-navy px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[6px_6px_0_0_#ff8a00] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#ff8a00] ${className}`}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </a>
  );
}

function SectionIndex({ n, name }: { n: string; name: string }) {
  return (
    <div className={`flex items-center gap-4 border-b ${hairline} pb-4`}>
      <span className="text-sm font-extrabold text-brand-orange">{n}</span>
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-ink">{name}</span>
      <span className={`h-px flex-1 bg-[#023047]/15`} />
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-brand-red" aria-hidden>
        <circle cx="5" cy="5" r="5" />
      </svg>
    </div>
  );
}

function LogoShapes({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-2 ${className}`} aria-hidden>
      <span className="h-10 w-10 bg-brand-orange" />
      <span className="h-10 w-10 rounded-full bg-brand-red" />
      <span className="h-10 w-10 border-b-[12px] border-l-[12px] border-r-[12px] border-brand-navy" />
    </div>
  );
}

function Header() {
  return (
    <header className={`sticky top-0 z-50 border-b ${hairline} bg-white/95 backdrop-blur-sm`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-8 w-auto" />
        <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="border-2 border-brand-navy px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-brand-navy hover:text-white"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={`border-b ${hairline}`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 pb-0 pt-16 sm:pt-20`}>
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="pb-16">
            <Reveal>
              <LogoShapes />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-ink-soft">{hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
                Profitables Wachstum auf Amazon.
                <br />
                <span className="bg-brand-orange px-2 text-white">Nicht teuer</span>{" "}
                <span className="font-light">erkaufter Umsatz.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.subline}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9">
                <CtaButton />
                <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
              </div>
            </Reveal>
          </div>
          <div className="relative hidden justify-center pb-10 lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <span className="absolute -left-8 -top-8 h-24 w-24 bg-brand-orange" aria-hidden />
              <span className="absolute -right-10 bottom-16 h-20 w-20 rounded-full bg-brand-red" aria-hidden />
              <ListingMock
                square
                image="/assets/img/vitaworld.jpg"
                title="Vitaworld Vitamin D3 + K2 Tropfen, hochdosiert, 50 ml"
                price="19,90 €"
                reviews="4.213"
                className="relative shadow-[14px_14px_0_0_#023047]"
              />
            </motion.div>
          </div>
        </div>
        <div className={`grid grid-cols-2 border-t ${hairline} lg:grid-cols-4`}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-7 ${i < 3 ? "lg:border-r lg:border-[#023047]/15" : ""} ${i % 2 === 0 ? "max-lg:border-r max-lg:border-[#023047]/15" : ""} ${i < 2 ? "max-lg:border-b max-lg:border-b-[#023047]/15" : ""}`}
            >
              <Reveal delay={i * 0.06}>
                <p className="text-4xl font-extrabold tracking-tight text-ink">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-soft">{s.label}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className={`border-b ${hairline} bg-surface-alt`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="01" name="Ausgangslage" />
        <Reveal className="mt-10 max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{problem.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
        <div className={`mt-14 border-t ${hairline}`}>
          {problem.pains.map((p, i) => (
            <Reveal key={p.title}>
              <div className={`grid gap-4 border-b ${hairline} py-8 sm:grid-cols-[6rem_18rem_1fr] sm:gap-8`}>
                <span
                  className="text-5xl font-extrabold leading-none text-transparent sm:text-6xl"
                  style={{ WebkitTextStroke: "2px #ff8a00" }}
                >
                  0{i + 1}
                </span>
                <h3 className="text-xl font-bold leading-snug text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-12 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Das Problem ist selten das Budget. <span className="bg-brand-orange px-2 text-white">Es ist die Reihenfolge.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  const widths = ["lg:w-1/2", "lg:w-3/4", "lg:w-full"];
  return (
    <section className={`border-b ${hairline}`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="02" name="Arbeitsweise" />
        <Reveal className="mt-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">{mechanism.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{mechanism.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{mechanism.intro}</p>
        </Reveal>
        <div className="mt-14 flex flex-col items-center gap-4">
          {[...mechanism.steps].reverse().map((s, idx) => {
            const i = 2 - idx; // Skalierung oben (schmal), Fundament unten (volle Breite)
            return (
              <Reveal key={s.name} delay={idx * 0.12} className={`w-full ${widths[idx]}`}>
                <div
                  className={`border-2 border-brand-navy bg-white p-6 sm:p-7 ${i === 0 ? "shadow-[10px_10px_0_0_#ff8a00]" : "shadow-[10px_10px_0_0_rgba(2,48,71,0.12)]"}`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-orange">
                      Ebene {i + 1} — {s.name}
                    </span>
                    <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <div className={`mt-14 flex flex-col items-start justify-between gap-6 border-t-2 border-brand-navy pt-8 lg:flex-row lg:items-center`}>
            <p className="max-w-2xl text-xl font-bold leading-snug text-ink sm:text-2xl">{mechanism.target}</p>
            <div className="flex items-center gap-3" aria-hidden>
              <span className="block h-3 w-40 bg-brand-orange" />
              <span className="block h-3 w-10 bg-[#cdd9e1]" />
              <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">80 / 20</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className={`border-b ${hairline} bg-surface-alt`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="03" name="Kundenbeispiele" />
        <Reveal className="mt-10 max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{cases.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{cases.subline}</p>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {cases.items.map((c, i) => (
            <Reveal key={c.brand} delay={i * 0.1}>
              <article className="grid grid-cols-[7rem_1fr] gap-6 sm:grid-cols-[10rem_1fr]">
                <div className="relative aspect-[4/5] self-start shadow-[8px_8px_0_0_#ff8a00]">
                  <Image src={c.image} alt={`${c.brand} Produkt`} fill sizes="160px" className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink-soft">
                    {c.brand} — {c.category}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {c.metricTo || c.metric}{" "}
                    <span className="align-middle text-base font-bold uppercase tracking-widest text-brand-red">{c.metricLabel}</span>
                  </p>
                  {c.metricFrom ? (
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-ink-soft">vorher {c.metricFrom}</p>
                  ) : null}
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-ink-soft">({c.note})</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className={`mt-16 flex flex-col items-start justify-between gap-6 border-2 border-brand-navy bg-white p-7 shadow-[10px_10px_0_0_#023047] lg:flex-row lg:items-center`}>
            <p className="text-xl font-extrabold text-ink sm:text-2xl">{midCta.question}</p>
            <CtaButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const rows = [
    { idx: "A", tag: services.foundation.name, title: services.foundation.title, text: services.foundation.text },
    ...services.levers.map((l, i) => ({ idx: ["B", "C", "D"][i], tag: "Wachstumshebel", title: l.title, text: l.text })),
    { idx: "E", tag: services.bracket.name, title: services.bracket.title, text: services.bracket.text },
  ];
  return (
    <section className={`border-b ${hairline}`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="04" name="Full Service" />
        <Reveal className="mt-10 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{services.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
        <div className={`mt-14 border-t-2 border-brand-navy`}>
          {rows.map((r) => (
            <Reveal key={r.title}>
              <div className={`grid gap-3 border-b ${hairline} py-7 transition-colors hover:bg-surface-alt sm:grid-cols-[4rem_14rem_14rem_1fr] sm:gap-6`}>
                <span className="text-2xl font-extrabold text-brand-orange">{r.idx}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft sm:pt-2">{r.tag}</span>
                <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className={`border-b ${hairline} bg-surface-alt`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="05" name="Start" />
        <Reveal className="mt-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{steps.headline}</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border-2 border-brand-navy bg-[#023047]/15 lg:grid-cols-3">
          {steps.items.map((s, i) => (
            <div key={s.title} className="bg-white p-7">
              <Reveal delay={i * 0.08}>
                <span
                  className="text-6xl font-extrabold leading-none text-transparent"
                  style={{ WebkitTextStroke: "2px #023047" }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brand-red">{s.duration}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-12">
          <CtaButton label={`Schritt 1 starten: ${cta.label}`} />
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`border-b ${hairline}`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="06" name="Einwände" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{faq.headline}</h2>
            <LogoShapes className="mt-8" />
          </Reveal>
          <div className={`border-t ${hairline}`}>
            {faq.items.map((item, i) => (
              <div key={item.q} className={`border-b ${hairline}`}>
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-base font-bold text-ink">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center border-2 border-brand-navy text-ink transition-colors ${open === i ? "bg-brand-navy text-white" : ""}`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" className={`h-3 w-3 transition-transform ${open === i ? "rotate-45" : ""}`}>
                      <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    </svg>
                  </span>
                </button>
                {open === i && <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-soft">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="kontakt" className={`border-b ${hairline} bg-surface-alt`}>
      <div className={`mx-auto max-w-6xl border-x ${hairline} px-5 py-20`}>
        <SectionIndex n="07" name="Kontakt" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[320px]">
              <span className="absolute -left-4 -top-4 h-full w-full border-2 border-brand-orange" aria-hidden />
              <div className="relative aspect-square w-full overflow-hidden shadow-[10px_10px_0_0_#023047]">
                <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="320px" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{closing.headline}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{closing.text}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-ink">
              {closing.person} — {closing.role}
            </p>
            <div className="mt-8">
              <CtaButton />
              <p className="mt-3 text-xs text-ink-soft">{closing.micro}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className={`mx-auto flex max-w-6xl flex-col items-center gap-5 border-x ${hairline} px-5 py-12 text-center`}>
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto" />
        <p className="max-w-md text-xs leading-relaxed text-ink-soft">
          Entwurf D — „Raster". Navigation und Unterseiten folgen in der Umsetzungsphase.
        </p>
      </div>
    </footer>
  );
}

export default function EntwurfD() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Mechanism />
      <Cases />
      <Services />
      <Steps />
      <Faq />
      <Closing />
      <Footer />
    </main>
  );
}
