import { Logo } from "./Logo";

const cols = [
  {
    title: "Leistungen",
    links: [
      { label: "Strategie & Analyse", href: "/leistungen/strategie" },
      { label: "Content & Listings", href: "/leistungen/listing-seo" },
      { label: "Advertising / PPC", href: "/leistungen/ppc-advertising" },
      { label: "Account-Management", href: "/leistungen/account-management" },
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

export function Footer() {
  return (
    <footer
      className="relative pt-16 text-white"
      style={{ backgroundImage: "linear-gradient(165deg, #023047 0%, #021A28 100%)" }}
    >
      <div className="container-x">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Amazon Full Service Wachstumspartner. Erst ein Listing, das organisch
              verkauft, dann PPC, das vom ersten Euro an profitabel arbeitet.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} temoa</span>
          <div className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-white">Impressum</a>
            <a href="/datenschutz" className="transition-colors hover:text-white">Datenschutz</a>
            <a href="mailto:kontakt@temoa.de" className="transition-colors hover:text-white">kontakt@temoa.de</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
