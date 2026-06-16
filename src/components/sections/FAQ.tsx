"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

const faqs = [
  {
    q: "Wie viel Aufwand ist die Übergabe für uns?",
    a: "Wenige Stunden, verteilt über die ersten Wochen: Zugänge, ein Kickoff-Termin, offene Fragen zu Sortiment und Lieferkette. Wir arbeiten mit einer festen Onboarding-Checkliste – ihr müsst nichts vorbereiten, was wir nicht konkret anfragen.",
  },
  {
    q: "Wem gehören Konto, Kampagnen und Daten?",
    a: "Euch. Immer. Wir arbeiten als Benutzer in eurem Seller Central – keine Konten, Kampagnen oder Markenregistrierungen, die bei uns liegen. Wenn ihr geht, nehmt ihr alles mit, inklusive vollständiger Dokumentation.",
  },
  {
    q: "Was, wenn es nicht funktioniert?",
    a: "Unsere Verträge sind quartalsweise kündbar. Keine Jahresbindung, keine Ausstiegsgebühren. 98 % unserer Kunden bleiben – aber sie bleiben, weil es funktioniert, nicht weil ein Vertrag sie hält.",
  },
  {
    q: "Für wen lohnt sich TEMOA nicht?",
    a: "Unter etwa 50.000 € Monatsumsatz auf Amazon steht unser Honorar in keinem guten Verhältnis zum Hebel – dann sagen wir das im ersten Gespräch. Dasselbe gilt, wenn ihr nur eine Einzelleistung sucht, etwa reines Kampagnenmanagement: Unser Modell funktioniert, weil wir das ganze Konto verantworten.",
  },
  {
    q: "Was kostet das? (zur Einordnung)",
    a: "Das Honorar hängt vom Umfang des Kontos ab – dazu machen wir im Gespräch eine klare Aussage, vorher wäre jede Zahl unseriös. Zur Einordnung: Ein internes Team, das Strategie, Content, SEO, PPC und Account Management abdeckt, kostet mehrere Vollzeitstellen – plus Tools, Einarbeitung und das Risiko, dass Wissen mit Personen geht.",
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
          title={<>Die Fragen, die ihr <span className="text-gradient">zu Recht stellt.</span></>}
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
