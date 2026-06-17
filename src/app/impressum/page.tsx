import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Impressum · TEMOA",
  description: "Impressum und Anbieterkennzeichnung von TEMOA.",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Rechtliches"
          title={<>Impressum</>}
          description="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
        />
        <section className="relative py-12 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl space-y-8 leading-relaxed text-ink-muted">
              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-sm">
                <strong className="font-semibold text-ink">Hinweis:</strong> Diese Seite ist ein Platzhalter.
                Vor dem Go-Live sind die mit [eckigen Klammern] markierten Angaben durch die
                rechtsverbindlichen Daten von TEMOA zu ersetzen (rechtliche Prüfung empfohlen).
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Anbieter</h2>
                <p className="mt-2">[Firmenname / Rechtsform]<br />[Straße und Hausnummer]<br />[PLZ und Ort]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Vertreten durch</h2>
                <p className="mt-2">[Vertretungsberechtigte Person(en) / Geschäftsführung]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Kontakt</h2>
                <p className="mt-2">
                  E-Mail: <a className="text-brand-600 hover:text-brand-700" href="mailto:tools@temoa.de">tools@temoa.de</a>
                  <br />Telefon: [Telefonnummer]
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Registereintrag</h2>
                <p className="mt-2">[Registergericht] · [Registernummer, z. B. HRB …]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Umsatzsteuer-ID</h2>
                <p className="mt-2">Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: [USt-IdNr.]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p className="mt-2">[Name]<br />[Anschrift wie oben]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">EU-Streitschlichtung</h2>
                <p className="mt-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a className="text-brand-600 hover:text-brand-700" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
                    ec.europa.eu/consumers/odr
                  </a>
                  . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
