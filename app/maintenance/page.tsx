export default function MaintenancePage() {
  const year = new Date().getFullYear();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-ocean-50 via-white to-white font-sans text-slate-900">
      {/* Dekorative Hintergrund-Elemente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 animate-float rounded-full bg-ocean-300/30 blur-3xl" />
        <div
          className="absolute -right-24 top-1/3 h-96 w-96 animate-float rounded-full bg-swell-orange/20 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Wortmarke */}
      <header className="relative z-10 px-6 py-6 lg:px-8">
        <span className="font-poppins text-xl font-bold tracking-tight text-slate-900">
          Swell<span className="font-medium text-ocean-500">systems</span>
        </span>
      </header>

      {/* Zentraler Inhalt */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-swell-orange opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-swell-orange" />
            </span>
            Wir sind bald wieder da
          </span>

          <h1 className="mt-8 font-poppins text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Wir <span className="gradient-text">überarbeiten</span> gerade unsere
            Seite.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Unsere Website bekommt gerade ein frisches Update. In Kürze ist alles
            wieder für Sie da. Vielen Dank für Ihre Geduld.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:calvin@swellsystems.ch"
              className="inline-flex items-center justify-center rounded-full bg-ocean-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean-200/60 transition hover:-translate-y-0.5 hover:bg-ocean-700"
            >
              Schreiben Sie uns
            </a>
            <a
              href="https://cal.com/calvin-heim-swellsystems/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700"
            >
              Termin buchen
            </a>
          </div>
        </div>
      </div>

      {/* Welle unten (Swell-Motiv, Ocean zu Orange) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
      >
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="swellwave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            fill="url(#swellwave)"
            fillOpacity="0.12"
            d="M0,120 C240,180 480,60 720,100 C960,140 1200,200 1440,120 L1440,220 L0,220 Z"
          />
          <path
            fill="url(#swellwave)"
            fillOpacity="0.18"
            d="M0,150 C240,200 480,110 720,140 C960,170 1200,210 1440,150 L1440,220 L0,220 Z"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 text-center text-sm text-slate-400 lg:px-8">
        © {year} Swellsystems · calvin@swellsystems.ch
      </footer>
    </main>
  );
}
