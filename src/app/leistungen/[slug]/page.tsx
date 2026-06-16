import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Blocks } from "@/components/sections/Blocks";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { CTA } from "@/components/sections/CTA";
import { leistungen } from "@/lib/copy";

export function generateStaticParams() {
  return Object.keys(leistungen).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = leistungen[slug];
  if (!page) return {};
  return { title: `${page.nav} · TEMOA`, description: page.hero.sub };
}

export default async function LeistungPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = leistungen[slug];
  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={<>{page.hero.lead} <span className="text-gradient">{page.hero.accent}</span></>}
          description={page.hero.sub}
        />
        {slug === "content-listing-seo" && <BeforeAfterShowcase />}
        <Blocks blocks={page.blocks} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
