"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const flow = ["Sichtbarkeit", "Klickrate", "Conversion"];

const rows: { old: string; temoa: string }[] = [
  {
    old: "Bilder, Texte und Titel einmal erstellt, dann läuft Werbung",
    temoa: "Listing auf CTR und Conversion optimiert, bis es organisch verkauft",
  },
  {
    old: "Content nach Standard, ohne Datenbasis",
    temoa: "Content aus Search Query Report, Wettbewerb und Bewertungen",
  },
  {
    old: "Abhängig von PPC, Klicks werden jährlich teurer",
    temoa: "Organisch unabhängig, PPC profitabel statt teuer",
  },
  {
    old: "Umsatz um jeden Preis",
    temoa: "Profitabilität als Maßstab (TACoS)",
  },
];

export function Mechanism() {
  return (
    <section className="relative isolate bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="text-center md:text-left">
            <SectionHeading
              eyebrow="Unser Ansatz"
              size="compact"
              title={
                <>
                  Organic First, <span className="text-gradient">PPC Second.</span>
                </>
              }
            />
            <Reveal delay={0.12}>
              <p className="mx-auto mt-4 max-w-md text-balance text-base leading-relaxed text-ink-muted md:mx-0">
                Zuerst ein Listing, das auf Klickrate und Conversion verkauft, die
                wichtigsten Ranking-Signale. Erst dann skaliert PPC profitabel,
                gesteuert über euren TACoS.
              </p>
            </Reveal>

            {/* Funnel flow */}
            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                {flow.map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.05]">
                      {step}
                    </span>
                    {i < flow.length - 1 && (
                      <svg width="18" height="12" viewBox="0 0 20 14" fill="none" className="text-brand-500">
                        <path d="M2 7h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Spiral callout */}
            <Reveal delay={0.24}>
              <div className="mx-auto mt-6 flex max-w-md items-start gap-3 rounded-2xl border border-brand-100 bg-white/70 px-4 py-3.5 text-left shadow-soft backdrop-blur md:mx-0">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-red text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                    <path d="M21 4v4h-4" />
                  </svg>
                </span>
                <p className="text-balance text-sm font-medium leading-snug text-ink">
                  Wer Wachstum nur über Werbung kauft, bleibt abhängig: Klicks teurer,
                  Margen enger. Wir drehen die Spirale um.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Alt / Neu comparison, liquid glass */}
          <Reveal direction="left" delay={0.1}>
            <div className="glass overflow-hidden rounded-3xl">
              <div className="grid grid-cols-2 border-b border-black/[0.06]">
                <div className="px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Wie es jetzt läuft
                  </span>
                </div>
                <div className="border-l border-black/[0.06] bg-brand-50/50 px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Wie temoa arbeitet
                  </span>
                </div>
              </div>

              <RevealGroup className="divide-y divide-black/[0.05]" stagger={0.08}>
                {rows.map((r) => (
                  <RevealItem key={r.temoa}>
                    <div className="grid grid-cols-2">
                      <div className="flex items-start gap-2.5 px-5 py-4">
                        <CrossIcon />
                        <p className="text-sm leading-snug text-ink-muted">{r.old}</p>
                      </div>
                      <div className="flex items-start gap-2.5 border-l border-black/[0.06] bg-brand-50/30 px-5 py-4">
                        <CheckIcon />
                        <p className="text-sm font-medium leading-snug text-ink">{r.temoa}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
      style={{ backgroundImage: "var(--brand-gradient)" }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );
}

function CrossIcon() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-ink-faint">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
