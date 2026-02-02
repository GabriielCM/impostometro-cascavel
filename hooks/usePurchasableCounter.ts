'use client'

import { useCounter } from './useCounter'
import type { PurchasableItem } from '@/lib/constants'

interface UsePurchasableCounterReturn {
  quantity: number
  progress: number
  remaining: number
  value: number
  // Para itens de locação (rental)
  years?: number
  remainingMonths?: number
}

export function usePurchasableCounter(item: PurchasableItem): UsePurchasableCounterReturn {
  const { value } = useCounter()

  const quantity = Math.floor(value / item.unitCost)
  const remainder = value % item.unitCost
  const progress = (remainder / item.unitCost) * 100
  const remaining = item.unitCost - remainder

  // Para itens de locação, calcular anos e meses
  if (item.type === 'rental') {
    const totalMonths = quantity
    const years = Math.floor(totalMonths / 12)
    const remainingMonths = totalMonths % 12

    return {
      quantity,
      progress,
      remaining,
      value,
      years,
      remainingMonths,
    }
  }

  return {
    quantity,
    progress,
    remaining,
    value,
  }
}
