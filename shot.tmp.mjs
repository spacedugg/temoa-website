import { chromium } from "playwright";
const SP = "/tmp/claude-0/-home-user-temoa-website/4219f625-f657-5bf8-8a71-0b14a3079112/scratchpad";
const ziele = JSON.parse(process.argv[2] || "[]");
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const z of ziele) {
  const p = await b.newPage({ viewport: { width: z.w || 1440, height: 1100 }, deviceScaleFactor: 1 });
  await p.goto("http://127.0.0.1:3111" + z.pfad, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: "html,body{scroll-behavior:auto !important}" });
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total + 1400; y += 200) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(38); }
  await p.waitForTimeout(800);
  const sek = p.locator(z.sel || "main > section");
  const anz = await sek.count();
  const idx = z.idx ?? [...Array(anz).keys()];
  for (const i of idx) {
    if (i >= anz) continue;
    const s = sek.nth(i);
    await s.scrollIntoViewIfNeeded();
    await p.waitForTimeout(380);
    await s.screenshot({ path: `${SP}/${z.name}-${i}.png` });
  }
  console.log(z.name, "Sektionen", anz, "Hoehe", total);
  await p.close();
}
await b.close();
