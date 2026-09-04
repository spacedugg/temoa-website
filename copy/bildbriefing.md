# Bildbriefing temoa

Abgeleitet aus dem Ordner „Website inspiration". Die Vorlagen bilden eine geschlossene Familie: weicher 3D-Render, mattes Material, abgerundete Kanten, Navy und Orange auf hellem Grund, Gegenstände als Metapher. Keine Fotografie. Diese Familie wird fortgeführt, keines der Beispielbilder wird verwendet.

## So setzt du ein Bild ein

1. Bild erzeugen, auf die angegebene Kantenlänge exportieren (PNG oder WebP).
2. Datei unter `public/bilder/<kennung>.png` ablegen.
3. Im Code an der Bildfläche `src="/bilder/<kennung>.png"` und ein `alt` ergänzen. Am Layout ändert sich nichts, die Fläche hat bereits ihr endgültiges Seitenverhältnis.

## Stand: was gezeichnet ist und was noch ein Bild braucht

Nach der Rückmeldung „minimalistischer, moderner, keine überfrachteten KI-Grafiken" ist ein Teil der Flächen nicht mehr Bild, sondern direkt im Code gezeichnet: SVG in den Farben der Seite, animiert beim Scrollen.

| Fläche | Sektion | Zustand |
|---|---|---|
| Kopfbereich | Station 00 | **gezeichnet.** Listing-Karte mit steigender Kurve, `ListingSzene` in `src/components/takt/Grafiken.tsx` |
| Verfahren | Station 02 | **gezeichnet.** Vier Stufen mit durchlaufender orange Linie, `TaktSzene`, die Linie wächst beim Scrollen |
| Umfang | Station 03 | **entfallen.** Das breite Bildband war Füllmaterial, die fünf Zeilen stehen für sich |
| B-02 Befund | Station 01 | **offen.** Bleibt eine Bildfläche, weil hier eine Szene gebraucht wird und keine Grafik |

Vorteil der gezeichneten Variante: scharf auf jedem Display, wenige Kilobyte, exakt in den Farben der Seite, und sie kann sich beim Scrollen aufbauen. Nachteil: sie sieht gezeichnet aus, nicht fotografiert.

Für alles, was doch ein Bild wird, gilt der folgende Stilblock. Er ist bewusst reduzierter als die Beispielbilder aus dem Inspirationsordner: **ein Gegenstand, eine Aussage, viel Luft.** Keine fünf Icons mit Verbindungslinien, kein Glühen, kein Icon-Gewimmel.

## Stilblock

Diesen Block an **jeden** Prompt anhängen. Er hält die vier Bilder zusammen.

```
Minimal 3D render, one single subject, nothing else in frame. Matte material,
soft neutral studio light from one side, one soft shadow. Clean white
background with a large amount of empty space around the object. Colour
palette strictly limited to deep navy blue (#023047), amazon orange (#FF9900),
white and light warm grey. No other colours, no gradients across the frame, no
glow effects, no connecting lines, no floating icons, no collage of multiple
symbols. Absolutely no text, no letters, no numbers, no logos, no interface
labels. Calm, restrained, editorial. High detail, quiet composition.
```

Zwei Hinweise aus deinen Vorlagen: Wo Schrift im Bild steht, wird sie von der KI fast immer fehlerhaft gesetzt. Deshalb steht in jedem Prompt „no text". Die Website bringt ihre Beschriftung selbst mit. Und der Hintergrund ist immer sauber, damit das Bild in der Fläche sitzt und nicht dagegen arbeitet.

---

## B-02 · Startseite, Station 01 „Der Befund"

- Seitenverhältnis **4:3** quer, Export mindestens 1600 × 1200 px
- Hintergrund: weiß
- Steht neben der Ursachen-Aussage
- Aussage: seit dem Launch hat niemand das Listing angefasst

```
A single tall stack of identical plain light grey rounded cards, seen from a
slight angle, leaning a little to one side as if nobody has touched it in a
long time. One card near the top edge is amazon orange. Nothing else in the
frame.

[Stilblock anhängen]
```

Wenn dir dieser Aufbau zu ruhig ist, gibt es eine zweite Fassung: dieselbe
Kartenstapel-Idee, aber daneben eine flach liegende navyfarbene Uhr mit einem
orangen Zeiger. Mehr als zwei Gegenstände sollten es nicht werden, sonst kippt
es in die überladene Optik zurück.

---

## Später: Leistungsseiten

Je ein Kopfbild im Format 3:2, weißer Hintergrund, gleicher Stilblock.

| Kennung | Seite | Motiv |
|---|---|---|
| B-10 | Strategie & Analyse | Eine einzelne navy Schachfigur, daneben eine orange markierte flache Karte |
| B-11 | Content & Listings | Drei gestaffelte Bildrahmen, der vorderste scharf, ein oranger Rahmenrand |
| B-12 | Advertising / PPC | Ein einzelner navy Schieberegler, der Griff orange |
| B-13 | Account-Management | Ein navy Regal mit gleichmäßig einsortierten Kartons, einer davon orange |
| B-14 | Internationalisierung | Ein navy Globus mit genau zwei orangen Fähnchen |

## Was nicht ins Bild gehört

- Amazon-Logo, Amazon-Oberflächen, das Wort Amazon in irgendeiner Form
- Fremde Marken, erkennbare Produktverpackungen, echte Produktfotos
- Menschen, Gesichter, Hände
- Text jeder Art, auch klein oder unscharf im Hintergrund
- Zusätzliche Farben: kein Grün, kein Violett, kein Rot außer dem Orange
- Glasoptik, Neon, Farbverläufe über das ganze Bild

## Regel für jedes weitere Bild

Ein Gegenstand, höchstens zwei. Viel leere Fläche. Kein Verbindungsliniennetz, kein Glühen, keine Icon-Sammlung. Wenn ein Motiv nur funktioniert, weil drei Symbole nebeneinanderstehen, ist es kein Bild, sondern eine Grafik. Dann gehört es in den Code und nicht in eine Bilddatei.
