import type { Metadata } from "next";
import { notFound } from "next/navigation";
import deepDives from "../../../../../content/blog-deep-dives.json";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PostCard } from "@/components/blog/PostCard";
import { ArticleSectionLink } from "@/components/blog/ArticleSectionLink";
import { BlogSupport, BlogContact } from "@/components/blog/BlogSupport";
import { TopicNavigation } from "@/components/blog/TopicIntro";
import { CollectionData } from "@/components/seo/CollectionData";
import { getAllPosts } from "@/lib/blog";
import { istSprache, pfad, sprachAngaben } from "@/lib/i18n";
import { SEITE } from "@/lib/seite";
import { woerter } from "@/lib/woerter";

type Props = { params: Promise<{ locale: string }> };
const route = "/blog/deep-dives";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const title = `${deepDives.title[locale]} · temoa`;
  const description = deepDives.intro[locale];
  const image = `${SEITE.url}/blog/covers/amazon-werbung-inkrementalitaet.webp`;
  return {
    title, description, alternates: sprachAngaben(locale, route),
    openGraph: { title, description, type: "website", siteName: SEITE.name, url: `${SEITE.url}${pfad(locale, route)}`, images: [{ url: image, width: 1400, height: 788 }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function DeepDivesPage({ params }: Props) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const posts = new Map(getAllPosts(locale).map((post) => [post.slug, post]));
  const groups = deepDives.groups.map((group) => ({
    ...group,
    posts: group.slugs.flatMap((slug) => {
      const post = posts.get(slug);
      return post ? [post] : [];
    }),
  }));
  return (
    <>
      <Kopfzeile />
      <CollectionData sprache={locale} path={route} title={deepDives.title[locale]} description={deepDives.intro[locale]} posts={groups.flatMap((group) => group.posts)} />
      <main id="inhalt">
        <section className="ground pb-14 pt-36 md:pt-44">
          <div className="container-x">
            <nav aria-label={locale === "de" ? "Brotkrumennavigation" : "Breadcrumb"} className="mb-6 text-small text-ink-muted">
              <a href={pfad(locale, "/blog")} className="underline underline-offset-4">{locale === "de" ? "Amazon Insights" : "Amazon insights"}</a>
              <span aria-hidden className="mx-2">/</span><span>Deep Dives</span>
            </nav>
            <p className="mb-4 text-small font-bold uppercase tracking-widest text-navy">{locale === "de" ? "Strategie. Zahlen. Umsetzung." : "Strategy. Numbers. Execution."}</p>
            <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">{deepDives.title[locale]}</h1>
            <p className="mt-5 max-w-3xl text-lg text-ink-muted">{deepDives.intro[locale]}</p>
            <nav aria-label={locale === "de" ? "Entscheidungsfeld auswählen" : "Choose a decision area"} className="mt-8 flex flex-wrap gap-3">
              {groups.map((group) => <ArticleSectionLink key={group.id} id={group.id} className="inline-flex min-h-12 items-center rounded-full border border-navy/15 bg-white px-5 py-2 text-small font-bold text-navy hover:border-navy">{group.short[locale]}</ArticleSectionLink>)}
            </nav>
          </div>
        </section>
        {groups.map((group, index) => (
          <section id={group.id} key={group.id} className={`${index % 2 === 0 ? "ground-tint" : "ground"} scroll-mt-28 py-14 md:py-20`}>
            <div className="container-x">
              <p className="mb-3 text-small font-bold text-ink-muted">{group.short[locale]}</p>
              <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{group.title[locale]}</h2>
              <p className="mt-4 max-w-3xl text-ink-muted">{group.text[locale]}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.posts.map((post) => <PostCard key={post.slug} post={post} sprache={locale} w={woerter(locale).blog} />)}
              </div>
            </div>
          </section>
        ))}
        <BlogSupport sprache={locale} />
        <TopicNavigation sprache={locale} current="deep-dives" />
        <BlogContact sprache={locale} />
      </main>
      <Fusszeile />
    </>
  );
}
