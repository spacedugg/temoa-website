import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { kategorien, getCategory, getPostsByCategory } from "@/lib/blog";
import { istSprache, pfad, sprachAngaben, sprachen, STANDARD } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

/* Die Adressen der Kategorien sind in beiden Sprachen dieselben. */
export function generateStaticParams() {
  return sprachen.flatMap((locale) =>
    kategorien(STANDARD).map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!istSprache(locale)) return {};
  const w = woerter(locale).blog;
  const cat = getCategory(slug, locale);
  if (!cat) return { title: w.meta.titel };
  return {
    title: `${cat.label} · temoa Blog`,
    description: cat.blurb,
    alternates: sprachAngaben(locale, `/blog/kategorie/${slug}`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale).blog;
  const cat = getCategory(slug, locale);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug, locale);

  return (
    <>
      <Kopfzeile />
      <main>
        <section className="relative overflow-hidden ground pb-10 pt-36 md:pt-44">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(circle, ${cat.accent}33, transparent 70%)` }}
          />
          <div className="container-x relative">
            <Reveal>
              <a href={pfad(locale, "/blog")} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {w.alleThemen}
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 flex items-center gap-4">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ color: cat.accent, background: `${cat.accent}1A` }}
                >
                  <Icon name={cat.icon} size={28} />
                </span>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{cat.label}</h1>
                  <p className="mt-1 text-sm font-medium text-ink-faint">
                    {posts.length === 1 ? w.einBeitrag : w.beitraege.replace("{n}", String(posts.length))}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{cat.blurb}</p>
            </Reveal>
          </div>
        </section>

        <section className="relative ground pb-24">
          <div className="container-x">
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {posts.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PostCard post={p} sprache={locale} w={w} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Fusszeile />
    </>
  );
}
