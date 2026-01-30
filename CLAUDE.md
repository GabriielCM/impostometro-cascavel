# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Impostômetro Cascavel - Real-time municipal tax collection tracker for Cascavel, PR (Brazil). Displays animated counter showing estimated tax collection based on the 2026 annual budget (R$ 2,595,000,000).

## Development Commands

```bash
pnpm dev      # Start development server (port 3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Package Manager**: pnpm

## Architecture

### Key Directories

- `app/` - Next.js App Router pages and layouts
- `components/` - React components (Counter, Header, Cards, etc.)
- `hooks/` - Custom React hooks (useCounter, useTheme, useDateTime)
- `lib/` - Utilities and constants
- `public/fonts/` - Digital-7 font for counter display

### Data Flow

1. `lib/constants.ts` contains budget data and tax breakdown percentages
2. `hooks/useCounter.ts` calculates real-time collection using `requestAnimationFrame`
3. `components/Counter/` displays animated digits with odometer-style transitions
4. Tax cards use `useTaxCounter` hook which multiplies counter value by category percentage

### Budget Configuration (`lib/constants.ts`)

- Total 2026 Budget: R$ 2,595,000,000
- Collection rate: R$ 82.29/second
- Tax breakdown: IPTU (8%), ISS (12%), ITBI (3%), Taxas (5%), Transferências (72%)

## Styling Conventions

### Custom Tailwind Theme

- Primary color: `#FFD700` (gold)
- Font families: `font-digital` (Digital7), `font-sans` (Inter)
- Counter sizes: `text-counter` (4rem), `text-counter-lg` (5rem), `text-counter-xl` (6rem)

### Dark Mode

Uses Tailwind `darkMode: 'class'` strategy. Theme toggle persists to localStorage.

## Component Patterns

- Client components marked with `'use client'` directive
- Counter uses CSS transforms for smooth digit animations
- Modal uses `event.stopPropagation()` to prevent closing on content click

## Path Alias

`@/*` maps to project root (e.g., `@/components/Counter`)
