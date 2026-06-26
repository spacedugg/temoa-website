import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { categories, getCategory, getPostsByCategory } from "@/lib/blog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Blog · temoa" };
  return {
    title: `${cat.label} · temoa Blog`,
    description: cat.blurb,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-white pb-10 pt-36 md:pt-44">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(circle, ${cat.accent}33, transparent 70%)` }}
          />
          <div className="container-x relative">
            <Reveal>
              <a href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Alle Themen
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
                  <p className="mt-1 text-sm font-medium text-ink-faint">{posts.length} Beiträge</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{cat.blurb}</p>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-white pb-24">
          <div className="container-x">
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {posts.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
