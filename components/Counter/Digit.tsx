'use client'

interface DigitProps {
  value: string
  isAnimating?: boolean
}

export function Digit({ value }: DigitProps) {
  // Se não é um dígito numérico (ponto, vírgula), renderiza estático
  if (!/\d/.test(value)) {
    return (
      <span className="digit-separator">
        {value}
      </span>
    )
  }

  return (
    <span className="digit-container">
      <span className="digit">{value}</span>
    </span>
  )
}
