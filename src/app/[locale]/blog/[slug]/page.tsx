import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { BlogCover } from "@/components/blog/BlogCover";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { ServiceCTA } from "@/components/service/Blocks";
import { istSprache, pfad, sprachAngaben, sprachen } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

/* Je Sprache nur die Beitraege, die es dort gibt. Solange ein Beitrag nicht
   uebersetzt ist, hat er unter `/en/blog` keine Seite und taucht auch in
   keiner Liste auf. */
export function generateStaticParams() {
  return sprachen.flatMap((locale) =>
    getAllPosts(locale).map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!istSprache(locale)) return {};
  const post = getPost(slug, locale);
  if (!post) return { title: woerter(locale).blog.meta.beitragTitel };
  return {
    title: `${post.title} · temoa`,
    description: post.description,
    keywords: post.keywords,
    /* `hreflang` nur, wenn es die andere Fassung wirklich gibt: eine Angabe
       auf eine Seite, die 404 liefert, ist schlechter als keine. */
    alternates: getPost(slug, locale === "de" ? "en" : "de")
      ? sprachAngaben(locale, `/blog/${slug}`)
      : undefined,
  };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[äöü]/g, (m) => ({ ä: "ae", ö: "oe", ü: "ue" }[m] as string))
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Loest HTML-Entities in Text auf, der als Text ausgegeben wird.
 *
 * Das Inhaltsverzeichnis liest die Ueberschriften aus dem gerenderten HTML.
 * Dort steht ein Anfuehrungszeichen als `&quot;`. React gibt den String
 * unveraendert aus, deshalb stand im Verzeichnis woertlich
 * „niedrig ist immer gut&quot;". Betroffen war jede Ueberschrift mit
 * Anfuehrungszeichen, kaufmaennischem Und oder Apostroph.
 */
function entitiesAuflösen(s: string) {
  const bekannt: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    ndash: "–",
    mdash: "–",
    hellip: "…",
    laquo: "«",
    raquo: "»",
    bdquo: "„",
    ldquo: "“",
    rdquo: "”",
    sbquo: "‚",
    lsquo: "‘",
    rsquo: "’",
    shy: "",
  };
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (treffer, name: string) => {
    if (name.startsWith("#x") || name.startsWith("#X")) {
      return String.fromCodePoint(parseInt(name.slice(2), 16));
    }
    if (name.startsWith("#")) {
      return String.fromCodePoint(parseInt(name.slice(1), 10));
    }
    return name.toLowerCase() in bekannt ? bekannt[name.toLowerCase()] : treffer;
  });
}

/** Inject ids into h2 headings and build a table of contents. */
function withToc(html: string) {
  const toc: { id: string; label: string }[] = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const label = entitiesAuflösen(String(inner).replace(/<[^>]+>/g, "")).trim();
    const id = slugify(label);
    toc.push({ id, label });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale).blog;
  const post = getPost(slug, locale);
  if (!post) notFound();
  const { html, toc } = withToc(post.html);
  const related = getRelatedPosts(slug, locale, 3);

  return (
    <>
      <Kopfzeile />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden ground pt-32 md:pt-40">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(circle, ${post.accent}33, transparent 70%)` }}
          />
          <div className="container-x relative max-w-3xl">
            <Reveal>
              <nav className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                <a href={pfad(locale, "/blog")} className="hover:text-ink">{w.kopf.eyebrow}</a>
                <span className="text-ink-faint">/</span>
                <a
                  href={pfad(locale, `/blog/kategorie/${post.categorySlug}`)}
                  className="font-semibold text-navy underline decoration-2 underline-offset-2 hover:decoration-navy"
                  style={{ textDecorationColor: post.accent }}
                >
                  {post.categoryLabel}
                </a>
              </nav>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">{post.description}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-5 flex items-center gap-3 text-sm text-ink-faint">
                <span className="inline-flex items-center gap-2 font-semibold text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: post.accent }} />
                  {post.categoryShort}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink-faint" />
                <span>{w.lesezeit.replace("{n}", String(post.readingMinutes))}</span>
              </div>
            </Reveal>
          </div>
          <div className="container-x relative mt-10 max-w-4xl">
            <Reveal delay={0.1}>
              <BlogCover
                accent={post.accent}
                icon={post.categoryIcon}
                seed={post.slug}
                image={post.image}
                label={post.categoryLabel}
                className="aspect-[2/1] w-full rounded-3xl shadow-lift md:aspect-[2.6/1]"
              />
            </Reveal>
          </div>
        </section>

        {/* Body + TOC */}
        <section className="relative ground py-14 md:py-16">
          <div className="container-x">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
              <article className="article-body max-w-2xl" dangerouslySetInnerHTML={{ __html: html }} />
              {toc.length > 2 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-28">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">{w.inhalt}</span>
                    <ul className="mt-4 space-y-2.5 border-l border-black/[0.08] pl-4 text-sm">
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} className="text-ink-muted transition-colors hover:text-ink">
                            {t.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="ground-tint relative py-16 md:py-20">
            <div className="container-x">
              <h2 className="text-2xl font-bold tracking-tight text-ink">{w.weiterlesen}</h2>
              <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                {related.map((p) => (
                  <RevealItem key={p.slug} className="h-full">
                    <PostCard post={p} sprache={locale} w={w} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        <ServiceCTA
          title={w.beitragCta}
        />
      </main>
      <Fusszeile />
    </>
  );
}
