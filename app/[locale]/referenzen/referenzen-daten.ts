/**
 * Die Referenzen an einem Ort.
 *
 * Uebersicht und Detailseite lesen aus derselben Quelle. Ohne das driftet
 * beides auseinander: auf der Kachel steht eine Zahl, auf der Detailseite eine
 * andere, und niemand merkt es, weil man beide Seiten nie nebeneinander sieht.
 *
 * Genannt werden darf nur, wofuer eine Freigabe vorliegt. Doggyworld hat der
 * Nennung mit Logo zugestimmt.
 */

export type Kennzahl = {
  wert: string;
  was: string;
};

export type Referenz = {
  slug: string;
  firma: string;
  logo: string;
  /** Wie breit das Logo im Kasten steht. Logos haben verschiedene Seitenverhaeltnisse. */
  logoBreite: number;
  logoHoehe: number;
  branche: string;
  ort: string;
  jahr: string;
  /**
   * Die Ueberschrift der Detailseite. Nennt das Ergebnis und nicht den
   * Firmennamen: den traegt daneben das Logo.
   */
  titel: string;
  /** Anzeige ohne Schema, url mit. Getrennt, damit "https://" nicht mitlaeuft. */
  website: { anzeige: string; url: string };
  /** Von Start bis Uebergabe. */
  dauer: string;
  /** Zwei bis drei Saetze fuer die Kachel. Was war, was ist. */
  kurz: string;
  kennzahlen: Kennzahl[];
  /** Steht auf der Kachel als Schlagworte. */
  leistungen: string[];
};

/*
 * Ob die ausfuehrliche Fassung existiert, steht nicht hier, sondern in
 * inhalte/index.ts. Ein Flag an dieser Stelle waere eine zweite Wahrheit
 * daneben und koennte auseinanderlaufen.
 */

export const REFERENZEN: Referenz[] = [
  {
    slug: "doggyworld",
    firma: "Doggyworld",
    logo: "/doggyworld-logo.png",
    logoBreite: 1000,
    logoHoehe: 300,
    branche: "E-Commerce",
    ort: "Schweiz",
    jahr: "2026",
    titel:
      "Onlineshop verringert die Produktbild-Erstellung dank Custom Interface " +
      "und KI-Generierung von zwei Stunden auf fünf Minuten pro Produkt.",
    website: { anzeige: "doggyworld.ch", url: "https://doggyworld.ch" },
    dauer: "3 Wochen",
    kurz:
      "Die Produktbilder für den Shop entstanden bereits mit KI, aber vollständig von Hand: " +
      "jedes Bild einzeln geschrieben, kein einheitlicher Prompt, jedes Mal ein anderes " +
      "Ergebnis und mehrere Versuche pro Bild. Heute liefert ein eigenes Werkzeug aus einem " +
      "Produktlink und einem Foto fünf fertige Shop-Bilder.",
    kennzahlen: [
      { wert: "20 bis 30 Min.", was: "gespart je Bild" },
      { wert: "1 bis 2 Std.", was: "gespart je Produkt" },
      { wert: "3 Minuten", was: "für fünf fertige Bilder" },
    ],
    leistungen: ["Bildgenerierung", "Eigenes Interface", "Shopify"],
  },
];

export function referenzFinden(slug: string): Referenz | undefined {
  return REFERENZEN.find((r) => r.slug === slug);
}
