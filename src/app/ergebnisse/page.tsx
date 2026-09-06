import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { ServiceCTA } from "@/components/service/Blocks";
import { ProofStrip } from "@/components/sections/SocialProof";
import { Stats } from "@/components/home/Stats";
import { Counter } from "@/components/ui/Counter";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Case Studies · temoa",
  description:
    "Fünf Marken auf Amazon mit Ausgangslage, Vorgehen und Ergebnis: profitabel ausgebauter Umsatz, ein Produkt von null aufgebaut und vier Marktplätze parallel.",
};

/**
 * 98 % Kundenbindung.
 *
 * Vorher stand die Zahl allein in einer schmalen weissen Platte in der Mitte
 * der Seite und ging unter. Jetzt ein dunkles Podest: links die Zahl, rechts
 * eine Stimme aus einem Konto, das seit Jahren bleibt.
 */
function RetentionBand() {
  const stimme = testimonials[0];
  return (
    /* Vorher lag die Zahl als Navy-Platte in einer hellen Sektion, und die
       Stimme daneben noch einmal in einer eigenen Kachel darin. Jetzt traegt
       die Sektion das Navy, beides steht frei darauf. */
    <section className="on-dark ground-deep relative isolate overflow-hidden py-20 md:py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full opacity-70 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.24), transparent 68%)" }}
      />
      <div className="container-x relative">
        <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <div className="num text-[clamp(3.5rem,2rem+6vw,6.5rem)] leading-none text-white">
              <Counter to={98} suffix=" %" />
            </div>
            <p className="mt-5 max-w-[26ch] text-lead font-bold text-white">
              der Marken verlängern nach Performance.
            </p>
            <p className="mt-3 max-w-[34ch] text-small text-chalk-muted">
              Verlängert wird, wenn die Zahlen dafür sprechen.
            </p>
          </div>

          <figure className="relative md:border-l md:border-white/[0.12] md:pl-16">
            <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden className="text-brand-500">
              <path
                d="M0 26V14C0 6.3 4.8 1.2 13 0l1.7 4.3C10 5.6 7.6 8.2 7.4 12H13v14H0Zm20 0V14c0-7.7 4.8-12.8 13-14l1.7 4.3C30 5.6 27.6 8.2 27.4 12H33v14H20Z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="mt-5 text-balance text-[1.2rem] font-bold leading-snug text-white md:text-[1.5rem]">
              {stimme.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3.5">
              {stimme.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={stimme.image}
                  alt=""
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/15"
                />
              )}
              <span className="min-w-0">
                <span className="block text-small font-bold text-white">{stimme.name}</span>
                <span className="block text-small text-chalk-faint">{stimme.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default function ErgebnissePage() {
  return (
    <>
      <Kopfzeile />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title={
            <>
              Fünf Marken, die <span className="text-gradient">profitabel gewachsen sind.</span>
            </>
          }
          /* Vorher: „Fünf Konten, vollständig nachgerechnet." Nachrechnen ist
             das, was ein Steuerberater tut, und es sagt nichts darüber, was
             passiert ist. Der Untertitel sagt jetzt, was wir erreicht haben,
             statt darauf hinzuweisen, wo es nicht rund lief. */
          description="Marken aus verschiedenen Kategorien. Wir haben ihren Umsatz profitabel ausgebaut, neue Produkte eingeführt und weitere Länder erschlossen. Je Fall mit Zeitraum und den Zahlen aus dem Konto."
        />
        <Stats tone="white" />
        <ProofStrip tone="blue" bare />
        <CaseGrid />
        <RetentionBand />
        <ServiceCTA
          title="Was wäre bei euch möglich?"
        />
      </main>
      <Fusszeile />
    </>
  );
}
