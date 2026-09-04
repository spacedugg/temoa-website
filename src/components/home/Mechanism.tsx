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
    temoa: "Hauptbild, Titel und A+ nachgeschärft, bis die Conversion steht",
  },
  {
    old: "Content nach Standard, ohne Datenbasis",
    temoa: "Content aus Search Query Report, Wettbewerb und Bewertungen",
  },
  {
    old: "Sichtbarkeit wird über Gebote gekauft, der Klickpreis steigt jedes Jahr",
    temoa: "Organische Plätze halten die Sichtbarkeit, Werbung kommt dazu",
  },
  {
    old: "Umsatz um jeden Preis",
    temoa: "Jede SKU auf Deckungsbeitrag gerechnet, gesteuert über den TACoS",
  },
];

function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center text-white/30 md:px-1">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="rotate-90">
        <path d="M4 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Mechanism() {
  return (
    <section className="section-y relative isolate bg-white">
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
              Klickrate und Conversion bestimmen, wo Amazon euer Produkt zeigt. Deshalb kommt bei uns zuerst
              das Listing, dann die Kampagne.
            </p>
          </Reveal>
        </div>

        {/* Split: mechanism card left, image right */}
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={0.12}>
            <div
              className="on-dark relative h-full overflow-hidden rounded-panel p-7 shadow-panel md:p-8"
              style={{ background: "linear-gradient(150deg,#0A1E2B 25%,#053048 100%)" }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(255,153,0,0.35), transparent 70%)" }}
              />
              <div className="relative flex flex-col gap-3">
                {stages.map((s, i) => (
                  <RevealItemless key={s.name} delay={0.15 + i * 0.08}>
                    <div className="relative rounded-inner bg-white/[0.07] p-4 ring-1 ring-white/10">
                      {s.signal && (
                        <span
                          className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow"
                          style={{ backgroundImage: "var(--brand-gradient-deep)" }}
                        >
                          Ranking-Signal
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-white">
                          <Icon name={s.icon} size={26} />
                        </span>
                        <div>
                          <div className="text-base font-bold text-white">{s.name}</div>
                          <div className="text-sm leading-snug text-white/65">{s.meaning}</div>
                        </div>
                      </div>
                    </div>
                  </RevealItemless>
                ))}

                <Connector />

                {/* outcome */}
                <Reveal delay={0.4}>
                  <div
                    className="rounded-inner p-4 text-white shadow-lift"
                    style={{ backgroundImage: "var(--brand-gradient-deep)" }}
                  >
                    <div className="text-sm font-bold uppercase tracking-[0.12em] text-white/85">Ergebnis</div>
                    <div className="mt-1 text-lg font-extrabold leading-tight">Das Listing verkauft ohne Werbung.</div>
                    <div className="mt-0.5 text-sm text-white/90">Kampagnen bauen darauf auf.</div>
                  </div>
                </Reveal>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-white/75">
                Konkret sind das neues Hauptbild, neue Listingbilder, Titel, Bullets, Backend-Felder und A+ Content.
                Einmal erstellt reicht nicht, die Zahlen bestimmen die Nacharbeit.
              </p>
            </div>
          </Reveal>

          {/* square image placeholder, same height as the card */}
          <Reveal direction="left" delay={0.16} className="flex items-center">
            <div
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-panel bg-canvas-tint/70"
            >
              <span className="text-label font-semibold uppercase text-ink-line">Bild folgt</span>
            </div>
          </Reveal>
        </div>

        {/* Alt / Neu comparison */}
        <Reveal delay={0.1}>
          <div className="glass mx-auto mt-10 max-w-5xl overflow-hidden rounded-panel">
            <div className="grid grid-cols-2 border-b border-black/[0.06]">
              <div className="px-5 py-4">
                <span className="text-label font-semibold uppercase text-ink-faint">Wie es jetzt läuft</span>
              </div>
              <div className="flex items-center gap-2 border-l border-black/[0.06] bg-brand-50/50 px-5 py-4">
                <Logo className="h-4 w-auto" />
                <span className="text-label font-semibold uppercase text-brand-800">arbeitet</span>
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
    >
      {children}
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(27,127,75,0.10)", color: "#1B7F4B" }}
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
      style={{ background: "rgba(192,40,30,0.10)", color: "#C0281E" }}
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
