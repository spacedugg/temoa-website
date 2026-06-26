"use client";

import { motion } from "framer-motion";
import { Aurora } from "../ui/Aurora";
import { TiltCard } from "../ui/TiltCard";
import { GlassCard, IconChip, Chip } from "../ui/MockKit";
import { AreaChart } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-brand-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <Aurora className="opacity-70" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          {/* Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Amazon Full Service Wachstumspartner
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: "easeOut" }}
              className="mt-5 text-[2rem] font-extrabold leading-[1.07] tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Amazon-Wachstum ist keine Frage des{" "}
              <span className="text-gradient">Werbebudgets.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: "easeOut" }}
              className="mt-5 max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
            >
              Wir machen euer Listing organisch so stark, dass es auch ohne Werbung
              verkauft. Erst dann kommt PPC dazu und arbeitet vom ersten Euro an
              profitabel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="/gespraech-vereinbaren" className="btn-primary">
                Potenzialanalyse buchen
              </a>
              <a href="/ergebnisse" className="btn-ghost">
                Case Studies ansehen
              </a>
            </motion.div>
          </div>

          {/* Interactive growth module */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="perspective"
          >
            <div className="relative">
              <div
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 60% 35%, rgba(255,153,0,0.30), rgba(255,49,49,0.14) 46%, transparent 72%)",
                }}
              />
              <TiltCard className="group" intensity={7}>
                <GlassCard className="p-5 md:p-6">
                  {/* listing header */}
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-canvas-alt to-white shadow-inner ring-1 ring-black/5" />
                    <div className="min-w-0 flex-1">
                      <div className="h-2.5 w-3/4 rounded-full bg-ink/15" />
                      <div className="mt-2 flex items-center gap-1.5">
                        <Stars />
                        <span className="text-[11px] font-medium text-ink-faint">4,8</span>
                      </div>
                    </div>
                    <span className="rounded-md bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Buy Box
                    </span>
                  </div>

                  {/* growth chart */}
                  <div className="mt-5 rounded-2xl border border-black/[0.05] bg-white/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-muted">
                        Organische Sichtbarkeit
                      </span>
                      <span className="eyebrow text-[10px]">
                        <span className="h-1 w-1 rounded-full bg-brand-500" />
                        Organic First
                      </span>
                    </div>
                    <AreaChart className="mt-3 h-24 w-full" />
                  </div>

                  {/* KPI row */}
                  <div className="mt-4 flex items-end justify-between rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-3.5">
                    <div>
                      <div className="text-2xl font-extrabold tracking-tight text-ink">
                        <Counter to={30} prefix="Ø +" suffix=" %" />
                      </div>
                      <p className="mt-0.5 text-[11px] font-medium text-ink-muted">
                        Profitabilität
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <span className="rounded-full bg-white px-2 py-1 text-brand-600 shadow-soft">
                        CTR ↑
                      </span>
                      <span className="rounded-full bg-white px-2 py-1 text-brand-600 shadow-soft">
                        CVR ↑
                      </span>
                      <span className="rounded-full bg-white px-2 py-1 text-red shadow-soft">
                        TACoS ↓
                      </span>
                    </div>
                  </div>
                </GlassCard>

                <IconChip className="absolute -left-5 top-14 text-brand-600">{Chip.bolt}</IconChip>
                <IconChip className="absolute -right-4 bottom-24">{Chip.star}</IconChip>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
