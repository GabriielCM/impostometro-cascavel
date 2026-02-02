'use client'

import { useState } from 'react'
import { BUDGET_2026, PURCHASABLE_ITEMS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export function MethodologyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botão de abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Saiba mais
      </button>

      {/* Modal overlay */}
      <div
        className={`modal-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
              Metodologia
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Conteúdo */}
          <div className="space-y-4 text-sm text-muted-light dark:text-muted-dark">
            <section>
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                Sobre o Impostômetro
              </h3>
              <p>
                Este impostômetro simula a arrecadação municipal de Cascavel-PR em tempo real,
                baseando-se na Lei Orçamentária Anual (LOA) de 2026.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                Dados Utilizados
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Receita total prevista:</strong> {formatCurrency(BUDGET_2026.total)}
                </li>
                <li>
                  <strong>Arrecadação por segundo:</strong> {formatCurrency(BUDGET_2026.perSecond)}
                </li>
                <li>
                  <strong>Arrecadação por minuto:</strong> {formatCurrency(BUDGET_2026.perMinute)}
                </li>
                <li>
                  <strong>Arrecadação por hora:</strong> {formatCurrency(BUDGET_2026.perHour)}
                </li>
                <li>
                  <strong>Arrecadação por dia:</strong> {formatCurrency(BUDGET_2026.perDay)}
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                Cálculo
              </h3>
              <p>
                A projeção assume um fluxo linear de arrecadação, dividindo o total anual previsto
                pelo número de segundos no ano (365 dias × 24 horas × 60 minutos × 60 segundos).
              </p>
              <p className="mt-2">
                Na prática, o ritmo real de arrecadação pode variar conforme sazonalidades
                e repasses, mas esta estimativa fornece uma visualização intuitiva do volume
                de recursos que o município recebe.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                Referências dos Valores
              </h3>
              <p className="mb-2">
                Os valores utilizados na seção &ldquo;Isso já pagaria&rdquo; foram obtidos de licitações e contratos públicos:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {PURCHASABLE_ITEMS.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}:</strong> {formatCurrency(item.unitCost)}/{item.unit}
                    <br />
                    <span className="text-xs opacity-75">
                      {item.reference} - {item.source}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                Fontes
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.camaracascavel.pr.gov.br/comunicacao/noticias/prefeito-apresenta-ldo-previsao-do-orcamento-para-2026-e-de-r-2-595-bilhoes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-words"
                  >
                    Câmara Municipal de Cascavel - LDO 2026
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.camaracascavel.pr.gov.br/comunicacao/noticias/orcamento-projeto-da-loa-2026-e-protocolado--educacao-e-saude-tem-mais-de-r-500-mi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-words"
                  >
                    Câmara Municipal de Cascavel - LOA 2026
                  </a>
                </li>
              </ul>
            </section>
          </div>

          {/* Footer do modal */}
          <div className="mt-6 pt-4 border-t border-surface-light dark:border-surface-dark">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full btn-primary"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
