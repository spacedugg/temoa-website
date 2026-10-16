"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { KachelVerlaufDefs, Piktogramm, type PiktogrammName } from "./Piktogramme";

/* ============================================================
   Bausteine der Leistungsseiten FBA, Katalog, Reporting, Compliance.

   Die ersten Fassungen dieser Seiten lasen sich wie Blogbeitraege: ein
   Einstieg aus drei Absaetzen, vier lange Karten, ein Absatz zur
   Abgrenzung. Jede Sektion war eine Mini-Abhandlung. Diese drei Bausteine
   ersetzen sie:

   - `Erklaert`: ein Satz Lead und die Fachbegriffe als Kacheln. Wer den
     Begriff kennt, ueberspringt die Kachel, wer ihn nicht kennt, hat die
     Erklaerung im Blick und nicht in einem Absatz.
   - `Schwerpunkte`: die Leistungen als Reiter. Ein Reiter zeigt einen Satz
     und drei Punkte; auf dem Telefon klappt dasselbe als Liste auf.
   - `Grenzen`: zwei Platten statt eines Absatzes, links was wir tun, rechts
     was bei euch oder Dritten liegt.
   ============================================================ */

const Haken = () => (
  <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-white">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  </span>
);

/* ---------------- Kurz erklaert ---------------- */

export function Erklaert({
  eyebrow,
  title,
  lead,
  begriffe,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  begriffe: { begriff: string; text: string }[];
}) {
  return (
    <section className="relative isolate ground py-16 md:py-20">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <Reveal>
              <Pille>{eyebrow}</Pille>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-[24ch] text-balance text-[clamp(1.75rem,1.2rem+1.5vw,2.6rem)] font-bold leading-tight tracking-tight text-ink">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[48ch] text-pretty text-lead text-ink-muted">{lead}</p>
            </Reveal>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {begriffe.map((b, i) => (
              <Reveal key={b.begriff} delay={0.05 + i * 0.05}>
                <div className="panel h-full p-5 md:p-6">
                  <dt className="flex items-center gap-2.5 text-[1.05rem] font-bold text-ink">
                    <span aria-hidden className="node-glow shrink-0" />
                    {b.begriff}
                  </dt>
                  <dd className="mt-2.5 text-small leading-relaxed text-ink-muted">{b.text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Schwerpunkte als Reiter ---------------- */

type Karte = { titel: string; unterzeile: string; text: string; punkte: string[] };

export function Schwerpunkte({
  eyebrow,
  title,
  description,
  karten,
  zeichen,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  karten: Karte[];
  zeichen: PiktogrammName[];
}) {
  const [aktiv, setAktiv] = useState(0);
  const basis = useId();
  const n = karten.length;

  /* Pfeiltasten wechseln den Reiter. Die Schaltflaechen sind ein Akkordeon
     (`aria-expanded`), kein Tablist: Schaltflaechen und Inhalte stehen im
     selben Raster, weil auf dem Telefon der Inhalt unter seiner Schaltflaeche
     aufklappt. Alles steht im HTML, auch der Inhalt der geschlossenen. */
  const taste = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const weiter = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!weiter) return;
    e.preventDefault();
    const ziel = (i + weiter + n) % n;
    setAktiv(ziel);
    document.getElementById(`${basis}-${ziel}`)?.focus();
  };

  return (
    <section className="relative isolate ground-tint py-16 md:py-24">
      <KachelVerlaufDefs />
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
        <div className="mx-auto mt-10 grid max-w-6xl gap-3 md:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-8 lg:gap-y-3">
          {karten.map((k, i) => {
            const an = aktiv === i;
            const id = `${basis}-${i}`;
            return (
              <div key={k.titel} className="contents">
                <button
                  id={id}
                  type="button"
                  aria-expanded={an}
                  aria-controls={`${id}-inhalt`}
                  onClick={() => setAktiv(i)}
                  onKeyDown={(e) => taste(e, i)}
                  style={{ "--i": i + 1 } as React.CSSProperties}
                  className={`group relative flex w-full items-center gap-4 rounded-[1.25rem] p-4 text-left transition-all duration-300 lg:col-start-1 lg:[grid-row-start:var(--i)] ${
                    an
                      ? "bg-navy text-white shadow-[0_18px_40px_-18px_rgba(2,48,71,0.6)]"
                      : "panel hover:-translate-y-0.5"
                  }`}
                >
                  <motion.span
                    className="inline-flex h-12 w-12 shrink-0"
                    initial="ruhe"
                    animate={an ? "zeig" : "an"}
                  >
                    <Piktogramm name={zeichen[i]} />
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] font-bold leading-snug">{k.titel}</span>
                    <span className={`mt-0.5 block text-small ${an ? "text-white/70" : "text-ink-faint"}`}>
                      {k.unterzeile}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`ml-auto hidden h-2 w-2 shrink-0 rounded-full lg:block ${an ? "node-glow" : "bg-navy/15"}`}
                  />
                </button>

                <div
                  id={`${id}-inhalt`}
                  hidden={!an}
                  style={{ "--ende": n + 1 } as React.CSSProperties}
                  className="lg:col-start-2 lg:row-start-1 lg:[grid-row-end:var(--ende)]"
                >
                  <motion.div
                    key={String(an)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.24, 1] }}
                    className="panel mb-1 p-6 md:p-9 lg:h-full lg:p-10"
                  >
                    <h3 className="text-[1.4rem] font-bold leading-snug text-ink md:text-[1.6rem]">{k.titel}</h3>
                    <p className="mt-3 max-w-[52ch] text-pretty text-base leading-relaxed text-ink-muted md:text-[1.05rem]">
                      {k.text}
                    </p>
                    <ul className="mt-6 space-y-3.5">
                      {k.punkte.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[0.98rem] font-medium leading-snug text-ink">
                          <Haken />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Grenzen ---------------- */

export function Grenzen({
  eyebrow,
  title,
  ja,
  nein,
  link,
  tone = "white",
}: {
  eyebrow: string;
  title: string;
  ja: { titel: string; punkte: string[] };
  nein: { titel: string; punkte: string[] };
  link?: { text: string; href: string };
  tone?: "white" | "blue";
}) {
  return (
    <section className={`relative isolate py-16 md:py-20 ${tone === "white" ? "ground" : "ground-tint"}`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          <Reveal>
            <div className="panel h-full p-6 md:p-8" style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,153,0,0.55), 0 18px 40px -22px rgba(2,48,71,0.35)" }}>
              <h3 className="text-[1.2rem] font-bold text-ink">{ja.titel}</h3>
              <ul className="mt-5 space-y-3.5">
                {ja.punkte.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.98rem] font-medium leading-snug text-ink">
                    <Haken />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[1.75rem] border border-dashed border-navy/25 bg-white/40 p-6 md:p-8">
              <h3 className="text-[1.2rem] font-bold text-ink-soft">{nein.titel}</h3>
              <ul className="mt-5 space-y-3.5">
                {nein.punkte.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.98rem] leading-snug text-ink-muted">
                    <span aria-hidden className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full bg-navy/30" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        {link && (
          <Reveal delay={0.12}>
            <p className="mt-8 text-center">
              <a href={link.href} className="btn-text">
                {link.text}
              </a>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
