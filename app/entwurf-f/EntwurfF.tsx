"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import {
  cta,
  hero,
  stats,
  clientLogos,
  partnerBadge,
  problem,
  mechanism,
  cases,
  services,
  steps,
  faq,
  closing,
  midCta,
  type BrandShape,
} from "@/lib/content";

// Fotorealistische 3D-Assets (Higgsfield). Slots werden serverseitig in
// page.tsx geprüft — fehlt ein File, rendert die jeweilige CSS-Bühne.
export type Assets3D = {
  hero: string | null;
  stage: string | null;
  shapes: Partial<Record<BrandShape, string>>;
};

function CtaButton({ label = cta.label, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={cta.href}
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(255,138,0,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {label}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <path
          d="M2 8h11M9 3.5L13.5 8 9 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-5 py-2.5 shadow-[0_16px_40px_-20px_rgba(2,48,71,0.35)] backdrop-blur-xl">
        <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-6 w-auto sm:h-7" />
        <nav className="hidden items-center gap-6 text-sm font-bold text-ink lg:flex">
          <span className="cursor-default">Leistungen</span>
          <span className="cursor-default">Case Studies</span>
        </nav>
        <a
          href={cta.href}
          className="rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-8px_rgba(255,138,0,0.7)] sm:px-5 sm:text-sm"
        >
          {cta.short}
        </a>
      </div>
    </header>
  );
}

// Eine Sektion = ein Viewport: Inhalte sind bewusst kompakt gehalten und
// werden ab lg vertikal zentriert auf volle Höhe gesetzt. Helle Sektionen
// bekommen ein Studio-Licht (radialer Lichtkegel + warmer Schimmer) statt
// flacher Flächen.
function Viewport({
  id,
  studio = false,
  className = "",
  children,
}: {
  id?: string;
  studio?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative flex items-center overflow-hidden py-16 lg:min-h-svh lg:py-20 ${className}`}>
      {studio && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% -10%, #ffffff 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse 45% 35% at 88% 105%, rgba(255,138,0,0.1) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 35% 30% at 8% 100%, rgba(2,48,71,0.06) 0%, rgba(2,48,71,0) 70%)",
            }}
          />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">{children}</div>
    </section>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.22em] ${dark ? "text-brand-orange" : "text-ink-soft"}`}
    >
      {children}
    </p>
  );
}

