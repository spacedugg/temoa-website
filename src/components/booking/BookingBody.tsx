"use client";

import { Reveal } from "../ui/Reveal";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Stimmen } from "../takt/sections";
import { ZahlText } from "../takt/Zahl";
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
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col text-center lg:text-left">
            <Reveal>
              <Pille>Kostenlose Potenzialanalyse</Pille>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-6 max-w-xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:mx-0">
                Erst schauen wir in euren Account, <span className="text-gradient">dann reden wir.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-muted lg:mx-0">
                Vor dem Termin sehen wir uns eure Listings und Kampagnen an. Im Gespräch bekommt ihr
                konkrete Beobachtungen und eine Einschätzung, keine Präsentation.
              </p>
            </Reveal>

            {/* Was in den 45 Minuten passiert. Vorher stand das nirgends, und
                wer nicht weiss, was ihn erwartet, bucht nicht. */}
            <Reveal delay={0.16}>
              <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left lg:mx-0">
                {[
                  "45 Minuten, per Video, ohne Vorbereitung auf eurer Seite",
                  "Wir zeigen den Bildschirm und gehen eure Zahlen durch",
                  "Am Ende wisst ihr, welche drei Schritte zuerst kommen",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckGreen />
                    <span className="text-base leading-snug text-ink">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex justify-center lg:justify-start">
                <a href="#kalender" className="btn-primary">
                  Zum Kalender
                  <span className="disc" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v13m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Vorher lag hier ein rechteckiges Foto mit einer dunkelblauen
              Platte darauf, dieselbe Form, die im Abschluss-CTA schon
              ersetzt wurde. Jetzt steht Clemens freigestellt in einer
              eigenen Flaeche, die Angaben liegen als Glasplatte davor. */}
          <Reveal direction="left" delay={0.12}>
            <figure className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto">
              <div
                className="relative h-[24rem] overflow-hidden rounded-[1.75rem] sm:h-[27rem]"
                style={{
                  background:
                    "radial-gradient(110% 80% at 50% 16%, rgba(255,158,96,0.4), transparent 62%), linear-gradient(160deg, #10314a 0%, #0a2035 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 30px 70px -40px rgba(4,20,34,0.8)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/clemens-frei.webp"
                  alt="Clemens, euer Ansprechpartner bei temoa"
                  width={900}
                  height={855}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto max-w-none object-contain object-bottom"
                  style={{ filter: "drop-shadow(0 22px 40px rgba(4,16,28,0.55))" }}
                />
                <figcaption
                  className="absolute inset-x-4 bottom-4 rounded-[1.1rem] px-4 py-3 md:inset-x-5 md:bottom-5"
                  style={{
                    background: "rgba(6,24,38,0.66)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FF9900">
                        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                      </svg>
                    ))}
                  </span>
                  <div className="mt-2 text-[0.95rem] font-bold text-white">Hi, ich bin Clemens.</div>
                  <div className="mt-0.5 text-small text-chalk-faint">
                    Founder. Ich führe das Gespräch selbst.
                  </div>
                </figcaption>
              </div>
            </figure>
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
                // Gruen steht fuer „besser geworden", aber als Strich ueber
                // der Kachel war es zu viel: die Kante hat den Block in drei
                // Streifen zerlegt. Der gruene Pfeil reicht.
                <div key={m.label} className="panel-dark relative flex flex-col gap-3 overflow-hidden p-5 md:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <ZahlText
                      text={m.value}
                      className="num text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-none text-white"
                    />
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem]"
                      style={{ background: "#22C55E26", color: "#4ADE80", boxShadow: "0 0 14px -2px #22C55E77" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d={m.runter ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="text-small font-bold leading-snug text-white/85">{m.label}</div>
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

      {/* Der Kalender steht jetzt in einer eigenen Sektion ueber die volle
          Breite. Vorher war er in eine Spalte des Hero gequetscht: der Rahmen
          hatte 540 px Mindesthoehe und overflow-hidden, dadurch war die
          Terminauswahl unten abgeschnitten. */}
      <section id="kalender" className="ground-tint relative scroll-mt-24 py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Termin"
            size="compact"
            title={
              <>
                Sucht euch <span className="text-gradient">einen Termin.</span>
              </>
            }
            description="Ihr bekommt sofort eine Bestätigung mit dem Videolink."
          />
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] bg-white p-4 shadow-[0_40px_90px_-40px_rgba(2,48,71,0.4)] ring-1 ring-black/[0.06] md:p-6">
              <CalEmbed />
            </div>
          </Reveal>
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
