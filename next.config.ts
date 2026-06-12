import type { NextConfig } from "next";

// NEXT_OUTPUT=export erzeugt eine statische Version (GitHub-Pages-Preview,
// siehe .github/workflows/pages.yml). NEXT_PUBLIC_BASE_PATH ist dabei der
// Unterpfad (z. B. /temoa-website). Lokal/Vercel bleibt alles unverändert.
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = isExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
      assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
