"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
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
} from "@/lib/content";

const gradientText = "bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent";

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-red px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_40px_-12px_rgba(255,80,30,0.65)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 transition-transform group-hover:translate-x-1">
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
          <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-line/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-8 w-auto" />
        <nav className="hidden items-center gap-8 text-sm font-extrabold uppercase tracking-wide text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="rounded-full bg-gradient-to-r from-brand-orange to-brand-red px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(255,80,30,0.6)]"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

function Marquee() {
  const words = ["Organic First", "60+ Marken", "21 Mio. € betreut", "98 % Kundenbindung", "5 Marktplätze", "Full Service"];
  const row = [...words, ...words];
  return (
    <div className="relative -rotate-1 overflow-hidden bg-gradient-to-r from-brand-orange to-brand-red py-3.5 shadow-[0_20px_40px_-20px_rgba(255,80,30,0.5)]">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap pr-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-extrabold uppercase tracking-[0.18em] text-white">
            {w}
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-white/70" aria-hidden>
              <circle cx="6" cy="6" r="6" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-32 sm:pt-40">
      <div
        className="pointer-events-none absolute -left-44 top-20 h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #ffd9b8 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-ink-soft">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-7xl">
              Profitables
              <br />
              <span className={gradientText}>Wachstum</span>
              <br />
              auf Amazon.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-2xl font-bold text-ink-soft sm:text-3xl">Nicht teuer erkaufter Umsatz.</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.subline}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9">
              <CtaButton />
              <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto h-[480px] w-full max-w-[420px]">
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute right-0 top-0"
          >
            <ListingMock
              image="/assets/img/vitaworld.jpg"
              title="Vitaworld Vitamin D3 + K2 Tropfen, hochdosiert, 50 ml"
              price="19,90 €"
              reviews="4.213"
              className="shadow-[0_50px_90px_-35px_rgba(2,48,71,0.45)]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="absolute -left-4 bottom-4 sm:left-0"
          >
            <DashboardMock className="!w-[300px] shadow-[0_50px_90px_-35px_rgba(2,48,71,0.4)] sm:!w-[340px]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -right-2 bottom-28"
          >
            <MetricChip label="ROAS" value="2,1 auf 4,8" className="shadow-[0_24px_48px_-20px_rgba(2,48,71,0.5)]" />
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-t-4 border-brand-orange pt-5">
                <p className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${gradientText}`}>{s.value}</p>
                <p className="mt-3 max-w-[240px] text-sm font-bold leading-snug text-ink">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-surface-alt py-24 [clip-path:polygon(0_2.5rem,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(0_5rem,100%_0,100%_100%,0_100%)]">
      <div className="mx-auto max-w-7xl px-5 pt-10">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{problem.headline}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl bg-white p-8 shadow-[0_28px_55px_-35px_rgba(2,48,71,0.4)] transition-transform hover:-translate-y-1.5">
                <p className={`text-6xl font-extrabold ${gradientText}`}>0{i + 1}</p>
                <h3 className="mt-4 text-xl font-extrabold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18}>
          <p className="mt-16 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Das Problem ist selten das Budget.
            <br />
            <span className={gradientText}>Es ist die Reihenfolge.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-brand-red">{mechanism.eyebrow}</p>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Organic First. <span className={gradientText}>Erst verkauft das Listing,</span> dann skalieren die Ads.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{mechanism.intro}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-[0_28px_55px_-35px_rgba(2,48,71,0.4)]">
                <span
                  className="absolute -right-6 -top-8 text-[110px] font-extrabold leading-none text-surface-alt"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="relative text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{s.name}</p>
                <h3 className="relative mt-3 text-2xl font-extrabold text-ink">{s.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-14 grid items-center gap-8 rounded-3xl bg-white p-8 shadow-[0_40px_80px_-45px_rgba(2,48,71,0.5)] ring-1 ring-line lg:grid-cols-[1fr_auto] lg:p-12">
            <p className="text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
              Unser Zielbild: <span className={gradientText}>80 % des Umsatzes organisch.</span> Werbung skaliert
              das Geschäft — sie trägt es nicht.
            </p>
            <DashboardMock className="mx-auto !w-[300px] sm:!w-[360px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="bg-surface-alt py-24 [clip-path:polygon(0_0,100%_2.5rem,100%_100%,0_100%)] sm:[clip-path:polygon(0_0,100%_5rem,100%_100%,0_100%)]">
      <div className="mx-auto max-w-7xl px-5 pt-10">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{cases.headline}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{cases.subline}</p>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {cases.items.map((c, i) => (
            <Reveal key={c.brand} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl shadow-[0_40px_85px_-45px_rgba(2,48,71,0.55)]">
                <div className="relative h-[420px]">
                  <Image
                    src={c.image}
                    alt={`${c.brand} Produkt`}
                    fill
                    sizes="(min-width:1024px) 620px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-white/70">
                    {c.brand} · {c.category}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
                    {c.metricTo || c.metric} <span className="text-2xl font-bold text-brand-orange">{c.metricLabel}</span>
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{c.text}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-white/60">({c.note})</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-16 text-center">
          <p className="text-2xl font-extrabold text-ink">{midCta.question}</p>
          <CtaButton className="mt-6" />
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{services.headline}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
        <div className="mt-14 space-y-5">
          {[services.foundation, ...services.levers.map((l) => ({ name: "", ...l })), services.bracket].map(
            (s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group grid items-center gap-3 rounded-2xl border border-line bg-white px-6 py-6 shadow-[0_20px_45px_-32px_rgba(2,48,71,0.4)] transition-colors hover:border-brand-orange sm:grid-cols-[3rem_16rem_1fr] sm:gap-8 sm:px-8">
                  <span className={`text-2xl font-extrabold ${gradientText}`}>0{i + 1}</span>
                  <div>
                    {"name" in s && s.name ? (
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-orange">{s.name}</p>
                    ) : null}
                    <h3 className="text-xl font-extrabold text-ink">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{steps.headline}</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-[0_28px_55px_-35px_rgba(2,48,71,0.4)]">
                <p className={`text-5xl font-extrabold ${gradientText}`}>{i + 1}</p>
                <h3 className="mt-4 text-xl font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-brand-red">{s.duration}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-12">
          <CtaButton label={`Schritt 1 starten: ${cta.label}`} />
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{faq.headline}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Skepsis gegenüber Agenturen ist berechtigt. Deshalb beantworten wir die kritischen Fragen, bevor ihr sie
            stellen müsst.
          </p>
        </Reveal>
        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <div
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  open === i ? "border-brand-orange shadow-[0_24px_48px_-32px_rgba(255,138,0,0.5)]" : "border-line"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-base font-extrabold text-ink">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-transform ${
                      open === i ? "rotate-45 bg-gradient-to-r from-brand-orange to-brand-red" : "bg-ink"
                    }`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3">
                      <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {open === i && <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">{item.a}</p>}
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
    <section id="kontakt" className="bg-surface pb-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-orange to-brand-red p-1 shadow-[0_50px_100px_-45px_rgba(255,80,30,0.65)]">
            <div className="grid items-center gap-10 rounded-[2.3rem] bg-white p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
              <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl sm:h-56 sm:w-56">
                <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="224px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  Lasst uns über <span className={gradientText}>euer Konto</span> sprechen.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{closing.text}</p>
                <p className="mt-4 text-sm font-extrabold text-ink">
                  {closing.person} · {closing.role}
                </p>
                <div className="mt-7">
                  <CtaButton />
                  <p className="mt-3 text-xs text-ink-soft">{closing.micro}</p>
                </div>
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
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto" />
        <p className="max-w-md text-xs leading-relaxed text-ink-soft">
          Entwurf C — „Signal". Navigation und Unterseiten folgen in der Umsetzungsphase.
        </p>
      </div>
    </footer>
  );
}

export default function EntwurfC() {
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
