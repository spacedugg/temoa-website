import type { MetadataRoute } from "next";
import { SEITE } from "@/lib/seite";
import { pfad, sprachen, htmlLang, STANDARD } from "@/lib/i18n";
import { getAllPosts, kategorien, getPost } from "@/lib/blog";
import { faelleFuer } from "@/lib/cases";
import { bilderDerSeite } from "@/lib/seitenbilder";

/* Every canonical language URL gets its own entry with reciprocal alternates.
   Image entries describe the actual assets on each page. No invented dates. */

/* Seiten ohne eigenen Inhalt aus einer Datenquelle. */
const FESTE_SEITEN = [
  "/",
  "/full-service",
  "/leistungen/strategie",
  "/leistungen/listing-seo",
  "/leistungen/ppc-advertising",
  "/leistungen/account-management",
  "/leistungen/compliance-account-health",
  "/leistungen/fba-inventory-management",
  "/leistungen/katalog-listing-management",
  "/leistungen/analytics-reporting",
  "/leistungen/internationalisierung",
  "/ergebnisse",
  "/design-beispiele",
  "/gespraech-vereinbaren",
  "/temoa-os",
  "/blog",
  "/blog/vergleiche",
  "/blog/grundlagen",
  "/impressum",
  "/datenschutz",
  "/agb",
];

/* Rechtstexte gibt es nur auf Deutsch. Die englische Adresse zeigt denselben
   Text und hat die deutsche als Canonical, deshalb steht sie nicht in der
   Sitemap und die Seite hat keine Sprachpaare. */
const NUR_DEUTSCH = new Set(["/impressum", "/datenschutz", "/agb"]);

function eintraege(ziel: string, verfuegbar = [...sprachen]): MetadataRoute.Sitemap {
  const locales = NUR_DEUTSCH.has(ziel) ? [STANDARD] : verfuegbar;
  const bilder = bilderDerSeite(ziel);
  const languages = Object.fromEntries([
    ...locales.map((s) => [htmlLang[s], `${SEITE.url}${pfad(s, ziel)}`]),
    ...(locales.includes(STANDARD) ? [["x-default", `${SEITE.url}${pfad(STANDARD, ziel)}`]] : []),
  ]);
  return locales.map((locale) => ({
    url: `${SEITE.url}${pfad(locale, ziel)}`,
    ...(!NUR_DEUTSCH.has(ziel) && { alternates: { languages } }),
    ...(bilder.length > 0 && { images: bilder.map((bild) => `${SEITE.url}${bild}`) }),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // List every canonical language URL. Never advertise a missing translation.
  const slugs = new Set(sprachen.flatMap((locale) => getAllPosts(locale).map((post) => post.slug)));
  const beitraege = [...slugs].flatMap((slug) =>
    eintraege(`/blog/${slug}`, sprachen.filter((locale) => getPost(slug, locale)))
  );
  const themen = kategorien(STANDARD).flatMap((k) => eintraege(`/blog/kategorie/${k.slug}`));
  const faelle = faelleFuer(STANDARD).flatMap((f) => eintraege(`/ergebnisse/${f.slug}`));
  return [...FESTE_SEITEN.flatMap((ziel) => eintraege(ziel)), ...faelle, ...themen, ...beitraege];
}
