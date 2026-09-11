import { NextResponse, type NextRequest } from "next/server";
import { ausAcceptLanguage, STANDARD } from "@/lib/i18n";

/* ============================================================
   Sprachweiche.

   Zwei Aufgaben:

   1. Deutsch ohne Praefix. Alle Seiten liegen technisch unter `[locale]`,
      die deutschen Adressen sollen aber `/leistungen/strategie` bleiben und
      nicht `/de/leistungen/strategie` werden. Deshalb wird intern
      umgeschrieben (`rewrite`), nicht weitergeleitet: die Adresse in der
      Leiste bleibt, wie sie ist.

   2. Beim ersten Besuch die Browsersprache beruecksichtigen. Nur beim ersten
      Besuch, nur fuer echte Browser, und nur als Vorschlag: wer den
      Umschalter benutzt, bekommt ein Cookie, und danach entscheidet dieses.

   Ausdruecklich nicht nach Land. Google crawlt aus den USA. Eine
   Weiterleitung nach IP wuerde dem Crawler ueberall Englisch zeigen, und die
   deutschen Seiten blieben unindexiert. Crawler werden hier nie
   weitergeleitet.
   ============================================================ */

export const SPRACH_COOKIE = "temoa_sprache";

/* Wer sich als Programm ausweist, wird nicht weitergeleitet. Die Liste muss
   nicht vollstaendig sein: im Zweifel bleibt es bei Deutsch, und das ist die
   Fassung, die indexiert werden soll. */
const PROGRAMME =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|vkshare|w3c_validator|whatsapp|telegram|lighthouse|headlesschrome|gptbot|claudebot|ccbot|perplexity/i;

function istProgramm(ua: string | null) {
  return !!ua && PROGRAMME.test(ua);
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Englisch liegt offen unter /en und braucht keine Umschreibung.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  /* Deutsch hat kein Praefix. Wer trotzdem `/de/...` aufruft, wird dauerhaft
     auf die Adresse ohne Praefix geleitet. Ohne das lief `/de/x` in die
     Umschreibung darunter und landete auf `/de/de/x`, also auf einer 404.
     Dauerhaft und nicht vorlaeufig: dieselbe Seite unter zwei Adressen ist
     ein Duplikat. Eine 308 sagt der Suchmaschine, welche davon gilt. */
  if (pathname === "/de" || pathname.startsWith("/de/")) {
    const ziel = request.nextUrl.clone();
    ziel.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(ziel, 308);
  }

  const cookie = request.cookies.get(SPRACH_COOKIE)?.value;
  const ua = request.headers.get("user-agent");

  // Erster Besuch, echter Browser, Browsersprache Englisch: Vorschlag
  // annehmen. Mit Cookie entscheidet immer das Cookie.
  if (!cookie && !istProgramm(ua)) {
    const vorschlag = ausAcceptLanguage(request.headers.get("accept-language"));
    if (vorschlag === "en") {
      const ziel = request.nextUrl.clone();
      ziel.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
      return NextResponse.redirect(ziel);
    }
  }

  // Cookie sagt Englisch: dorthin, damit ein Besucher nach der Wahl auf
  // jeder weiteren Seite in seiner Sprache bleibt.
  if (cookie === "en") {
    const ziel = request.nextUrl.clone();
    ziel.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(ziel);
  }

  // Standardfall: Deutsch, intern auf das Sprachsegment umgeschrieben.
  const umschrift = request.nextUrl.clone();
  umschrift.pathname = `/${STANDARD}${pathname === "/" ? "" : pathname}`;
  umschrift.search = search;
  return NextResponse.rewrite(umschrift);
}

export const config = {
  /* Alles ausser Next-Interna, Dateien mit Endung und den API-Routen. Ohne
     die Ausnahme fuer Endungen laufen Bilder, Schriften und die
     Sitemap durch die Weiche.

     `opengraph-image` ist ebenfalls ausgenommen. Es traegt keine Endung, ist
     aber ein Bild und liegt unter dem Sprachsegment: `/de/opengraph-image`.
     Liefe es durch die Weiche, wuerde daraus `/de/de/opengraph-image`. Die
     Adresse, die in `og:image` steht, waere dann eine 404. */
  matcher: ["/((?!api|_next/static|_next/image|.*opengraph-image|.*\\.[\\w]+$).*)"],
};
