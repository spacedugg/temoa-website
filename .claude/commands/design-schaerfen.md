---
description: Bringt die Website auf Design-Level, Phase fuer Phase, mit klar zugeordneten Skills
argument-hint: "[optional: Phase 1-6 oder eine Seite]"
---

# Auftrag

Die temoa-Website visuell auf ein Level bringen, das im Markt der Amazon-Dienstleister fuehrend ist. Voraussetzung: der Copy-Durchlauf (`/copy-schaerfen`) ist abgeschlossen und freigegeben.

**Der freigegebene Text ist gesetzt.** Design darf Text nicht umschreiben. Faellt eine Textstelle im Design-Durchlauf negativ auf, wird sie gemeldet, nicht geaendert.

## Technische Rahmenbedingungen (nicht verhandelbar)

- Next.js 15 App Router, React 18, TypeScript
- Tailwind CSS 3, `src/app/globals.css`, `tailwind.config.ts`
- **Animation: framer-motion (bereits installiert). Kein GSAP, keine neue Animationsbibliothek.**
- Hausschrift Caros liegt in `src/app/fonts/`. Keine Schriftwechsel ohne Freigabe.
- Keine neuen Abhaengigkeiten ohne Freigabe
- Bilder sind bewusst Platzhalter. Keine generierten Bilder in den Code, solange nicht anders gewuenscht.
- Die Sektionsreihenfolge aus `CLAUDE.md` steht fest. Reihenfolge-Aenderungen nur als Vorschlag.

## Regel zur Skill-Nutzung

Im Projekt sind ueber 25 Skills installiert. Mehrere davon widersprechen sich in der Haltung: die einen predigen Zurueckhaltung, die anderen maximale Ausdruckskraft.

**Pro Phase gilt genau eine Leit-Skill.** Springt eine andere Skill von selbst an, wird sie ignoriert, sofern sie nicht in der laufenden Phase als Ergaenzung genannt ist. Am Anfang jeder Phase ausgeben, welche Skill gerade fuehrt.

Diese Skills sind fuer dieses Projekt **nicht** zu verwenden: `animate-expo`, `write-swift`, `imagegen-frontend-mobile` (kein Mobile-App-Projekt), `design-taste-frontend-v1` (veraltet), `industrial-brutalist-ui` (passt nicht zur Tonalitaet), `gpt-taste` (schreibt GSAP vor), `stitch-design-taste` (fuer Google Stitch), `image-to-code` (fuer Codex), `ask-sonner` (keine Toasts im Projekt).

---

## Phase 1: Fundament anlegen

**Leit-Skill: `impeccable`, Unterbefehl `init`**

Legt `PRODUCT.md` und `DESIGN.md` an. Das ist das Gedaechtnis fuer alle folgenden Phasen. Ohne diese Dateien raet jeder weitere Durchlauf neu.

Inhalte ableiten aus:
- `CLAUDE.md` (Tonalitaet, Zielgruppe, No-Gos, Verbotswortliste)
- `copy/website-copy.md` (Positionierung, Versprechen, Argumentation)
- dem bestehenden Code (Farben, Abstaende, Typografie, Komponentenmuster)

Nicht den Kunden alles neu abfragen, was in diesen Dateien schon steht. Nur nachfragen, was wirklich offen ist.

Modus der Homepage und der Service-Seiten: **Persuade**. Der Besucher soll sich entscheiden und handeln.

Ergebnis vorlegen, Freigabe einholen.

## Phase 2: Ehrlicher Ist-Zustand

**Leit-Skill: `redesign-existing-projects`, ergaenzt durch `impeccable audit`**

Die bestehende Seite auditieren. Gesucht wird:
- generische KI-Muster, die die Seite austauschbar machen
- schwache visuelle Hierarchie, unklare Blickfuehrung
- inkonsistente Abstaende, Groessen, Radien, Schatten
- Kontrast- und Accessibility-Probleme
- Verhalten auf schmalen Viewports

Playwright ist installiert, Screenshots von Desktop und Mobile also moeglich. `npm run dev` starten und die Seiten wirklich ansehen, nicht nur den Code lesen.

