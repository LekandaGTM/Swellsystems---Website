import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { REFERENZEN } from "./referenzen-daten";

export const metadata: Metadata = {
  title: "Referenzen | Swellsystems",
  description:
    "Echte Projekte aus der Automatisierung von B2B-KMU und Agenturen, mit den Zahlen dazu.",
};

const CAL_LINK = "https://cal.com/calvin-heim-swellsystems/30min";

export default function Referenzen({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <>
      {/* ─── KOPF ─────────────────────────────────────────────────── */}
      <section className="relative px-6 pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-gradient-radial from-ocean-100/60 via-ocean-50/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-ocean-50 border border-ocean-200 text-ocean-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Referenzen
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 leading-[1.15]">
            Gebaut, übergeben, im Einsatz.
          </h1>
          <p className="mt-6 text-slate-600 text-lg leading-relaxed">
            Jedes Projekt mit dem Ausgangszustand, der Lösung und den Zahlen, die dabei
            herausgekommen sind.
          </p>
        </div>
      </section>

      {/* ─── LISTE ────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto space-y-6">
          {REFERENZEN.map((referenz, i) => (
            <AnimatedSection key={referenz.slug} delay={i * 0.08}>
              <Link
                href={`/${locale}/referenzen/${referenz.slug}`}
                className="group block bg-white border border-slate-200 rounded-3xl p-7 md:p-9 transition-all duration-200 hover:border-ocean-300 hover:shadow-xl hover:shadow-ocean-100/50 hover:-translate-y-0.5"
              >
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] gap-7 md:gap-10 items-start">
                  {/* Logo-Kasten */}
                  <div className="flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl px-6 py-8 md:py-10">
                    <Image
                      src={referenz.logo}
                      alt={referenz.firma}
                      width={referenz.logoBreite}
                      height={referenz.logoHoehe}
                      className="w-full max-w-[170px] h-auto"
                    />
                  </div>

                  {/* Beschrieb und Kennzahlen */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900">
                        {referenz.firma}
                      </h2>
                      <span className="text-sm text-slate-500">
                        {referenz.branche} · {referenz.ort} · {referenz.jahr}
                      </span>
                    </div>

                    <p className="mt-3 text-slate-600 leading-relaxed">{referenz.kurz}</p>

                    {/* Kennzahlen */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                      {referenz.kennzahlen.map((k) => (
                        <div key={k.was}>
                          <span className="block font-display font-bold text-lg text-ocean-600 leading-tight">
                            {k.wert}
                          </span>
                          <span className="block text-sm text-slate-500 mt-0.5">{k.was}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {referenz.leistungen.map((leistung) => (
                          <span
                            key={leistung}
                            className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                          >
                            {leistung}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-2 text-sm font-semibold text-ocean-600">
                        Case Study lesen
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}

          {/*
            Solange erst eine Referenz dasteht, sieht die Seite ohne diesen
            Kasten leer aus, und eine leere Referenzseite wirkt schlechter als
            gar keine. Er sagt gleichzeitig ehrlich, dass hier gerade erst
            angefangen wird, statt Fuellmaterial zu erfinden.
          */}
          <AnimatedSection delay={0.2}>
            <div className="border border-dashed border-slate-300 rounded-3xl p-9 text-center">
              <p className="text-slate-600">
                Weitere Projekte folgen. Die nächsten laufen gerade.
              </p>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border border-slate-300 hover:border-ocean-400 text-slate-700 hover:text-ocean-700 font-semibold px-6 py-3 rounded-full transition-all duration-200"
              >
                Über dein Projekt sprechen
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
