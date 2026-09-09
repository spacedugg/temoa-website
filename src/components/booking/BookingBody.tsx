"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../takt/Icons";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Stimmen } from "../takt/sections";
import type { Woerterbuch } from "@/lib/woerter";
import type { Testimonial } from "@/lib/testimonials";
import { Fahrplan } from "../takt/Fahrplan";
import { ZahlText } from "../takt/Zahl";
import { CalEmbed } from "./CalEmbed";
import { BookingFAQ } from "./BookingFAQ";

/* Die dritte Zahl soll sinken, der Pfeil zeigt dort nach unten. Eine
   gesunkene TACoS ist ein gutes Ergebnis, deshalb bleibt er gruen. Das haengt
   an der Kennzahl und nicht an der Sprache, deshalb steht es hier. */
const RUNTER = 2;

type B = Woerterbuch["buchung"];

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
/* Die Symbole der drei Schritte, in der Reihenfolge des Woerterbuchs. */
const ABLAUF: IconName[] = ["kompass", "lupe", "stufen"];

const EASE = [0.32, 0.72, 0, 1] as const;

function Ablauf({ w }: { w: B["ablauf"] }) {
  const reduce = useReducedMotion();

  return (
    <section className="ground relative py-20 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={w.eyebrow}
          size="compact"
          title={
            <>
              {w.titelVor}
              <span className="text-gradient">{w.titelEm}</span>
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
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
          />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {w.schritte.map((a, i) => (
              <motion.div
                key={a.schritt}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.16, ease: EASE }}
                className="relative flex flex-col"
              >
                <span className="relative z-10 grid h-[4.1rem] w-[4.1rem] place-items-center rounded-[1.3rem] bg-navy text-brand-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_0_6px_rgba(244,248,251,1)]">
                  <Icon name={ABLAUF[i]} className="h-8 w-8" />
                </span>
                <span className="mt-6 text-label font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {a.schritt}
                </span>
                <span className="mt-2 text-[1.15rem] font-bold leading-snug text-ink md:text-[1.25rem]">
                  {a.titel}
                </span>
                <p className="mt-2.5 text-small leading-relaxed text-ink-muted">{a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Die uebrige Copy dieser Seite ist noch nicht im Woerterbuch. Die
   Stimmen-Sektion teilt sie mit der Startseite, deshalb kommt sie hier schon
   von aussen herein. */
export function BookingBody({
  w,
  stimmen,
  stimmenListe,
}: {
  w: B;
  stimmen: Woerterbuch["start"]["stimmen"];
  stimmenListe: Testimonial[];
}) {
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
              <Pille>{w.kopf.eyebrow}</Pille>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-6 max-w-xl text-balance text-[1.95rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:mx-0">
                {w.kopf.titelVor}
                <span className="text-gradient">{w.kopf.titelEm}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-muted lg:mx-0">
                {w.kopf.lead}
              </p>
            </Reveal>

            {/* Was im ersten Gespraech passiert. Vorher stand hier, dass wir
                vorab in Listings und Kampagnen schauen und 45 Minuten den
                Bildschirm teilen: so laeuft es nicht. Das erste Gespraech
                dauert 30 Minuten und dient dem Kennenlernen, die
                vorbereitete Auswertung kommt im zweiten Termin. */}
            <Reveal delay={0.16}>
              <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left lg:mx-0">
                {w.kopf.punkte.map((t) => (
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
                  {w.kopf.knopf}
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
                /* Derselbe orange Grund wie im Abschluss-CTA. Clemens steht
                   auf jeder Seite vor derselben Flaeche. */
                style={{
                  background:
                    "radial-gradient(95% 62% at 50% 14%, #FFC77E 0%, rgba(255,199,126,0) 62%), linear-gradient(168deg, #FFA51F 0%, #FF8A00 46%, #E06A00 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), 0 30px 70px -40px rgba(122,52,0,0.75)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/clemens-frei.webp"
                  alt={w.kopf.portraetAlt}
                  width={900}
                  height={855}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto max-w-none object-contain object-bottom"
                  style={{ filter: "drop-shadow(0 22px 40px rgba(122,52,0,0.5))" }}
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
                <div className="mt-2 text-[1rem] font-bold text-ink">{w.kopf.portraetName}</div>
                <div className="mt-0.5 text-small text-ink-muted">{w.kopf.portraetRolle}</div>
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
            {w.zahlen.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 0.07}
                className={i === 0 ? "sm:pr-8" : i === w.zahlen.length - 1 ? "sm:pl-8" : "sm:px-8"}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0">
                    <ZahlText
                      text={m.wert}
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
                        d={i === RUNTER ? "M18 6L6 18m0 0h7m-7 0v-7" : "M6 18L18 6m0 0h-7m7 0v7"}
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

      <Ablauf w={w.ablauf} />

      {/* Passt / Passt nicht */}
      <section className="ground-tint relative py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={w.passt.eyebrow}
            size="compact"
            title={
              <>
                {w.passt.titelVor}
                <span className="text-gradient">{w.passt.titelEm}</span>
              </>
            }
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Reveal>
              <div className="surface flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "#16A34A1A", color: "#16A34A", boxShadow: "0 0 12px -1px #16A34A66" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-base font-bold text-ink">{w.passt.jaLabel}</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {w.passt.ja.map((p) => (
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
                  <span className="text-base font-bold text-ink">{w.passt.neinLabel}</span>
                </div>
                <ul className="mt-5 space-y-3">
                  {w.passt.nein.map((p) => (
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
            eyebrow={w.kalender.eyebrow}
            size="compact"
            title={
              <>
                {w.kalender.titelVor}
                <span className="text-gradient">{w.kalender.titelEm}</span>
              </>
            }
            description={w.kalender.lead}
          />
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] bg-white p-4 shadow-[0_40px_90px_-40px_rgba(2,48,71,0.4)] ring-1 ring-black/[0.06] md:p-6">
              <CalEmbed w={w.cal} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Der Fahrplan steht unter dem Kalender und ueber den Stimmen: wer sich
          gerade einen Termin sucht, liest direkt danach, was nach dem Start
          passiert. */}
      <Fahrplan w={w.fahrplan} />

      <Stimmen w={stimmen} liste={stimmenListe} />

      {/* FAQ */}
      <section className="ground-tint relative py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="FAQ"
            size="compact"
            title={
              <>
                {w.faqTitelVor}
                <span className="text-gradient">{w.faqTitelEm}</span>
              </>
            }
          />
          <BookingFAQ faq={w.faq} />
        </div>
      </section>

      {/* Abschluss: zurueck nach oben zum Kalender. Dasselbe dunkle Podest wie
          die uebrigen Abschluss-Sektionen, nicht mehr die orange Flaeche. */}
      <section className="on-dark ground-deep relative overflow-hidden py-20 text-center md:py-28">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />
        <div className="container-x relative">
          <Reveal>
            <h2 className="title mx-auto max-w-[24ch] text-balance text-[clamp(1.9rem,1.3rem+1.7vw,2.9rem)] text-white">
              {w.abschluss.titel}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-[50ch] text-pretty text-lead text-chalk-muted">
              {w.abschluss.lead}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-9 flex justify-center">
              <a href="#kalender" className="btn-on-dark">
                {w.abschluss.knopf}
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
