'use client'

import { Header } from '@/components/Header'
import { Counter } from '@/components/Counter'
import { MetricsCards, TaxCards } from '@/components/Cards'
import { ShareButtons } from '@/components/ShareButtons'
import { MethodologyModal } from '@/components/MethodologyModal'
import { Footer } from '@/components/Footer'
import { DateTime } from '@/components/Header/DateTime'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Data/hora mobile */}
          <div className="sm:hidden text-center">
            <DateTime />
          </div>

          {/* Contador principal */}
          <section className="py-8 md:py-12">
            <Counter />
          </section>

          {/* Cards de métricas */}
          <section>
            <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Taxa de Arrecadação
            </h2>
            <MetricsCards />
          </section>

          {/* Cards de impostos */}
          <section>
            <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Composição da Receita
            </h2>
            <TaxCards />
          </section>

          {/* Ações */}
          <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
            <MethodologyModal />
            <ShareButtons />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
