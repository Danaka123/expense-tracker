import { CATEGORIES, formatPLN } from './constants'

export default function CategoryBreakdown({ expenses }) {
  const totals = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.categoryId === cat.id).reduce((s, e) => s + e.amount, 0),
  }))

  const max = Math.max(...totals.map(t => t.total), 1)

  return (
    <div className="card p-5 flex flex-col gap-3">
      <h2 className="text-sm font-medium text-stone-500 uppercase tracking-widest">Według kategorii</h2>
      <div className="flex flex-col gap-3">
        {totals.map(cat => (
          <div key={cat.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{cat.icon}</span>
                <span className="text-sm text-stone-600">{cat.label}</span>
              </div>
              <span className="text-sm font-medium text-stone-700">{formatPLN(cat.total)}</span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((cat.total / max) * 100)}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
