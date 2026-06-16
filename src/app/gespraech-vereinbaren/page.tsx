import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Steps } from "@/components/sections/Steps";
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
          title={<>Lasst uns über <span className="text-gradient">euer Konto sprechen.</span></>}
          description="30 Minuten mit Clemens, Geschäftsführung von TEMOA. Ihr bekommt eine ehrliche Einschätzung, wo euer Konto steht und was drin ist – auch dann, wenn die Antwort lautet: Ihr braucht uns (noch) nicht."
        />
        <CTA />
        <Steps />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
