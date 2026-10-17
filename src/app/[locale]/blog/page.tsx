import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { BlogArticleDirectory } from "@/components/blog/BlogArticleDirectory";
import { CollectionData } from "@/components/seo/CollectionData";
import { kategorien, getEditorialPosts } from "@/lib/blog";
import { ServiceCTA } from "@/components/service/Blocks";
import { istSprache, pfad, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const m = woerter(locale).blog.meta;
  return {
    title: m.titel,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, "/blog"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale).blog;
  const posts = getEditorialPosts(locale);
  const categories = kategorien(locale);

  return (
    <>
      <Kopfzeile />
      <CollectionData sprache={locale} path="/blog" title={w.meta.titel} description={w.meta.beschreibung} posts={posts} />
      <main id="inhalt">
        <PageHero
          eyebrow={w.kopf.eyebrow}
          title={<>{w.kopf.titelVor}<span className="text-gradient">{w.kopf.titelEm}</span></>}
          description={w.kopf.lead}
        />
        <BlogArticleDirectory posts={posts} categories={categories} sprache={locale} w={w} />
        <section className="ground py-14 md:py-16">
          <div className="container-x grid gap-5 md:grid-cols-2">
            <a href={pfad(locale, "/blog/vergleiche")} className="panel panel-lift flex h-full flex-col justify-between gap-4 p-7">
              <div>
                <h2 className="text-xl font-extrabold text-ink">{locale === "de" ? "Entscheidungen vergleichen" : "Compare your options"}</h2>
                <p className="mt-2 text-ink-muted">{locale === "de" ? "FBA oder FBM, Vendor oder Seller, Full Service oder Spezialist – nach konkreter Frage sortiert." : "FBA or FBM, vendor or seller, full service or specialist – organised by decision."}</p>
              </div>
              <span className="font-bold text-navy">{locale === "de" ? "Zu den Vergleichen" : "Browse comparisons"} <span aria-hidden>↗</span></span>
            </a>
            <a href={pfad(locale, "/blog/grundlagen")} className="panel panel-lift flex h-full flex-col justify-between gap-4 p-7">
              <div>
                <h2 className="text-xl font-extrabold text-ink">{locale === "de" ? "Begriffe nachschlagen" : "Look up the essentials"}</h2>
                <p className="mt-2 text-ink-muted">{locale === "de" ? "ACoS, FBA und weitere Grundlagen für einzelne Fragen und neue Teammitglieder." : "ACoS, FBA and related terms for specific questions and new team members."}</p>
              </div>
              <span className="font-bold text-navy">{locale === "de" ? "Zu den Grundlagen" : "Explore the basics"} <span aria-hidden>↗</span></span>
            </a>
          </div>
        </section>
        <ServiceCTA title={w.cta} />
      </main>
      <Fusszeile />
    </>
  );
}
