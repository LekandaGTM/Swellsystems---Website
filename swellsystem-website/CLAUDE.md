# Swellsystems.ch – Project Brief for Claude

## What is this project?
Agency website for **Swellsystems** – a B2B automated outbound company run by **Calvin Heim**.
The name is inspired by ocean swells (Calvin surfs). The site is hosted at **swellsystems.ch** on **Vercel**.

---

## Owner / Founder
- **Name:** Calvin Heim
- **Role:** Founder & GTM Engineer
- **Vibe:** Surfer, precision-driven, transparent

---

## Target Audience
- B2B companies in **Switzerland** (primary) and Germany
- Minimum CLV of **CHF 3'000**
- Decision makers at SMEs and mid-market companies

---

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| i18n | next-intl (DE default, EN fallback) |
| Icons | lucide-react |
| Hosting | Vercel |

---

## Design System
- **Style:** Minimalistic, professional, subtle surf/ocean aesthetic
- **Base color:** White (`#ffffff`)
- **Primary blue:** Ocean blue (`#0ea5e9` = `ocean-500`)
- **Dark accent:** `ocean-700` / `ocean-900`
- **Highlight:** Swell orange (`#f97316`)
- **Font:** Inter (body) + Plus Jakarta Sans (headings/display)
- **Motion:** Framer Motion scroll reveals, animated canvas wave background

---

## Structure – One-Pager
The site is a **single-page application**. All sections live in `app/[locale]/page.tsx`.
Navigation links **scroll** to sections by ID – they do NOT route to separate pages.

### Section order (matches nav):
1. **Hero** – headline, stats, CTAs
2. **#services** – 6-card grid of service offerings
3. **#how-it-works** – 4-step alternating timeline
4. **#case-studies** – 3 result cards with gradients
5. **#about** – Calvin Heim bio + 3 company values
6. **#contact** – contact form + calendar booking aside

### Nav behavior:
- Logo → scrolls to top
- Nav links → smooth scroll to section (80px offset for fixed navbar)
- Active section → highlighted in nav via IntersectionObserver
- CTA button ("Gespräch buchen") → scrolls to `#contact`
- Language toggle (DE/EN) in top-right of navbar

---

## Key Files
```
swellsystems/
├── app/
│   ├── globals.css              # Tailwind base, custom utilities, canvas styles
│   ├── layout.tsx               # Root layout (passthrough)
│   ├── page.tsx                 # Root redirect (handled by middleware)
│   └── [locale]/
│       ├── layout.tsx           # Locale layout – loads fonts, Navbar, Footer, WaveBackground
│       └── page.tsx             # ★ MAIN FILE – full one-pager with all sections
├── components/
│   ├── Navbar.tsx               # Fixed navbar, scroll-aware, language switcher
│   ├── Footer.tsx               # Dark footer with wave SVG divider
│   ├── WaveBackground.tsx       # Canvas-based animated particles + sine waves
│   └── AnimatedSection.tsx      # Framer Motion scroll-reveal wrapper
├── i18n/
│   └── request.ts               # next-intl config (reads locale from request)
├── messages/
│   ├── de.json                  # German copy (default)
│   └── en.json                  # English copy (auto-served to non-DE browsers)
├── middleware.ts                # next-intl locale detection + routing
├── next.config.mjs              # next-intl plugin configured
├── tailwind.config.ts           # Custom colors (ocean.*), fonts, animations
└── CLAUDE.md                    # this file
```

---

## Local Project Path
```
/Users/calvinheim/swellsystems
```

## Running the Project
```bash
cd /Users/calvinheim/swellsystems
npm run dev       # → http://localhost:3000
npm run build     # production build check
```

---

## i18n Notes
- Default locale: **de** (German)
- Auto-detection: browser `Accept-Language` header via next-intl middleware
- Manual toggle: globe icon in navbar top-right
- All copy lives in `messages/de.json` and `messages/en.json`
- Translation keys follow namespace pattern: `home.*`, `services.*`, `contact.*`, etc.

---

## What's Done ✅
- [x] Full one-pager with all 6 sections
- [x] Animated canvas wave background (particles + sine waves, scroll-reactive)
- [x] Fixed navbar with smooth scroll, active section highlight, mobile menu
- [x] Language auto-detection + manual toggle (DE/EN)
- [x] Framer Motion scroll-reveal animations on all sections
- [x] Services grid (6 cards)
- [x] How It Works timeline (4 steps, alternating left/right)
- [x] Case Studies (3 gradient cards with results)
- [x] About section (Calvin Heim bio + values)
- [x] Contact form with success state animation
- [x] Calendar booking aside (placeholder link)
- [x] Wave SVG dividers between sections
- [x] Footer with dark background + wave divider
- [x] Production build verified, zero errors

---

## What Still Needs Doing ⬜
- [ ] Add real photo of Calvin Heim to the About section (replace `<Waves />` placeholder)
- [ ] Connect contact form to real email service (Resend, Formspree, or similar)
- [ ] Add real Calendly / Cal.com booking link in Contact section
- [ ] Set real email address (`hello@swellsystems.ch`) in Footer/Contact
- [ ] Add Impressum and Datenschutz pages – legally required in CH/DE
- [ ] Deploy to Vercel and connect `swellsystems.ch` domain
- [ ] Add real case study details (currently placeholder copy)
- [ ] SEO: add og:image, sitemap, and robots.txt
- [ ] Add Google Analytics or Plausible tracking

---

## Calvin's Preferences
- One-pager only – no separate sub-pages (except legal pages)
- No static site – must be dynamic (Next.js, not plain HTML)
- Animated background with scroll reactivity
- Minimalistic design – surf aesthetic should be subtle, not kitschy
- German as primary language, English auto-fallback
- Target market: Switzerland first, Germany second
