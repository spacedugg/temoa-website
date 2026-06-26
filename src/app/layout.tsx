import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const caros = localFont({
  src: [
    { path: "./fonts/Caros-Thin.otf", weight: "200", style: "normal" },
    { path: "./fonts/Caros-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Caros.otf", weight: "400", style: "normal" },
    { path: "./fonts/Caros-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Caros-ExtraBold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-caros",
  display: "swap",
});

export const metadata: Metadata = {
  title: "temoa · Amazon Full Service Wachstumspartner",
  description:
    "Wir machen euer Listing organisch so stark, dass es auch ohne Werbung verkauft. Erst dann kommt PPC dazu und arbeitet vom ersten Euro an profitabel. Organic First, PPC Second.",
  metadataBase: new URL("https://temoa.de"),
  icons: { icon: "/logo/logo-icon.svg" },
  openGraph: {
    title: "temoa · Amazon Full Service Wachstumspartner",
    description:
      "Amazon-Wachstum ist keine Frage des Werbebudgets. Organic First, PPC Second.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={caros.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
