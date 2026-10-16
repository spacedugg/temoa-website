# Long-Tail-Auswertung nach Modul J (Search Console, 16.10.2026)

**Quelle:** Export „temoa.de Performance on Search", Web (textbasiert), letzte drei Monate, Filter Suchanfrage mit mindestens drei Wörtern (`^([^ ]+ ){2,}[^ ]+$`). Das sind 504 Suchanfragen, 2.194 Impressionen, 4 Klicks.

**Evidenzstatus: Stichprobe.** Die Website ist jung, fast alle Impressionen stammen aus den letzten gut vier Wochen. Impressionen und Klicks gelten nur für Anfragen, bei denen die Seite schon ausgespielt wurde. Die Position ist ein Mittelwert über Ausspielungen und Geräte. Eine Anfrage mit wenigen Impressionen beweist weder Nachfrage noch Chance, aus den Zahlen folgt keine Prognose. Export nach vier bis acht Wochen wiederholen.

## Entscheidung je Anfrage

Regel aus dem Prompt: Position 4 bis 20 mit mehreren Impressionen sind Kandidaten für Ergänzungen, Position 1 bis 3 mit niedriger CTR für Title und Meta Description. Title, H1 und Slug ändern sich nur, wenn die Anfrage die Hauptabsicht der Seite beschreibt.

| Anfrage | Seite | Impr. / Klicks / Pos. | Suchabsicht | Entscheidung | Textänderung | Evidenz |
| --- | --- | --- | --- | --- | --- | --- |
| amazon message center (+ Varianten: messenger center, message center amazon) | `/blog/message-center` | 206 + 23 + 15 / 1 / 6,4 bis 7,5 | Wissen: was ist es, wo finde ich es | Erhalten | Keine. Title, H1 und Einstieg nennen „Message Center" und beantworten die Frage im ersten Absatz. | Stichprobe |
| acos stands for, what does acos mean, what is acos | `/en/blog/acos-erklaert` | 49 + 25 + 52 / 0 / 9,6 bis 15,4 | Wissen: Definition | Erhalten | Keine. Der Einstieg sagt „It stands for Advertising Cost of Sales". | Stichprobe |
| what does tacos stand for in advertising, tacos amazon meaning | `/en/blog/tacos-erklaert` | 16 + 11 / 0 / 7,5 bis 10 | Wissen: Definition | Erhalten | Keine. Die Definition steht im Einstieg des Beitrags. | Stichprobe |
| ipi score amazon, amazon ipi score | `/blog/ipi-score` | 36 + 26 / 0 / 10 bis 11 | Wissen: Definition und Verbesserung | Erhalten | Keine. Title, H1 und erste Zwischenüberschrift nennen den Begriff. | Stichprobe |
| amazon conversion rate optimierung | `/blog/conversion-rate-optimierung` | 34 / 0 / 10,7 | Wissen und Handeln | Erhalten | Keine. Title und H1 treffen die Anfrage. | Stichprobe |
| what is amazon accelerate | `/en/blog/amazon-accelerate` | 20 / 0 / 9,8 | Wissen | Erhalten | Keine. | Stichprobe |
| amazon paket gestohlen | `/blog/paket-gestohlen` | 20 / 0 / 10 | Wissen und Handeln | Erhalten | Keine. | Stichprobe |
| can you sell through amazon without fba, selling on amazon without fba | `/en/blog/verkaufen-ohne-lager` | 114 + 22 + 16 / 0 / 14 bis 16 | Wissen | Erhalten | Keine. Position 14 bis 16 ist kein Hinweis auf ein Defizit, sondern auf eine junge Seite. | Stichprobe |
| kindle with ads | `/blog/kindle-ads` | 57 / 0 / 18 | Fremde Absicht (Verbraucher, nicht Händler) | Verwerfen | Keine. Der Beitrag richtet sich an Autoren und Verlage, die Anzeigen schalten. Die Anfrage meint vermutlich das Kindle-Gerät mit Werbung. | Stichprobe |
| evaluate the photo services company amazon photos …, aws print services | `/en/blog/amazon-prints` | 13 + 12 + 11 / 0 / 3 bis 40 | Fremde Absicht (Aufgabenstellung, Verbraucher) | Verwerfen | Keine. | Stichprobe |

Alle weiteren Anfragen mit weniger als 15 Impressionen werden nicht einzeln bewertet. Sie liefern keine belastbare Aussage.

## Befunde

1. **Es gibt keinen Anlass, Titel, H1 oder Texte nach diesen Daten zu ändern.** Die Seiten mit den meisten Impressionen sind für ihre Anfragen bereits inhaltlich passend aufgebaut. Der fehlende Klick liegt bei diesen Mengen nahe am Zufall, vier Klicks bei 2.194 Impressionen erlauben keine Aussage über die CTR.
2. **Hostvarianten.** 16 Pfade tauchen unter `temoa.de` und `www.temoa.de` auf. Umgesetzt: Canonical, hreflang, Sitemap, robots.txt, strukturierte Daten und `llms.txt` nennen jetzt `https://www.temoa.de`, die Adresse, die ausgeliefert wird. Prüfen nach dem Deployment: Search Console Seitenindexierung, Eigenschaft `www` und Eigenschaft ohne `www` getrennt ansehen. Beide Einträge laufen über Wochen zusammen, das ist keine sofortige Änderung.
3. **Sprache.** Etwa 55 Prozent der Impressionen gehen an `/en/`-Seiten, 389 aus den USA, 165 aus Großbritannien, 1.007 aus Deutschland. Die englischen Beiträge werden gefunden. Das spricht dafür, sie bei künftigen Änderungen gleichrangig zu behandeln.
4. **Fremde Absichten.** Einige Anfragen mit hohen Impressionen (kindle with ads, Amazon Photos) stammen von Verbrauchern. Für sie gibt es kein Angebot, sie zählen nicht als Chance.

## Nächster Schritt

Export nach vier bis acht Wochen wiederholen (gleicher Filter, gleiche Länge) und mit dieser Tabelle vergleichen. Erst dann entscheiden, ob einzelne Seiten ergänzt werden. Regex-Ansichten für den Vergleich: `^([^ ]+ ){2,}[^ ]+$` (drei oder mehr Wörter) und `^([^ ]+ ){3,}[^ ]+$` (vier oder mehr).
