'use client'

import { DateTime } from './DateTime'
import { ThemeToggle } from '../ThemeToggle'

export function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo e título */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Brasão de Cascavel */}
          <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brasao-cascavel.svg"
              alt="Brasão de Cascavel"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-light dark:text-text-dark">
              Impostômetro{' '}
              <span className="text-primary">Cascavel</span>
            </h1>
          </div>
        </div>

        {/* Lado direito: Data/hora e toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:block">
            <DateTime />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
