# Money Tracker — App Context

Personal finance PWA built with React + Vite. Runs fully offline, data stored in localStorage. Installable on iPhone via Safari "Add to Home Screen".

---

## Tech Stack

- **React 18** + **Vite 5** — frontend framework
- **vite-plugin-pwa** — PWA manifest + service worker (offline support)
- **localStorage** — all data stored locally on device, no backend
- **Pure CSS** — no Tailwind, custom dark theme with CSS variables

---

## Project Structure

```
money-tracker/
├── index.html
├── vite.config.js
├── package.json
├── CONTEXT.md                    ← this file
└── src/
    ├── main.jsx                  ← React entry point
    ├── App.jsx                   ← Root state, routing, auto-recurring logic
    ├── index.css                 ← Full dark theme CSS (CSS variables)
    ├── utils/
    │   └── data.js               ← Categories, currencies, all helper functions
    └── components/
        ├── Dashboard.jsx         ← Home screen: stats, budget bars, transactions
        ├── QuickAdd.jsx          ← Add entry screen with category shortcuts
        ├── Analytics.jsx         ← Period analytics (month/quarter/half/year)
        └── Settings.jsx          ← Currency, income, known/recurring/budget settings
```

---

## Data Model

### Transaction
```js
{
  id:       string,         // timestamp + random
  date:     string,         // 'YYYY-MM-DD'
  time:     string,         // 'HH:MM'
  title:    string,
  amount:   number,         // always positive
  type:     'income' | 'expense',
  category: string,         // category id or 'income'
}
```

### Settings (localStorage key: `mt_settings`)
```js
{
  currency:           'EUR' | 'CHF' | 'USD',
  monthlyIncome:      number,
  knownExpenses:      { [categoryId]: number },   // user-defined fixed amounts
  recurringExpenses:  [{ id, title, category, amount }],
  budgets:            { [categoryId]: number },   // final budget per category
}
```

### Recurring Applied (localStorage key: `mt_recurring_applied`)
```js
['2026-03', '2026-02', ...]   // months where recurring expenses were auto-applied
```

---

## Categories

| ID | Label | Icon | Type |
|----|-------|------|------|
| food | Food | 🍔 | Need |
| going-out | Going Out | 🍻 | Want |
| fun | Fun | 🎮 | Want |
| transport | Transport | 🚌 | Need |
| car | Car | 🚗 | Need |
| living | Living | 🏠 | Need |
| subscriptions | Subscriptions & Software | 📱 | Want |
| sport | Sport & Health | 💪 | Want |
| insurance | Insurance | 🛡️ | Need |
| bills | Bills | 🧾 | Need |
| divers | Divers | 🗂️ | Want |

---

## Currencies

| Code | Symbol | Display |
|------|--------|---------|
| EUR | € | €1,200.00 |
| CHF | CHF | CHF 1,200.00 |
| USD | $ | $1,200.00 |

---

## Key Features

### 1. Quick Add (+ button)
- Tap a category shortcut → date, time, category pre-filled as chips
- Enter: title + +/− toggle + amount → Save
- Shows confirmation screen with "Add another" option

### 2. Dashboard
- Stats row: Income / Spent / Net for current month
- "You can still spend" banner with daily budget remaining
- Budget bars per category (green → yellow → red as % used)
- Transaction list (last 5, expandable to all)

### 3. Analytics
- Period tabs: This Month / 3 Months / 6 Months / This Year
- Big stats: Income, Expenses, Saved, Save Rate %
- Category spending breakdown with progress bars
- Monthly breakdown table (for multi-month periods)

### 4. Settings

#### Currency
Pick EUR, CHF, or USD. Applied everywhere instantly.

#### Monthly Net Income
Your average income after taxes. Used for budget calculations and savings target.

#### Recurring Expenses
Fixed monthly costs that auto-log on the 1st of each month (rent, insurance, subscriptions).
- Stored as a list: `{ id, title, category, amount }`
- On app load: checks if current month is in `mt_recurring_applied`. If not, creates transactions automatically and marks month as done.

#### Known Monthly Expenses
Amounts you already know for specific categories (e.g. food = CHF 300).
- Used by Auto-generate to lock these values in
- Remaining budget distributed proportionally to unlocked categories

#### Category Budgets
Final budget per category. Can be:
- **Auto-generated** via 50/30/20 rule (respecting known expenses)
- **Manually set** per category

---

## Budget Auto-Generation Logic

**50/30/20 rule with known expense overrides:**

1. User sets `knownExpenses` (e.g. food = 300, living = 1200)
2. Known needs are subtracted from the 50% needs pot
3. Known wants are subtracted from the 30% wants pot
4. Remaining pot distributed proportionally by weight among unlocked categories
5. 20% of income always reserved for savings

**Category weights (for proportional distribution):**

| Category | Pot | Weight |
|----------|-----|--------|
| food | Needs | 35 |
| living | Needs | 40 |
| transport | Needs | 15 |
| car | Needs | 10 |
| insurance | Needs | 20 |
| bills | Needs | 15 |
| going-out | Wants | 30 |
| fun | Wants | 25 |
| subscriptions | Wants | 25 |
| sport | Wants | 20 |
| divers | Wants | 15 |

---

## Local Development

```bash
cd money-tracker
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to /dist
npm run preview      # preview production build
```

**On phone (same WiFi):** open `http://<your-local-ip>:5173` in Safari → Share → Add to Home Screen

---

## Deploy to Vercel (free, permanent URL)

```bash
cd money-tracker
npx vercel --prod
```

---

## Future Ideas

- [ ] Export transactions to CSV
- [ ] Edit existing transactions
- [ ] Multiple currencies per transaction
- [ ] Dark/light theme toggle
- [ ] Notification on budget exceeded
- [ ] iCloud / Supabase sync for multi-device
