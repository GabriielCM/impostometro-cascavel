'use client'

import { useCounter } from '@/hooks/useCounter'
import { Digit } from './Digit'

export function Counter() {
  const { formattedValue, isAnimating } = useCounter()
  const digits = formattedValue.split('')

  return (
    <div className="relative flex flex-col items-center mt-12 sm:mt-16">
      {/* Caricatura - corpo atrás */}
      <img
        src="/images/caricatura.png"
        alt="Caricatura"
        className="absolute z-0 w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] bottom-[52%] sm:bottom-[35%] left-1/2 -translate-x-1/2"
      />

      {/* Contador sem container */}
      <div className="relative z-10">
        {/* Contador principal */}
        <div className="flex items-center justify-center">
          <span className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl mr-1 sm:mr-2 font-bold">
            R$
          </span>
          <div className="font-digital text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary counter-glow whitespace-nowrap">
            {digits.map((digit, index) => (
              <Digit key={index} value={digit} isAnimating={isAnimating} />
            ))}
          </div>
        </div>

        {/* Label abaixo do contador */}
        <div className="text-center mt-3">
          <span className="text-gray-400 dark:text-gray-400 text-sm sm:text-base md:text-lg uppercase tracking-widest">
            Arrecadação Total 2026
          </span>
        </div>

        {/* Indicador de tempo real */}
        <div className="text-center mt-2">
          <span className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            Atualizado em tempo real
          </span>
        </div>
      </div>

      {/* Caricatura - apenas mãos na frente */}
      <img
        src="/images/caricatura.png"
        alt=""
        aria-hidden="true"
        className="absolute z-20 w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] bottom-[52%] sm:bottom-[35%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ clipPath: 'inset(60% 0 0 0)' }}
      />
    </div>
  )
}
