'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'impostometro_lead_registered'

interface UseLeadGateReturn {
  hasAccess: boolean
  isLoading: boolean
  grantAccess: () => void
  revokeAccess: () => void
}

export function useLeadGate(): UseLeadGateReturn {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica localStorage ao montar
    const stored = localStorage.getItem(STORAGE_KEY)
    setHasAccess(stored === 'true')
    setIsLoading(false)
  }, [])

  const grantAccess = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setHasAccess(true)
  }

  const revokeAccess = () => {
    localStorage.removeItem(STORAGE_KEY)
    setHasAccess(false)
  }

  return { hasAccess, isLoading, grantAccess, revokeAccess }
}
