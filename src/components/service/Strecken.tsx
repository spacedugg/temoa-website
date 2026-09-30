"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { SectionHeading, Pille } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { KachelVerlaufDefs, Piktogramm, type PiktogrammName } from "./Piktogramme";

/* ============================================================
   Drei Sektionsformen fuer die Account-Seite.

   Dort folgten vier Sektionen mit demselben Aufbau aufeinander: Bezeichnung,
   Ueberschrift, weisse Kacheln im Raster. Inhalt und Icons waren verschieden,
   die Form nicht, und nichts war gezeichnet. Diese drei Formen sind die
   Antwort darauf:

   - `Ablauf`: eine Folge, bei der ein Schritt aus dem anderen folgt. Die
     Schritte sitzen auf einer leuchtenden Verbindung. Hell auf einer Platte
     oder dunkel direkt auf dem Podest.
   - `Spalten`: drei Pflichten nebeneinander in einer einzigen Platte, mit
     feinen Trennern, statt drei einzelner Kacheln.
   - `BildKarten`: links Kopf und Bild, rechts die Karten.
   ============================================================ */

type Schritt = {
  piktogramm: PiktogrammName;
  titel: string;
  unterzeile?: string;
  text: string;
};

const GRUEN = "#6EE7A0";

/* ---------------- Ablauf ---------------- */

export function Ablauf({
  eyebrow,
  title,
  description,
  schritte,
  dunkel = false,
  endeGruen = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  schritte: Schritt[];
  /** Dunkles Podest statt heller Platte. */
  dunkel?: boolean;
  /** Der letzte Schritt ist das Ergebnis und traegt Gruen. */
  endeGruen?: boolean;
}) {
  const n = schritte.length;
  /* Die Piktogramme stehen links in ihrer Spalte. Die Verbindung laeuft
     deshalb von der Mitte des ersten bis zur Mitte des letzten Piktogramms
     (Kachel 56 Pixel, Mitte bei 28). Die Spaltenabstaende verschieben das
     Ende um wenige Pixel, das Ende liegt hinter der Kachel. */
  const linie: CSSProperties = {
    left: 28,
    right: `calc(${100 / n}% - 28px)`,
    top: 27,
    height: 2,
    background: "linear-gradient(90deg, rgba(255,153,0,0.35), #ff9900 50%, rgba(255,153,0,0.35))",
    boxShadow: "0 0 12px rgba(255,153,0,0.7)",
  };

  const inhalt = (
    <div className="relative">
      <span aria-hidden className="absolute hidden md:block" style={linie} />
      <span aria-hidden className="link-glow-v absolute bottom-7 left-[27px] top-7 md:hidden" />
      <div className={`relative grid gap-9 md:gap-6 ${n === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {schritte.map((s, i) => {
            const ende = endeGruen && i === n - 1;
            return (
              <Reveal key={s.titel} delay={i * 0.07}>
                <motion.div
                  className="relative z-10 flex gap-5 md:flex-col md:gap-0"
                  initial="ruhe"
                  whileInView="an"
                  whileHover="zeig"
                  viewport={{ once: true, margin: "-10% 0px" }}
                >
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 rounded-[14px] ${dunkel ? "ring-1 ring-white/20" : ""}`}
                    style={ende ? { boxShadow: `0 0 0 3px ${GRUEN}, 0 10px 24px -10px ${GRUEN}` } : undefined}
                  >
                    <Piktogramm name={s.piktogramm} />
                  </span>
                  <div className="min-w-0 md:mt-6">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="schritt schritt-orange !h-7 !w-7 !text-[0.8rem]"
                        style={ende ? { boxShadow: `0 0 0 3px ${GRUEN}` } : undefined}
                      >
                        {i + 1}
                      </span>
                      <h3
                        className={`text-[1.12rem] font-bold leading-snug md:text-[1.2rem] ${
                          dunkel ? "text-white" : "text-ink"
                        }`}
                      >
                        {s.titel}
                      </h3>
                    </div>
                    {s.unterzeile && (
                      <p className={`mt-2 text-small font-medium ${dunkel ? "text-white/60" : "text-ink-faint"}`}>
                        {s.unterzeile}
                      </p>
                    )}
                    <p className={`mt-3 text-small leading-relaxed ${dunkel ? "text-white/80" : "text-ink-muted"}`}>
                      {s.text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
      </div>
    </div>
  );

  return (
    <section
      className={`relative isolate py-20 md:py-24 ${dunkel ? "on-dark ground-deep overflow-hidden" : "ground"}`}
    >
      <KachelVerlaufDefs />
      {dunkel && <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500" />}
      <div className="container-x">
        {dunkel ? (
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>{eyebrow && <Pille>{eyebrow}</Pille>}</Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">{title}</h2>
            </Reveal>
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-3 text-base leading-relaxed text-white/75">{description}</p>
              </Reveal>
            )}
          </div>
        ) : (
          <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
        )}
        <Reveal delay={0.1} className="mt-12">
          {dunkel ? inhalt : <div className="panel p-6 md:p-10">{inhalt}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Spalten ---------------- */

export function Spalten({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Schritt[];
}) {
  const liste = items;
  return (
    <section className="relative isolate ground-tint py-20 md:py-24">
      <KachelVerlaufDefs />
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} size="compact" title={title} description={description} />
        <Reveal delay={0.1} className="mt-12">
          <div className="panel grid divide-y divide-navy/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {liste.map((s) => (
              <motion.div
                key={s.titel}
                className="flex flex-col p-7 md:p-9"
                initial="ruhe"
                whileInView="an"
                whileHover="zeig"
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                <span className="inline-flex">
                  <Piktogramm name={s.piktogramm} />
                </span>
                <h3 className="mt-6 text-[1.35rem] font-bold leading-snug text-ink">{s.titel}</h3>
                {s.unterzeile && <p className="mt-1.5 text-small font-medium text-ink-faint">{s.unterzeile}</p>}
                <p className="mt-4 text-small leading-relaxed text-ink-muted">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Bild und Karten ---------------- */

export function BildKarten({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  items,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  items: Schritt[];
}) {
  return (
    <section className="relative isolate ground-tint py-20 md:py-24">
      <KachelVerlaufDefs />
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              size="compact"
              align="left"
              title={title}
              description={description}
              className="md:mx-0"
            />
            <Reveal direction="left" delay={0.1}>
              <div className="relative mx-auto mt-8 max-w-sm lg:mx-0 lg:max-w-none">
                <span aria-hidden className="halo left-[14%] top-[16%] h-3/4 w-3/4" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={imageAlt} loading="lazy" className="relative w-full" />
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((s, i) => (
              <Reveal key={s.titel} delay={i * 0.05}>
                <motion.div
                  className="panel panel-lift flex h-full flex-col p-6 md:p-7"
                  initial="ruhe"
                  whileInView="an"
                  whileHover="zeig"
                  viewport={{ once: true, margin: "-10% 0px" }}
                >
                  <span className="mb-5 inline-flex">
                    <Piktogramm name={s.piktogramm} />
                  </span>
                  <h3 className="text-balance text-[1.15rem] font-bold leading-snug text-ink md:text-[1.25rem]">
                    {s.titel}
                  </h3>
                  {s.unterzeile && <p className="mt-1.5 text-small font-medium text-ink-faint">{s.unterzeile}</p>}
                  <p className="mt-3 text-small leading-relaxed text-ink-muted">{s.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
