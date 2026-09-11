import { cases, type CaseStudy } from "./cases";
import { getAllPosts } from "./blog";
import { STANDARD } from "./i18n";

/* ============================================================
   Welche Bilder auf welcher Seite stehen.

   Grundlage der Bildeintraege in der sitemap.xml. Google indexiert ein Bild
   nur, wenn es weiss, auf welcher Seite es steht; ohne diese Zuordnung
   bleiben knapp zweihundert Produktbilder, Listingbilder und A+ Module
   unsichtbar, obwohl sie ausgeliefert werden.

   Zwei Quellen, und beide sind die richtigen:

   1. Die Faelle kommen aus `cases.ts`. Dort steht ohnehin, welches Material zu
      welcher Marke gehoert, und beim naechsten Fall stimmt die Sitemap von
      selbst.

   2. Die uebrigen Seiten stehen unten als Liste. Sie ist von Hand gepflegt,
      und das ist Absicht: eine automatische Ableitung aus `public/` wuerde
      auch Dateien aufnehmen, die keine Seite mehr rendert, und Google
      abgemeldete Bilder anbieten. Wer eine Sektion umbaut, aendert die Zeile
      hier mit.

   Die Bildstrecken der Marken sind vollstaendige Verzeichnisse und stehen
   deshalb als Bereich (`l-1` bis `l-7`) und nicht als einzelne Namen.
   ============================================================ */

/** `/bilder/miganeo/l-1.webp` bis `l-7.webp`. */
function reihe(ordner: string, praefix: string, bis: number, von = 1): string[] {
  return Array.from({ length: bis - von + 1 }, (_, i) => `${ordner}/${praefix}-${von + i}.webp`);
}

const MIGANEO_LISTING = [
  ...reihe("/bilder/miganeo", "l", 7),
  ...reihe("/bilder/miganeo", "a", 6),
];

/* Vierzehn Kundenlogos. Zwei davon liegen zusaetzlich als weisse Fassung vor
   (`-weiss`), weil sie als Silhouette zu einem Klecks wuerden; auf der Seite
   steht je Marke nur eine der beiden. */
const KUNDENLOGOS = Array.from({ length: 14 }, (_, i) =>
  i < 2 ? `/clients/${i + 1}-weiss.webp` : `/clients/${i + 1}.webp`
);

/* Die neun Portraits der Teamreihe, in der Reihenfolge der Komponente. */
const TEAM = [
  "Marvin",
  "Jonas",
  "Anzelika",
  "Marina",
  "Ole",
  "Vadim",
  "Dias",
  "Burak",
  "Noor",
].map((n) => `/team/${n}.webp`);

/** Alles Material, das eine Fallseite zeigt. */
function bilderEinesFalls(c: CaseStudy): string[] {
  const aus: string[] = [];
  if (c.bgImage) aus.push(c.bgImage);
  if (c.logo) aus.push(c.logo);
  if (c.images) aus.push(...c.images);
  for (const p of c.arbeit?.produkte ?? []) {
    aus.push(p.haupt, ...p.strecke);
    if (p.varianten) aus.push(...p.varianten);
    if (p.palette) aus.push(...p.palette);
    if (p.aplus) aus.push(...p.aplus.bahnen);
    /* Das Standbild des Videos, nicht das Video selbst: eine Bild-Sitemap
       nimmt nur Bilder. */
    if (p.video) aus.push(p.video.poster);
  }
  return aus;
}

/* Die Seiten ohne eigene Datenquelle. Pfade ohne Sprachpraefix, wie in der
   sitemap.xml. */
const FESTE_SEITEN: Record<string, string[]> = {
  "/": [
    /* Die Beschriftung steckt im Hero-Bild, deshalb liegt es in zwei Sprachen
       vor. Beide Dateien stehen hier: der Eintrag der Startseite gilt ueber
       `alternates` fuer beide Fassungen. Die englische stuende sonst in
       keiner Sitemap. */
    "/bilder/h-listing.webp",
    "/bilder/h-listing-en.webp",
    "/bilder/n-ursache.webp",
    "/bilder/n-organic.webp",
    "/bilder/n-leistungen.webp",
    ...KUNDENLOGOS,
    ...MIGANEO_LISTING,
    "/team/Main.webp",
    ...TEAM,
    "/team/clemens-frei.webp",
  ],
  "/full-service": ["/bilder/n-team.webp", "/bilder/n-reporting.webp", "/team/clemens-frei.webp"],
  "/leistungen/strategie": ["/bilder/s-strategie.webp", "/team/clemens-frei.webp"],
  "/leistungen/listing-seo": [
    "/bilder/s-content.webp",
    "/bilder/s-content-ansatz.webp",
    ...reihe("/bilder/kemes", "l", 7),
    ...reihe("/bilder/futum", "a", 3),
    ...reihe("/bilder/rainfactory", "bs", 2),
    "/team/clemens-frei.webp",
  ],
  "/leistungen/ppc-advertising": ["/bilder/s-advertising.webp", "/team/clemens-frei.webp"],
  "/leistungen/account-management": [
    "/bilder/s-account.webp",
    "/bilder/s-account-monitor.webp",
    "/team/clemens-frei.webp",
  ],
  "/leistungen/internationalisierung": [
    "/bilder/s-international.webp",
    "/bilder/s-international-kugel.webp",
    "/team/clemens-frei.webp",
  ],
  "/design-beispiele": MIGANEO_LISTING,
  "/gespraech-vereinbaren": ["/team/clemens-frei.webp"],
};

/**
 * Die Bilder einer Seite, als Pfade ohne Adresse.
 *
 * `ziel` ist der Pfad ohne Sprachpraefix. Unbekannte Seiten liefern eine leere
 * Liste: ein Eintrag ohne Bilder ist in Ordnung, ein falsch zugeordnetes Bild
 * nicht.
 */
export function bilderDerSeite(ziel: string): string[] {
  if (ziel === "/ergebnisse") {
    return cases.flatMap((c) => [c.bgImage, c.logo].filter((b): b is string => !!b));
  }

  const fall = ziel.startsWith("/ergebnisse/")
    ? cases.find((c) => c.slug === ziel.slice("/ergebnisse/".length))
    : undefined;
  if (fall) return bilderEinesFalls(fall);

  if (ziel.startsWith("/blog/") && !ziel.startsWith("/blog/kategorie/")) {
    const slug = ziel.slice("/blog/".length);
    const post = getAllPosts(STANDARD).find((p) => p.slug === slug);
    return post?.image ? [post.image] : [];
  }

  return FESTE_SEITEN[ziel] ?? [];
}
