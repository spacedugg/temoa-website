import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { IconName } from "@/components/ui/Icon";

/* ============================================================
 *  Blog content layer. Reads the markdown articles in
 *  /content/blog at build time, parses frontmatter + body,
 *  and exposes typed, serialisable data to the pages.
 * ============================================================ */

const DIR = path.join(process.cwd(), "content/blog");
const COVERS_DIR = path.join(process.cwd(), "public/blog/covers");

/** If a generated cover image was dropped into /public/blog/covers/<slug>.<ext>,
 *  use it. Otherwise the page falls back to the generated SVG cover. */
function findCover(slug: string): string | undefined {
  for (const ext of ["webp", "jpg", "jpeg", "png", "avif"]) {
    const file = `${slug}.${ext}`;
    try {
      if (fs.existsSync(path.join(COVERS_DIR, file))) return `/blog/covers/${file}`;
    } catch {
      /* ignore */
    }
  }
  return undefined;
}

export type Category = {
  key: string; // exact "kategorie" value in the frontmatter
  slug: string;
  label: string;
  short: string;
  accent: string;
  icon: IconName;
  blurb: string;
};

export const categories: Category[] = [
  {
    key: "Amazon PPC & Advertising",
    slug: "ppc-advertising",
    label: "PPC & Advertising",
    short: "PPC",
    accent: "#FF9900",
    icon: "ads",
    blurb: "ACoS, TACoS, Kampagnenstruktur und alles, was Werbung profitabel macht.",
  },
  {
    key: "Listing, SEO & Conversion",
    slug: "listing-seo",
    label: "Listing, SEO & Conversion",
    short: "Listing & SEO",
    accent: "#FF3131",
    icon: "content",
    blurb: "Wie aus Klicks Käufe werden: Content, Ranking und Conversion-Stärke.",
  },
  {
    key: "FBA, Logistik & Inventar",
    slug: "fba-logistik",
    label: "FBA, Logistik & Inventar",
    short: "FBA & Logistik",
    accent: "#2A9BD8",
    icon: "layers",
    blurb: "Gebühren, Bestand und Versand im Griff, damit Rankings nicht wegbrechen.",
  },
  {
    key: "Marke schützen & Account-Management",
    slug: "marke-account",
    label: "Marke & Account-Management",
    short: "Marke & Account",
    accent: "#023047",
    icon: "shield",
    blurb: "Brand Registry, Hijacker, Account Health: die Marke und das Konto schützen.",
  },
  {
    key: "Strategie & Geschäftsmodelle",
    slug: "strategie",
    label: "Strategie & Geschäftsmodelle",
    short: "Strategie",
    accent: "#0E7CA0",
    icon: "strategy",
    blurb: "Geschäftsmodelle, Skalierung und die Entscheidungen vor der ersten Maßnahme.",
  },
  {
    key: "Operativ & Kundenservice",
    slug: "operativ-service",
    label: "Operativ & Kundenservice",
    short: "Service",
    accent: "#0B4D6B",
    icon: "account",
    blurb: "Retouren, Reklamationen und der operative Alltag rund um den Verkauf.",
  },
  {
    key: "KI & Zukunft",
    slug: "ki-zukunft",
    label: "KI & Zukunft",
    short: "KI & Zukunft",
    accent: "#FF6B1F",
    icon: "spark",
    blurb: "Rufus, COSMO und die KI-Suche: worauf Listings künftig optimiert werden.",
  },
  {
    key: "Agentur & Zusammenarbeit",
    slug: "zusammenarbeit",
    label: "Agentur & Zusammenarbeit",
    short: "Zusammenarbeit",
    accent: "#2E7D9A",
    icon: "target",
    blurb: "Worauf es bei der Wahl und der Zusammenarbeit mit einem Partner ankommt.",
  },
];

const catByKey = new Map(categories.map((c) => [c.key, c]));
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  categoryKey: string;
  categorySlug: string;
  categoryLabel: string;
  categoryShort: string;
  categoryIcon: IconName;
  accent: string;
  readingMinutes: number;
  order: number;
  /** Optional generated cover image; falls back to the SVG cover when absent. */
  image?: string;
};

export type Post = PostMeta & { html: string };

function firstValue(line: string): string {
  const idx = line.indexOf(":");
  let v = line.slice(idx + 1).trim();
  if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
  return v;
}

function parseFile(filename: string): Post {
  const raw = fs.readFileSync(path.join(DIR, filename), "utf8");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const front = fm ? fm[1] : "";
  let body = fm ? raw.slice(fm[0].length) : raw;

  const get = (key: string) =>
    front.split("\n").find((l) => l.trimStart().startsWith(`${key}:`)) ?? "";

  const title = firstValue(get("title"));
  const description = firstValue(get("meta_description"));
  const kategorie = firstValue(get("kategorie"));
  let keywords: string[] = [];
  const kwLine = get("keywords");
  const kwMatch = kwLine.match(/\[(.*)\]/);
  if (kwMatch) {
    try {
      keywords = JSON.parse(`[${kwMatch[1]}]`);
    } catch {
      keywords = [];
    }
  }

  // Drop the leading H1 (shown separately in the page hero).
  body = body.replace(/^\s*#\s+.*\n/, "").trim();

  const words = body.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(2, Math.round(words / 200));

  const numMatch = filename.match(/^(\d+)/);
  const order = numMatch ? parseInt(numMatch[1], 10) : 999;
  const slug = filename.replace(/^\d+_/, "").replace(/\.md$/, "");

  const cat = catByKey.get(kategorie);

  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(body) as string;

  return {
    slug,
    title,
    description,
    keywords,
    categoryKey: kategorie,
    categorySlug: cat?.slug ?? "strategie",
    categoryLabel: cat?.label ?? kategorie,
    categoryShort: cat?.short ?? "Beitrag",
    categoryIcon: cat?.icon ?? "strategy",
    accent: cat?.accent ?? "#0E7CA0",
    readingMinutes,
    order,
    image: findCover(slug),
    html,
  };
}

let _cache: Post[] | null = null;
function allPosts(): Post[] {
  if (_cache) return _cache;
  const files = fs.readdirSync(DIR).filter((f) => /^\d+_.*\.md$/.test(f));
  _cache = files.map(parseFile).sort((a, b) => a.order - b.order);
  return _cache;
}

const stripHtml = ({ html, ...meta }: Post): PostMeta => meta;

export function getAllPosts(): PostMeta[] {
  return allPosts().map(stripHtml);
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPost(slug);
  if (!post) return [];
  return getAllPosts()
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== slug)
    .slice(0, limit);
}

export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getAllPosts()) counts[p.categorySlug] = (counts[p.categorySlug] ?? 0) + 1;
  return counts;
}

/** Curated, most useful articles for the homepage strip. */
const FEATURED = [
  "amazon-marketingstrategie-ueberblick",
  "acos-erklaert",
  "a-plus-content",
  "kampagnenstruktur-ppc",
  "amazon-flywheel",
  "amazon-agentur-waehlen",
];

export function getFeaturedPosts(limit = 6): PostMeta[] {
  const all = getAllPosts();
  const picked = FEATURED.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as PostMeta[];
  return picked.slice(0, limit);
}
