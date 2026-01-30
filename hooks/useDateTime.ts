'use client'

import { useState, useEffect } from 'react'
import { formatDate, formatTime } from '@/lib/utils'

interface UseDateTimeReturn {
  date: string
  time: string
  now: Date
}

export function useDateTime(): UseDateTimeReturn {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    date: formatDate(now),
    time: formatTime(now),
    now,
  }
}
