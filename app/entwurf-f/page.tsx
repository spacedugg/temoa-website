import { existsSync } from "node:fs";
import path from "node:path";
import EntwurfF from "./EntwurfF";

// Fotorealistisches Hero-Asset (Higgsfield, „Produktbühne“). Solange das File
// noch nicht in public/ liegt (siehe scripts/fetch-hero.mjs), rendert der
// Client die CSS-Bühne als Fallback — ohne 404-Request.
const HERO_IMAGE = "/assets/img/hero-stage.webp";

export default function Page() {
  const exists = existsSync(path.join(process.cwd(), "public", HERO_IMAGE));
  return <EntwurfF heroImage={exists ? HERO_IMAGE : null} />;
}
