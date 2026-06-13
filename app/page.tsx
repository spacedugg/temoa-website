import Link from "next/link";

// Auswahl: fünf komplett verschiedene Stilrichtungen, identische Inhalte.
const styles = [
  { href: "/stil-1", name: "Stil 1 — Editorial", text: "Magazin-Ästhetik: riesige Typografie, viel Weißraum, dünne Linien, nummerierte Sektionen, eine Akzentfarbe. Ruhig und premium." },
  { href: "/stil-2", name: "Stil 2 — Brutalist Grid", text: "Schweizer Plakat-Brutalismus: hartes sichtbares Raster, dicke Rahmen, solide Offset-Schatten, Monospace, kräftige Farbblöcke." },
  { href: "/stil-3", name: "Stil 3 — Cinematic Dark", text: "Durchgehend dunkel, Spotlight-Glows, Glas-Panels, glühende Orange/Rot-Kanten, große leuchtende Zahlen. Premium-Dark." },
  { href: "/stil-4", name: "Stil 4 — Aurora Soft", text: "Helle, freundliche Welt: weiche Gradient-Blobs im Hintergrund, stark gerundete Formen, sanfte Schatten, schwebend." },
  { href: "/stil-5", name: "Stil 5 — Control Room", text: "Wirkt wie ein Analytics-Produkt: Monospace-Zahlen, feines Raster, Dashboard-Karten, Live-Anmutung, technisch." },
  { href: "/stil-6", name: "Stil 6 — Produkt-Bühne", text: "Cinematischer 3D-Hero: schwebendes Produkt auf glänzendem Podest, Orange/Rot-Lichtkanten, Glas-Dashboards umkreisen das Produkt. Darunter helle, premium-glatte Sektionen." },
  { href: "/stil-7", name: "Stil 7 — Studio (Agentur-Look)", text: "Nach deinem Referenz-Template: tiefer Navy-Canvas, weiße schwebende Panels, fließende Wellenlinien, kondensierte Großbuchstaben-Headlines, nummerierte Service-Karten, Häkchen-Listen." },
  { href: "/stil-8", name: "Stil 8 — Landeros (Dark Premium)", text: "Nach landeros.framer.website in TEMOA-Farben: warmes Anthrazit, riesige enge Display-Typo, gerundete Karten mit Haarlinien-Rändern, rotierendes Rund-Badge, aufklappbare Service-Zeilen, große Work-Cards." },
  { href: "/stil-9", name: "Stil 9 — Landeros Light / Glas", text: "Heller Modus mit echtem Glasmorphismus: weich verschwommene Farb-Blobs im Hintergrund, durchscheinende Frosted-Glass-Panels, gestaffelte Tiefen-Schatten, schwebende Glas-KPIs, rotierendes Badge, aufklappbare Service-Zeilen." },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-10 w-auto" />
      <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-ink">Fünf Stilrichtungen — eine wählen</h1>
      <p className="mt-3 text-ink-soft">
        Alle fünf setzen dieselbe abgestimmte Copy um — Inhalte, Funnel und CTAs sind identisch, nur die
        Gestaltung unterscheidet sich radikal. (Frühere Entwürfe unter <Link href="/entwurf-g" className="underline">/entwurf-g</Link>.)
      </p>
      <div className="mt-10 space-y-5">
        {styles.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded-2xl border border-line bg-white p-6 shadow-[0_20px_45px_-32px_rgba(2,48,71,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <h2 className="text-xl font-bold text-ink">{s.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            <span className="mt-3 inline-block text-sm font-bold text-brand-orange">Ansehen →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
