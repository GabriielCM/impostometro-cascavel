// Dados do Orçamento Municipal de Cascavel 2026
// Fonte: LOA 2026 - Câmara Municipal de Cascavel
// https://www.camaracascavel.pr.gov.br

export const BUDGET_2026 = {
  total: 2_595_000_000, // R$ 2,595 bilhões
  perSecond: 82.29,
  perMinute: 4937.21,
  perHour: 296232.88,
  perDay: 7109589.04,
  startDate: new Date('2026-01-01T00:00:00-03:00'),
  year: 2026,
} as const

// Composição estimada dos impostos (percentuais aproximados)
export const TAX_BREAKDOWN = {
  iptu: {
    name: 'IPTU',
    fullName: 'Imposto Predial e Territorial Urbano',
    percentage: 8,
    description: 'Imposto sobre propriedades urbanas',
  },
  iss: {
    name: 'ISS',
    fullName: 'Imposto Sobre Serviços',
    percentage: 12,
    description: 'Imposto sobre prestação de serviços',
  },
  itbi: {
    name: 'ITBI',
    fullName: 'Imposto de Transmissão de Bens Imóveis',
    percentage: 3,
    description: 'Imposto sobre compra e venda de imóveis',
  },
  taxas: {
    name: 'Taxas',
    fullName: 'Taxas e Contribuições',
    percentage: 5,
    description: 'Taxas de serviços municipais',
  },
  transferencias: {
    name: 'Transferências',
    fullName: 'Transferências Federais e Estaduais',
    percentage: 72,
    description: 'FPM, ICMS, IPVA, Fundos',
  },
} as const

// Informações sobre o município
export const CITY_INFO = {
  name: 'Cascavel',
  state: 'Paraná',
  country: 'Brasil',
  population: 336000, // aproximado
} as const

// Configurações do contador
export const COUNTER_CONFIG = {
  updateInterval: 100, // ms
  animationDuration: 2500, // ms para animação inicial (mais suave)
  decimalPlaces: 0,
} as const
