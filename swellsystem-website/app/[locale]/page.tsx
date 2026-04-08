"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
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
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.05]">
              {t("home.headline")}
            </h1>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] gradient-text">
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
                src="/videos/vsl.mp4"
                controls
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
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

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

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

          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden leading-none bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 L1440 60 L0 60 Z" fill="white" />
        </svg>
      </div>

      {/* ─── TECH STACK MARQUEE ───────────────────────────────────── */}
      {(() => {
        type Tool =
          | { name: string; color: string; initial: string; icon?: undefined }
          | { name: string; color: string; icon: { hex: string; path: string }; initial?: undefined };

        const tools: Tool[] = [
          { name: "Clay",        color: "#FF6B2B", initial: "C" },
          { name: "Smartlead",   color: "#4F46E5", initial: "S" },
          { name: "HeyReach",    color: "#0EA5E9", initial: "H" },
          { name: "Claude Code", color: "#D97757", icon: siAnthropic },
          { name: "Apify",       color: "#00B4A2", initial: "A" },
          { name: "n8n",         color: "#EA4B71", icon: siN8n },
          { name: "HubSpot",     color: "#FF7A59", icon: siHubspot },
          { name: "Apollo",      color: "#3B4EF0", initial: "A" },
          { name: "Cognism",     color: "#1B4DFF", initial: "C" },
          { name: "Hunter.io",   color: "#F2735F", initial: "H" },
        ];

        return (
          <div className="bg-white py-12 border-b border-slate-100">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
              Unsere Tools
            </p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
                {[...tools, ...tools].map((tool, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-5 py-2.5 shrink-0 shadow-sm"
                  >
                    {tool.icon ? (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 shrink-0"
                        style={{ fill: `#${tool.icon.hex}` }}
                      >
                        <path d={tool.icon.path} />
                      </svg>
                    ) : (
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-white text-[10px] font-bold leading-none"
                        style={{ background: tool.color }}
                      >
                        {tool.initial}
                      </span>
                    )}
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("howItWorks.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("howItWorks.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("howItWorks.subheadline")}</p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-200 via-ocean-300 to-orange-300 opacity-40 hidden md:block" />
            <div className="space-y-16">
              {steps.map(({ key, number, orange }, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <AnimatedSection key={key} delay={i * 0.12} direction={isLeft ? "left" : "right"}>
                    <div className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 ${!isLeft ? "md:flex-row-reverse" : ""}`}>
                      <div className="flex-1">
                        <div className={`bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ${orange ? "border-orange-200" : "border-ocean-100"}`}>
                          <div className={`font-display font-black text-5xl mb-4 ${orange ? "text-orange-200" : "text-ocean-100"}`}>{number}</div>
                          <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">{t(`howItWorks.${key}Title` as any)}</h3>
                          <p className="text-slate-600 leading-relaxed">{t(`howItWorks.${key}Desc` as any)}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-shrink-0 w-6 h-6 mt-10 items-center justify-center">
                        <div className={`w-4 h-4 rounded-full border-2 shadow-lg ${orange ? "bg-orange-400 border-orange-500" : "bg-ocean-500 border-ocean-600"}`} />
                      </div>
                      <div className="hidden md:block flex-1" />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
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
              {t("caseStudies.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("caseStudies.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("caseStudies.subheadline")}</p>
          </AnimatedSection>

          <div className="space-y-8">
            {cases.map(({ key, gradient, tagBg }, i) => (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-shadow duration-300">
                  <div className={`bg-gradient-to-r ${gradient} p-8 md:p-10`}>
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-5 h-5 text-white/80" />
                      <p className="text-white/80 text-sm font-medium">{t(`caseStudies.${key}Company` as any)}</p>
                    </div>
                    <p className="font-display font-bold text-2xl md:text-3xl text-white">{t(`caseStudies.${key}Result` as any)}</p>
                  </div>
                  <div className="p-8 md:p-10">
                    <p className="text-slate-600 text-base leading-relaxed mb-6">{t(`caseStudies.${key}Desc` as any)}</p>
                    <div className="flex gap-2 flex-wrap">
                      {["Tag1", "Tag2"].map((tag) => (
                        <span key={tag} className={`${tagBg} text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200`}>
                          {t(`caseStudies.${key}${tag}` as any)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("about.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("about.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("about.subheadline")}</p>
          </AnimatedSection>

          {/* Founder card */}
          <AnimatedSection>
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-10">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 relative overflow-hidden min-h-[420px] md:min-h-0">
                  <Image
                    src="/Hero_Bild_bearbeitet.png"
                    alt="Calvin Heim"
                    fill
                    className="object-cover object-[center_15%]"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-900/80 to-transparent p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-left">
                        <h3 className="font-display font-bold text-xl text-white leading-tight">{t("about.founderName")}</h3>
                        <p className="text-ocean-200 text-sm">{t("about.founderRole")}</p>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/calvin-heim/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 transition-colors shrink-0"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-10">
                  <p className="text-slate-600 leading-relaxed text-base">{t("about.founderBio")}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ key, icon }, i) => (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-50 transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{t(`about.${key}Title` as any)}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t(`about.${key}Desc` as any)}</p>
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

      {/* ─── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-slate-50 py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t("contact.badge")}
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4">{t("contact.headline")}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t("contact.subheadline")}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-16 h-16 rounded-full bg-ocean-50 flex items-center justify-center mb-6">
                          <CheckCircle2 className="w-8 h-8 text-ocean-600" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">{t("contact.successTitle")}</h3>
                        <p className="text-slate-600">{t("contact.successMessage")}</p>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("contact.nameLabel")}</label>
                          <input type="text" required placeholder={t("contact.namePlaceholder")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent text-slate-900 placeholder-slate-400 transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("contact.emailLabel")}</label>
                          <input type="email" required placeholder={t("contact.emailPlaceholder")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent text-slate-900 placeholder-slate-400 transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("contact.companyLabel")}</label>
                          <input type="text" placeholder={t("contact.companyPlaceholder")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent text-slate-900 placeholder-slate-400 transition" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("contact.messageLabel")}</label>
                          <textarea rows={4} placeholder={t("contact.messagePlaceholder")} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent text-slate-900 placeholder-slate-400 transition resize-none" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ocean-200">
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              {t("contact.submit")}
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>

            {/* Aside */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection delay={0.1} direction="right">
                <div className="bg-ocean-50 border border-ocean-100 rounded-3xl p-8">
                  <div className="w-10 h-10 rounded-xl bg-ocean-100 flex items-center justify-center mb-5">
                    <CalendarDays className="w-5 h-5 text-ocean-600" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{t("contact.orText")}</h3>
                  <p className="text-slate-600 text-sm mb-5">Wählen Sie direkt einen Termin in unserem Kalender.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-ocean-300 hover:bg-ocean-100 text-ocean-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                    <CalendarDays className="w-4 h-4" />
                    {t("contact.calendarText")}
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} direction="right">
                <div className="bg-white border border-slate-100 rounded-3xl p-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Direkt schreiben</h3>
                  <a href="mailto:hello@swellsystems.ch" className="text-ocean-600 hover:text-ocean-700 text-sm font-medium transition-colors">
                    hello@swellsystems.ch
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
