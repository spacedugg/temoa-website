import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Team } from "@/components/sections/Team";
import { WhyTemoa } from "@/components/sections/WhyTemoa";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Über uns · TEMOA",
  description:
    "Wir führen euren Amazon-Account wie ein eigenes Geschäft: auf Marge, mit System und einem festen Team. Lernt die Menschen hinter TEMOA kennen.",
};

export default function UeberUnsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Über uns"
          title={<>Euer Account, <span className="text-gradient">wie unser eigenes Geschäft.</span></>}
          description="Wir sind kein Dienstleister für Einzelteile, sondern ein Team, das Verantwortung für euer Wachstum übernimmt – auf Marge, mit System und voller Transparenz."
        />
        <Team />
        <WhyTemoa />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
