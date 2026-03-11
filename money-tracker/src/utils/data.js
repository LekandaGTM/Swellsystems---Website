export const CATEGORIES = [
  { id: 'food',          label: 'Food',                    icon: '🍔', color: '#f59e0b', needs: true },
  { id: 'going-out',     label: 'Going Out',               icon: '🍻', color: '#ec4899', needs: false },
  { id: 'fun',           label: 'Fun',                     icon: '🎮', color: '#8b5cf6', needs: false },
  { id: 'transport',     label: 'Transport',               icon: '🚌', color: '#3b82f6', needs: true },
  { id: 'car',           label: 'Car',                     icon: '🚗', color: '#6366f1', needs: true },
  { id: 'living',        label: 'Living',                  icon: '🏠', color: '#14b8a6', needs: true },
  { id: 'subscriptions', label: 'Subscriptions & Software',icon: '📱', color: '#f97316', needs: false },
  { id: 'sport',         label: 'Sport & Health',          icon: '💪', color: '#22c55e', needs: false },
  { id: 'insurance',     label: 'Insurance',               icon: '🛡️', color: '#64748b', needs: true  },
  { id: 'bills',         label: 'Bills',                   icon: '🧾', color: '#a78bfa', needs: true  },
  { id: 'divers',        label: 'Divers',                  icon: '🗂️', color: '#94a3b8', needs: false },
]

export const CURRENCIES = {
  EUR: { symbol: '€', name: 'Euro',         prefix: false },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', prefix: true  },
  USD: { symbol: '$', name: 'US Dollar',    prefix: true  },
}

export function formatCurrency(amount, currency = 'EUR') {
  const cur = CURRENCIES[currency] || CURRENCIES.EUR
  const formatted = Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (currency === 'CHF') return `CHF ${formatted}`
  if (currency === 'USD') return `$${formatted}`
  return `€${formatted}`
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

export function getCurrentTime() {
  const now = new Date()
  return now.toTimeString().slice(0, 5)
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function getTransactionsForPeriod(transactions, period) {
  const now = new Date()
  let start
  switch (period) {
    case 'month':   start = new Date(now.getFullYear(), now.getMonth(), 1); break
    case 'quarter': start = new Date(now.getFullYear(), now.getMonth() - 2, 1); break
    case 'half':    start = new Date(now.getFullYear(), now.getMonth() - 5, 1); break
    case 'year':    start = new Date(now.getFullYear(), 0, 1); break
    default:        start = new Date(now.getFullYear(), now.getMonth(), 1)
  }
  return transactions.filter(t => new Date(t.date + 'T00:00:00') >= start)
}

export function calcSummary(transactions) {
  const income   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  return { income, expenses, net: income - expenses }
}

export function getCategorySpending(transactions) {
  const spending = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    spending[t.category] = (spending[t.category] || 0) + t.amount
  })
  return spending
}

// Weights used for proportional distribution within needs/wants pots
const CATEGORY_WEIGHTS = {
  food:          { needs: true,  weight: 35 },
  living:        { needs: true,  weight: 40 },
  transport:     { needs: true,  weight: 15 },
  car:           { needs: true,  weight: 10 },
  insurance:     { needs: true,  weight: 20 },
  bills:         { needs: true,  weight: 15 },
  'going-out':   { needs: false, weight: 30 },
  fun:           { needs: false, weight: 25 },
  subscriptions: { needs: false, weight: 25 },
  sport:         { needs: false, weight: 20 },
  divers:        { needs: false, weight: 15 },
}

// 50/30/20 split — respects knownExpenses by subtracting them first,
// then distributes the remainder proportionally among the other categories.
export function autoGenerateBudgets(monthlyIncome, knownExpenses = {}) {
  const knowIds = Object.keys(knownExpenses).filter(id => Number(knownExpenses[id]) > 0)

  // Split known amounts into needs / wants buckets
  const knownNeeds = knowIds
    .filter(id => CATEGORY_WEIGHTS[id]?.needs !== false)
    .reduce((s, id) => s + Number(knownExpenses[id]), 0)
  const knownWants = knowIds
    .filter(id => CATEGORY_WEIGHTS[id]?.needs === false)
    .reduce((s, id) => s + Number(knownExpenses[id]), 0)

  // Available pots after removing known amounts (20% savings always reserved)
  const variableNeedsPot = Math.max(monthlyIncome * 0.50 - knownNeeds, 0)
  const variableWantsPot = Math.max(monthlyIncome * 0.30 - knownWants, 0)

  // Non-known categories
  const nonKnownNeeds = CATEGORIES.filter(c => CATEGORY_WEIGHTS[c.id]?.needs !== false && !knownExpenses[c.id])
  const nonKnownWants = CATEGORIES.filter(c => CATEGORY_WEIGHTS[c.id]?.needs === false && !knownExpenses[c.id])

  const needsTotalWeight = nonKnownNeeds.reduce((s, c) => s + (CATEGORY_WEIGHTS[c.id]?.weight || 20), 0)
  const wantsTotalWeight = nonKnownWants.reduce((s, c) => s + (CATEGORY_WEIGHTS[c.id]?.weight || 20), 0)

  const result = {}

  // Lock in known values as-is
  knowIds.forEach(id => { result[id] = +Number(knownExpenses[id]).toFixed(0) })

  // Auto-calculate the rest
  nonKnownNeeds.forEach(c => {
    const w = CATEGORY_WEIGHTS[c.id]?.weight || 20
    result[c.id] = needsTotalWeight > 0 ? +(variableNeedsPot * (w / needsTotalWeight)).toFixed(0) : 0
  })
  nonKnownWants.forEach(c => {
    const w = CATEGORY_WEIGHTS[c.id]?.weight || 20
    result[c.id] = wantsTotalWeight > 0 ? +(variableWantsPot * (w / wantsTotalWeight)).toFixed(0) : 0
  })

  return result
}

export function getMonthlyGroups(transactions) {
  const groups = {}
  transactions.forEach(t => {
    const key = t.date.slice(0, 7) // YYYY-MM
    if (!groups[key]) groups[key] = []
    groups[key].push(t)
  })
  return groups
}

export function getPeriodLabel(period) {
  const labels = { month: 'This Month', quarter: 'Last 3 Months', half: 'Last 6 Months', year: 'This Year' }
  return labels[period] || 'This Month'
}

export function getDaysInCurrentMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

export function getDayOfMonth() {
  return new Date().getDate()
}
