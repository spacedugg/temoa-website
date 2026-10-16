import { SEITE } from "@/lib/seite";
import { pfad, type Sprache } from "@/lib/i18n";

/* ============================================================
   Strukturierte Daten (JSON-LD).

   Das ist die maschinenlesbare Fassung dessen, was ohnehin auf der Seite
   steht: wer die Firma ist, wo sie sitzt, wie sie erreichbar ist, was sie
   anbietet. Google liest sie fuer das Wissenspanel, und die Sprachmodelle
   lesen sie ebenfalls, weil sie eindeutig ist. Ein Text muss interpretiert
   werden, ein Feld nicht.

   Wichtig: hier steht nichts, was nicht auch sichtbar auf der Seite steht.
   Angaben, die nur in den strukturierten Daten auftauchen, sind fuer Google
   ein Grund, alle zu verwerfen.

   Bewertungen stehen bewusst nicht darin. Eine `aggregateRating`-Angabe zur
   eigenen Firma auf der eigenen Seite wertet Google seit 2019 nicht mehr aus,
   und ohne belegte Zahl waere sie ohnehin erfunden.
   ============================================================ */

function Daten({ inhalt }: { inhalt: object }) {
  return (
    <script
      type="application/ld+json"
      /* Der Text ist selbst erzeugt, nicht aus einer Eingabe. `<` wird trotzdem
         maskiert: ein „</script>" in einem Feld wuerde den Block sonst
         vorzeitig schliessen. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(inhalt).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function StrukturierteDaten({ sprache }: { sprache: Sprache }) {
  const beschreibung =
    sprache === "de"
      ? "Amazon Full Service: Produktbilder, Listing-SEO, PPC Advertising, Account Management und Internationalisierung für etablierte Marken."
      : "Amazon full service: product images, listing SEO, PPC advertising, account management and international expansion for established brands.";

  const organisation = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SEITE.url}/#organisation`,
    name: SEITE.name,
    legalName: SEITE.firma,
    url: SEITE.url,
    logo: `${SEITE.url}/icon/icon-512.png`,
    image: `${SEITE.url}/icon/icon-512.png`,
    email: SEITE.email,
    description: beschreibung,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEITE.anschrift.strasse,
      postalCode: SEITE.anschrift.plz,
      addressLocality: SEITE.anschrift.ort,
      addressCountry: SEITE.anschrift.land,
    },
    sameAs: SEITE.profile,
    /* Die fuenf Leistungen aus der Navigation plus die fuenf Seiten
       aus der Fusszeile (Compliance, FBA, Katalog, Software, Reporting). Die Adressen
       bleiben in beiden Sprachen deutsch, die Sprache steckt im Praefix. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: sprache === "de" ? "Leistungen" : "Services",
      itemListElement: [
        ["Strategie", "Strategy", "/leistungen/strategie"],
        ["Produktbilder & SEO", "Product images & SEO", "/leistungen/listing-seo"],
        ["PPC Advertising", "PPC advertising", "/leistungen/ppc-advertising"],
        ["Account Management", "Account management", "/leistungen/account-management"],
        ["Internationalisierung", "International expansion", "/leistungen/internationalisierung"],
        ["Compliance & Account Health", "Compliance & account health", "/leistungen/compliance-account-health"],
        ["FBA & Inventory Management", "FBA & inventory management", "/leistungen/fba-inventory-management"],
        ["Katalog & Listing Management", "Catalog & listing management", "/leistungen/katalog-listing-management"],
        ["Software & Account Intelligence", "Software & account intelligence", "/leistungen/software-account-intelligence"],
        ["Analytics & Reporting", "Analytics & reporting", "/leistungen/analytics-reporting"],
      ].map(([de, en, ziel]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sprache === "de" ? de : en },
        url: `${SEITE.url}${pfad(sprache, ziel)}`,
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEITE.url}/#website`,
    url: SEITE.url,
    name: SEITE.name,
    inLanguage: sprache,
    publisher: { "@id": `${SEITE.url}/#organisation` },
  };

  return (
    <>
      <Daten inhalt={organisation} />
      <Daten inhalt={website} />
    </>
  );
}

/**
 * Strukturierte Daten fuer einen Blogbeitrag: Artikel und Brotkrumenpfad.
 *
 * Der Pfad steht auch sichtbar ueber der Ueberschrift (Blog, Kategorie), die
 * Angabe deckt sich also mit dem, was ein Besucher sieht. Ein Veroeffentlichungs-
 * datum steht bewusst nicht darin: die Beitraege tragen keines, und ein
 * erfundenes waere genau die Sorte Angabe, die Google als Verstoss wertet.
 */
export function ArtikelDaten({
  sprache,
  slug,
  titel,
  beschreibung,
  bild,
  kategorie,
  kategorieSlug,
  blogName,
}: {
  sprache: Sprache;
  slug: string;
  titel: string;
  beschreibung: string;
  bild?: string;
  kategorie: string;
  kategorieSlug: string;
  blogName: string;
}) {
  const url = `${SEITE.url}${pfad(sprache, `/blog/${slug}`)}`;
  const artikel = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#artikel`,
    mainEntityOfPage: url,
    headline: titel,
    description: beschreibung,
    inLanguage: sprache,
    ...(bild && { image: bild.startsWith("http") ? bild : `${SEITE.url}${bild}` }),
    author: { "@id": `${SEITE.url}/#organisation` },
    publisher: { "@id": `${SEITE.url}/#organisation` },
  };
  const pfadDaten = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: blogName, item: `${SEITE.url}${pfad(sprache, "/blog")}` },
      {
        "@type": "ListItem",
        position: 2,
        name: kategorie,
        item: `${SEITE.url}${pfad(sprache, `/blog/kategorie/${kategorieSlug}`)}`,
      },
      { "@type": "ListItem", position: 3, name: titel, item: url },
    ],
  };
  return (
    <>
      <Daten inhalt={artikel} />
      <Daten inhalt={pfadDaten} />
    </>
  );
}
