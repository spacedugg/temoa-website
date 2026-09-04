// Screenshots einer Seite, Sektion fuer Sektion.
// Aufruf: node seiten.mjs <pfad> <praefix> [maxSektionen]
import { chromium } from "playwright";
const SP = "/tmp/claude-0/-home-user-temoa-website/4219f625-f657-5bf8-8a71-0b14a3079112/scratchpad";
const [pfad, praefix, maxRaw] = process.argv.slice(2);
const max = Number(maxRaw ?? 8);

const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" }).catch(() => {});
await p.goto(`http://127.0.0.1:3100${pfad}`, { waitUntil: "networkidle" });
await p.addStyleTag({ content: "html{scroll-behavior:auto !important}" });

const hoehe = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < hoehe; y += 400) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(90);
}
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(500);

const anzahl = await p.locator("main section").count();
console.log(`${pfad}: ${anzahl} Sektionen, Seitenhoehe ${hoehe}`);
for (let i = 0; i < Math.min(anzahl, max); i++) {
  const s = p.locator("main section").nth(i);
  try {
    await s.scrollIntoViewIfNeeded();
    await p.waitForTimeout(450);
    await s.screenshot({ path: `${SP}/${praefix}-${i}.png` });
    console.log(`  ${praefix}-${i}.png`);
  } catch (e) {
    console.log(`  ${i} uebersprungen: ${String(e).slice(0, 80)}`);
  }
}
await b.close();
