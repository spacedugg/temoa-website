/* ============================================================
   Bewertungsprofile bei Dritten.

   Steht hier und nur hier: die Bausteine im Footer und bei den Kundenstimmen
   lesen dieselbe Liste, deshalb koennen sie nicht auseinanderlaufen.

   `wert` ist der Sternedurchschnitt und darf nur dastehen, wenn er auf der
   Profilseite so abgelesen wurde. Solange er `null` ist, zeigt der Baustein
   den Dienst ohne Sterne: eine Zahl, die nicht belegt ist, gehoert nicht auf
   die Seite. Die Anzahl der Bewertungen wird bewusst nicht gezeigt.

   Stand: das Trustpilot-Profil ist belegt, der Durchschnitt nicht. Ein
   Google-Unternehmensprofil war nicht zu finden; sobald die Adresse vorliegt,
   kommt der Eintrag dazu.
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
    dienst: "trustpilot",
    name: "Trustpilot",
    href: "https://de.trustpilot.com/review/temoa.de",
    wert: null,
  },
];
