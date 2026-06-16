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
          eyebrow="Team"
          title={<>Menschen statt <span className="text-gradient">Ticketsystem.</span></>}
          description="Gegründet von dreien, die Amazon nicht mehr loslässt – heute ein Team, das für jeden Hebel jemanden hat, der ihn beherrscht. Eine Handvoll Marken pro Consultant, Antwort am selben Tag."
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
