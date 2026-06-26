"use client";

import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon, type IconName } from "../ui/Icon";
import { Testimonials } from "../home/Testimonials";
import { CalEmbed } from "./CalEmbed";
import { BookingFAQ } from "./BookingFAQ";

const chips = ["Kostenlos und unverbindlich", "In etwa 30 Minuten", "Ihr verlängert nach Performance"];

const value: { icon: IconName; title: string; body: string }[] = [
  { icon: "search", title: "Konkrete Potenzialeinschätzung", body: "Wo in eurem Account Umsatz und Marge liegen, mit Zahlen statt Bauchgefühl." },
  { icon: "spark", title: "Die größten Quick Wins", body: "Was ihr sofort verbessern könnt, auch ohne Zusammenarbeit." },
  { icon: "strategy", title: "Ein klarer nächster Schritt", body: "Ein Fahrplan, den ihr danach auch allein umsetzen könntet." },
];

const steps: { title: string; body: string }[] = [
  { title: "Termin wählen", body: "Sucht euch im Kalender einen Slot, der passt." },
  { title: "Wir analysieren euren Account", body: "Vor dem Gespräch schauen wir uns Listings, Kampagnen und Zahlen an." },
  { title: "Potenzialanalyse im Gespräch", body: "30 Minuten, konkrete Beobachtungen, klare nächste Schritte." },
];

const CHIP = ["bg-brand-500/10 text-brand-600", "bg-cyan/10 text-cyan", "bg-red/10 text-red"];

function Tick() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/12 text-brand-600">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BookingBody() {
  return (
    <>
      {/* Hero + value */}
      <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,153,0,0.18), rgba(255,49,49,0.07) 50%, transparent 72%)" }}
        />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Kostenlose Potenzialanalyse
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Findet heraus, wie viel Umsatz euer Account <span className="text-gradient">liegen lässt.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">
              Wir schauen in euren Amazon-Account und zeigen euch die größten Chancen, konkret an eurer Marke.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex justify-center">
              <a href="#kalender" className="btn-primary !px-7 !py-4 text-base">
                Potenzialanalyse buchen
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-muted">
              {chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-2">
                  <Tick /> {c}
                </span>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3" stagger={0.07}>
            {value.map((v, i) => (
              <RevealItem key={v.title} className="h-full">
                <div className="surface flex h-full flex-col items-center p-6 text-center">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${CHIP[i % CHIP.length]}`}>
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative bg-[#EDF5FB] py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Ablauf" size="compact" title={<>So einfach <span className="text-gradient">läuft es.</span></>} />
          <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3" stagger={0.1}>
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="h-full">
                <div className="surface flex h-full flex-col p-6">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-base font-extrabold text-white"
                    style={{ backgroundImage: "var(--brand-gradient)" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Kalender */}
      <section id="kalender" className="relative scroll-mt-24 bg-white py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Termin" size="compact" title={<>Wählt euren <span className="text-gradient">Termin.</span></>} />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-4xl">
              <CalEmbed />
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials tone="blue" />

      {/* FAQ */}
      <section className="relative bg-white py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" size="compact" title={<>Häufige <span className="text-gradient">Fragen.</span></>} />
          <BookingFAQ />
        </div>
      </section>

      {/* Final CTA */}
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
                <a href="#kalender" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-lift transition-transform duration-300 hover:-translate-y-0.5">
                  Potenzialanalyse buchen
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
