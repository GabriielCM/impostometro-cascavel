'use client'

interface CircularTimerProps {
  value: number
  label: string
  formatValue?: (value: number) => string
}

export function CircularTimer({ value, label, formatValue }: CircularTimerProps) {
  const size = 140
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2

  const displayValue = formatValue
    ? formatValue(value)
    : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="flex flex-col items-center">
      <div className="relative outline-none" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="outline-none"
        >
          {/* Círculo tracejado com animação de pulso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#FFD700"
            strokeWidth={strokeWidth}
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-pulse-ring"
          />
        </svg>

        {/* Valor centralizado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg font-bold text-primary"
            style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
          >
            {displayValue}
          </span>
        </div>
      </div>

      {/* Label abaixo */}
      <span className="mt-2 text-sm text-muted-light dark:text-muted-dark font-medium">
        {label}
      </span>

      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
