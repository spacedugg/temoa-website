import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";

const names: Record<string, string> = {
  strategie: "Strategie & Analyse",
  "listing-seo": "Content & Listings",
  "ppc-advertising": "Advertising / PPC",
  "account-management": "Account-Management",
  internationalisierung: "Internationalisierung",
};

export function generateStaticParams() {
  return Object.keys(names).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = names[slug];
  return name ? { title: `${name} · temoa` } : {};
}

export default async function LeistungPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = names[slug];
  if (!name) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          eyebrow="Leistung"
          title={name}
          sub="Diese Leistungsseite bauen wir gerade neu, mit den finalen Texten. Die Inhalte folgen in Kürze."
        />
      </main>
      <Footer />
    </>
  );
}
