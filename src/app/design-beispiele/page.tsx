import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingShowcase } from "@/components/sections/ListingShowcase";
import { ContentStudio } from "@/components/sections/ContentStudio";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";

export const metadata: Metadata = {
  title: "Designbeispiele · TEMOA",
  description:
    "Echte Listings, A+ Content und Vorher/Nachher aus dem TEMOA Content Studio – Bilder, die ranken und konvertieren.",
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
              Design-Beispiele
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Design, das nicht nur gefällt. <span className="text-gradient">Sondern verkauft.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Neun Formate, ein Ziel: Conversion. Hauptbilder, Galerie, A+, Premium A+, Brand Store –
              gestaltet für Käufer und für die KI-Suche von morgen.
            </p>
          </div>
        </section>

        <ListingShowcase />
        <BeforeAfterShowcase />
        <ContentStudio />
      </main>
      <Footer />
    </>
  );
}
