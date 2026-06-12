import type { Metadata } from "next";
import { caros } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEMOA — Full-Service Amazon-Agentur",
  description:
    "Profitables Wachstum auf Amazon. Wir übernehmen euer Amazon-Konto komplett — Organic First: Erst verkauft das Listing, dann skalieren die Ads.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={caros.variable}>
      <body>{children}</body>
    </html>
  );
}
