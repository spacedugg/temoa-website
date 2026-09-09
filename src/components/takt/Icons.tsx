/**
 * Icon-Satz für das Theme „Studio".
 *
 * Die Referenzen arbeiten mit einfachen Symbolen in gerundeten Kacheln: die
 * Form in Navy, ein einzelnes Detail in Orange. Genau so sind diese gebaut.
 * `currentColor` trägt die Navy-Form, das orange Detail steht fest, damit es
 * auf hellem und dunklem Grund gleich bleibt.
 *
 * Bewusst als Inline-SVG und nicht als Icon-Paket: es sind wenige Symbole, sie
 * müssen zum Bildstil passen und kosten so keinen zusätzlichen Download.
 */

const O = "#FF9900";

export type IconName =
  | "kompass"
  | "lupe"
  | "ziel"
  | "schild"
  | "globus"
  | "uhr"
  | "bild"
  | "streuung"
  | "bericht"
  | "trichter"
  | "stufen"
  | "regal";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": true as const,
    strokeWidth: 1.7,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    /* Strategie: Kompass, die Nadel orange. */
    case "kompass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 5-5 2 2-5z" fill={O} stroke={O} strokeWidth={1.2} />
        </svg>
      );

    /* Content und Listings: Lupe über einem Balkenbild. */
    case "lupe":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L21 21" />
          <path d="M8 12.5v-2M10.5 12.5V8" />
          <path d="M13 12.5v-3.5" stroke={O} strokeWidth={2} />
        </svg>
      );

    /* Advertising: Zielscheibe, der Treffer orange. */
    case "ziel":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.6" fill={O} stroke={O} />
        </svg>
      );

    /* Account-Management: Schild mit Person, Kante orange. */
    case "schild":
      return (
        <svg {...common}>
          <path d="M12 3l7 2.5v6c0 4-3 7.2-7 9.5-4-2.3-7-5.5-7-9.5v-6z" />
          <circle cx="12" cy="10.5" r="2.2" />
          <path d="M8.4 16.4c.9-1.7 2.1-2.5 3.6-2.5s2.7.8 3.6 2.5" stroke={O} strokeWidth={1.8} />
        </svg>
      );

    /* Internationalisierung: Globus mit zwei orangen Markierungen. */
    case "globus":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
          <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z" />
          <circle cx="8.6" cy="9.6" r="1.5" fill={O} stroke="none" />
          <circle cx="15.4" cy="14.4" r="1.5" fill={O} stroke="none" />
        </svg>
      );

    /* Zeitmangel: Uhr, der Zeiger orange. */
    case "uhr":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3.4 2.2" stroke={O} strokeWidth={2} />
        </svg>
      );

    /* Unveränderter Content: Bildrahmen mit Motiv. */
    case "bild":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <path d="M3.5 15.5l4.2-3.8 3.4 3 3-2.6 6.4 5.4" />
          <circle cx="15.6" cy="9" r="1.6" fill={O} stroke="none" />
        </svg>
      );

    /* Kampagnen ohne Struktur: Pfeile, die auseinanderlaufen. */
    case "streuung":
      return (
        <svg {...common}>
          <path d="M4 20L11 13" />
          <path d="M20 8.5V4h-4.5" stroke={O} strokeWidth={2} />
          <path d="M20 4l-6 6" stroke={O} strokeWidth={2} />
          <path d="M4 13.5V20h6.5" />
        </svg>
      );

    /* Ungelesene Berichte: Blatt mit Balken. */
    case "bericht":
      return (
        <svg {...common}>
          <path d="M6 3.5h8.5L19 8v12.5H6z" />
          <path d="M14 3.5V8H19" />
          <path d="M9 16.5v-3M12 16.5v-5" />
          <path d="M15 16.5v-2" stroke={O} strokeWidth={2} />
        </svg>
      );

    /* Trichter: viele oben, wenige unten. */
    case "trichter":
      return (
        <svg {...common}>
          <path d="M3.5 5h17l-6.5 7.5v6.5l-4 1.5v-8z" />
          <path d="M10 20.5l4-1.5" stroke={O} strokeWidth={2} />
        </svg>
      );

    /* Stufen: aufsteigende Treppe, die oberste Stufe orange. */
    case "stufen":
      return (
        <svg {...common}>
          <path d="M3.5 19.5h5v-5h5v-5h5v-5" />
          <path d="M18.5 4.5h2v15h-2z" fill={O} stroke={O} strokeWidth={1.2} />
        </svg>
      );

    /* Regal mit einsortierten Kartons, einer orange. */
    case "regal":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <path d="M3.5 12h17" />
          <path d="M8 4.5v7.5M14 12v7.5" />
          <rect x="15" y="6" width="4" height="4.5" rx="1" fill={O} stroke="none" />
        </svg>
      );
  }
}
