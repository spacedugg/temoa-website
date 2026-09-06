import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { TeamBody } from "@/components/team/TeamBody";

export const metadata: Metadata = {
  title: "Team · temoa",
  description:
    "Drei Gründer und neun im Team: Strategie, Produktbilder, SEO, Kampagnen und Tagesgeschäft für eure Amazon-Konten, alles im Haus.",
};

export default function TeamPage() {
  return (
    <>
      <Kopfzeile />
      <main>
        <TeamBody />
      </main>
      <Fusszeile />
    </>
  );
}
