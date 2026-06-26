import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";
import {
  StrategieBody,
  ContentBody,
  AdvertisingBody,
  AccountBody,
} from "@/components/service/bodies";

const meta: Record<string, { name: string; description: string }> = {
  strategie: {
    name: "Strategie & Analyse",
    description:
      "Wir analysieren Markt, Wettbewerb und eure Zahlen bis auf SKU-Ebene und machen daraus einen Fahrplan, der jede Maßnahme steuert.",
  },
  "listing-seo": {
    name: "Content & Listings",
    description:
      "Hauptbilder, Produktbilder, A+ und SEO, gebaut auf Klickrate, Conversion und einen hochwertigen Markenauftritt.",
  },
  "ppc-advertising": {
    name: "Advertising / PPC",
    description:
      "Wir steuern eure Kampagnen nach dem Deckungsbeitrag jedes Produkts, statt auf Klick-Metriken. So wächst der Umsatz und die Marge wächst mit.",
  },
  "account-management": {
    name: "Account-Management",
    description:
      "Buy-Box, Bestand, Konto-Gesundheit und Pricing steuern wir wie einen eigenen Geschäftsbereich. So gewinnt ihr Zeit für Produkt und Sortiment.",
  },
  internationalisierung: {
    name: "Internationalisierung",
    description: "Internationaler Marktplatz-Rollout. Diese Seite bauen wir gerade neu.",
  },
};

export function generateStaticParams() {
  return Object.keys(meta).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = meta[slug];
  return m ? { title: `${m.name} · temoa`, description: m.description } : {};
}

function Body({ slug }: { slug: string }) {
  switch (slug) {
    case "strategie":
      return <StrategieBody />;
    case "listing-seo":
      return <ContentBody />;
    case "ppc-advertising":
      return <AdvertisingBody />;
    case "account-management":
      return <AccountBody />;
    default:
      return (
        <ComingSoon
          eyebrow="Leistung"
          title="Internationaler Marktplatz-Rollout"
          sub="Diese Leistungsseite bauen wir gerade neu. Die Inhalte folgen in Kürze."
        />
      );
  }
}

export default async function LeistungPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!meta[slug]) notFound();
  return (
    <>
      <Navbar />
      <main>
        <Body slug={slug} />
      </main>
      <Footer />
    </>
  );
}
