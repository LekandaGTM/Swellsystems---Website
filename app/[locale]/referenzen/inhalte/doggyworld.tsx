"use client";

/**
 * Die ausfuehrliche Fassung der Doggyworld-Case-Study.
 *
 * Aufbau und Formulierungen folgen case-doggyworld-produktbilder.md im
 * Wurzelverzeichnis. Zwei Regeln von dort gelten hier besonders:
 *
 * 1. Die Kostenaussage lautet nicht "keine laufenden Kosten". Ein technischer
 *    Restsockel bleibt bestehen (Supabase). Sie steht jetzt als Listenpunkt
 *    "Kosteneffiziente Generierung (Pay per use)" im Ergebnis. Diese
 *    Formulierung stimmt mit und ohne Restsockel.
 * 2. Keine Qualitaetsquote behaupten, solange der Abnahmetest offen ist.
 *
 * Darstellung als Reiter statt als vier Abschnitte untereinander. Untereinander
 * war die Seite ueber 2000 Pixel lang, und die Zahlen oben, also das Staerkste,
 * waren nach zwei Wischern weg. So bleibt immer nur ein Schritt sichtbar und
 * der Kopf mit den Kennzahlen fast immer im Bild.
 *
 * Die Zahlen sind gemessen, nicht geschaetzt. Belege stehen im Repo
 * Swellsystem_Automations.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImageIcon,
  Link2,
  MessageSquareText,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

/**
 * Rohfoto und erzeugtes Bild nebeneinander. Beides muss vorliegen, sonst faellt
 * der Reiter ganz weg: ein leerer grauer Kasten auf einer Kundenseite ist
 * schlechter als ein fehlender Abschnitt.
 *
 * Zum Aktivieren die beiden Dateien nach public/ legen und hier eintragen.
 */
type Beleg = { roh: string; erzeugt: string; produkt: string };

// Die Zuweisung per "as" und nicht per Doppelpunkt-Typ: sonst engt TypeScript
// eine Konstante mit dem Wert null auf genau null ein, und der Zweig unten
// gilt als unerreichbar, obwohl er sich beim Eintragen der Bilder oeffnet.
const BELEG = null as Beleg | null;

const ABLAUF = [
  {
    icon: Link2,
    titel: "Produktlink und Foto rein",
    text: "Ein Link auf das Produkt im Shop, dazu ein Rohfoto. Mehr braucht es nicht.",
  },
  {
    icon: ImageIcon,
    titel: "Fünf fertige Bilder raus",
    text: "Rund drei Minuten später stehen die fünf Bilder bereit, die ein Produkt im Shop braucht.",
  },
  {
    icon: MessageSquareText,
    titel: "Korrektur per Satz",
    text: "Gefällt eines nicht, genügt ein Satz. Das bestehende Bild bleibt stehen, nur das Genannte ändert sich.",
  },
];

const ERGEBNIS = [
  "20 bis 30 Minuten gespart je Bild",
  "Fünf Bilder in rund drei Minuten",
  "Dateiname und Alt-Text SEO-fertig",
  "Einheitliche Brand Identity bei jedem Produkt",
  "Kosteneffiziente Generierung (Pay per use)",
  "Custom Interface, abgestimmt auf die Wünsche des Kunden",
];

const P = "text-slate-600 leading-relaxed";

/* ─── DIE VIER SCHRITTE ──────────────────────────────────────────── */

