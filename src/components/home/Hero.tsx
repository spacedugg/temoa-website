"use client";

import { motion } from "framer-motion";
import { Aurora } from "../ui/Aurora";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <Aurora className="opacity-70" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
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
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Amazon-Wachstum ist keine Frage des{" "}
              <span className="text-gradient">Werbebudgets.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              Wir machen euer Listing organisch so stark, dass es auch ohne Werbung
              verkauft. Erst dann kommt PPC dazu und arbeitet vom ersten Euro an
              profitabel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="/gespraech-vereinbaren" className="btn-primary">
                Potenzialanalyse buchen
              </a>
              <a href="/ergebnisse" className="btn-ghost">
                Case Studies ansehen
              </a>
            </motion.div>
          </div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle at 60% 40%, rgba(255,153,0,0.25), rgba(255,49,49,0.12) 45%, transparent 70%)" }}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="card flex aspect-[4/5] w-full items-center justify-center p-6"
            >
              <PlaceholderLabel label="Hero-Bild" note="liefert Kunde" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlaceholderLabel({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-canvas-alt/60 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">{label}</span>
      {note && <span className="mt-1 text-xs text-ink-faint">{note}</span>}
    </div>
  );
}
