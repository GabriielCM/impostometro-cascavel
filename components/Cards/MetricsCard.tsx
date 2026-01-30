'use client'

import { BUDGET_2026 } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

interface MetricItemProps {
  label: string
  value: number
  delay?: string
}

function MetricItem({ label, value, delay = '0' }: MetricItemProps) {
  return (
    <div
      className="card opacity-0 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="text-sm text-muted-light dark:text-muted-dark uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="text-xl md:text-2xl font-bold text-primary">
        {formatCurrency(value)}
      </div>
    </div>
  )
}

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricItem
        label="Por segundo"
        value={BUDGET_2026.perSecond}
        delay="0.1s"
      />
      <MetricItem
        label="Por minuto"
        value={BUDGET_2026.perMinute}
        delay="0.2s"
      />
      <MetricItem
        label="Por hora"
        value={BUDGET_2026.perHour}
        delay="0.3s"
      />
      <MetricItem
        label="Por dia"
        value={BUDGET_2026.perDay}
        delay="0.4s"
      />
    </div>
  )
}
