import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Credibility } from "@/components/home/Credibility";
import { Problem } from "@/components/home/Problem";
import { Mechanism } from "@/components/home/Mechanism";
import { FullService } from "@/components/home/FullService";
import { CaseStudies } from "@/components/home/CaseStudies";
import { DesignShowcase } from "@/components/home/DesignShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Team } from "@/components/home/Team";
import { BlogStrip } from "@/components/home/BlogStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Credibility />
        <Problem />
        <Mechanism />
        <FullService />
        <CaseStudies />
        <DesignShowcase />
        <Testimonials />
        <FinalCTA />
        <Team />
        <BlogStrip />
      </main>
      <Footer />
    </>
  );
}
