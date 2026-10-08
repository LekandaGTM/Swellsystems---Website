import { setRequestLocale } from "next-intl/server";
import { seitenMetadaten } from "@/lib/seo";
import HandwerkInhalt from "./handwerk-inhalt";

export const metadata = seitenMetadaten({
  pfad: "/de/handwerk",
  titel: "Büroarbeit automatisieren im Handwerksbetrieb | Swellsystems",
  beschreibung:
    "Offerten, Rapporte, Rechnungen: Automatisierungen und KI-Agenten, die Schweizer Handwerksbetrieben die Büroarbeit abnehmen. Mehr Zeit auf der Baustelle.",
});

export default function Page({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <HandwerkInhalt />;
}
