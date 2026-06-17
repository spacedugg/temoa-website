import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Blocks } from "@/components/sections/Blocks";
import { PricingThreshold } from "@/components/sections/PricingThreshold";
import { CTA } from "@/components/sections/CTA";
import { fullService, pricing } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Full Service · TEMOA",
  description:
    "Full-Service Amazon-Management: Strategie, Content, Advertising und Account Management aus einer Hand – übergebt euren kompletten Account einem eingespielten Team.",
};

export default function FullServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={fullService.hero.eyebrow}
          title={<>{fullService.hero.lead} <span className="text-gradient">{fullService.hero.accent}</span></>}
          description={fullService.hero.sub}
          cta={{ label: "Gespräch vereinbaren", href: "/gespraech-vereinbaren" }}
          secondary={{ label: "Ergebnisse ansehen", href: "/ergebnisse" }}
        />
        <StatsBand />
        <Blocks blocks={fullService.blocks} />
        <PricingThreshold from={pricing["full-service"]} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
