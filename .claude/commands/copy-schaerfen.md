---
description: Schaerft die bestehende Website-Copy Seite fuer Seite auf marktfuehrendes Level
argument-hint: "[optional: Seite, z. B. homepage oder /ergebnisse]"
---

# Auftrag

Die bestehende temoa-Website copywriting-technisch ueberarbeiten, schaerfen und auf ein Level bringen, das im Markt der Amazon-Dienstleister fuehrend ist.

Das ist **kein Neubau**. Struktur, Sektionsreihenfolge und Seitenaufbau stehen und bleiben. Ueberarbeitet wird der Text: Aussage, Schaerfe, Beweiskraft, Verkaufslogik, Sprache.

Wenn ein Argument fuer eine Struktur-Aenderung stark ist, schlag sie vor, aber setz sie nicht ohne Freigabe um.

## Phase 0: Lesen, bevor irgendetwas geschrieben wird

Nichts aendern, bevor diese Schritte abgeschlossen sind.

1. `CLAUDE.md` vollstaendig lesen. Die Schreib- und Stilregeln sind bindend, nicht optional. Besonders: keine Gedankenstriche, keine KI-Floskeln, die komplette Verbotswortliste, Anrede "ihr/euch", kein Komma vor "und".
2. `copy/website-copy.md` lesen (Master-Dokument).
3. Den tatsaechlich ausgelieferten Text lesen. **Der Code ist die Wahrheit, nicht das Master-Dokument:**
   - `src/lib/copy.ts` (Full-Service-Seite und die fuenf Service-Detailseiten)
   - `src/lib/cases.ts`, `src/lib/testimonials.ts`, `src/lib/showcase.ts`
   - `src/components/home/*.tsx` (Homepage-Sektionen)
   - `src/components/sections/*.tsx`
   - `src/components/booking/*.tsx`, `src/components/cases/*.tsx`
   - `src/app/**/page.tsx` inklusive Metadata (Title, Description)
4. Abweichungen zwischen Master-Dokument und Code notieren und melden. Bekannte Luecken zum Startzeitpunkt:
   - Service-Seite Internationalisierung existiert im Code, fehlt im Master-Dokument
   - `/ergebnisse`, `/design-beispiele`, `/gespraech-vereinbaren` und `/blog` sind im Master-Dokument nicht erfasst und hatten nie einen Copy-Durchlauf
   - In der Statuszeile von `copy/website-copy.md` steht "Rollout", ein verbotenes Wort

Danach eine kurze Bestandsaufnahme ausgeben: was steht, was fehlt, wo ist die groesste Schwaeche. Maximal 15 Zeilen. Dann mit Phase 1 beginnen.

## Phase 1 bis 7: Reihenfolge der Durchlaeufe

Wurde ein Argument uebergeben, nur diese Seite bearbeiten. Sonst in dieser Reihenfolge:

1. Homepage (`src/app/page.tsx` plus `src/components/home/*`)
2. `/full-service`
3. Die fuenf Service-Detailseiten (Strategie, Content, Advertising, Account-Management, Internationalisierung)
4. `/ergebnisse` inklusive Detailseiten
5. `/gespraech-vereinbaren`
6. `/design-beispiele`
7. Navigation, Footer, Meta-Titles und Meta-Descriptions aller Seiten

**Eine Seite pro Runde. Nach jeder Seite Freigabe einholen, bevor es weitergeht.**

## Pruefraster je Sektion

Jede Sektion in dieser Reihenfolge bewerten:

1. **Klarheit.** Versteht eine etablierte Marke mit siebenstelligem Amazon-Jahresumsatz in drei Sekunden, worum es geht?
2. **Austauschbarkeitstest.** Koennte dieser Satz auf der Website jedes beliebigen Amazon-Dienstleisters stehen? Wenn ja, ist er wertlos. Ersetzen durch etwas, das nur temoa sagen kann.
3. **Beweis.** Wird jede Behauptung durch Zahl, konkretes Vorgehen, Beispiel oder Kundenstimme gedeckt? Unbelegte Superlative streichen.
4. **Einwand.** Welcher Einwand entsteht beim Lesen dieser Sektion, und beantwortet der Text ihn? Der wichtigste unbeantwortete Einwand gehoert benannt.
5. **Verkaufslogik.** Fuehrt die Sektion zur naechsten? Bleibt der Spannungsbogen intakt: Problem, Ursache, Mechanismus, Beweis, Angebot?
6. **Konkretheit.** Abstrakte Nomen und Prozessbegriffe durch beobachtbare Taetigkeiten ersetzen. Nicht behaupten, was koennen ist, sondern zeigen, was getan wird.
7. **Regelverstoesse.** Gedankenstriche, verbotene Woerter aus `CLAUDE.md`, KI-Floskeln, Komma vor "und", Wortwiederholungen, zwei Sektionen mit derselben Kernaussage, identische CTA-Ueberschriften.

## Lieferformat je Sektion

Kompakt, nicht ausschweifend:

```
Sektion: [Name]
Ist:      [aktueller Text, gekuerzt wenn lang]
Diagnose: [ein Satz, was nicht traegt]
Neu:      [Vorschlag]
Warum:    [ein Satz]
```

Sektionen, die gut sind, ausdruecklich als "bleibt" markieren und nicht anfassen. Aenderung um der Aenderung willen ist ein Fehler.

## Nach der Freigabe

Beides aendern, damit die Quellen synchron bleiben:
- den Code (`src/lib/copy.ts` bzw. die jeweilige Komponente)
- `copy/website-copy.md`

Fuer Seiten, die im Master-Dokument fehlen, den Abschnitt dort neu anlegen.

Danach `npm run build` laufen lassen. Bricht der Build, sofort reparieren.

## Abschluss-Check nach jeder Seite

- Volltextsuche nach "—" ueber alle geaenderten Dateien, jeder Treffer wird ersetzt
- Verbotswortliste aus `CLAUDE.md` durchsuchen
- Alle CTA-Ueberschriften der Website gegeneinander pruefen: jede muss anders formuliert sein, der Button-Text bleibt "Potenzialanalyse buchen"
- Keine zwei Sektionen mit derselben Kernaussage
- Alle Zahlen-Claims belegbar, Profitabilitaet immer als "Ø +30 %"

## Haltung

Als Copywriter und Stratege arbeiten, nicht als Ausfuehrender. Wenn eine Aussage schwach ist, das sagen, auch wenn sie vom Kunden stammt. Nicht nach dem Mund reden. Gleichzeitig: keine Aenderung ohne Begruendung und keine Begruendung laenger als ein Satz.
