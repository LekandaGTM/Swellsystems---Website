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
  /** Zwei bis drei Saetze fuer die Kachel. Was war, was ist. */
  kurz: string;
  kennzahlen: Kennzahl[];
  /** Steht auf der Kachel als Schlagworte. */
  leistungen: string[];
  /** false, solange die ausfuehrliche Fassung noch nicht geschrieben ist. */
  detailFertig: boolean;
};

export const REFERENZEN: Referenz[] = [
  {
    slug: "doggyworld",
    firma: "Doggyworld",
    logo: "/doggyworld-logo.png",
    logoBreite: 1000,
    logoHoehe: 300,
    branche: "Onlinehandel, Hundezubehör",
    ort: "Schweiz",
    jahr: "2026",
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
    detailFertig: false,
  },
];

export function referenzFinden(slug: string): Referenz | undefined {
  return REFERENZEN.find((r) => r.slug === slug);
}
