import type { MetadataRoute } from "next";
import { SEITE } from "@/lib/seite";

/* ============================================================
   Das Web-App-Manifest.

   Es sagt dem Browser, wie die Seite heisst, wenn jemand sie auf den
   Startbildschirm legt, und mit welchem Zeichen. Ohne Manifest nimmt Android
   ein Bildschirmfoto der Seite als Symbol.

   `theme_color` faerbt die Systemleiste. Navy und nicht Orange: Orange ist auf
   dieser Website der Akzent, nicht die Flaeche.
   ============================================================ */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "temoa · Amazon Full Service",
    short_name: SEITE.name,
    description:
      "Amazon Full Service: erst ein Listing, das organisch verkauft, dann Werbung, die darauf aufbaut.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0D2439",
    icons: [
      { src: "/icon/zeichen.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
