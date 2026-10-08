import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { REFERENZEN } from "./[locale]/referenzen/referenzen-daten";

/*
 * lastModified ist ein festes Datum und nicht new Date(). Mit new Date()
 * meldete jede Seite bei jedem Abruf "heute geaendert". Google lernt daraus,
 * dass das Feld nichts bedeutet, und ignoriert es dann auch fuer die
 * Blogbeitraege, wo es stimmt.
 *
 * Wer eine dieser Seiten inhaltlich aendert, setzt hier das Datum nach.
 */
const statischeSeiten: { pfad: string; geaendert: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { pfad: "/de", geaendert: "2026-10-08", changeFrequency: "monthly", priority: 1 },
  { pfad: "/de/handwerk", geaendert: "2026-10-08", changeFrequency: "monthly", priority: 0.8 },
  { pfad: "/de/referenzen", geaendert: "2026-10-08", changeFrequency: "monthly", priority: 0.8 },
  { pfad: "/de/blog", geaendert: "2026-10-08", changeFrequency: "weekly", priority: 0.9 },
  { pfad: "/de/impressum", geaendert: "2026-10-08", changeFrequency: "yearly", priority: 0.3 },
  { pfad: "/de/datenschutz", geaendert: "2026-10-08", changeFrequency: "yearly", priority: 0.3 },
  { pfad: "/de/agb", geaendert: "2026-10-08", changeFrequency: "yearly", priority: 0.3 },
];

/** Referenz-Detailseiten. Neue Referenz: Datum hier ergaenzen, sonst gilt das Standarddatum. */
const referenzGeaendert: Record<string, string> = {
  doggyworld: "2026-10-08",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.swellsystems.ch";

  const statisch: MetadataRoute.Sitemap = statischeSeiten.map((s) => ({
    url: `${baseUrl}${s.pfad}`,
    lastModified: new Date(s.geaendert),
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  const referenzen: MetadataRoute.Sitemap = REFERENZEN.map((r) => ({
    url: `${baseUrl}/de/referenzen/${r.slug}`,
    lastModified: new Date(referenzGeaendert[r.slug] ?? "2026-10-08"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Beitraege kommen automatisch dazu, sobald eine Markdown-Datei in
  // content/blog/ liegt und nicht als Entwurf markiert ist.
  const beitraege: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/de/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statisch, ...referenzen, ...beitraege];
}
