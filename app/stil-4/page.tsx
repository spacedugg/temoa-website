"use client";

// Stil 4 — AURORA SOFT. Helle, freundliche Welt: große weiche Gradient-Blobs
// (Orange/Rot/Blau) im Hintergrund, stark gerundete Formen, sanfte Schatten,
// pastellig, schwebend. Warm und einladend.

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

function Blob({ className = "", color }: { className?: string; color: string }) {
  return <div aria-hidden className={`pointer-events-none absolute rounded-full opacity-50 blur-[90px] ${className}`} style={{ background: color }} />;
}

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={cta.href} className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_-12px_rgba(255,138,0,0.7)] transition-transform hover:-translate-y-0.5 ${className}`}>
      {label} <span aria-hidden>→</span>
    </a>
  );
}

const soft = "rounded-[2rem] bg-white/70 ring-1 ring-white shadow-[0_30px_70px_-30px_rgba(2,48,71,0.3)] backdrop-blur-xl";

export default function Stil4() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="relative overflow-hidden bg-[#fbf7f3] text-ink">
      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full bg-white/70 px-6 py-3 shadow-[0_10px_30px_-12px_rgba(2,48,71,0.25)] ring-1 ring-white backdrop-blur-xl">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-7 text-sm font-bold text-ink lg:flex"><span>Leistungen</span><a href="#cases">Case Studies</a><span>Team</span></nav>
          <a href={cta.href} className="rounded-full bg-brand-orange px-5 py-2 text-xs font-bold text-white">{cta.short}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-20 pt-32">
        <Blob className="-top-20 left-1/4 h-[460px] w-[460px]" color="radial-gradient(circle,#ffd9a8,transparent 70%)" />
        <Blob className="top-10 right-0 h-[400px] w-[400px]" color="radial-gradient(circle,#ffc7c0,transparent 70%)" />
        <Blob className="top-40 left-0 h-[360px] w-[360px]" color="radial-gradient(circle,#c4e4f2,transparent 70%)" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[6fr_5fr]">
          <div>
            <Reveal><span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-orange ring-1 ring-white">{hero.eyebrow}</span></Reveal>
            <Reveal delay={0.06}><h1 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-tight">Amazon-Wachstum, das <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">Marge übrig lässt.</span></h1></Reveal>
            <Reveal delay={0.12}><p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">{hero.subline}</p></Reveal>
            <Reveal delay={0.18}><div className="mt-8 flex flex-wrap items-center gap-5"><Cta /><a href="#cases" className="text-sm font-bold text-ink underline decoration-brand-orange decoration-2 underline-offset-4">{hero.secondary.label}</a></div></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex items-center gap-4">
                <span className="flex -space-x-2.5">{hero.trustPhotos.map((p) => <span key={p} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#fbf7f3]"><Image src={p} alt="" fill sizes="36px" className="object-cover" /></span>)}</span>
                <span className="text-xs text-ink-soft">{hero.trust.map((t) => <span key={t.text} className="block"><strong className="text-ink">{t.value}</strong> {t.text}</span>)}</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className={`${soft} relative overflow-hidden p-3`}>
              <div className="relative aspect-[10/10] overflow-hidden rounded-[1.5rem]">
                <img src={HERO_IMG} alt="" className="h-full w-full object-cover object-[58%_30%]" onError={(e) => (e.currentTarget.style.opacity = "0")} />
              </div>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur">
                <div className="grid grid-cols-4 gap-2">{hero.cockpit.map((k) => <div key={k.label}><p className="text-base font-extrabold text-brand-orange">{k.value}</p><p className="text-[8px] uppercase text-ink-soft">{k.label}</p></div>)}</div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {socialProof.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}><div className="rounded-3xl bg-white/70 p-5 text-center ring-1 ring-white shadow-[0_20px_40px_-24px_rgba(2,48,71,0.3)]"><p className="text-3xl font-extrabold text-ink">{s.value}</p><p className="mt-1 text-[11px] text-ink-soft">{s.label}</p></div></Reveal>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="relative px-5 py-24">
        <Blob className="left-1/3 top-1/4 h-[380px] w-[380px]" color="radial-gradient(circle,#ffe1c2,transparent 70%)" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold">{problem.headline}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problem.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className={`${soft} h-full p-7 text-center`}>
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] text-lg font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="relative px-5 py-16">
        <div className="relative mx-auto max-w-6xl">
          <div className={`${soft} relative overflow-hidden p-8 sm:p-14`}>
            <Blob className="-right-10 -top-10 h-[300px] w-[300px]" color="radial-gradient(circle,#ffd0a0,transparent 70%)" />
            <div className="relative text-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">{mechanism.eyebrow}</span>
              <Reveal><h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{mechanism.headline}</h2></Reveal>
              <Reveal delay={0.06}><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{mechanism.core}</p></Reveal>
            </div>
            <div className="relative mt-10 grid gap-5 md:grid-cols-3">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className="rounded-3xl bg-white p-6 text-center shadow-[0_20px_40px_-24px_rgba(2,48,71,0.3)]">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">0{i + 1} · {s.name}</p>
                    <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="relative mx-auto mt-6 max-w-2xl text-center text-sm italic text-ink-soft">{mechanism.model}</p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="relative px-5 py-24">
        <Blob className="right-1/4 top-1/3 h-[380px] w-[380px]" color="radial-gradient(circle,#ffc7c0,transparent 70%)" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal><h2 className="text-center text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold">{cases.headline}</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.items.map((c) => (
              <Reveal key={c.brand}><div className={`${soft} h-full p-7`}><p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{c.brand} · {c.category}</p><p className="mt-4 text-5xl font-extrabold tracking-tight text-brand-orange">{c.metric}</p><p className="mt-2 text-sm font-bold">{c.metricLabel}</p><p className="mt-1 text-sm text-ink-soft">{c.sub}</p></div></Reveal>
            ))}
            <Reveal>
              <a href={cta.href} className="flex h-full flex-col justify-center rounded-[2rem] bg-gradient-to-br from-brand-orange to-brand-red p-7 text-white shadow-[0_30px_60px_-24px_rgba(255,138,0,0.6)]">
                <p className="text-5xl font-extrabold">{cases.portfolio.value}</p><p className="mt-2 text-sm font-bold">{cases.portfolio.text}</p><p className="mt-3 text-xs font-bold uppercase tracking-widest">{cases.portfolio.link} →</p>
              </a>
            </Reveal>
          </div>
          <p className="mt-4 text-center text-[11px] text-ink-soft">{cases.note}</p>
        </div>
      </section>

      {/* Services */}
      <section className="relative px-5 py-16">
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal><h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold">{services.headline}</h2></Reveal>
          <Reveal delay={0.06}><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{services.intro}</p></Reveal>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}><div className="flex items-start gap-4 rounded-2xl bg-white/60 p-5 ring-1 ring-white"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-extrabold text-brand-orange">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-bold">{s.title}</h3><p className="mt-0.5 text-sm text-ink-soft">{s.text}</p></div></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps + Trust */}
      <section className="relative px-5 py-24">
        <Blob className="left-1/4 top-1/3 h-[360px] w-[360px]" color="radial-gradient(circle,#c4e4f2,transparent 70%)" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          <div>
            <Reveal><h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold">{steps.headline}</h2></Reveal>
            <div className="mt-8 space-y-5">
              {steps.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}><div className="flex gap-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-orange to-[#f57600] font-extrabold text-white shadow-[0_12px_24px_-8px_rgba(255,138,0,0.7)]">{i + 1}</span><div><h3 className="font-bold">{s.title} <span className="text-xs font-normal text-ink-soft">/ {s.duration}</span></h3><p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p></div></div></Reveal>
              ))}
            </div>
          </div>
          <div className={`${soft} p-8`}>
            <p className="text-6xl font-extrabold text-brand-orange">{trustSection.retention.value}</p>
            <h3 className="mt-2 text-xl font-bold">{trustSection.retention.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
            <div className="mt-6 border-t border-line">
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className="border-b border-line">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left"><span className="text-sm font-bold">{f.q}</span><span className="text-brand-orange">{open === i ? "−" : "+"}</span></button>
                  {open === i && <p className="pb-3.5 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id="kontakt" className="relative px-5 pb-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-navy to-[#034d6e] p-10 text-center text-white sm:p-16">
            <Blob className="-left-10 bottom-0 h-[300px] w-[300px]" color="radial-gradient(circle,rgba(255,138,0,0.5),transparent 70%)" />
            <div className="relative mx-auto max-w-2xl">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/20"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
              <h2 className="mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-tight">{banner.headline}</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">{banner.text}</p>
              <ul className="mt-5 flex flex-col items-center gap-2 text-sm text-white/85 sm:flex-row sm:justify-center sm:gap-6">{banner.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="text-brand-orange">✓</span>{b}</li>)}</ul>
              <div className="mt-7"><Cta /></div>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-ink-soft">{footer.description}</p>
        </div>
      </section>
    </main>
  );
}
