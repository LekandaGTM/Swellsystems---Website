import { useState } from 'react'
import { CATEGORIES, CURRENCIES, formatCurrency, generateId, getTodayDate, getCurrentTime } from '../utils/data'

export default function QuickAdd({ settings, onAdd, onBack }) {
  const { currency } = settings
  const cur = CURRENCIES[currency] || CURRENCIES.EUR

  const [selected, setSelected]   = useState(null) // category id or 'income'
  const [type, setType]           = useState('expense')
  const [title, setTitle]         = useState('')
  const [amount, setAmount]       = useState('')
  const [saved, setSaved]         = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  const date = getTodayDate()
  const time = getCurrentTime()

  function selectCat(id) {
    setSelected(id)
    setSaved(false)
    if (id === 'income') {
      setType('income')
    } else {
      setType('expense')
    }
  }

  function handleSave() {
    const amt = parseFloat(amount)
    if (!selected || !title.trim() || isNaN(amt) || amt <= 0) return

    const tx = {
      id:       generateId(),
      date,
      time,
      title:    title.trim(),
      amount:   amt,
      type:     selected === 'income' ? 'income' : type,
      category: selected === 'income' ? 'income' : selected,
    }

    onAdd(tx)
    setLastSaved(tx)
    setSaved(true)
  }

  function handleAddAnother() {
    setTitle('')
    setAmount('')
    setSaved(false)
  }

  const canSave = selected && title.trim() && parseFloat(amount) > 0

  const prefixSymbol = currency === 'CHF' ? 'CHF' : cur.symbol

  return (
    <div className="add-screen">
      <div className="add-title">Add Entry</div>
      <div className="add-subtitle">Tap a category, then fill in the details.</div>

      {/* Income shortcut */}
      <button
        className={`income-btn ${selected === 'income' ? 'selected' : ''}`}
        onClick={() => selectCat('income')}
      >
        💰 Income / Salary
      </button>

      {/* Category grid */}
      <div className="cat-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`cat-btn ${selected === cat.id ? 'selected' : ''}`}
            onClick={() => selectCat(cat.id)}
          >
            <span className="cat-btn-icon">{cat.icon}</span>
            <span className="cat-btn-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Form — appears after category selected */}
      {selected && !saved && (
        <div className="add-form">
          {/* Pre-filled info chips */}
          <div className="form-prefill">
            <div className="prefill-chip">📅 {date}</div>
            <div className="prefill-chip">🕐 {time}</div>
            <div className="prefill-chip">
              {selected === 'income'
                ? '💰 Income'
                : `${CATEGORIES.find(c => c.id === selected)?.icon} ${CATEGORIES.find(c => c.id === selected)?.label}`
              }
            </div>
          </div>

          {/* Title */}
          <div className="form-field">
            <label>Title</label>
            <input
              className="form-input"
              type="text"
              placeholder={selected === 'income' ? 'e.g. Monthly salary' : 'e.g. Supermarket'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* +/- toggle + Amount */}
          {selected !== 'income' && (
            <div className="form-field">
              <label>Type</label>
              <div className="type-toggle">
                <button
                  className={`type-btn income ${type === 'income' ? 'active' : ''}`}
                  onClick={() => setType('income')}
                >+</button>
                <button
                  className={`type-btn expense ${type === 'expense' ? 'active' : ''}`}
                  onClick={() => setType('expense')}
                >−</button>
              </div>
            </div>
          )}

          <div className="form-field">
            <label>Amount</label>
            <div className="amount-input-wrap">
              <span className="currency-prefix">{prefixSymbol}</span>
              <input
                className="form-input"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <button className="save-btn" onClick={handleSave} disabled={!canSave}>
            Save Entry
          </button>
        </div>
      )}

      {/* Success state */}
      {saved && lastSaved && (
        <div className="save-success">
          <div className="check">✅</div>
          <div className="msg">Saved!</div>
          <div className="sub">
            {lastSaved.type === 'income' ? '+' : '−'}
            {formatCurrency(lastSaved.amount, currency)} — {lastSaved.title}
          </div>
          <button className="add-another-btn" onClick={handleAddAnother}>
            + Add another entry
          </button>
        </div>
      )}
    </div>
  )
}
