/**
 * Das Team, wie es der Kunde zugeordnet hat.
 *
 * Liegt hier und nicht mehr in der Sektion, weil zwei Seiten dieselben Daten
 * brauchen: die kurze Team-Sektion der Startseite und die Seite /team.
 *
 * `linkedin` fehlt noch. Erfundene Profil-Adressen wuerden ins Nichts oder auf
 * fremde Profile fuehren, deshalb faellt das Symbol weg, solange die Adresse
 * nicht vorliegt.
 */
export type Person = { src: string; name: string; rolle: string; linkedin?: string };

export const gruender: Person[] = [
  { src: "/team/Clemens.webp", name: "Clemens", rolle: "Founder & Sales" },
  { src: "/team/Christoph.webp", name: "Christoph", rolle: "Founder & Client Success" },
  { src: "/team/Eddie.webp", name: "Eddie", rolle: "Founder & Operations" },
];

export const members: Person[] = [
  { src: "/team/Ole.webp", name: "Ole", rolle: "Content Manager" },
  { src: "/team/Jonas.webp", name: "Jonas", rolle: "Content Manager" },
  { src: "/team/Marvin.webp", name: "Marvin", rolle: "Marketplace Consultant" },
  { src: "/team/Anzelika.webp", name: "Anzelika", rolle: "Marketplace Consultant" },
  { src: "/team/Vadim.webp", name: "Vadim", rolle: "Graphic Designer" },
  { src: "/team/Marina.webp", name: "Marina", rolle: "Graphic Designer" },
  { src: "/team/Dias.webp", name: "Dias", rolle: "3D Artist" },
  { src: "/team/Burak.webp", name: "Burak", rolle: "Marketplace Growth Associate" },
  { src: "/team/Noor.webp", name: "Noor", rolle: "Marketplace Growth Associate" },
];

/** Die drei Aufnahmen auf der Startseite: Gruppe, Paar, Arbeitsplatz. */
export const candids = ["/team/Main.webp", "/team/DSCF2526.webp", "/team/DSCF2749.webp"];

/** Zwei weitere Aufnahmen, die nur auf der Team-Seite stehen. */
export const candidsWeiter = ["/team/DSCF2442.webp", "/team/DSCF2497-2.webp"];

/** Die Bereiche, die im Haus liegen. Deckungsgleich mit den Leistungen. */
export const imHaus = [
  "Strategie",
  "Produktbilder & SEO",
  "PPC Advertising",
  "Account Management",
  "Internationalisierung",
];
