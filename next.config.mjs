import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/*
 * Sicherheits-Header fuer alle Seiten. Kein direkter Rankingfaktor, aber Teil
 * der Best Practices, die Lighthouse und Google pruefen. Bewusst ohne
 * Content-Security-Policy: die braeuchte eine Liste aller Quellen (Cal.com,
 * Fonts, Inline-Skripte von Next) und bricht still, sobald etwas fehlt.
 */
const sicherheitsHeader = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kein "X-Powered-By: Next.js" in jeder Antwort.
  poweredByHeader: false,
  images: {
    domains: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: sicherheitsHeader }];
  },
  /*
   * Permanente Weiterleitungen (308). Die Middleware von next-intl leitete
   * "/" mit 307 auf "/de" um, also "voruebergehend". Fuer Google hiess das:
   * die eigentliche Adresse bleibt "/". Diese Regeln greifen vor der
   * Middleware.
   *
   * /en gibt es nicht. Ohne Regel landete es ueber die Middleware auf /de/en
   * und damit auf einer 404.
   */
  async redirects() {
    return [
      { source: "/", destination: "/de", permanent: true },
      { source: "/en", destination: "/de", permanent: true },
      { source: "/en/:path*", destination: "/de/:path*", permanent: true },
      { source: "/de/saas-outbound", destination: "/de", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
