import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Leistungsmodell, FuerWen, Kosteneinordnung } from "@/components/sections/FullServiceContent";
import { FullService } from "@/components/sections/FullService";
import { Internationalisierung } from "@/components/sections/Internationalisierung";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Blocks, type Block } from "@/components/sections/Blocks";
import { servicesList } from "@/lib/copy";

const servicesBridge: Block = {
  kind: "bridge",
  eyebrow: "Die Bausteine",
  title: "Strategie, Content, Ads und Betrieb greifen ineinander.",
  links: servicesList.filter((s) => s.href !== "/full-service"),
};

export const metadata: Metadata = {
  title: "Full Service · TEMOA",
  description:
    "Ihr führt die Marke, wir führen das Konto: Strategie, Content, Advertising und Betrieb aus einer Hand – Organic First, auf Marge gesteuert.",
};

export default function FullServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Full Service"
          title={<>Ihr führt die Marke. <span className="text-gradient">Wir führen das Konto.</span></>}
          description="Das Tagesgeschäft auf Amazon füllt schnell eine ganze Woche. Wir übernehmen den kompletten Betrieb, damit ihr wieder an eurer Marke arbeitet statt im Seller Central."
        />
        <Leistungsmodell />
        <FuerWen />
        <FullService />
        <Blocks blocks={[servicesBridge]} />
        <BeforeAfterShowcase />
        <Kosteneinordnung />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
