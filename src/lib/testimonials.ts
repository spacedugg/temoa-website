import type { Sprache } from "./i18n";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
  /**
   * "logo" bei Firmenlogos im Querformat. Die wurden vorher wie ein Portrait
   * behandelt und im runden Rahmen beschnitten, das sah nach einem Fehler aus.
   * Logos werden jetzt eingepasst statt beschnitten.
   */
  art?: "person" | "logo";
};

/* ============================================================
   Verbatim, echte Kundenzitate. Original-Wortlaut bleibt unverändert.

   Auf der englischen Seite steht eine Übersetzung, nicht ein anderer Text:
   die Aussage bleibt Satz für Satz dieselbe, auch dort, wo sie unglücklich
   ist. Das gilt ausdrücklich für die erste Stimme, die selbst Bestellzahlen
   und einen TACoS nennt. Die sechsundzwanzigste Feedbackrunde hält fest, dass
   diese Stelle offen ist und eine Freigabe des Kunden braucht; sie hier
   nebenbei umzuschreiben, wäre genau das, was dort verboten ist.

   `rolleEn` steht daneben, weil "GF" und "Gründer" auf Englisch nichts sagen.
   Der Firmenname bleibt, wie er im Handelsregister steht.
   ============================================================ */
const stimmen: (Testimonial & { quoteEn: string; roleEn: string })[] = [
  {
    quote:
      "Wir sind von 5k auf über 16k Bestellungen in Q1 '26 gewachsen. +50 % Conversion Rate und gleichzeitig TACoS runter auf 5,8 %. Wir sind damit hochprofitabel. Danke an euch!",
    quoteEn:
      "We grew from 5k to over 16k orders in Q1 '26. Conversion rate up 50 percent and TACoS down to 5.8 percent at the same time. That makes us highly profitable. Thank you!",
    name: "Andrea Hoffmann",
    role: "CMO Vita-World GmbH",
    roleEn: "CMO, Vita-World GmbH",
    image: "/clients/Andrea.jpeg.avif",
    art: "person",
  },
  /* Sinngemaesse Fassung, Stand der siebenundzwanzigsten Feedbackrunde: die
     vorherige Zeile sprach von verdoppeltem Umsatz, gesagt hat Roland Pladeck
     verdoppelte Profitabilitaet. Belegt ist der ACoS von 30 auf 15 Prozent bei
     rund 300.000 Euro Monatsumsatz. Der Wortlaut geht zur Gegenpruefung an
     ihn und steht bis zu seiner Freigabe unter Vorbehalt. */
  {
    quote:
      "Bei rund 300.000 € Monatsumsatz haben wir den ACoS von 30 auf 15 % gesenkt. Unsere Profitabilität hat sich damit verdoppelt.",
    quoteEn:
      "At around €300,000 in monthly revenue we brought ACoS down from 30 to 15 percent. That doubled our profitability.",
    name: "Roland Pladeck",
    role: "GF Greenfood Natural Products BV",
    roleEn: "Managing Director, Greenfood Natural Products BV",
    image: "/clients/Roland.jpg.avif",
    art: "person",
  },
  {
    quote:
      "Zusammen mit euch dominieren wir die Nische ‚Wasserfilter‘ auf Amazon. Bestseller Rang #1 dank perfektem Branding und optimalen Produktbildern. Außerdem launchen wir gerade ein Produkt in Amazon US mit euch, aber das wisst ihr ja ;)",
    quoteEn:
      "Together with you we dominate the water filter niche on Amazon. Bestseller rank #1, thanks to flawless branding and the right product images. We are also launching a product on Amazon US with you right now, but you know that already ;)",
    name: "Laurenz Elbers",
    role: "GF Bachgold AG",
    roleEn: "Managing Director, Bachgold AG",
    image: "/clients/Laurenz.jpeg.avif",
    art: "person",
  },
  {
    quote:
      "Wir waren überrascht, wie viel man allein durch bessere Listings und gezielten Content rausholen kann, und das sieht man direkt in den Zahlen.",
    quoteEn:
      "We were surprised how much better listings and targeted content alone can bring in, and you see it straight away in the numbers.",
    name: "Dennis Hoheusel",
    role: "GF FUTUM Handels GmbH",
    roleEn: "Managing Director, FUTUM Handels GmbH",
    image: "/clients/Dennis.png.avif",
    art: "logo",
  },
  {
    quote: "Die Performance der Ergebnisse war hervorragend, Branding und Design passen perfekt zusammen.",
    quoteEn:
      "The performance of the results was outstanding, branding and design fit together perfectly.",
    name: "Gianluca G.",
    role: "GF P+G E-Com GbR",
    roleEn: "Managing Director, P+G E-Com GbR",
    image: "/clients/Gianluca.png.webp",
    art: "logo",
  },
  {
    quote:
      "Bisher sind alle Artikel, die wir mit temoa erstellt und bei Amazon gelistet haben, eingeschlagen. Ich werde weitere Produkte mit euch umsetzen!",
    quoteEn:
      "So far every item we have built with temoa and listed on Amazon has taken off. I will be doing more products with you!",
    name: "Gilbert Baeumer",
    role: "GF Baeumer Online GmbH",
    roleEn: "Managing Director, Baeumer Online GmbH",
    image: "/clients/Gilbert.png.webp",
    art: "logo",
  },
  {
    quote: "Ich war extrem zufrieden: kurzer Draht und top Ergebnisse.",
    quoteEn: "I was extremely happy: short lines of communication and top results.",
    name: "Markus Bieletzki",
    role: "Gründer badSTARK",
    roleEn: "Founder, badSTARK",
    image: "/clients/Markus.png.webp",
    art: "logo",
  },
];

/* Die deutsche Fassung bleibt der Vorgabewert: die Startseite hat sie ueber
   Monate so gezeigt, und jede Stelle, die noch keine Sprache kennt, soll
   weiter Deutsch bekommen und nicht Englisch. */
export const testimonials: Testimonial[] = stimmen;

export function stimmenFuer(sprache: Sprache): Testimonial[] {
  if (sprache === "de") return stimmen;
  return stimmen.map((t) => ({ ...t, quote: t.quoteEn, role: t.roleEn }));
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
