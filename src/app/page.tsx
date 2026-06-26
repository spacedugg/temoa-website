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
import { getFeaturedPosts } from "@/lib/blog";

export default function Home() {
  const featured = getFeaturedPosts(4);
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
        <BlogStrip posts={featured} />
      </main>
      <Footer />
    </>
  );
}
