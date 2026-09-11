import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { istSprache, sprachen } from "@/lib/i18n";
import { woerter } from "@/lib/woerter";

/* ============================================================
   Das Vorschaubild, das beim Teilen erscheint.

   Gezeichnet und nicht fotografiert: der Text muss lesbar sein, auch als
   Vorschau in einer Nachrichten-App von 300 Pixeln Breite. Deshalb grosse
   Schrift, wenig darauf, und der Grund ist das Navy der Marke.

   Je Sprache ein Bild: die Zeile darauf ist die Ueberschrift der Startseite,
   und die steht in beiden Sprachen anders.

   Die Schrift kommt als Datei aus dem Verzeichnis und nicht aus dem System:
   auf dem Server, der dieses Bild erzeugt, ist keine Schrift installiert.
   ============================================================ */

export const alt = "temoa · Amazon Full Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return sprachen.map((locale) => ({ locale }));
}

/* Die Schrift wird aus dem Verzeichnis gelesen und nicht ueber `new URL(...,
   import.meta.url)` geholt: der Bauschritt macht daraus eine Adresse unter
   `/_next/static`, und die laesst sich zum Zeitpunkt des Bauens nicht abrufen.
   Das Bild entsteht beim Bauen, an dieser Stelle gibt es das Dateisystem. */
const SCHRIFTEN = join(process.cwd(), "src", "app", "fonts");
const schriftFett = readFile(join(SCHRIFTEN, "Caros-ExtraBold.otf"));
const schriftNormal = readFile(join(SCHRIFTEN, "Caros.otf"));

export default async function Bild({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const sprache = istSprache(locale) ? locale : "de";
  const w = woerter(sprache).start.hero;
  const [fett, normal] = await Promise.all([schriftFett, schriftNormal]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(150deg, #14344c 0%, #0d2439 55%, #0a1c2d 100%)",
        }}
      >
        {/* Der warme Lichtkern oben rechts, wie auf den dunklen Sektionen der
            Seite. Als eigene Ebene, weil zwei Verlaeufe auf einer Flaeche in
            dieser Darstellung nicht zusammen gezeichnet werden. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 780,
            height: 780,
            borderRadius: 780,
            background: "radial-gradient(circle, rgba(255,153,0,0.34), rgba(255,153,0,0) 70%)",
          }}
        />

        {/* Das Zeichen der Marke. Die U-Form steht weiss: in Navy waere sie auf
            dem Navy-Grund nicht zu sehen. */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 84, gap: 6 }}>
            <div style={{ width: 39, height: 39, borderRadius: 3, background: "#FF9900" }} />
            <div style={{ width: 39, height: 39, borderRadius: 39, background: "#FF3131" }} />
            <div
              style={{
                width: 39,
                height: 39,
                borderRadius: "3px 3px 19px 19px",
                background: "#ffffff",
              }}
            />
            <div style={{ width: 39, height: 39, borderRadius: 10, background: "#A8D8F0" }} />
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
            temoa
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            {w.titelMark}
            {w.titelRest}
          </div>
          <div style={{ display: "flex", marginTop: 28, alignItems: "center", gap: 18 }}>
            <div style={{ width: 56, height: 5, borderRadius: 5, background: "#FF9900" }} />
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.78)" }}>{w.eyebrow}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>temoa.de</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#FF9900" }}>
            Organic First, PPC Second.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Caros", data: fett, weight: 800, style: "normal" },
        { name: "Caros", data: normal, weight: 400, style: "normal" },
      ],
    }
  );
}
