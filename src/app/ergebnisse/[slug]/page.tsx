import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseBlock } from "@/components/cases/CaseStudiesFull";
import { CaseGallery, OtherCases } from "@/components/cases/CaseDetailExtras";
import { ServiceCTA } from "@/components/service/Blocks";
import { Testimonials } from "@/components/home/Testimonials";
import { cases, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return { title: "Case Study · temoa" };
  return {
    title: `${c.displayName} · Case Study · temoa`,
    description: `${c.headline} ${c.subheadline}`,
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-10 md:pt-14" />
        <CaseBlock c={c} index={0} />
        <CaseGallery c={c} />
        <OtherCases slug={c.slug} />
        <Testimonials tone="white" />
        <ServiceCTA
          title="Solche Ergebnisse für eure Marke?"
          sub="In der kostenlosen Potenzialanalyse zeigen wir, wo in euren Listings und Kampagnen das nächste Umsatzwachstum liegt."
          chips={["Ihr verlängert nach Performance", "98 % Kundenbindung"]}
        />
      </main>
      <Footer />
    </>
  );
}
