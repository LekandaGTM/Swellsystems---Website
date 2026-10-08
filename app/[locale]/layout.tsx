import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ORGANISATION_SCHEMA, SITE_NAME, SITE_URL, STANDARD_BILD, jsonLd } from "@/lib/seo";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveBackground from "@/components/WaveBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Poppins traegt nur die Wortmarke im Logo, und die ist fett. Vorher wurden
// fuenf Schnitte geladen und vorgeladen, vier davon ungenutzt.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
  display: "swap",
});

/*
 * Nur was fuer alle Seiten gilt. Titel, Description und Canonical setzt jede
 * Seite selbst ueber seitenMetadaten() aus lib/seo.ts. Stuende hier ein
 * Canonical, erbten ihn alle Seiten ohne eigenen und zeigten auf die Startseite.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | Prozessautomatisierung für Schweizer KMU`,
  openGraph: {
    siteName: SITE_NAME,
    locale: "de_CH",
    type: "website",
    images: [STANDARD_BILD],
  },
  twitter: { card: "summary_large_image" },
};

// Einzige Sprache. Zusammen mit setRequestLocale() rendert Next die Seiten
// beim Build statisch, statt sie bei jedem Aufruf neu zu bauen.
export function generateStaticParams() {
  return [{ locale: "de" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakarta.variable} ${poppins.variable}`}>
      <body className="relative overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(ORGANISATION_SCHEMA) }}
        />
        <NextIntlClientProvider messages={messages}>
          <WaveBackground />
          <div className="relative z-10">
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
