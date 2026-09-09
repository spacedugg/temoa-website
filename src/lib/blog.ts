import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { IconName } from "@/components/ui/Icon";
import { STANDARD, type Sprache } from "./i18n";

/* ============================================================
 *  Blog content layer. Reads the markdown articles in
 *  /content/blog at build time, parses frontmatter + body,
 *  and exposes typed, serialisable data to the pages.
 *
 *  Die englischen Fassungen liegen unter `content/blog/en` und tragen
 *  denselben Dateinamen. Damit ist die Adresse eines Beitrags in beiden
 *  Sprachen dieselbe, und `hreflang` kann die beiden Fassungen paaren, ohne
 *  dass irgendwo eine Zuordnungstabelle gepflegt werden muss.
 *
 *  Was auf Englisch noch nicht vorliegt, erscheint dort auch nicht. Ein
 *  deutscher Beitrag unter englischer Kopfzeile waere schlechter als ein
 *  kuerzeres Verzeichnis: der Besucher klickt und findet eine Sprache vor,
 *  die er nicht liest.
 * ============================================================ */

const WURZEL = path.join(process.cwd(), "content/blog");
const verzeichnis = (sprache: Sprache) =>
  sprache === STANDARD ? WURZEL : path.join(WURZEL, sprache);
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

/* Der Schluessel und die Adresse einer Kategorie bleiben deutsch: der
   Schluessel steht im Frontmatter jeder Datei, die Adresse ist gesetzt.
   Uebersetzt werden Beschriftung und Beschreibung. */
type Zweisprachig = Record<Sprache, string>;

export type Category = {
  key: string; // exact "kategorie" value in the frontmatter
  slug: string;
  label: Zweisprachig;
  short: Zweisprachig;
  accent: string;
  icon: IconName;
  blurb: Zweisprachig;
};

/** Eine Kategorie, aufgeloest in eine Sprache. */
export type Kategorie = {
  key: string;
  slug: string;
  label: string;
  short: string;
  accent: string;
  icon: IconName;
  blurb: string;
};

const categories: Category[] = [
  {
    key: "Amazon PPC & Advertising",
    slug: "ppc-advertising",
    label: { de: "PPC & Advertising", en: "PPC & Advertising" },
    short: { de: "PPC", en: "PPC" },
    accent: "#FF9900",
    icon: "ads",
    blurb: {
      de: "ACoS, TACoS, Kampagnenstruktur und alles, was Werbung profitabel macht.",
      en: "ACoS, TACoS, campaign structure and everything that makes advertising profitable.",
    },
  },
  {
    key: "Listing, SEO & Conversion",
    slug: "listing-seo",
    label: { de: "Listing, SEO & Conversion", en: "Listing, SEO & conversion" },
    short: { de: "Listing & SEO", en: "Listing & SEO" },
    accent: "#FF3131",
    icon: "content",
    blurb: {
      de: "Wie aus Klicks Käufe werden: Content, Ranking und Conversion-Stärke.",
      en: "How clicks turn into orders: content, ranking and conversion strength.",
    },
  },
  {
    key: "FBA, Logistik & Inventar",
    slug: "fba-logistik",
    label: { de: "FBA, Logistik & Inventar", en: "FBA, logistics & inventory" },
    short: { de: "FBA & Logistik", en: "FBA & logistics" },
    accent: "#2A9BD8",
    icon: "layers",
    blurb: {
      de: "Gebühren, Bestand und Versand im Griff, damit Rankings nicht wegbrechen.",
      en: "Fees, stock and shipping under control, so rankings do not collapse.",
    },
  },
  {
    key: "Marke schützen & Account-Management",
    slug: "marke-account",
    label: { de: "Marke & Account-Management", en: "Brand & account management" },
    short: { de: "Marke & Account", en: "Brand & account" },
    accent: "#023047",
    icon: "shield",
    blurb: {
      de: "Brand Registry, Hijacker, Account Health: die Marke und das Konto schützen.",
      en: "Brand Registry, hijackers, account health: protecting the brand and the account.",
    },
  },
  {
    key: "Strategie & Geschäftsmodelle",
    slug: "strategie",
    label: { de: "Strategie & Geschäftsmodelle", en: "Strategy & business models" },
    short: { de: "Strategie", en: "Strategy" },
    accent: "#0E7CA0",
    icon: "strategy",
    blurb: {
      de: "Geschäftsmodelle, Skalierung und die Entscheidungen vor der ersten Maßnahme.",
      en: "Business models, scaling and the decisions that come before the first move.",
    },
  },
  {
    key: "Operativ & Kundenservice",
    slug: "operativ-service",
    label: { de: "Operativ & Kundenservice", en: "Operations & customer service" },
    short: { de: "Service", en: "Service" },
    accent: "#0B4D6B",
    icon: "account",
    blurb: {
      de: "Retouren, Reklamationen und der operative Alltag rund um den Verkauf.",
      en: "Returns, complaints and the day-to-day operations around selling.",
    },
  },
  {
    key: "KI & Zukunft",
    slug: "ki-zukunft",
    label: { de: "KI & Zukunft", en: "AI & what comes next" },
    short: { de: "KI & Zukunft", en: "AI & next" },
    accent: "#FF6B1F",
    icon: "spark",
    blurb: {
      de: "Rufus, COSMO und die KI-Suche: worauf Listings künftig optimiert werden.",
      en: "Rufus, COSMO and AI search: what listings will be built for from here.",
    },
  },
  {
    key: "Agentur & Zusammenarbeit",
    label: { de: "Partner & Zusammenarbeit", en: "Partners & working together" },
    slug: "zusammenarbeit",
    short: { de: "Zusammenarbeit", en: "Working together" },
    accent: "#2E7D9A",
    icon: "target",
    blurb: {
      de: "Worauf es bei der Wahl und der Zusammenarbeit mit einem Partner ankommt.",
      en: "What matters when choosing a partner and when working with one.",
    },
  },
];

