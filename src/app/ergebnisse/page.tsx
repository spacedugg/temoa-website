import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Case Studies · temoa",
  description: "Case Studies. Diese Seite bauen wir gerade neu.",
};

export default function ErgebnissePage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          eyebrow="Case Studies"
          title="Ergebnisse aus echten Konten"
          sub="Diese Seite bauen wir gerade neu. Die Fälle und Zahlen folgen nach Kundenfreigabe."
        />
      </main>
      <Footer />
    </>
  );
}