function H2({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl ${dark ? "text-white" : "text-ink"} ${className}`}>
      {children}
    </h2>
  );
}

// Schwebendes Panel: leichte Material-Gradients, Glanzkante oben, gestaffelte
// Schatten plus weicher Bodenschatten — statt flacher Karte.
const floatSurface =
  "relative h-full rounded-2xl bg-gradient-to-b from-white to-[#f6f9fb] ring-1 ring-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_5px_rgba(2,48,71,0.06),0_36px_70px_-34px_rgba(2,48,71,0.45)]";

function FloatTile({
  className = "",
  inner = "",
  children,
}: {
  className?: string;
  inner?: string;
  children: ReactNode;
}) {
  return (
    <div className={`group relative h-full transition-transform duration-300 hover:-translate-y-1.5 ${className}`}>
      <div
        aria-hidden
        className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md transition-all duration-300 group-hover:-bottom-4 group-hover:opacity-70"
      />
      <div className={`${floatSurface} ${inner}`}>{children}</div>
    </div>
  );
}

/* ---------------------------------- Hero --------------------------------- */

// CSS-Bühne hinter dem Foto: heller Studio-Verlauf, Podium, Glas-Panels.
// Sichtbar, solange das fotorealistische Asset noch nicht im Repo liegt.
function StageFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f3f6f8]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 62% 38%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 45% 35% at 70% 78%, rgba(255,138,0,0.18) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 30% 25% at 40% 85%, rgba(255,49,49,0.08) 0%, rgba(255,49,49,0) 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[68%] h-10 w-72 -translate-x-1/2 rounded-[100%] bg-[#023047]/15 blur-xl"
        aria-hidden
      />
      <div className="absolute left-1/2 top-[40%] w-44 -translate-x-1/2 rounded-2xl border border-white/70 bg-white/55 p-3 shadow-[0_24px_50px_-20px_rgba(2,48,71,0.35)] backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">Organischer Anteil</p>
        <p className="mt-0.5 text-xl font-extrabold text-brand-orange">80 %</p>
        <svg viewBox="0 0 120 36" className="mt-1 w-full">
          <path d="M2 30 C25 28 45 22 65 16 C85 10 100 8 118 4" fill="none" stroke="#ff8a00" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute left-[16%] top-[22%] w-36 rotate-[-5deg] rounded-2xl border border-white/70 bg-white/45 p-3 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">ROAS</p>
        <p className="mt-0.5 text-lg font-extrabold text-ink">4,8</p>
      </div>
      <div className="absolute right-[12%] top-[58%] w-36 rotate-[4deg] rounded-2xl border border-white/70 bg-white/45 p-3 backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">TACoS</p>
        <p className="mt-0.5 text-lg font-extrabold text-brand-red">−35 %</p>
      </div>
    </div>
  );
}

// Kundenlogos als Endlos-Marquee: Graustufen, Farbe bei Hover, weiche Kanten.
function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-max items-center"
        style={{ animation: "marquee-left 45s linear infinite" }}
      >
        {row.map((l, i) => (
          <div key={`${l.name}-${i}`} className="group grid h-12 w-28 shrink-0 place-items-center px-3">
            <img
              src={l.src}
              alt={l.name}
              className="max-h-9 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ image }: { image: string | null }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center px-5 pb-8 pt-24 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[10fr_11fr] lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl xl:text-[2.75rem]">
                Profitables Wachstum auf Amazon.{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                  Nicht teuer erkaufter Umsatz.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">{hero.subline}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div>
                  <CtaButton />
                  <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
                </div>
                <img
                  src={partnerBadge.src}
                  alt={partnerBadge.alt}
                  className="h-16 w-auto rounded-xl ring-1 ring-line"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={36}>
            <div
              className="relative aspect-[5/4] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_3px_6px_rgba(2,48,71,0.05),0_50px_90px_-40px_rgba(2,48,71,0.45)] sm:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[62svh]"
            >
              <StageFallback />
              {image && (
                <img
                  src={image}
                  alt="Produktbühne: schwebendes Produkt mit Performance-Dashboards"
                  className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
                />
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_48px_-24px_rgba(2,48,71,0.28)] backdrop-blur-xl lg:mt-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-center sm:gap-5">
              <p className="shrink-0 text-[11px] text-ink-soft sm:max-w-[12rem]">
                Marken, die uns ihr Amazon-Geschäft anvertrauen
              </p>
              <LogoMarquee />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Problem -------------------------------- */

function Problem() {
  const [transitionLead, transitionPunch] = problem.transition.split(/\.\s+/);
  return (
    <Viewport studio className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-md">{problem.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{problem.intro}</p>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-x-4 gap-y-6 md:grid-cols-3">
        {problem.pains.map((p, i) => (
          <Reveal key={p.title} delay={0.08 * i} className="h-full">
            <FloatTile className={i === 1 ? "md:-translate-y-3 md:hover:-translate-y-[18px]" : ""} inner="overflow-hidden p-5">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-5 text-[88px] font-extrabold leading-none tracking-tighter text-ink/[0.05]"
              >
                {i + 1}
              </span>
              <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
              <h3 className="mt-2 text-base font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.text}</p>
            </FloatTile>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.24}>
        <p className="mt-9 text-center text-sm font-bold text-ink">
          {transitionLead}.{" "}
          <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
            {transitionPunch}
          </span>
        </p>
      </Reveal>
    </Viewport>
  );
}

/* ------------------------------- Mechanismus ------------------------------ */

function Mechanism({ stage }: { stage: string | null }) {
  return (
    <Viewport className="bg-brand-navy">
      {/* Bühne: 3D-Rendering (Glas-Plattformen), solange nicht vorhanden
          warmes Bühnenlicht + spiegelnder Boden als CSS-Fallback */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {stage && (
          <img
            src={stage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 110%, rgba(255,138,0,0.22) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 40% 30% at 85% 0%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%), linear-gradient(to bottom, rgba(2,48,71,0.55) 0%, rgba(2,48,71,0) 35%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.06), transparent)" }}
        />
      </div>
      <div className="relative">
        <Reveal>
          <Eyebrow dark>{mechanism.eyebrow}</Eyebrow>
        </Reveal>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal delay={0.06}>
            <H2 dark className="max-w-lg">
              {mechanism.headline}
            </H2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-[13px] leading-relaxed text-white/70">{mechanism.intro}</p>
          </Reveal>
        </div>
        {/* Drei Glas-Plattformen, aufsteigend gestaffelt wie eine Treppe */}
        <div className="mt-10 grid gap-x-4 gap-y-5 md:grid-cols-3">
          {mechanism.steps.map((s, i) => (
            <Reveal key={s.name} delay={0.08 * i} className="h-full">
              <div
                className={`relative h-full transition-transform duration-300 hover:-translate-y-1.5 ${
                  i === 0 ? "md:translate-y-6" : i === 1 ? "md:translate-y-3" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-black/40 blur-md"
                />
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md">
                  <div
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,138,0,0.8), transparent)" }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-brand-orange">0{i + 1}</span>
                    <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                      {s.name}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.24}>
          <div className="mt-9 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-6 py-4 text-center shadow-[0_0_60px_-12px_rgba(255,138,0,0.35)] backdrop-blur-sm">
            <p className="text-sm font-bold text-white sm:text-base">{mechanism.target}</p>
          </div>
        </Reveal>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Cases --------------------------------- */

