import { existsSync } from "node:fs";
import path from "node:path";
import EntwurfF, { type Assets3D } from "./EntwurfF";
import type { BrandShape } from "@/lib/content";

// Fotorealistische 3D-Assets (Higgsfield, „Produktbühne“). Solange ein File
// noch nicht in public/ liegt (siehe scripts/fetch-hero.mjs bzw.
// docs/hero-asset.md), rendert der Client die CSS-Bühne als Fallback —
// ohne 404-Request.
const SLOTS = {
  hero: "/assets/img/3d/hero-stage.webp",
  stage: "/assets/img/3d/stage-steps.webp",
  shapes: {
    square: "/assets/img/3d/shape-square.webp",
    circle: "/assets/img/3d/shape-circle.webp",
    u: "/assets/img/3d/shape-u.webp",
    hexagon: "/assets/img/3d/shape-hexagon.webp",
  } satisfies Record<BrandShape, string>,
};

function ifExists(publicPath: string): string | null {
  return existsSync(path.join(process.cwd(), "public", publicPath)) ? publicPath : null;
}

export default function Page() {
  const shapes: Assets3D["shapes"] = {};
  for (const [shape, p] of Object.entries(SLOTS.shapes)) {
    const found = ifExists(p);
    if (found) shapes[shape as BrandShape] = found;
  }
  const assets: Assets3D = {
    hero: ifExists(SLOTS.hero),
    stage: ifExists(SLOTS.stage),
    shapes,
  };
  return <EntwurfF assets={assets} />;
}
