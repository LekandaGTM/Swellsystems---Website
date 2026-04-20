"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { siHubspot, siN8n, siAnthropic } from "simple-icons";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Mail,
  Send,
  CheckCircle2,
  Target,
  Database,
  Zap,
  TrendingUp,
  Linkedin,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

type Tool = { name: string; domain?: string; siIcon?: { hex: string; path: string }; color: string };

function ToolLogo({ tool, dark = false }: { tool: Tool; dark?: boolean }) {
  const bg = dark ? "rgba(255,255,255,0.1)" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)";

  const wrapper = (children: React.ReactNode) => (
    <div className="flex flex-col items-center gap-1" suppressHydrationWarning>
      <span
        className="flex items-center justify-center w-9 h-9 rounded-xl shadow-sm"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        {children}
      </span>
      <span className="text-[9px] font-semibold whitespace-nowrap" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#64748b" }}>
        {tool.name}
      </span>
    </div>
  );

  if (tool.siIcon) {
    return wrapper(
      <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: dark ? "#fff" : `#${tool.siIcon.hex}` }}>
        <path d={tool.siIcon.path} />
      </svg>
    );
  }
  if (tool.domain) {
    return wrapper(
      <img
        src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
        alt={tool.name}
        className="w-5 h-5 object-contain rounded"
        suppressHydrationWarning
      />
    );
  }
  return wrapper(
    <span style={{ fontSize: 11, fontWeight: 700, color: dark ? "#fff" : tool.color }}>
      {tool.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function HomePage() {
  const t = useTranslations();
  const { locale } = useParams() as { locale: string };
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const stats = [
    { value: t("home.stat1Value"), label: t("home.stat1Label") },
    { value: t("home.stat2Value"), label: t("home.stat2Label") },
    { value: t("home.stat3Value"), label: t("home.stat3Label") },
  ];

  const steps = [
    { key: "step1", number: "01", orange: false },
    { key: "step2", number: "02", orange: false },
    { key: "step3", number: "03", orange: false },
    { key: "step4", number: "04", orange: true },
  ];

  const cases = [
    { key: "case1", gradient: "from-ocean-500 to-ocean-700", tagBg: "bg-ocean-50" },
    { key: "case2", gradient: "from-ocean-700 to-slate-800", tagBg: "bg-slate-50" },
    { key: "case3", gradient: "from-orange-400 to-orange-600", tagBg: "bg-orange-50" },
  ];

  const values = [
    { key: "value1", icon: "🎯" },
    { key: "value2", icon: "💡" },
    { key: "value3", icon: "🌊" },
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
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 animate-pulse" />
              {t("home.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-2">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.15] whitespace-nowrap">
              {t("home.headline")}
            </h1>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] gradient-text pb-1">
              {t("home.headlineAccent")}
            </h1>
          </motion.div>

          {/* VSL Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-ocean-200/40 border border-slate-200/60 bg-slate-900">
              <video
                src="/videos/Swellsystems_GTM.mp4"
                controls
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.open("https://calendar.app.google/N7b7tNRhtYcueKWM7", "_blank")}
              className="group flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-1"
            >
              {t("home.ctaPrimary")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="flex items-center gap-2 border border-slate-300 hover:border-ocean-400 text-slate-700 hover:text-ocean-700 font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              {t("home.ctaSecondary")}
            </button>
          </motion.div>

          {/* Stats */}
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

      {/* ─── CLIENT LOGOS ─────────────────────────────────────────── */}
      <section className="bg-slate-50 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Unternehmen, mit denen wir gearbeitet haben
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="h-14 px-6 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <img
                src="/urtec-logo.webp"
                alt="URtec"
                className="h-8 w-auto object-contain"
                style={{ filter: "grayscale(100%) brightness(0.4)" }}
              />
            </div>
            <div className="h-14 px-6 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <img
                src="/ecomone-logo.png"
                alt="EcomOne"
                className="h-8 w-auto object-contain"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────── */}
      <section id="services" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("services.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("services.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("services.subheadline")}</p>
          </AnimatedSection>

          {/* ── The System — Research als Foundation-Bar ── */}
          {(() => {
            type FlowStep = { icon: React.ElementType; label: string; desc: string; bg: string; border: string; iconColor: string; num: string; tools: Tool[] };
            const stepsB: FlowStep[] = [
              { icon: Target,       label: "Zielgruppe",      desc: "TAM aufbauen & ICP schärfen",    bg: "bg-orange-50",  border: "border-orange-200",  iconColor: "text-orange-500",  num: "01", tools: [{ name: "Apify", domain: "apify.com", color: "#00B4A2" }, { name: "AI Ark", domain: "theaiark.com", color: "#3B35E8" }] },
              { icon: Database,     label: "Daten",           desc: "Anreichern & verifizieren",      bg: "bg-violet-50",  border: "border-violet-200",  iconColor: "text-violet-500",  num: "02", tools: [{ name: "Clay", domain: "clay.com", color: "#FF6B2B" }] },
              { icon: Bot,          label: "KI & Automation", desc: "Personalisierung & Workflows",   bg: "bg-sky-50",     border: "border-sky-200",     iconColor: "text-sky-500",     num: "03", tools: [{ name: "Claude", siIcon: siAnthropic, color: "#D97757" }, { name: "n8n", siIcon: siN8n, color: "#EA4B71" }, { name: "Slack", domain: "slack.com", color: "#4A154B" }] },
              { icon: Mail,         label: "Outbound",        desc: "E-Mail & LinkedIn",              bg: "bg-ocean-50",   border: "border-ocean-200",   iconColor: "text-ocean-500",   num: "04", tools: [{ name: "HeyReach", domain: "heyreach.io", color: "#0EA5E9" }, { name: "Smartlead", domain: "smartlead.ai", color: "#4F46E5" }] },
              { icon: CalendarDays, label: "Gespräch",        desc: "Qualifizierter Termin gebucht",  bg: "bg-emerald-50", border: "border-emerald-200", iconColor: "text-emerald-500", num: "05", tools: [] },
            ];
            return (
              <div className="space-y-6">
                <AnimatedSection>
                  <div className="relative bg-white border border-slate-200 rounded-3xl p-8 md:p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean-50/40 to-transparent pointer-events-none" />
                    <div className="relative space-y-6">
                      {/* Foundation bar */}
                      <div className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white">Tiefenrecherche</div>
                            <div className="text-xs text-slate-400">Dein Unternehmen, deine Wettbewerber & ICP — bevor wir einen einzigen Kontakt ansprechen</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5" />
                      </div>

                      {/* Arrow down */}
                      <div className="flex justify-center">
                        <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                      </div>

                      {/* 5-step flow */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-ocean-600">Das System</span>
                          <div className="h-px flex-1 bg-slate-200" />
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Gebuchte Erstgespräche</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
                          {stepsB.map(({ icon: Icon, label, desc, bg, border, iconColor, num, tools }, i, arr) => (
                            <div key={i} className="flex md:flex-1 flex-col md:flex-row items-center">
                              <div className={`w-full rounded-2xl p-4 border ${bg} ${border} flex flex-col gap-2.5`}>
                                <div className="flex items-center justify-between">
                                  <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
                                    <Icon className={`w-4 h-4 ${iconColor}`} />
                                  </div>
                                  <span className={`text-xs font-bold ${iconColor} opacity-30`}>{num}</span>
                                </div>
                                <div>
                                  <div className="font-bold text-sm text-slate-900 leading-tight">{label}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                                </div>
                                {tools.length > 0 && (
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {tools.map((tool) => (
                                      <ToolLogo key={tool.name} tool={tool} />
                                    ))}
                                  </div>
                                )}
                              </div>
                              {i < arr.length - 1 && (
                                <div className="flex items-center justify-center md:px-2 py-1.5 md:py-0 shrink-0">
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 rotate-90 md:rotate-0" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-5">* Je nach Projekt und Kundenanforderungen setzen wir weitere Tools ein.</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            );
          })()}

          {/* 3 outcome cards — shared */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {[
              { icon: Target,     title: "Max. 4 Kunden gleichzeitig",  desc: "Dein Projekt bekommt volle Aufmerksamkeit — nicht ein Bruchteil davon. Ich arbeite mit wenigen, dafür richtig.", bg: "bg-ocean-50",  iconColor: "text-ocean-500"  },
              { icon: CheckCircle2, title: "Persönliche Betreuung",      desc: "Kein Account Manager, kein Ticket-System. Du arbeitest direkt mit mir — der Person, die dein System baut und optimiert.", bg: "bg-orange-50", iconColor: "text-orange-500" },
              { icon: Zap,          title: "Das System gehört dir",     desc: "Nach dem Projekt läuft alles weiter — in deinem Namen, mit deinen Tools. Keine Abhängigkeit von mir.", bg: "bg-violet-50", iconColor: "text-violet-500" },
            ].map(({ icon: Icon, title, desc, bg, iconColor }, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* ––– old bento kept below for reference — REMOVED ––– */}
          <div className="hidden">
            {/* Email Outbound — wide card with mock inbox */}
            <AnimatedSection delay={0} className="lg:col-span-2">
              <div className="group relative bg-white border border-slate-200 rounded-3xl p-8 overflow-hidden hover:border-ocean-200 hover:shadow-2xl hover:shadow-ocean-100/30 transition-all duration-500 h-full">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-ocean-100/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-ocean-50 border border-ocean-100 flex items-center justify-center shrink-0 group-hover:bg-ocean-100 transition-colors">
                      <Mail className="w-7 h-7 text-ocean-600" />
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      <span className="text-xs font-medium bg-ocean-50 text-ocean-700 border border-ocean-100 px-3 py-1 rounded-full">Cold Email</span>
                      <span className="text-xs font-medium bg-ocean-50 text-ocean-700 border border-ocean-100 px-3 py-1 rounded-full">LinkedIn</span>
                      <span className="text-xs font-medium bg-ocean-50 text-ocean-700 border border-ocean-100 px-3 py-1 rounded-full">Deliverability</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">{t("services.service1Title")}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{t("services.service1Desc")}</p>

                  {/* Mock inbox widget */}
                  <div className="mt-auto rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                      <div className="ml-3 h-1.5 w-28 bg-slate-300 rounded-full" />
                    </div>
                    <div className="bg-white p-3 space-y-1.5">
                      {[
                        { avatar: "bg-ocean-300", active: false, nameW: "w-24", lineW: "w-4/5" },
                        { avatar: "bg-emerald-300", active: true,  nameW: "w-20", lineW: "w-3/5" },
                        { avatar: "bg-slate-300",   active: false, nameW: "w-28", lineW: "w-2/3" },
                      ].map((row, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${row.active ? "bg-ocean-50 border border-ocean-100" : ""}`}>
                          <div className={`w-7 h-7 rounded-full shrink-0 ${row.avatar}`} />
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className={`h-1.5 ${row.nameW} bg-slate-300 rounded-full`} />
                              <div className="h-1.5 w-8 bg-slate-200 rounded-full ml-auto" />
                            </div>
                            <div className={`h-1.5 ${row.lineW} ${row.active ? "bg-ocean-200" : "bg-slate-200"} rounded-full`} />
                          </div>
                          {row.active && <div className="w-2 h-2 rounded-full bg-ocean-500 shrink-0" />}
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-xs text-slate-500">42% open rate</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-ocean-400" />
                        <span className="text-xs text-slate-500">8.3% reply rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* AI Agents — dark featured card */}
            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div
                className="relative rounded-3xl p-8 overflow-hidden h-full min-h-[320px]"
                style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0f172a 100%)" }}
              >
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Glow orbs */}
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }} />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Bot className="w-7 h-7 text-white" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ocean-900 animate-pulse" />
                    </div>
                    <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1.5 rounded-full shrink-0">AI-Powered</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">{t("services.service5Title")}</h3>
                  <p className="text-ocean-200 text-sm leading-relaxed">{t("services.service5Desc")}</p>
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-end justify-between">
                    <div>
                      <div className="font-display font-bold text-5xl text-white leading-none tracking-tight">10x</div>
                      <div className="text-ocean-300 text-xs mt-1.5">{t("services.service5Stat" as any)}</div>
                    </div>
                    <div className="flex gap-1.5 pb-1">
                      {[0, 200, 400].map((delay) => (
                        <div key={delay} className="w-2 h-2 rounded-full bg-ocean-400 animate-pulse" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* List Building */}
            <AnimatedSection delay={0.15}>
              <div className="group bg-white border border-slate-200 rounded-3xl p-7 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
                  <Target className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2.5 group-hover:text-orange-700 transition-colors">{t("services.service2Title")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t("services.service2Desc")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full">TAM Buildout</span>
                  <span className="text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-full">ICP Targeting</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Data Enrichment */}
            <AnimatedSection delay={0.2}>
              <div className="group bg-white border border-slate-200 rounded-3xl p-7 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-violet-100 transition-colors">
                  <Database className="w-6 h-6 text-violet-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2.5 group-hover:text-violet-700 transition-colors">{t("services.service3Title")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t("services.service3Desc")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-1 rounded-full">Clay</span>
                  <span className="text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-1 rounded-full">Apollo</span>
                  <span className="text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-1 rounded-full">{t("services.service3Tag" as any)}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Automations */}
            <AnimatedSection delay={0.25}>
              <div className="group bg-white border border-slate-200 rounded-3xl p-7 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">{t("services.service4Title")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t("services.service4Desc")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full">Multi-Step</span>
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full">CRM Sync</span>
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full">Trigger-Based</span>
                </div>
              </div>
            </AnimatedSection>

          </div>{/* end hidden old bento */}
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>


      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("howItWorks.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">Was dich erwartet</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Von der ersten Unterhaltung bis zu gebuchten Gesprächen — so sieht die Zusammenarbeit aus deiner Perspektive aus.</p>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            <div className="relative">
            {/* Vertical connector line — scoped to steps only */}
            <div className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-ocean-200 via-ocean-300 to-orange-300 hidden sm:block md:-translate-x-px" />

            <div className="space-y-8">

              {/* Step 01 */}
              <AnimatedSection delay={0} direction="left">
                <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-0">
                  {/* Left content */}
                  <div className="flex-1 md:pr-12 md:text-right order-2 md:order-1">
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-ocean-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                        <span className="text-xs font-bold bg-ocean-50 text-ocean-600 border border-ocean-200 px-3 py-1 rounded-full">Woche 0</span>
                        <span className="text-xs text-slate-400 font-medium">Onboarding</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Ich lerne dein Business kennen.</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">Im Onboarding tauchen wir gemeinsam tief in dein Business ein — dein ICP, dein Wettbewerb, deine Zielkunden und deine bisherigen Erfahrungen mit Outbound. Das ist die Grundlage für alles, was danach kommt.</p>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {["ICP-Workshop", "Wettbewerbsanalyse", "Zielgruppendefinition"].map(tag => (
                          <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 md:justify-end text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span><span className="font-semibold text-slate-600">Dein Aufwand:</span> Onboarding-Prozess gemeinsam durchlaufen</span>
                      </div>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex shrink-0 w-7 h-7 rounded-full bg-ocean-500 border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2">
                    <span className="text-white text-[9px] font-black">01</span>
                  </div>
                  {/* Right — empty spacer */}
                  <div className="hidden md:block flex-1 md:pl-12 order-3" />
                </div>
              </AnimatedSection>

              {/* Step 02 */}
              <AnimatedSection delay={0.1} direction="right">
                <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-0">
                  {/* Left — empty spacer */}
                  <div className="hidden md:block flex-1 md:pr-12 order-1" />
                  {/* Center dot */}
                  <div className="hidden md:flex shrink-0 w-7 h-7 rounded-full bg-ocean-500 border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2">
                    <span className="text-white text-[9px] font-black">02</span>
                  </div>
                  {/* Right content */}
                  <div className="flex-1 md:pl-12 order-2 md:order-3">
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-ocean-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold bg-ocean-50 text-ocean-600 border border-ocean-200 px-3 py-1 rounded-full">Woche 1–3</span>
                        <span className="text-xs text-slate-400 font-medium">Aufbau & Live</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Wir bauen. Du wartest nicht lange.</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">Während du dein Tagesgeschäft führst, baue ich deine komplette Outbound-Infrastruktur auf — Kontaktlisten, Sequenzen, technisches Setup. In Woche 3 geht das System live. Du erhältst die fertigen Texte zur einmaligen Freigabe.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Verifizierte Kontaktliste", "E-Mail-Sequenzen", "Domain-Warmup", "CRM-Integration"].map(tag => (
                          <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span><span className="font-semibold text-slate-600">Dein Aufwand:</span> Texte einmal reviewen (~30 Min.)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Step 03 */}
              <AnimatedSection delay={0.15} direction="left">
                <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-0">
                  {/* Left content */}
                  <div className="flex-1 md:pr-12 md:text-right order-2 md:order-1">
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-ocean-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4 md:flex-row-reverse">
                        <span className="text-xs font-bold bg-ocean-50 text-ocean-600 border border-ocean-200 px-3 py-1 rounded-full">Ab Woche 3</span>
                        <span className="text-xs text-slate-400 font-medium">Erste Ergebnisse</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Erste Antworten landen in deinem Postfach.</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">Das System ist live und arbeitet für dich. Qualifizierte Interessenten antworten direkt in dein Postfach — kein Tool-Login, kein Dashboard. Du erhältst jede Woche einen klaren Report: was läuft, was wir optimieren.</p>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {["Wöchentlicher Report", "A/B-Testing", "Laufende Optimierung"].map(tag => (
                          <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 md:justify-end text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span><span className="font-semibold text-slate-600">Dein Aufwand:</span> Interessenten-Replies beantworten</span>
                      </div>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex shrink-0 w-7 h-7 rounded-full bg-ocean-500 border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2">
                    <span className="text-white text-[9px] font-black">03</span>
                  </div>
                  <div className="hidden md:block flex-1 md:pl-12 order-3" />
                </div>
              </AnimatedSection>

              {/* Step 04 */}
              <AnimatedSection delay={0.2} direction="right">
                <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-0">
                  <div className="hidden md:block flex-1 md:pr-12 order-1" />
                  {/* Center dot — orange */}
                  <div className="hidden md:flex shrink-0 w-7 h-7 rounded-full bg-orange-500 border-4 border-white shadow-lg items-center justify-center z-10 mt-8 order-2">
                    <span className="text-white text-[9px] font-black">04</span>
                  </div>
                  {/* Right content — dark */}
                  <div className="flex-1 md:pl-12 order-2 md:order-3">
                    <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-7 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }} />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full">Ab Monat 2</span>
                          <span className="text-xs text-slate-500 font-medium">Skalierung</span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-2">Du führst Gespräche. Wir füllen die Pipeline weiter.</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">Während du die ersten Deals abschliesst, skalieren wir das System — neue Segmente, LinkedIn parallel zu E-Mail, erweiterte Zielgruppen. Dein Outbound läuft auf Autopilot, du konzentrierst dich auf den Abschluss.</p>
                        <div className="flex flex-wrap gap-2">
                          {["LinkedIn-Outbound", "Neue Segmente"].map(tag => (
                            <span key={tag} className="text-xs bg-white/10 text-slate-300 px-2.5 py-1 rounded-full">{tag}</span>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          <span><span className="font-semibold text-slate-300">Dein Aufwand:</span> Gespräche führen & Deals abschliessen</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

            </div>
            </div>

            {/* Weekly call banner */}
            <AnimatedSection delay={0.25}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 bg-ocean-50 border border-ocean-200 rounded-2xl px-7 py-5">
                  <div className="w-9 h-9 rounded-xl bg-ocean-100 border border-ocean-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarDays className="w-4 h-4 text-ocean-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Wöchentlicher Call</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Jede Woche, 30 Minuten — wir besprechen was läuft, was optimiert wird und was du dir wünschst. So stellt niemand das Gefühl, nicht auf dem Stand zu sein, und wir erzielen gemeinsam die besten Ergebnisse.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-ocean-50 border border-ocean-200 rounded-2xl px-7 py-5">
                  <div className="w-9 h-9 rounded-xl bg-ocean-100 border border-ocean-200 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-ocean-600" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Gemeinsamer Slack-Channel</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Alles Wichtige wird auch schriftlich festgehalten — was gemacht wurde, was als nächstes kommt. Du kannst jederzeit Fragen stellen, ohne auf den nächsten Call warten zu müssen.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

          {/* CTA after How It Works */}
          <AnimatedSection delay={0.3} className="mt-14 text-center">
            <a
              href="https://calendar.app.google/N7b7tNRhtYcueKWM7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-0.5"
            >
              <CalendarDays className="w-4 h-4" />
              System kennenlernen
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

      {/* ─── CASE STUDIES ─────────────────────────────────────────── */}
      <section id="case-studies" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Resultate
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">Die Zahlen sprechen für sich.</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Erste Referenzen entstehen gerade. Was ich zeigen kann: die Systeme und Resultate aus laufenden Projekten — anonym, aber real.
            </p>
          </AnimatedSection>

          {/* Stats row */}
          <AnimatedSection className="mb-12">
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "13", label: "Neue Pipeline-Gespräche in 30 Tagen", sub: "Agentur-Kunde, Schweiz" },
                { value: "26%", label: "Positive Rate auf Antworten", sub: "Beste Kampagne" },
                { value: "4", label: "Abgeschlossene Kampagnen", sub: "Vollautomatisiert" },
              ].map(({ value, label, sub }) => (
                <div key={label} className="bg-white border border-slate-100 rounded-2xl p-6 text-center flex flex-col justify-between">
                  <p className="font-display font-bold text-4xl text-ocean-600 mb-2">{value}</p>
                  <p className="text-slate-700 text-sm font-semibold mb-1">{label}</p>
                  <p className="text-slate-400 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Screenshots */}
          <div className="space-y-6 mb-14">
            <AnimatedSection delay={0.1}>
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-shadow duration-300">
                <div className="bg-gradient-to-r from-ocean-500 to-ocean-700 px-6 py-4 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/80" />
                  <p className="text-white text-sm font-semibold">Kampagnen-Resultate — Smartlead</p>
                </div>
                <div className="p-6">
                  <Image
                    src="/smartlead-kampagne-resultate-outbound-schweiz.png"
                    alt="Smartlead Kampagnen Resultate – Reply Rates und positive Antworten aus B2B Outbound Kampagnen"
                    width={1400}
                    height={600}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
                <div className="px-6 pb-6">
                  <p className="text-slate-500 text-sm">4 abgeschlossene Kampagnen — bis zu 12.6% Reply Rate und 26% positive Rate auf Antworten. Branchendurchschnitt liegt bei 2–3%.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-shadow duration-300">
                <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 flex items-center gap-3">
                  <Database className="w-4 h-4 text-white/80" />
                  <p className="text-white text-sm font-semibold">Enrichment-Workflow — Clay</p>
                </div>
                <div className="p-6">
                  <Image
                    src="/clay-enrichment-workflow-outbound-dach.png"
                    alt="Clay Enrichment Workflow für B2B Outbound im DACH-Markt"
                    width={1400}
                    height={600}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
                <div className="px-6 pb-6">
                  <p className="text-slate-500 text-sm">So sieht das System dahinter aus: automatisiertes Enrichment, DNC-Lookup und CRM-Abgleich — für jeden Lead, bevor er kontaktiert wird.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA after Case Studies */}
          <AnimatedSection delay={0.3} className="text-center">
            <a
              href="https://calendar.app.google/N7b7tNRhtYcueKWM7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-200 hover:-translate-y-0.5"
            >
              <CalendarDays className="w-4 h-4" />
              System kennenlernen
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

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("about.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("about.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("about.subheadline")}</p>
          </AnimatedSection>

          {/* Founder card */}
          <AnimatedSection>
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Photo */}
                <div className="relative overflow-hidden min-h-[500px]">
                  <Image
                    src="/Hero_Bild_bearbeitet.png"
                    alt="Calvin Heim"
                    fill
                    className="object-cover object-[center_15%]"
                    priority
                  />
                  {/* Darker gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-2xl text-white leading-tight mb-1">Calvin Heim</h3>
                        <p className="text-ocean-300 text-sm">Gründer & GTM Engineer</p>
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

                {/* Bio */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Über mich</p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Ich habe mit zahlreichen Agenturen zusammengearbeitet. Die Erfahrung war fast immer dieselbe: Man ist eine Nummer. Standardlösungen, wenig echtes Interesse und kaum messbare Ergebnisse.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Genau das hat mich dazu gebracht, Swellsystems zu gründen. Ich arbeite nicht mit vielen Kunden — ich arbeite mit wenigen, die ich wirklich kenne. Dafür liefere ich konkrete, messbare Resultate und bin bei jedem Schritt persönlich dabei.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Eine meiner grossen Leidenschaften neben der Arbeit ist Surfen. Genau das steckt hinter dem Namen — Swells entstehen nicht zufällig. Sie brauchen die richtigen Bedingungen. Genauso wie guter Outbound.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 3 personal highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🤝",
                title: "Echte Partnerschaften",
                desc: "Wahrer Wachstum multipliziert sich automatisch mit einer guten Zusammenarbeit. Keine 0815-Lösungen, sondern ein System, das auf dein Unternehmen angepasst ist.",
              },
              {
                icon: "📊",
                title: "Messbare Resultate",
                desc: "Als zahlengetriebener Mensch entscheide ich nicht aus dem Bauch heraus, sondern basierend auf echten Daten.",
              },
              {
                icon: "🌊",
                title: "Qualität vor Quantität",
                desc: "Ich habe den höchsten Anspruch an meine Arbeit — nur so profitieren beide Parteien von einer Zusammenarbeit. Darum Qualität vor Quantität.",
              },
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

      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      {(() => {
        const faqs = [
          {
            q: "Wann brauche ich eine Lösung wie Swellsystems?",
            a: "Wenn du keinen verlässlichen Weg hast, regelmässig neue Kunden zu gewinnen — oder wenn du einen zusätzlichen Vertriebskanal aufbauen möchtest, ohne dafür ein ganzes Sales-Team einstellen zu müssen. Wir helfen besonders B2B-Unternehmen in der Schweiz und Deutschland dabei, zuverlässig die richtigen Entscheidungsträger anzusprechen und qualifizierte Gespräche zu buchen.",
          },
          {
            q: "Für wen eignet sich die Zusammenarbeit?",
            a: "Swellsystems ist ideal für B2B-Unternehmen wie Agenturen, IT-Firmen, SaaS-Anbieter, Beratungsunternehmen und Dienstleister, die ihren Vertrieb systematisieren wollen. Wichtig ist, dass ein klares Angebot und eine definierbare Zielgruppe vorhanden sind — dann können wir das System optimal auf euch ausrichten.",
          },
          {
            q: "Was, wenn ich meinen Zielkunden noch nicht kenne?",
            a: "Kein Problem. Wir arbeiten den Zielkunden gemeinsam mit dir heraus — auf Basis vorhandener Daten aus deinem Unternehmen, die wir gemeinsam aufarbeiten, sowie durch gezieltes Testing. Es kann sein, dass die Anfangsphase dadurch etwas länger dauert, da wir mehr ausprobieren müssen. Aber auch das ist Teil des Prozesses — und am Ende steht ein ICP, der wirklich auf echten Daten basiert.",
          },
          {
            q: "Wie lange dauert es, bis ich erste Ergebnisse sehe?",
            a: "Erste qualifizierte Antworten zeigen sich typischerweise ab Woche 3 — also bereits während der Aufbauphase. Messbare Pipeline entsteht in der Regel innerhalb der ersten 4–8 Wochen. Der genaue Zeitraum hängt von Angebot, Branche und Zielgruppe ab — das besprechen wir im Onboarding konkret.",
          },
          {
            q: "Wie viel Aufwand habe ich als Kunde?",
            a: "Wenig. Im Onboarding brauchen wir deine Inputs, damit wir deine Zielgruppe und dein Angebot wirklich verstehen. Danach übernehmen wir das operative Outbound-Management vollständig — von der Recherche über das Messaging bis zur laufenden Optimierung. Du konzentrierst dich auf dein Kerngeschäft und beantwortest eingehende Interessenten-Replies.",
          },
          {
            q: "Ich habe schon vieles ausprobiert. Warum sollte es jetzt funktionieren?",
            a: "Verständlich, dass du skeptisch bist. Die meisten Outbound-Versuche scheitern an generischen Texten, falschen Zielgruppen oder fehlendem System dahinter. Wir bauen kein Copy-Paste-Setup — sondern ein System, das auf dein Unternehmen und deinen Markt zugeschnitten ist. Und weil ich nur mit wenigen Kunden arbeite, ist jede Zusammenarbeit für mich persönlich — nicht nur operativ.",
          },
          {
            q: "Was kostet die Zusammenarbeit?",
            a: "Das hängt vom Umfang und der Intensität des Outbounds ab — wie viele Kanäle, welche Zielgruppen, wie viel wir parallel betreiben. Daher gibt es keinen Einheitspreis. Was wir garantieren: faire Preise, die im Verhältnis zum Ergebnis stehen. Im ersten Gespräch schauen wir gemeinsam, was zu dir passt — und du bekommst ein klares Angebot, ohne versteckte Kosten.",
          },
          {
            q: "Wie läuft die Zusammenarbeit konkret ab?",
            a: "Nach dem Onboarding bauen wir deine Outbound-Infrastruktur in den ersten 1–3 Wochen auf. Ab Woche 3 läuft das System live. Jede Woche gibt es einen 30-minütigen Call, in dem wir gemeinsam besprechen was läuft, was optimiert wird und was du dir wünschst. Zusätzlich gibt es einen gemeinsamen Slack-Channel, in dem alles Wichtige schriftlich festgehalten wird — was gemacht wurde, was als nächstes kommt und wo du jederzeit Fragen stellen kannst. Du bist immer auf dem aktuellen Stand, ohne E-Mail-Ketten oder Rätselraten.",
          },
        ];

        return (
          <section className="py-24 px-6 bg-slate-950">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection className="text-center mb-14">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                  FAQ
                </span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Häufige Fragen</h2>
                <p className="text-slate-400 text-lg">Alles, was du wissen möchtest — bevor du dich meldest.</p>
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
        );
      })()}

      {/* ─── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden px-10 py-16 text-center">
              {/* Glow orbs */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)" }} />

              <div className="relative">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                  Kontakt
                </span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
                  Mal schauen, ob's passt.
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Kein Verkaufsgespräch. Wir schauen gemeinsam in 30 Minuten, ob und wie wir dir helfen können — unverbindlich und ohne Risiko.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://calendar.app.google/N7b7tNRhtYcueKWM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-ocean-500 hover:bg-ocean-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-500/25 hover:-translate-y-0.5"
                  >
                    <CalendarDays className="w-4 h-4" />
                    System kennenlernen
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
