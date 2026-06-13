"use client";

// Stil 3 — CINEMATIC DARK. Durchgehend dunkel, Spotlight-Glows, Glas-Panels,
// glühende Orange/Rot-Kanten, große leuchtende Zahlen. Premium-Dark-SaaS.

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

const glow = "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl";

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={cta.href} className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-6 py-3 text-sm font-bold text-white shadow-[0_0_40px_-6px_rgba(255,138,0,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5 ${className}`}>
      {label} <span aria-hidden>→</span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange">{children}</p>;
}

export default function Stil3() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="bg-[#04141d] text-white">
      {/* global grain/glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 0%, rgba(255,138,0,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(255,49,49,0.08), transparent 60%)" }} />

      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-xl">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-6 text-sm font-bold text-white/80 lg:flex"><span>Leistungen</span><a href="#cases">Case Studies</a></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-[0_0_24px_-4px_rgba(255,138,0,0.8)]">{cta.short}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-5 pt-28 lg:grid-cols-[6fr_5fr] lg:pt-20">
        <div>
          <Reveal><Eyebrow>{hero.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
              Amazon-Wachstum, das{" "}
              <span className="bg-gradient-to-r from-brand-orange via-[#ff6a3d] to-brand-red bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(255,138,0,0.4)]">Marge übrig lässt.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}><p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">{hero.subline}</p></Reveal>
          <Reveal delay={0.18}><div className="mt-7 flex flex-wrap items-center gap-5"><Cta /><a href="#cases" className="text-sm font-bold text-white/80 hover:text-brand-orange">{hero.secondary.label} →</a></div></Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex items-center gap-5">
              <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#04141d]"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
              <span className="text-xs text-white/60">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-white">{t.value}</strong> {t.text}</span>)}</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-brand-orange/20 blur-3xl" aria-hidden />
            <div className="relative aspect-[10/11] overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]">
              <img src={HERO_IMG} alt="" className="h-full w-full object-cover object-[58%_30%]" onError={(e) => (e.currentTarget.style.opacity = "0")} />
              <div className={`${glow} absolute inset-x-3 bottom-3 !rounded-xl p-3`}>
                <div className="grid grid-cols-4 gap-2">
                  {hero.cockpit.map((k) => <div key={k.label}><p className="text-base font-extrabold text-brand-orange">{k.value}</p><p className="text-[8px] uppercase tracking-wide text-white/50">{k.label}</p></div>)}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Social proof strip */}
      <section className="relative z-10 border-y border-white/10 py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 text-center sm:grid-cols-4">
          {socialProof.stats.map((s) => <div key={s.label}><p className="text-3xl font-extrabold text-brand-orange [text-shadow:0_0_30px_rgba(255,138,0,0.5)]">{s.value}</p><p className="mt-1 text-[11px] uppercase tracking-wide text-white/50">{s.label}</p></div>)}
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <Reveal><Eyebrow>Das Problem</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{problem.headline}</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={`${glow} h-full p-6`}>
                <span className="text-2xl font-extrabold text-brand-orange">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mechanism */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 sm:p-12">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 80% 100%, rgba(255,138,0,0.18), transparent 60%)" }} />
          <div className="relative">
            <Reveal><Eyebrow>{mechanism.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{mechanism.headline}</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">{mechanism.core}</p></Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className={`${glow} relative overflow-hidden p-6`}>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                    <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{cases.headline}</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cases.items.map((c) => (
            <Reveal key={c.brand}>
              <div className={`${glow} h-full p-7`}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">{c.brand} · {c.category}</p>
                <p className="mt-4 text-5xl font-extrabold text-brand-orange [text-shadow:0_0_40px_rgba(255,138,0,0.5)]">{c.metric}</p>
                <p className="mt-2 text-sm font-bold">{c.metricLabel}</p>
                <p className="mt-1 text-sm text-white/55">{c.sub}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <a href={cta.href} className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-brand-orange/40 bg-brand-orange/10 p-7">
              <div aria-hidden className="absolute -inset-4 bg-brand-orange/20 blur-2xl" />
              <p className="relative text-5xl font-extrabold">{cases.portfolio.value}</p>
              <p className="relative mt-2 text-sm font-bold text-white/90">{cases.portfolio.text}</p>
              <p className="relative mt-3 text-xs font-bold uppercase tracking-widest text-brand-orange">{cases.portfolio.link} →</p>
            </a>
          </Reveal>
        </div>
        <p className="mt-4 text-center text-[11px] text-white/40">{cases.note}</p>
      </section>

      {/* Services */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 py-16">
        <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{services.headline}</h2></Reveal>
        <Reveal delay={0.06}><p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60">{services.intro}</p></Reveal>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="group grid items-baseline gap-2 py-4 md:grid-cols-12">
                <span className="text-xs font-bold text-brand-orange md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold md:col-span-4 group-hover:text-brand-orange">{s.title}</h3>
                <p className="text-sm text-white/55 md:col-span-7">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Steps + Trust */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal><h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold">{steps.headline}</h2></Reveal>
            <div className="mt-8 space-y-5">
              {steps.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-orange/50 bg-brand-orange/10 text-sm font-extrabold text-brand-orange">{i + 1}</span>
                    <div><h3 className="font-bold">{s.title} <span className="text-xs font-normal text-white/40">/ {s.duration}</span></h3><p className="mt-1 text-sm leading-relaxed text-white/60">{s.text}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="text-7xl font-extrabold text-brand-orange [text-shadow:0_0_50px_rgba(255,138,0,0.6)]">{trustSection.retention.value}</p>
            <h3 className="mt-2 text-xl font-bold">{trustSection.retention.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{trustSection.retention.text}</p>
            <div className="mt-6 border-t border-white/10">
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className="border-b border-white/10">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left"><span className="text-sm font-bold">{f.q}</span><span className="text-brand-orange">{open === i ? "−" : "+"}</span></button>
                  {open === i && <p className="pb-3.5 text-sm leading-relaxed text-white/60">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id="kontakt" className="relative z-10 mx-auto max-w-6xl px-5 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-10 text-center sm:p-16">
          <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(255,138,0,0.2), transparent 60%)" }} />
          <div className="relative mx-auto max-w-2xl">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/10"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <h2 className="mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{banner.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65">{banner.text}</p>
            <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
            <div className="mt-7"><Cta /></div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-white/35">{footer.description}</p>
      </section>
    </main>
  );
}
