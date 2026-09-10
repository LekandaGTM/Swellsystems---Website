import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { referenzFinden } from "../referenzen-daten";
import { inhaltFinden } from "../inhalte";

const CAL_LINK = "https://cal.com/calvin-heim-swellsystems/30min";

/*
 * Kein generateStaticParams hier.
 *
 * Es hat die Route auf statisch umgestellt, waehrend das Layout next-intl im
 * Server Component nutzt und damit dynamisches Rendern verlangt. Ergebnis war
 * ein 500 auf der fertig gebauten Seite, im Dev-Modus unsichtbar. Dazu kam,
 * dass es nur slug zurueckgab und nicht locale, die Route hat aber beide
 * Segmente. Alle uebrigen Seiten der Site rendern ebenfalls auf Anfrage.
 */

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const referenz = referenzFinden(params.slug);
  if (!referenz) return { title: "Referenz | Swellsystems" };

  return {
    title: `${referenz.firma} | Referenz | Swellsystems`,
    description: referenz.titel,
  };
}

export default function Referenzseite({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const referenz = referenzFinden(slug);
  const Inhalt = inhaltFinden(slug);

  // Ein unbekannter Slug ist eine 404 und keine leere Seite. Sonst steht bei
  // einem Tippfehler im Link ein Geruest ohne Inhalt, und das sieht aus wie ein
  // kaputtes Deployment.
  if (!referenz) notFound();

  return (
    <>
      {/* ─── KOPF ─────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-32 pb-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-gradient-radial from-ocean-100/60 via-ocean-50/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Link
            href={`/${locale}/referenzen`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ocean-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Referenzen
          </Link>

          {/*
            Links die Aussage, rechts wer und wie lange. Auf dem Handy
            untereinander, dort steht der Titel zuerst: die Eckdaten sind
            Beiwerk und sollen die Aussage nicht nach unten schieben.
          */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_248px] gap-10 lg:gap-12 items-start">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-[2.1rem] tracking-tight text-slate-900 leading-[1.25] text-balance">
                {referenz.titel}
              </h1>

              <p className="mt-6 text-slate-600 leading-relaxed">{referenz.kurz}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {referenz.leistungen.map((leistung) => (
                  <span
                    key={leistung}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                  >
                    {leistung}
                  </span>
                ))}
              </div>
            </div>

            {/* ─── ECKDATEN ─────────────────────────────────────── */}
            <aside className="w-full rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 px-5 py-6">
                <Image
                  src={referenz.logo}
                  alt={referenz.firma}
                  width={referenz.logoBreite}
                  height={referenz.logoHoehe}
                  className="w-full max-w-[150px] h-auto"
                  priority
                />
              </div>

              <dl className="mt-5 divide-y divide-slate-100">
                <div className="pb-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Website
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={referenz.website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 font-medium text-ocean-600 hover:text-ocean-700 transition-colors"
                    >
                      {referenz.website.anzeige}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Dauer
                  </dt>
                  <dd className="mt-1 font-medium text-slate-800">{referenz.dauer}</dd>
                </div>

                <div className="pt-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Branche
                  </dt>
                  <dd className="mt-1 font-medium text-slate-800">{referenz.branche}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── KENNZAHLEN ───────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {referenz.kennzahlen.map((k) => (
                <div
                  key={k.was}
                  className="bg-white border border-slate-200 rounded-2xl px-6 py-5 text-center"
                >
                  <span className="block font-display font-bold text-2xl text-ocean-600 leading-tight">
                    {k.wert}
                  </span>
                  <span className="block text-sm text-slate-500 mt-1">{k.was}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── DIE AUSFÜHRLICHE FASSUNG ─────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {Inhalt ? (
            <Inhalt />
          ) : (
            <AnimatedSection>
              <div className="border border-dashed border-slate-300 rounded-3xl p-9 md:p-12 text-center">
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Die ausführliche Fassung folgt.
                </h2>
                <p className="mt-3 text-slate-600 leading-relaxed max-w-lg mx-auto">
                  Ausgangslage, Vorgehen und Ergebnis werden hier gerade zusammengestellt,
                  mit den Bildern aus dem Projekt. Die Zahlen oben stehen bereits und sind
                  gemessen, nicht geschätzt.
                </p>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-ocean-200 hover:-translate-y-0.5"
                >
                  Über ein ähnliches Projekt sprechen
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
