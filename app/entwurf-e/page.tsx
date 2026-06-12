"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
 * Entwurf E — „Licht": cinematische, kartenlose Richtung.
 * Inhalte liegen direkt auf Weiß, getrennt durch Licht statt durch Boxen:
 * großflächige Glow-Auren, extreme Gewichts-Kontraste der Caros
 * (Thin/Light gegen ExtraBold), frei schwebende Kompositionen.
 */

function Glow({ className = "", color = "#ff8a00", size = 700, opacity = 0.16 }: { className?: string; color?: string; size?: number; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: color, opacity }}
    />
  );
}

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden
        className="absolute -inset-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-red opacity-35 blur-lg"
      />
      <a
        href={cta.href}
        className="relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-red px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
      >
        {label}
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </span>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-8 w-auto sm:h-9" />
        <nav className="hidden items-center gap-8 text-sm font-light text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="rounded-full border border-ink/20 px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-28 pt-36 sm:pt-44">
      <Glow className="-top-40 left-1/2 -translate-x-[80%]" color="#ff8a00" size={800} opacity={0.14} />
      <Glow className="top-24 right-[-200px]" color="#023047" size={600} opacity={0.08} />
      <Glow className="top-[480px] left-[-260px]" color="#ff3131" size={620} opacity={0.09} />

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-light tracking-[0.35em] text-ink-soft uppercase">{hero.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-5xl leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]">
            <span className="font-thin">Profitables</span>{" "}
            <span className="font-extrabold">Wachstum</span>
            <br />
            <span className="font-thin">auf Amazon.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 text-xl font-light text-ink-soft sm:text-2xl">
            Nicht <span className="font-bold text-brand-red">teuer erkaufter</span> Umsatz.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-ink-soft">{hero.subline}</p>
        </Reveal>
        <Reveal delay={0.36}>
          <div className="mt-10">
            <CtaButton />
            <p className="mt-4 text-xs font-light text-ink-soft">{cta.micro}</p>
          </div>
        </Reveal>
      </motion.div>

      <div className="relative mx-auto mt-24 flex max-w-5xl items-end justify-center gap-6 px-6 sm:gap-10">
        <motion.div style={{ y: y2 }} className="hidden sm:block">
          <ListingMock
            image="/assets/img/bachgold.jpg"
            title="Bachgold Original Bachblüten Tropfen Nr. 39, alkoholfrei, 20 ml"
            price="14,90 €"
            reviews="1.872"
            className="!w-[220px] rotate-[-5deg] shadow-[0_70px_90px_-50px_rgba(2,48,71,0.5)]"
          />
        </motion.div>
        <motion.div style={{ y: y1 }} className="relative z-10">
          <DashboardMock className="shadow-[0_80px_110px_-55px_rgba(2,48,71,0.55)]" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="hidden lg:block">
          <ListingMock
            image="/assets/img/vitaworld.jpg"
            title="Vitaworld Vitamin D3 + K2 Tropfen, hochdosiert, 50 ml"
            price="19,90 €"
            reviews="4.213"
            className="!w-[220px] rotate-[5deg] shadow-[0_70px_90px_-50px_rgba(2,48,71,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative py-20">
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-sm font-light tracking-[0.35em] uppercase text-ink-soft">
            Marken, die uns ihr Amazon-Geschäft anvertrauen
          </p>
        </Reveal>
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-16 gap-y-12 lg:gap-x-24">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-6xl font-thin tracking-tight text-ink sm:text-7xl">
                {s.value}
              </p>
              <p className="mx-auto mt-3 max-w-[200px] text-sm font-light leading-snug text-ink-soft">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="relative overflow-hidden py-28">
      <Glow className="right-[-260px] top-10" color="#ff3131" size={560} opacity={0.07} />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="text-4xl font-thin leading-tight tracking-tight text-ink sm:text-5xl">
            Das Konto läuft. <span className="font-extrabold">Aber es trägt sich nicht von allein.</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
        <div className="mt-20 space-y-16">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-red shadow-[0_0_24px_4px_rgba(255,120,20,0.45)]"
                />
                <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-20 text-center text-3xl font-thin tracking-tight text-ink sm:text-4xl">
            Das Problem ist selten das Budget.
            <br />
            <span className="font-extrabold">Es ist die Reihenfolge.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  return (
    <section className="relative overflow-hidden py-28">
      <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="#ff8a00" size={900} opacity={0.08} />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <p className="text-sm font-light tracking-[0.35em] uppercase text-brand-orange">{mechanism.eyebrow}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-thin leading-tight tracking-tight text-ink sm:text-5xl">
            Organic First. <span className="font-extrabold">Erst verkauft das Listing,</span> dann skalieren die Ads.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-ink-soft">{mechanism.intro}</p>
        </Reveal>
        <div className="mt-20 space-y-14">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className={`flex flex-col gap-6 sm:flex-row sm:items-baseline sm:gap-12 ${i % 2 ? "sm:flex-row-reverse sm:text-right" : ""}`}>
                <span className="shrink-0 text-8xl font-thin leading-none text-brand-orange/70 sm:text-9xl">{i + 1}</span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-red">{s.name}</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-ink">{s.title}</h3>
                  <p className={`mt-3 max-w-xl text-base font-light leading-relaxed text-ink-soft ${i % 2 ? "sm:ml-auto" : ""}`}>{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-24 max-w-3xl text-center text-2xl font-light leading-snug text-ink sm:text-3xl">
            Unser Zielbild: <span className="font-extrabold text-brand-orange">80 % des Umsatzes organisch.</span>
            <br />
            Werbung skaliert das Geschäft — sie trägt es nicht.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-thin tracking-tight text-ink sm:text-5xl">
            Was Organic First <span className="font-extrabold">in Zahlen</span> heißt
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-ink-soft">{cases.subline}</p>
        </Reveal>
        <div className="mt-20 space-y-24">
          {cases.items.map((c, i) => (
            <Reveal key={c.brand}>
              <article className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-20 ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
                <div className="relative w-full max-w-[420px] shrink-0">
                  <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color={i % 2 ? "#ff3131" : "#ff8a00"} size={460} opacity={0.18} />
                  <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_60px_90px_-45px_rgba(2,48,71,0.5)] ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
                    <Image src={c.image} alt={`${c.brand} Produkt`} fill sizes="420px" className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-2xl border border-white/60 bg-white/80 px-6 py-3 shadow-[0_24px_48px_-22px_rgba(2,48,71,0.45)] backdrop-blur-xl">
                    <p className="text-2xl font-extrabold text-ink">
                      {c.metricTo || c.metric} <span className="text-sm font-bold text-brand-red">{c.metricLabel}</span>
                    </p>
                  </div>
                </div>
                <div className={i % 2 ? "lg:text-right" : ""}>
                  <p className="text-sm font-light tracking-[0.3em] uppercase text-ink-soft">
                    {c.brand} — {c.category}
                  </p>
                  <p className="mt-4 text-3xl font-thin tracking-tight text-ink sm:text-4xl">{c.metric}</p>
                  <p className={`mt-5 max-w-xl text-base font-light leading-relaxed text-ink-soft ${i % 2 ? "lg:ml-auto" : ""}`}>{c.text}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-soft">({c.note})</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-24 text-center">
          <p className="text-2xl font-light text-ink">{midCta.question}</p>
          <CtaButton className="mt-7" />
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const all = [
    { tag: services.foundation.name, title: services.foundation.title, text: services.foundation.text },
    ...services.levers.map((l) => ({ tag: "Wachstumshebel", title: l.title, text: l.text })),
    { tag: services.bracket.name, title: services.bracket.title, text: services.bracket.text },
  ];
  return (
    <section className="relative overflow-hidden py-28">
      <Glow className="left-[-280px] top-1/3" color="#023047" size={640} opacity={0.07} />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="text-4xl font-thin leading-tight tracking-tight text-ink sm:text-5xl">
            Ein Konto, eine Verantwortung: <span className="font-extrabold">alles, was euer Amazon-Geschäft braucht.</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
        <div className="mt-16">
          {all.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="group grid gap-2 border-b border-ink/10 py-8 transition-colors sm:grid-cols-[12rem_1fr] sm:gap-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange sm:pt-2">{s.tag}</p>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-brand-orange">{s.title}</h3>
                  <p className="mt-2 text-base font-light leading-relaxed text-ink-soft">{s.text}</p>
                </div>
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
    <section className="relative overflow-hidden py-28">
      <Glow className="right-[-220px] bottom-0" color="#ff8a00" size={520} opacity={0.1} />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-thin tracking-tight text-ink sm:text-5xl">
            Von „mal sprechen“ bis „läuft“ — <span className="font-extrabold">in drei Schritten</span>
          </h2>
        </Reveal>
        <div className="relative mt-20 grid gap-16 lg:grid-cols-3 lg:gap-10">
          <div aria-hidden className="absolute left-1/2 top-7 hidden h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-brand-orange/0 via-brand-orange/50 to-brand-orange/0 lg:block" />
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="relative text-center">
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-extrabold text-ink shadow-[0_0_0_1px_rgba(2,48,71,0.12),0_0_36px_6px_rgba(255,138,0,0.3)]">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{s.duration}</p>
              <p className="mx-auto mt-4 max-w-xs text-sm font-light leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12} className="mt-16 text-center">
          <CtaButton label={`Schritt 1 starten: ${cta.label}`} />
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-thin tracking-tight text-ink sm:text-5xl">
            Die Fragen, die ihr <span className="font-extrabold">zu Recht</span> stellt
          </h2>
        </Reveal>
        <div className="mt-16">
          {faq.items.map((item, i) => (
            <div key={item.q} className="border-b border-ink/10">
              <button
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={`text-lg tracking-tight transition-all ${open === i ? "font-bold text-brand-orange" : "font-light text-ink"}`}>
                  {item.q}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${open === i ? "rotate-180 text-brand-orange" : ""}`}
                  aria-hidden
                >
                  <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === i && <p className="pb-7 pr-8 text-base font-light leading-relaxed text-ink-soft">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="kontakt" className="relative overflow-hidden pb-32 pt-12">
      <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="#ff8a00" size={760} opacity={0.13} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="relative inline-block">
            <span aria-hidden className="absolute -inset-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-red opacity-30 blur-xl" />
            <span className="relative block h-40 w-40 overflow-hidden rounded-full ring-4 ring-white sm:h-48 sm:w-48">
              <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="192px" className="object-cover" />
            </span>
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-10 text-4xl font-thin tracking-tight text-ink sm:text-5xl">
            Lasst uns über <span className="font-extrabold">euer Konto</span> sprechen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-ink-soft">{closing.text}</p>
          <p className="mt-5 text-sm font-bold tracking-[0.25em] uppercase text-ink">
            {closing.person} — {closing.role}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10">
            <CtaButton />
            <p className="mt-4 text-xs font-light text-ink-soft">{closing.micro}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto" />
        <p className="max-w-md text-xs font-light leading-relaxed text-ink-soft">
          Entwurf E — „Licht". Navigation und Unterseiten folgen in der Umsetzungsphase.
        </p>
      </div>
    </footer>
  );
}

export default function EntwurfE() {
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
