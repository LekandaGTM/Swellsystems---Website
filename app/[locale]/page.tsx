"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Mail,
  ClipboardList,
  PenTool,
  FlaskConical,
  Rocket,
  RefreshCw,
  FileWarning,
  Users,
  FileStack,
  Linkedin,
  MessageSquare,
  Clock,
  StickyNote,
  Table2,
  Phone,
  AlertTriangle,
  Calculator,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const CAL_LINK = "https://cal.com/calvin-heim-swellsystems/30min";

function ChaosGraphic() {
  const notes: {
    icon: React.ElementType;
    title: string;
    sub: string;
    style: React.CSSProperties;
    rotate: string;
    accent: string;
    bg: string;
    border: string;
    width: string;
  }[] = [
    {
      icon: ClipboardList,
      title: "Rapport",
      sub: "Baustelle Meier, Mo 14:00",
      style: { top: "6%", left: "4%" },
      rotate: "-rotate-6",
      accent: "text-ocean-500",
      bg: "bg-ocean-50",
      border: "border-ocean-100",
      width: "w-[58%]",
    },
    {
      icon: Table2,
      title: "Rechnungen_2026.xlsx",
      sub: "47 Zeilen, keiner blickt durch",
      style: { top: "2%", right: "4%" },
      rotate: "rotate-5",
      accent: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
      width: "w-[58%]",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      sub: "Foto und Standort Baustelle",
      style: { top: "42%", left: "2%" },
      rotate: "-rotate-4",
      accent: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      width: "w-[56%]",
    },
    {
      icon: StickyNote,
      title: "Rechnung schreiben!",
      sub: "Klebt seit Dienstag am Bildschirm",
      style: { top: "48%", right: "2%" },
      rotate: "rotate-6",
      accent: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      width: "w-[54%]",
    },
    {
      icon: Clock,
      title: "22:14 Uhr",
      sub: "Noch im Büro, alle anderen zuhause",
      style: { bottom: "5%", left: "18%" },
      rotate: "-rotate-2",
      accent: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200",
      width: "w-[54%]",
    },
    {
      icon: Phone,
      title: "3 verpasste Anrufe",
      sub: "Herr Müller, Rückruf ausstehend",
      style: { top: "24%", left: "32%" },
      rotate: "rotate-3",
      accent: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
      width: "w-[50%]",
    },
    {
      icon: AlertTriangle,
      title: "Material bestellen!!",
      sub: "Dringend, bis Freitag",
      style: { bottom: "20%", right: "14%" },
      rotate: "-rotate-9",
      accent: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      width: "w-[50%]",
    },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-200 aspect-[4/5] bg-gradient-to-br from-slate-100 via-white to-slate-50">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute top-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)" }} />

      {notes.map(({ icon: Icon, title, sub, style, rotate, accent, bg, border, width }, i) => (
        <div
          key={i}
          className={`absolute ${width} ${rotate} bg-white border ${border} rounded-2xl p-4 shadow-lg shadow-slate-200/50`}
          style={style}
        >
          <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center mb-2`}>
            <Icon className={`w-4 h-4 ${accent}`} />
          </div>
          <p className="font-bold text-sm text-slate-900 leading-tight">{title}</p>
          <p className="text-xs text-slate-500 mt-1 leading-snug">{sub}</p>
        </div>
      ))}
    </div>
  );
}

const ARBEITSWOCHEN_PRO_JAHR = 46;

function fmtChf(n: number) {
  return n.toLocaleString("de-CH", { maximumFractionDigits: 0 });
}

const AUTOMATISIERUNGS_SZENARIEN = [
  { label: "Konservativ", value: 30 },
  { label: "Realistisch", value: 50 },
  { label: "Optimistisch", value: 70 },
];

function StatusQuoRechner() {
  const [stundensatz, setStundensatz] = useState(90);
  const [stundenProWoche, setStundenProWoche] = useState(12);
  const [szenarioIndex, setSzenarioIndex] = useState(1);

  const automatisierungsgrad = AUTOMATISIERUNGS_SZENARIEN[szenarioIndex].value;
  const ersparnisStundenProWoche = stundenProWoche * (automatisierungsgrad / 100);
  const ersparnisChfProWoche = ersparnisStundenProWoche * stundensatz;
  const ersparnisChfProJahr = ersparnisChfProWoche * ARBEITSWOCHEN_PRO_JAHR;
  const ersparnisStundenProJahr = ersparnisStundenProWoche * ARBEITSWOCHEN_PRO_JAHR;
  const ersparnisTageProJahr = ersparnisStundenProJahr / 8;

  const sliders = [
    {
      label: "Dein Stundensatz",
      value: stundensatz,
      display: `CHF ${stundensatz}.-/Std.`,
      min: 50,
      max: 200,
      step: 5,
      onChange: setStundensatz,
    },
    {
      label: "Büroarbeit pro Woche",
      value: stundenProWoche,
      display: `${stundenProWoche} Std.`,
      min: 1,
      max: 40,
      step: 1,
      onChange: setStundenProWoche,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="space-y-8">
          {sliders.map(({ label, value, display, min, max, step, onChange }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-700">{label}</label>
                <span className="text-sm font-bold text-ocean-600">{display}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-ocean-500"
              />
            </div>
          ))}

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700">Automatisierungspotenzial</label>
              <span className="text-sm font-bold text-ocean-600">{automatisierungsgrad}%</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {AUTOMATISIERUNGS_SZENARIEN.map(({ label }, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSzenarioIndex(i)}
                  className={`text-xs font-semibold py-2.5 rounded-xl border transition-colors ${
                    i === szenarioIndex
                      ? "bg-ocean-600 border-ocean-600 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-ocean-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Wie viel sich davon wirklich automatisieren lässt, weisst du vorab kaum. Diese Werte basieren auf
              Erfahrung aus ähnlichen Betrieben, dein genaues Potenzial klären wir in der Analyse.
            </p>
          </div>
        </div>

        <div className="relative bg-slate-900 rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)" }} />
          <div className="relative">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Deine mögliche Ersparnis</p>
            <p className="font-display font-bold text-4xl md:text-5xl text-white mb-1">CHF {fmtChf(ersparnisChfProJahr)}.-</p>
            <p className="text-slate-400 text-sm mb-6">pro Jahr</p>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="font-display font-bold text-2xl text-white">{ersparnisStundenProWoche.toFixed(1)} Std.</p>
                <p className="text-xs text-slate-400 mt-1">gesparte Zeit pro Woche</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-white">{ersparnisTageProJahr.toFixed(1)} Tage</p>
                <p className="text-xs text-slate-400 mt-1">gesparte Arbeitstage pro Jahr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HandwerkPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const stats = [
    { value: "Mehr Zeit", label: "für Aufträge oder Familie" },
    { value: "Ab Tag 1", label: "erste Resultate" },
    { value: "Keine", label: "technischen Kenntnisse nötig für Resultate" },
  ];

  const mechanismSteps = [
    {
      number: "01",
      week: "Schritt 1",
      phase: "Analyse",
      icon: ClipboardList,
      title: "Analyse des Admin-Aufwands",
      desc: "Wir erfassen gemeinsam, wo aktuell Zeit verbrennt (Rapporte, Offerten, Rechnungen, Telefon, Nachfassen) und wie viele Stunden pro Woche dich das kostet.",
      tags: ["Zeit-Audit", "Ist-Prozess aufnehmen"],
      effort: "Ein gemeinsames Gespräch über deinen Alltag im Büro",
      dark: false,
    },
    {
      number: "02",
      week: "Schritt 2",
      phase: "Planung",
      icon: PenTool,
      title: "Planung deines Automatisierungs-Systems",
      desc: "Auf Basis der Analyse planen wir ein System, das sich nahtlos in deine bestehenden Programme und Abläufe einfügt und genau diese Zeitfresser eliminiert.",
      tags: ["System-Design", "Passt zu deinen bestehenden Tools"],
      effort: "Kurzes Feedback zum geplanten Ablauf",
      dark: false,
    },
    {
      number: "03",
      week: "Schritt 3",
      phase: "Umsetzung & Test",
      icon: FlaskConical,
      title: "Umsetzung & Test (offline)",
      desc: "Wir richten die Automatisierungen und digitalen Agenten ein und testen sie zunächst im Hintergrund, bevor sie in dein Tagesgeschäft gehen. So läuft ab Tag 1 alles zuverlässig.",
      tags: ["Automatisierungen bauen", "Agenten einrichten", "Test im Hintergrund"],
      effort: "Keiner: Wir bauen und testen im Hintergrund",
      dark: false,
    },
    {
      number: "04",
      week: "Schritt 4",
      phase: "Rollout",
      icon: Rocket,
      title: "Implementierung ins Daily Business",
      desc: "Die getesteten Automatisierungen werden in deinen Alltag integriert. Du und dein Team erhaltet einfache, verständliche Anleitungen für die wenigen manuellen Schritte, die noch nötig sind.",
      tags: ["Rollout", "Team-Anleitung"],
      effort: "Kurze Einführung fürs Team (~30 Min.)",
      dark: false,
    },
    {
      number: "05",
      week: "Ab jetzt laufend",
      phase: "Wartung & Optimierung",
      icon: RefreshCw,
      title: "Wartung & laufende Optimierung",
      desc: "Wir überwachen das System, erstellen regelmässige Reports und passen Automatisierungen sowie Agenten bei Bedarf an, damit deine Zeitersparnis stabil bleibt oder weiter steigt, auch wenn dein Betrieb wächst.",
      tags: ["Monitoring", "Reports", "Laufende Anpassung"],
      effort: "Reports checken, bei Bedarf Feedback geben",
      dark: true,
    },
  ];

  const faqs = [
    {
      q: "Muss ich meine bestehende Software wechseln?",
      a: "Nein. Das System wird so gebaut, dass es sich in deine bestehenden Programme einfügt, egal ob Excel, Bexio, Abacus oder ein anderes Tool. Wir ersetzen nicht, wir automatisieren das, was heute von Hand passiert.",
    },
    {
      q: "Was, wenn mein Team nicht technikaffin ist?",
      a: "Das ist der Normalfall, nicht die Ausnahme. Deshalb testen wir alles zuerst offline im Hintergrund, bevor irgendetwas live geht. Du und dein Team erhaltet danach einfache, verständliche Anleitungen für die wenigen Schritte, die noch manuell bleiben.",
    },
    {
      q: "Wie schnell sehe ich Resultate?",
      a: "Das hängt davon ab, wie viel administrativer Aufwand aktuell bei dir anfällt. Nach der Analyse in Schritt 1 weisst du konkret, wie viele Stunden realistisch eingespart werden können und wie lange die Umsetzung dauert, bevor überhaupt etwas gebaut wird.",
    },
    {
      q: "Was kostet die Zusammenarbeit?",
      a: "Das hängt vom Umfang deines administrativen Aufwands und der Grösse deines Betriebs ab, daher gibt es keinen Einheitspreis. Die erste Analyse ist unverbindlich. Erst danach bekommst du ein klares Angebot, ohne versteckte Kosten.",
    },
    {
      q: "Für welche Gewerke eignet sich das?",
      a: "Grundsätzlich für jeden Handwerksbetrieb mit viel administrativem Aufwand neben der eigentlichen Arbeit, zum Beispiel Elektro, Sanitär, Schreinerei, Maler, Gartenbau oder Bau. Wichtig ist nur, dass es wiederkehrende Abläufe wie Rapporte, Offerten oder Rechnungen gibt, die wir automatisieren können.",
    },
    {
      q: "Ersetzt das meine Bürokraft oder Buchhaltung?",
      a: "Nein, es entlastet sie. Das System übernimmt die repetitive Fleissarbeit: Übertragen, Sortieren, Nachtragen. So bleibt mehr Zeit für die Aufgaben, die wirklich Aufmerksamkeit brauchen.",
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
              KI-Automatisierung für Handwerkliche Betriebe
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.15]">
              Automatisierungen und KI-Agenten, die deine Büroarbeit
            </h1>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] gradient-text pb-1">
              für dich erledigen.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed"
          >
            Durch unsere Automatisierungen und KI-Agenten sparen handwerkliche Betriebe im Schnitt 10+ Stunden
            manueller Büroarbeit pro Woche.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-1"
            >
              Kostenloses Analysegespräch buchen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scrollTo("mechanismus")}
              className="flex items-center gap-2 border border-slate-300 hover:border-ocean-400 text-slate-700 hover:text-ocean-700 font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              So funktioniert's
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="grid grid-cols-3 gap-6 max-w-xl mx-auto pb-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-ocean-600">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none -mt-2">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q180 10 360 40 Q540 70 720 40 Q900 10 1080 40 Q1260 70 1440 40 L1440 80 L0 80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── PROBLEM / ANTI-THESE ────────────────────────────────── */}
      <section id="problem" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                Realität
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
                Warum manuelle
                <br />
                Büroarbeit automatisiert
                <br />
                werden muss.
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Während du an den Aufträgen deiner Kunden dran bist, passiert in deinem Büro nicht viel. Die
                  ganze Büroarbeit erledigst du nach der Arbeit, wenn du eigentlich lieber Feierabend machen
                  würdest, oder deine Bürokraft kommt nicht mehr nach, weil sie alles aus Excel-Listen und
                  handnotierten Zetteln zusammentragen muss. Ein System, das am Anfang noch funktioniert hat, ist
                  heute dein grösstes Hindernis.
                </p>
                <p>
                  Genau dieses System ist dafür verantwortlich, dass du keine neuen Aufträge mehr annehmen kannst
                  und viel Zeit mit Büroarbeit verschwendest. Einfach, weil keine Struktur oder Automatisierung
                  vorhanden ist, die das alles für dich erledigt, während du an Projekten arbeitest.
                </p>
                <p>
                  Jeder zusätzliche Auftrag bringt mehr Zettel, mehr Excel-Zeilen und mehr Nachfassen, aber nicht
                  automatisch mehr Gewinn. Du arbeitest mehr, ohne dass am Ende mehr für dich, deine Familie oder
                  deinen Betrieb übrig bleibt. Und das Paradoxe daran: Je besser dein Betrieb läuft, desto stärker
                  bremst dich genau dieses System aus.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <ChaosGraphic />
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

      {/* ─── DIAGNOSE ─────────────────────────────────────────────── */}
      <section id="diagnose" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Die Diagnose
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Das Problem ist nicht dein Fleiss. Es ist dein System.
            </h2>
            <p className="text-slate-600 text-lg max-w-4xl mx-auto">
              Der gesamte administrative Bereich deines Betriebs ist weder strukturiert noch systematisiert. Alles
              hängt an Personen, Zetteln und einzelnen Excel-Listen, statt an einem klaren, durchgängigen Prozess.
              Solange jede Info von Hand übertragen, sortiert und nachgetragen werden muss, wächst dein
              Büroaufwand 1:1 mit jedem neuen Auftrag, ganz egal, wie fleissig du abends noch „aufräumst".
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Users, title: "Alles hängt an Personen", desc: "Wissen steckt im Kopf einzelner Mitarbeiter. Fällt jemand aus oder wechselt, geht Struktur verloren." },
              { icon: FileStack, title: "Alles hängt an Zetteln", desc: "Rapporte, Notizen, Lieferscheine: Infos gehen unter, werden doppelt erfasst oder gar nicht." },
              { icon: FileWarning, title: "Aufwand wächst mit jedem Auftrag", desc: "Mehr Aufträge heissen mehr Handarbeit im Büro, nicht weniger. Das System skaliert nicht mit." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ocean-500" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="mt-6">
            <p className="text-center text-slate-500 text-sm max-w-xl mx-auto">
              Die Folge: Du arbeitest viel, aber Gewinn, Zeit für weitere Aufträge und Zeit mit deiner Familie
              bleiben auf dem Schreibtisch liegen.
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

      {/* ─── MECHANISMUS ──────────────────────────────────────────── */}
      <section id="mechanismus" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Der Prozess
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              In 5 Schritten zum automatisierten Backoffice
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Kein fixfertiges Tool von der Stange, sondern ein System, das zu deinem Betrieb passt und sich in
              deine bestehenden Abläufe einfügt.
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
              Kostenloses Analysegespräch buchen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>

      {/* ─── STATUS-QUO-RECHNER ──────────────────────────────────── */}
      <section id="beweis" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Calculator className="w-3.5 h-3.5" />
              Status-quo-Rechner
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Was dein aktuelles System dich wirklich kostet.
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Trag deine Zahlen ein und sieh in Echtzeit, wie viel Zeit und Geld realistisch drinliegen.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <StatusQuoRechner />
          </AnimatedSection>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 scroll-mt-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Über mich
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">Hinter der Welle.</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Swellsystems hilft Unternehmen dabei, Aufwand zu automatisieren, der eigentlich niemand von Hand
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
                    Ich baue automatisierte Systeme für Unternehmen, ursprünglich für die Kundengewinnung von
                    B2B-Firmen: Workflows, digitale Agenten und Datenflüsse, die zuverlässig im Hintergrund laufen.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Bei Gesprächen mit Handwerksbetrieben fiel mir dasselbe Muster auf, das ich auch aus dem
                    B2B-Vertrieb kenne: enorm viel Fleiss, aber kein System dahinter. Alles läuft über Zettel,
                    Excel und den Kopf einzelner Mitarbeiter.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Genau da setze ich an: nicht mit einer neuen, komplizierten Software, sondern mit einem System,
                    das sich in das einfügt, was du schon hast, und dir jede Woche Stunden zurückgibt.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🧩", title: "Passt sich an dich an", desc: "Kein 0815-Tool von der Stange. Das System wird um deine bestehenden Abläufe herum gebaut, nicht umgekehrt." },
              { icon: "🧪", title: "Getestet, bevor es live geht", desc: "Alles läuft zuerst offline im Hintergrund. Erst wenn es zuverlässig funktioniert, geht es in dein Tagesgeschäft." },
              { icon: "🌊", title: "Läuft weiter, auch wenn du wächst", desc: "Laufende Wartung und Optimierung sorgen dafür, dass deine Zeitersparnis stabil bleibt oder weiter steigt." },
            ].map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-50 transition-all duration-300 h-full">
                  <div className="text-3xl mb-4">{icon}</div>
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
                  Bereit, deinen Admin-Aufwand loszuwerden?
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Wenn du deinen Betrieb endlich vom Büro-Chaos befreien willst, damit du stabil wachsen kannst und
                  wieder mehr Zeit für Aufträge und deine Familie hast, statt abends Rechnungen zu schreiben und
                  Excel-Listen zu pflegen, dann melde dich. Wir schauen uns gemeinsam deine aktuelle Situation an
                  und prüfen, ob und wie wir deinen administrativen Aufwand um mehrere Stunden pro Woche senken
                  können.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-ocean-500 hover:bg-ocean-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-500/25 hover:-translate-y-0.5"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Kostenloses Analysegespräch buchen
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
