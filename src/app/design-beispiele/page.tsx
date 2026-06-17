import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingShowcase } from "@/components/sections/ListingShowcase";
import { ContentStudio } from "@/components/sections/ContentStudio";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Designbeispiele · TEMOA",
  description:
    "Echte Listings aus unserem Content Studio: Hauptbilder, die den Klick holen, Infografiken, die Kauffragen beantworten, A+ Module, die den Warenkorb heben. Vorher-Nachher inklusive.",
};

export default function DesignBeispielePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* page hero */}
        <section className="relative overflow-hidden pb-8 pt-36 md:pt-44">
          <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
          <div className="container-x relative text-center">
            <span className="eyebrow justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Designbeispiele
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Seht, wie ein Listing <span className="text-gradient">kaufreif wird.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Hauptbild, Infografiken, A+ und Brand Store – echte Arbeiten aus unserem Content
              Studio. Klickt euch durch ganze Bilderstrecken, vergleicht Vorher und Nachher und seht,
              an welcher Stelle aus einem Besucher ein Käufer wird.
            </p>
          </div>
        </section>

        <ListingShowcase />
        <BeforeAfterShowcase />
        <ContentStudio />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
