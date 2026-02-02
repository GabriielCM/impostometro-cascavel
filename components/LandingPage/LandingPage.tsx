'use client'

import { Header } from '@/components/Header'
import { Counter } from '@/components/Counter'
import { CircularTimersGrid } from './CircularTimersGrid'

interface LandingPageProps {
  onSaibaMais: () => void
}

export function LandingPage({ onSaibaMais }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark">
      {/* Header com z-index alto para ficar sobre a caricatura */}
      <div className="relative z-30">
        <Header />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 pt-4">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-8">
          {/* Contador principal com caricatura */}
          <section className="w-full mt-0">
            <Counter />
          </section>

          {/* Botão Saiba Mais */}
          <button
            onClick={onSaibaMais}
            className="px-8 py-4 bg-primary text-black font-bold text-lg
              rounded-xl hover:bg-primary/90
              transition-all duration-200
              shadow-lg shadow-primary/25
              hover:shadow-xl hover:shadow-primary/30
              hover:scale-105
              flex items-center gap-3"
          >
            <span>Saiba mais</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Temporizadores circulares 2x2 */}
          <section className="mt-4">
            <h2 className="text-center text-lg font-semibold text-text-light dark:text-text-dark mb-6">
              Taxa de Arrecadação
            </h2>
            <CircularTimersGrid />
          </section>
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="py-4 px-4 text-center">
        <p className="text-xs text-muted-light dark:text-muted-dark">
          {new Date().getFullYear()} Impostômetro Cascavel
        </p>
      </footer>
    </div>
  )
}
