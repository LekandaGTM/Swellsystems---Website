/**
 * Erzeugt content/blog-index.json aus den Markdown-Dateien in content/blog/.
 *
 * Grund: die Startseite ist eine Client-Komponente und kann deshalb nicht
 * selbst ins Dateisystem schauen. Sie importiert stattdessen diese Liste.
 * Laeuft automatisch vor jedem Build (npm run prebuild).
 */
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "blog");
const out = path.join(process.cwd(), "content", "blog-index.json");

const unquote = (s) => s.replace(/^["'](.*)["']$/, "$1").trim();

function meta(raw, file) {
  const end = raw.indexOf("\n---", 3);
  const block = end === -1 ? "" : raw.slice(4, end);
  const data = {};
  for (const line of block.split("\n")) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.+)$/);
    if (kv) data[kv[1]] = unquote(kv[2]);
  }
  return {
    slug: data.slug ?? file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, ""),
    title: data.title ?? "",
    description: data.meta_description ?? "",
    datePublished: data.datePublished ?? file.slice(0, 10),
    cluster: data.cluster ?? "",
    readingTime: Number(data.reading_time_min) || 5,
    status: data.status ?? "published",
  };
}

const posts = fs.existsSync(dir)
  ? fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => meta(fs.readFileSync(path.join(dir, f), "utf8"), f))
      .filter((p) => p.status !== "draft")
      .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
  : [];

fs.writeFileSync(out, JSON.stringify(posts, null, 2) + "\n");
console.log(`blog-index.json: ${posts.length} Beitrag/Beitraege`);
