import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { MobileStats } from "@/components/sections/MobileStats";
import { Clients } from "@/components/sections/Clients";
import { WhyTemoa } from "@/components/sections/WhyTemoa";
import { OrganicFirst } from "@/components/sections/OrganicFirst";
import { TwoLevers } from "@/components/sections/TwoLevers";
import { FullService } from "@/components/sections/FullService";
import { Results } from "@/components/sections/Results";
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
        <Clients />
        <WhyTemoa />
        <OrganicFirst />
        <TwoLevers />
        <FullService />
        <Results />
        <Process />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
