"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import posts from "@/content/blog-index.json";

// Die Liste wird vor dem Build aus content/blog/*.md erzeugt
// (npm run blog:index, laeuft automatisch als prebuild).

interface BlogTeaserProps {
  locale?: string;
}

export default function BlogTeaser({ locale = "de" }: BlogTeaserProps) {
  const neueste = posts.slice(0, 3);
  if (neueste.length === 0) return null;

  const datum = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  };

  return (
    <section id="blog" className="bg-slate-50 py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Blog
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-4 leading-tight">
            Jede Woche ein Beitrag zur Automatisierung
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Was in Schweizer KMU und Agenturen wirklich funktioniert, was nicht, und woran
            Projekte in der Praxis scheitern. Konkret genug, dass du es selbst umsetzen kannst.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {neueste.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.05}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-200 hover:border-ocean-300 hover:shadow-lg hover:shadow-ocean-500/5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {datum(post.datePublished)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime} Min.
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900 leading-snug mb-3 group-hover:text-ocean-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                  {post.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-ocean-600 font-semibold text-sm">
                  Lesen
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-ocean-600 transition-colors"
          >
            Alle Beiträge ansehen
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
