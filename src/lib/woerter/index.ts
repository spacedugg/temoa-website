import type { Sprache } from "../i18n";
import { de, type Woerterbuch } from "./de";
import { en } from "./en";

/* Beide Fassungen liegen als Modul da, nicht hinter einem dynamischen
   Import. Die Seiten werden zur Bauzeit erzeugt, es gibt also nichts
   nachzuladen, und `Woerterbuch` erzwingt, dass keine Zeile fehlt: eine
   vergessene Uebersetzung ist ein Typfehler und kein stiller Ausfall. */
const buecher: Record<Sprache, Woerterbuch> = { de, en };

export function woerter(sprache: Sprache): Woerterbuch {
  return buecher[sprache];
}

export type { Woerterbuch };
