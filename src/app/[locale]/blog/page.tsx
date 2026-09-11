import type { Metadata } from "next";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { kategorien, categoryCounts, getFeaturedPosts } from "@/lib/blog";
import { ServiceCTA } from "@/components/service/Blocks";
import { istSprache, pfad, sprachAngaben } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  const m = woerter(locale).blog.meta;
  return {
    title: m.titel,
    description: m.beschreibung,
    alternates: sprachAngaben(locale, "/blog"),
  };
}

/**
 * Eine Themenfarbe auf das Navy der Themen-Sektion umrechnen.
 *
 * Mit Weiss mischen reicht nicht: zwei der acht Farben sind #023047 und
 * #0B4D6B, und wer die so weit aufhellt, dass sie auf dunklem Grund zu sehen
 * sind, bekommt ein Blaugrau ohne Farbe. Deshalb ueber HSL: der Farbton
 * bleibt, die Helligkeit wird auf einen Wert gesetzt, der auf Navy traegt, und
 * die Saettigung bekommt eine Untergrenze.
 */
function fuerDunkel(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return `hsl(${Math.round(h)} ${Math.round(Math.max(sat, 0.6) * 100)}% 64%)`;
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = woerter(locale).blog;
  const counts = categoryCounts(locale);
  const featured = getFeaturedPosts(locale, 6);
  const zahl = (n: number) => (n === 1 ? w.einBeitrag : w.beitraege.replace("{n}", String(n)));

  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <PageHero
          eyebrow={w.kopf.eyebrow}
          title={
            <>
              {w.kopf.titelVor}
              <span className="text-gradient">{w.kopf.titelEm}</span>
            </>
          }
          description={w.kopf.lead}
        />
        {/* Solange nicht alle Beitraege uebersetzt sind, steht das hier und
            nicht im Kleingedruckten: wer in der Liste weniger findet als
            erwartet, soll wissen, warum. */}
        {w.teilweise && (
          <div className="container-x">
            <p className="mx-auto max-w-[52ch] text-center text-small text-ink-muted">{w.teilweise}</p>
          </div>
        )}

        {/* Themen.
            Drei Fassungen. Erst acht weisse Kacheln mit Icon, Ueberschrift,
            Beschreibungssatz und einer Linkzeile: acht Absaetze, bevor der
            erste Beitrag kommt. Dann nur noch Icon, Thema und Anzahl, aber
            weiter auf hellem Grund. Damit lagen drei helle Flaechen
            uebereinander, Kopf, Themen und empfohlene Beitraege, und die
            Sektion hatte weder oben noch unten eine Kante.

            Jetzt Navy. Die Themenfarben werden dafuer mit Weiss aufgehellt:
            zwei der acht sind dunkelblau und dunkles Petrol, die waeren auf
            Navy nicht zu sehen. Rot waere der staerkere Kontrast, ist hier
            aber falsch: Rot ist auf dieser Website die Farbe fuer Probleme. */}
        <section className="on-dark ground-deep relative py-14 md:py-16">
          <div className="container-x">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
              {kategorien(locale).map((c) => {
                const farbe = fuerDunkel(c.accent);
                return (
                  <RevealItem key={c.slug} className="h-full">
                    <a
                      href={pfad(locale, `/blog/kategorie/${c.slug}`)}
                      className="panel-dark group relative flex h-full items-center gap-4 overflow-hidden p-5 transition-transform duration-300 ease-temoa hover:-translate-y-1"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1 opacity-90"
                        style={{ background: farbe }}
                      />
                      <span
                        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] transition-transform duration-300 group-hover:scale-105"
                        style={{ color: farbe, background: farbe.replace("hsl(", "hsla(").replace(")", " / 0.15)") }}
                      >
                        <Icon name={c.icon} size={30} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[1.02rem] font-bold leading-snug text-white">{c.label}</span>
                        <span className="mt-1 block text-small text-chalk-muted">
                          {zahl(counts[c.slug] ?? 0)}
                        </span>
                      </span>
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Featured */}
        <section className="ground-tint relative py-16 md:py-20">
          <div className="container-x">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{w.empfohlen}</h2>
              </div>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {featured.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PostCard post={p} sprache={locale} w={w} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <ServiceCTA title={w.cta} />
      </main>
      <Fusszeile />
    </>
  );
}
