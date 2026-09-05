import { chromium } from "playwright";
const seiten = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
for (const s of seiten) {
  const [pfad, name] = s.split("::");
  await p.goto("http://localhost:3111" + pfad, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await p.waitForTimeout(230);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${name}.png`, fullPage: true });
  console.log(name, "ok");
}
await b.close();
