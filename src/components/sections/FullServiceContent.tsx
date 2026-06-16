"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "../ui/Reveal";

/* ---------- Das System (Leistungsmodell) ---------- */
const levers = [
  {
    sub: "Content Studio",
    title: "Content & Listing-SEO",
    text: "Produktbilder, A+ Content, Brand Store, Keyword-Architektur. Das Listing ist euer Verkäufer – es arbeitet 24/7, bezahlt wird es nicht pro Klick.",
  },
  {
    sub: "Advertising Engine",
    title: "PPC Advertising",
    text: "Sponsored Products, Brands und Display – auf Listings, die konvertieren. Gesteuert auf Profitabilität (TACoS), nicht auf Bruttoumsatz.",
  },
  {
    sub: "—",
    title: "Internationalisierung",
    text: "Expansion auf bis zu 5 Marktplätze: Übersetzung mit lokaler Keyword-Recherche, Pan-EU-Logistik, Compliance je Markt.",
  },
];

export function Leistungsmodell() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-canvas-alt" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Das System"
          title={<>So bauen die Leistungen <span className="text-gradient">aufeinander auf.</span></>}
          description="Wir übernehmen euer Amazon-Konto als Ganzes – nicht als Liste von Einzelaufgaben, sondern als System, in dem jeder Teil auf den anderen aufbaut."
        />

        {/* Klammer: Account Management umschließt Hebel + Fundament */}
        <Reveal>
          <div className="mt-14 rounded-[2rem] border-2 border-dashed border-brand-200 p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 px-2">
              <span className="text-sm font-bold text-ink">Account Management <span className="font-medium text-brand-600">· Management Hub</span></span>
              <span className="text-xs text-ink-faint">Die Klammer um alles</span>
            </div>
            <p className="mb-5 max-w-2xl px-2 text-sm leading-relaxed text-ink-muted">
              Bestandsplanung, Buy-Box-Monitoring, Compliance, Seller-Support-Cases und ein
              monatliches Reporting, das ihr in fünf Minuten versteht. Das Tagesgeschäft, das heute
              eure Woche frisst – bei uns ist es der Job.
            </p>

            <div className="grid gap-4 lg:grid-cols-3">
              {levers.map((l) => (
                <div key={l.title} className="card h-full p-6">
                  {l.sub !== "—" && <span className="text-xs font-semibold text-brand-600">{l.sub}</span>}
                  <h3 className="mt-1 text-lg font-bold text-ink">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{l.text}</p>
                </div>
              ))}
            </div>

            {/* Fundament */}
            <div className="mt-4 rounded-2xl bg-ink p-6 text-white">
              <span className="text-xs font-semibold text-brand-300">Strategy Suite · Das Fundament</span>
              <h3 className="mt-1 text-lg font-bold">Strategie &amp; Pricing</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                Sortiment, Positionierung, Margenlogik. Bevor irgendwo optimiert wird, ist klar,
                welche Produkte das Wachstum tragen und welcher Preis im Wettbewerb verteidigbar ist.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Für wen ---------- */
const cases = [
  { k: "01", t: "50.000–500.000 € Monatsumsatz", b: "Euer Geschäft läuft – aber der nächste Sprung gelingt nicht aus eigener Kraft." },
  { k: "02", t: "Das Tagesgeschäft frisst die Woche", b: "Listings, Kampagnen, Bestände, Cases – für Strategie bleibt keine Zeit." },
  { k: "03", t: "Wachstum nur über Werbebudget", b: "Mehr Umsatz gibt es nur gegen mehr Spend. Der TACoS steigt, die Marge sinkt." },
  { k: "04", t: "Der nächste Marktplatz steht im Raum", b: "Internationalisierung ist geplant – aber niemand hat die Kapazität dafür." },
];

export function FuerWen() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Für wen"
          title={<>Klingt das nach <span className="text-gradient">eurer Situation?</span></>}
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <RevealItem key={c.k}>
              <div className="card h-full p-6">
                <span className="text-2xl font-extrabold text-gradient">{c.k}</span>
                <h3 className="mt-3 text-base font-bold leading-snug text-ink">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.b}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- Kosteneinordnung ---------- */
export function Kosteneinordnung() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="card relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100/70 blur-3xl" />
            <span className="eyebrow">Einordnung</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Was kostet das – verglichen womit?
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Die ehrliche Vergleichsgröße ist selten „keine Kosten", sondern: selbst machen oder
              intern aufbauen. Ein eigenes Team mit derselben Abdeckung – Strategie, Content, SEO,
              PPC und Account Management – liegt schnell bei <span className="font-semibold text-ink">15.000–30.000 €</span> im
              Monat, plus Tools, Einarbeitung und dem Risiko, dass Wissen mit Personen geht.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Wir liegen deutlich darunter; die konkrete Zahl für euer Setup nennen wir im
              Erstgespräch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
