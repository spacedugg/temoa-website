# Design

Visuelle Verfassung der temoa-Website. Produktwahrheit steht in [PRODUCT.md](PRODUCT.md), der freigegebene Text in [copy/website-copy.md](copy/website-copy.md). Design ändert keinen Text.

## Design Read

Redesign im Erhalt-Modus einer B2B-Leistungsseite für etablierte Amazon-Marken. Ruhige Premium-Sprache, Tailwind 3 plus Hausschrift Caros, strenges Ein-Akzent-Tokensystem, zurückhaltende Bewegung.

Dials: `DESIGN_VARIANCE 6` · `MOTION_INTENSITY 4` · `VISUAL_DENSITY 4`

Leitsatz aus PRODUCT.md: Ruhe ist Teil des Angebots. Wer Profitabilität über Umsatz stellt, darf nicht aussehen wie eine Performance-Anzeige.

## Modus je Fläche

| Fläche | Modus | Erfolg heißt |
|---|---|---|
| Homepage, `/full-service`, fünf Leistungsseiten | Persuade | Besucher entscheidet sich und bucht |
| `/ergebnisse` inkl. Detailseiten | Persuade | Beweis wird als nachvollziehbar akzeptiert |
| `/design-beispiele` | Experience | Die Arbeiten führen, die Oberfläche tritt zurück |
| `/gespraech-vereinbaren` | Persuade | Termin steht, Einwand „Verkaufsgespräch" ist entkräftet |
| `/blog`, Artikel | Read | Der Text wird gelesen und verstanden |

## Farbe

Genau ein Akzent: Orange. Rot ist das dunkle Ende derselben Familie, kein zweiter Akzent. Navy ist Neutralton. Grün und Rot erscheinen ausschließlich als funktionales Ja/Nein in Vergleichen, nie dekorativ.

| Token | Wert | Verwendung | Kontrast auf Weiß |
|---|---|---|---|
| `ink` | `#0A1E2B` | Überschriften, Text auf Orange | 15,6:1 |
| `ink-soft` | `#13344A` | Eyebrows, hervorgehobener Text | 11,4:1 |
| `ink-muted` | `#56697A` | Fließtext zweiter Ordnung | 5,7:1 |
| `ink-faint` | `#5F7484` | Labels, Hinweiszeilen | 4,9:1 |
| `ink-line` | `#8AA0AE` | nur Linien und Icons, nie Text | – |
| `canvas-tint` | `#EDF5FB` | getönte Sektion im Wechsel mit Weiß | – |
| `brand-500` | `#FF9900` | Markenfläche, immer mit dunklem Text | – |
| `brand-700` | `#C96D00` | Akzenttext ab 24px | 3,7:1 |
| `brand-800` | `#9E5600` | Akzenttext in Fließtextgröße | 5,4:1 |
| `ember-deep` | `#A32318` | dunkles Ende, trägt weißen Text | 7,5:1 |
| `signal-pos` | `#1B7F4B` | Ja-Zeile in Vergleichen | 4,6:1 |
| `signal-neg` | `#C0281E` | Nein-Zeile in Vergleichen | 5,9:1 |

Zwei Verläufe:

- `--brand-gradient` hell (`#FF9900 → #FF3131`), trägt **ausschließlich dunklen Text**. Weiß darauf sind 2,0:1.
- `--brand-gradient-deep` (`#C74A0B → #A32318`) für große Flächen mit weißem Text, 5,3:1 bis 7,5:1.

Verboten: farbverlaufender Text, weißer Text auf hellem Orange, ein zweiter dekorativer Akzent, warme Grautöne neben den kühlen.

## Typografie

Caros in 200/300/400/700/800. Es gibt kein 500 und kein 600, Hierarchie entsteht deshalb über Größe und Farbe, nicht über Zwischengewichte.

| Token | Größe | Zeilenhöhe | Laufweite |
|---|---|---|---|
| `text-display` | `clamp(2.5rem, 1.4rem + 3.6vw, 4rem)` | 1.04 | −0.028em |
| `text-h2` | `clamp(1.75rem, 1.15rem + 1.9vw, 2.5rem)` | 1.12 | −0.02em |
| `text-h3` | 1.25rem | 1.3 | −0.01em |
| `text-lead` | 1.125rem | 1.6 | −0.005em |
| `text-body` | 1rem | 1.65 | – |
| `text-small` | 0.875rem | 1.55 | – |
| `text-label` | 0.75rem | 1.2 | +0.12em |

Fließtext maximal 65 Zeichen breit. Zahlen in Kennzahl-Bändern mit `tabular-nums`. `text-balance` auf Überschriften, `text-pretty` auf Absätzen.

## Raum

Drei Sektionsabstände, unten jeweils etwas mehr als oben:

- `.section-y` → `pt-20 pb-24 md:pt-24 md:pb-28`, Standard
- `.section-y-sm` → `pt-12 pb-14 md:pt-14 md:pb-16`, schmale Bänder (Logos, Zahlen, Kundenbindung)
- `.section-y-lg` → `pt-28 pb-32 md:pt-32 md:pb-36`, Hero, Mechanismus, finaler CTA

Container: `.container-x`, `max-w-7xl` mit `px-6 md:px-8`.

## Form

Vier Radien, konzentrisch gedacht (innen kleiner als außen):

- `rounded-inner` 1rem, Elemente innerhalb einer Karte
- `rounded-card` 1.5rem, Karten
- `rounded-panel` 2rem, große Panels
- `rounded-full`, Pillen und Buttons

Schatten sind navy-getönt, nie neutrales Schwarz: `shadow-soft`, `shadow-lift`, `shadow-panel`.

## Interaktion

- Fokus: 3px Ring in `ink`, 3px Abstand, außerhalb des Elements. Auf dunklen Flächen und im Footer weiß.
- Touch-Targets mindestens 48px in der Höhe. Buttons haben `min-h-[3rem]`.
- Primär-Button: heller Verlauf, dunkler Text, `translateY(-1px)` beim Hover, `scale(0.985)` beim Drücken.
- Übergänge mit `ease-temoa` (`cubic-bezier(0.32, 0.72, 0, 1)`), 200 bis 350ms.

## Bewegung

`MOTION_INTENSITY 4`. Bewegung erklärt Zusammenhänge, sie schmückt nicht.

- Bei `prefers-reduced-motion` entfallen Wege und Laufbänder, Zustandswechsel bleiben mit 80ms sichtbar.
- Bei `prefers-reduced-transparency` wird Milchglas zu einer deckenden Fläche.
- Animiert werden ausschließlich `transform` und `opacity`. Kein `filter: blur` auf großen scrollenden Flächen.
- Details in Phase 5.

## Offene Punkte

- Alle Sektionsbilder sind Platzhalter. Solange sie leer sind, dürfen sie nicht die größte Fläche im Viewport belegen.
- Der bestätigte Status „offizieller Amazon-Advertising-Partner" ist noch nirgends sichtbar.
- `src/lib/copy.ts` und rund 28 Dateien in `src/components/sections/` sind toter Code mit alten Tokens.
