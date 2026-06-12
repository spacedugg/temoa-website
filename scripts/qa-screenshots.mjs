// QA-Screenshots: rendert jede Seite bei 1440px und 390px, prüft horizontalen
// Overflow und Konsolenfehler. Full-Page-Bilder werden aus Viewport-Kacheln
// gestitcht (CDP captureBeyondViewport liefert in dieser Umgebung schwarze
// Flächen bei langen Seiten).
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import sharp from "sharp";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const PATHS = process.argv.slice(2).length ? process.argv.slice(2) : ["/entwurf-a", "/entwurf-b", "/entwurf-c"];
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];
const EXEC = process.env.CHROME_PATH;

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch({
  executablePath: EXEC,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--use-angle=swiftshader", "--force-color-profile=srgb"],
});

let failed = false;

for (const path of PATHS) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(String(err)));

    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
    // Für das Kachel-Stitching: Sticky-Elemente in den Fluss legen, damit sie
    // nicht in jeder Kachel dupliziert werden.
    await page.addStyleTag({ content: "[class*='sticky'] { position: static !important; }" });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const tiles = [];
    for (let y = 0; y < totalHeight; y += vp.height) {
      const target = Math.min(y, totalHeight - vp.height);
      if (y > 0) {
        // Fixierte Header nur in der ersten Kachel zeigen
        await page.evaluate(() => {
          for (const el of document.querySelectorAll("header, [class*='fixed']")) {
            if (getComputedStyle(el).position === "fixed") el.style.visibility = "hidden";
          }
        });
      }
      await page.evaluate((t) => window.scrollTo(0, t), target);
      await page.waitForTimeout(350);
      const buf = await page.screenshot();
      // Letzte Kachel: nur den noch fehlenden unteren Streifen behalten
      const cropTop = y > target ? y - target : 0;
      tiles.push(
        cropTop > 0
          ? await sharp(buf).extract({ left: 0, top: cropTop, width: vp.width, height: vp.height - cropTop }).toBuffer()
          : buf
      );
      if (y + vp.height >= totalHeight) break;
    }

    const heights = await Promise.all(tiles.map(async (t) => (await sharp(t).metadata()).height));
    const stitched = sharp({
      create: {
        width: vp.width,
        height: heights.reduce((a, b) => a + b, 0),
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    });
    let offset = 0;
    const composites = tiles.map((t, i) => {
      const c = { input: t, left: 0, top: offset };
      offset += heights[i];
      return c;
    });

    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
    });
    const hasOverflow = overflow.scrollWidth > overflow.clientWidth;

    const slug = path.replaceAll("/", "") || "home";
    const file = `screenshots/${slug}-${vp.name}.png`;
    await stitched.composite(composites).png().toFile(file);

    const status = [];
    if (hasOverflow) {
      status.push(`OVERFLOW ${overflow.scrollWidth}>${overflow.clientWidth}`);
      failed = true;
    }
    if (errors.length) {
      status.push(`CONSOLE: ${errors.join(" | ").slice(0, 300)}`);
      failed = true;
    }
    console.log(`${path} @${vp.width}px -> ${file} ${status.length ? "FAIL " + status.join(" ; ") : "OK"}`);
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
