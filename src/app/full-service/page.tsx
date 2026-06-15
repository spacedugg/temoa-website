import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { FullService } from "@/components/sections/FullService";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { Internationalisierung } from "@/components/sections/Internationalisierung";
import { OrganicFirst } from "@/components/sections/OrganicFirst";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Full Service · TEMOA",
  description:
    "Strategie, Content, Advertising und Account-Management aus einer Hand – Full-Service Amazon-Wachstum, Organic First und auf Marge gesteuert.",
};

export default function FullServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Full Service 360°"
          title={<>Alles, was euer Konto braucht – <span className="text-gradient">aus einer Hand.</span></>}
          description="Vier Bereiche, ein System: Strategie, Content, Advertising und Betrieb greifen ineinander, statt euch an mehreren Dienstleistern aufzureiben."
        />
        <FullService />
        <ServicesDetail />
        <Internationalisierung />
        <OrganicFirst />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
