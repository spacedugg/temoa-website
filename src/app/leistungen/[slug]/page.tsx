import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { ComingSoon } from "@/components/sections/ComingSoon";
import {
  StrategieBody,
  ContentBody,
  AdvertisingBody,
  AccountBody,
  InternationalisierungBody,
} from "@/components/service/bodies";

const meta: Record<string, { name: string; description: string }> = {
  strategie: {
    name: "Strategie & Analyse",
    description:
      "Search Query Bericht, Ads-Performance, Verkäufe und Traffic ausgewertet. Daraus entsteht die Reihenfolge der nächsten Schritte für euren Amazon-Account.",
  },
  "listing-seo": {
    name: "Content & Listings",
    description:
      "Hauptbild, Listingbilder, Titel, Bullets und A+ Content, ausgerichtet auf die beiden Zahlen, an denen Amazon euch misst: Klickrate und Conversion.",
  },
  "ppc-advertising": {
    name: "Advertising / PPC",
    description:
      "Jedes Produkt darauf durchgerechnet, was nach Gebühren, FBA und Wareneinsatz übrig bleibt. Mehr Budget bekommt nur, was danach Gewinn bringt.",
  },
  "account-management": {
    name: "Account-Management",
    description:
      "Buy-Box, Bestand, Konto-Gesundheit und Pricing steuern wir wie einen eigenen Geschäftsbereich. So gewinnt ihr Zeit für Produkt und Sortiment.",
  },
  internationalisierung: {
    name: "Internationalisierung",
    description:
      "Jeder Marktplatz ist ein eigener Markt. Eigene Keyword-Recherche, eigener Content und eigene Kampagnen, für jedes Land neu aufgebaut.",
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
    case "internationalisierung":
      return <InternationalisierungBody />;
    default:
      return (
        <ComingSoon
          eyebrow="Leistung"
          title="Diese Leistung folgt in Kürze"
          sub="Diese Leistungsseite überarbeiten wir gerade. Die Inhalte folgen in Kürze."
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
      <Kopfzeile />
      <main>
        <Body slug={slug} />
      </main>
      <Fusszeile />
    </>
  );
}
