"use client";

// Stil 5 — CONTROL ROOM. Wirkt wie ein Analytics-Produkt: Monospace-Zahlen,
// feines Raster, technische Dashboard-Karten, Live-Anmutung, strukturiert.
// Hell, datengetrieben, "Cockpit fürs Amazon-Konto".

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

const grid = "bg-[linear-gradient(rgba(2,48,71,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(2,48,71,0.05)_1px,transparent_1px)] bg-[size:28px_28px]";
const panel = "rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(2,48,71,0.04)]";

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={cta.href} className={`inline-flex items-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(255,138,0,0.7)] transition-transform hover:-translate-y-0.5 ${className}`}>
      {label} <span aria-hidden>→</span>
    </a>
  );
}

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] uppercase tracking-wider text-ink-soft ${className}`}>{children}</span>;
}

function Live() {
  return <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />live</span>;
}

export default function Stil5() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className={`min-h-svh bg-[#f7f9fb] text-ink ${grid}`}>
      <header className="sticky top-0 z-50 border-b border-line bg-[#f7f9fb]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3"><img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" /><Mono className="hidden sm:inline">/ account-control</Mono></div>
          <nav className="hidden gap-6 font-mono text-xs font-bold uppercase text-ink lg:flex"><span>Leistungen</span><a href="#cases">Cases</a><span>Team</span></nav>
          <a href={cta.href} className="rounded-md bg-brand-orange px-4 py-2 text-xs font-bold text-white">{cta.short}</a>
        </div>
      </header>

      {/* Hero — Dashboard-Layout */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className={`${panel} flex h-full flex-col justify-between p-8`}>
              <div>
                <div className="flex items-center justify-between"><Mono>module · overview</Mono><Live /></div>
                <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">Amazon-Wachstum, das <span className="text-brand-orange">Marge übrig lässt.</span></h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">{hero.subline}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4"><Cta /><a href="#cases" className="font-mono text-xs font-bold uppercase text-ink underline underline-offset-4">{hero.secondary.label}</a></div>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-5">
                <span className="flex -space-x-2">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"><Image src={p} alt="" fill sizes="32px" className="object-cover" /></span>)}</span>
                <span className="font-mono text-[11px] text-ink-soft">{hero.trust.map((t) => <span key={t.text} className="block"><b className="text-ink">{t.value}</b> {t.text}</span>)}</span>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.08}>
              <div className={`${panel} overflow-hidden`}>
                <div className="flex items-center justify-between border-b border-line px-3 py-2"><Mono>account-cockpit · kundenbeispiel</Mono><Live /></div>
                <div className="relative aspect-[16/9]"><img src={HERO_IMG} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.opacity = "0")} /></div>
                <div className="grid grid-cols-4 divide-x divide-line border-t border-line">
                  {hero.cockpit.map((k) => <div key={k.label} className="p-2.5"><p className="font-mono text-base font-extrabold text-ink">{k.value}</p><p className="mt-0.5 text-[8px] uppercase leading-tight text-ink-soft">{k.label}</p></div>)}
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-4 gap-2">
              {socialProof.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.04}><div className={`${panel} p-3`}><p className="font-mono text-lg font-extrabold text-brand-orange">{s.value}</p><p className="text-[9px] leading-tight text-ink-soft">{s.label}</p></div></Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3"><Mono>diagnose</Mono><div className="h-px flex-1 bg-line" /></div>
        <Reveal><h2 className="mt-4 max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight">{problem.headline}</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={`${panel} h-full p-5`}>
                <div className="flex items-center justify-between"><Mono>err_0{i + 1}</Mono><span className="h-2 w-2 rounded-full bg-brand-red" /></div>
                <h3 className="mt-3 text-base font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mechanism */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3"><Mono>methode · organic-first</Mono><div className="h-px flex-1 bg-line" /></div>
        <div className="mt-4 grid gap-8 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight">{mechanism.headline}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{mechanism.core}</p>
            <p className="mt-4 border-l-2 border-brand-orange pl-3 font-mono text-xs leading-relaxed text-ink-soft">{mechanism.model}</p>
          </Reveal>
          <div className="grid gap-3">
            {mechanism.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <div className={`${panel} flex items-center gap-4 p-4`}>
                  <span className="font-mono text-2xl font-extrabold text-brand-orange/40">0{i + 1}</span>
                  <div className="flex-1"><Mono>{s.name}</Mono><h3 className="text-base font-bold">{s.title}</h3></div>
                  <svg viewBox="0 0 60 24" className="h-6 w-16"><path d={["M2 20 L20 16 L38 10 L58 4", "M2 18 L20 13 L38 12 L58 6", "M2 14 L20 12 L38 8 L58 3"][i]} fill="none" stroke="#ff8a00" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3"><Mono>resultate · kundenbeispiele</Mono><div className="h-px flex-1 bg-line" /></div>
        <Reveal><h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight">{cases.headline}</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cases.items.map((c) => (
            <Reveal key={c.brand}>
              <div className={`${panel} h-full p-6`}>
                <div className="flex items-center justify-between"><Mono>{c.brand}</Mono><Mono>{c.category}</Mono></div>
                <p className="mt-4 font-mono text-5xl font-extrabold tracking-tight text-brand-orange">{c.metric}</p>
                <p className="mt-2 text-sm font-bold">{c.metricLabel}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.sub}</p>
                <svg viewBox="0 0 200 40" className="mt-4 w-full"><path d="M2 36 L40 30 L80 22 L120 16 L160 8 L198 3" fill="none" stroke="#ff8a00" strokeWidth="2" /><path d="M2 36 L40 30 L80 22 L120 16 L160 8 L198 3 L198 40 L2 40 Z" fill="rgba(255,138,0,0.08)" /></svg>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a href={cta.href} className="flex h-full flex-col justify-center rounded-lg border border-brand-navy bg-brand-navy p-6 text-white">
              <Mono className="!text-white/50">portfolio</Mono>
              <p className="mt-2 font-mono text-5xl font-extrabold">{cases.portfolio.value}</p>
              <p className="mt-2 text-sm font-bold">{cases.portfolio.text}</p>
              <p className="mt-3 font-mono text-xs uppercase text-brand-orange">{cases.portfolio.link} →</p>
            </a>
          </Reveal>
        </div>
        <p className="mt-3 font-mono text-[10px] text-ink-soft">{cases.note}</p>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3"><Mono>module</Mono><div className="h-px flex-1 bg-line" /></div>
        <Reveal><h2 className="mt-4 max-w-3xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight">{services.headline}</h2></Reveal>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className={`${panel} flex items-start gap-4 p-4`}>
                <span className="font-mono text-sm font-extrabold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="font-bold">{s.title}</h3><p className="mt-0.5 text-sm text-ink-soft">{s.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Steps + Trust */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3"><Mono>onboarding</Mono><div className="h-px flex-1 bg-line" /></div>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold">{steps.headline}</h2>
            <div className="mt-6 space-y-3">
              {steps.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className={`${panel} flex gap-4 p-4`}>
                    <span className="font-mono text-xl font-extrabold text-brand-orange">0{i + 1}</span>
                    <div><h3 className="font-bold">{s.title} <Mono className="!normal-case">/ {s.duration}</Mono></h3><p className="mt-1 text-sm text-ink-soft">{s.text}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3"><Mono>vertrauen</Mono><div className="h-px flex-1 bg-line" /></div>
            <div className={`${panel} mt-4 p-6`}>
              <div className="flex items-baseline gap-3"><p className="font-mono text-5xl font-extrabold text-brand-orange">{trustSection.retention.value}</p><h3 className="text-base font-bold">{trustSection.retention.headline}</h3></div>
              <p className="mt-2 text-sm text-ink-soft">{trustSection.retention.text}</p>
            </div>
            <div className="mt-4">
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className="border-b border-line">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3 text-left"><span className="text-sm font-bold">{f.q}</span><span className="font-mono text-brand-orange">{open === i ? "[-]" : "[+]"}</span></button>
                  {open === i && <p className="pb-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id="kontakt" className="mx-auto max-w-6xl px-5 py-12">
        <div className="relative overflow-hidden rounded-lg border border-brand-navy bg-brand-navy p-10 text-white sm:p-14">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 80% 100%, rgba(255,138,0,0.2), transparent 60%)" }} />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg ring-2 ring-white/20"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <div>
              <Mono className="!text-brand-orange">termin · clemens · geschäftsführung</Mono>
              <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight">{banner.headline}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">{banner.text}</p>
              <ul className="mt-4 flex flex-col gap-2 font-mono text-xs text-white/80 sm:flex-row sm:gap-5">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
              <div className="mt-6"><Cta /></div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-[10px] uppercase text-ink-soft">{footer.description}</p>
      </section>
    </main>
  );
}
