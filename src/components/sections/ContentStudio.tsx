"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const tiles = [
  { type: "Hauptbild", note: "Hero-Shot mit Benefit-Stack", span: "row-span-2", g: "from-brand-500 to-violet" },
  { type: "A+ Content", note: "Vergleichstabelle", span: "", g: "from-cyan to-brand-400" },
  { type: "Infografik", note: "Anwendung in 3 Schritten", span: "", g: "from-emerald to-cyan" },
  { type: "Brand Store", note: "Mehrseitiger Markenshop", span: "row-span-2", g: "from-violet to-brand-600" },
  { type: "Lifestyle", note: "Produkt im Einsatz", span: "", g: "from-amber to-violet" },
  { type: "A+ Content", note: "Premium A+ Markenwelt", span: "", g: "from-brand-500 to-cyan" },
];

function Mock({ type }: { type: string }) {
  return (
    <div className="absolute inset-3 rounded-xl bg-white/85 p-3 backdrop-blur-sm">
      {type === "Hauptbild" && (
        <div className="flex h-full flex-col">
          <div className="flex-1 rounded-lg bg-gradient-to-br from-black/[0.06] to-black/[0.02]" />
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-black/10" />
            <div className="h-2 w-1/2 rounded bg-black/[0.07]" />
          </div>
        </div>
      )}
      {type === "A+ Content" && (
        <div className="grid h-full grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded bg-black/[0.05]" />
          ))}
        </div>
      )}
      {type === "Infografik" && (
        <div className="flex h-full items-center justify-around">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">{n}</div>
              <div className="h-1.5 w-8 rounded bg-black/[0.06]" />
            </div>
          ))}
        </div>
      )}
      {type === "Brand Store" && (
        <div className="flex h-full flex-col gap-1.5">
          <div className="h-1/3 rounded bg-black/[0.06]" />
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            <div className="rounded bg-black/[0.04]" />
            <div className="rounded bg-black/[0.04]" />
          </div>
        </div>
      )}
      {type === "Lifestyle" && (
        <div className="h-full rounded-lg bg-gradient-to-tr from-black/[0.07] via-transparent to-black/[0.03]" />
      )}
    </div>
  );
}

export function ContentStudio() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Content Studio"
            title={
              <>
                Content, der den <span className="text-gradient">Klick gewinnt.</span>
              </>
            }
            description="Hauptbilder, A+ Content, Brand Stores und Infografiken aus unserem Studio – gestaltet, damit sie ranken, Vertrauen aufbauen und die Conversion heben."
          />
          <a href="#kontakt" className="btn-ghost shrink-0">Alle Designbeispiele</a>
        </div>

        <RevealGroup className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3" stagger={0.06}>
          {tiles.map((t, i) => (
            <RevealItem key={i} className={t.span}>
              <motion.div
                whileHover={{ y: -6 }}
                className={`group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br ${t.g} shadow-soft transition-shadow hover:shadow-lift`}
              >
                <Mock type={t.type} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/45 to-transparent p-4 pt-10">
                  <span className="text-sm font-bold text-white">{t.type}</span>
                  <span className="text-xs text-white/80">{t.note}</span>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
