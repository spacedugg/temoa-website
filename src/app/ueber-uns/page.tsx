import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Team } from "@/components/sections/Team";
import { Blocks, type Block } from "@/components/sections/Blocks";
import { CTA } from "@/components/sections/CTA";
import { principles } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Team · TEMOA",
  description:
    "Menschen statt Ticketsystem: Gegründet von dreien, die Amazon nicht mehr loslässt – heute ein Team, das für jeden Hebel jemanden hat, der ihn beherrscht.",
};

const founderIcons = ["account", "spark", "shield"] as const;

const blocks: Block[] = [
  {
    kind: "callout",
    eyebrow: "Gründergeschichte",
    title: "Gegründet von dreien, die Amazon nicht mehr loslässt.",
    body: "Clemens, Christoph und Eddie haben TEMOA gegründet – aus der Überzeugung, dass Amazon-Wachstum kein Bauchgefühl ist, sondern ein System. Heute ein Team, das für jeden Hebel jemanden hat, der ihn beherrscht.",
  },
  {
    kind: "grid",
    eyebrow: "Wie wir arbeiten",
    title: "Drei Regeln, die wir uns selbst auferlegt haben.",
    cols: 3,
    items: principles.map((p, i) => ({ title: p.title, body: p.body, icon: founderIcons[i] })),
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Team"
          title={<>Menschen statt <span className="text-gradient">Ticketsystem.</span></>}
          description="Für jeden Hebel jemand, der ihn beherrscht – eine Handvoll Marken pro Consultant, Antwort am selben Tag."
        />
        <Blocks blocks={[blocks[0]]} />
        <Team />
        <Blocks blocks={[blocks[1]]} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