const SCHRITTE: { titel: string; inhalt: React.ReactNode }[] = [
  {
    titel: "Ausgangslage",
    inhalt: (
      <div className="space-y-4">
        <p className={P}>
          Die Produktbilder entstanden bereits mit KI. Nur vollständig von Hand. Jedes Bild
          wurde einzeln geschrieben, ohne einheitlichen Prompt, also kam jedes Mal ein
          anderes Ergebnis heraus und es brauchte meist mehrere Versuche.
        </p>
        <p className={P}>
          Die Zeit ging nicht in die Idee, sondern ins Nachbessern. Ein echtes Fotoshooting
          wäre um ein Vielfaches teurer gewesen und kam nie in Frage.
        </p>
        <p className={P}>
          Dazu liefen zwei Abos für Bildgenerierung. Monat für Monat, unabhängig davon, ob
          in dem Monat überhaupt Bilder gebraucht wurden.
        </p>
      </div>
    ),
  },
  {
    titel: "Analyse",
    inhalt: (
      <div className="space-y-4">
        <p className={P}>
          Vor dem Bauen stand die Frage, was bisher in jedem einzelnen Prompt neu erfunden
          wurde. Vier Punkte kamen zusammen: wie die Marke aussieht, welche Farben dazu
          gehören, welche fünf Bilder ein Produkt im Shop braucht, und was das Modell frei
          gestalten darf.
        </p>
        <p className={P}>Daraus wurde eine Faustregel, die seither jedes Bild bestimmt:</p>
        <div className="rounded-2xl bg-ocean-50/70 border border-ocean-100 px-6 py-5">
          <p className="text-slate-800 leading-relaxed">
            Szene, Licht und Umgebung darf das Modell frei gestalten. Was am Produkt selbst
            zu sehen ist, muss aus dem Rohbild stammen.
          </p>
        </div>
      </div>
    ),
  },
  {
    titel: "Lösung",
    inhalt: (
      <div className="space-y-5">
        <p className={P}>
          Eine Automatisierung, die diese Entscheidungen ein für alle Mal festhält, plus ein
          eigenes Interface, damit Doggyworld sie selbst bedient. Kein Werkzeug von der
          Stange, sondern eine Anwendung, die auf dem eigenen Rechner läuft.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ABLAUF.map((schritt, i) => {
            const Icon = schritt.icon;
            return (
              <div
                key={schritt.titel}
                className="relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-ocean-300 hover:shadow-lg hover:shadow-ocean-100/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-ocean-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-300 tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-3 font-display font-bold text-sm text-slate-900">
                  {schritt.titel}
                </h3>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{schritt.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    titel: "Ergebnis",
    inhalt: (
      <div>
        {/*
          Spalten statt Raster. Im Raster richten sich die Zeilen ueber beide
          Spalten hinweg auf gleiche Hoehe aus, und sobald ein Punkt umbricht,
          klafft neben dem kuerzeren Nachbarn eine Luecke. Hier fliesst der
          Text und die Punkte stehen dicht.
        */}
        <ul className="sm:columns-2 sm:gap-x-8 space-y-2.5">
          {ERGEBNIS.map((zeile) => (
            <li key={zeile} className="flex items-start gap-2.5 break-inside-avoid">
              <Check className="w-4 h-4 text-ocean-500 shrink-0 mt-1" />
              <span className="text-slate-600 leading-relaxed">{zeile}</span>
            </li>
          ))}
        </ul>

      </div>
    ),
  },
];

// Der Belegteil kommt nur dazu, wenn die Bilder wirklich vorliegen.
if (BELEG) {
  SCHRITTE.push({
    titel: "Aus dem Projekt",
    inhalt: (
      <div className="space-y-4">
        <p className={P}>
          Links das Rohfoto, rechts eines der fünf Bilder, die daraus entstanden sind.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <figcaption className="mt-2 text-sm text-slate-500">{seite.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    ),
  });
}

/* ─── DARSTELLUNG ────────────────────────────────────────────────── */

export default function DoggyworldInhalt() {
  const [aktiv, setAktiv] = useState(0);
  const reiterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const letzter = SCHRITTE.length - 1;

  /*
   * Die vier Schritte sind verschieden hoch, auf dem Bildschirm zwischen 124
   * und 285 Pixeln. Eine feste Mindesthoehe wuerde beim kuerzesten Schritt
   * ueber 150 Pixel leer stehen lassen, keine Mindesthoehe laesst den Kasten
   * beim Wechseln springen und den Knopf unter dem Finger wegrutschen.
   *
   * Also mitwachsen, animiert. Gemessen wird der innere Kasten, den es immer
   * gibt. Der Beobachter meldet sich auch beim Drehen des Geraets.
   */
  const messRef = useRef<HTMLDivElement>(null);
  const [hoehe, setHoehe] = useState<number | "auto">("auto");

  useEffect(() => {
    const el = messRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const beobachter = new ResizeObserver(([eintrag]) =>
      setHoehe(eintrag.target.getBoundingClientRect().height)
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  // Pfeiltasten sollen zwischen den Reitern wandern, so wie man es von einer
  // Reiterleiste erwartet. Ohne das ist die Leiste zwar fokussierbar, aber man
  // kommt mit der Tastatur nur ueber Tab-Sprünge weiter.
  function beiTaste(e: React.KeyboardEvent, i: number) {
    const ziel =
      e.key === "ArrowRight" ? (i + 1) % SCHRITTE.length
      : e.key === "ArrowLeft" ? (i - 1 + SCHRITTE.length) % SCHRITTE.length
      : e.key === "Home" ? 0
      : e.key === "End" ? letzter
      : null;

    if (ziel === null) return;
    e.preventDefault();
    setAktiv(ziel);
    reiterRefs.current[ziel]?.focus();
  }

  return (
    <AnimatedSection>
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
        {/* ─── REITERLEISTE ───────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Ablauf des Projekts"
          /*
            Auf dem Handy zwei mal zwei statt einer Zeile. Vier Reiter
            nebeneinander waeren dort entweder abgeschnitten oder haetten eine
            Scrollleiste unter sich, und beides sieht nach Panne aus.
          */
          className="grid grid-cols-2 sm:flex gap-1 border-b border-slate-200 bg-slate-50/80 p-1.5"
        >
          {SCHRITTE.map((schritt, i) => {
            const istAktiv = i === aktiv;
            return (
              <button
                key={schritt.titel}
                ref={(el) => {
                  reiterRefs.current[i] = el;
                }}
                role="tab"
                id={`reiter-${i}`}
                aria-selected={istAktiv}
                aria-controls={`feld-${i}`}
                tabIndex={istAktiv ? 0 : -1}
                onClick={() => setAktiv(i)}
                onKeyDown={(e) => beiTaste(e, i)}
                className={`relative sm:flex-1 whitespace-nowrap rounded-2xl px-3 sm:px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  istAktiv ? "text-ocean-700" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {/*
                  Der weisse Kasten wandert zwischen den Reitern, statt je Reiter
                  ein- und auszublenden. layoutId erledigt das.
                */}
                {istAktiv && (
                  <motion.span
                    layoutId="reiter-marker"
                    className="absolute inset-0 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      istAktiv ? "text-ocean-500" : "text-slate-300"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {schritt.titel}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── INHALTSFELD ────────────────────────────────────────── */}
        <motion.div
          animate={{ height: hoehe }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <div ref={messRef} className="px-6 py-7 md:px-8 md:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={aktiv}
                role="tabpanel"
                id={`feld-${aktiv}`}
                aria-labelledby={`reiter-${aktiv}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {SCHRITTE[aktiv].inhalt}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── WEITERBLAETTERN ────────────────────────────────────── */}
        {/*
          Die Reiterleiste allein laedt nicht zum Weiterlesen ein. Wer der
          Erzaehlung folgen will, klickt hier und bleibt in der Reihenfolge.
        */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          <button
            onClick={() => setAktiv((i) => Math.max(0, i - 1))}
            disabled={aktiv === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-ocean-600 disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </button>

          <div className="flex gap-1.5" aria-hidden="true">
            {SCHRITTE.map((schritt, i) => (
              <span
                key={schritt.titel}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === aktiv ? "w-5 bg-ocean-500" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setAktiv((i) => Math.min(letzter, i + 1))}
            disabled={aktiv === letzter}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-ocean-600 transition-colors hover:text-ocean-700 disabled:pointer-events-none disabled:opacity-0"
          >
            {SCHRITTE[Math.min(letzter, aktiv + 1)].titel}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
