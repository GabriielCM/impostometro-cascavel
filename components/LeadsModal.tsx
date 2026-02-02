'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  email: string
  telefone: string
  cidade: string
}

interface FormErrors {
  email?: string
  telefone?: string
  cidade?: string
  general?: string
}

export function LeadsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    telefone: '',
    cidade: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Telefone validation (Brazilian format - 10 or 11 digits)
    const phoneDigits = formData.telefone.replace(/\D/g, '')
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      newErrors.telefone = 'Telefone inválido'
    }

    // Cidade validation
    if (!formData.cidade) {
      newErrors.cidade = 'Cidade é obrigatória'
    } else if (formData.cidade.length < 2) {
      newErrors.cidade = 'Cidade deve ter pelo menos 2 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao enviar')
      }

      setIsSuccess(true)
      setFormData({ email: '', telefone: '', cidade: '' })

      // Fecha modal após 2 segundos
      setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      setErrors({ general: 'Erro ao enviar. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleClose = () => {
    setIsOpen(false)
    setErrors({})
    setIsSuccess(false)
  }

  return (
    <>
      {/* Botão de abrir */}
      <button onClick={() => setIsOpen(true)} className="btn-primary inline-flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        Receber atualizações
      </button>

      {/* Modal overlay */}
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
              Receber Atualizações
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center">
              <svg
                className="w-16 h-16 mx-auto text-primary mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-text-light dark:text-text-dark font-semibold">
                Cadastro realizado com sucesso!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-light dark:text-muted-dark mb-4">
                Cadastre-se para receber informações sobre a arrecadação de Cascavel.
              </p>

              {errors.general && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-500 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Campo Email */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark
                    border ${errors.email ? 'border-red-500' : 'border-primary/20'}
                    text-text-light dark:text-text-dark
                    focus:outline-none focus:border-primary transition-colors`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Campo Telefone */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark
                    border ${errors.telefone ? 'border-red-500' : 'border-primary/20'}
                    text-text-light dark:text-text-dark
                    focus:outline-none focus:border-primary transition-colors`}
                  placeholder="(45) 99999-9999"
                />
                {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
              </div>

              {/* Campo Cidade */}
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark
                    border ${errors.cidade ? 'border-red-500' : 'border-primary/20'}
                    text-text-light dark:text-text-dark
                    focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Cascavel"
                />
                {errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>}
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Cadastrar'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
