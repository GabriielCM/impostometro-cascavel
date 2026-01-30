'use client'

import { TAX_BREAKDOWN, BUDGET_2026 } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { useCounter } from '@/hooks/useCounter'

interface TaxCardProps {
  taxKey: keyof typeof TAX_BREAKDOWN
  delay?: string
}

function TaxCard({ taxKey, delay = '0' }: TaxCardProps) {
  const tax = TAX_BREAKDOWN[taxKey]
  const { value } = useCounter()
  const taxValue = value * (tax.percentage / 100)

  return (
    <div
      className="card opacity-0 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
            {tax.name}
          </h3>
          <p className="text-xs text-muted-light dark:text-muted-dark">
            {tax.fullName}
          </p>
        </div>
        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
          {tax.percentage}%
        </span>
      </div>

      <div className="text-xl font-bold text-primary font-digital">
        {formatCurrency(taxValue)}
      </div>

      <p className="text-xs text-muted-light dark:text-muted-dark mt-2">
        {tax.description}
      </p>
    </div>
  )
}

export function TaxCards() {
  const taxes = Object.keys(TAX_BREAKDOWN) as (keyof typeof TAX_BREAKDOWN)[]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {taxes.map((key, index) => (
        <TaxCard
          key={key}
          taxKey={key}
          delay={`${0.5 + index * 0.1}s`}
        />
      ))}
    </div>
  )
}
