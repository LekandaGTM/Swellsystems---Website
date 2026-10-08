import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Linkedin, CalendarCheck } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { CALVIN_ID, ORG_ID, SITE_URL, brotkrumenSchema, jsonLd, seitenMetadaten } from "@/lib/seo";

const CAL_LINK = "https://cal.com/calvin-heim-swellsystems/30min";

// Statisch beim Build gerendert. Frueher ging das nicht, weil next-intl im
// Layout Request-Header las; seit setRequestLocale() im Layout schon.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ locale: "de", slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return seitenMetadaten({
    pfad: `/de/blog/${post.slug}`,
    titel: post.metaTitle ?? post.title,
    beschreibung: post.description,
    // Das Bild kommt aus opengraph-image.tsx neben dieser Datei.
    bild: null,
    typ: "article",
    artikel: { veroeffentlicht: post.datePublished, geaendert: post.dateModified },
  });
}

/*
 * Das BlogPosting-Schema schreibt der Blog-Agent als json-Block ans Ende der
 * Markdown-Datei. Was fuer alle Beitraege gleich ist, ergaenzt diese Seite:
 * Bild, Verlag mit Logo und die Verknuepfung zur Organisation. Sonst muesste
 * jeder neue Beitrag daran denken, und genau das vergisst man.
 */
function artikelSchema(jsonRoh: string | undefined, slug: string) {
  const url = `${SITE_URL}/de/blog/${slug}`;
  let artikel: Record<string, unknown> = {};
  try {
    artikel = jsonRoh ? JSON.parse(jsonRoh) : {};
  } catch {
    artikel = {};
  }
  if (artikel["@type"] !== "BlogPosting") return null;

  return {
    ...artikel,
    image: `${url}/opengraph-image`,
    author: { ...(artikel.author as object), "@id": CALVIN_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Swellsystems",
      url: `${SITE_URL}/de`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/swellsystems-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export default function BlogPost({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const schema = artikelSchema(post.jsonLd, post.slug);
  const brotkrumen = brotkrumenSchema([
    { name: "Startseite", pfad: "/de" },
    { name: "Blog", pfad: "/de/blog" },
    { name: post.title, pfad: `/de/blog/${post.slug}` },
  ]);

  const weitere = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(brotkrumen) }} />

      <article className="px-6 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-ocean-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Beiträge
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-5">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} Min. Lesezeit
            </span>
            {post.cluster && (
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                {post.cluster}
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pb-8 mb-10 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center text-white font-display font-bold text-sm">
              CH
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">Calvin Heim</p>
              <a
                href="https://www.linkedin.com/in/calvin-heim/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-ocean-600 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                Founder, Swellsystems
              </a>
            </div>
          </div>

          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Abschluss-CTA */}
          <div className="mt-16 bg-slate-900 rounded-3xl px-8 py-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4 leading-snug">
              Willst du wissen, welcher Ablauf bei dir zuerst dran wäre?
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-lg mx-auto mb-8">
              Im Erstgespräch gehen wir deinen Prozess Schritt für Schritt durch und du
              bekommst eine ehrliche Einschätzung. Auch dann, wenn sie lautet, dass sich eine
              Automatisierung bei dir nicht lohnt.
            </p>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-ocean-700 hover:bg-ocean-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-ocean-500/25 hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4" />
              Kostenloses Erstgespräch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {weitere.length > 0 && (
            <div className="mt-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
                Weitere Beiträge
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {weitere.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${locale}/blog/${p.slug}`}
                    className="group block bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-200 hover:border-ocean-300 hover:shadow-lg hover:shadow-ocean-500/5"
                  >
                    <p className="text-xs text-slate-500 mb-2">{formatDate(p.datePublished)}</p>
                    <p className="font-display font-semibold text-slate-900 leading-snug group-hover:text-ocean-600 transition-colors">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
