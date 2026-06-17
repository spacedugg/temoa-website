import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Datenschutz · TEMOA",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei TEMOA.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Rechtliches"
          title={<>Datenschutz&shy;erklärung</>}
          description="Wie wir mit euren personenbezogenen Daten umgehen – nach DSGVO."
        />
        <section className="relative py-12 md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-2xl space-y-8 leading-relaxed text-ink-muted">
              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-sm">
                <strong className="font-semibold text-ink">Hinweis:</strong> Diese Datenschutzerklärung ist eine
                Vorlage mit [Platzhaltern]. Sie muss vor dem Go-Live an die tatsächlich eingesetzten Dienste
                (Hosting, Analyse, Formulare) angepasst und rechtlich geprüft werden.
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink">1. Verantwortlicher</h2>
                <p className="mt-2">
                  Verantwortlich im Sinne der DSGVO ist [Firmenname], [Anschrift]. Kontakt:{" "}
                  <a className="text-brand-600 hover:text-brand-700" href="mailto:tools@temoa.de">tools@temoa.de</a>.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">2. Verarbeitung beim Besuch der Website</h2>
                <p className="mt-2">
                  Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter [Hoster] technisch notwendige
                  Daten (u. a. IP-Adresse, Zeitpunkt, abgerufene Seite) in Server-Logfiles verarbeitet.
                  Rechtsgrundlage ist unser berechtigtes Interesse am sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">3. Kontaktaufnahme</h2>
                <p className="mt-2">
                  Wenn ihr uns über das Formular oder per E-Mail kontaktiert, verarbeiten wir die angegebenen Daten
                  ausschließlich zur Bearbeitung eurer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Eine Weitergabe
                  erfolgt nicht ohne eure Einwilligung.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">4. Cookies & Reichweitenmessung</h2>
                <p className="mt-2">[Angaben zu eingesetzten Cookies und Analyse-/Marketing-Tools ergänzen.]</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">5. Eure Rechte</h2>
                <p className="mt-2">
                  Ihr habt jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                  Datenübertragbarkeit und Widerspruch sowie das Recht, euch bei einer Aufsichtsbehörde zu beschweren.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">6. Stand & Änderungen</h2>
                <p className="mt-2">
                  Diese Erklärung wird angepasst, wenn sich Rechtslage oder eingesetzte Dienste ändern. Stand: [Datum].
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
