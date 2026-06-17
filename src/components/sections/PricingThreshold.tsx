"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";

export function PricingThreshold({ from }: { from?: string | null }) {
  return (
    <section className="relative py-12 md:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center shadow-lift md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.5), transparent 60%)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <Reveal>
            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Investition
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            {from ? (
              <h2 className="relative mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ab{" "}
                <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-violet-soft bg-clip-text text-transparent">
                  {from}
                </span>{" "}
                / Monat
              </h2>
            ) : (
              <h2 className="relative mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-violet-soft bg-clip-text text-transparent">
                  Individuelles
                </span>{" "}
                Angebot
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              Der finale Preis hängt von Sortiment, Marktplätzen und Zielen ab. Im Gespräch nennen wir
              euch eine klare Zahl für euer Setup – vorher wäre jede Angabe unseriös.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="/gespraech-vereinbaren"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-4 text-sm font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Individuelles Angebot anfragen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
