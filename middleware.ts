import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

// ── Wartungsmodus ──────────────────────────────────────────────────────
// true  → Wartungsseite wird für die GANZE Website angezeigt (HTTP 503)
// false → normale Website (Wartungsmodus aus)
//
// Zum Ausschalten: MAINTENANCE_MODE auf false setzen und neu deployen
//   (git push vercel deploy-fix:main).
const MAINTENANCE_MODE = true;

const intlMiddleware = createMiddleware({
  locales: ["de"],
  defaultLocale: "de",
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  // Beim Entwickeln gilt der Wartungsmodus nicht. Sonst muesste man den
  // Schalter zum Arbeiten jedes Mal umlegen und vor dem Deploy daran denken,
  // ihn wieder umzulegen. Genau das vergisst man einmal, und dann steht die
  // Seite offen, obwohl sie im Umbau ist.
  //
  // Bewusst NODE_ENV und nicht der Hostname: der ist im Dev-Server immer
  // "localhost", egal welchen Host-Kopf jemand schickt, also lokal gar nicht
  // pruefbar. NODE_ENV ist in jedem "next build" und damit auf Vercel
  // "production", hier gibt es nichts zu verwechseln.
  const entwicklung = process.env.NODE_ENV === "development";

  if (MAINTENANCE_MODE && !entwicklung) {
    // Die Wartungsseite selbst normal ausliefern, alles andere darauf umleiten.
    if (request.nextUrl.pathname === "/maintenance") {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/maintenance", request.url), {
      status: 503,
      headers: { "Retry-After": "86400" },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
