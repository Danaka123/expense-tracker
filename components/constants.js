export const CATEGORIES = [
  { id: 'food',          label: 'Jedzenie',      icon: '🍽',  color: '#528052', bg: '#f4f7f4' },
  { id: 'transport',     label: 'Transport',     icon: '🚌',  color: '#378ADD', bg: '#e6f1fb' },
  { id: 'entertainment', label: 'Rozrywka',      icon: '🎬',  color: '#D4537E', bg: '#fbeaf0' },
  { id: 'health',        label: 'Zdrowie',       icon: '💊',  color: '#639922', bg: '#eaf3de' },
  { id: 'clothing',      label: 'Odzież',        icon: '👕',  color: '#888780', bg: '#f5f5f4' },
  { id: 'other',         label: 'Inne',          icon: '📦',  color: '#888780', bg: '#f5f5f4' },
]

export const getCategoryById = (id) =>
  CATEGORIES.find(c => c.id === id) || CATEGORIES[4]

export const formatPLN = (amount) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

export const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const todayISO = () => new Date().toISOString().slice(0, 10)

export const getCurrentMonthKey = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const getMonthLabel = () => {
  return new Date().toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
}