function Cases() {
  return (
    <Viewport studio className="bg-white">
      <Reveal>
        <H2>{cases.headline}</H2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{cases.subline}</p>
      </Reveal>
      <div className="mt-9 grid gap-x-4 gap-y-6 lg:grid-cols-2">
        {cases.items.map((c, i) => (
          <Reveal key={c.brand} delay={0.08 * i} className="h-full">
            <FloatTile inner="flex gap-5 p-5">
              {/* Produktfoto als kleines Podium: warmer Lichtkegel + Bodenschatten */}
              <div className="relative hidden w-28 shrink-0 sm:block">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-2xl"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,138,0,0.12), transparent 70%)",
                  }}
                />
                <div className="relative h-28 w-28 overflow-hidden rounded-xl shadow-[0_18px_30px_-14px_rgba(2,48,71,0.5)] ring-1 ring-white">
                  <Image src={c.image} alt={c.brand} fill sizes="112px" className="object-cover" />
                </div>
                <div
                  aria-hidden
                  className="mx-auto mt-2 h-2.5 w-20 rounded-[100%] bg-brand-navy/15 blur-[3px]"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  {c.brand} · {c.category}
                </p>
                <p className="mt-1.5 text-2xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                    {c.metric}
                  </span>
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                <p className="mt-2 text-[11px] text-ink-soft/80">{c.note}</p>
              </div>
            </FloatTile>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="relative mt-9 overflow-hidden rounded-2xl bg-brand-navy px-6 py-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 90% at 85% 110%, rgba(255,138,0,0.25), transparent 70%), radial-gradient(ellipse 35% 70% at 8% -10%, rgba(255,49,49,0.15), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-base font-bold text-white">{midCta.question}</p>
            <CtaButton label={midCta.label} />
          </div>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* -------------------------------- Leistungen ------------------------------ */

// Die vier Subbrand-Formen aus dem TEMOA-Logo-Icon (Pfade aus
// public/assets/logos/logo_icon.svg). Wird durch fotorealistische
// 3D-Renderings ersetzt, sobald die Assets im Repo liegen.
function BrandShapeIcon({ shape, className = "" }: { shape: BrandShape; className?: string }) {
  if (shape === "square")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <defs>
          <linearGradient id="sq-3d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#f57600" />
          </linearGradient>
        </defs>
        <rect width="108" height="108" rx="14" fill="url(#sq-3d)" />
      </svg>
    );
  if (shape === "circle")
    return (
      <svg viewBox="0 0 108 108" className={className} aria-hidden>
        <defs>
          <radialGradient id="ci-3d" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#ff7a6e" />
            <stop offset="100%" stopColor="#e01f1f" />
          </radialGradient>
        </defs>
        <circle cx="54" cy="54" r="54" fill="url(#ci-3d)" />
      </svg>
    );
  if (shape === "u")
    return (
      <svg viewBox="0 121 110 134" className={className} aria-hidden>
        <defs>
          <linearGradient id="u-3d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a4361" />
            <stop offset="100%" stopColor="#01202f" />
          </linearGradient>
        </defs>
        <path
          d="M2.25,121.7 L107.6,121.7 C108.8,121.7 109.8,122.7 109.8,123.9 L109.8,200.6 C109.5,223.9 94.6,243.7 74.1,251.2 C68.6,253.1 62.3,254.1 56,254.1 C49.7,254.1 43.8,253 38.3,251.2 C17.6,243.8 2.7,224 2.4,200.6 L2.4,123.9 C2.4,122.7 3.4,121.7 2.25,121.7 Z"
          fill="url(#u-3d)"
        />
      </svg>
    );
  return (
    <svg viewBox="120 122 109 132" className={className} aria-hidden>
      <defs>
        <linearGradient id="hx-3d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef7fd" />
          <stop offset="100%" stopColor="#aed3e8" />
        </linearGradient>
      </defs>
      <path
        d="M176.3,122.9 L226.2,153.6 C227.4,154.3 228.1,155.6 228.1,157 L228.1,218.7 C228.1,220.1 227.4,221.4 226.2,222.1 L176.3,252.9 C175.1,253.6 173.6,253.6 172.5,252.9 L122.6,222.1 C121.4,221.4 120.7,220.1 120.7,218.7 L120.7,157 C120.7,155.6 121.4,154.3 122.6,153.6 L172.5,122.9 C173.6,122.1 175.1,122.1 176.3,122.9 Z"
        fill="url(#hx-3d)"
      />
    </svg>
  );
}

// Schwebendes 3D-Objekt mit Bodenschatten: Foto-Render, sonst SVG-Form.
function ShapeObject({ shape, photo, dark = false }: { shape: BrandShape; photo?: string; dark?: boolean }) {
  return (
    <span className="relative mt-1 block shrink-0">
      {photo ? (
        <img src={photo} alt="" className="h-12 w-12 object-contain drop-shadow-[0_12px_14px_rgba(2,48,71,0.3)]" aria-hidden />
      ) : (
        <BrandShapeIcon shape={shape} className="h-9 w-9 drop-shadow-[0_10px_10px_rgba(2,48,71,0.3)]" />
      )}
      <span
        aria-hidden
        className={`absolute -bottom-2 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-[100%] blur-[2px] ${dark ? "bg-black/50" : "bg-brand-navy/20"}`}
      />
    </span>
  );
}

function ServiceTile({
  name,
  subBrand,
  shape,
  shapePhoto,
  title,
  text,
  dark = false,
}: {
  name?: string;
  subBrand?: string;
  shape?: BrandShape;
  shapePhoto?: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          {name && (
            <span
              className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                dark ? "bg-white/10 text-brand-orange" : "bg-brand-orange/10 text-brand-orange"
              }`}
            >
              {name}
            </span>
          )}
          {subBrand && (
            <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? "text-white/50" : "text-ink-soft/70"}`}>
              {subBrand}
            </p>
          )}
          <h3 className={`mt-1 text-base font-bold ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
        </div>
        {shape && <ShapeObject shape={shape} photo={shapePhoto} dark={dark} />}
      </div>
      <p className={`mt-2 text-[13px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </>
  );

  if (dark) {
    return (
      <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1.5">
        <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/30 blur-md" />
        <div className="relative h-full overflow-hidden rounded-2xl bg-brand-navy p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_36px_70px_-34px_rgba(2,48,71,0.8)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 80% 110%, rgba(255,138,0,0.18), transparent 70%)" }}
          />
          <div className="relative">{body}</div>
        </div>
      </div>
    );
  }
  return <FloatTile inner="p-5">{body}</FloatTile>;
}

