'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { BUDGET_2026, COUNTER_CONFIG } from '@/lib/constants'
import { easeOutCubic } from '@/lib/utils'

interface UseCounterReturn {
  value: number
  isAnimating: boolean
  formattedValue: string
}

export function useCounter(): UseCounterReturn {
  const [value, setValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Calcula o valor real baseado no tempo decorrido
  const calculateRealValue = useCallback((): number => {
    const now = new Date()
    const elapsed = now.getTime() - BUDGET_2026.startDate.getTime()
    const seconds = elapsed / 1000
    return Math.max(0, seconds * BUDGET_2026.perSecond)
  }, [])

  // Animação inicial do zero até o valor atual
  useEffect(() => {
    const targetValue = calculateRealValue()
    const duration = COUNTER_CONFIG.animationDuration
    startTimeRef.current = Date.now()

    const animateToTarget = () => {
      const elapsed = Date.now() - (startTimeRef.current || 0)
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      const currentValue = targetValue * easedProgress
      setValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateToTarget)
      } else {
        setIsAnimating(false)
      }
    }

    animateToTarget()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [calculateRealValue])

  // Atualização contínua após animação inicial
  useEffect(() => {
    if (isAnimating) return

    const interval = setInterval(() => {
      setValue(prev => prev + (BUDGET_2026.perSecond / (1000 / COUNTER_CONFIG.updateInterval)))
    }, COUNTER_CONFIG.updateInterval)

    return () => clearInterval(interval)
  }, [isAnimating])

  // Formata o valor para exibição (sem casas decimais)
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.floor(value))

  return { value, isAnimating, formattedValue }
}

// Hook para valores individuais de impostos
export function useTaxCounter(percentage: number): number {
  const { value } = useCounter()
  return value * (percentage / 100)
}
