"use client";

import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Testimonials } from "../home/Testimonials";
import { CalEmbed } from "./CalEmbed";
import { BookingFAQ } from "./BookingFAQ";

const trust = ["Kostenlos und unverbindlich", "In etwa 30 Minuten", "Ihr verlängert nach Performance"];

const metrics = [
  { value: "+147 %", label: "Umsatz, Vitaworld", color: "#FF3131" },
  { value: "+439 %", label: "Conversion Rate, HaA", color: "#2A9BD8" },
  { value: "−35 %", label: "TACoS, Marke aus Gartenzubehör", color: "#FF9900" },
];

const fit = [
  "Ihr seid eine etablierte Marke mit eigenem Sortiment auf Amazon.",
  "Ihr wollt profitabel wachsen, nicht Umsatz um jeden Preis.",
  "Ihr seht Amazon als Vertriebskanal, in den ihr investiert.",
];
const noFit = [
  "Ihr sucht die billigste Lösung statt das beste Ergebnis.",
  "Ihr wollt schnelle Tricks und garantierte Rankings.",
  "Ihr steht noch ganz am Anfang, ohne nennenswerten Umsatz.",
];

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-brand-600">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Cross() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BookingBody() {
  return (
    <>
      {/* Hero: copy left, booking card (with calendar) right */}
      <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,153,0,0.16), rgba(255,49,49,0.07) 50%, transparent 72%)" }}
        />
        <div className="container-x relative grid items-stretch gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* left: copy + Clemens photo filling the column */}
          <div className="flex flex-col text-center lg:text-left">
            <Reveal>
              <span className="eyebrow lg:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Kostenlose Potenzialanalyse
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-5 max-w-xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:mx-0">
                Findet heraus, wie viel Umsatz euer Account <span className="text-gradient">liegen lässt.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-balance text-lg leading-relaxed text-ink-muted lg:mx-0">
                Wir schauen in euren Amazon-Account und zeigen euch die größten Chancen, konkret an eurer Marke.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 text-left lg:mx-0">
                {trust.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base font-medium text-ink">
                    <Check /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Clemens fills the remaining height, head anchored to the top */}
            <Reveal delay={0.22} className="mt-7 flex-1">
              <div className="relative h-full min-h-[16rem] overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/Clemens.jpg"
                  alt="Clemens, euer Ansprechpartner bei temoa"
                  className="absolute inset-0 h-full w-full object-cover [object-position:50%_28%] [filter:brightness(1.05)]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-navy-deep/80 via-navy-deep/30 to-transparent p-5 pt-16">
                  <div className="flex items-center gap-1 text-white">
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF9900">
                          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <div className="ml-1">
                    <div className="text-sm font-bold text-white">Dein Host: Clemens</div>
                    <div className="text-xs text-white/80">Euer Ansprechpartner bei temoa</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: booking card */}
          <Reveal direction="left" delay={0.1}>
            <div id="kalender" className="flex h-full scroll-mt-24 flex-col rounded-[2rem] bg-white p-5 shadow-[0_40px_90px_-40px_rgba(2,48,71,0.4)] ring-1 ring-black/[0.06] md:p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-700">
                  Kostenlos · ca. 30 Min.
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                  <Check /> unverbindlich
                </span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink">Sichert euch euren Termin.</h2>
              <div className="mt-5 flex-1">
                <CalEmbed />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Real results band (dark) */}
      <section className="relative bg-white pb-4">
        <div className="container-x">
          <Reveal>
            <div
              className="grid gap-6 rounded-[1.75rem] px-6 py-9 text-center sm:grid-cols-3 md:px-12"
              style={{ background: "linear-gradient(135deg,#0A1E2B,#053048)" }}
            >
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: m.color }}>
                    {m.value}
                  </div>
                  <div className="mt-1.5 text-sm text-white/70">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Passt / Passt nicht */}
      <section className="relative bg-[#EDF5FB] py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Für wen" size="compact" title={<>Passt das zu <span className="text-gradient">eurer Marke?</span></>} />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="surface flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/12 text-brand-600">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-base font-bold text-ink">Passt, wenn</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {fit.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                      <Check /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="surface flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red/10 text-red">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-base font-bold text-ink">Passt nicht, wenn</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {noFit.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                      <Cross /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials tone="white" />

      {/* FAQ */}
      <section className="relative bg-[#EDF5FB] py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" size="compact" title={<>Bevor ihr <span className="text-gradient">bucht.</span></>} />
          <BookingFAQ />
        </div>
      </section>

      {/* Final CTA -> back up to the calendar */}
      <section className="relative py-20 md:py-28">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center shadow-glow md:px-12 md:py-20"
            style={{ backgroundImage: "var(--brand-gradient)", backgroundSize: "150% 150%" }}
          >
            <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-white/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -right-10 h-60 w-60 rounded-full bg-white/15 blur-3xl" />
            <Reveal>
              <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
                Bereit, das Potenzial zu sehen?
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                Sichert euch euren kostenlosen Analyse-Termin. Unverbindlich, in etwa 30 Minuten.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="relative mt-8 flex justify-center">
                <a href="#kalender" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-lift transition-transform duration-300 hover:-translate-y-0.5">
                  Termin sichern
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
