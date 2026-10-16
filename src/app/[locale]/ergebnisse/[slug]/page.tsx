import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { CaseBlock } from "@/components/cases/CaseStudiesFull";
import { CaseGallery, OtherCases } from "@/components/cases/CaseDetailExtras";
import { ServiceCTA } from "@/components/service/Blocks";
import { cases, faelleFuer, fallFuer } from "@/lib/cases";
import { istSprache, sprachAngaben, sprachen } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

/* Die Adressen der Faelle sind in beiden Sprachen dieselben, die Sprache
   steckt im Praefix. `cases` reicht deshalb fuer die Liste der Adressen. */
export function generateStaticParams() {
  return sprachen.flatMap((locale) => cases.map((c) => ({ locale, slug: c.slug })));
}

/* Ueberschrift und Unterzeile stehen ohne Satzzeichen nebeneinander, deshalb
   las sich die Beschreibung als ein Satz ohne Punkt. Dazu kappt Google ab
   etwa 155 Zeichen: lieber hier an einer Wortgrenze schneiden. */
function fallBeschreibung(ueberschrift: string, unterzeile: string) {
  const kopf = /[.!?]$/.test(ueberschrift.trim()) ? ueberschrift.trim() : `${ueberschrift.trim()}.`;
  const voll = `${kopf} ${unterzeile.trim()}`;
  if (voll.length <= 158) return voll;
  const kurz = voll.slice(0, 157);
  return kurz.slice(0, kurz.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!istSprache(locale)) return {};
  const w = woerter(locale).faelle;
  const c = fallFuer(locale, slug);
  if (!c) return { title: w.meta.fallTitel };
  return {
    title: `${c.displayName}: ${w.meta.fallTitel}`,
    description: fallBeschreibung(c.headline, c.subheadline),
    alternates: sprachAngaben(locale, `/ergebnisse/${slug}`),
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!istSprache(locale)) notFound();
  const c = fallFuer(locale, slug);
  if (!c) notFound();
  const w = woerter(locale).faelle;

  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <div className="pt-10 md:pt-14" />
        <CaseBlock c={c} index={0} w={w} />
        <CaseGallery c={c} w={w} />
        <OtherCases slug={c.slug} faelle={faelleFuer(locale)} sprache={locale} w={w} />
        <ServiceCTA title={w.fallCta.titel} zusagen={w.fallCta.zusagen} />
      </main>
      <Fusszeile />
    </>
  );
}
