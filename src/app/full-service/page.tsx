import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Blocks } from "@/components/sections/Blocks";
import { CTA } from "@/components/sections/CTA";
import { fullService } from "@/lib/copy";

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
        />
        <StatsBand />
        <Blocks blocks={fullService.blocks} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
