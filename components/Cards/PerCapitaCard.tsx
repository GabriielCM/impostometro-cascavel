'use client'

import { PER_CAPITA_EXPENSES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

interface PerCapitaItemProps {
  expenseKey: keyof typeof PER_CAPITA_EXPENSES
  delay?: string
}

function PerCapitaItem({ expenseKey, delay = '0' }: PerCapitaItemProps) {
  const expense = PER_CAPITA_EXPENSES[expenseKey]

  return (
    <div
      className="card opacity-0 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="text-sm text-muted-light dark:text-muted-dark uppercase tracking-wide mb-1">
        {expense.name}
      </div>
      <div className="text-xl md:text-2xl font-bold text-primary">
        {formatCurrency(expense.value)}
      </div>
      <div className="text-xs text-muted-light dark:text-muted-dark mt-1">
        {expense.unit}
      </div>
    </div>
  )
}

export function PerCapitaCards() {
  const expenses = Object.keys(PER_CAPITA_EXPENSES) as (keyof typeof PER_CAPITA_EXPENSES)[]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {expenses.map((key, index) => (
        <PerCapitaItem
          key={key}
          expenseKey={key}
          delay={`${0.1 + index * 0.1}s`}
        />
      ))}
    </div>
  )
}
