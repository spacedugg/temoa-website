"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";

const metrics = [
  { value: 50, prefix: "+", suffix: " %", label: "Conversion" },
  { value: 52, prefix: "+", suffix: " %", label: "Klickrate" },
  { value: 80, suffix: " %", label: "organisch" },
];

export function OrganicFirst() {
  return (
    <section className="relative py-10 md:py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 shadow-lift md:px-16 md:py-24">
          {/* glows */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -left-20 top-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(98,88,247,0.5), transparent 60%)" }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-20 bottom-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 60%)" }}
              animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Unser Prinzip
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                  Organic First.
                  <br />
                  <span className="bg-gradient-to-r from-brand-300 via-violet-soft to-cyan bg-clip-text text-transparent">
                    PPC Second.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">
                  Viele Marken starten mit Ads. Wir bauen zuerst das Fundament, das Werbung
                  überhaupt profitabel macht.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-md leading-relaxed text-white/55">
                  Erst wenn euer Listing nachweislich konvertiert, drehen wir den Traffic auf –
                  jeder Klick trifft dann auf ein Listing, das verkauft.
                </p>
              </Reveal>
            </div>

            {/* Stacked foundation visual */}
            <div className="space-y-4">
              {metrics.map((m, i) => (
                <Reveal key={m.label} delay={0.1 + i * 0.1} direction="left">
                  <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                    <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/70">{m.label}</div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(m.value, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-cyan"
                        />
                      </div>
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
