"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
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
    <section className="glow-warm section-fade relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Unser Ansatz"
              title={
                <>
                  Organic First, <span className="text-gradient">PPC Second.</span>
                </>
              }
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                Zuerst bauen wir ein Listing, das verkauft: stark auf Klickrate und
                Conversion, die wichtigsten Signale für Amazons Ranking. Retail Ready
                heißt, aus Besuchern werden Käufer, auch ohne Werbung.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
                Wer Wachstum nur über Werbung kauft, bleibt abhängig: Klicks werden
                jedes Jahr teurer, die Margen enger. Wir drehen die Spirale um. Erst
                das organische Fundament, dann profitabel skalieren, gesteuert über
                euren TACoS. Profitabilität vor Umsatz.
              </p>
            </Reveal>

            {/* Flow visual */}
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {flow.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.05]">
                      {step}
                    </span>
                    {i < flow.length - 1 && (
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="text-brand-500">
                        <path d="M2 7h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Alt / Neu comparison */}
          <Reveal direction="left" delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-lift">
              <div className="grid grid-cols-2 border-b border-black/[0.06]">
                <div className="px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Wie es jetzt läuft
                  </span>
                </div>
                <div className="border-l border-black/[0.06] bg-brand-50/60 px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Wie temoa arbeitet
                  </span>
                </div>
              </div>

              <RevealGroup className="divide-y divide-black/[0.05]" stagger={0.08}>
                {rows.map((r) => (
                  <RevealItem key={r.temoa}>
                    <div className="grid grid-cols-2">
                      <div className="flex items-start gap-2.5 px-5 py-5">
                        <CrossIcon />
                        <p className="text-sm leading-snug text-ink-muted">{r.old}</p>
                      </div>
                      <div className="flex items-start gap-2.5 border-l border-black/[0.06] bg-brand-50/40 px-5 py-5">
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
