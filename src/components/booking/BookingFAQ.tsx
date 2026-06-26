"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";

const faqs: { q: string; a: string }[] = [
  {
    q: "Was kostet die Potenzialanalyse?",
    a: "Nichts. Die Analyse und das Gespräch sind kostenlos und unverbindlich.",
  },
  {
    q: "Wie lange dauert das Gespräch?",
    a: "Etwa 30 Minuten. Wir schauen vorab in euren Account und kommen mit konkreten Beobachtungen ins Gespräch.",
  },
  {
    q: "Was braucht ihr von uns?",
    a: "Euren Markennamen und kurz euer Ziel. Den Rest sehen wir im Account.",
  },
  {
    q: "Sind wir danach gebunden?",
    a: "Nein. Ihr entscheidet nach dem Gespräch, ob es weitergeht. Eine Zusammenarbeit verlängert ihr später nach Performance, nicht wegen einer langen Laufzeit.",
  },
  {
    q: "Mit wem sprechen wir?",
    a: "Direkt mit jemandem aus dem Team, der euren Account einschätzen kann. Kein Vertrieb ohne Fachwissen.",
  },
  {
    q: "Für wen lohnt sich das?",
    a: "Für etablierte Marken mit eigenem Sortiment auf Amazon, die mehr aus ihrem Account holen wollen.",
  },
];

export function BookingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="divide-y divide-black/[0.07] overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                aria-expanded={isOpen}
              >
                <span className="text-base font-bold text-ink">{f.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-brand-600 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  style={{ background: "rgba(255,153,0,0.1)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted md:px-6">{f.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
