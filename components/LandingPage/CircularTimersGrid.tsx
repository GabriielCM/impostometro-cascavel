'use client'

import { CircularTimer } from './CircularTimer'
import { BUDGET_2026 } from '@/lib/constants'

export function CircularTimersGrid() {
  const metrics = [
    {
      value: BUDGET_2026.perSecond,
      label: 'por segundo',
    },
    {
      value: BUDGET_2026.perMinute,
      label: 'por minuto',
    },
    {
      value: BUDGET_2026.perHour,
      label: 'por hora',
    },
    {
      value: BUDGET_2026.perDay,
      label: 'por dia',
    },
  ]

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`
    }
    return `R$ ${value.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <CircularTimer
          key={metric.label}
          value={metric.value}
          label={metric.label}
          formatValue={formatValue}
        />
      ))}
    </div>
  )
}
