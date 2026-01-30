# Impostômetro Cascavel

Acompanhe em tempo real a arrecadação municipal de Cascavel-PR.

## Dados

- **Receita Total 2026**: R$ 2.595.000.000,00
- **Por segundo**: R$ 82,29
- **Por minuto**: R$ 4.937,21
- **Por hora**: R$ 296.232,88
- **Por dia**: R$ 7.109.589,04

Fonte: [LOA 2026 - Câmara Municipal de Cascavel](https://www.camaracascavel.pr.gov.br)

## Setup

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Baixar assets necessários

#### Fonte Digital-7
1. Baixe de: https://www.dafont.com/digital-7.font
2. Extraia o arquivo `digital-7.ttf`
3. Coloque em `public/fonts/digital-7.ttf`

#### Brasão de Cascavel
1. Baixe o brasão oficial de Cascavel
2. Salve como `public/brasao-cascavel.png` (recomendado: 200x200px ou maior)

### 3. Configurar Google Analytics (opcional)

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-SEU-ID-AQUI
```

### 4. Executar em desenvolvimento

```bash
pnpm dev
```

Acesse: http://localhost:3000

## Deploy na Vercel

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure a variável de ambiente `NEXT_PUBLIC_GA_ID` (se usar Analytics)
4. Deploy!

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- pnpm

## Licença

MIT
