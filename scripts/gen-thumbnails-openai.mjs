// Generate all blog covers via the OpenAI image API (gpt-image-1) and
// save them to public/blog/covers/<slug>.png, where the site auto-detects them.
//
// Run (key must be in this environment, NOT only in Vercel):
//   npm i undici
//   OPENAI_API_KEY=sk-... node scripts/gen-thumbnails-openai.mjs
//
// Optional: QUALITY=low|medium|high (default medium), ONLY=slug1,slug2 to test a few.
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("Missing OPENAI_API_KEY in the environment.");
  process.exit(1);
}
const QUALITY = process.env.QUALITY || "medium";
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const COVERS = path.join(process.cwd(), "public/blog/covers");
fs.mkdirSync(COVERS, { recursive: true });

// Route through the agent proxy with its CA bundle, if present.
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
if (proxy) {
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  const caPath = "/root/.ccr/ca-bundle.crt";
  const requestTls = fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : undefined;
  setGlobalDispatcher(new ProxyAgent({ uri: proxy, requestTls }));
  console.log("Using proxy:", proxy);
}

let prompts = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/thumbnail-prompts.json"), "utf8"));
if (ONLY) prompts = prompts.filter((p) => ONLY.includes(p.slug));

async function gen(p, attempt = 1) {
  const out = path.join(COVERS, `${p.slug}.png`);
  if (fs.existsSync(out)) return `skip ${p.slug}`;
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({ model: "gpt-image-1", prompt: p.prompt, size: "1536x1024", quality: QUALITY, n: 1 }),
    });
    if (!res.ok) {
      const t = await res.text();
      if ((res.status === 429 || res.status >= 500) && attempt <= 4) {
        await new Promise((r) => setTimeout(r, attempt * 4000));
        return gen(p, attempt + 1);
      }
      return `FAIL ${p.slug} ${res.status} ${t.slice(0, 160)}`;
    }
    const json = await res.json();
    fs.writeFileSync(out, Buffer.from(json.data[0].b64_json, "base64"));
    return `ok   ${p.slug}`;
  } catch (e) {
    if (attempt <= 4) {
      await new Promise((r) => setTimeout(r, attempt * 4000));
      return gen(p, attempt + 1);
    }
    return `ERR  ${p.slug} ${e.message}`;
  }
}

// Small concurrency to stay under rate limits.
const CONC = Number(process.env.CONC || 3);
let i = 0;
async function worker() {
  while (i < prompts.length) {
    const p = prompts[i++];
    console.log(await gen(p));
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log("done");
