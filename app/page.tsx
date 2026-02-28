'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Counter } from '@/components/Counter'
import { MetricsCards, TaxCards } from '@/components/Cards'
import { ShareButtons } from '@/components/ShareButtons'
import { MethodologyModal } from '@/components/MethodologyModal'
import { Footer } from '@/components/Footer'
import { PurchasableCarousel } from '@/components/PurchasableItems'
import { DateTime } from '@/components/Header/DateTime'
import { LandingPage } from '@/components/LandingPage'
import { LeadFormModal } from '@/components/LeadFormModal'
import { useLeadGate } from '@/hooks/useLeadGate'

export default function Home() {
  const { hasAccess, isLoading, grantAccess } = useLeadGate()
  const [showForm, setShowForm] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSuccess = () => {
    setIsTransitioning(true)
    setShowForm(false)
    // Aguarda um pouco para a transição fade
    setTimeout(() => {
      grantAccess()
      setIsTransitioning(false)
    }, 300)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark">
        <div className="animate-pulse text-primary text-2xl font-digital">
          Carregando...
        </div>
      </div>
    )
  }

  // Versão Short (Landing) - se não tem acesso
  if (!hasAccess) {
    return (
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <LandingPage onSaibaMais={() => setShowForm(true)} />
        <LeadFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      </div>
    )
  }

  // Versão Completa - se tem acesso
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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

          {/* Isso já pagaria - Carrossel de itens compráveis */}
          <PurchasableCarousel />

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
