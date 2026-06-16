import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Gespräch buchen · TEMOA",
  description:
    "30 Minuten, kostenfrei, direkt mit Clemens. Wir schauen uns euer Konto an und sagen ehrlich, wo das größte Potenzial liegt – ohne Verkaufsdruck.",
};

export default function GespraechBuchenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Gespräch buchen"
          title={<>Lass uns über euer <span className="text-gradient">Marktplatz-Potenzial</span> sprechen.</>}
          description="30 Minuten, kostenfrei, direkt mit Clemens. Wir schauen uns euer Konto an und sagen ehrlich, wo das größte Potenzial liegt – ohne Verkaufsdruck."
        />
        <CTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
