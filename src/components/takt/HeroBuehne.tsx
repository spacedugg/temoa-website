import { HERO_BILD } from "./hero-bild";
import type { Sprache } from "@/lib/i18n";

/* ============================================================
   Die Grafik im Hero der Startseite.

   Elf Fassungen liegen dahinter, darunter fuenf 3D-Entwuerfe, ein erzeugtes
   Produkt und eine Komposition aus dem Miganeo-Listing. Der Kunde hat das
   Bild selbst geliefert; es steht freigestellt auf dem Grund, ohne Platte und
   ohne Rahmen, mit einem warmen Lichthof dahinter. Es bewegt sich nicht.

   Zwei Dinge kommen jetzt dazu.

   Erstens die Sprache. Die Beschriftung steckt im Bild, also gibt es das Bild
   zweimal. Auf `/en` steht die englische Fassung. Das geht ueber die Sprache
   der Seite und nicht ueber den Ort des Besuchers: ein Deutscher im Urlaub
   soll nicht ploetzlich ein englisches Bild sehen.

   Zweitens die Ladezeit. Dieses Bild ist das groesste Element im ersten
   Bildschirm und damit das, an dem Google die Ladezeit misst. Deshalb liegt
   es in zwei Groessen und zwei Formaten vor (siehe `scripts/hero-bild.mjs`),
   traegt `fetchPriority="high"` und wird nicht verzoegert geladen. Und es
   blendet sich nicht ein: ein Bild, das eine Sekunde lang auf Deckkraft null
   steht, gilt eine Sekunde lang als nicht geladen. Das Einlaufen macht die
   Huelle in `Auftrag`.
   ============================================================ */

/** `h-listing` auf Deutsch, `h-listing-en` auf Englisch. */
function stamm(sprache: Sprache) {
  return sprache === "en" ? "/bilder/h-listing-en" : "/bilder/h-listing";
}

/* Die Spalte ist am Rechner rund 34 rem breit, darunter laeuft sie ueber die
   Breite abzueglich der Raender des Containers. */
const SIZES = "(min-width: 64rem) 34rem, calc(100vw - 3rem)";

export function HeroBuehne({ bildAlt, sprache }: { bildAlt: string; sprache: Sprache }) {
  const s = stamm(sprache);
  const satz = (endung: string) => `${s}-klein.${endung} 760w, ${s}.${endung} ${HERO_BILD.breite}w`;

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
          src={`${s}.webp`}
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
