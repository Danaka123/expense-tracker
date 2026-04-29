import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'expense_tracker_pln'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setExpenses(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load expenses:', e)
    }
    setLoaded(true)
  }, [])

  const save = useCallback((data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Failed to save:', e)
    }
  }, [])

  const addExpense = useCallback((expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setExpenses(prev => {
      const updated = [newExpense, ...prev]
      save(updated)
      return updated
    })
    return newExpense
  }, [save])

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => {
      const updated = prev.filter(e => e.id !== id)
      save(updated)
      return updated
    })
  }, [save])

  return { expenses, addExpense, deleteExpense, loaded }
}
