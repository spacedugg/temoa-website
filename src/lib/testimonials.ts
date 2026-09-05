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

/* Verbatim, echte Kundenzitate. Original-Wortlaut bleibt unverändert. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Wir sind von 5k auf über 16k Bestellungen in Q1 '26 gewachsen. +50 % Conversion Rate und gleichzeitig TACoS runter auf 5,8 %. Wir sind damit hochprofitabel. Danke an euch!",
    name: "Andrea Hoffmann",
    role: "CMO Vita-World GmbH",
    image: "/clients/Andrea.jpeg.avif",
    art: "person",
  },
  {
    quote: "Dank temoa konnten wir innerhalb von 6 Monaten unseren Umsatz verdoppeln!",
    name: "Roland Pladeck",
    role: "GF Greenfood Natural Products BV",
    image: "/clients/Roland.jpg.avif",
    art: "person",
  },
  {
    quote:
      "Zusammen mit euch dominieren wir die Nische ‚Wasserfilter‘ auf Amazon. Bestseller Rang #1 dank perfektem Branding und optimalen Produktbildern. Außerdem launchen wir gerade ein Produkt in Amazon US mit euch, aber das wisst ihr ja ;)",
    name: "Laurenz Elbers",
    role: "GF Bachgold AG",
    image: "/clients/Laurenz.jpeg.avif",
    art: "person",
  },
  {
    quote:
      "Wir waren überrascht, wie viel man allein durch bessere Listings und gezielten Content rausholen kann, und das sieht man direkt in den Zahlen.",
    name: "Dennis Hoheusel",
    role: "GF FUTUM Handels GmbH",
    image: "/clients/Dennis.png.avif",
    art: "logo",
  },
  {
    quote: "Die Performance der Ergebnisse war hervorragend, Branding und Design passen perfekt zusammen.",
    name: "Gianluca G.",
    role: "GF P+G E-Com GbR",
    image: "/clients/Gianluca.png.webp",
    art: "logo",
  },
  {
    quote:
      "Bisher sind alle Artikel, die wir mit temoa erstellt und bei Amazon gelistet haben, eingeschlagen. Ich werde weitere Produkte mit euch umsetzen!",
    name: "Gilbert Baeumer",
    role: "GF Baeumer Online GmbH",
    image: "/clients/Gilbert.png.webp",
    art: "logo",
  },
  {
    quote: "Ich war extrem zufrieden: kurzer Draht und top Ergebnisse.",
    name: "Markus Bieletzki",
    role: "Gründer badSTARK",
    image: "/clients/Markus.png.webp",
    art: "logo",
  },
];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
