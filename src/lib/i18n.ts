/* ============================================================
   Sprachschicht.

   Zwei Sprachen: Deutsch und Englisch. Deutsch ist die Standardsprache und
   liegt ohne Praefix auf `/`. Das ist keine Geschmacksfrage: die deutschen
   Adressen stehen in Suchergebnissen und in Verweisen, und laut CLAUDE.md
   bleiben sie unveraendert. Englisch liegt unter `/en/`.

   Technisch tragen alle Seiten das Segment `[locale]`. Die Middleware
   schreibt `/` intern auf `/de` um, ohne die Adresse in der Leiste zu
   aendern. Damit gibt es genau einen Satz Seiten fuer beide Sprachen.
   ============================================================ */

export const sprachen = ["de", "en"] as const;
export type Sprache = (typeof sprachen)[number];

export const STANDARD: Sprache = "de";

/** Der Name der Sprache in ihrer eigenen Sprache, fuer den Umschalter. */
export const sprachName: Record<Sprache, string> = {
  de: "Deutsch",
  en: "English",
};

/** Kuerzel im Umschalter, wenn kein Platz fuer den ganzen Namen ist. */
export const sprachKurz: Record<Sprache, string> = {
  de: "DE",
  en: "EN",
};

/** Wert fuer `<html lang>` und `hreflang`. */
export const htmlLang: Record<Sprache, string> = {
  de: "de",
  en: "en",
};

/** Wert fuer Open Graph. */
export const ogLocale: Record<Sprache, string> = {
  de: "de_DE",
  en: "en_US",
};

export function istSprache(wert: string | undefined): wert is Sprache {
  return !!wert && (sprachen as readonly string[]).includes(wert);
}

/**
 * Adresse einer Seite in einer Sprache.
 *
 * Die Pfadsegmente sind in beiden Sprachen gleich (`/en/leistungen/strategie`).
 * Uebersetzte Segmente waeren fuer englische Suche schoener, verdoppeln aber
 * das Routing und brechen jeden Verweis, der sich auf einen Pfad verlaesst.
 * Wenn das spaeter gewuenscht ist, kommt hier eine Zuordnung dazu, und nur
 * hier.
 */
export function pfad(sprache: Sprache, ziel: string): string {
  const rein = ziel.startsWith("/") ? ziel : `/${ziel}`;
  if (sprache === STANDARD) return rein;
  return rein === "/" ? "/en" : `/en${rein}`;
}

/**
 * Pfad ohne Sprachpraefix.
 *
 * Streift `/de` und `/en` ab, nicht nur `/en`. Der Grund: die Weiche schreibt
 * die deutschen Adressen intern auf `/de/...` um, und `usePathname` liefert
 * diesen umgeschriebenen Pfad, nicht den aus der Adressleiste. Ohne `/de` in
 * der Liste baute der Umschalter auf der deutschen Startseite die Adresse
 * `/en/de`.
 */
export function ohnePraefix(pathname: string): string {
  return pathname.replace(/^\/(de|en)(?=\/|$)/, "") || "/";
}

/**
 * Dieselbe Seite in der anderen Sprache, ausgehend vom aktuellen Pfad.
 * Braucht der Umschalter: er soll auf der Seite bleiben, auf der man ist.
 */
export function pfadWechsel(aktuellerPfad: string, ziel: Sprache): string {
  return pfad(ziel, ohnePraefix(aktuellerPfad));
}

/**
 * Sprache aus einem `Accept-Language`-Kopf lesen.
 *
 * Bewusst die Browsersprache und nicht das Land: ein deutschsprachiger
 * Besucher in New York will Deutsch, und eine Weiterleitung nach IP wuerde
 * ausserdem den Google-Crawler, der aus den USA kommt, ueberall auf Englisch
 * schicken. Dann bleiben die deutschen Seiten unindexiert.
 */
export function ausAcceptLanguage(kopf: string | null): Sprache {
  if (!kopf) return STANDARD;
  const eintraege = kopf
    .split(",")
    .map((teil) => {
      const [name, ...rest] = teil.trim().split(";");
      const q = rest.find((r) => r.trim().startsWith("q="));
      const gewicht = q ? Number.parseFloat(q.split("=")[1]) : 1;
      return { name: name.trim().toLowerCase(), gewicht: Number.isFinite(gewicht) ? gewicht : 0 };
    })
    .sort((a, b) => b.gewicht - a.gewicht);

  for (const e of eintraege) {
    if (e.name === "*") return STANDARD;
    const basis = e.name.split("-")[0];
    if (basis === "de") return "de";
    if (basis === "en") return "en";
  }
  return STANDARD;
}

/**
 * `hreflang`-Angaben fuer eine einzelne Seite.
 *
 * Muss pro Seite gesetzt werden, nicht im Layout: im Layout kennt niemand den
 * Pfad, und eine geerbte Angabe behauptet dann fuer jede Unterseite, ihre
 * Entsprechung liege auf der Startseite. Ein falsches `hreflang` ist
 * schlechter als keines, Google wirft die Seiten dann zusammen.
 *
 * `ziel` ist der Pfad ohne Sprachpraefix, also "/" oder "/leistungen/strategie".
 */
export function sprachAngaben(sprache: Sprache, ziel: string) {
  return {
    canonical: pfad(sprache, ziel),
    languages: {
      de: pfad("de", ziel),
      en: pfad("en", ziel),
      "x-default": pfad(STANDARD, ziel),
    },
  };
}

/**
 * Sprache aus einem Pfad ablesen.
 *
 * Damit koennen Kopf- und Fusszeile ihre Sprache selbst bestimmen, ohne dass
 * jede der dreizehn Seiten sie durchreichen muss.
 */
export function spracheAusPfad(pathname: string): Sprache {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : STANDARD;
}
