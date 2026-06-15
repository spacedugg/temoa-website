import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Kontakt · TEMOA",
  description:
    "30 Minuten, kostenfrei, direkt mit dem Founder: Wir schauen uns euer Amazon-Konto an und sagen ehrlich, wo das größte Potenzial liegt.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Kontakt"
          title={<>Lass uns über euer <span className="text-gradient">Marktplatz-Potenzial</span> sprechen.</>}
          description="Kostenfrei, unverbindlich und ohne Verkaufsdruck. Wir analysieren euer Konto vorab und kommen mit konkreten Ideen ins Gespräch."
        />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
