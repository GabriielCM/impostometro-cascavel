'use client'

import { useState, FormEvent } from 'react'
import { PhoneInput } from '@/components/ui/PhoneInput'
import { DateInput, isValidDate } from '@/components/ui/DateInput'
import { Toast } from '@/components/ui/Toast'

interface LeadFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface FormData {
  nome: string
  email: string
  cidade: string
  dataNascimento: string
  telefone: string
}

interface FormErrors {
  nome?: string
  email?: string
  cidade?: string
  dataNascimento?: string
  telefone?: string
  general?: string
}

export function LeadFormModal({ isOpen, onClose, onSuccess }: LeadFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showCloseWarning, setShowCloseWarning] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cidade: '',
    dataNascimento: '',
    telefone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Nome validation
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Cidade validation
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória'
    } else if (formData.cidade.trim().length < 2) {
      newErrors.cidade = 'Cidade deve ter pelo menos 2 caracteres'
    }

    // Data nascimento validation
    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória'
    } else if (!isValidDate(formData.dataNascimento)) {
      newErrors.dataNascimento = 'Data inválida'
    }

    // Telefone validation
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório'
    } else if (formData.telefone.length < 10) {
      newErrors.telefone = 'Telefone inválido'
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

      setShowToast(true)
      setFormData({ nome: '', email: '', cidade: '', dataNascimento: '', telefone: '' })

      // Espera o toast e depois transiciona para o site completo
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } catch {
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

  const handleCloseAttempt = () => {
    setShowCloseWarning(true)
  }

  const confirmClose = () => {
    setShowCloseWarning(false)
    onClose()
  }

  const cancelClose = () => {
    setShowCloseWarning(false)
  }

  if (!isOpen) return null

  return (
    <>
      {showToast && (
        <Toast
          message="Cadastro realizado com sucesso!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Modal overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4
          bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleCloseAttempt}
      >
        {/* Modal content - Glassmorphism */}
        <div
          className={`relative w-full max-w-md
            bg-white/10 backdrop-blur-xl
            border border-white/20
            rounded-2xl shadow-2xl
            p-6 md:p-8
            transform transition-all duration-300
            ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão fechar */}
          <button
            onClick={handleCloseAttempt}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
              rounded-full bg-white/10 hover:bg-white/20
              transition-colors text-white/80 hover:text-white"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Cadastre-se
            </h2>
            <p className="text-white/70 text-sm">
              Preencha seus dados para acessar o Impostômetro completo
            </p>
          </div>

          {/* Warning dialog */}
          {showCloseWarning && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-2xl">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-6 mx-4 text-center">
                <p className="text-white font-medium mb-4">
                  O preenchimento é obrigatório para acessar o site completo.
                </p>
                <p className="text-white/70 text-sm mb-4">
                  Deseja realmente sair?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={cancelClose}
                    className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Continuar
                  </button>
                  <button
                    onClick={confirmClose}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Campo Nome */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Nome completo *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm
                  border ${errors.nome ? 'border-red-500' : 'border-white/20'}
                  text-white placeholder-white/50
                  focus:outline-none focus:border-primary transition-colors`}
                placeholder="Seu nome"
              />
              {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm
                  border ${errors.email ? 'border-red-500' : 'border-white/20'}
                  text-white placeholder-white/50
                  focus:outline-none focus:border-primary transition-colors`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Campo Cidade */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Cidade *
              </label>
              <input
                type="text"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm
                  border ${errors.cidade ? 'border-red-500' : 'border-white/20'}
                  text-white placeholder-white/50
                  focus:outline-none focus:border-primary transition-colors`}
                placeholder="Cascavel"
              />
              {errors.cidade && <p className="text-red-400 text-xs mt-1">{errors.cidade}</p>}
            </div>

            {/* Campo Data Nascimento */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Data de nascimento *
              </label>
              <DateInput
                value={formData.dataNascimento}
                onChange={(value) => handleInputChange('dataNascimento', value)}
                error={errors.dataNascimento}
              />
            </div>

            {/* Campo Telefone */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Telefone *
              </label>
              <PhoneInput
                value={formData.telefone}
                onChange={(value) => handleInputChange('telefone', value)}
                error={errors.telefone}
              />
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 mt-2
                bg-primary text-black font-bold
                rounded-lg
                hover:bg-primary/90
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                shadow-lg shadow-primary/25"
            >
              {isSubmitting ? 'Enviando...' : 'Acessar Impostômetro'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
