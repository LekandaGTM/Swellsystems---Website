import { useState } from 'react'
import { CATEGORIES, CURRENCIES, BUDGET_TEMPLATES, formatCurrency, autoGenerateBudgets, generateId } from '../utils/data'

export default function Settings({ settings, onUpdate }) {
  const { currency, monthlyIncome, budgets, knownExpenses = {} } = settings
  const [incomeInput, setIncomeInput] = useState(monthlyIncome || '')
  const [knownInputs, setKnownInputs] = useState(
    Object.fromEntries(CATEGORIES.map(c => [c.id, knownExpenses[c.id] !== undefined ? String(knownExpenses[c.id]) : '']))
  )
  const [saved, setSaved] = useState(false)
  const [knownSaved, setKnownSaved] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('50-30-20')
  const [customRatios, setCustomRatios] = useState({ needs: 50, wants: 30 })

  const cur = CURRENCIES[currency] || CURRENCIES.EUR

  function handleCurrency(c) {
    onUpdate({ currency: c })
  }

  function handleIncomeSave() {
    const val = parseFloat(incomeInput) || 0
    onUpdate({ monthlyIncome: val })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  function handleKnownChange(catId, value) {
    setKnownInputs(prev => ({ ...prev, [catId]: value }))
  }

  function handleKnownSave() {
    const cleaned = {}
    Object.entries(knownInputs).forEach(([id, val]) => {
      const str = String(val).trim()
      if (str === '') return
      const n = parseFloat(str)
      if (!isNaN(n)) cleaned[id] = n  // includes 0
    })
    onUpdate({ knownExpenses: cleaned })
    setKnownSaved(true)
    setTimeout(() => setKnownSaved(false), 1500)
  }

  function handleAutoGenerate() {
    const income = parseFloat(incomeInput) || monthlyIncome || 0
    if (!income) return alert('Please enter your monthly income first.')

    let needsPct, wantsPct
    if (selectedTemplate === 'custom') {
      const n = Number(customRatios.needs)
      const w = Number(customRatios.wants)
      if (n + w >= 100) return alert('Needs + Wants must total less than 100% to leave room for savings.')
      needsPct = n / 100
      wantsPct = w / 100
    } else {
      const tpl = BUDGET_TEMPLATES.find(t => t.id === selectedTemplate)
      needsPct = (tpl?.needs ?? 50) / 100
      wantsPct = (tpl?.wants ?? 30) / 100
    }

    const known = {}
    Object.entries(knownInputs).forEach(([id, val]) => {
      const str = String(val).trim()
      if (str === '') return
      const n = parseFloat(str)
      if (!isNaN(n)) known[id] = n
    })
    const generated = autoGenerateBudgets(income, known, needsPct, wantsPct)
    onUpdate({ budgets: generated, monthlyIncome: income, knownExpenses: known })
  }

  function handleBudgetChange(catId, value) {
    onUpdate({
      budgets: { ...budgets, [catId]: parseFloat(value) || 0 }
    })
  }

  // Recurring expenses
  const [addingRecurring, setAddingRecurring] = useState(false)
  const [newRec, setNewRec] = useState({ title: '', category: 'living', amount: '' })

  function handleAddRecurring() {
    const amount = parseFloat(newRec.amount)
    if (!newRec.title.trim() || isNaN(amount) || amount <= 0) return
    const entry = { id: generateId(), title: newRec.title.trim(), category: newRec.category, amount }
    onUpdate({ recurringExpenses: [...(settings.recurringExpenses || []), entry] })
    setNewRec({ title: '', category: 'living', amount: '' })
    setAddingRecurring(false)
  }

  function handleDeleteRecurring(id) {
    onUpdate({ recurringExpenses: (settings.recurringExpenses || []).filter(r => r.id !== id) })
  }

  const totalBudget = Object.values(budgets).reduce((s, v) => s + (Number(v) || 0), 0)
  const savings = monthlyIncome > 0 ? Math.max(monthlyIncome - totalBudget, 0) : null
  const savePct  = monthlyIncome > 0 && savings != null ? Math.round((savings / monthlyIncome) * 100) : null

  const prefixSymbol = currency === 'CHF' ? 'CHF' : cur.symbol

  return (
    <div>
      <div className="screen-header" style={{ padding: '24px 16px 20px' }}>Settings</div>

      {/* Currency */}
      <div className="settings-section">
        <div className="settings-section-title">Currency</div>
        <div className="currency-options">
          {Object.entries(CURRENCIES).map(([code, c]) => (
            <div
              key={code}
              className={`currency-opt ${currency === code ? 'active' : ''}`}
              onClick={() => handleCurrency(code)}
            >
              <span className="cur-symbol">{c.symbol}</span>
              <span className="cur-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly income */}
      <div className="settings-section">
        <div className="settings-section-title">Monthly Net Income</div>
        <div className="income-setting">
          <label>Your average monthly income after taxes</label>
          <div style={{ position: 'relative' }}>
            <span className="currency-prefix" style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-2)', fontSize: 15, fontWeight: 600, pointerEvents: 'none'
            }}>{prefixSymbol}</span>
            <input
              className="form-input"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 3500"
              value={incomeInput}
              onChange={e => setIncomeInput(e.target.value)}
              style={{ paddingLeft: currency === 'CHF' ? 54 : 38 }}
            />
          </div>
          <button className="save-btn" onClick={handleIncomeSave} style={{ marginTop: 0 }}>
            {saved ? '✓ Saved' : 'Save Income'}
          </button>
        </div>
      </div>

      {/* Savings preview */}
      {savings != null && totalBudget > 0 && (
        <div className="settings-section">
          <div className="settings-section-title">Savings Summary</div>
          <div className="income-setting">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-2)', fontSize: 14 }}>Total budgeted</span>
              <span style={{ fontWeight: 700 }}>{formatCurrency(totalBudget, currency)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ color: 'var(--text-2)', fontSize: 14 }}>Savings target</span>
              <span style={{ fontWeight: 700, color: 'var(--income)' }}>
                {formatCurrency(savings, currency)} {savePct != null && `(${savePct}%)`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recurring Expenses */}
      <div className="settings-section">
        <div className="settings-section-title">Recurring Expenses</div>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.5 }}>
          Added automatically on the 1st of each month — rent, insurance, subscriptions, etc.
        </p>

        {(settings.recurringExpenses || []).length > 0 && (
          <div className="budget-settings" style={{ marginBottom: 10 }}>
            {(settings.recurringExpenses || []).map(re => {
              const cat = CATEGORIES.find(c => c.id === re.category)
              return (
                <div key={re.id} className="budget-setting-row">
                  <div className="budget-setting-cat">
                    <span className="budget-setting-icon">{cat?.icon || '🔄'}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{re.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{cat?.label} · monthly</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{formatCurrency(re.amount, currency)}</span>
                    <button className="tx-delete" onClick={() => handleDeleteRecurring(re.id)}>✕</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {addingRecurring ? (
          <div className="add-form">
            <div className="form-field">
              <label>Title</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Rent"
                value={newRec.title}
                onChange={e => setNewRec(p => ({ ...p, title: e.target.value }))}
                autoFocus
              />
            </div>
            <div className="form-field">
              <label>Category</label>
              <select
                className="form-input"
                value={newRec.category}
                onChange={e => setNewRec(p => ({ ...p, category: e.target.value }))}
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Monthly Amount</label>
              <div className="amount-input-wrap">
                <span className="currency-prefix">{prefixSymbol}</span>
                <input
                  className="form-input"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={newRec.amount}
                  onChange={e => setNewRec(p => ({ ...p, amount: e.target.value }))}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="save-btn"
                onClick={handleAddRecurring}
                disabled={!newRec.title.trim() || !parseFloat(newRec.amount)}
                style={{ flex: 1, marginTop: 0 }}
              >Add</button>
              <button
                className="add-another-btn"
                onClick={() => { setAddingRecurring(false); setNewRec({ title: '', category: 'living', amount: '' }) }}
                style={{ flex: 1 }}
              >Cancel</button>
            </div>
          </div>
        ) : (
          <button className="auto-btn" style={{ marginBottom: 0 }} onClick={() => setAddingRecurring(true)}>
            + Add Recurring Expense
          </button>
        )}
      </div>

      {/* Known Expenses */}
      <div className="settings-section">
        <div className="settings-section-title">Known Monthly Expenses</div>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.5 }}>
          Enter amounts you already know (e.g. rent, food). Auto-generate will lock these in and calculate the rest.
        </p>
        <div className="budget-settings">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="budget-setting-row">
              <div className="budget-setting-cat">
                <span className="budget-setting-icon">{cat.icon}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.label}</span>
              </div>
              <input
                className="budget-setting-input"
                type="number"
                inputMode="decimal"
                placeholder="Known?"
                value={knownInputs[cat.id] || ''}
                onChange={e => handleKnownChange(cat.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="save-btn" onClick={handleKnownSave} style={{ marginTop: 10 }}>
          {knownSaved ? '✓ Saved' : 'Save Known Expenses'}
        </button>
      </div>

      {/* Budgets */}
      <div className="settings-section">
        <div className="settings-section-title">Category Budgets</div>

        {/* Template picker */}
        <div className="template-grid">
          {BUDGET_TEMPLATES.map(t => {
            return (
              <div
                key={t.id}
                className={`template-card ${selectedTemplate === t.id ? 'active' : ''}`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                <div className="template-name">{t.name}</div>
                <div className="template-badge">{t.badge}</div>
                <div className="template-savings">
                  {t.savings !== null ? `Save ${t.savings}%` : 'Custom'}
                </div>
              </div>
            )
          })}
        </div>

        {selectedTemplate === 'custom' && (
          <div className="custom-ratios">
            <div className="ratio-row">
              <span className="ratio-label">Needs %</span>
              <input
                className="budget-setting-input"
                type="number"
                inputMode="decimal"
                min="0" max="99"
                value={customRatios.needs}
                onChange={e => setCustomRatios(p => ({ ...p, needs: Number(e.target.value) }))}
              />
            </div>
            <div className="ratio-row">
              <span className="ratio-label">Wants %</span>
              <input
                className="budget-setting-input"
                type="number"
                inputMode="decimal"
                min="0" max="99"
                value={customRatios.wants}
                onChange={e => setCustomRatios(p => ({ ...p, wants: Number(e.target.value) }))}
              />
            </div>
            <div className="ratio-row">
              <span className="ratio-label">Savings %</span>
              <input
                className="budget-setting-input"
                type="number"
                readOnly
                value={Math.max(100 - customRatios.needs - customRatios.wants, 0)}
                style={{ opacity: 0.5 }}
              />
            </div>
          </div>
        )}

        <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '10px 0 10px', lineHeight: 1.5 }}>
          {BUDGET_TEMPLATES.find(t => t.id === selectedTemplate)?.desc}
        </p>

        <button className="auto-btn" onClick={handleAutoGenerate} style={{ marginBottom: 16 }}>
          ✨ Apply {BUDGET_TEMPLATES.find(t => t.id === selectedTemplate)?.name} Template
        </button>

        <div className="budget-settings">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="budget-setting-row">
              <div className="budget-setting-cat">
                <span className="budget-setting-icon">{cat.icon}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.label}</span>
              </div>
              <input
                className="budget-setting-input"
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={budgets[cat.id] || ''}
                onChange={e => handleBudgetChange(cat.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  )
}
