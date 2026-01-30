'use client'

import { useCounter } from '@/hooks/useCounter'
import { Digit } from './Digit'

export function Counter() {
  const { formattedValue, isAnimating } = useCounter()
  const digits = formattedValue.split('')

  return (
    <div className="relative">
      {/* Label superior */}
      <div className="text-center mb-2">
        <span className="text-muted-light dark:text-muted-dark text-sm uppercase tracking-widest">
          Arrecadação Total 2026
        </span>
      </div>

      {/* Contador principal */}
      <div className="flex items-center justify-center">
        <span className="text-primary text-3xl md:text-4xl lg:text-5xl mr-2 font-bold">
          R$
        </span>
        <div
          className="font-digital text-counter md:text-counter-lg lg:text-counter-xl text-primary counter-glow"
        >
          {digits.map((digit, index) => (
            <Digit key={index} value={digit} isAnimating={isAnimating} />
          ))}
        </div>
      </div>

      {/* Indicador de tempo real */}
      <div className="text-center mt-3">
        <span className="inline-flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Atualizado em tempo real
        </span>
      </div>
    </div>
  )
}
