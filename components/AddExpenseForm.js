import { useState } from 'react'
import { CATEGORIES, todayISO } from './constants'

const initialState = {
  amount: '',
  categoryId: 'food',
  date: todayISO(),
  description: '',
}

export default function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!form.amount || isNaN(amount) || amount <= 0) {
      setError('Podaj prawidłową kwotę')
      return
    }
    setError('')
    onAdd({ amount, categoryId: form.categoryId, date: form.date, description: form.description.trim() || CATEGORIES.find(c => c.id === form.categoryId)?.label })
    setForm({ ...initialState, date: form.date })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 1800)
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 flex flex-col gap-4">
      <h2 className="text-sm font-medium text-stone-500 uppercase tracking-widest">Dodaj wydatek</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-stone-500">Kwota (PLN)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">zł</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={form.amount}
              onChange={e => { set('amount', e.target.value); setError('') }}
              className="input-field pl-8"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-stone-500">Data</label>
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-stone-500">Kategoria</label>
        <div className="grid grid-cols-5 gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => set('categoryId', cat.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-150 text-center ${
                form.categoryId === cat.id
                  ? 'border-stone-700 bg-stone-800 text-white'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
              }`}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              <span className="text-[10px] font-medium leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-stone-500">Opis (opcjonalnie)</label>
        <input
          type="text"
          placeholder="Na co wydałeś..."
          value={form.description}
          onChange={e => set('description', e.target.value)}
          className="input-field"
          maxLength={80}
        />
      </div>

      <button type="submit" className={`btn-primary transition-all ${success ? 'bg-sage-600 hover:bg-sage-600' : ''}`}>
        {success ? '✓ Dodano!' : 'Dodaj wydatek'}
      </button>
    </form>
  )
}
