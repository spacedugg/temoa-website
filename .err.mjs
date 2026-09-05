import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
p.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url()); });
p.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
for (const u of process.argv.slice(2)) {
  console.log("--", u);
  await p.goto("http://localhost:3111" + u, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
}
await b.close();
