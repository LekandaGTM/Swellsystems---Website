import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";

// Eigenständiges Layout für die Wartungsseite — unabhängig von next-intl,
// bringt html/body + Fonts selbst mit.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swellsystems – Wartungsarbeiten",
  description:
    "Unsere Website wird gerade überarbeitet. In Kürze sind wir wieder für Sie da.",
  robots: { index: false, follow: false },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
