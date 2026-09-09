# Bildbriefing temoa

Drei Stilfamilien, technisch definiert in `content/bild-prompts.json` unter `stilblocks`. Jedes Bild wählt seine Familie über das Feld `stil`.

## 1. `szene3d`, die Leitfamilie

Abgeleitet aus den Referenzbildern des Kunden. Weiches 3D-Render, matte Kunststoffflächen mit großen Rundungen, Navy (#243B55) und Amazon-Orange (#FF9900) auf hellem Studiogrund, glühende orange Verbindungen, isometrische Podeste, dreiviertel-isometrische Ansicht.

Trägt die Argumentationssektionen: Ursache, Organic First, Leistungen.

Zwei technische Regeln für diese Familie:

- Immer auf eine weiße Platte (`.panel`) setzen. Der Studiogrund ist nicht exakt weiß und stünde auf getöntem Grund als Kasten in der Sektion.
- Mit `[mix-blend-mode:multiply]` einbinden. Damit verschwindet der Grund in der weißen Platte, die dunklen Flächen bleiben unverändert.

## 2. `produkt`

Fotorealistische Produktaufnahmen. Ein durchgehendes, frei erfundenes Produkt ohne Marke und ohne Schrift, damit alle Aufnahmen als ein Set zusammenpassen. Trägt den Hero, die Designbeispiele und die A+ Module.

Beispiel-Listings werden auf der Seite als erfunden gekennzeichnet. Kein Amazon-Logo, kein Prime, keine Amazon-Oberfläche.

## 3. `objekt`, abgelöst

Die frühere Familie: ein einzelner matter Gegenstand auf weißem Grund, viel Luft, kein Glühen. Genau dieses Regelwerk hat die Seite wie eine Architekturseite wirken lassen. Nur noch Archiv, nicht mehr verwenden. Die Einträge stehen in der JSON auf `"aktiv": false`, damit die verworfenen Motive nachvollziehbar bleiben.

## Schrift gehört in kein generiertes Bild

Bildmodelle setzen Text zuverlässig fehlerhaft. Deshalb steht in jedem Prompt „no text". Der Bildgrund kommt aus der Datei, jede Beschriftung zeichnet der Code darüber. Das gilt auch für A+ Module und Listing-Nachbauten.

## So erzeugst du ein Bild

1. Eintrag in `content/bild-prompts.json` anlegen: `kennung`, `size`, `stil`, `prompt`. Bei Szenen ohne freien Hintergrund zusätzlich `"rahmen": false`.
2. `OPENAI_API_KEY=... node scripts/gen-bilder-openai.mjs --only <kennung>`

Das Script erzeugt mit `gpt-image-2` zwei Dateien: `public/bilder/<kennung>.webp` für die Auslieferung, rund 30 bis 60 kB, und `bilder-original/<kennung>.png` als Original. Das PNG liegt außerhalb von `public`, damit es nicht mitdeployt wird.

`FUELLUNG=0.9 node scripts/gen-bilder-openai.mjs --only <kennung> --nur-rahmen` rahmt aus dem vorhandenen Original neu, ohne die API zu rufen. Das kostet nichts.

`gpt-image-2` erlaubt freie Auflösungen, solange beide Kantenlängen durch 16 teilbar sind und das Seitenverhältnis zwischen 1:3 und 3:1 liegt. Formate lassen sich damit exakt treffen, ohne Beschnitt im Layout.

## Was in kein Bild gehört

- Amazon-Logo, Amazon-Oberflächen, Prime-Kennzeichnung
- Fremde Marken, erkennbare Produktverpackungen
- Menschen, Gesichter, Hände
- Text jeder Art, auch klein oder unscharf im Hintergrund
- Zusätzliche Farben: kein Violett, kein Rot außer dem Orange. Grün nur als Trendrichtung in KPI-Karten, dort im Code, nicht im Bild.
- Erfundene Leistungszahlen. Kennzahlen stehen belegt im Text, nicht als Fantasiewert in einer Grafik.

## Bestand

| Kennung | Familie | Fläche |
|---|---|---|
| `n-ursache` | szene3d | Startseite, Ursache: Trichter, viele Besucher oben, zwei Käufe unten |
| `n-organic` | szene3d | Startseite, Organic First: Suche, Klick, Kauf, dann die Kurve |
| `n-leistungen` | szene3d | Startseite, Leistungen: fünf Bereiche im Ring um eine Mitte |
| `p-haupt` bis `p-unterwegs` | produkt | Hero und Designbeispiele: sieben Listingbilder |
| `a-hero`, `a-nutzen`, `a-anwendung`, `a-vergleich` | produkt | Designbeispiele: vier A+ Grundbilder |

Offen: Kopfbilder für die fünf Leistungsseiten und die zweite Fläche der Full-Service-Seite. Motive noch nicht festgelegt, die alten `objekt`-Prompts dafür sind abgelöst.
