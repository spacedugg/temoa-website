import Image from "next/image";
import { Ergebnis, ServiceCTA } from "@/components/service/Blocks";
import { beitragsLinks } from "@/lib/blog-links";
import { fallFuer } from "@/lib/cases";
import { pfad, type Sprache } from "@/lib/i18n";

type Props = { sprache: Sprache; categoryKey?: string; categorySlug?: string; articleSlug?: string };
const contactTitles: Record<string, Record<Sprache, string>> = {
  "daten-analyse": { de: "Welche Datenfrage hält euer Wachstum auf?", en: "Which analytics question is holding back growth?" },
  "ppc-advertising": { de: "Wie rentabel ist eure Amazon-Werbung?", en: "How profitable is your Amazon advertising?" },
  "listing-seo": { de: "Was könnte euer Amazon-Listing besser verkaufen?", en: "What could help your Amazon listing convert?" },
  "fba-logistik": { de: "Passen FBA-Kosten und Bestand zu eurer Marge?", en: "Do FBA costs and inventory fit your margins?" },
  "marke-account": { de: "Braucht eure Marke Unterstützung in Seller Central?", en: "Does your brand need support in Seller Central?" },
  strategie: { de: "Welcher nächste Schritt lohnt sich für eure Marke?", en: "Which next step makes sense for your brand?" },
  "ki-zukunft": { de: "Beantworten eure Listings die richtigen Produktfragen?", en: "Do your listings answer the right product questions?" },
  zusammenarbeit: { de: "Welche Amazon-Aufgaben können wir euch abnehmen?", en: "Which Amazon tasks can we handle for your team?" },
};

export function BlogContact({ sprache, categorySlug, articleSlug }: Props) {
  const title = articleSlug === "acos-erklaert" || articleSlug === "guter-acos-benchmarks"
    ? { de: "Passt euer ACoS zu eurer Marge?", en: "Does your ACoS fit your margins?" }[sprache]
    : contactTitles[categorySlug ?? ""]?.[sprache] ?? { de: "Was braucht eure Marke für den nächsten Schritt auf Amazon?", en: "What does your brand need for its next step on Amazon?" }[sprache];
  return <ServiceCTA title={title} />;
}

/** Reuses the site's existing service links, case data, design work and contact component. */
export function BlogSupport({ sprache, categoryKey = "Agentur & Zusammenarbeit", categorySlug, articleSlug = "" }: Props) {
  const links = beitragsLinks(articleSlug, categoryKey, sprache);
  const caseLink = links.find((link) => link.href.startsWith("/ergebnisse/"));
  const caseStudy = caseLink ? fallFuer(sprache, caseLink.href.split("/").pop()!) : undefined;
  const resources = links.filter((link) => !caseStudy || link !== caseLink);
  const showDesign = categorySlug === "listing-seo" || categorySlug === "ki-zukunft";
  return (
    <>
      <section className="ground-tint py-14 md:py-20" data-blog-support>
        <div className="container-x">
          <h2 className="text-2xl font-extrabold text-ink">{sprache === "de" ? "So unterstützen wir eure Marke" : "How we support your brand"}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="panel flex flex-col p-7">
              <h3 className="text-xl font-bold text-ink">{sprache === "de" ? "Passend zu eurem Thema" : "Support for this topic"}</h3>
              <ul className="mt-5 space-y-5">
                {resources.map((link) => <li key={link.href}>
                  <a className="inline-flex min-h-12 items-center font-bold text-navy underline decoration-brand-500 underline-offset-4" href={pfad(sprache, link.href)}>{link.anker} <span aria-hidden className="ml-2">↗</span></a>
                  <p className="text-small text-ink-muted">{link.text}</p>
                </li>)}
              </ul>
              {showDesign && <a href={pfad(sprache, "/gespraech-vereinbaren")} className="btn-primary mt-7 self-start">{sprache === "de" ? "Eure Situation besprechen" : "Discuss your situation"} <span aria-hidden>↗</span></a>}
            </div>
            {showDesign ? <a href={pfad(sprache, "/design-beispiele")} className="panel panel-lift overflow-hidden">
              <div className="relative h-64 bg-white"><Image src="/bilder/kemes/l-1.webp" alt={sprache === "de" ? "Produktbild für Kemes aus unseren Designarbeiten" : "Kemes product image from our design work"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-5" /></div>
              <div className="p-7"><h3 className="text-xl font-bold text-ink">{sprache === "de" ? "So sehen unsere Produktbilder und A+ Inhalte aus" : "See our product images and A+ content"}</h3><p className="mt-3 text-ink-muted">{sprache === "de" ? "Seht euch vorhandene Arbeiten an und prüft, welche Darstellung zu euren Produkten passt." : "Explore our existing work and consider which approach fits your products."}</p><span className="mt-5 inline-flex min-h-12 items-center font-bold text-navy">{sprache === "de" ? "Designbeispiele ansehen" : "View design examples"} <span aria-hidden className="ml-2">↗</span></span></div>
            </a> : <div className="panel-navy on-dark flex flex-col justify-center p-7 md:p-10">
              <h3 className="text-2xl font-bold text-white">{sprache === "de" ? "Von der Frage zur Entscheidung" : "From a question to a decision"}</h3>
              <p className="mt-4 text-chalk-muted">{sprache === "de" ? "Ihr möchtet wissen, was das für eure Produkte, eure Marge oder euren Account bedeutet? Im Gespräch ordnen wir eure Ausgangslage ein und besprechen, wo Unterstützung sinnvoll ist." : "Want to understand what this means for your products, margins or account? We can discuss your starting point and where support would be useful."}</p>
              <a href={pfad(sprache, "/gespraech-vereinbaren")} className="btn-on-dark mt-7 self-start">{sprache === "de" ? "Potenzialanalyse buchen" : "Book a potential analysis"} <span aria-hidden>↗</span></a>
            </div>}
          </div>
        </div>
      </section>
      {caseStudy && <Ergebnis eyebrow={sprache === "de" ? "Aus unserer Arbeit" : "From our work"} title={caseStudy.headline} zeile={`${caseStudy.displayName}: ${caseStudy.subheadline}`} werte={caseStudy.heroStats.slice(0, 3).map((stat) => ({ wert: stat.value, label: stat.label, sub: stat.sublabel, maerkte: stat.maerkte, runter: stat.trend === "down" }))} href={pfad(sprache, `/ergebnisse/${caseStudy.slug}`)} mehr={sprache === "de" ? "Case Study ansehen" : "View case study"} />}
    </>
  );
}
