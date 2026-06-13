"use client";

// Stil 2 — BRUTALIST GRID. Schweizer Plakat-Brutalismus: hartes sichtbares
// Raster, dicke schwarze Rahmen, solide Offset-Schatten, Monospace-Labels,
// keine runden Ecken, kräftige Farbblöcke.

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta, hero, socialProof, clientLogos, problem, mechanism,
  cases, services, steps, trustSection, banner, footer,
} from "@/lib/content";

const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

const box = "border-2 border-ink bg-white shadow-[6px_6px_0_0_#023047]";

function Cta({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={cta.href} className={`inline-block border-2 border-ink bg-brand-orange px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[5px_5px_0_0_#023047] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#023047] ${className}`}>
      {label} ↗
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">{children}</span>;
}

export default function Stil2() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="bg-[#f2efe6] text-ink [font-feature-settings:'ss01']">
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-[#f2efe6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto" />
          <nav className="hidden gap-6 font-mono text-xs font-bold uppercase lg:flex"><span>Leistungen</span><a href="#cases">Cases</a><span>Team</span></nav>
          <a href={cta.href} className="border-2 border-ink bg-brand-orange px-3 py-1.5 text-xs font-extrabold uppercase text-white">{cta.short}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className={`${box} h-full p-8`}>
              <Tag>{hero.eyebrow}</Tag>
              <h1 className="mt-5 text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
                Wachstum,<br />das <span className="bg-brand-orange px-2 text-white">Marge</span><br />übrig lässt.
              </h1>
              <p className="mt-6 max-w-md text-sm font-medium leading-relaxed">{hero.subline}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4"><Cta /><a href="#cases" className="font-mono text-xs font-bold uppercase underline underline-offset-4">{hero.secondary.label}</a></div>
            </div>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="border-2 border-ink shadow-[6px_6px_0_0_#ff3131]">
                <img src={HERO_IMG} alt="" className="aspect-[4/3] w-full object-cover" onError={(e) => (e.currentTarget.parentElement!.style.display = "none")} />
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-5">
              {socialProof.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.05}>
                  <div className={`${box} p-4`} style={{ boxShadow: i % 2 ? "6px 6px 0 0 #ff8a00" : "6px 6px 0 0 #023047" }}>
                    <p className="text-3xl font-extrabold">{s.value}</p>
                    <p className="font-mono text-[10px] uppercase text-ink-soft">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y-2 border-ink bg-ink py-16 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <Tag>01 / Problem</Tag>
          <Reveal><h2 className="mt-5 text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none">{problem.headline}</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problem.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full border-2 border-white bg-brand-navy p-6">
                  <span className="font-mono text-4xl font-extrabold text-brand-orange">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-extrabold uppercase leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Tag>02 / Methode</Tag>
        <Reveal><h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none">{mechanism.headline}</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed">{mechanism.core}</p></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div className={`${box} p-6`} style={{ boxShadow: ["6px 6px 0 0 #ff8a00", "6px 6px 0 0 #ff3131", "6px 6px 0 0 #023047"][i] }}>
                <Tag>{`0${i + 1} · ${s.name}`}</Tag>
                <h3 className="mt-3 text-xl font-extrabold uppercase leading-tight">{s.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl border-l-4 border-brand-orange pl-4 text-sm font-medium">{mechanism.model}</p>
      </section>

      {/* Cases */}
      <section id="cases" className="border-y-2 border-ink bg-brand-orange py-16">
        <div className="mx-auto max-w-6xl px-5">
          <Tag>03 / Zahlen</Tag>
          <Reveal><h2 className="mt-5 text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none text-white">{cases.headline}</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {cases.items.map((c) => (
              <Reveal key={c.brand}>
                <div className="h-full border-2 border-ink bg-white p-6 shadow-[6px_6px_0_0_#023047]">
                  <p className="font-mono text-[10px] font-bold uppercase text-ink-soft">{c.brand} · {c.category}</p>
                  <p className="mt-4 text-6xl font-extrabold tracking-tight">{c.metric}</p>
                  <p className="mt-2 text-sm font-bold">{c.metricLabel}</p>
                  <p className="text-sm text-ink-soft">{c.sub}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <a href={cta.href} className="flex h-full flex-col justify-center border-2 border-white bg-ink p-6 text-white shadow-[6px_6px_0_0_#023047]">
                <p className="text-6xl font-extrabold">{cases.portfolio.value}</p>
                <p className="mt-2 text-sm font-bold">{cases.portfolio.text}</p>
                <p className="mt-3 font-mono text-xs uppercase text-brand-orange">{cases.portfolio.link} →</p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Tag>04 / Leistungen</Tag>
        <Reveal><h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none">{services.headline}</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="flex items-start gap-4 border-2 border-ink bg-white p-5">
                <span className="font-mono text-2xl font-extrabold text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-base font-extrabold uppercase">{s.title}</h3><p className="mt-1 text-sm text-ink-soft">{s.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Steps + FAQ */}
      <section className="border-y-2 border-ink bg-brand-navy py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <Tag>05 / Ablauf</Tag>
            <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold uppercase leading-none">{steps.headline}</h2>
            <div className="mt-8 space-y-4">
              {steps.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex gap-4 border-2 border-white/30 p-4">
                    <span className="font-mono text-3xl font-extrabold text-brand-orange">0{i + 1}</span>
                    <div><h3 className="font-extrabold uppercase">{s.title} <span className="font-mono text-[10px] font-normal text-white/50">{s.duration}</span></h3><p className="mt-1 text-sm text-white/70">{s.text}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-7xl font-extrabold text-brand-orange">{trustSection.retention.value}</p>
            <h3 className="mt-2 text-2xl font-extrabold uppercase">{trustSection.retention.headline}</h3>
            <p className="mt-2 text-sm text-white/70">{trustSection.retention.text}</p>
            <div className="mt-6 border-t-2 border-white/30">
              {trustSection.faq.map((f, i) => (
                <div key={f.q} className="border-b-2 border-white/30">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-3 text-left">
                    <span className="text-sm font-bold uppercase">{f.q}</span><span className="font-mono text-brand-orange">{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && <p className="pb-3 text-sm text-white/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section id="kontakt" className="mx-auto max-w-6xl px-5 py-16">
        <div className="border-2 border-ink bg-brand-orange p-10 text-white shadow-[10px_10px_0_0_#023047]">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="relative h-24 w-24 border-2 border-white"><Image src={banner.photo} alt={banner.person} fill sizes="96px" className="object-cover" /></div>
            <div>
              <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-extrabold uppercase leading-none">{banner.headline}</h2>
              <p className="mt-3 max-w-xl text-sm font-medium">{banner.text}</p>
              <div className="mt-6"><a href={cta.href} className="inline-block border-2 border-ink bg-ink px-6 py-3 text-sm font-extrabold uppercase text-white shadow-[5px_5px_0_0_#fff] transition-all hover:translate-x-0.5 hover:translate-y-0.5">{cta.label} ↗</a></div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-xs uppercase text-ink-soft">{footer.description}</p>
      </section>
    </main>
  );
}
