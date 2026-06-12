import { existsSync } from "node:fs";
import path from "node:path";
import EntwurfG, { type HeroSource } from "./EntwurfG";

// Fotorealistisches Hero-Asset („Produktbühne“, Higgsfield-Job be6c2463…):
// lokales File hat Vorrang (sobald der CDN-Host freigegeben ist und das Bild
// per scripts/fetch-asset.mjs eingecheckt wurde); bis dahin lädt der Browser
// des Betrachters die Remote-URL, mit CSS-Bühne als Fallback.
const LOCAL = "/assets/img/3d/hero-stage.webp";
const REMOTE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png";

export default function Page() {
  const heroSource: HeroSource = {
    local: existsSync(path.join(process.cwd(), "public", LOCAL)) ? LOCAL : null,
    remote: REMOTE,
  };
  return <EntwurfG heroSource={heroSource} />;
}
