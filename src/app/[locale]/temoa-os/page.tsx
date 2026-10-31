import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { PageHero } from "@/components/ui/PageHero";
import { istSprache, pfad, sprachAngaben } from "@/lib/i18n";

const inhalt = {
  de: {
    meta: {
      title: "Temoa OS: interne Amazon-Datenanalyse für Marken · temoa",
      description: "Wie Temoa GmbH mit Temoa OS Amazon-Marken betreut, welche Daten wir auswerten und wie ihr ein Angebot für unsere Agenturleistungen erhaltet.",
    },
    eyebrow: "Interne Arbeitsumgebung",
    title: "Temoa OS für die Arbeit an euren Amazon-Konten.",
    intro: "Temoa OS ist die interne Arbeitsumgebung der Temoa GmbH für die Betreuung von Amazon-Marken. Unser Team führt Katalog-, Werbe-, Bestands- und Leistungsdaten für die Arbeit an Kundenmandaten zusammen. Kunden brauchen dafür keinen eigenen Softwarezugang. Sie erhalten Auswertungen, Empfehlungen und umgesetzte Maßnahmen im Rahmen unserer Agenturleistungen.",
    offer: "Die Agenturleistung ist bereits verfügbar. Die Anbindung an die Amazon Selling Partner API (SP-API) bauen wir für interne Abläufe aus. Datenzugriffe erfolgen nur mit der jeweiligen Berechtigung und Freigabe durch die Marke.",
    workEyebrow: "Was wir mit den Daten tun",
    workTitle: "Vom Bericht zur nächsten Entscheidung.",
    workLead: "Temoa OS unterstützt unser Team bei der Betreuung autorisierter Marken. Welche Daten wir abrufen können, hängt vom Kundenkonto, dem Marktplatz und den von Amazon genehmigten Rollen ab.",
    current: "Betreuung und Auswertung",
    planned: "Beantragter SP-API-Zugriff",
    features: [
      {
        tag: "Brand Analytics",
        title: "Suchanfragen und Markenleistung",
        text: "Wir werten Search Query Performance für betreute Marken aus: bei welchen Suchanfragen Produkte erscheinen, wie häufig sie angeklickt und in den Warenkorb gelegt werden und welche Käufe daraus entstehen. Daraus priorisieren wir Änderungen an Listings und Werbekampagnen. Der beantragte Brand-Analytics-Zugriff soll den Abruf dieser Berichte für unsere internen Analysen ermöglichen.",
        stage: "planned",
      },
      {
        tag: "Product Listing · Pricing · Inventory and Order Tracking · Amazon Fulfillment · Finance and Accounting",
        title: "Katalog, Verfügbarkeit und Wirtschaftlichkeit",
        text: "Für die laufende Betreuung vergleichen wir Produktdaten und Listings, beobachten Angebote und Preise, planen FBA-Bestände und ordnen Verkäufe sowie Amazon-Gebühren ein. So erkennt das Team Abweichungen im Katalog, drohende Fehlbestände und Veränderungen im Deckungsbeitrag. Die dafür verfügbaren Daten stammen aus den jeweils freigegebenen Kundenkonten.",
        stage: "current",
      },
      {
        tag: "Buyer Solicitation",
        title: "Zulässige Bewertungsanfragen",
        text: "Für beauftragte Kunden ist ein interner Ablauf vorgesehen, mit dem eine zulässige, von Amazon bereitgestellte Bewertungsanfrage für eine Bestellung über die Solicitations API ausgelöst werden kann. Der beantragte Zugriff dient ausschließlich diesem Zweck. Eine Funktion für den automatisierten Versand ist derzeit nicht als Kundenprodukt verfügbar.",
        stage: "planned",
      },
      {
        tag: "Buyer Communication",
        title: "Bestellbezogene Kommunikation",
        text: "Für die Betreuung von Kundenkonten ist vorgesehen, die von Amazon für eine konkrete Bestellung erlaubten Nachrichtenaktionen über die Messaging API zu nutzen. Wir beantragen diese Rolle für zulässige, bestellbezogene Kommunikation, nicht für einen allgemeinen Zugriff auf Käuferdaten oder einen eigenständigen Nachrichteneingang.",
        stage: "planned",
      },
    ],
    accessEyebrow: "Autorisierung und Datenschutz",
    accessTitle: "Zugriff nur für beauftragte Marken.",
    access: "Eine Marke erteilt den Zugriff auf ihr Amazon-Konto selbst über die von Amazon vorgesehenen Berechtigungen. Wir fragen nicht nach ihrem Amazon-Passwort. Die beantragten SP-API-Rollen dienen den hier beschriebenen internen Arbeitsabläufen. Informationen zu Datenarten, Verarbeitung, Widerruf und Löschung stehen in unserer Datenschutzerklärung.",
    privacy: "Datenschutzerklärung lesen",
    priceEyebrow: "Zusammenarbeit und Preise",
    priceTitle: "Temoa OS ist Teil unserer Agenturarbeit.",
    price: "Wir verkaufen keine eigenständige Temoa-OS-Lizenz. Der Preis für unsere Agenturleistungen richtet sich nach dem beauftragten Leistungsumfang, der Zahl der betreuten Produkte und Marktplätze sowie der Zusammenarbeit im Account. Nach einem Gespräch erstellen wir ein individuelles Angebot.",
    cta: "Agenturleistungen anfragen",
    contact: "Fragen zu Temoa OS oder zur Betreuung eurer Marke?",
    email: "info@temoa.de",
  },
  en: {
    meta: {
      title: "Temoa OS: internal Amazon analytics for brands · temoa",
      description: "How Temoa GmbH uses Temoa OS for Amazon brand services, which data we analyse and how to request a quote for our agency work.",
    },
    eyebrow: "Internal workspace",
    title: "Temoa OS supports our work on your Amazon accounts.",
    intro: "Temoa OS is Temoa GmbH's internal workspace for managing Amazon brands. Our team brings together catalog, advertising, inventory and performance data for client work. Clients do not need a software login. They receive analysis, recommendations and completed work through our agency services.",
    offer: "Our agency services are available today. We are expanding our internal workflows with Amazon's Selling Partner API (SP-API). Access to account data depends on the relevant permissions and the brand's authorisation.",
    workEyebrow: "How we use the data",
    workTitle: "From reports to decisions.",
    workLead: "Temoa OS supports our team in managing authorised brands. Available data depends on the client account, marketplace and roles approved by Amazon.",
    current: "Agency analysis and management",
    planned: "SP-API access requested",
    features: [
      {
        tag: "Brand Analytics",
        title: "Search queries and brand performance",
        text: "We analyse Search Query Performance for the brands we manage: where products appear in search, how often shoppers click and add them to cart, and which searches lead to purchases. We use those findings to prioritise listing and advertising changes. The requested Brand Analytics access would enable our team to retrieve these reports for internal analysis.",
        stage: "planned",
      },
      {
        tag: "Product Listing · Pricing · Inventory and Order Tracking · Amazon Fulfillment · Finance and Accounting",
        title: "Catalog, availability and profitability",
        text: "In our ongoing work, we compare product data and live listings, monitor offers and prices, plan FBA inventory and assess sales and Amazon fees. This helps our team identify catalog differences, stock risks and changes in contribution margin. We work with data available from each authorised client account.",
        stage: "current",
      },
      {
        tag: "Buyer Solicitation",
        title: "Permitted review requests",
        text: "For clients who commission this service, we intend to support an internal workflow that triggers an Amazon-provided review request for an eligible order through the Solicitations API. The requested role serves this specific purpose. An automated sending feature is not currently offered as a client product.",
        stage: "planned",
      },
      {
        tag: "Buyer Communication",
        title: "Order-related communication",
        text: "For client account management, we intend to use the messaging actions Amazon permits for a specific order through its Messaging API. We request this role for permitted order-related communication, not for general access to buyer data or a standalone message inbox.",
        stage: "planned",
      },
    ],
    accessEyebrow: "Authorisation and privacy",
    accessTitle: "Access for authorised brands only.",
    access: "A brand grants access to its Amazon account through Amazon's authorisation process. We do not ask for the brand's Amazon password. The requested SP-API roles support the internal workflows described here. Our privacy policy explains the data categories, processing, revocation and deletion.",
    privacy: "Read our privacy policy",
    priceEyebrow: "Services and pricing",
    priceTitle: "Temoa OS is part of our agency work.",
    price: "We do not sell a standalone Temoa OS licence. Our agency fees depend on the services commissioned, the number of products and marketplaces we manage, and the scope of account work. We provide an individual quote after an initial conversation.",
    cta: "Request an agency quote",
    contact: "Questions about Temoa OS or support for your brand?",
    email: "info@temoa.de",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!istSprache(locale)) return {};
  return {
    title: inhalt[locale].meta.title,
    description: inhalt[locale].meta.description,
    alternates: sprachAngaben(locale, "/temoa-os"),
  };
}

