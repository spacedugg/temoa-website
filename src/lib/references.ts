import { list } from "@vercel/blob";

/* Reads the salesroom reference gallery from the shared Vercel Blob.
 * Only the references/ prefix is touched. Path convention:
 *   references/<category>/<listingId>/<slot>-<filename>
 * Robust to the token env-var name (a connected store may use a prefix)
 * and self-diagnosing via getReferencesRaw(). */

export type RefCategory = "main_images" | "a_plus" | "brand_store" | "brand_story";

export type RefImage = { url: string; slot: number };
export type RefListing = { id: string; images: RefImage[] };
export type RefData = Record<RefCategory, RefListing[]>;

export type RefDiag = {
  tokenCount: number;
  blobCount: number;
  matchedCount: number;
  sample: string[];
  counts: Record<RefCategory, number>;
};

const CATS: RefCategory[] = ["main_images", "a_plus", "brand_store", "brand_story"];

function empty(): RefData {
  return { main_images: [], a_plus: [], brand_store: [], brand_story: [] };
}

/** Every env var whose name ends in BLOB_READ_WRITE_TOKEN (handles the
 *  optional store prefix Vercel adds when connecting a second store). */
function blobTokens(): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(process.env)) {
    if (v && /BLOB_READ_WRITE_TOKEN$/.test(k)) out.push(v);
  }
  return [...new Set(out)];
}

let _cache: { data: RefData; diag: RefDiag } | null = null;

export async function getReferencesRaw(): Promise<{ data: RefData; diag: RefDiag }> {
  if (_cache) return _cache;
  const data = empty();
  const diag: RefDiag = {
    tokenCount: 0,
    blobCount: 0,
    matchedCount: 0,
    sample: [],
    counts: { main_images: 0, a_plus: 0, brand_store: 0, brand_story: 0 },
  };

  const tokens = blobTokens();
  diag.tokenCount = tokens.length;

  for (const token of tokens) {
    try {
      const all: { pathname: string; url: string }[] = [];
      let cursor: string | undefined;
      do {
        const res = await list({ prefix: "references/", token, limit: 1000, cursor });
        for (const b of res.blobs) all.push({ pathname: b.pathname, url: b.url });
        cursor = res.hasMore ? res.cursor : undefined;
      } while (cursor);

      if (all.length === 0) continue; // try next token

      diag.blobCount = all.length;
      diag.sample = all.slice(0, 6).map((b) => b.pathname);

      const byListing: Record<RefCategory, Map<string, RefImage[]>> = {
        main_images: new Map(),
        a_plus: new Map(),
        brand_store: new Map(),
        brand_story: new Map(),
      };
      for (const b of all) {
        const m = b.pathname.match(/references\/([^/]+)\/([^/]+)\/(\d+)/);
        if (!m) continue;
        const cat = m[1] as RefCategory;
        if (!CATS.includes(cat)) continue;
        const map = byListing[cat];
        if (!map.has(m[2])) map.set(m[2], []);
        map.get(m[2])!.push({ url: b.url, slot: parseInt(m[3], 10) });
      }
      for (const cat of CATS) {
        data[cat] = [...byListing[cat].entries()]
          .map(([id, images]) => ({ id, images: images.sort((a, b) => a.slot - b.slot) }))
          .filter((l) => l.images.length > 0);
        diag.counts[cat] = data[cat].reduce((n, l) => n + l.images.length, 0);
      }
      diag.matchedCount = CATS.reduce((n, c) => n + diag.counts[c], 0);
      _cache = { data, diag };
      return _cache;
    } catch {
      // try next token
    }
  }

  return { data, diag };
}

export async function getReferences(): Promise<RefData> {
  return (await getReferencesRaw()).data;
}
