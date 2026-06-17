import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Impressum · TEMOA",
  description: "Anbieterkennzeichnung und rechtliche Angaben gemäß § 5 DDG.",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow="Rechtliches" title="Impressum" />
        <section className="relative pb-24">
          <div className="container-x">
            <div className="mx-auto max-w-2xl space-y-8 text-ink-muted">
              <p className="rounded-2xl border border-brand-200 bg-brand-50/60 px-5 py-4 text-sm text-ink">
                Hinweis: Die unternehmensspezifischen Angaben (Anschrift, Vertretung, Register,
                USt-IdNr.) sind hier noch als Platzhalter hinterlegt und werden vor dem Livegang
                vervollständigt.
              </p>

              <div>
                <h2 className="text-lg font-bold text-ink">Angaben gemäß § 5 DDG</h2>
                <p className="mt-3 leading-relaxed">
                  [Firmenname &amp; Rechtsform]
                  <br />
                  [Straße und Hausnummer]
                  <br />
                  [PLZ Ort]
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Vertreten durch</h2>
                <p className="mt-3 leading-relaxed">[Vertretungsberechtigte Person]</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Kontakt</h2>
                <p className="mt-3 leading-relaxed">
                  Telefon: [Telefonnummer]
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:tools@temoa.de" className="text-brand-600 hover:underline">
                    tools@temoa.de
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Registereintrag</h2>
                <p className="mt-3 leading-relaxed">
                  Eintragung im Handelsregister.
                  <br />
                  Registergericht: [Amtsgericht]
                  <br />
                  Registernummer: [HRB-Nummer]
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Umsatzsteuer-ID</h2>
                <p className="mt-3 leading-relaxed">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:
                  <br />
                  [USt-IdNr.]
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">Redaktionell verantwortlich</h2>
                <p className="mt-3 leading-relaxed">[Name und Anschrift der verantwortlichen Person]</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">EU-Streitschlichtung</h2>
                <p className="mt-3 leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                  bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-600 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . Unsere E-Mail-Adresse findet ihr oben. Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
