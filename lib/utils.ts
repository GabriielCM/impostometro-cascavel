// Formata valor em reais (R$)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Formata valor sem símbolo de moeda (para o contador)
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

// Separa número em dígitos para animação
export function splitNumber(value: number, decimals: number = 2): string[] {
  const formatted = formatNumber(value, decimals)
  return formatted.split('')
}

// Formata data em português
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Formata hora
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

// Calcula valor arrecadado desde o início do ano
export function calculateCollectedAmount(startDate: Date, perSecond: number): number {
  const now = new Date()
  const elapsed = now.getTime() - startDate.getTime()
  const seconds = elapsed / 1000
  return Math.max(0, seconds * perSecond)
}

// Calcula porcentagem do ano
export function calculateYearProgress(): number {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1)
  const elapsed = now.getTime() - startOfYear.getTime()
  const total = endOfYear.getTime() - startOfYear.getTime()
  return (elapsed / total) * 100
}

// Gera URL de compartilhamento
export function getShareUrl(platform: 'twitter' | 'facebook' | 'whatsapp'): string {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = 'Veja quanto Cascavel já arrecadou em 2026! Impostômetro em tempo real.'

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    default:
      return url
  }
}

// Easing function para animação
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
