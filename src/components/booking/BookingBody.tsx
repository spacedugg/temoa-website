"use client";

import { Reveal } from "../ui/Reveal";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Stimmen } from "../takt/sections";
import { CalEmbed } from "./CalEmbed";
import { BookingFAQ } from "./BookingFAQ";

/* `runter` heisst: der Wert soll sinken, der Pfeil zeigt nach unten. Eine
   gesunkene TACoS ist ein gutes Ergebnis, deshalb bleibt der Pfeil gruen. */
const metrics: { value: string; label: string; runter?: boolean }[] = [
  { value: "+147 %", label: "Umsatz, Vitaworld" },
  { value: "+439 %", label: "Conversion Rate, HaA" },
  { value: "−35 %", label: "TACoS, Marke aus Gartenzubehör", runter: true },
];

const fit = [
  "Ihr seid eine etablierte Marke mit eigenem Sortiment auf Amazon.",
  "Bei euch kümmern sich ein, zwei Leute um Amazon und die Zeit reicht nicht.",
  "Ihr wollt profitabel wachsen, nicht Umsatz um jeden Preis.",
  "Ihr seht Amazon als Vertriebskanal, in den ihr investiert.",
];
const noFit = [
  "Euer Amazon-Umsatz liegt unter 50.000 € im Monat, dann fehlt den Produkten der Traffic.",
  "Ihr sucht den günstigsten Anbieter.",
  "Ihr wollt garantierte Rankings und schnelle Tricks.",
  "Amazon ist bei euch ein Nebenkanal, in den nichts investiert wird.",
];

function CheckGreen() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#16A34A1A", color: "#16A34A", boxShadow: "0 0 10px -1px #16A34A66" }}>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Cross() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#FF31311A", color: "#E11414", boxShadow: "0 0 10px -1px #FF313155" }}>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BookingBody() {
  return (
    <>
      {/* Hero: copy left, booking card (with calendar) right */}
      <section className="relative overflow-hidden ground pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,153,0,0.16), rgba(255,49,49,0.07) 50%, transparent 72%)" }}
        />
        <div className="container-x relative grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* left: copy + Clemens photo */}
          <div className="flex flex-col text-center lg:text-left">
            <Reveal>
              <Pille>Kostenlose Potenzialanalyse</Pille>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-5 max-w-xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:mx-0">
                Erst schauen wir in euren Account, <span className="text-gradient">dann reden wir.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-balance text-lg leading-relaxed text-ink-muted lg:mx-0">
                Vor dem Termin sehen wir uns eure Listings und Kampagnen an. Im Gespräch bekommt ihr konkrete
                Beobachtungen und eine Einschätzung, keine Präsentation.
              </p>
            </Reveal>
            {/* Square portrait, face fully visible (no mid-face crop) */}
            <Reveal delay={0.18} className="mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.06] sm:aspect-[3/2] lg:aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/Clemens.webp"
                  alt="Clemens, euer Ansprechpartner bei temoa"
                  className="absolute inset-0 h-full w-full object-cover object-center [filter:brightness(1.05)]"
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
                    <div className="text-sm font-bold text-white">Clemens</div>
                    <div className="text-xs text-white/80">Euer Ansprechpartner bei temoa</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: booking card */}
          <Reveal direction="left" delay={0.1} className="lg:self-center">
            <div id="kalender" className="flex scroll-mt-24 flex-col rounded-[2rem] bg-white p-5 shadow-[0_40px_90px_-40px_rgba(2,48,71,0.4)] ring-1 ring-black/[0.06] md:p-6">
              <div className="flex-1">
                <CalEmbed />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Belegte Zahlen aus den Case Studies, als dunkles Podest.
          Vorher stand jede Zahl in einer eigenen Farbe, rot, blau, orange.
          Drei Signalfarben nebeneinander sagen nichts, sie machen nur Lärm.
          Jetzt weisse Zahlen, der Pfeil traegt die Richtung. */}
      <section className="ground relative pb-4">
        <div className="container-x">
          <Reveal>
            <div className="ground-deep on-dark grid gap-4 overflow-hidden rounded-[1.75rem] px-5 py-8 sm:grid-cols-3 md:px-8">
              {metrics.map((m) => (
                <div key={m.label} className="panel-dark flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl font-extrabold leading-none tracking-tight text-white [font-variant-numeric:tabular-nums] md:text-4xl">
                      {m.value}
                    </span>
                    <span
                      aria-hidden
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-lg"
                      style={{ background: "#16A34A26", color: "#4ADE80" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d={m.runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="text-[0.82rem] leading-snug text-chalk-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Passt / Passt nicht */}
      <section className="ground-tint relative py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Für wen" size="compact" title={<>Wann sich das Gespräch <span className="text-gradient">lohnt.</span></>} />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="surface flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#16A34A1A", color: "#16A34A", boxShadow: "0 0 12px -1px #16A34A66" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-base font-bold text-ink">Passt, wenn</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {fit.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
                      <CheckGreen /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="surface flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#FF31311A", color: "#E11414", boxShadow: "0 0 12px -1px #FF313155" }}>
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

      <Stimmen />

      {/* FAQ */}
      <section className="ground-tint relative py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" size="compact" title={<>Bevor ihr <span className="text-gradient">bucht.</span></>} />
          <BookingFAQ />
        </div>
      </section>

      {/* Abschluss: zurueck nach oben zum Kalender. Dasselbe dunkle Podest wie
          die uebrigen Abschluss-Sektionen, nicht mehr die orange Flaeche. */}
      <section className="on-dark ground-deep relative overflow-hidden py-20 text-center md:py-28">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
        <div className="container-x relative">
          <Reveal>
            <h2 className="title mx-auto max-w-[24ch] text-balance text-[clamp(1.9rem,1.3rem+1.7vw,2.9rem)] text-white">
              Nehmt euch die 30 Minuten.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-[50ch] text-pretty text-lead text-chalk-muted">
              Der Termin ist kostenlos und unverbindlich. Danach wisst ihr, was in eurem Konto liegt.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex justify-center">
              <a href="#kalender" className="btn-on-dark">
                Termin sichern
                <span className="disc" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5m0 0l-5 5m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
