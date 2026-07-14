import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["de"],
  defaultLocale: "de",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