function Services({ shapes }: { shapes: Assets3D["shapes"] }) {
  return (
    <Viewport studio className="bg-surface-alt">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal>
          <H2 className="max-w-xl">{services.headline}</H2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">{services.intro}</p>
        </Reveal>
      </div>
      <div className="mt-10 grid gap-x-4 gap-y-6 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <ServiceTile {...services.foundation} shapePhoto={services.foundation.shape && shapes[services.foundation.shape]} />
        </Reveal>
        {services.levers.map((l, i) => (
          <Reveal key={l.title} delay={0.08 + 0.04 * i}>
            <ServiceTile {...l} shapePhoto={l.shape && shapes[l.shape]} />
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <ServiceTile dark {...services.bracket} shapePhoto={services.bracket.shape && shapes[services.bracket.shape]} />
        </Reveal>
      </div>
    </Viewport>
  );
}

/* --------------------------------- Schritte ------------------------------- */

function Steps() {
  return (
    <Viewport studio className="bg-white">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{steps.headline}</H2>
      </Reveal>
      <div className="mt-12 grid gap-x-4 gap-y-8 md:grid-cols-3">
        {steps.items.map((s, i) => (
          <Reveal key={s.title} delay={0.08 * i} className="h-full">
            <FloatTile inner="p-5 pt-7">
              <span className="absolute -top-4 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-orange to-[#f57600] text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_-8px_rgba(255,138,0,0.8)]">
                {i + 1}
              </span>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-ink">{s.title}</h3>
                <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-0.5 text-[10px] font-bold text-ink-soft">
                  {s.duration}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
            </FloatTile>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.24}>
        <div className="mt-10 text-center">
          <CtaButton />
          <p className="mt-3 text-xs text-ink-soft">{cta.micro}</p>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Viewport studio className="bg-surface-alt">
      <Reveal>
        <H2 className="mx-auto max-w-xl text-center">{faq.headline}</H2>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="relative mx-auto mt-9 max-w-3xl">
          <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-[100%] bg-brand-navy/15 blur-md" />
          <div className={`${floatSurface} overflow-hidden`}>
            {faq.items.map((item, i) => (
              <div key={item.q} className={i > 0 ? "border-t border-line" : ""}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-3.5 text-left"
                >
                  <span className="text-sm font-bold text-ink">{item.q}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-ink transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {open === i && <p className="px-6 pb-4 text-[13px] leading-relaxed text-ink-soft">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Viewport>
  );
}

/* --------------------------------- Abschluss ------------------------------ */

function Closing() {
  return (
    <section id="kontakt" className="relative flex items-center overflow-hidden bg-brand-navy py-16 lg:min-h-svh">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255,138,0,0.16) 0%, rgba(255,138,0,0) 70%), radial-gradient(ellipse 45% 35% at 15% 100%, rgba(255,49,49,0.1) 0%, rgba(255,49,49,0) 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.05), transparent)" }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6)] ring-4 ring-white/20 sm:h-28 sm:w-28">
              <Image src={closing.photo} alt={`${closing.person}, ${closing.role}`} fill sizes="112px" className="object-cover" />
            </div>
            <H2 dark className="mt-6">
              {closing.headline}
            </H2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{closing.text}</p>
            <p className="mt-3 text-sm font-bold text-white">
              {closing.person} · {closing.role}
            </p>
            <div className="mt-7">
              <CtaButton />
              <p className="mt-3 text-xs text-white/60">{closing.micro}</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center">
          <img src="/assets/logos/logo_full_white.svg" alt="TEMOA" className="h-6 w-auto" />
          <p className="max-w-md text-xs leading-relaxed text-white/50">
            Entwurf F — „Produktbühne kompakt“. Navigation und Unterseiten folgen in der Umsetzungsphase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function EntwurfF({ assets }: { assets: Assets3D }) {
  return (
    <main>
      <Header />
      <Hero image={assets.hero} />
      <Problem />
      <Mechanism stage={assets.stage} />
      <Cases />
      <Services shapes={assets.shapes} />
      <Steps />
      <Faq />
      <Closing />
    </main>
  );
}
