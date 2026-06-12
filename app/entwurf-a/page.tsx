"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ListingMock } from "@/components/mockups/ListingMock";
import { DashboardMock, MetricChip } from "@/components/mockups/DashboardMock";
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
  navServices,
} from "@/lib/content";

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(255,138,0,0.55)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-8 w-auto sm:h-9" />
        <nav className="hidden items-center gap-7 text-sm font-bold text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
          <a
            href={cta.href}
            className="rounded-full bg-ink px-5 py-2.5 text-white transition-colors hover:bg-brand-orange"
          >
            {cta.short}
          </a>
        </nav>
        <a href={cta.href} className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white lg:hidden">
          {cta.short}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -50]);
  const y2 = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section className="relative overflow-hidden bg-surface pb-20 pt-28 sm:pt-36">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #ffe3c2 0%, #fff5ea 55%, transparent 75%)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Profitables Wachstum auf Amazon.{" "}
              <span className="relative inline-block">
                Nicht teuer
                <svg viewBox="0 0 200 10" className="absolute -bottom-1 left-0 w-full" aria-hidden>
                  <path d="M2 7c50-5 130-5 196-2" fill="none" stroke="#ff8a00" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{" "}
              erkaufter Umsatz.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.subline}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <CtaButton />
              <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-10 text-sm font-bold text-ink">
              60+ betreute Marken <span className="mx-2 text-line">|</span> 21 Mio. € betreuter Umsatz{" "}
              <span className="mx-2 text-line">|</span> 98 % Kundenbindung
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-[440px] sm:h-[520px]">
          <motion.div style={{ y: y2 }} className="absolute right-0 top-10">
            <DashboardMock className="shadow-[0_40px_80px_-30px_rgba(2,48,71,0.35)]" />
          </motion.div>
          <motion.div style={{ y: y1 }} className="absolute bottom-0 left-0">
            <ListingMock
              image="/assets/img/vitaworld.jpg"
              title="Vitaworld Vitamin D3 + K2 Tropfen, hochdosiert, 50 ml"
              price="19,90 €"
              reviews="4.213"
              className="shadow-[0_40px_80px_-30px_rgba(2,48,71,0.3)]"
            />
          </motion.div>
          <motion.div style={{ y: y1 }} className="absolute -left-2 top-2 sm:-left-6">
            <MetricChip label="Organischer Anteil" value="80 % Zielbild" className="shadow-[0_20px_40px_-18px_rgba(2,48,71,0.35)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-line bg-surface-alt py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            Marken, die uns ihr Amazon-Geschäft anvertrauen
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{s.value}</p>
              <p className="mx-auto mt-2 max-w-[220px] text-sm text-ink-soft">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{problem.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.25)]">
                <span className="text-sm font-extrabold text-brand-orange">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-2xl font-bold text-ink">
            Das Problem ist selten das Budget. <span className="text-brand-orange">Es ist die Reihenfolge.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">{mechanism.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{mechanism.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{mechanism.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <div
                className="h-full rounded-2xl bg-white p-7 shadow-[0_30px_60px_-35px_rgba(2,48,71,0.4)]"
                style={{ marginTop: `${(2 - i) * 14}px` }}
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
                  {i + 1}. {s.name}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border-l-4 border-brand-orange bg-white p-7 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.25)]">
            <p className="text-xl font-bold leading-relaxed text-ink">{mechanism.target}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{cases.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{cases.subline}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {cases.items.map((c, i) => (
            <Reveal key={c.brand} delay={i * 0.12}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_70px_-40px_rgba(2,48,71,0.35)]">
                <div className="relative h-56 overflow-hidden">
                  <Image src={c.image} alt={`${c.brand} Produkt`} fill sizes="(min-width:1024px) 540px, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">{c.category}</p>
                    <p className="text-2xl font-extrabold">{c.brand}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-3xl font-extrabold text-brand-orange">{c.metric}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-soft">({c.note})</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-16 rounded-3xl bg-ink px-8 py-12 text-center shadow-[0_40px_80px_-40px_rgba(2,48,71,0.6)]">
            <p className="text-2xl font-extrabold text-white">{midCta.question}</p>
            <CtaButton className="mt-6" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{services.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
        <div className="mt-12 space-y-6">
          <Reveal>
            <div className="rounded-2xl border-2 border-brand-orange/40 bg-white p-7 shadow-[0_24px_50px_-30px_rgba(255,138,0,0.35)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">{services.foundation.name}</p>
              <h3 className="mt-2 text-2xl font-bold text-ink">{services.foundation.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{services.foundation.text}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {services.levers.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.25)]">
                  <h3 className="text-xl font-bold text-ink">{l.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="rounded-2xl bg-ink p-7 text-white shadow-[0_30px_60px_-35px_rgba(2,48,71,0.7)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">{services.bracket.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{services.bracket.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">{services.bracket.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{steps.headline}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-line bg-white p-7 pt-10 shadow-[0_24px_50px_-30px_rgba(2,48,71,0.25)]">
                <span className="absolute -top-5 left-7 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-extrabold text-white shadow-lg">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-orange">{s.duration}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-12 text-center">
          <CtaButton label={`Schritt 1 starten: ${cta.label}`} />
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{faq.headline}</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_-30px_rgba(2,48,71,0.3)]">
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-base font-bold text-ink">{item.q}</span>
                  <span
                    className={`text-2xl font-light text-brand-orange transition-transform ${open === i ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="kontakt" className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl border border-line bg-white p-8 shadow-[0_40px_90px_-45px_rgba(2,48,71,0.4)] sm:p-12 lg:grid-cols-[0.4fr_0.6fr]">
            <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-2xl">
              <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="300px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{closing.headline}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{closing.text}</p>
              <p className="mt-4 text-sm font-bold text-ink">
                {closing.person} · {closing.role}
              </p>
              <div className="mt-7">
                <CtaButton />
                <p className="mt-3 text-xs text-ink-soft">{closing.micro}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto" />
        <p className="max-w-md text-xs leading-relaxed text-ink-soft">
          Entwurf A — „Editorial". Navigation und Unterseiten ({navServices.length} Leistungen, Case
          Studies, Team, Blog, Rechtliches) folgen in der Umsetzungsphase.
        </p>
      </div>
    </footer>
  );
}

export default function EntwurfA() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
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
