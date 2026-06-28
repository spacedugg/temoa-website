"use client";

import { motion } from "framer-motion";
import { Ambient } from "../ui/Ambient";
import { Logo } from "../Logo";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";

const stages: { name: string; meaning: string; icon: IconName; signal?: boolean }[] = [
  { name: "Sichtbarkeit", meaning: "im Suchergebnis gefunden werden", icon: "search" },
  { name: "Klickrate (CTR)", meaning: "der Klick auf euer Produkt", icon: "target", signal: true },
  { name: "Conversion (CVR)", meaning: "der Kauf auf der Detailseite", icon: "spark", signal: true },
];

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

function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center text-white/30 md:px-1">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="rotate-90 md:rotate-0">
        <path d="M4 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Mechanism() {
  return (
    <section className="relative isolate bg-white py-24 md:py-32">
      <Ambient />
      <div className="container-x">
        {/* Centered, high-emphasis intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Unser Ansatz
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Organic First, <span className="text-gradient">PPC Second.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">
              Zuerst ein Listing, das auf Klickrate und Conversion verkauft. Erst dann skaliert PPC profitabel.
            </p>
          </Reveal>
        </div>

        {/* Prominent dark mechanism card */}
        <Reveal delay={0.12}>
          <div
            className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] p-7 shadow-[0_40px_90px_-40px_rgba(2,48,71,0.55)] md:p-12"
            style={{ background: "linear-gradient(150deg,#0A1E2B 25%,#053048 100%)" }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,153,0,0.35), transparent 70%)" }}
            />
            <div className="relative flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {stages.map((s, i) => (
                <RevealItemless key={s.name} delay={0.15 + i * 0.08}>
                  <div className="relative flex-1 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur">
                    {s.signal && (
                      <span
                        className="absolute -top-2.5 left-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow"
                        style={{ backgroundImage: "var(--brand-gradient)" }}
                      >
                        Ranking-Signal
                      </span>
                    )}
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div className="mt-3 text-base font-bold text-white">{s.name}</div>
                    <div className="mt-1 text-sm leading-snug text-white/65">{s.meaning}</div>
                  </div>
                </RevealItemless>
              ))}

              <Connector />

              {/* outcome */}
              <Reveal delay={0.4} className="md:basis-[15rem]">
                <div
                  className="rounded-2xl p-5 text-white shadow-lift"
                  style={{ backgroundImage: "var(--brand-gradient)" }}
                >
                  <div className="text-sm font-bold uppercase tracking-[0.12em] text-white/85">Ergebnis</div>
                  <div className="mt-2 text-lg font-extrabold leading-tight">Listing verkauft organisch.</div>
                  <div className="mt-1 text-sm text-white/90">PPC skaliert profitabel obendrauf.</div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.45}>
              <p className="relative mt-7 text-center text-sm leading-relaxed text-white/75 md:text-base">
                Klickrate und Conversion entscheiden über euer organisches Ranking. Deshalb bauen wir das Listing
                zuerst darauf, bevor ein Euro in Werbung fließt.
              </p>
            </Reveal>
          </div>
        </Reveal>

        {/* Alt / Neu comparison */}
        <Reveal delay={0.1}>
          <div className="glass mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl">
            <div className="grid grid-cols-2 border-b border-black/[0.06]">
              <div className="px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">Wie es jetzt läuft</span>
              </div>
              <div className="flex items-center gap-2 border-l border-black/[0.06] bg-brand-50/50 px-5 py-4">
                <Logo className="h-4 w-auto" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">arbeitet</span>
              </div>
            </div>
            <RevealGroup className="divide-y divide-black/[0.05]" stagger={0.07}>
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
    </section>
  );
}

/* lightweight reveal wrapper that keeps the flex child sizing */
function RevealItemless({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "#16A34A1A", color: "#16A34A", boxShadow: "0 0 10px -1px #16A34A66" }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "#FF31311A", color: "#E11414", boxShadow: "0 0 10px -1px #FF313155" }}
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
