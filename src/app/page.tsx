import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { MobileStats } from "@/components/sections/MobileStats";
import { WhyTemoa } from "@/components/sections/WhyTemoa";
import { Results } from "@/components/sections/Results";
import { OrganicFirst } from "@/components/sections/OrganicFirst";
import { TwoLevers } from "@/components/sections/TwoLevers";
import { FullService } from "@/components/sections/FullService";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { ContentStudio } from "@/components/sections/ContentStudio";
import { DataAI } from "@/components/sections/DataAI";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MobileStats />
        <WhyTemoa />
        <Results />
        <OrganicFirst />
        <TwoLevers />
        <FullService />
        <ServicesDetail />
        <ContentStudio />
        <DataAI />
        <Process />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
