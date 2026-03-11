import {
  CATEGORIES, formatCurrency, calcSummary,
  getTransactionsForPeriod, getCategorySpending, getDayOfMonth, getDaysInCurrentMonth
} from '../utils/data'

function BudgetBar({ cat, spent, budget, currency }) {
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const over = budget > 0 && spent > budget
  const color = over ? '#f87171' : pct > 75 ? '#fbbf24' : cat.color

  return (
    <div className="budget-item">
      <div className="budget-row">
        <div className="budget-cat">
          <span className="budget-cat-icon">{cat.icon}</span>
          <span>{cat.label}</span>
        </div>
        <div className="budget-amounts">
          <strong>{formatCurrency(spent, currency)}</strong>
          {budget > 0 && <> / {formatCurrency(budget, currency)}</>}
        </div>
      </div>
      {budget > 0 && (
        <div className="budget-bar-track">
          <div
            className="budget-bar-fill"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
      )}
    </div>
  )
}

function TxItem({ tx, currency, onDelete }) {
  const cat = CATEGORIES.find(c => c.id === tx.category)
  const icon = tx.type === 'income' ? '💰' : (cat?.icon || '💸')

  return (
    <div className="tx-item">
      <div className="tx-icon" style={{ background: tx.type === 'income' ? 'rgba(74,222,128,0.1)' : 'var(--bg-elevated)' }}>
        {icon}
      </div>
      <div className="tx-info">
        <div className="tx-title">{tx.title}</div>
        <div className="tx-meta">
          {tx.date} · {tx.time}{cat ? ` · ${cat.label}` : ''}
        </div>
      </div>
      <div className={`tx-amount ${tx.type}`}>
        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, currency)}
      </div>
      <button className="tx-delete" onClick={() => onDelete(tx.id)} aria-label="Delete">✕</button>
    </div>
  )
}

export default function Dashboard({ transactions, settings, showAll, onDelete, onShowAll }) {
  const { currency, budgets, monthlyIncome } = settings
  const monthTx  = getTransactionsForPeriod(transactions, 'month')
  const { income, expenses, net } = calcSummary(monthTx)
  const catSpend = getCategorySpending(monthTx)

  const totalBudget  = Object.values(budgets).reduce((s, v) => s + (Number(v) || 0), 0)
  const spendable    = totalBudget > 0 ? Math.max(totalBudget - expenses, 0) : null
  const dayOfMonth   = getDayOfMonth()
  const daysInMonth  = getDaysInCurrentMonth()
  const dailyBudget  = spendable != null ? (spendable / Math.max(daysInMonth - dayOfMonth + 1, 1)) : null

  const now = new Date()
  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' })

  const displayed = showAll ? transactions : transactions.slice(0, 5)

  return (
    <div>
      <div className="dash-header">
        <div>
          <div className="dash-greeting">Overview</div>
          <div className="dash-month">{monthName}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Income</div>
          <div className="stat-value income">{formatCurrency(income, currency)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Spent</div>
          <div className="stat-value expense">{formatCurrency(expenses, currency)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Net</div>
          <div className={`stat-value ${net >= 0 ? 'positive' : 'negative'}`}>
            {net >= 0 ? '+' : ''}{formatCurrency(net, currency)}
          </div>
        </div>
      </div>

      {/* Spendable */}
      {spendable != null && (
        <div className="spendable-banner">
          <div className="spendable-label">You can still spend this month</div>
          <div className="spendable-amount">{formatCurrency(spendable, currency)}</div>
          {dailyBudget != null && (
            <div className="spendable-sub">
              ~{formatCurrency(dailyBudget, currency)} / day for the remaining {daysInMonth - dayOfMonth + 1} days
            </div>
          )}
        </div>
      )}

      {/* Budget per category */}
      {CATEGORIES.some(c => catSpend[c.id] > 0 || budgets[c.id] > 0) && (
        <>
          <div className="section-header">Budget by Category</div>
          <div className="budget-list">
            {CATEGORIES.filter(c => catSpend[c.id] > 0 || budgets[c.id] > 0).map(cat => (
              <BudgetBar
                key={cat.id}
                cat={cat}
                spent={catSpend[cat.id] || 0}
                budget={Number(budgets[cat.id]) || 0}
                currency={currency}
              />
            ))}
          </div>
        </>
      )}

      {/* Transactions */}
      <div className="section-header">Transactions</div>
      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💸</div>
          <p>No transactions yet.<br />Tap + to add your first entry.</p>
        </div>
      ) : (
        <>
          <div className="tx-list">
            {displayed.map(tx => (
              <TxItem key={tx.id} tx={tx} currency={currency} onDelete={onDelete} />
            ))}
          </div>
          {transactions.length > 5 && (
            <button className="view-all-btn" onClick={onShowAll}>
              {showAll ? 'Show less' : `Show all ${transactions.length} transactions`}
            </button>
          )}
        </>
      )}
    </div>
  )
}
