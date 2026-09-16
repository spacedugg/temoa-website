import { HERO_BILD } from "./hero-bild";

/* ============================================================
   Die Grafik im Hero der Startseite.

   Zwoelf Fassungen liegen dahinter, darunter fuenf 3D-Entwuerfe, ein erzeugtes
   Produkt und eine Komposition aus dem Miganeo-Listing. Der Kunde hat das
   Bild selbst geliefert; es steht freigestellt auf dem Grund, ohne Platte und
   ohne Rahmen, mit einem warmen Lichthof dahinter. Es bewegt sich nicht.

   Es gibt genau eine Datei. Sie steht in beiden Sprachen. Vorher lief hier
   eine Verzweigung nach der Sprache der Seite, weil die Beschriftung im Bild
   steckt und es das Bild deshalb zweimal gab. Der Kunde hat ein einzelnes
   Bild fuer beide Fassungen vorgegeben. Kommt wieder eine englische Fassung,
   nimmt `scripts/hero-bild.mjs` sie als zweite Angabe und diese Datei braucht
   die Verzweigung zurueck.

   Die Ladezeit: dieses Bild ist das groesste Element im ersten Bildschirm und
   damit das, an dem Google die Ladezeit misst. Deshalb liegt es in zwei
   Groessen und zwei Formaten vor, traegt `fetchPriority="high"` und wird
   nicht verzoegert geladen. Und es blendet sich nicht ein: ein Bild, das eine
   Sekunde lang auf Deckkraft null steht, gilt eine Sekunde lang als nicht
   geladen. Das Einlaufen macht die Huelle in `Auftrag`.
   ============================================================ */

const STAMM = "/bilder/h-listing";

/* Die Spalte ist am Rechner rund 34 rem breit, darunter laeuft sie ueber die
   Breite abzueglich der Raender des Containers. */
const SIZES = "(min-width: 64rem) 34rem, calc(100vw - 3rem)";

export function HeroBuehne({ bildAlt }: { bildAlt: string }) {
  const satz = (endung: string) =>
    `${STAMM}-klein.${endung} 760w, ${STAMM}.${endung} ${HERO_BILD.breite}w`;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-full opacity-70 blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.28), transparent 68%)" }}
      />
      <picture>
        <source type="image/avif" srcSet={satz("avif")} sizes={SIZES} />
        <source type="image/webp" srcSet={satz("webp")} sizes={SIZES} />
        <img
          src={`${STAMM}.webp`}
          alt={bildAlt}
          width={HERO_BILD.breite}
          height={HERO_BILD.hoehe}
          fetchPriority="high"
          decoding="async"
          className="relative block w-full"
        />
      </picture>
    </div>
  );
}
