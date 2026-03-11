import { useState } from 'react'
import {
  CATEGORIES, formatCurrency, calcSummary,
  getTransactionsForPeriod, getCategorySpending,
  getMonthlyGroups, getPeriodLabel
} from '../utils/data'

const PERIODS = [
  { id: 'month',   label: 'This Month' },
  { id: 'quarter', label: '3 Months'   },
  { id: 'half',    label: '6 Months'   },
  { id: 'year',    label: 'This Year'  },
]

export default function Analytics({ transactions, settings }) {
  const { currency } = settings
  const [period, setPeriod] = useState('month')

  const filtered = getTransactionsForPeriod(transactions, period)
  const { income, expenses, net } = calcSummary(filtered)
  const catSpend = getCategorySpending(filtered)
  const totalExpenses = expenses || 1

  const catsSorted = CATEGORIES
    .map(c => ({ ...c, spent: catSpend[c.id] || 0 }))
    .filter(c => c.spent > 0)
    .sort((a, b) => b.spent - a.spent)

  // Monthly table (last N months based on period)
  const monthCount = { month: 1, quarter: 3, half: 6, year: 12 }[period]
  const now = new Date()
  const months = []
  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d.toISOString().slice(0, 7))
  }

  const groups = getMonthlyGroups(transactions)

  const monthRows = months.map(key => {
    const txs = groups[key] || []
    const { income: inc, expenses: exp, net: n } = calcSummary(txs)
    const label = new Date(key + '-01').toLocaleString('default', { month: 'short', year: '2-digit' })
    return { key, label, inc, exp, net: n }
  })

  return (
    <div>
      <div className="screen-header" style={{ padding: '24px 16px 16px' }}>Analytics</div>

      {/* Period selector */}
      <div className="period-tabs">
        {PERIODS.map(p => (
          <button
            key={p.id}
            className={`period-tab ${period === p.id ? 'active' : ''}`}
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No data for {getPeriodLabel(period).toLowerCase()}.</p>
        </div>
      ) : (
        <>
          {/* Big stats */}
          <div className="big-stats">
            <div className="big-stat">
              <div className="big-stat-label">Income</div>
              <div className="big-stat-value income">{formatCurrency(income, currency)}</div>
            </div>
            <div className="big-stat">
              <div className="big-stat-label">Expenses</div>
              <div className="big-stat-value expense">{formatCurrency(expenses, currency)}</div>
            </div>
            <div className="big-stat">
              <div className="big-stat-label">Saved</div>
              <div className={`big-stat-value ${net >= 0 ? 'positive' : 'negative'}`}>
                {net >= 0 ? '+' : ''}{formatCurrency(net, currency)}
              </div>
            </div>
            <div className="big-stat">
              <div className="big-stat-label">Save Rate</div>
              <div className={`big-stat-value ${net >= 0 ? 'positive' : 'negative'}`}>
                {income > 0 ? `${Math.round((net / income) * 100)}%` : '—'}
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          {catsSorted.length > 0 && (
            <>
              <div className="section-header" style={{ padding: '0 16px 10px' }}>Spending by Category</div>
              <div className="cat-analytics">
                {catsSorted.map(cat => {
                  const pct = Math.round((cat.spent / totalExpenses) * 100)
                  return (
                    <div key={cat.id} className="cat-analytics-item">
                      <div className="cat-analytics-header">
                        <div className="cat-analytics-left">
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span className="cat-analytics-pct">{pct}%</span>
                          <span className="cat-analytics-amt">{formatCurrency(cat.spent, currency)}</span>
                        </div>
                      </div>
                      <div className="budget-bar-track">
                        <div
                          className="budget-bar-fill"
                          style={{ width: `${pct}%`, background: cat.color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* Monthly table */}
          {monthCount > 1 && (
            <>
              <div className="section-header" style={{ padding: '0 16px 10px' }}>Monthly Breakdown</div>
              <div className="monthly-table">
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>In</th>
                      <th>Out</th>
                      <th style={{ textAlign: 'right' }}>Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthRows.map(row => (
                      <tr key={row.key}>
                        <td>{row.label}</td>
                        <td className="col-income">+{formatCurrency(row.inc, currency)}</td>
                        <td className="col-expense">-{formatCurrency(row.exp, currency)}</td>
                        <td className={`col-net ${row.net >= 0 ? 'positive' : 'negative'}`}
                            style={{ color: row.net >= 0 ? 'var(--income)' : 'var(--expense)' }}>
                          {row.net >= 0 ? '+' : ''}{formatCurrency(row.net, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
