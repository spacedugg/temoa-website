import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
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
      <Kopfzeile />
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

        {/* Themen.
            Vorher acht weisse Kacheln mit Icon, Ueberschrift, Beschreibungssatz
            und einer Linkzeile. Acht Absaetze, bevor der erste Beitrag kommt.
            Jetzt nur noch Icon, Thema und Anzahl: das Icon gross und in der
            Themenfarbe, die Kachel selbst getoent. */}
        <section className="relative ground pb-10 pt-4">
          <div className="container-x">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
              {categories.map((c) => (
                <RevealItem key={c.slug} className="h-full">
                  <a
                    href={`/blog/kategorie/${c.slug}`}
                    className="panel panel-lift group relative flex h-full items-center gap-4 overflow-hidden p-5"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1 opacity-80"
                      style={{ background: c.accent }}
                    />
                    <span
                      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] transition-transform duration-300 group-hover:scale-105"
                      style={{ color: c.accent, background: `${c.accent}18` }}
                    >
                      <Icon name={c.icon} size={30} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[1.02rem] font-bold leading-snug text-ink">{c.label}</span>
                      <span className="mt-1 block text-small text-ink-faint">
                        {counts[c.slug] === 1 ? "1 Beitrag" : `${counts[c.slug] ?? 0} Beiträge`}
                      </span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Featured */}
        <section className="ground-tint relative py-16 md:py-20">
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
        />
      </main>
      <Fusszeile />
    </>
  );
}
