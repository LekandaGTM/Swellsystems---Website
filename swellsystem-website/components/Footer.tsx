import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");

  return (
    <footer className="relative z-10 bg-slate-950 text-slate-400">
      {/* Wave divider */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 30 Q180 0 360 30 Q540 60 720 30 Q900 0 1080 30 Q1260 60 1440 30 L1440 60 L0 60 Z"
            fill="#020617"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <path
                  d="M4 22 Q10 8 16 16 Q22 24 28 10"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="28" cy="10" r="2.5" fill="#f97316" />
              </svg>
              <span className="font-display font-bold text-white">
                Swell<span className="text-ocean-400">systems</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {t("links")}
            </p>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}/services`, label: nt("services") },
                { href: `/${locale}/how-it-works`, label: nt("howItWorks") },
                { href: `/${locale}/case-studies`, label: nt("caseStudies") },
                { href: `/${locale}/about`, label: nt("about") },
                { href: `/${locale}/contact`, label: nt("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-ocean-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {t("legal")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/imprint`} className="text-sm hover:text-ocean-400 transition-colors">
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm hover:text-ocean-400 transition-colors">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">{t("copyright")}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
            <span className="text-xs text-ocean-400">swellsystems.ch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
