import { getRequestConfig } from "next-intl/server";

const LOCALES = ["de"];

// requestLocale statt locale: so liest next-intl die Sprache aus
// setRequestLocale() im Layout und braucht dafuer keine Request-Header.
// Erst das macht die Seiten statisch renderbar.
export default getRequestConfig(async ({ requestLocale }) => {
  const angefragt = await requestLocale;
  const locale = angefragt && LOCALES.includes(angefragt) ? angefragt : "de";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
