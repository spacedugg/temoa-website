import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { BlogCover } from "@/components/blog/BlogCover";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { ServiceCTA } from "@/components/service/Blocks";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog · temoa" };
  return {
    title: `${post.title} · temoa`,
    description: post.description,
    keywords: post.keywords,
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

/** Inject ids into h2 headings and build a table of contents. */
function withToc(html: string) {
  const toc: { id: string; label: string }[] = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const label = String(inner).replace(/<[^>]+>/g, "").trim();
    const id = slugify(label);
    toc.push({ id, label });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { html, toc } = withToc(post.html);
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white pt-32 md:pt-40">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(circle, ${post.accent}33, transparent 70%)` }}
          />
          <div className="container-x relative max-w-3xl">
            <Reveal>
              <nav className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                <a href="/blog" className="hover:text-ink">Blog</a>
                <span className="text-ink-faint">/</span>
                <a href={`/blog/kategorie/${post.categorySlug}`} className="hover:text-ink" style={{ color: post.accent }}>
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
                <span className="font-semibold" style={{ color: post.accent }}>
                  {post.categoryShort}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink-faint" />
                <span>{post.readingMinutes} Min. Lesezeit</span>
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
                className="aspect-[2/1] w-full rounded-3xl shadow-lift md:aspect-[2.6/1]"
              />
            </Reveal>
          </div>
        </section>

        {/* Body + TOC */}
        <section className="relative bg-white py-14 md:py-16">
          <div className="container-x">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
              <article className="article-body max-w-2xl" dangerouslySetInnerHTML={{ __html: html }} />
              {toc.length > 2 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-28">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">Inhalt</span>
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
          <section className="relative bg-[#EDF5FB] py-16 md:py-20">
            <div className="container-x">
              <h2 className="text-2xl font-bold tracking-tight text-ink">Weiterlesen</h2>
              <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                {related.map((p) => (
                  <RevealItem key={p.slug} className="h-full">
                    <PostCard post={p} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        <ServiceCTA
          title="Genug gelesen, Zeit für Ergebnisse?"
          sub="In der kostenlosen Potenzialanalyse zeigen wir, wo in eurem Account das Wachstum liegt."
        />
      </main>
      <Footer />
    </>
  );
}
