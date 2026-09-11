/* ============================================================
   Bewertungsprofile bei Dritten.

   Steht hier und nur hier: die Bausteine im Footer und bei den Kundenstimmen
   lesen dieselbe Liste, deshalb koennen sie nicht auseinanderlaufen.

   `wert` ist der Sternedurchschnitt und darf nur dastehen, wenn er auf der
   Profilseite so abgelesen wurde. Solange er `null` ist, zeigt der Baustein
   den Dienst ohne Sterne: eine Zahl, die nicht belegt ist, gehoert nicht auf
   die Seite. Die Anzahl der Bewertungen wird bewusst nicht gezeigt.

   Stand: beide Profile und beide Durchschnitte kommen vom Kunden, abgelesen an
   seinen eigenen Profilseiten. Aendert sich ein Wert dort, aendert er sich
   hier, sonst steht auf der Website eine Zahl, die woanders nicht mehr gilt.
   ============================================================ */

export type Bewertungsprofil = {
  dienst: "google" | "trustpilot";
  name: string;
  href: string;
  /** Durchschnitt von 5, eine Nachkommastelle. `null`, solange unbelegt. */
  wert: number | null;
};

export const bewertungsprofile: Bewertungsprofil[] = [
  {
    dienst: "google",
    name: "Google",
    /* Der Kurzlink aus dem Unternehmensprofil. Er leitet auf den Eintrag in
       Google Maps weiter. */
    href: "https://share.google/x5evvBXdynSwSWl7i",
    wert: 5,
  },
  {
    dienst: "trustpilot",
    name: "Trustpilot",
    href: "https://de.trustpilot.com/review/temoa.de",
    wert: 4.5,
  },
];
