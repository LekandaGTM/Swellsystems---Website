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
    const sectionIds = ["problem", "mechanismus", "beweis", "about", "contact"];
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

  /**
   * Zu einem Abschnitt springen.
   *
   * Aus dem Burgermenue heraus passierte hier nichts, und zwar zuverlaessig.
   * Nachgemessen: scrollY blieb nach jedem Tipper auf 0.
   *
   * Der Grund liegt in der Reihenfolge. setIsOpen(false) laesst das Menue ueber
   * 200 ms zusammenklappen, und das Scrollen startete im selben Frame. Der
   * Browser bricht ein laufendes weiches Scrollen ab, sobald waehrenddessen die
   * Hoehe eines Elements ueber dem Dokument animiert wird. Am Schreibtisch
   * faellt es nicht auf, weil die Leiste dort keine Klappe hat.
   *
   * Deshalb wird jetzt erst geschlossen und danach gescrollt, nach der
   * Schliessanimation. Die Verzoegerung sieht niemand, weil das Menue in
   * dieser Zeit ohnehin zuklappt.
   *
   * Wer im Betriebssystem weniger Bewegung eingestellt hat, springt direkt.
   * Ein weiches Scrollen ueber elftausend Pixel ist genau das, was diese
   * Einstellung abstellen soll.
   */
  const scrollTo = (id: string) => {
    const warOffen = isOpen;
    setIsOpen(false);

    const springen = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      const sanft = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: sanft ? "smooth" : "auto" });
    };

    if (warOffen) {
      window.setTimeout(springen, 240);
    } else {
      springen();
    }
  };

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  /**
   * Zwei Arten von Eintraegen: Abschnitte der Startseite, die gescrollt werden,
   * und echte Seiten, die verlinkt werden. Vorher konnte die Leiste nur das
   * Erste, und "Referenzen" ist eine eigene Seite und kein Abschnitt.
   *
   * href gewinnt, wenn beides gesetzt waere. Ein Eintrag ohne id nimmt am
   * Abschnitts-Hervorheben nicht teil, das ist richtig so: eine eigene Seite
   * wird nicht beim Scrollen aktiv, sondern wenn man auf ihr steht.
   */
  const navLinks: { id?: string; href?: string; label: string }[] = [
    { id: "problem", label: t("services") },
    { id: "mechanismus", label: t("howItWorks") },
    { id: "beweis", label: t("caseStudies") },
    { href: `/${locale}/referenzen`, label: t("references") },
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
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-ocean-600",
                  pathname.startsWith(link.href) ? "text-ocean-600" : "text-slate-600"
                )}
              >
                {link.label}
              </Link>
            ) : isHomePage ? (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id!)}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-ocean-600",
                  activeSection === link.id ? "text-ocean-600" : "text-slate-600"
                )}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={`/${locale}#${link.id}`}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-ocean-600"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://cal.com/calvin-heim-swellsystems/30min"
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
            {/*
              py-3 an jedem Eintrag: die Zeilen waren 24 Pixel hoch, Apples
              Richtwert fuer eine Tippflaeche sind 44. Die Breite war schon
              vorher voll, zu knapp war allein die Hoehe.
            */}
            <div className="px-6 py-4 flex flex-col">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "w-full text-base font-medium text-left py-3 transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-ocean-600"
                        : "text-slate-700 hover:text-ocean-600"
                    )}
                  >
                    {link.label}
                  </Link>
                ) : isHomePage ? (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.id!)}
                    className={clsx(
                      "w-full text-base font-medium text-left py-3 transition-colors",
                      activeSection === link.id
                        ? "text-ocean-600"
                        : "text-slate-700 hover:text-ocean-600"
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={`/${locale}#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full text-base font-medium text-left py-3 text-slate-700 hover:text-ocean-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-3 pt-4 border-t border-slate-100 flex items-center justify-end">
                <a
                  href="https://cal.com/calvin-heim-swellsystems/30min"
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
