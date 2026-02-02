import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  nome: string
  email: string
  cidade: string
  dataNascimento: string
  telefone: string
}

function validateLead(data: LeadData): string | null {
  // Nome validation
  if (!data.nome || data.nome.trim().length < 2) {
    return 'Nome inválido'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    return 'Email inválido'
  }

  // Cidade validation
  if (!data.cidade || data.cidade.trim().length < 2) {
    return 'Cidade inválida'
  }

  // Data nascimento validation (DD/MM/AAAA)
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!data.dataNascimento || !dateRegex.test(data.dataNascimento)) {
    return 'Data de nascimento inválida'
  }

  // Telefone validation (aceita formato internacional)
  const phoneDigits = data.telefone?.replace(/\D/g, '') || ''
  if (phoneDigits.length < 10) {
    return 'Telefone inválido'
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Validação server-side
    const validationError = validateLead(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    // Verificar se a URL do Google Script está configurada
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL não configurada')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      )
    }

    // Enviar para Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Falha ao salvar no Google Sheets')
    }

    return NextResponse.json(
      { success: true, message: 'Lead cadastrado com sucesso' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao processar lead:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
