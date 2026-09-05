import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { CaseBlock } from "@/components/cases/CaseStudiesFull";
import { CaseGallery, OtherCases } from "@/components/cases/CaseDetailExtras";
import { ServiceCTA } from "@/components/service/Blocks";
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
      <Kopfzeile />
      <main>
        <div className="pt-10 md:pt-14" />
        <CaseBlock c={c} index={0} />
        <CaseGallery c={c} />
        <OtherCases slug={c.slug} />
        <ServiceCTA
          title="Solche Ergebnisse für eure Marke?"
          sub="In der kostenlosen Potenzialanalyse schauen wir, welcher Schritt aus dieser Case Study auf euer Sortiment passt."
          zusagen={[
            "Ihr bekommt eine Einschätzung zu eurem Sortiment, keine Standardpräsentation",
            "Wir sagen auch ab, wenn wir bei euch keinen Weg sehen",
          ]}
        />
      </main>
      <Fusszeile />
    </>
  );
}
