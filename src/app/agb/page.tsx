import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "AGB · TEMOA",
  description: "Allgemeine Geschäftsbedingungen von TEMOA.",
};

const sections = [
  { h: "§ 1 Geltungsbereich", b: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen [Firmenname] (nachfolgend „TEMOA“) und ihren Kunden über die Erbringung von Amazon-Dienstleistungen." },
  { h: "§ 2 Vertragsgegenstand & Leistungen", b: "Gegenstand ist die Betreuung des Amazon-Kontos im vereinbarten Umfang (Strategie, Listing & SEO, Advertising, Account Management, Internationalisierung). Der konkrete Leistungsumfang ergibt sich aus dem individuellen Angebot." },
  { h: "§ 3 Mitwirkung & Zugänge", b: "Der Kunde stellt die für die Leistungserbringung erforderlichen Zugänge und Informationen bereit. Konto und Daten verbleiben jederzeit im Eigentum des Kunden." },
  { h: "§ 4 Vergütung & Zahlung", b: "Die Vergütung richtet sich nach dem individuellen Angebot. [Zahlungsmodalitäten und Fälligkeit ergänzen.]" },
  { h: "§ 5 Laufzeit & Kündigung", b: "Die Zusammenarbeit ist – sofern nicht anders vereinbart – quartalsweise kündbar. [Form und Fristen der Kündigung ergänzen.]" },
  { h: "§ 6 Haftung", b: "[Haftungsregelungen nach geltendem Recht ergänzen.]" },
  { h: "§ 7 Vertraulichkeit", b: "Beide Parteien behandeln vertrauliche Informationen der jeweils anderen Partei vertraulich." },
  { h: "§ 8 Schlussbestimmungen", b: "Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist – soweit zulässig – [Ort]. Sollten einzelne Bestimmungen unwirksam sein, bleibt der übrige Vertrag wirksam." },
];

export default function AgbPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Rechtliches"
          title={<>AGB</>}
          description="Allgemeine Geschäftsbedingungen."
        />
        <section className="relative py-12 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl space-y-8 leading-relaxed text-ink-muted">
              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-sm">
                <strong className="font-semibold text-ink">Hinweis:</strong> Diese AGB sind eine Vorlage mit
                [Platzhaltern] und müssen vor dem Go-Live vervollständigt und rechtlich geprüft werden.
              </div>
              {sections.map((s) => (
                <div key={s.h}>
                  <h2 className="text-lg font-bold text-ink">{s.h}</h2>
                  <p className="mt-2">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
