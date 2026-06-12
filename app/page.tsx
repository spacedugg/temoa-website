import Link from "next/link";

const drafts = [
  {
    href: "/entwurf-g",
    name: "Entwurf G — Produktbühne & Ebenen (aktuell)",
    text: "Das abgestimmte Konzept: fotorealistische 3D-Produktbühne mit schwebenden Glas-Dashboards im Hero, überlappende Ebenen mit Tiefenwirkung, asymmetrische Layouts, inhaltlich passende Effekte je Sektion — Glasmorphismus nur als Akzent, keine Bento-Raster.",
  },
  {
    href: "/entwurf-a",
    name: "Entwurf A — Editorial",
    text: "Ruhig und hochwertig: viel Weißraum, große Navy-Typografie, präzise Orange-Akzente, weich gestaffelte Karten mit Parallax im Hero.",
  },
  {
    href: "/entwurf-b",
    name: "Entwurf B — Bühne",
    text: "2.5D-Tiefe: perspektivisch gekipptes Dashboard, das sich beim Scrollen aufrichtet, Gradient-Mesh, gestapelte Sticky-Ebenen für Organic First.",
  },
  {
    href: "/entwurf-c",
    name: "Entwurf C — Signal",
    text: "Energetisch: Orange-Rot-Verläufe, große Zahlen, Marquee-Band, diagonale Sektionskanten, kräftige Statements.",
  },
  {
    href: "/entwurf-d",
    name: "Entwurf D — Raster",
    text: "Grafisch-schweizerisch: harte Kanten, sichtbares Liniengerüst, Versatz-Schatten wie Druckebenen, die Logo-Geometrie als System. Keine runden Karten, keine weichen Schatten.",
  },
  {
    href: "/entwurf-e",
    name: "Entwurf E — Licht",
    text: "Cinematisch und kartenlos: Inhalte direkt auf Weiß, getrennt durch Glow-Auren statt Boxen, extreme Typo-Gewichtskontraste (Thin gegen ExtraBold), frei schwebende Kompositionen.",
  },
  {
    href: "/entwurf-f",
    name: "Entwurf F — Produktbühne kompakt",
    text: "Der abgestimmte Mix: fotorealistische 3D-Produktbühne im Hero, dezente kompakte Typografie, weiche Bento-Kacheln — und jede Sektion passt komplett in einen Viewport.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <img src="/assets/logos/logo_full.svg" alt="TEMOA" className="h-10 w-auto" />
      <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-ink">
        Design-Auswahl für die Startseite
      </h1>
      <p className="mt-3 text-ink-soft">
        Aktueller Arbeitsstand ist Entwurf G. Die Entwürfe A–F sind verworfen und bleiben nur als
        Verlauf erreichbar — Funnel, Texte und CTAs sind überall identisch.
      </p>
      <div className="mt-10 space-y-5">
        {drafts.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="block rounded-2xl border border-line bg-white p-6 shadow-[0_20px_45px_-32px_rgba(2,48,71,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <h2 className="text-xl font-bold text-ink">{d.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.text}</p>
            <span className="mt-3 inline-block text-sm font-bold text-brand-orange">Entwurf ansehen</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
