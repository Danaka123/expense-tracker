import { useState } from 'react'
import { CATEGORIES, getCategoryById, formatPLN, formatDate } from './constants'

export default function ExpenseList({ expenses, onDelete }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? expenses
    : expenses.filter(e => e.categoryId === filter)

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-stone-500 uppercase tracking-widest">Historia</h2>
        <span className="text-xs text-stone-400">{sorted.length} wpisów</span>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 border ${
            filter === 'all'
              ? 'bg-stone-800 text-white border-stone-800'
              : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
          }`}
        >
          Wszystkie
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 border ${
              filter === cat.id
                ? 'text-white border-transparent'
                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
            }`}
            style={filter === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-stone-300 text-3xl mb-2">🗂</p>
          <p className="text-sm text-stone-400">Brak wydatków</p>
          <p className="text-xs text-stone-300 mt-1">Dodaj swój pierwszy wpis powyżej</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-stone-50">
          {sorted.map((expense, i) => {
            const cat = getCategoryById(expense.categoryId)
            return (
              <div
                key={expense.id}
                className="py-3 flex items-center gap-3 group animate-slide-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ backgroundColor: cat.bg }}
                >
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-700 truncate">{expense.description}</p>
                  <p className="text-xs text-stone-400">{cat.label} · {formatDate(expense.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-stone-800 whitespace-nowrap">
                    {formatPLN(expense.amount)}
                  </span>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
                    aria-label="Usuń"
                  >
                    ×
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
