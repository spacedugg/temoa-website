import type { MetadataRoute } from "next";
import { SEITE } from "@/lib/seite";
import { pfad, sprachen, htmlLang, STANDARD } from "@/lib/i18n";
import { getAllPosts, kategorien } from "@/lib/blog";
import { faelleFuer } from "@/lib/cases";
import { bilderDerSeite } from "@/lib/seitenbilder";

/* ============================================================
   sitemap.xml

   Jede Seite steht einmal drin, mit beiden Sprachfassungen als `alternates`.
   Das ist die Form, die Google fuer mehrsprachige Seiten erwartet: ein
   Eintrag je Inhalt, darin die Sprachen, nicht zwei getrennte Eintraege.

   Die Adressen der Unterseiten bleiben in beiden Sprachen deutsch, die
   Sprache steckt allein im Praefix. Deshalb reicht eine Liste von Pfaden.

   `priority` steht bewusst nicht dabei. Google wertet den Wert seit Jahren
   nicht aus, und ein erfundener Wert je Seite sagt nichts.

   Zu jedem Eintrag stehen die Bilder der Seite. Ohne diese Zuordnung
   indexiert Google Bilder kaum: es muss wissen, auf welcher Seite ein Bild
   steht. Welche Bilder zu welcher Seite gehoeren, steht in
   `lib/seitenbilder.ts`. Die Bilder stehen nur am deutschen Eintrag, nicht
   noch einmal je Sprache: es sind dieselben Dateien unter denselben Adressen,
   und zweimal dasselbe Bild in einer Sitemap ist ein Duplikat.
   ============================================================ */

/* Seiten ohne eigenen Inhalt aus einer Datenquelle. */
const FESTE_SEITEN = [
  "/",
  "/full-service",
  "/leistungen/strategie",
  "/leistungen/listing-seo",
  "/leistungen/ppc-advertising",
  "/leistungen/account-management",
  "/leistungen/internationalisierung",
  "/ergebnisse",
  "/design-beispiele",
  "/gespraech-vereinbaren",
  "/blog",
  "/impressum",
  "/datenschutz",
  "/agb",
];

function eintrag(ziel: string, geaendert?: Date): MetadataRoute.Sitemap[number] {
  const bilder = bilderDerSeite(ziel);
  return {
    url: `${SEITE.url}${pfad(STANDARD, ziel)}`,
    lastModified: geaendert,
    alternates: {
      languages: Object.fromEntries(
        sprachen.map((s) => [htmlLang[s], `${SEITE.url}${pfad(s, ziel)}`])
      ),
    },
    ...(bilder.length > 0 && { images: bilder.map((b) => `${SEITE.url}${b}`) }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Beitraege und Kategorien liegen in beiden Sprachen unter demselben
     Kuerzel. Was es nur auf Deutsch gibt, steht trotzdem drin: die englische
     Fassung faellt dann auf die deutsche zurueck, und ein fehlender Eintrag
     waere schlechter als ein Verweis auf die vorhandene Sprache. */
  /* Ohne `lastModified`: die Beitraege tragen kein Datum, und ein erfundenes
     waere schlechter als keins. Google faellt dann auf das zurueck, was es
     beim Abruf sieht. */
  const beitraege = getAllPosts(STANDARD).map((p) => eintrag(`/blog/${p.slug}`));
  const themen = kategorien(STANDARD).map((k) => eintrag(`/blog/kategorie/${k.slug}`));
  const faelle = faelleFuer(STANDARD).map((f) => eintrag(`/ergebnisse/${f.slug}`));

  return [...FESTE_SEITEN.map((s) => eintrag(s)), ...faelle, ...themen, ...beitraege];
}
