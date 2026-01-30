'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 px-4 border-t border-surface-light dark:border-surface-dark">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-light dark:text-muted-dark">
          {currentYear} Impostômetro Cascavel.
          Dados baseados na LOA 2026.
        </p>
      </div>
    </footer>
  )
}
