import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PostCard } from "@/components/blog/PostCard";
import { TopicNavigation } from "@/components/blog/TopicIntro";
import { CollectionData } from "@/components/seo/CollectionData";
import { comparisonGroups, comparisonCopy } from "@/lib/blog-topics";
import { getAllPosts } from "@/lib/blog";
import { istSprache, pfad, sprachAngaben } from "@/lib/i18n";
import { SEITE } from "@/lib/seite";
import { woerter } from "@/lib/woerter";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const title = `${comparisonCopy.title[locale]} · temoa`;
  const description = comparisonCopy.intro[locale];
  return {
    title, description, alternates: sprachAngaben(locale, "/blog/vergleiche"),
    openGraph: { title, description, type: "website", siteName: SEITE.name, url: `${SEITE.url}${pfad(locale, "/blog/vergleiche")}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComparisonsPage({ params }: Props) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const all = getAllPosts(locale);
  const groups = comparisonGroups.map((group) => ({ ...group, posts: group.slugs.flatMap((slug) => all.filter((post) => post.slug === slug)) }));
  const title = comparisonCopy.title[locale];
  const description = comparisonCopy.intro[locale];
  return (
    <>
      <Kopfzeile />
      <CollectionData sprache={locale} path="/blog/vergleiche" title={title} description={description} posts={groups.flatMap((group) => group.posts)} />
      <main id="inhalt">
        <section className="ground pb-14 pt-36 md:pt-44">
          <div className="container-x">
            <nav aria-label={locale === "de" ? "Brotkrumennavigation" : "Breadcrumb"} className="mb-6 text-small text-ink-muted">
              <a href={pfad(locale, "/blog")} className="underline underline-offset-4">{locale === "de" ? "Alle Ratgeber" : "All guides"}</a>
              <span aria-hidden className="mx-2">/</span><span>{locale === "de" ? "Vergleiche" : "Comparisons"}</span>
            </nav>
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">{description}</p>
            <nav aria-label={locale === "de" ? "Vergleich auswählen" : "Choose a comparison"} className="mt-7 flex flex-wrap gap-3">
              {groups.map((group, index) => <a key={index} href={`#vergleich-${index}`} className="inline-flex min-h-12 items-center rounded-full border border-navy/15 bg-white px-5 text-small text-navy">{group.title[locale]}</a>)}
            </nav>
          </div>
        </section>
        {groups.map((group, index) => (
          <section id={`vergleich-${index}`} key={index} className={`${index % 2 === 0 ? "ground-tint" : "ground"} scroll-mt-28 py-14 md:py-20`}>
            <div className="container-x">
              <h2 className="text-2xl font-extrabold text-ink">{group.title[locale]}</h2>
              <p className="mt-3 max-w-2xl text-ink-muted">{group.text[locale]}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.posts.map((post) => <PostCard key={post.slug} post={post} sprache={locale} w={woerter(locale).blog} />)}
              </div>
            </div>
          </section>
        ))}
        <TopicNavigation sprache={locale} />
      </main>
      <Fusszeile />
    </>
  );
}
