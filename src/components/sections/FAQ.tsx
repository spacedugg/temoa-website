"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

const faqs = [
  {
    q: "Wir haben schon eine Agentur – was macht ihr anders?",
    a: "Die meisten Agenturen lösen einen Ausschnitt: nur Ads, nur Content. Bei uns greifen Strategie, Content, Advertising und Betrieb in einem System ineinander – auf Marge gesteuert, mit einem festen Ansprechpartner. Organic First heißt: Wir bauen erst das Fundament, das Werbung profitabel macht.",
  },
  {
    q: "Wie schnell sehen wir erste Ergebnisse?",
    a: "Erste Quick-Wins aus Listing- und Kampagnen-Optimierung sind meist innerhalb weniger Wochen sichtbar. Nachhaltiges organisches Wachstum baut sich über die ersten Monate auf – wir zeigen den Fortschritt wöchentlich transparent in klaren KPIs.",
  },
  {
    q: "Müssen wir uns selbst um etwas kümmern?",
    a: "So wenig wie möglich. Nach einem kompakten Onboarding übernehmen wir Content, Advertising und den operativen Betrieb inklusive Buy-Box-, Inventar- und Case-Management. Ihr behaltet die volle Transparenz, ohne im Tagesgeschäft zu versinken.",
  },
  {
    q: "Auf welchen Marktplätzen und in welchen Ländern arbeitet ihr?",
    a: "Schwerpunkt ist Amazon – nativ in bis zu fünf Ländern (DE, FR, IT, ES, plus weitere auf Anfrage). Internationalisierung rollen wir sauber und marktplatzgerecht aus, statt Listings nur zu übersetzen.",
  },
  {
    q: "Wie ist die Zusammenarbeit aufgebaut?",
    a: "Ein fester Ansprechpartner, wöchentliche Reports und Quartals-Reviews gegen klar definierte Ziele. Kein Blindflug, keine Blackbox – ihr wisst jederzeit, woran wir arbeiten und warum.",
  },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-navy/[0.08]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-semibold text-ink">{q}</span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
            open ? "border-transparent bg-brand-500 text-white" : "border-navy/[0.12] text-ink-muted"
          }`}
        >
          <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none" animate={{ rotate: open ? 45 : 0 }}>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-ink-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Häufige Fragen"
          title={<>Was Marken vor dem <span className="text-gradient">Start fragen.</span></>}
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