Ergebnis: eine **priorisierte Liste**, schwerster Befund zuerst, je Befund die Datei und die Zeile. Noch nichts aendern. Freigabe einholen, welche Punkte angegangen werden.

## Phase 3: Visuelle Richtung

**Leit-Skill: `design-taste-frontend`, ergaenzt durch `high-end-visual-design`**

`design-taste-frontend` liest zuerst den Auftrag und leitet daraus die Richtung ab. Genau so anwenden: Zielgruppe sind etablierte Marken, der Ton ist premium-souveraen und ruhig, keine Hype-Optik.

`high-end-visual-design` liefert die konkreten Werte: Typografie-Skala, Abstandssystem, Schatten, Kartenaufbau.

Vor der Umsetzung ausgeben:
- eine Zeile "Design Read": welche Richtung und warum
- das Token-Set: Farben, Typo-Skala, Abstaende, Radien, Schatten

Freigabe einholen, dann in `tailwind.config.ts` und `globals.css` verankern. Erst danach Komponenten anfassen.

## Phase 4: Umsetzung, Seite fuer Seite

**Leit-Skill: `impeccable`, passender Unterbefehl je Aufgabe**

- `layout` fuer Aufbau, Ausrichtung, Abstaende
- `typeset` fuer Typografie
- `colorize` fuer Farbe
- `polish` bzw. `craft` fuer Feinschliff
- `bolder` oder `quieter`, wenn eine Sektion in der Wirkung danebenliegt

Reihenfolge: Homepage, `/full-service`, die fuenf Service-Seiten, `/ergebnisse`, `/gespraech-vereinbaren`, `/design-beispiele`, Blog.

**Eine Seite pro Runde. Nach jeder Seite Screenshot zeigen und Freigabe einholen.**

Nach jeder Seite: `npm run build` und `npm run lint`. Bricht etwas, sofort reparieren.

## Phase 5: Bewegung

**Leit-Skills in dieser Reihenfolge: `find-animation-opportunities`, dann `animate`, dann `review-animations`**

Diese drei stammen von Emil Kowalski und vertreten bewusst Zurueckhaltung. Das ist fuer diese Seite richtig: der Ton ist ruhig und souveraen, nicht verspielt.

1. `find-animation-opportunities` sucht Stellen, die von Bewegung profitieren, und lehnt alle anderen ab. Nur lesen, nicht bauen.
2. `animate` setzt die freigegebenen Stellen mit framer-motion um.
3. `review-animations` prueft das Ergebnis. Der Aufruf ist manuell noetig, die Skill startet nicht von selbst.

Kandidaten aus der bestehenden Struktur: Mega-Menue der Navigation, die scrollende Kundenstimmen-Sektion, die schwebende A+ Content Darstellung in den Designbeispielen, Karten-Hover in Case Studies.

`apple-design` nur ergaenzend heranziehen, wenn es um Springs, Unterbrechbarkeit oder Gesten geht.

Pflicht: `prefers-reduced-motion` respektieren.

## Phase 6: Bildkonzepte (optional, separate Freigabe)

**Leit-Skill: `imagegen-frontend-web`**

Die Seite arbeitet ueberall mit Platzhaltern. Diese Skill erzeugt je Sektion ein eigenes Referenzbild als Vorlage, wonach der Kunde echte Bilder produzieren oder freigeben kann.

**Diese Bilder kommen nicht in den Code.** Sie sind Briefing-Material fuer den Kunden. Ablage ausserhalb von `public/`, damit nichts versehentlich ausgeliefert wird.

Nur starten, wenn der Kunde es ausdruecklich moechte.

## Wenn Varianten gebraucht werden

**Skill: `prototype`** (startet nur auf Zuruf)

Baut mehrere echte Varianten eines Elements hinter einem visuellen Umschalter. Sinnvoll, wenn eine Entscheidung ansteht, die sich nicht durch Argumentieren klaeren laesst, etwa Hero-Aufbau oder Aufbau der Case-Karten.

## Grenzen

- Kein freigegebener Text wird umgeschrieben
- Keine neuen Abhaengigkeiten ohne Freigabe
- Keine generierten Bilder im ausgelieferten Code
- Keine Struktur-Aenderung ohne Freigabe
- Keine Phase ueberspringen, keine zwei Phasen gleichzeitig
