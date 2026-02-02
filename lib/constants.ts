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

// Tipos para itens compráveis
export type PurchasableItemType = 'default' | 'rental'

export interface PurchasableItem {
  id: string
  name: string
  unitCost: number
  unit: string
  unitPlural: string
  image: string
  reference: string
  source: string
  type: PurchasableItemType
}

// Itens que poderiam ser comprados/construídos com o valor arrecadado
// Ordenados por valor unitário (maior primeiro)
export const PURCHASABLE_ITEMS: PurchasableItem[] = [
  {
    id: 'super-cmei',
    name: 'Super CMEI',
    unitCost: 7_200_000,
    unit: 'unidade',
    unitPlural: 'unidades',
    image: '/images/items/super-cmei.svg',
    reference: 'Construção do Super CMEI Prof. Paulo Marques',
    source: 'Prefeitura de Cascavel',
    type: 'default',
  },
  {
    id: 'usf',
    name: 'USF',
    unitCost: 2_000_000,
    unit: 'unidade',
    unitPlural: 'unidades',
    image: '/images/items/usf.svg',
    reference: 'Construção da USF Santo Inácio',
    source: 'Prefeitura de Cascavel',
    type: 'default',
  },
  {
    id: 'viatura-caminhonete',
    name: 'Locação caminhonete GCM',
    unitCost: 10_437,
    unit: 'mês',
    unitPlural: 'meses',
    image: '/images/items/viatura-caminhonete.svg',
    reference: 'Viatura para Guarda Municipal',
    source: 'Pregão Eletrônico nº 124/2025',
    type: 'rental',
  },
  {
    id: 'viatura-suv',
    name: 'Locação SUV GCM',
    unitCost: 7_418,
    unit: 'mês',
    unitPlural: 'meses',
    image: '/images/items/viatura-suv.svg',
    reference: 'Viatura para Guarda Municipal',
    source: 'Pregão Eletrônico nº 124/2025',
    type: 'rental',
  },
  {
    id: 'poste-luz',
    name: 'Poste de Luz',
    unitCost: 726.65,
    unit: 'poste',
    unitPlural: 'postes',
    image: '/images/items/poste-luz.svg',
    reference: 'Iluminação pública',
    source: 'Pregão Eletrônico nº 100/2025',
    type: 'default',
  },
  {
    id: 'pavimentacao',
    name: 'Pavimentação',
    unitCost: 256.95,
    unit: 'm²',
    unitPlural: 'm²',
    image: '/images/items/pavimentacao.svg',
    reference: 'Pavimentação asfáltica',
    source: 'Concorrência Pública 21/2025',
    type: 'default',
  },
] as const
