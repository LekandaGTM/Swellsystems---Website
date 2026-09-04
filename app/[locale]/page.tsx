"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Mail,
  ClipboardList,
  ListChecks,
  Workflow,
  FlaskConical,
  Rocket,
  UserPlus,
  Users,
  Inbox,
  Boxes,
  BarChart3,
  Linkedin,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  Search,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const CAL_LINK = "https://cal.com/calvin-heim-swellsystems/30min";

// Bewusst ohne Intl.NumberFormat: Node und Browser liefern fuer de-CH
// unterschiedliche Tausendertrennzeichen, was die Hydration bricht.
const chf = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u2019");

/* ─── Grafik: die Prozesskette und ihre Bruchstellen ─────────── */
function ProzessbruchGrafik() {
  const reduce = useReducedMotion();

  const stufen = [
    { icon: Inbox, titel: "Anfrage", sub: "Landet in drei verschiedenen Listen" },
    { icon: UserPlus, titel: "Onboarding", sub: "Jedes Mal ein anderer Ablauf" },
    { icon: Boxes, titel: "Projektabwicklung", sub: "Aufgaben über vier Tools verteilt" },
    { icon: BarChart3, titel: "Kennzahlen", sub: "Von Hand zusammengeklickt" },
  ];

  const brueche = [
    "Übergabe per Mail. Follow-up geht unter.",
    "Unterlagen fehlen. Start verzögert sich.",
    "Status unklar. Es wird doppelt gearbeitet.",
  ];

  const LINE_X = 40;
  const GAP = 104;

  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-radial from-ocean-100/40 via-ocean-50/10 to-transparent blur-2xl pointer-events-none" />

      <div className="relative">
        {stufen.map(({ icon: Icon, titel, sub }, i) => (
          <div key={titel}>
            {/* Stufe */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="relative bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-ocean-50 border border-ocean-100 flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-ocean-500" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-slate-900 text-[15px] leading-tight">{titel}</p>
                <p className="text-slate-500 text-xs leading-snug mt-0.5">{sub}</p>
              </div>
            </motion.div>

            {/* Bruchstelle */}
            {i < brueche.length && (
              <div className="relative" style={{ height: GAP }}>
                {/* gestrichelte Verbindung */}
                <div
                  className="absolute top-0 bottom-0 w-px border-l border-dashed border-slate-300"
                  style={{ left: LINE_X }}
                />

                {/* Arbeit, die durchläuft */}
                <motion.span
                  className="absolute w-[7px] h-[7px] rounded-full bg-ocean-400"
                  style={{ left: LINE_X - 3, top: 0 }}
                  animate={reduce ? { opacity: 0.6 } : { y: [0, GAP], opacity: [0, 1, 1, 0] }}
                  transition={
                    reduce
                      ? {}
                      : { duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "linear", times: [0, 0.15, 0.8, 1] }
                  }
                />

                {/* Arbeit, die im Bruch verloren geht */}
                <motion.span
                  className="absolute w-[7px] h-[7px] rounded-full bg-swell-orange"
                  style={{ left: LINE_X - 3, top: 0 }}
                  animate={
                    reduce
                      ? { y: GAP / 2, x: 22, opacity: 0.7 }
                      : { y: [0, GAP / 2, GAP / 2 + 14], x: [0, 0, 26], opacity: [0, 1, 0] }
                  }
                  transition={
                    reduce
                      ? {}
                      : { duration: 2.4, repeat: Infinity, delay: i * 0.8 + 1.2, ease: "easeIn" }
                  }
                />

                {/* Beschriftung */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                  className="absolute top-1/2 -translate-y-1/2 flex items-start gap-2.5"
                  style={{ left: LINE_X + 26, right: 0 }}
                >
                  <span className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-px">
                    <AlertTriangle className="w-3 h-3 text-swell-orange" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-swell-orange-dark">
                      Bruchstelle
                    </span>
                    <span className="block text-slate-500 text-xs leading-snug mt-0.5">{brueche[i]}</span>
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legende */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ocean-400" />
          Arbeit, die durchläuft
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-swell-orange" />
          Arbeit, die im Bruch liegen bleibt
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Rechner: Kosten der manuellen Abläufe ──────────────────── */
function KostenRechner() {
  const [mitarbeiter, setMitarbeiter] = useState(8);
  const [stunden, setStunden] = useState(6);
  const [satz, setSatz] = useState(85);

  const ARBEITSWOCHEN = 45;
  const stundenProJahr = mitarbeiter * stunden * ARBEITSWOCHEN;
  const kostenProJahr = stundenProJahr * satz;
  const kostenProMonat = kostenProJahr / 12;

  const szenarien = [
    { name: "Konservativ", quote: 0.3, hervorgehoben: false },
    { name: "Realistisch", quote: 0.4, hervorgehoben: true },
    { name: "Optimistisch", quote: 0.5, hervorgehoben: false },
  ];

  const slider =
    "w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-ocean-500 cursor-pointer";

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Eingaben */}
          <div className="p-8 md:p-10 space-y-8">
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-semibold text-slate-700">
                  Mitarbeitende im Betrieb
                </label>
                <span className="font-display font-bold text-ocean-600">{mitarbeiter}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={mitarbeiter}
                onChange={(e) => setMitarbeiter(Number(e.target.value))}
                className={slider}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-semibold text-slate-700 pr-3">
                  Stunden pro Woche und Person für manuelle Abläufe
                </label>
                <span className="font-display font-bold text-ocean-600 shrink-0 whitespace-nowrap">
                  {stunden} h
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={stunden}
                onChange={(e) => setStunden(Number(e.target.value))}
                className={slider}
              />
              <p className="text-xs text-slate-400 mt-2 leading-snug">
                Gemeint sind Daten übertragen, Infos suchen, nachfragen, doppelt erfassen,
                Reportings zusammenklicken.
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-semibold text-slate-700">
                  Interner Stundensatz
                </label>
                <span className="font-display font-bold text-ocean-600">CHF {satz}</span>
              </div>
              <input
                type="range"
                min={40}
                max={200}
                step={5}
                value={satz}
                onChange={(e) => setSatz(Number(e.target.value))}
                className={slider}
              />
            </div>
          </div>

          {/* Ist-Kosten */}
          <div className="relative bg-slate-900 p-8 md:p-10 flex flex-col justify-center">
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }}
            />
            <div className="relative space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Manuelle Abläufe kosten dich heute
              </p>

              <div>
                <p className="font-display font-bold text-3xl md:text-4xl text-white">
                  CHF {chf(kostenProMonat)}
                </p>
                <p className="text-slate-500 text-xs mt-1">pro Monat</p>
              </div>

              <div className="pt-5 border-t border-white/10">
                <p className="font-display font-bold text-2xl text-slate-300">
                  CHF {chf(kostenProJahr)}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  pro Jahr, das sind {chf(stundenProJahr)} Stunden bei {ARBEITSWOCHEN} Arbeitswochen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Einsparung nach Szenario */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-7 md:px-10 md:py-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5 text-center md:text-left">
            Davon automatisierbar
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {szenarien.map(({ name, quote, hervorgehoben }) => {
              const sparJahr = kostenProJahr * quote;
              const sparMonat = sparJahr / 12;
              const tage = Math.round((stundenProJahr * quote) / 8);
              return (
                <div
                  key={name}
                  className={
                    hervorgehoben
                      ? "rounded-2xl border-2 border-ocean-300 bg-white p-5 shadow-sm"
                      : "rounded-2xl border border-slate-200 bg-white p-5"
                  }
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span
                      className={
                        hervorgehoben
                          ? "text-xs font-bold uppercase tracking-widest text-ocean-600"
                          : "text-xs font-bold uppercase tracking-widest text-slate-400"
                      }
                    >
                      {name}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {Math.round(quote * 100)}%
                    </span>
                  </div>

                  <p className="font-display font-bold text-2xl text-slate-900 leading-tight">
                    CHF {chf(sparMonat)}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">gespart pro Monat</p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="font-display font-bold text-lg text-ocean-600 leading-tight">
                      CHF {chf(sparJahr)}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      pro Jahr, {tage} Arbeitstage frei
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
        Rechenmodell auf Basis von 30 bis 50 Prozent Automatisierungsgrad. Wie viel bei dir
        tatsächlich drinliegt, zeigt die Analyse in Schritt 1.
      </p>
    </>
  );
}

export default function ProzessPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const irrtuemer = [
    {
      icon: Users,
      glaube: "Wir brauchen mehr Leute.",
      realitaet:
        "Du stellst ein und kannst mehr Kunden annehmen. Gleichzeitig steigen deine Betriebskosten mit. Mehr Umsatz bedeutet so nicht automatisch mehr Gewinn, und die Abläufe dahinter laufen weiterhin von Hand.",
    },
    {
      icon: Boxes,
      glaube: "Wir brauchen teurere Software.",
      realitaet:
        "Auch nach der Einführung werden die meisten Arbeitsschritte weiterhin von Hand ausgeführt. Die Software verwaltet die Arbeit nur an einem neuen Ort. Das entlastet niemanden und verursacht zusätzliche Kosten.",
    },
    {
      icon: Inbox,
      glaube: "Wir brauchen mehr Leads.",
      realitaet:
        "Das stimmt, aber nur mit automatisierten Prozessen. Von Hand betreust du mehr Anfragen nur mit mehr Personal. Mit unseren KI-Agenten und automatisierten Abläufen betreust du mehr Leads ohne zusätzliche Einstellungen.",
    },
  ];

  const diagnose = [
    {
      icon: Workflow,
      title: "Abläufe laufen, wie sie einmal definiert wurden",
      desc: "Der erste Schritt ist deshalb, sie anzuschauen. Was gut funktioniert, wird automatisiert. Was hakt, wird leicht angepasst, damit es automatisiert werden kann. In beiden Fällen fällt danach ein grosser Teil der Handarbeit weg.",
    },
    {
      icon: Search,
      title: "Wissen steckt in Köpfen",
      desc: "Geht eine Person, geht ihr Wissen mit. Die neue braucht Monate, bis sie alles versteht, und in der Zwischenzeit bleibt immer wieder etwas liegen. Beim Kunden hinterlässt das einen schlechten Eindruck. Automatisierte Abläufe laufen unabhängig davon, wer gerade da ist, und zeigen sofort, wo etwas hängt.",
    },
    {
      icon: BarChart3,
      title: "Keine messbaren Workflows",
      desc: "Ohne durchgängige Prozesse mit klarem Status lässt sich weder sauber planen noch erkennen, wo der grösste Hebel liegt. Entscheidungen fallen aus dem Bauch.",
    },
  ];

  const mechanismSteps = [
    {
      number: "01",
      week: "Schritt 1",
      phase: "Ist-Aufnahme",
      icon: ClipboardList,
      title: "Vollständiges Bild des Ist-Zustands",
      desc: "Wir erfassen alle relevanten Prozesse, Tools und Schnittstellen und sprechen mit den entscheidenden Leuten aus Vertrieb, Onboarding und Fulfillment. So wird sichtbar, was täglich wirklich passiert, wo Zeit verloren geht und wo Fehler und Doppelarbeit entstehen.",
      tags: ["Prozess-Mapping", "Tool-Landschaft", "Interviews im Team"],
      effort: "Ein paar Gespräche mit deinen Schlüsselpersonen",
      dark: false,
    },
    {
      number: "02",
      week: "Schritt 2",
      phase: "Priorisierung",
      icon: ListChecks,
      title: "Hebel priorisieren statt alles gleichzeitig",
      desc: "Wir werten die Aufnahme aus und identifizieren die Prozesse mit dem grössten Effekt: wiederkehrende Aufgaben mit hohem manuellem Aufwand, die sich vergleichsweise leicht automatisieren lassen. Daraus entsteht eine Roadmap mit Quick Wins und strategischen Automatisierungen.",
      tags: ["Aufwand-Nutzen-Bewertung", "Quick Wins", "Roadmap"],
      effort: "Roadmap gemeinsam durchgehen und freigeben",
      dark: false,
    },
    {
      number: "03",
      week: "Schritt 3",
      phase: "Zielbild",
      icon: Workflow,
      title: "Zielprozesse und Wissensbasis",
      desc: "Wir definieren, wie Vertrieb, Mitarbeiter-Onboarding, Kunden-Onboarding und Projektabwicklung künftig ablaufen, legen Zuständigkeiten und Status fest und bauen eine zentrale Wissensdatenbank mit SOPs, Checklisten und Vorlagen. Parallel entsteht das technische Konzept: welches System welche Aufgabe übernimmt und welcher Trigger welche Aktion auslöst.",
      tags: ["Zielprozesse", "SOPs und Checklisten", "Technisches Konzept"],
      effort: "Freigabe der Zielprozesse, kurze Feedbackrunden",
      dark: false,
    },
    {
      number: "04",
      week: "Schritt 4",
      phase: "Test",
      icon: FlaskConical,
      title: "Umsetzung in einer sicheren Testumgebung",
      desc: "Neuer Lead, neuer Mitarbeiter, neuer Kunde, neuer Auftrag: Wir spielen die typischen Szenarien durch, decken Logikfehler und Sonderfälle auf und bessern nach, bis die Workflows stabil laufen. Dein Tagesgeschäft bleibt währenddessen unberührt.",
      tags: ["Testumgebung", "Szenarien durchspielen", "Sonderfälle"],
      effort: "Keiner. Wir bauen und testen im Hintergrund",
      dark: false,
    },
    {
      number: "05",
      week: "Ab jetzt laufend",
      phase: "Rollout und Optimierung",
      icon: Rocket,
      title: "Go-live, Schulung und Dashboards",
      desc: "Die neuen Abläufe gehen in den produktiven Systemen live, das Team wird gezielt geschult und Dashboards machen Zeitersparnis, Durchlaufzeiten, Fehlerraten und Kapazität sichtbar. Auf dieser Basis optimieren wir weiter und nehmen Schritt für Schritt zusätzliche Prozesse dazu.",
      tags: ["Go-live", "Team-Schulung", "Kennzahlen-Dashboard"],
      effort: "Schulung mitmachen, Kennzahlen im Blick behalten",
      dark: true,
    },
  ];

  const faqs = [
    {
      q: "Woher kommen die 30 bis 50 Prozent?",
      a: "Aus dem Anteil deiner Arbeitszeit, der heute in wiederkehrende manuelle Abläufe fliesst: Daten von Hand übertragen, Arbeitsschritte weiterreichen, nachfragen, Status suchen, Inhalte fürs Fulfillment jedes Mal neu erstellen. Der Rechner weiter oben zeigt dafür drei Szenarien: konservativ 30 Prozent, realistisch 40 Prozent, optimistisch 50 Prozent. Gemessen wird dieser Anteil in Schritt 1. Bis dahin ist es eine Bandbreite, keine Zusage.",
    },
    {
      q: "Müssen wir unsere bestehende Software ersetzen?",
      a: "In der Regel nicht. Zuerst wird geprüft, was deine bestehenden Systeme leisten und wo sie sauber miteinander verbunden werden können. Neue Software kommt nur dort ins Spiel, wo eine echte Lücke besteht, und wird dann begründet, nicht einfach gesetzt.",
    },
    {
      q: "Wie lange dauert das Ganze?",
      a: "Nach der Ist-Aufnahme dauert es in der Regel 2 bis 4 Wochen, bis die ersten Workflows in deinem Tagesgeschäft laufen. Ausgeliefert wird pro Prozess statt in einem grossen Wurf, sodass die ersten Quick Wins spürbar sind, bevor die grösseren Automatisierungen stehen.",
    },
    {
      q: "Sind wir mit unserer Grösse überhaupt relevant?",
      a: "Das Vorgehen passt für Betriebe und Agenturen, bei denen mehrere Personen an denselben Abläufen arbeiten und wiederkehrende Prozesse existieren. Ab ungefähr fünf Mitarbeitenden lohnt sich der Aufwand meist deutlich, weil die Übergaben genau dort teuer werden.",
    },
    {
      q: "Was ist mit Datenschutz und Schweizer Anforderungen?",
      a: "Datenflüsse werden von Anfang an mitgedacht: welche Daten wo liegen, wer Zugriff hat und welche Systeme ausserhalb der Schweiz oder der EU verarbeiten. Wo es sensibel wird, werden Alternativen aufgezeigt, bevor etwas gebaut wird.",
    },
    {
      q: "Was passiert, wenn das Team nicht mitzieht?",
      a: "Deshalb beginnt der Prozess mit Gesprächen im Team und nicht am Reissbrett. Die Zielprozesse entstehen entlang der Arbeit, die ohnehin gemacht wird. Dazu kommen Schulung und Anleitungen für die Schritte, die manuell bleiben.",
    },
    {
      q: "Was kostet die Zusammenarbeit?",
      a: "Das hängt von der Anzahl Prozesse und der Grösse deines Betriebs ab, daher gibt es keinen Einheitspreis. Das Erstgespräch ist kostenlos und unverbindlich. Ein Angebot kommt erst, wenn der Umfang klar ist.",
    },
  ];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center px-6 pt-28 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-ocean-100/60 via-ocean-50/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-swell-orange-light/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center w-full space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 animate-pulse" />
              KI-Automatisierung für B2B-KMU und Agenturen
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.15]">
              Mehr Kunden dank
            </h1>
            {/*
              Eigener Verlauf statt der Klasse .gradient-text, die von Blau nach
              Orange laeuft. Blau und Orange liegen sich auf dem Farbkreis fast
              gegenueber, jeder Weg dazwischen fuehrt durch ein blasses Graubraun.
              Bei "Skalieren mit KI." war die Strecke zu kurz, um das zu sehen;
              bei dieser Zeile sass der Matsch mitten in "Automatisierungen",
              auch in oklab. Deshalb bleibt die Zeile im Blaubereich, dieselben
              zwei Toene wie in der Wortmarke. Orange bleibt Akzentfarbe an den
              Stellen, wo es fuer sich steht.
            */}
            <h1
              className="font-display font-bold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] tracking-tight leading-[1.15] gradient-text pb-1"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #0ea5e9 0%, #0284c7 55%, #075985 100%)",
              }}
            >
              KI-Prozessen &amp; Automatisierungen
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed"
          >
            Mit intelligenten KI-Prozessen und Automatisierungen helfen wir B2B-KMU und
            Agenturen, wiederkehrende Prozesse zu automatisieren, sodass du deine
            operativen Kosten um 30 bis 50 Prozent senken kannst, mehr Gewinn erzielst
            und dafür keine neuen Mitarbeiter einstellen musst.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-1"
            >
              Kostenloses Erstgespräch buchen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scrollTo("mechanismus")}
              className="flex items-center gap-2 border border-slate-300 hover:border-ocean-400 text-slate-700 hover:text-ocean-700 font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              So funktioniert&apos;s
            </button>
          </motion.div>

        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none -mt-2">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q180 10 360 40 Q540 70 720 40 Q900 10 1080 40 Q1260 70 1440 40 L1440 80 L0 80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── PROBLEM ──────────────────────────────────────────────── */}
      <section id="problem" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                Realität
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
                Operativ am Limit,
                <br />
                obwohl die Nachfrage
                <br />
                da wäre.
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  In den meisten Agenturen und KMU laufen die Prozesse bis heute manuell. Jede
                  Anfrage, jeder neue Kunde und jeder Auftrag wird von Hand erfasst, weitergegeben
                  und nachgehalten. Das frisst Woche für Woche enorm viel Zeit, ohne dass dadurch
                  ein einziger Auftrag besser wird.
                </p>
                <p>
                  Genau das limitiert dein Wachstum. Ab einem gewissen Punkt kannst du keine neuen
                  Kunden mehr annehmen, ohne zusätzliches Personal einzustellen. Nicht weil die
                  Nachfrage fehlt, sondern weil der manuelle Aufwand mitwächst.
                </p>
                <p>
                  Genau diese Aufgaben übernehmen unsere KI-Agenten und Automatisierungs-Prozesse.
                  Sie nehmen deinem Betrieb 30 bis 50% des operativen Zeitaufwands ab. Das senkt
                  deine Betriebskosten und schlägt sich direkt im Gewinn nieder.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <ProzessbruchGrafik />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>

      {/* ─── IRRGLAUBE ────────────────────────────────────────────── */}
      <section id="irrglaube" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Der Irrglaube
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Das Problem ist nicht die Kapazität.
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Die meisten Inhaber lösen ein Kapazitätsproblem über neue Mitarbeitende oder teurere
              Software. Nur liegt das Problem nicht bei der Kapazität, sondern bei den Prozessen
              dahinter. Solange alles von Hand läuft, ist Wachstum ohne ein grösseres Team gar nicht
              möglich.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {irrtuemer.map(({ icon: Icon, glaube, realitaet }, i) => (
              <AnimatedSection key={glaube} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-slate-50 border-b border-slate-200 p-6 md:min-h-[132px]">
                    <Icon className="w-5 h-5 text-slate-400 mb-3" />
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Die Annahme
                    </p>
                    <p className="font-display font-bold text-lg text-slate-900 leading-snug">
                      {glaube}
                    </p>
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-ocean-600 mb-2">
                      Was tatsächlich passiert
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">{realitaet}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-8">
            <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Der Irrglaube besteht darin, ein Prozessproblem mit mehr Personal und teurerer
              Software zu lösen. Beides erhöht deine Fixkosten, ohne dass die manuelle Arbeit
              dahinter verschwindet.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── DIAGNOSE ─────────────────────────────────────────────── */}
      <section id="diagnose" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Die Diagnose
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Deine Prozesse sind Handarbeit.
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Es gibt keinen Prozess, der einen Arbeitsschritt vom einen System ins nächste
              weiterreicht. Jede Übergabe passiert von Hand, und auch das, was im Fulfillment
              entsteht, wird jedes Mal manuell erstellt. Deshalb wächst der Aufwand mit jedem
              Auftrag mit.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {diagnose.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ocean-500" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 md:min-h-[56px]">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-6">
            <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto">
              Die Folge: Wachstum wird mit mehr Handarbeit, mehr Abstimmung und steigenden Fixkosten
              bezahlt, statt mit sauberen, skalierbaren Prozessen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>

      {/* ─── MECHANISMUS ──────────────────────────────────────────── */}
      <section id="mechanismus" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Der Prozess
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              In 5 Schritten zum automatisierten Betrieb
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Kein Tool von der Stange, sondern ein System entlang deiner Abläufe. Erst messen, dann
              priorisieren, dann bauen.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-ocean-200 via-ocean-300 to-orange-300 hidden sm:block md:-translate-x-px" />

            <div className="space-y-8">
              {mechanismSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                const Icon = step.icon;
                const content = (
                  <div
                    className={
                      step.dark
                        ? "relative bg-slate-900 border border-slate-700 rounded-2xl p-7 overflow-hidden"
                        : "bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-ocean-200 transition-all duration-300"
                    }
                  >
                    {step.dark && (
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }} />
                    )}
                    <div className="relative">
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <span
                          className={
                            step.dark
                              ? "text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full"
                              : "text-xs font-bold bg-ocean-50 text-ocean-600 border border-ocean-200 px-3 py-1 rounded-full"
                          }
                        >
                          {step.week}
                        </span>
                        <span className={step.dark ? "text-xs text-slate-500 font-medium" : "text-xs text-slate-400 font-medium"}>
                          {step.phase}
                        </span>
                      </div>
                      <div className={`flex items-center gap-2.5 mb-2 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                        <Icon className={step.dark ? "w-4 h-4 text-orange-300 shrink-0" : "w-4 h-4 text-ocean-500 shrink-0"} />
                        <h3 className={step.dark ? "font-display font-bold text-xl text-white" : "font-display font-bold text-xl text-slate-900"}>
                          {step.title}
                        </h3>
                      </div>
                      <p className={step.dark ? "text-slate-400 text-sm leading-relaxed mb-5" : "text-slate-500 text-sm leading-relaxed mb-5"}>
                        {step.desc}
                      </p>
                      <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                        {step.tags.map((tag) => (
                          <span key={tag} className={step.dark ? "text-xs bg-white/10 text-slate-300 px-2.5 py-1 rounded-full" : "text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={`mt-4 pt-4 border-t flex items-center gap-2 text-xs ${step.dark ? "border-white/10 text-slate-500" : "border-slate-100 text-slate-400"} ${isLeft ? "md:justify-end" : ""}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${step.dark ? "bg-orange-400" : "bg-emerald-400"}`} />
                        <span>
                          <span className={step.dark ? "font-semibold text-slate-300" : "font-semibold text-slate-600"}>Dein Aufwand:</span> {step.effort}
                        </span>
                      </div>
                    </div>
                  </div>
                );

                return (
                  <AnimatedSection key={step.number} delay={i * 0.08} direction={isLeft ? "left" : "right"}>
                    <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-0">
                      {isLeft ? (
                        <>
                          <div className="flex-1 md:pr-12 md:text-right order-2 md:order-1">{content}</div>
                          <div className={`hidden md:flex shrink-0 w-7 h-7 rounded-full border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2 ${step.dark ? "bg-orange-500" : "bg-ocean-500"}`}>
                            <span className="text-white text-[9px] font-black">{step.number}</span>
                          </div>
                          <div className="hidden md:block flex-1 md:pl-12 order-3" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block flex-1 md:pr-12 order-1" />
                          <div className={`hidden md:flex shrink-0 w-7 h-7 rounded-full border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2 ${step.dark ? "bg-orange-500" : "bg-ocean-500"}`}>
                            <span className="text-white text-[9px] font-black">{step.number}</span>
                          </div>
                          <div className="flex-1 md:pl-12 order-2 md:order-3">{content}</div>
                        </>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>

          <AnimatedSection delay={0.3} className="mt-14 text-center">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-0.5"
            >
              <CalendarDays className="w-4 h-4" />
              Kostenloses Erstgespräch buchen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── RECHNER ──────────────────────────────────────────────── */}
      <section id="beweis" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Calculator className="w-3.5 h-3.5" />
              Kosten-Rechner
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Was deine manuellen Abläufe wirklich kosten.
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Trag deine Zahlen ein und sieh, was pro Monat und pro Jahr in manuellen Abläufen
              steckt.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <KostenRechner />
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Über mich
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">Hinter der Welle.</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Swellsystems automatisiert Aufwand, den in einem Betrieb eigentlich niemand von Hand
              erledigen sollte.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative overflow-hidden min-h-[500px]">
                  <Image
                    src="/Hero_Bild_bearbeitet.png"
                    alt="Calvin Heim"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_15%]"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-2xl text-white leading-tight mb-1">Calvin Heim</h3>
                        <p className="text-ocean-300 text-sm">Gründer & Automation Engineer</p>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/calvin-heim/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 shrink-0"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Über mich</p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Ich baue automatisierte Systeme für Unternehmen: Workflows, digitale Agenten und
                    Datenflüsse, die zuverlässig im Hintergrund laufen. Angefangen habe ich damit in
                    der Kundengewinnung von B2B-Firmen.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    In den Gesprächen mit KMU und Agenturen kam immer dasselbe Muster zum Vorschein:
                    enorm viel Fleiss, aber kein System dahinter. Vertrieb, Onboarding und
                    Projektabwicklung hängen an Excel-Listen, Chats und dem Wissen einzelner Leute.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Genau da setze ich an. Nicht mit noch einer Software, sondern mit klaren
                    Prozessen, einer gemeinsamen Wissensbasis und Automatisierungen, die sich in das
                    einfügen, was du bereits nutzt.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "Erst messen, dann bauen", desc: "Jede Automatisierung folgt auf eine Ist-Aufnahme. Gebaut wird dort, wo der Hebel nachweislich am grössten ist." },
              { icon: FlaskConical, title: "Getestet, bevor es live geht", desc: "Alle Workflows laufen zuerst in einer Testumgebung. Erst wenn sie stabil sind, gehen sie ins Tagesgeschäft." },
              { icon: BarChart3, title: "Messbar statt Bauchgefühl", desc: "Dashboards zeigen Zeitersparnis, Durchlaufzeiten, Fehlerraten und Kapazität. Du siehst, was das System bringt." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-50 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ocean-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              FAQ
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Häufige Fragen</h2>
            <p className="text-slate-400 text-lg">Alles, was du wissen möchtest, bevor du dich meldest.</p>
          </AnimatedSection>

          <div className="divide-y divide-white/10">
            {faqs.map(({ q, a }, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group py-6 cursor-pointer list-none">
                  <summary className="flex items-start justify-between gap-6 text-white font-semibold text-base leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <span className="shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center mt-0.5 group-open:bg-ocean-500 group-open:border-ocean-500 transition-all duration-200">
                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-white fill-none stroke-current stroke-[1.5] group-open:rotate-45 transition-transform duration-200">
                        <path d="M5 1v8M1 5h8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-10 py-16 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)" }} />

              <div className="relative">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                  Kontakt
                </span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
                  Schau dir deine Abläufe an, bevor du die nächste Person einstellst.
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Wenn du ein Schweizer B2B-KMU oder eine Agentur führst und dich hier
                  wiedererkennst, ständig am Limit, laufend neue Leute, trotzdem bleibt vieles
                  manuell, dann liegt der nächste Hebel nicht bei mehr Personal, sondern bei deinen
                  Prozessen. Im Erstgespräch schauen wir gemeinsam an, wo deine Zeit hingeht und ob
                  sich eine Zusammenarbeit überhaupt lohnt.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-ocean-500 hover:bg-ocean-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-500/25 hover:-translate-y-0.5"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Kostenloses Erstgespräch buchen
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="mailto:calvin@swellsystems.ch"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    calvin@swellsystems.ch
                  </a>
                </div>

                <p className="mt-8 text-xs text-slate-600">Keine Verpflichtung. Kein Pitch. Nur ein ehrliches Gespräch.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
