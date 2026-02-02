'use client'

import { ChangeEvent } from 'react'

interface DateInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  className?: string
}

export function DateInput({ value, onChange, error, placeholder = 'DD/MM/AAAA', className = '' }: DateInputProps) {
  const formatDate = (input: string): string => {
    // Remove tudo que não é número
    const numbers = input.replace(/\D/g, '')

    // Aplica a máscara DD/MM/AAAA
    if (numbers.length <= 2) {
      return numbers
    }
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value)
    onChange(formatted)
  }

  const baseClasses = `w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm
    border text-white placeholder-white/50
    focus:outline-none focus:border-primary transition-colors`

  const errorClasses = error ? 'border-red-500' : 'border-white/20'

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={10}
        className={`${baseClasses} ${errorClasses} ${className}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

// Função utilitária para validar data
export function isValidDate(dateString: string): boolean {
  if (dateString.length !== 10) return false

  const [day, month, year] = dateString.split('/').map(Number)

  if (!day || !month || !year) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  if (year < 1900 || year > new Date().getFullYear()) return false

  // Verifica se a data é válida
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}
