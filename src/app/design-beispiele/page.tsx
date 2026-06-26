import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Designbeispiele · temoa",
  description: "Designbeispiele. Diese Seite bauen wir gerade neu.",
};

export default function DesignBeispielePage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          eyebrow="Designbeispiele"
          title="Designbeispiele"
          sub="Diese Seite bauen wir gerade neu. Die Beispiel-Listings folgen in Kürze."
        />
      </main>
      <Footer />
    </>
  );
}
