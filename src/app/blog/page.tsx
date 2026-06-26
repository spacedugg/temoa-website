import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { categories, categoryCounts, getFeaturedPosts } from "@/lib/blog";
import { ServiceCTA } from "@/components/service/Blocks";

export const metadata: Metadata = {
  title: "Blog · temoa",
  description:
    "Klartext zu Amazon: PPC, Listing & SEO, FBA, Markenschutz und Strategie. Über 80 Beiträge, thematisch geordnet.",
};

export default function BlogPage() {
  const counts = categoryCounts();
  const featured = getFeaturedPosts(6);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Blog"
          title={
            <>
              Klartext zu <span className="text-gradient">Amazon.</span>
            </>
          }
          description="Über 80 Beiträge zu Werbung, Listings, Logistik und Strategie. Nach Themen geordnet, ohne Fülltext."
        />

        {/* Themen / category navigation */}
        <section className="relative bg-white pb-8 pt-4">
          <div className="container-x">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
              {categories.map((c) => (
                <RevealItem key={c.slug} className="h-full">
                  <a href={`/blog/kategorie/${c.slug}`} className="surface surface-hover group flex h-full flex-col p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                        style={{ color: c.accent, background: `${c.accent}1A` }}
                      >
                        <Icon name={c.icon} size={20} />
                      </span>
                      <span className="text-xs font-semibold text-ink-faint">{counts[c.slug] ?? 0} Beiträge</span>
                    </div>
                    <h3 className="mt-4 text-base font-bold leading-snug text-ink">{c.label}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{c.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: c.accent }}>
                      Themen ansehen
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Featured */}
        <section className="relative bg-[#EDF5FB] py-16 md:py-20">
          <div className="container-x">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Empfohlene Beiträge</h2>
              </div>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {featured.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <ServiceCTA
          title="Lieber direkt über euren Account sprechen?"
          sub="In der kostenlosen Potenzialanalyse schauen wir konkret auf eure Marke."
        />
      </main>
      <Footer />
    </>
  );
}
