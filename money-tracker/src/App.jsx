import { useState, useEffect, useRef } from 'react'
import Dashboard from './components/Dashboard'
import QuickAdd from './components/QuickAdd'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import { generateId } from './utils/data'
import './index.css'

const DEFAULT_SETTINGS = {
  currency: 'EUR',
  monthlyIncome: 0,
  knownExpenses: {},
  recurringExpenses: [],
  budgets: {
    food: 0, 'going-out': 0, fun: 0, transport: 0,
    car: 0, living: 0, subscriptions: 0, sport: 0,
    insurance: 0, bills: 0, divers: 0,
  },
}

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [transactions, setTransactions] = useState(() => load('mt_transactions', []))
  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...load('mt_settings', {}),
    budgets: { ...DEFAULT_SETTINGS.budgets, ...(load('mt_settings', {}).budgets || {}) },
  }))
  const [showAll, setShowAll] = useState(false)
  const recurringApplied = useRef(false)

  useEffect(() => { localStorage.setItem('mt_transactions', JSON.stringify(transactions)) }, [transactions])
  useEffect(() => { localStorage.setItem('mt_settings', JSON.stringify(settings)) }, [settings])

  // Auto-apply recurring expenses once per month on app load
  useEffect(() => {
    if (recurringApplied.current) return
    recurringApplied.current = true

    const currentMonth = new Date().toISOString().slice(0, 7)
    const applied = load('mt_recurring_applied', [])
    if (applied.includes(currentMonth)) return

    const recurring = settings.recurringExpenses || []
    if (recurring.length === 0) return

    const today = new Date().toISOString().split('T')[0]
    const newTxs = recurring.map(re => ({
      id:       generateId(),
      date:     today,
      time:     '00:01',
      title:    `${re.title} (auto)`,
      amount:   re.amount,
      type:     'expense',
      category: re.category,
    }))

    setTransactions(prev => [...newTxs, ...prev])
    localStorage.setItem('mt_recurring_applied', JSON.stringify([...applied, currentMonth]))
  }, []) // eslint-disable-line

  const addTransaction = (tx) => setTransactions(prev => [tx, ...prev])
  const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id))
  const updateSettings = (updates) => setSettings(prev => ({ ...prev, ...updates }))

  return (
    <div className="app">
      <div className="content">
        {tab === 'dashboard' && (
          <Dashboard
            transactions={transactions}
            settings={settings}
            showAll={showAll}
            onDelete={deleteTransaction}
            onShowAll={() => setShowAll(v => !v)}
            onNavigate={setTab}
          />
        )}
        {tab === 'add' && (
          <QuickAdd
            settings={settings}
            onAdd={addTransaction}
            onBack={() => setTab('dashboard')}
          />
        )}
        {tab === 'analytics' && (
          <Analytics transactions={transactions} settings={settings} />
        )}
        {tab === 'settings' && (
          <Settings settings={settings} onUpdate={updateSettings} />
        )}
      </div>

      <nav className="bottom-nav">
        <button onClick={() => setTab('dashboard')} className={tab === 'dashboard' ? 'active' : ''}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button onClick={() => setTab('analytics')} className={tab === 'analytics' ? 'active' : ''}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Analytics</span>
        </button>
        <button onClick={() => setTab('add')} className={`add-btn ${tab === 'add' ? 'active' : ''}`}>
          <span className="nav-icon">+</span>
        </button>
        <button onClick={() => setTab('settings')} className={tab === 'settings' ? 'active' : ''}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </button>
      </nav>
    </div>
  )
}
