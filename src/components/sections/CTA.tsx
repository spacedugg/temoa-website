"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";

const bullets = [
  "Kostenlos und unverbindlich",
  "Konkrete Hebel statt Verkaufsshow",
  "Quartalsweise kündbar, keine Knebelverträge",
];

export function CTA() {
  return (
    <section id="kontakt" className="relative py-12 md:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 shadow-lift md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.45), transparent 60%)" }}
              animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 h-[26rem] w-[26rem] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,49,49,0.4), transparent 60%)" }}
              animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Clemens · Founder & Sales
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Lasst uns ausrechnen, was in{" "}
                  <span className="bg-gradient-to-r from-brand-300 via-violet-soft to-cyan bg-clip-text text-transparent">
                    eurem Konto
                  </span>{" "}
                  steckt.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                  30 Minuten mit Clemens. Wir schauen auf euer Konto, eure Marge und eure größten
                  Hebel – und sagen ehrlich, ob wir helfen können.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:tools@temoa.de"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Potenzial-Gespräch buchen
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <span className="text-sm text-white/50">Termin mit Clemens, Geschäftsführung</span>
                </div>
              </Reveal>
            </div>

            {/* bullets */}
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <Reveal key={b} delay={0.1 + i * 0.1} direction="left">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-cyan text-white">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="font-medium text-white/85">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
