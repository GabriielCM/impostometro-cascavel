'use client'

import { useDateTime } from '@/hooks/useDateTime'

export function DateTime() {
  const { date, time } = useDateTime()

  return (
    <div className="text-right">
      <div className="text-sm text-muted-light dark:text-muted-dark capitalize">
        {date}
      </div>
      <div className="text-2xl font-digital text-primary tracking-wider">
        {time}
      </div>
    </div>
  )
}
