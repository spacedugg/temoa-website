"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";

const steps = [
  {
    n: "1",
    title: "Potenzial-Gespräch",
    duration: "30 Minuten",
    text: "Ihr sprecht mit Clemens, Geschäftsführung – nicht mit einem Vertriebler. Wir wollen verstehen, wo ihr steht und ob wir zueinander passen. Wenn nicht, sagen wir das.",
  },
  {
    n: "2",
    title: "Account-Analyse",
    duration: "ca. 1 Woche",
    text: "Ihr gebt uns Lesezugriff auf euer Seller Central. Wir analysieren Listings, Kampagnen, Rankings und Margenstruktur und zeigen euch konkret, wo Potenzial liegt – und wo nicht. Euer Aufwand: den Zugang freischalten.",
  },
  {
    n: "3",
    title: "Übernahme",
    duration: "2–4 Wochen bis zur vollen Verantwortung",
    text: "Strukturiertes Onboarding entlang einer festen Checkliste. Ihr braucht dafür insgesamt wenige Stunden – danach führen wir das Konto, und ihr bekommt eure Woche zurück.",
  },
];

export function Steps() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="So starten wir"
          title={<>Von „mal sprechen" bis „läuft" – <span className="text-gradient">in drei Schritten.</span></>}
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <RevealItem key={s.n}>
              <div className="card relative h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-violet text-lg font-bold text-white shadow-glow">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <span className="mt-1 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {s.duration}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
