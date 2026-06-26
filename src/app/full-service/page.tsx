import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Full Service · temoa",
  description: "Full-Service Amazon-Management. Diese Seite bauen wir gerade neu.",
};

export default function FullServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <ComingSoon
          eyebrow="Full Service"
          title="Full-Service Amazon-Management"
          sub="Diese Seite bauen wir gerade neu, mit den finalen Texten. Die Inhalte folgen in Kürze."
        />
      </main>
      <Footer />
    </>
  );
}
