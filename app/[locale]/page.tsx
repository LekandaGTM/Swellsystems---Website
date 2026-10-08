import { setRequestLocale } from "next-intl/server";
import { seitenMetadaten } from "@/lib/seo";
import Startseite from "./startseite";

// Der Inhalt ist eine Client-Komponente (Animationen, Rechner). Metadaten darf
// nur eine Server-Komponente exportieren, darum diese duenne Huelle.
export const metadata = seitenMetadaten({
  pfad: "/de",
  titel: "Prozessautomatisierung für Schweizer KMU | Swellsystems",
  beschreibung:
    "Wir automatisieren Anfragen, Onboarding, Projektabwicklung und Reporting für Schweizer KMU und Agenturen. 30 bis 50 Prozent tiefere Betriebskosten.",
});

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <Startseite />;
}
