'use client'

import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-surface-light dark:bg-surface-dark rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {/* Indicador */}
      <span
        className={`
          absolute top-1 w-5 h-5 bg-primary rounded-full
          transition-transform duration-300 ease-in-out
          flex items-center justify-center text-xs
          ${isDark ? 'translate-x-7' : 'translate-x-1'}
        `}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
