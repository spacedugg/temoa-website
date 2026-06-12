"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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
} from "@/lib/content";

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#0a4361] to-brand-navy px-7 py-4 text-sm font-bold text-white shadow-[0_18px_40px_-12px_rgba(2,48,71,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-brand-orange" aria-hidden>
        <path d="M2 8h11M9 3.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/60 bg-white/75 px-5 py-3 shadow-[0_16px_40px_-20px_rgba(2,48,71,0.35)] backdrop-blur-xl">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto sm:h-8" />
        <nav className="hidden items-center gap-6 text-sm font-bold text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="rounded-xl bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-8px_rgba(255,138,0,0.7)] sm:px-5 sm:py-2.5 sm:text-sm"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-48 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 30% 40%, #ffe3c2 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 72% 35%, #d7ecf6 0%, transparent 65%), radial-gradient(ellipse 40% 45% at 55% 70%, #ffd9d4 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start 90%", "start 25%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 4]);
  const chipY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const listingY = useTransform(scrollYProgress, [0, 1], [70, -10]);

  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <MeshBackground />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <p className="inline-block rounded-full border border-line bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ink backdrop-blur">
            {hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-7 text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Profitables Wachstum auf Amazon.{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              Nicht teuer erkaufter Umsatz.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">{hero.subline}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9">
            <CtaButton />
            <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
          </div>
        </Reveal>
      </div>

      <div ref={stageRef} className="relative mx-auto mt-20 max-w-5xl px-5" style={{ perspective: "1400px" }}>
        <motion.div
          style={{ rotateX, transformStyle: "preserve-3d" }}
          className="relative mx-auto flex max-w-3xl justify-center rounded-3xl bg-white/60 p-5 shadow-[0_60px_120px_-40px_rgba(2,48,71,0.45)] ring-1 ring-white/80 backdrop-blur-sm sm:p-8"
        >
          <DashboardMock className="!w-full !max-w-2xl shadow-none !ring-0" />
        </motion.div>
        <motion.div style={{ y: listingY }} className="absolute -bottom-12 left-0 hidden md:block lg:-left-6">
          <div style={{ transform: "rotate(-6deg)" }}>
            <ListingMock
              image="/assets/img/bachgold.jpg"
              title="Bachgold Original Bachblüten Tropfen Nr. 39, alkoholfrei, 20 ml"
              price="14,90 €"
              reviews="1.872"
              className="!w-[230px] shadow-[0_40px_80px_-30px_rgba(2,48,71,0.4)]"
            />
          </div>
        </motion.div>
        <motion.div style={{ y: chipY }} className="absolute -right-2 top-6 hidden md:block lg:right-0">
          <MetricChip label="ROAS" value="2,1 auf 4,8" accent="#ff8a00" className="shadow-[0_24px_48px_-20px_rgba(2,48,71,0.45)]" />
        </motion.div>
        <motion.div style={{ y: chipY }} className="absolute -left-2 top-24 hidden lg:block">
          <MetricChip label="TACoS" value="−35 %" accent="#ff3131" className="shadow-[0_24px_48px_-20px_rgba(2,48,71,0.45)]" />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-24 max-w-5xl px-5">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            Marken, die uns ihr Amazon-Geschäft anvertrauen
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-white/70 bg-white/70 p-5 text-center shadow-[0_20px_45px_-28px_rgba(2,48,71,0.4)] backdrop-blur">
                <p className="text-3xl font-extrabold text-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-soft">{s.label}</p>
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
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{problem.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
        <div className="mt-14 space-y-5">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className="flex flex-col gap-4 rounded-2xl bg-white p-7 shadow-[0_28px_55px_-35px_rgba(2,48,71,0.45)] sm:flex-row sm:items-start sm:gap-7"
                style={{ marginLeft: `${i * 4}%`, marginRight: `${(2 - i) * 4}%` }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-red text-lg font-extrabold text-white shadow-[0_12px_24px_-10px_rgba(255,80,30,0.6)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-14 text-center text-2xl font-bold text-ink">
            Das Problem ist selten das Budget.{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              Es ist die Reihenfolge.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">{mechanism.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{mechanism.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{mechanism.intro}</p>
        </Reveal>

        <div className="mt-16">
          {mechanism.steps.map((s, i) => (
            <div key={s.name} className="sticky" style={{ top: `${110 + i * 28}px`, zIndex: i + 1 }}>
              <Reveal>
                <div
                  className="mx-auto mb-8 max-w-3xl rounded-3xl border border-white/60 p-8 shadow-[0_40px_80px_-35px_rgba(2,48,71,0.5)] backdrop-blur sm:p-10"
                  style={{
                    background: ["#ffffff", "#fff7ee", "#023047"][i],
                    color: i === 2 ? "#ffffff" : undefined,
                  }}
                >
                  <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${i === 2 ? "text-brand-orange" : "text-brand-orange"}`}>
                    Ebene {i + 1} — {s.name}
                  </p>
                  <h3 className={`mt-3 text-2xl font-extrabold sm:text-3xl ${i === 2 ? "text-white" : "text-ink"}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-2xl text-base leading-relaxed ${i === 2 ? "text-white/80" : "text-ink-soft"}`}>
                    {s.text}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xl font-bold leading-relaxed text-ink">
            {mechanism.target}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{cases.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{cases.subline}</p>
        </Reveal>
        <div className="mt-14 space-y-8">
          {cases.items.map((c, i) => (
            <Reveal key={c.brand} delay={i * 0.1}>
              <article
                className={`grid items-stretch overflow-hidden rounded-3xl bg-white shadow-[0_40px_85px_-45px_rgba(2,48,71,0.5)] lg:grid-cols-2 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-64">
                  <Image src={c.image} alt={`${c.brand} Produkt`} fill sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                    {c.brand} · {c.category}
                  </p>
                  <p className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
                    <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                      {c.metricTo || c.metric}
                    </span>{" "}
                    <span className="text-xl font-bold text-ink-soft">{c.metricLabel}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-soft">({c.note})</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-14 text-center">
          <p className="text-xl font-bold text-ink">{midCta.question}</p>
          <CtaButton className="mt-5" />
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{services.headline}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>

        <div className="relative mt-14 rounded-[2rem] border border-line bg-gradient-to-b from-white to-surface-alt p-5 shadow-[0_50px_100px_-50px_rgba(2,48,71,0.45)] sm:p-8">
          <Reveal>
            <div className="rounded-2xl bg-ink p-6 text-center text-white shadow-[0_24px_48px_-24px_rgba(2,48,71,0.8)] sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{services.bracket.name}</p>
              <h3 className="mt-1.5 text-xl font-bold">{services.bracket.title}</h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/80">{services.bracket.text}</p>
            </div>
          </Reveal>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {services.levers.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-[0_20px_45px_-30px_rgba(2,48,71,0.45)]">
                  <h3 className="text-lg font-bold text-ink">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-5 rounded-2xl border-2 border-brand-orange/50 bg-white p-6 text-center shadow-[0_20px_45px_-25px_rgba(255,138,0,0.4)] sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-orange">{services.foundation.name}</p>
              <h3 className="mt-1.5 text-xl font-bold text-ink">{services.foundation.title}</h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{services.foundation.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{steps.headline}</h2>
        </Reveal>
        <div className="relative mt-14 space-y-10 before:absolute before:bottom-6 before:left-6 before:top-2 before:w-px before:bg-line sm:before:left-7">
          {steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative flex gap-6 sm:gap-8">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#0a4361] to-brand-navy text-base font-extrabold text-white shadow-[0_14px_28px_-12px_rgba(2,48,71,0.7)] sm:h-14 sm:w-14">
                  {i + 1}
                </span>
                <div className="rounded-2xl bg-white p-6 shadow-[0_24px_50px_-32px_rgba(2,48,71,0.45)]">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-orange">{s.duration}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
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
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{faq.headline}</h2>
        </Reveal>
        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-50px_rgba(2,48,71,0.5)]">
          {faq.items.map((item, i) => (
            <div key={item.q} className={i ? "border-t border-line" : ""}>
              <button
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base font-bold text-ink">{item.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 shrink-0 text-brand-orange transition-transform ${open === i ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === i && <p className="px-7 pb-6 text-sm leading-relaxed text-ink-soft">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-surface-alt py-24">
      <MeshBackground />
      <div className="relative mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-[0_50px_110px_-50px_rgba(2,48,71,0.55)] backdrop-blur-xl sm:p-12">
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white sm:h-40 sm:w-40">
              <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="160px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{closing.headline}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{closing.text}</p>
              <p className="mt-4 text-sm font-bold text-ink">
                {closing.person} · {closing.role}
              </p>
            </div>
            <div>
              <CtaButton />
              <p className="mt-3 text-xs text-ink-soft">{closing.micro}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 text-center">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-7 w-auto" />
        <p className="max-w-md text-xs leading-relaxed text-ink-soft">
          Entwurf B — „Bühne". Navigation und Unterseiten folgen in der Umsetzungsphase.
        </p>
      </div>
    </footer>
  );
}

export default function EntwurfB() {
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
