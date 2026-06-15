import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Gespräch vereinbaren · TEMOA",
  description:
    "30 Minuten, kostenfrei, direkt mit dem Founder: Wir analysieren euer Amazon-Konto vorab und zeigen ehrlich, wo das größte Potenzial liegt.",
};

export default function GespraechVereinbarenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Gespräch vereinbaren"
          title={<>30 Minuten, die euer <span className="text-gradient">Marktplatz-Potenzial</span> zeigen.</>}
          description="Kostenfrei, unverbindlich und ohne Verkaufsdruck. Wir schauen uns euer Konto vorab an und kommen mit konkreten Ideen ins Gespräch."
        />
        <CTA />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
