import type { MetadataRoute } from "next";
import { SEITE } from "@/lib/seite";

/* ============================================================
   robots.txt

   Zwei Dinge stehen hier, und beide sind Absicht.

   1. Nichts ist gesperrt. Impressum, Datenschutz und AGB gehoeren in den
      Index: sie sind Pflichtangaben, und wer nach der Firma sucht, soll sie
      finden. Eine Sperre haette ausserdem den Nebeneffekt, dass Google die
      Seiten trotzdem in den Index aufnehmen kann, nur ohne den Text lesen zu
      duerfen. Das ist schlechter als gar keine Regel.

   2. Die Programme der KI-Anbieter sind ausdruecklich genannt und erlaubt.
      Genannt und nicht weggelassen: eine Regel, die dasteht, ist eine
      Entscheidung, die jemand getroffen hat. Wer die Website spaeter aus
      einem dieser Modelle heraushalten will, aendert hier eine Zeile.

      `Google-Extended` steuert die Verwendung in Gemini, nicht das Ranking in
      der Suche. Beides bleibt erlaubt.

   Die Vorschau-Adressen bei Vercel werden komplett gesperrt: dieselbe Seite
   unter zwei Adressen im Index ist ein Duplikat, und das Duplikat gewinnt
   manchmal.
   ============================================================ */

const KI_PROGRAMME = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  /* Auf jeder Umgebung ausser der echten Seite gilt: nichts indexieren.
     `VERCEL_ENV` ist „production" nur fuer die Hauptadresse. */
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...KI_PROGRAMME.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SEITE.url}/sitemap.xml`,
    host: SEITE.url,
  };
}
