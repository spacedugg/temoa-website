import { createClient, type Client } from "@libsql/client";

/* Liest die Referenz-Galerie (Design-Beispiele) aus der Sales-Room-
 * Datenbank (Turso / libsql). Quelle der Wahrheit ist NICHT der Blob,
 * sondern die Tabellen reference_listings + reference_images: dort legt das
 * Sales-Room-Admin Kategorie, Layout (mit/ohne Lücke), Reihenfolge
 * (Hintergrund = order 0), Bildmaße, Medientyp und Brand-Story-Karten-
 * Metadaten fest. Die Bild-URLs in der DB zeigen direkt auf den Blob.
 *
 * Nötige Env-Variablen (read-only Token genügt):
 *   TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
 */

export type RefCategory = "main_images" | "a_plus" | "brand_store" | "brand_story";
export type RefLayout =
  | "listing_grid"
  | "ebc_gapped"
  | "ebc_seamless"
  | "brand_video"
  | "brand_story";

export type AsinGridSubImage = { url: string; width?: number | null; height?: number | null };
export type RefCardMetadata = {
  cardType: "media_asset" | "asin_grid";
  headline?: string | null;
  linkLabel?: string | null;
  asinImages?: (AsinGridSubImage | null)[];
};

export type RefImage = {
  url: string;
  order: number;
  width: number | null;
  height: number | null;
  mediaType: "image" | "video";
  metadata: RefCardMetadata | null;
};
export type RefListing = {
  id: string;
  title: string | null;
  category: RefCategory;
  layout: RefLayout;
  images: RefImage[];
};
export type RefData = Record<RefCategory, RefListing[]>;

export type RefDiag = {
  source: "db" | "none";
  note?: string;
  listingCount: number;
  imageCount: number;
  counts: Record<RefCategory, number>;
  envKeys: string[];
};

const CATS: RefCategory[] = ["main_images", "a_plus", "brand_store", "brand_story"];

function empty(): RefData {
  return { main_images: [], a_plus: [], brand_store: [], brand_story: [] };
}

function envKeysSeen(): string[] {
  return Object.keys(process.env)
    .filter((k) => /turso|blob|database/i.test(k))
    .sort();
}

let _client: Client | null = null;
function client(): Client | null {
  if (_client) return _client;
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) return null;
  _client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  return _client;
}

function parseMeta(raw: unknown): RefCardMetadata | null {
  if (raw == null) return null;
  try {
    const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (obj && typeof obj === "object" && "cardType" in obj) return obj as RefCardMetadata;
  } catch {
    /* ignore malformed metadata */
  }
  return null;
}

const num = (v: unknown): number | null =>
  typeof v === "number" ? v : v == null ? null : Number(v) || null;

let _cache: { data: RefData; diag: RefDiag } | null = null;

export async function getReferencesRaw(): Promise<{ data: RefData; diag: RefDiag }> {
  if (_cache) return _cache;
  const data = empty();
  const diag: RefDiag = {
    source: "none",
    listingCount: 0,
    imageCount: 0,
    counts: { main_images: 0, a_plus: 0, brand_store: 0, brand_story: 0 },
    envKeys: envKeysSeen(),
  };

  const db = client();
  if (!db) {
    diag.note = "TURSO_DATABASE_URL fehlt — Design-Beispiele kommen aus der Sales-Room-DB.";
    return { data, diag };
  }

  try {
    const [listingsRes, imagesRes] = await Promise.all([
      db.execute(
        `SELECT id, category, layout, title FROM reference_listings WHERE active = 1 ORDER BY "order" ASC`,
      ),
      db.execute(
        `SELECT listing_id, url, media_type, width, height, "order", metadata
         FROM reference_images WHERE active = 1 ORDER BY "order" ASC`,
      ),
    ]);

    const imagesByListing = new Map<string, RefImage[]>();
    for (const r of imagesRes.rows) {
      const listingId = String(r.listing_id ?? "");
      if (!listingId) continue;
      const img: RefImage = {
        url: String(r.url ?? ""),
        order: Number(r.order ?? 0),
        width: num(r.width),
        height: num(r.height),
        mediaType: r.media_type === "video" ? "video" : "image",
        metadata: parseMeta(r.metadata),
      };
      if (!img.url) continue;
      if (!imagesByListing.has(listingId)) imagesByListing.set(listingId, []);
      imagesByListing.get(listingId)!.push(img);
    }

    for (const r of listingsRes.rows) {
      const category = String(r.category ?? "") as RefCategory;
      if (!CATS.includes(category)) continue;
      const id = String(r.id ?? "");
      const images = (imagesByListing.get(id) ?? []).sort((a, b) => a.order - b.order);
      if (images.length === 0) continue;
      data[category].push({
        id,
        title: r.title != null ? String(r.title) : null,
        category,
        layout: String(r.layout ?? "listing_grid") as RefLayout,
        images,
      });
    }

    diag.source = "db";
    diag.listingCount = CATS.reduce((n, c) => n + data[c].length, 0);
    for (const c of CATS) diag.counts[c] = data[c].reduce((n, l) => n + l.images.length, 0);
    diag.imageCount = CATS.reduce((n, c) => n + diag.counts[c], 0);
    if (diag.listingCount === 0)
      diag.note = "DB verbunden, aber keine aktiven Referenz-Listings gefunden.";
  } catch (err) {
    diag.note = `DB-Abfrage fehlgeschlagen: ${err instanceof Error ? err.message : "unbekannt"}`;
  }

  _cache = { data, diag };
  return _cache;
}

export async function getReferences(): Promise<RefData> {
  return (await getReferencesRaw()).data;
}
