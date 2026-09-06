import { Logo } from "../Logo";

/** Fußzeile als Planfuß: Kennung links, Spalten rechts, alles auf Hairlines. */

const cols = [
  {
    title: "Leistungen",
    links: [
      { label: "Strategie", href: "/leistungen/strategie" },
      { label: "Produktbilder & SEO", href: "/leistungen/listing-seo" },
      { label: "PPC Advertising", href: "/leistungen/ppc-advertising" },
      { label: "Account Management", href: "/leistungen/account-management" },
      { label: "Internationalisierung", href: "/leistungen/internationalisierung" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Case Studies", href: "/ergebnisse" },
      { label: "Designbeispiele", href: "/design-beispiele" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export function Fusszeile() {
  return (
    <footer className="on-dark relative bg-navy text-chalk">
      
      <div className="container-x">
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <Logo variant="white" />
            <p className="mt-5 max-w-[34ch] text-small leading-relaxed text-chalk-muted">
              Amazon Full Service Wachstumspartner. Erst ein Listing, das organisch verkauft, dann
              Werbung, die darauf aufbaut.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-label font-bold uppercase text-chalk-faint">{c.title}</h2>
              <ul className="mt-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="flex min-h-[2.75rem] items-center text-small text-chalk-muted transition-colors hover:text-brand-500"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/10 py-6 text-small text-chalk-faint md:flex-row md:items-center">
          <span className="[font-variant-numeric:tabular-nums]">© {new Date().getFullYear()} temoa</span>
          <a
            href="mailto:kontakt@temoa.de"
            className="flex min-h-[2.75rem] items-center transition-colors hover:text-brand-500"
          >
            kontakt@temoa.de
          </a>
        </div>
      </div>
    </footer>
  );
}
