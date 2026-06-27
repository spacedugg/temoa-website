import { list } from "@vercel/blob";

/* Reads the salesroom reference gallery from the shared Vercel Blob.
 * Only the references/ prefix is touched. Path convention:
 *   references/<category>/<listingId>/<slot>-<filename>
 * Without a BLOB_READ_WRITE_TOKEN this returns empty data and the
 * design-examples page falls back to placeholder mock-ups. */

export type RefCategory = "main_images" | "a_plus" | "brand_store" | "brand_story";

export type RefImage = { url: string; slot: number };
export type RefListing = { id: string; images: RefImage[] };
export type RefData = Record<RefCategory, RefListing[]>;

const CATS: RefCategory[] = ["main_images", "a_plus", "brand_store", "brand_story"];

function empty(): RefData {
  return { main_images: [], a_plus: [], brand_store: [], brand_story: [] };
}

let _cache: RefData | null = null;

export async function getReferences(): Promise<RefData> {
  if (_cache) return _cache;
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const data = empty();
  if (!token) return data;

  try {
    const byListing: Record<RefCategory, Map<string, RefImage[]>> = {
      main_images: new Map(),
      a_plus: new Map(),
      brand_store: new Map(),
      brand_story: new Map(),
    };

    let cursor: string | undefined;
    do {
      const res = await list({ prefix: "references/", token, limit: 1000, cursor });
      for (const b of res.blobs) {
        const m = b.pathname.match(/^references\/([^/]+)\/([^/]+)\/(\d+)-/);
        if (!m) continue;
        const cat = m[1] as RefCategory;
        if (!CATS.includes(cat)) continue;
        const listingId = m[2];
        const slot = parseInt(m[3], 10);
        const map = byListing[cat];
        if (!map.has(listingId)) map.set(listingId, []);
        map.get(listingId)!.push({ url: b.url, slot });
      }
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);

    for (const cat of CATS) {
      data[cat] = [...byListing[cat].entries()]
        .map(([id, images]) => ({ id, images: images.sort((a, b) => a.slot - b.slot) }))
        .filter((l) => l.images.length > 0);
    }
    _cache = data;
    return data;
  } catch {
    return empty();
  }
}
