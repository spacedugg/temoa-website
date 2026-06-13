"use client";

// Stil 1 — EDITORIAL. Magazin-Ästhetik: riesige Typografie, viel Weißraum,
// dünne Linien, nummerierte Sektionen, eine Akzentfarbe. Ruhig, premium.

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={cta.href} className={`inline-flex items-center gap-2 border-b-2 border-brand-orange pb-1 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:text-brand-orange ${className}`}>
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-ink/15 pb-3">
      <span className="font-mono text-xs text-brand-orange">{n}</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-ink-soft">{children}</span>
    </div>
  );
}

export default function Stil1() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="bg-[#fcfbf9] text-ink">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-[#fcfbf9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-8 text-xs font-bold uppercase tracking-widest text-ink lg:flex">
            <span>Leistungen</span><a href="#cases">Cases</a><span>Team</span>
          </nav>
          <a href={cta.href} className="text-xs font-bold uppercase tracking-widest text-brand-orange">{cta.short} →</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-orange">{hero.eyebrow}</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight">
                Amazon-Wachstum,<br />das <span className="italic text-brand-orange">Marge</span><br />übrig lässt.
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}><p className="max-w-md text-base leading-relaxed text-ink-soft">{hero.subline}</p></Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex items-center gap-6">
                <Cta />
                <a href="#cases" className="text-sm font-bold text-ink-soft underline-offset-4 hover:underline">{hero.secondary.label}</a>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.12}>
          <figure className="relative mt-12 aspect-[16/7] w-full overflow-hidden">
            <img src={HERO_IMG} alt="" className="h-full w-full object-cover" onError={(e) => ((e.currentTarget.style.display = "none"))} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfbf9] via-transparent to-transparent" />
          </figure>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-y-4 border-y border-ink/15 py-5">
          {socialProof.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight">{s.value}</span>
              <span className="text-xs text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Kicker n="01">Das Problem</Kicker>
        <Reveal><h2 className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight">{problem.headline}</h2></Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {problem.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="border-t-2 border-ink pt-4">
                <span className="font-mono text-xs text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mechanism */}
      <section className="border-y border-ink/15 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker n="02">{mechanism.eyebrow}</Kicker>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight">{mechanism.headline}</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{mechanism.core}</p>
              <p className="mt-6 max-w-md border-l-2 border-brand-orange pl-4 text-sm italic leading-relaxed text-ink-soft">{mechanism.model}</p>
            </Reveal>
            <div className="space-y-0">
              {mechanism.steps.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.1}>
                  <div className="flex items-baseline gap-6 border-b border-ink/15 py-6">
                    <span className="font-mono text-3xl font-extrabold text-brand-orange/30">0{i + 1}</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">{s.name}</p>
                      <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="mx-auto max-w-6xl px-6 py-20">
        <Kicker n="03">Beweis</Kicker>
        <Reveal><h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight">{cases.headline}</h2></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden border border-ink/15 md:grid-cols-3 bg-ink/15">
          {cases.items.map((c) => (
            <div key={c.brand} className="bg-[#fcfbf9] p-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{c.brand} · {c.category}</p>
              <p className="mt-6 text-5xl font-extrabold tracking-tight text-brand-orange">{c.metric}</p>
              <p className="mt-2 text-sm font-bold">{c.metricLabel}</p>
              <p className="mt-1 text-sm text-ink-soft">{c.sub}</p>
            </div>
          ))}
          <a href={cta.href} className="flex flex-col justify-center bg-ink p-8 text-white transition-colors hover:bg-brand-navy">
            <p className="text-5xl font-extrabold tracking-tight">{cases.portfolio.value}</p>
            <p className="mt-2 text-sm font-bold">{cases.portfolio.text}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-orange">{cases.portfolio.link} →</p>
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-soft">{cases.note}</p>
      </section>

      {/* Services */}
      <section className="border-y border-ink/15 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker n="04">Leistungen</Kicker>
          <Reveal><h2 className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight">{services.headline}</h2></Reveal>
          <div className="mt-12 divide-y divide-ink/15 border-t-2 border-ink">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="group grid items-baseline gap-2 py-5 md:grid-cols-12">
                  <span className="font-mono text-xs text-brand-orange md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold md:col-span-4 group-hover:text-brand-orange">{s.title}</h3>
                  <p className="text-sm text-ink-soft md:col-span-7">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps + FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Kicker n="05">{steps.headline}</Kicker>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {steps.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <span className="font-mono text-2xl font-extrabold text-brand-orange/40">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold">{s.title} <span className="font-mono text-xs font-normal text-ink-soft">/ {s.duration}</span></h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div>
            <p className="text-6xl font-extrabold tracking-tight text-brand-orange">{trustSection.retention.value}</p>
            <h3 className="mt-2 text-xl font-bold">{trustSection.retention.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{trustSection.retention.text}</p>
            <div className="mt-6 border-t-2 border-ink">
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className="border-b border-ink/15">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                    <span className="text-sm font-bold">{f.q}</span>
                    <span className="font-mono text-brand-orange">{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && <p className="pb-4 text-sm leading-relaxed text-ink-soft">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id="kontakt" className="bg-ink py-24 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
            <Image src={banner.photo} alt={banner.person} fill sizes="80px" className="object-cover" />
          </div>
          <h2 className="mt-6 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight">{banner.headline}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">{banner.text}</p>
          <div className="mt-8"><a href={cta.href} className="inline-flex items-center gap-2 border-b-2 border-brand-orange pb-1 text-base font-bold uppercase tracking-wider text-white hover:text-brand-orange">{cta.label} →</a></div>
          <div className="mt-16 border-t border-white/15 pt-6 text-xs text-white/40">{footer.description}</div>
        </div>
      </section>
    </main>
  );
}
