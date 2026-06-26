import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FullServiceBody } from "@/components/service/bodies";

export const metadata: Metadata = {
  title: "Full Service · temoa",
  description:
    "Ein eingespieltes Team für euren kompletten Amazon-Account: Strategie, Content, Advertising, Account-Management und Internationalisierung aus einer Hand.",
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
