"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { Icon } from "../ui/Icon";

const points = [
  { icon: "search" as const, title: "Erst die Suchdaten, dann die Texte", body: "Echte Suchanfragen und Kundenfragen verraten, in welchen Worten eure Käufer wirklich suchen." },
  { icon: "spark" as const, title: "KI findet Muster, wir treffen die Wahl", body: "Search-Query-Reports und KI-Signale liefern die Hinweise – über die Maßnahme entscheidet ein Mensch mit Marktplatz-Erfahrung." },
  { icon: "target" as const, title: "Gebaut für Rufus & COSMO", body: "Listings, die die KI-Suche von Amazon versteht – nicht der Algorithmus von vorgestern." },
];

const metrics = [
  { value: 1240, label: "Suchbegriffe gescreent", suffix: "" },
  { value: 94, suffix: " %", label: "Listings KI-lesbar" },
  { value: -30, suffix: " %", label: "ACoS, mehr Marge" },
  { value: 110, prefix: "+", suffix: " %", label: "passgenaue Impressionen" },
];

export function DataAI() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Daten & KI"
              title={
                <>
                  Kein Listing wird besser als <span className="text-gradient">seine Datenbasis.</span>
                </>
              }
            />
            <div className="mt-10 space-y-6">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} direction="right">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={p.icon} size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink">{p.title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Data panel */}
          <Reveal direction="left">
            <div className="card noise relative overflow-hidden p-7">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100/70 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-ink">Suchanfragen-Auswertung</div>
                  <div className="text-xs text-ink-faint">laufend aktualisiert</div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald-deep">
                  80 % organisch
                </div>
              </div>

              {/* keyword stream */}
              <div className="relative mt-5 flex flex-wrap gap-2">
                {["unkrautvernichter", "rasenmäher akku", "hochdruckreiniger", "insektenschutz", "gartenschere", "kompostbeschleuniger", "rankhilfe"].map((k, i) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      i % 3 === 0 ? "bg-brand-50 text-brand-600" : "border border-black/[0.07] bg-white text-ink-muted"
                    }`}
                  >
                    {k}
                  </motion.span>
                ))}
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-black/[0.05] bg-white/70 p-4">
                    <div className="text-2xl font-bold tracking-tight text-ink">
                      <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </div>
                    <div className="mt-0.5 text-xs leading-tight text-ink-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
