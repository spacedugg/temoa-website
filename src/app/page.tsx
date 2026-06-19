import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { MobileStats } from "@/components/sections/MobileStats";
import { Clients } from "@/components/sections/Clients";
import { WhyTemoa } from "@/components/sections/WhyTemoa";
import { OrganicFirst } from "@/components/sections/OrganicFirst";
import { TwoLevers } from "@/components/sections/TwoLevers";
import { FullService } from "@/components/sections/FullService";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { Results } from "@/components/sections/Results";
import { DataAI } from "@/components/sections/DataAI";
import { ProofPoint } from "@/components/sections/ProofPoint";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";
import { GraphicShowcase } from "@/components/sections/GraphicShowcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MobileStats />
        <Clients />
        <WhyTemoa />
        <GraphicShowcase
          src="/graphics/graphic-04.png"
          alt="Warum die üblichen Amazon-Abkürzungen scheitern – und der Weg zu profitablem Wachstum"
          eyebrow="Das Muster"
          title={<>Mehr Budget allein <span className="text-gradient">löst es nicht.</span></>}
          caption="Rabatte, Aktionismus, Tool-Hopping – die üblichen Abkürzungen verbrennen Marge. Wir gehen den Weg, der trägt: erst das Fundament, dann skalieren."
        />
        <OrganicFirst />
        <TwoLevers />
        <GraphicShowcase
          src="/graphics/graphic-02.png"
          alt="Amazon-Listing mit Kennzahlen: Umsatz, Sessions, ACoS, Sichtbarkeit, Conversion"
          eyebrow="Im Listing entschieden"
          title={<>Ein Produktauftritt, der <span className="text-gradient">jede Kauffrage beantwortet.</span></>}
          caption="Bild, A+, Bewertungen und Preis greifen ineinander – bis aus Sichtbarkeit ein Kauf wird."
        />
        <FullService />
        <ServicesDetail />
        <GraphicShowcase
          src="/graphics/graphic-01.png"
          alt="Das TEMOA-Wachstumssystem: Strategie, Listing & SEO, PPC, Internationalisierung, Account Management"
          eyebrow="Das Wachstumssystem"
          title={<>Fünf Leistungen, <span className="text-gradient">ein Aufstieg.</span></>}
          caption="Strategie, Listing & SEO, PPC, Account Management und Internationalisierung – jede Stufe baut auf der vorigen auf."
        />
        <Results />
        <DataAI />
        <GraphicShowcase
          src="/graphics/graphic-11.png"
          alt="Daten- und Ergebnis-Dashboard: organische Sichtbarkeit, Umsatz, Gewinn, ACoS"
          eyebrow="Daten & Ergebnisse"
          title={<>Klare Daten. <span className="text-gradient">Klare Entscheidungen.</span></>}
          caption="Jede Bewegung im Konto wird messbar – damit Optimierung auf Zahlen beruht, nicht auf Bauchgefühl."
          tint="emerald"
        />
        <ProofPoint />
        <GraphicShowcase
          src="/graphics/graphic-08.png"
          alt="PPC-Werbeleistung: ROAS, ACoS, CPC und Klick-Entwicklung"
          eyebrow="Advertising"
          title={<>Werbung, die auf <span className="text-gradient">Marge gerechnet</span> ist.</>}
          caption="Sponsored Products, Brands und Display – gesteuert auf TACoS und ROAS, nicht auf Bruttoumsatz."
        />
        <Process />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
