export default function ImpressumPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-4xl text-slate-900 mb-2">Impressum</h1>
        <p className="text-slate-400 text-sm mb-12">Stand: April 2025</p>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Seite & Dienste werden angeboten von
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-1">
            <p className="font-semibold text-slate-900">LeadLab GmbH</p>
            <p>Espenmoostrasse 6</p>
            <p>9008 St. Gallen</p>
            <p>Schweiz</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Unternehmensangaben
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-1">
            <p>Unternehmens-Identifikationsnummer (UID): <span className="text-slate-900 font-medium">CHE-344.886.977</span></p>
            <p>Geschäftsführer: <span className="text-slate-900 font-medium">Calvin Heim</span></p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Inhaltlich Verantwortlicher
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-1">
            <p>Calvin Heim</p>
            <p>
              <a href="mailto:calvin@swellsystems.ch" className="text-ocean-600 hover:underline">
                calvin@swellsystems.ch
              </a>
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Kontakt
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-1">
            <p>Telefon: <a href="tel:+41796495298" className="text-ocean-600 hover:underline">079 649 52 98</a></p>
            <p>E-Mail: <a href="mailto:calvin@swellsystems.ch" className="text-ocean-600 hover:underline">calvin@swellsystems.ch</a></p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Europäische Streitbeilegungs-Plattform
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Seit dem 15. Februar 2016 stellt die EU-Kommission eine Plattform für aussergerichtliche Streitschlichtung bereit.
            Verbrauchern gibt dies die Möglichkeit, Streitigkeiten im Zusammenhang mit Online-Bestellungen zunächst ohne die
            Einschaltung eines Gerichts zu klären. Die Streitbeilegungs-Plattform ist erreichbar unter:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-600 hover:underline break-all"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-lg text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Haftungsausschluss
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
            Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäss den
            gesetzlichen Vorschriften für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
          </p>
        </section>
      </div>
    </div>
  );
}
