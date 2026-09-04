import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FullServiceBody } from "@/components/service/bodies";

export const metadata: Metadata = {
  title: "Full Service · temoa",
  description:
    "Strategie, Content, Advertising, Account-Management und neue Marktplätze für euren Amazon-Account. Fünf Bereiche, ein Team, alle mit denselben Zahlen.",
};

export default function FullServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <FullServiceBody />
      </main>
      <Footer />
    </>
  );
}
