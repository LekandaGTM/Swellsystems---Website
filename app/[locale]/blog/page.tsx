import { setRequestLocale } from "next-intl/server";
import { seitenMetadaten } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata = seitenMetadaten({
  pfad: "/de/blog",
  titel: "Blog | Automatisierung für Schweizer KMU | Swellsystems",
  beschreibung:
    "Jede Woche ein Beitrag zu KI- und Prozessautomatisierung in Schweizer KMU und Agenturen. Konkret, mit Zahlen, ohne Buzzwords.",
});

export default function BlogIndex({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const posts = getAllPosts();

  return (
    <>
      <section className="relative px-6 pt-28 pb-12">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-100 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Blog
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-tight mb-5">
              Automatisierung, wie sie im Schweizer KMU wirklich aussieht
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Jede Woche ein Beitrag zu KI- und Prozessautomatisierung. Was funktioniert, was
              nicht, und woran Projekte in der Praxis scheitern. Konkret genug, dass du es
              selbst umsetzen kannst.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-slate-500">Der erste Beitrag erscheint in Kürze.</p>
          ) : (
            <div className="space-y-5">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group block bg-white border border-slate-200 rounded-2xl p-7 transition-all duration-200 hover:border-ocean-300 hover:shadow-lg hover:shadow-ocean-500/5 hover:-translate-y-0.5"
                  >
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(post.datePublished)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} Min.
                      </span>
                      {post.cluster && (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                          {post.cluster}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 leading-snug mb-3 group-hover:text-ocean-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{post.description}</p>
                    <span className="inline-flex items-center gap-2 text-ocean-600 font-semibold text-sm">
                      Beitrag lesen
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