export default async function TemoaOsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!istSprache(locale)) notFound();
  const w = inhalt[locale];
  return (
    <>
      <Kopfzeile />
      <main id="inhalt">
        <PageHero eyebrow={w.eyebrow} title={w.title} description={w.intro}>
          <a className="btn-primary inline-flex" href={pfad(locale, "/gespraech-vereinbaren")}>{w.cta}<span className="disc" aria-hidden>↗</span></a>
        </PageHero>
        <section className="ground-tint py-16 md:py-20" aria-labelledby="temoa-os-stand">
          <div className="container-x">
            <div className="panel mx-auto max-w-4xl p-7 md:p-10">
              <h2 id="temoa-os-stand" className="text-2xl font-bold text-ink md:text-3xl">{locale === "de" ? "Eine interne Arbeitsumgebung für unsere Agentur." : "An internal workspace for our agency."}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted">{w.offer}</p>
            </div>
          </div>
        </section>
        <section className="ground py-20 md:py-28" aria-labelledby="temoa-os-funktionen">
          <div className="container-x">
            <span className="text-label font-bold uppercase tracking-widest text-ink-faint">{w.workEyebrow}</span>
            <h2 id="temoa-os-funktionen" className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-ink md:text-5xl">{w.workTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">{w.workLead}</p>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {w.features.map((feature) => (
                <article key={feature.tag} className="panel p-7 md:p-9">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-faint">{feature.tag}</span>
                  <h3 className="mt-4 text-2xl font-bold leading-snug text-ink">{feature.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-muted">{feature.text}</p>
                  <span className="mt-6 inline-block rounded-full bg-navy/5 px-3 py-1.5 text-xs font-bold text-ink-muted">{feature.stage === "planned" ? w.planned : w.current}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="ground-deep on-dark py-20 md:py-24" aria-labelledby="temoa-os-datenschutz">
          <div className="container-x grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <span className="text-label font-bold uppercase tracking-widest text-chalk-faint">{w.accessEyebrow}</span>
              <h2 id="temoa-os-datenschutz" className="mt-4 text-3xl font-extrabold text-white md:text-4xl">{w.accessTitle}</h2>
            </div>
            <div className="panel-dark p-7 md:p-9">
              <p className="leading-relaxed text-chalk-muted">{w.access}</p>
              <a className="mt-6 inline-flex font-bold text-white underline underline-offset-4 hover:text-brand-400" href="/datenschutz">{w.privacy}</a>
            </div>
          </div>
        </section>
        <section className="ground py-20 md:py-28" aria-labelledby="temoa-os-preise">
          <div className="container-x">
            <div className="panel mx-auto max-w-4xl p-8 md:p-12">
              <span className="text-label font-bold uppercase tracking-widest text-ink-faint">{w.priceEyebrow}</span>
              <h2 id="temoa-os-preise" className="mt-4 text-3xl font-extrabold text-ink md:text-4xl">{w.priceTitle}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">{w.price}</p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a className="btn-primary inline-flex" href={pfad(locale, "/gespraech-vereinbaren")}>{w.cta}<span className="disc" aria-hidden>↗</span></a>
                <span className="text-sm text-ink-muted">{w.contact} <a className="font-bold underline underline-offset-4" href={`mailto:${w.email}`}>{w.email}</a></span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Fusszeile />
    </>
  );
}
