import localFont from "next/font/local";

export const caros = localFont({
  src: [
    { path: "../public/assets/fonts/Caros-Thin.otf", weight: "100", style: "normal" },
    { path: "../public/assets/fonts/Caros-Light.otf", weight: "300", style: "normal" },
    { path: "../public/assets/fonts/Caros.otf", weight: "400", style: "normal" },
    { path: "../public/assets/fonts/Caros-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/assets/fonts/Caros-ExtraBold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-caros",
  display: "swap",
});
