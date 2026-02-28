'use client'

import { EXPENSES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

interface ExpenseItemProps {
  expenseKey: keyof typeof EXPENSES
  delay?: string
}

function ExpenseItem({ expenseKey, delay = '0' }: ExpenseItemProps) {
  const expense = EXPENSES[expenseKey]

  return (
    <div
      className="card opacity-0 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
        {expense.name}
      </h3>

      <div className="text-xl md:text-2xl font-bold text-primary mb-3">
        {formatCurrency(expense.value)}
      </div>

      <p className="text-sm text-muted-light dark:text-muted-dark mb-2">
        {expense.note}
      </p>

      <p className="text-xs text-muted-light dark:text-muted-dark opacity-70">
        Fonte: {expense.reference}
      </p>
    </div>
  )
}

export function ExpenseCards() {
  const expenses = Object.keys(EXPENSES) as (keyof typeof EXPENSES)[]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {expenses.map((key, index) => (
        <ExpenseItem
          key={key}
          expenseKey={key}
          delay={`${0.1 + index * 0.1}s`}
        />
      ))}
    </div>
  )
}
