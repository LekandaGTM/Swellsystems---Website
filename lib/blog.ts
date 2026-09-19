import fs from "fs";
import path from "path";

// Der Blog liegt als Markdown im Repo. Kein CMS, kein Build-Schritt, keine
// zusaetzliche Abhaengigkeit: eine Datei pro Beitrag in content/blog/.
// Dateiname: {YYYY-MM-DD}-{slug}.md

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  cluster?: string;
  readingTime: number;
  primaryKeyword?: string;
}

export interface Post extends PostMeta {
  html: string;
  jsonLd?: string;
}

/* ── Frontmatter ──────────────────────────────────────────────────────
   Bewusst ein kleiner eigener Parser statt gray-matter. Wir brauchen nur
   Strings und einfache Listen, und jede Abhaengigkeit weniger ist ein
   Build-Risiko weniger. */
function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };

  const block = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const data: Record<string, string | string[]> = {};
  let currentList: string | null = null;

  for (const line of block.split("\n")) {
    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem && currentList) {
      (data[currentList] as string[]).push(unquote(listItem[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value.trim() === "") {
      currentList = key;
      data[key] = [];
    } else {
      currentList = null;
      data[key] = unquote(value.trim());
    }
  }
  return { data, body };
}

const unquote = (s: string) => s.replace(/^["'](.*)["']$/, "$1").trim();

/* ── Markdown ─────────────────────────────────────────────────────────
   Deckt genau das ab, was der Blog benutzt: Ueberschriften, Absaetze,
   Listen, Tabellen, Fettung, Kursiv, Links. Alles andere wird als Text
   ausgegeben, nichts wird stillschweigend verschluckt. */
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => {
      const extern = /^https?:\/\//.test(href) && !href.includes("swellsystems.ch");
      const attrs = extern ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${attrs}>${text}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function renderMarkdown(md: string): { html: string; jsonLd?: string } {
  let jsonLd: string | undefined;

  // JSON-LD steht als ```json-Block am Dateiende. Der Block wird nicht
  // gerendert, sondern als Structured Data in den <head> des Beitrags gehaengt.
  md = md.replace(/```json\s*([\s\S]*?)```/g, (_m, json) => {
    if (!jsonLd && json.includes("@context")) jsonLd = json.trim();
    return "";
  });

  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    // Tabelle
    if (line.trim().startsWith("|") && lines[i + 1]?.includes("---")) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      out.push(
        `<div class="blog-table"><table><thead><tr>${head
          .map((c) => `<th>${inline(c)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`
      );
      continue;
    }

    // Ueberschriften
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      if (level === 1) { i++; continue; } // H1 kommt aus dem Frontmatter
      const text = h[2].trim();
      out.push(`<h${level} id="${slugify(text)}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // Listen
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*[-*]\s+/, "")));
        i++;
      }
      out.push(`<ul>${items.map((it) => `<li>${it}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(inline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      out.push(`<ol>${items.map((it) => `<li>${it}</li>`).join("")}</ol>`);
      continue;
    }

    // Absatz
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3})\s/.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
  }

  return { html: out.join("\n"), jsonLd };
}

const splitRow = (line: string) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

/* ── Zugriff ──────────────────────────────────────────────────────── */

function readFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function toPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const { html, jsonLd } = renderMarkdown(body);
  const str = (k: string, fallback = "") =>
    typeof data[k] === "string" ? (data[k] as string) : fallback;

  const words = body.split(/\s+/).length;

  return {
    slug: str("slug", file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")),
    title: str("title"),
    metaTitle: str("meta_title") || undefined,
    description: str("meta_description"),
    datePublished: str("datePublished", file.slice(0, 10)),
    dateModified: str("dateModified") || undefined,
    cluster: str("cluster") || undefined,
    primaryKeyword: str("primary_keyword") || undefined,
    readingTime: Number(str("reading_time_min")) || Math.max(1, Math.round(words / 200)),
    html,
    jsonLd,
  };
}

/** Alle veroeffentlichten Beitraege, neueste zuerst. Entwuerfe (status: draft)
 *  erscheinen nur im Entwicklungsmodus, damit nichts versehentlich live geht. */
export function getAllPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV === "development";
  return readFiles()
    .map(toPost)
    .filter((p) => {
      if (showDrafts) return true;
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${fileFor(p.slug)}`), "utf8");
      return !/^status:\s*"?draft"?\s*$/m.test(raw);
    })
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

function fileFor(slug: string): string {
  return readFiles().find((f) => f.includes(slug)) ?? "";
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
