/**
 * Die ausfuehrliche Fassung der Doggyworld-Case-Study.
 *
 * Aufbau und Formulierungen folgen case-doggyworld-produktbilder.md im
 * Wurzelverzeichnis. Zwei Regeln von dort gelten hier besonders:
 *
 * 1. Die Kostenaussage lautet nicht "keine laufenden Kosten". Ein technischer
 *    Restsockel bleibt bestehen (Supabase). Die Formulierung im Kasten unten
 *    stimmt in beiden Faellen und ist trotzdem die starke Aussage.
 * 2. Keine Qualitaetsquote behaupten, solange der Abnahmetest offen ist.
 *
 * Die Zahlen sind gemessen, nicht geschaetzt. Belege stehen im Repo
 * Swellsystem_Automations.
 */

import Image from "next/image";
import { Check, Link2, ImageIcon, MessageSquareText } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * Rohfoto und erzeugtes Bild nebeneinander. Beides muss vorliegen, sonst wird
 * der Abschnitt gar nicht erst gerendert: ein leerer grauer Kasten auf einer
 * Kundenseite ist schlechter als ein fehlender Abschnitt.
 *
 * Zum Aktivieren die beiden Dateien nach public/ legen und hier eintragen.
 */
const BELEG: { roh: string; erzeugt: string; produkt: string } | null = null;

const ABLAUF = [
  {
    icon: Link2,
    titel: "Produktlink und Foto rein",
    text: "Ein Link auf das Produkt im Shop, dazu ein Rohfoto. Mehr braucht es nicht.",
  },
  {
    icon: ImageIcon,
    titel: "Fünf fertige Bilder raus",
    text: "Rund drei Minuten später stehen die fünf Bilder bereit, die ein Produkt im Shop braucht. Dateiname und Alt-Text kommen shopfertig mit.",
  },
  {
    icon: MessageSquareText,
    titel: "Korrektur per Satz",
    text: "Gefällt eines nicht, genügt ein Satz. Das bestehende Bild bleibt stehen, nur das Genannte ändert sich.",
  },
];

const ERGEBNIS = [
  "20 bis 30 Minuten gespart je Bild",
  "Bei fünf Bildern je Produkt: ein bis zwei Stunden je Produkt",
  "Fünf Bilder in rund drei Minuten",
  "Rund einen halben Dollar je Produkt",
  "Dateiname und Alt-Text kommen SEO-fertig mit",
  "Alle Konten laufen auf den Kunden",
];

function Abschnitt({
  nummer,
  titel,
  children,
}: {
  nummer: string;
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection className="border-t border-slate-200 pt-10">
      <div className="flex items-baseline gap-3">
        <span className="font-display font-bold text-sm text-ocean-500">{nummer}</span>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
          {titel}
        </h2>
      </div>
      <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">{children}</div>
    </AnimatedSection>
  );
}

export default function DoggyworldInhalt() {
  return (
    <div className="space-y-14">
      {/* ─── 1. AUSGANGSLAGE ──────────────────────────────────────── */}
      <Abschnitt nummer="01" titel="Ausgangslage">
        <p>
          Die Produktbilder entstanden bereits mit KI. Nur vollständig von Hand.
        </p>
        <p>
          Jedes Bild wurde einzeln geschrieben. Es gab keinen einheitlichen Prompt, also
          kam jedes Mal ein anderes Ergebnis heraus, und meist brauchte es mehrere
          Versuche, bis eines brauchbar war. Die Zeit ging nicht in die Idee, sondern ins
          Nachbessern.
        </p>
        <p>
          Ein echtes Fotoshooting wäre um ein Vielfaches teurer gewesen und kam nie in
          Frage.
        </p>
        <p>
          Dazu liefen zwei Abos für Bildgenerierung. Monat für Monat, unabhängig davon, ob
          in dem Monat überhaupt Bilder gebraucht wurden.
        </p>
      </Abschnitt>

      {/* ─── 2. ANALYSE ───────────────────────────────────────────── */}
      <Abschnitt nummer="02" titel="Analyse">
        <p>
          Vor dem Bauen stand die Frage, was bisher in jedem einzelnen Prompt neu erfunden
          wurde. Vier Punkte kamen zusammen: wie die Marke aussieht, welche Farben dazu
          gehören, welche fünf Bilder ein Produkt im Shop braucht, und was das Modell frei
          gestalten darf.
        </p>
        <p>Daraus wurde eine Faustregel, die seither jedes Bild bestimmt:</p>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-7 not-italic">
          <p className="text-slate-800 leading-relaxed">
            Szene, Licht und Umgebung darf das Modell frei gestalten. Was am Produkt selbst
            zu sehen ist, muss aus dem Rohbild stammen.
          </p>
        </div>
      </Abschnitt>

      {/* ─── 3. LÖSUNG ────────────────────────────────────────────── */}
      <Abschnitt nummer="03" titel="Lösung">
        <p>
          Eine Automatisierung, die diese Entscheidungen ein für alle Mal festhält, plus
          ein eigenes Interface, damit Doggyworld sie selbst bedient. Kein Werkzeug von der
          Stange, sondern eine Anwendung, die auf dem eigenen Rechner läuft.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {ABLAUF.map((schritt) => {
            const Icon = schritt.icon;
            return (
              <div
                key={schritt.titel}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-100/40 transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-ocean-500" />
                <h3 className="mt-4 font-display font-bold text-base text-slate-900">
                  {schritt.titel}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{schritt.text}</p>
              </div>
            );
          })}
        </div>
      </Abschnitt>

      {/* ─── 4. ERGEBNIS ──────────────────────────────────────────── */}
      <Abschnitt nummer="04" titel="Ergebnis">
        <ul className="space-y-3">
          {ERGEBNIS.map((zeile) => (
            <li key={zeile} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-ocean-500 shrink-0 mt-1" />
              <span>{zeile}</span>
            </li>
          ))}
        </ul>

        {/*
          Die Kostenaussage. Wortlaut aus dem Konzept, bewusst nicht "keine
          laufenden Kosten". Nicht umformulieren, ohne den Restsockel zu pruefen.
        */}
        <div className="rounded-2xl bg-slate-900 p-6 md:p-8 !mt-8 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)" }}
          />
          <p className="relative text-slate-200 leading-relaxed">
            Vorher zwei Abos für Bildgenerierung, die jeden Monat liefen, ob Bilder
            gebraucht wurden oder nicht. Heute wird je erzeugtem Bild bezahlt.{" "}
            <span className="text-white font-semibold">Kein Bild, keine Kosten.</span>
          </p>
        </div>
      </Abschnitt>

      {/* ─── 5. BELEG ─────────────────────────────────────────────── */}
      {BELEG && (
        <Abschnitt nummer="05" titel="Aus dem Projekt">
          <p>
            Links das Rohfoto, rechts eines der fünf Bilder, die daraus entstanden sind.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { bild: BELEG.roh, label: "Rohfoto" },
              { bild: BELEG.erzeugt, label: "Erzeugtes Shop-Bild" },
            ].map((seite) => (
              <figure key={seite.label} className="m-0">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                  <Image
                    src={seite.bild}
                    alt={`${seite.label}: ${BELEG.produkt}`}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500">{seite.label}</figcaption>
              </figure>
            ))}
          </div>
        </Abschnitt>
      )}
    </div>
  );
}
