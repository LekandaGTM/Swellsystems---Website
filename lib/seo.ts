import type { Metadata } from "next";

/*
 * Metadaten und Structured Data an einem Ort.
 *
 * Next.js ersetzt ein openGraph-Objekt einer Seite komplett, es mischt nichts
 * aus dem Layout dazu. Wer auf einer Seite nur Titel und URL setzt, verliert
 * Bild, Sitename und Locale. Darum baut jede Seite ihre Metadaten ueber
 * seitenMetadaten(), und die Felder, die ueberall gleich sind, stehen nur hier.
 */

export const SITE_URL = "https://www.swellsystems.ch";
export const SITE_NAME = "Swellsystems";
export const STANDARD_BILD = {
  url: "/swellsystems-outbound-b2b-schweiz.png",
  width: 1200,
  height: 630,
  alt: "Swellsystems: Prozessautomatisierung für Schweizer KMU",
};

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const CALVIN_ID = `${SITE_URL}/#calvin-heim`;
export const LINKEDIN_CALVIN = "https://www.linkedin.com/in/calvin-heim/";

type SeitenAngaben = {
  /** Pfad ab Domain, mit Locale, ohne Slash am Ende, z. B. "/de/handwerk". */
  pfad: string;
  titel: string;
  beschreibung: string;
  /** Eigenes OG-Bild. Ohne Angabe gilt das Standardbild. */
  bild?: typeof STANDARD_BILD | null;
  typ?: "website" | "article";
  /** Nur fuer type "article". */
  artikel?: { veroeffentlicht: string; geaendert?: string };
};

export function seitenMetadaten({
  pfad,
  titel,
  beschreibung,
  bild = STANDARD_BILD,
  typ = "website",
  artikel,
}: SeitenAngaben): Metadata {
  const url = `${SITE_URL}${pfad}`;
  // bild === null heisst: das Bild kommt aus einer opengraph-image-Datei der
  // Route. Dann hier keins setzen, sonst stehen zwei og:image im Kopf.
  const bilder = bild ? [bild] : undefined;

  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: url },
    openGraph: {
      title: titel,
      description: beschreibung,
      url,
      siteName: SITE_NAME,
      locale: "de_CH",
      type: typ,
      ...(bilder && { images: bilder }),
      ...(typ === "article" &&
        artikel && {
          publishedTime: artikel.veroeffentlicht,
          modifiedTime: artikel.geaendert ?? artikel.veroeffentlicht,
          authors: ["Calvin Heim"],
        }),
    },
    twitter: {
      card: "summary_large_image",
      title: titel,
      description: beschreibung,
      ...(bilder && { images: bilder.map((b) => b.url) }),
    },
  };
}

/*
 * Wer hinter der Seite steht, fuer Google und KI-Suchen. Rechtlicher Traeger
 * ist die LeadLab GmbH, Swellsystems ist die Marke. Beides muss mit dem
 * Impressum uebereinstimmen, sonst widersprechen sich die Quellen.
 */
export const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: SITE_NAME,
      legalName: "LeadLab GmbH",
      url: `${SITE_URL}/de`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/swellsystems-logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}${STANDARD_BILD.url}`,
      description:
        "Prozessautomatisierung für Schweizer KMU und Agenturen: Belegverarbeitung, Offert- und Auftragsprozesse, Reporting und Admin, meist mit n8n und auf Wunsch in der Schweiz gehostet.",
      email: "calvin@swellsystems.ch",
      telephone: "+41796495298",
      taxID: "CHE-344.886.977",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Espenmoostrasse 6",
        postalCode: "9008",
        addressLocality: "St. Gallen",
        addressRegion: "SG",
        addressCountry: "CH",
      },
      areaServed: { "@type": "Country", name: "Schweiz" },
      knowsLanguage: "de",
      founder: { "@id": CALVIN_ID },
      sameAs: [LINKEDIN_CALVIN],
    },
    {
      "@type": "Person",
      "@id": CALVIN_ID,
      name: "Calvin Heim",
      jobTitle: "Gründer",
      worksFor: { "@id": ORG_ID },
      url: `${SITE_URL}/de`,
      sameAs: [LINKEDIN_CALVIN],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/de`,
      inLanguage: "de-CH",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export type Brotkrume = { name: string; pfad: string };

export function brotkrumenSchema(krumen: Brotkrume[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: krumen.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k.name,
      item: `${SITE_URL}${k.pfad}`,
    })),
  };
}

/** JSON-LD sicher in ein script-Tag schreiben: "<" kann sonst das Tag beenden. */
export const jsonLd = (daten: unknown) => JSON.stringify(daten).replace(/</g, "\\u003c");
