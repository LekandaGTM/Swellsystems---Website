import { getAllPosts } from "@/lib/blog";

/**
 * /llms.txt: strukturierter Wegweiser fuer KI-Crawler (ChatGPT, Perplexity,
 * Claude). Kein offizieller Standard mit Rechtswirkung, aber die Systeme
 * lesen ihn, und er kostet uns nichts ausser dieser Datei.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const body = `# Swellsystems
> Prozessautomatisierung für Schweizer KMU und Agenturen. Wir bauen Automatisierungen für Belegverarbeitung, Offert- und Auftragsprozesse, Reporting und Akquise, meist mit n8n, auf Wunsch selbst gehostet in der Schweiz.

## Über
- Firma: Swellsystems GmbH, Schweiz
- Gründer: Calvin Heim (https://www.linkedin.com/in/calvin-heim/)
- Zielgruppe: B2B-KMU ab 5 Mitarbeitenden, Agenturen und Coaches, Markt Schweiz
- Kontakt: calvin@swellsystems.ch

## Hauptseiten
- [Startseite](https://www.swellsystems.ch/de): Angebot, Vorgehen, Rechner
- [Referenzen](https://www.swellsystems.ch/de/referenzen): Projekte mit Zahlen
- [Handwerk](https://www.swellsystems.ch/de/handwerk): Automatisierung für Handwerksbetriebe
- [Blog](https://www.swellsystems.ch/de/blog): wöchentliche Beiträge zu KI- und Prozessautomatisierung

## Beiträge
${posts
  .map(
    (p) =>
      `- [${p.title}](https://www.swellsystems.ch/de/blog/${p.slug}): ${p.description}`
  )
  .join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
