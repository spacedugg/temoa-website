"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";

const stages = [
  { n: "01", label: "Listing, das überzeugt", angle: -90 },
  { n: "02", label: "Mehr Klicks kaufen", angle: 0 },
  { n: "03", label: "Amazon rankt euch hoch", angle: 90 },
  { n: "04", label: "Verkäufe ohne Adspend", angle: 180 },
];

function Flywheel() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* rotating dashed ring */}
      <motion.div
        className="absolute inset-[14%] rounded-full border border-dashed border-white/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[14%] rounded-full"
        style={{ background: "conic-gradient(from 0deg, rgba(255,153,0,0.35), rgba(255,49,49,0.12), transparent 55%, rgba(255,153,0,0.35))" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* center */}
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-center backdrop-blur-sm">
        <span className="bg-gradient-to-r from-brand-300 to-violet-soft bg-clip-text text-base font-extrabold text-transparent">
          Organic
        </span>
        <span className="text-base font-extrabold text-white">First</span>
      </div>

      {/* stage nodes */}
      {stages.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 43;
        const y = 50 + Math.sin(rad) * 43;
        return (
          <motion.div
            key={s.n}
            className="absolute w-32 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i + 0.2, type: "spring", stiffness: 220, damping: 18 }}
          >
            <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-3 text-center backdrop-blur-sm">
              <span className="text-xs font-bold text-brand-300">{s.n}</span>
              <p className="mt-0.5 text-[13px] font-semibold leading-tight text-white">{s.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function OrganicFirst() {
  return (
    <section className="relative py-10 md:py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 shadow-lift md:px-16 md:py-24">
          {/* glows */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -left-20 top-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.5), transparent 60%)" }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-20 bottom-0 h-96 w-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,49,49,0.4), transparent 60%)" }}
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
                  Unsere Reihenfolge
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
                  Die meisten drehen sofort am Ad-Budget. Wir bauen erst das Fundament, das jeden
                  Werbe-Euro überhaupt rentabel macht.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-md leading-relaxed text-white/55">
                  Erst wenn das Listing messbar verkauft, öffnen wir den Traffic-Hahn – dann landet
                  jeder Klick auf einer Seite, die konvertiert. So trägt der organische Umsatz das
                  Geschäft, und Sponsored Ads beschleunigen, statt es am Leben zu halten.
                </p>
              </Reveal>
            </div>

            {/* Flywheel visual */}
            <Reveal direction="left">
              <Flywheel />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
