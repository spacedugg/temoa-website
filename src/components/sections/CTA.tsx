"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";

const steps = [
  { n: "1", title: "Kurzer Input von euch", body: "Ein paar Fragen zu Sortiment, Marktplätzen und Zielen." },
  { n: "2", title: "Wir bereiten vor", body: "Erste Beobachtungen und konkrete Maßnahmen-Ideen für eure Marke." },
  { n: "3", title: "Im Call", body: "Marktplatz-Potenzial und die nächsten konkreten Schritte." },
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
                  Lasst uns über euer{" "}
                  <span className="bg-gradient-to-r from-brand-300 via-violet-soft to-cyan bg-clip-text text-transparent">
                    Marktplatz-Potenzial
                  </span>{" "}
                  sprechen.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                  30 Minuten, kostenfrei, direkt mit Clemens. Wir schauen uns euer Konto, eure
                  Marge und eure größten Hebel an – und sagen ehrlich, ob wir helfen können.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/gespraech-vereinbaren"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Gespräch vereinbaren
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <span className="text-sm text-white/50">Kostenlos & unverbindlich · quartalsweise kündbar, keine Knebelverträge</span>
                </div>
              </Reveal>
            </div>

            {/* steps */}
            <div className="space-y-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={0.1 + i * 0.1} direction="left">
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-cyan text-sm font-bold text-white">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{s.body}</p>
                    </div>
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
