'use client'

import { usePurchasableCounter } from '@/hooks/usePurchasableCounter'
import { formatCompactCurrency, formatLargeNumber } from '@/lib/utils'
import type { PurchasableItem } from '@/lib/constants'

interface PurchasableCardProps {
  item: PurchasableItem
}

export function PurchasableCard({ item }: PurchasableCardProps) {
  const { quantity, progress, remaining, years, remainingMonths } = usePurchasableCounter(item)

  const renderQuantityLabel = () => {
    if (item.type === 'rental' && years !== undefined && remainingMonths !== undefined) {
      if (years === 0) {
        return (
          <span className="text-sm text-muted-light dark:text-muted-dark">
            {quantity} {quantity === 1 ? item.unit : item.unitPlural}
          </span>
        )
      }
      return (
        <span className="text-sm text-muted-light dark:text-muted-dark">
          {years} {years === 1 ? 'ano' : 'anos'}
          {remainingMonths > 0 && ` e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`}
        </span>
      )
    }
    return (
      <span className="text-sm text-muted-light dark:text-muted-dark">
        {quantity === 1 ? item.unit : item.unitPlural}
      </span>
    )
  }

  return (
    <div className="purchasable-card card flex flex-col h-full min-w-0">
      <div className="flex items-start gap-4 mb-3">
        <div className="purchasable-image-container flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="purchasable-image w-20 h-20 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/images/items/placeholder.svg'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-text-light dark:text-text-dark line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-primary font-digital">
              {formatLargeNumber(quantity)}
            </span>
            {renderQuantityLabel()}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-light dark:text-muted-dark">
            Progresso para próxima
          </span>
          <span className="text-xs font-medium text-primary">
            {Math.floor(progress)}%
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-light dark:text-muted-dark mt-2">
          Faltam {formatCompactCurrency(remaining)}
        </p>
      </div>
    </div>
  )
}