const catByKey = new Map(categories.map((c) => [c.key, c]));

function aufloesen(c: Category, sprache: Sprache): Kategorie {
  return {
    key: c.key,
    slug: c.slug,
    label: c.label[sprache],
    short: c.short[sprache],
    accent: c.accent,
    icon: c.icon,
    blurb: c.blurb[sprache],
  };
}

export function kategorien(sprache: Sprache): Kategorie[] {
  return categories.map((c) => aufloesen(c, sprache));
}

export function getCategory(slug: string, sprache: Sprache): Kategorie | undefined {
  const c = categories.find((x) => x.slug === slug);
  return c && aufloesen(c, sprache);
}

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

function parseFile(filename: string, sprache: Sprache): Post {
  const raw = fs.readFileSync(path.join(verzeichnis(sprache), filename), "utf8");
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
    categoryLabel: cat ? cat.label[sprache] : kategorie,
    categoryShort: cat ? cat.short[sprache] : "",
    categoryIcon: cat?.icon ?? "strategy",
    accent: cat?.accent ?? "#0E7CA0",
    readingMinutes,
    order,
    image: findCover(slug),
    html,
  };
}

const _cache: Partial<Record<Sprache, Post[]>> = {};

function allPosts(sprache: Sprache): Post[] {
  const da = _cache[sprache];
  if (da) return da;
  let files: string[] = [];
  try {
    files = fs.readdirSync(verzeichnis(sprache)).filter((f) => /^\d+_.*\.md$/.test(f));
  } catch {
    /* Das Verzeichnis gibt es noch nicht: dann gibt es in dieser Sprache
       keine Beitraege, und das Verzeichnis bleibt leer. Kein Grund, den Bau
       abzubrechen. */
  }
  const liste = files.map((f) => parseFile(f, sprache)).sort((a, b) => a.order - b.order);
  _cache[sprache] = liste;
  return liste;
}

const stripHtml = ({ html, ...meta }: Post): PostMeta => meta;

export function getAllPosts(sprache: Sprache): PostMeta[] {
  return allPosts(sprache).map(stripHtml);
}

export function getPost(slug: string, sprache: Sprache): Post | undefined {
  return allPosts(sprache).find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string, sprache: Sprache): PostMeta[] {
  return getAllPosts(sprache).filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedPosts(slug: string, sprache: Sprache, limit = 3): PostMeta[] {
  const post = getPost(slug, sprache);
  if (!post) return [];
  return getAllPosts(sprache)
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== slug)
    .slice(0, limit);
}

export function categoryCounts(sprache: Sprache): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getAllPosts(sprache)) counts[p.categorySlug] = (counts[p.categorySlug] ?? 0) + 1;
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

export function getFeaturedPosts(sprache: Sprache, limit = 6): PostMeta[] {
  const all = getAllPosts(sprache);
  const picked = FEATURED.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as PostMeta[];
  return picked.slice(0, limit);
}
