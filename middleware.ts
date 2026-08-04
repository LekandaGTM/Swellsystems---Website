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
  if (MAINTENANCE_MODE) {
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
