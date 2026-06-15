"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const company = String(f.get("company") || "");
    const email = String(f.get("email") || "");
    const message = String(f.get("message") || "");
    const subject = encodeURIComponent(`Anfrage von ${name}${company ? ` · ${company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${name}\nUnternehmen: ${company}\nE-Mail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:tools@temoa.de?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="relative border-t border-navy/[0.06] py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kein Call?"
          title={<>Lieber <span className="text-gradient">schreiben?</span></>}
          description="Am liebsten sprechen wir im Call – wenn dir das aber nicht liegt, schreib uns hier. Wir melden uns zeitnah zurück."
          align="center"
        />

        <Reveal>
          <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-navy/[0.12] bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
                  placeholder="Vor- und Nachname"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Unternehmen</span>
                <input
                  name="company"
                  className="w-full rounded-xl border border-navy/[0.12] bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
                  placeholder="Marke / Firma"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-ink">E-Mail</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-navy/[0.12] bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
                placeholder="name@unternehmen.de"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Nachricht</span>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-navy/[0.12] bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand-400"
                placeholder="Worum geht's? Sortiment, Marktplätze, Ziele …"
              />
            </label>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                Nachricht senden
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {sent && <span className="text-sm text-emerald-deep">Dein E-Mail-Programm öffnet sich …</span>}
              <span className="text-sm text-ink-faint">oder direkt: tools@temoa.de</span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
