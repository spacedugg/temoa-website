"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../takt/Icons";
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

/* Der Ablauf, wie er wirklich laeuft: erst ein kurzes Kennenlernen, dann ein
   zweiter Termin mit vorbereiteten Zahlen, dann die Entscheidung. Vorher stand
   auf dieser Seite, wir wuerden vorab in Listings und Kampagnen schauen und im
   Termin 45 Minuten den Bildschirm teilen. */
const ablauf: { schritt: string; title: string; body: string; icon: IconName }[] = [
  {
    schritt: "Schritt 1",
    title: "Erstgespräch, 25 Minuten",
    body: "Wir hören, wo ihr steht: Sortiment, Ziele, was gerade klemmt. Ihr hört, wie wir arbeiten.",
  icon: "kompass",
  },
  {
    schritt: "Schritt 2",
    title: "Zweiter Termin mit euren Zahlen",
    body: "Passt es für beide Seiten, bereiten wir eure Zahlen auf und gehen sie mit euch durch.",
    icon: "lupe",
  },
  {
    schritt: "Schritt 3",
    title: "Ihr entscheidet",
    body: "Ihr wisst, welche Schritte zuerst kommen und was sie bringen sollen. Alles Weitere entscheidet ihr.",
    icon: "stufen",
  },
];

const EASE = [0.32, 0.72, 0, 1] as const;

function Ablauf() {
  const reduce = useReducedMotion();

  return (
    <section className="ground relative py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Ablauf"
          size="compact"
          title={
            <>
              Vom ersten Termin bis <span className="text-gradient">zur Entscheidung.</span>
            </>
          }
        />

        <div className="relative mt-14">
          {/* Die Bahn zeichnet sich von links nach rechts, bevor die Schritte
              einlaufen. Dieselbe Bewegung wie beim Onboarding auf der
              Full-Service-Seite, damit beide Seiten dieselbe Sprache sprechen. */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-[2.05rem] hidden h-[2px] w-full origin-left md:block"
            style={{
              background: "linear-gradient(90deg, rgba(255,153,0,0.15), #FF9900 45%, rgba(255,153,0,0.15))",
              boxShadow: "0 0 14px rgba(255,153,0,0.45)",
            }}
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {ablauf.map((a, i) => (
              <motion.div
                key={a.schritt}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.16, ease: EASE }}
                className="relative flex flex-col"
              >
                <span className="relative z-10 grid h-[4.1rem] w-[4.1rem] place-items-center rounded-[1.3rem] bg-navy text-brand-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_0_6px_rgba(244,248,251,1)]">
                  <Icon name={a.icon} className="h-8 w-8" />
                </span>
                <span className="mt-6 text-label font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {a.schritt}
                </span>
                <span className="mt-2 text-[1.15rem] font-bold leading-snug text-ink md:text-[1.25rem]">
                  {a.title}
                </span>
                <p className="mt-2.5 text-small leading-relaxed text-ink-muted">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
                Erst lernen wir uns kennen, <span className="text-gradient">dann die Zahlen.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-muted lg:mx-0">
                Ein kurzes erstes Gespräch, in dem wir eure Lage verstehen und ihr uns kennenlernt.
              </p>
            </Reveal>

            {/* Was im ersten Gespraech passiert. Vorher stand hier, dass wir
                vorab in Listings und Kampagnen schauen und 45 Minuten den
                Bildschirm teilen: so laeuft es nicht. Das erste Gespraech
                dauert 25 Minuten und dient dem Kennenlernen, die
                vorbereitete Auswertung kommt im zweiten Termin. */}
            <Reveal delay={0.16}>
              <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left lg:mx-0">
                {[
                  "25 Minuten, per Video, ohne Vorbereitung auf eurer Seite",
                  "Wir fragen nach Sortiment, Zielen und dem, was gerade klemmt",
                  "Am Ende wisst ihr, ob es passt und wie der nächste Schritt aussieht",
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
              </div>
              {/* Die Angaben stehen unter dem Bild, nicht als Kachel darauf.
                  Eine Platte auf einem Gesicht sieht nach Aufkleber aus. */}
              <figcaption className="mt-5">
                <span className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FF9900">
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                    </svg>
                  ))}
                </span>
                <div className="mt-2 text-[1rem] font-bold text-ink">Hi, ich bin Clemens.</div>
                <div className="mt-0.5 text-small text-ink-muted">Founder. Ich führe das Gespräch selbst.</div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Belegte Zahlen aus den Case Studies.
          Vorher lagen sie als abgerundeter Navy-Kasten in einer hellen Sektion,
          und darin steckte jede Zahl noch einmal in einer eigenen Kachel: eine
          Kachel in einem Kasten in einer Sektion. Jetzt traegt die Sektion das
          Navy selbst, die Zahlen stehen frei darauf, getrennt durch feine
          Linien. */}
      <section className="on-dark ground-deep relative isolate overflow-hidden py-12 md:py-16">
        <span
          aria-hidden
          className="pointer-events-none absolute right-[-8%] top-[-40%] h-[26rem] w-[26rem] rounded-full opacity-70 blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(255,153,0,0.22), transparent 68%)" }}
        />
        <div className="container-x relative">
          <div className="grid gap-y-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-white/[0.1]">
            {metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 0.07}
                className={i === 0 ? "sm:pr-8" : i === metrics.length - 1 ? "sm:pl-8" : "sm:px-8"}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0">
                    <ZahlText
                      text={m.value}
                      className="num text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-none text-white"
                    />
                    <div className="mt-2.5 text-small font-bold leading-snug text-white/85">{m.label}</div>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem]"
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Ablauf />

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
      <section id="kalender" className="ground relative scroll-mt-24 py-20 md:py-24">
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
              Nehmt euch die 25 Minuten.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-[50ch] text-pretty text-lead text-chalk-muted">
              Danach wisst ihr, ob wir zueinander passen. Alles Weitere entscheidet ihr danach.
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
