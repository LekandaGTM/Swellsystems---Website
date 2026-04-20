"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["services", "how-it-works", "case-studies", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navLinks = [
    { id: "services", label: t("services") },
    { id: "how-it-works", label: t("howItWorks") },
    { id: "case-studies", label: t("caseStudies") },
    { id: "about", label: t("about") },
    { id: "contact", label: t("contact") },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        {isHomePage ? (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
          >
            <span className="font-poppins font-bold text-xl tracking-tight text-slate-900">
              Swell<span className="text-ocean-500 font-medium">systems</span>
            </span>
          </button>
        ) : (
          <Link href={`/${locale}`} className="flex items-center">
            <span className="font-poppins font-bold text-xl tracking-tight text-slate-900">
              Swell<span className="text-ocean-500 font-medium">systems</span>
            </span>
          </Link>
        )}

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            isHomePage ? (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-ocean-600",
                  activeSection === link.id ? "text-ocean-600" : "text-slate-600"
                )}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.id}
                href={`/${locale}#${link.id}`}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-ocean-600"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://calendar.app.google/N7b7tNRhtYcueKWM7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-ocean-200 hover:-translate-y-0.5"
          >
            {t("cta")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                isHomePage ? (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={clsx(
                      "text-base font-medium text-left transition-colors",
                      activeSection === link.id
                        ? "text-ocean-600"
                        : "text-slate-700 hover:text-ocean-600"
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.id}
                    href={`/${locale}#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-left text-slate-700 hover:text-ocean-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <a
                  href="https://calendar.app.google/N7b7tNRhtYcueKWM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="bg-ocean-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                >
                  {t("cta")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
