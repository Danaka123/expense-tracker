import Head from 'next/head'
import { useExpenses } from '../components/useExpenses'
import { formatPLN, getMonthLabel, getCurrentMonthKey } from '../components/constants'
import StatsCard from '../components/StatsCard'
import AddExpenseForm from '../components/AddExpenseForm'
import CategoryBreakdown from '../components/CategoryBreakdown'
import ExpenseList from '../components/ExpenseList'

export default function Home() {
  const { expenses, addExpense, deleteExpense, loaded } = useExpenses()

  const monthKey = getCurrentMonthKey()
  const monthExpenses = expenses.filter(e => e.date && e.date.startsWith(monthKey))
  const monthTotal = monthExpenses.reduce((s, e) => s + e.amount, 0)
  const allTotal = expenses.reduce((s, e) => s + e.amount, 0)
  const avgExpense = expenses.length ? allTotal / expenses.length : 0

  if (!loaded) {
    return (
      <div className="min-h-screen" style={{backgroundColor: 'transparent'}}>
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Tracker Wydatków</title>
        <meta name="description" content="Śledź swoje wydatki w PLN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💸</text></svg>" />
      </Head>

      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-stone-50/90 backdrop-blur-sm border-b border-stone-100">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-baseline justify-between">
            <div>
              <h1 className="font-display text-xl font-medium text-stone-800 tracking-tight">
                Tracker Wydatków
              </h1>
              <p className="text-xs text-stone-400 mt-0.5 capitalize">{getMonthLabel()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400">Ten miesiąc</p>
              <p className="text-lg font-display font-medium text-stone-800">{formatPLN(monthTotal)}</p>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            <StatsCard
              label="Ten miesiąc"
              value={formatPLN(monthTotal)}
              sub={`${monthExpenses.length} wpisów`}
            />
            <StatsCard
              label="Łącznie"
              value={formatPLN(allTotal)}
              sub={`${expenses.length} wpisów`}
            />
            <StatsCard
              label="Średni"
              value={formatPLN(avgExpense)}
              sub="na wydatek"
            />
          </div>

          {/* Add form */}
          <div className="animate-slide-up" style={{ animationDelay: '50ms' }}>
            <AddExpenseForm onAdd={addExpense} />
          </div>

          {/* Category breakdown */}
          {expenses.length > 0 && (
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CategoryBreakdown expenses={expenses} />
            </div>
          )}

          {/* Expense list */}
          <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
        </main>

        <footer className="max-w-2xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-stone-300">Dane zapisywane lokalnie w przeglądarce</p>
        </footer>
      </div>
    </>
  )
}
