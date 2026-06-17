import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Datenschutzerklärung · TEMOA",
  description: "Wie wir mit euren personenbezogenen Daten umgehen – nach DSGVO.",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow="Rechtliches" title="Datenschutzerklärung" />
        <section className="relative pb-24">
          <div className="container-x">
            <div className="mx-auto max-w-2xl space-y-8 text-ink-muted">
              <p className="rounded-2xl border border-brand-200 bg-brand-50/60 px-5 py-4 text-sm text-ink">
                Hinweis: Diese Datenschutzerklärung bildet den aktuellen, weitgehend statischen
                Stand der Website ab. Die Angaben zum Verantwortlichen werden vor dem Livegang
                vervollständigt; bei späteren Erweiterungen (z. B. Analyse-Tools) ist sie zu
                aktualisieren.
              </p>

              <div>
                <h2 className="text-lg font-bold text-ink">1. Verantwortlicher</h2>
                <p className="mt-3 leading-relaxed">
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                  <br />
                  [Firmenname &amp; Rechtsform], [Anschrift]
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:tools@temoa.de" className="text-brand-600 hover:underline">
                    tools@temoa.de
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">2. Hosting</h2>
                <p className="mt-3 leading-relaxed">
                  Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
                  gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten
                  (z. B. IP-Adresse, Zeitpunkt des Zugriffs, abgerufene Seite) in Server-Logfiles,
                  um die Auslieferung und Sicherheit der Seite zu gewährleisten. Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem stabilen, sicheren
                  Betrieb).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">3. Kontaktaufnahme</h2>
                <p className="mt-3 leading-relaxed">
                  Wenn ihr uns per E-Mail oder über das Kontaktformular schreibt, verarbeiten wir
                  die von euch angegebenen Daten (Name, Unternehmen, E-Mail-Adresse, Nachricht)
                  ausschließlich zur Bearbeitung eurer Anfrage. Das Kontaktformular überträgt keine
                  Daten an einen Server dieser Website, sondern öffnet euer E-Mail-Programm mit einer
                  vorausgefüllten Nachricht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                  (vorvertragliche Maßnahmen) bzw. lit. f DSGVO.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">4. Cookies &amp; Tracking</h2>
                <p className="mt-3 leading-relaxed">
                  Diese Website setzt keine Tracking-, Marketing- oder Analyse-Cookies und bindet
                  keine externen Werbe- oder Analysedienste ein.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">5. Eure Rechte</h2>
                <p className="mt-3 leading-relaxed">
                  Ihr habt jederzeit das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
                  Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
                  Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21
                  DSGVO). Wendet euch dazu an die oben genannte E-Mail-Adresse.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">6. Beschwerderecht</h2>
                <p className="mt-3 leading-relaxed">
                  Ihr habt das Recht, euch bei einer Datenschutz-Aufsichtsbehörde über die
                  Verarbeitung eurer personenbezogenen Daten zu beschweren.
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
