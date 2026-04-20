import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swellsystems – Automatisiertes Outbound für B2B",
  description:
    "Swellsystems baut automatisierte Outbound-Systeme für B2B-Unternehmen. Mehr qualifizierte Leads, weniger manueller Aufwand.",
  metadataBase: new URL("https://swellsystems.ch"),
  openGraph: {
    title: "Swellsystems – Automatisiertes Outbound für B2B",
    description: "Mehr qualifizierte Leads. Ohne Aufwand.",
    url: "https://swellsystems.ch",
    siteName: "Swellsystems",
    locale: "de_CH",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakarta.variable} ${poppins.variable}`}>
      <body className="relative overflow-x-hidden" suppressHydrationWarning>
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
