/* ============================================================
   Darstellung der Rechtstexte (Impressum, Datenschutz, AGB).

   Die Texte kommen vom Kunden und stehen wortgleich in `src/lib/recht`.
   Sie liegen dort als einfacher Text und nicht als JSX, damit eine neue
   Fassung eingesetzt werden kann, ohne dass jemand Markup anfassen muss:
   ein Rechtstext wird von Juristen geliefert, nicht von Entwicklern.

   Erkannt wird nur, was in diesen Texten vorkommt:

   - `## ` und `### ` als Ueberschriften
   - `- ` und `* ` als Aufzaehlung
   - `> ` als hervorgehobener Kasten (das Widerspruchsrecht steht in
     Grossbuchstaben und braucht eine eigene Flaeche, sonst schreit es)
   - Links in eckigen Klammern und nackte Adressen
   - Fette Stellen zwischen zwei Sternen

   Kein Markdown-Paket dafuer: das waere ein weiteres Paket im Bundle fuer
   drei Seiten, die sich zweimal im Jahr aendern.
   ============================================================ */

type Block =
  | { art: "h2"; text: string }
  | { art: "h3"; text: string }
  | { art: "p"; text: string }
  | { art: "note"; text: string }
  | { art: "slot"; name: string }
  | { art: "ul"; punkte: string[] };

function zerlege(quelle: string): Block[] {
  const bloecke: Block[] = [];
  let punkte: string[] = [];
  let absatz: string[] = [];
  let kasten: string[] = [];

  const schliesseListe = () => {
    if (punkte.length) bloecke.push({ art: "ul", punkte });
    punkte = [];
  };
  const schliesseAbsatz = () => {
    if (absatz.length) bloecke.push({ art: "p", text: absatz.join(" ") });
    absatz = [];
  };
  const schliesseKasten = () => {
    if (kasten.length) bloecke.push({ art: "note", text: kasten.join(" ") });
    kasten = [];
  };
  const schliesseAlles = () => {
    schliesseListe();
    schliesseAbsatz();
    schliesseKasten();
  };

  for (const roh of quelle.split("\n")) {
    const zeile = roh.trim();
    if (!zeile) {
      schliesseAlles();
      continue;
    }
    if (zeile.startsWith("[[") && zeile.endsWith("]]")) {
      /* Platzhalter fuer eine Komponente mitten im Text: unter 10.2 der
         Datenschutzerklaerung steht die Liste der eingebundenen Dienste, und
         die kommt aus `lib/consent.ts`, damit Banner und Erklaerung nicht
         auseinanderlaufen koennen. */
      schliesseAlles();
      bloecke.push({ art: "slot", name: zeile.slice(2, -2) });
    } else if (zeile.startsWith("### ")) {
      schliesseAlles();
      bloecke.push({ art: "h3", text: zeile.slice(4) });
    } else if (zeile.startsWith("## ")) {
      schliesseAlles();
      bloecke.push({ art: "h2", text: zeile.slice(3) });
    } else if (zeile.startsWith("- ") || zeile.startsWith("* ")) {
      schliesseAbsatz();
      schliesseKasten();
      punkte.push(zeile.slice(2));
    } else if (zeile.startsWith("> ")) {
      schliesseAbsatz();
      schliesseListe();
      kasten.push(zeile.slice(2));
    } else {
      schliesseListe();
      schliesseKasten();
      absatz.push(zeile);
    }
  }
  schliesseAlles();
  return bloecke;
}

const LINK = "font-semibold text-navy underline decoration-brand-500 decoration-2 underline-offset-2 transition-colors hover:decoration-navy";

/* Links, Adressen und fette Stellen im laufenden Text. Ein einziger
   Ausdruck mit drei Gruppen, damit die Reihenfolge im Text erhalten bleibt. */
const MUSTER = /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s,)]+)|\*\*([^*]+)\*\*/g;

function Inline({ text }: { text: string }) {
  const teile: React.ReactNode[] = [];
  let zuletzt = 0;
  let treffer: RegExpExecArray | null;
  MUSTER.lastIndex = 0;
  while ((treffer = MUSTER.exec(text))) {
    if (treffer.index > zuletzt) teile.push(text.slice(zuletzt, treffer.index));
    const schluessel = `${treffer.index}`;
    if (treffer[1]) {
      teile.push(
        <a key={schluessel} href={treffer[2]} className={LINK} target="_blank" rel="noreferrer">
          {treffer[1]}
        </a>,
      );
    } else if (treffer[3]) {
      /* Ein Punkt am Satzende gehoert nicht mehr zur Adresse. */
      const roh = treffer[3];
      const adresse = roh.replace(/[.,;:]+$/, "");
      teile.push(
        <a key={schluessel} href={adresse} className={`${LINK} break-words`} target="_blank" rel="noreferrer">
          {adresse.replace(/^https?:\/\//, "")}
        </a>,
      );
      if (roh.length > adresse.length) teile.push(roh.slice(adresse.length));
    } else if (treffer[4]) {
      teile.push(
        <strong key={schluessel} className="font-bold text-ink">
          {treffer[4]}
        </strong>,
      );
    }
    zuletzt = treffer.index + treffer[0].length;
  }
  if (zuletzt < text.length) teile.push(text.slice(zuletzt));
  return <>{teile}</>;
}

export function Rechtstext({
  quelle,
  bausteine = {},
}: {
  quelle: string;
  bausteine?: Record<string, React.ReactNode>;
}) {
  const bloecke = zerlege(quelle);
  return (
    <section className="ground relative py-12 md:py-20">
      <div className="container-x">
        <div className="panel mx-auto max-w-3xl px-6 py-9 md:px-11 md:py-12">
          {bloecke.map((b, i) => {
            if (b.art === "h2")
              return (
                <h2
                  key={i}
                  className={`text-[1.15rem] font-extrabold leading-snug tracking-tight text-ink md:text-[1.3rem] ${
                    i === 0 ? "" : "mt-11"
                  }`}
                >
                  <Inline text={b.text} />
                </h2>
              );
            if (b.art === "h3")
              return (
                <h3 key={i} className="mt-7 text-[1rem] font-bold leading-snug text-ink">
                  <Inline text={b.text} />
                </h3>
              );
            if (b.art === "ul")
              return (
                <ul key={i} className="mt-3 space-y-2">
                  {b.punkte.map((p, j) => (
                    <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-muted">
                      <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span>
                        <Inline text={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              );
            if (b.art === "slot")
              return (
                <div key={i} className="mt-6">
                  {bausteine[b.name] ?? null}
                </div>
              );
            if (b.art === "note")
              return (
                <p
                  key={i}
                  className="mt-4 rounded-2xl bg-navy/[0.04] px-5 py-4 text-[0.88rem] leading-relaxed text-ink-soft shadow-[inset_0_0_0_1px_rgba(2,48,71,0.08)]"
                >
                  <Inline text={b.text} />
                </p>
              );
            return (
              <p key={i} className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                <Inline text={b.text} />
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
