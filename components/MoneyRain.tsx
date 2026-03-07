'use client'

import { useState, useEffect } from 'react'

const ICONS = [
  '/images/icons/money-with-wings-svgrepo-com.svg',
  '/images/icons/money-mouth-face-svgrepo-com.svg',
  '/images/icons/coin-money-svgrepo-com.svg',
  '/images/icons/christmas-tree-svgrepo-com.svg',
]

interface BillConfig {
  id: number
  left: number
  duration: number
  delay: number
  size: number
  opacity: number
  spinDuration: number
  icon: string
}

const BASE_BILL_COUNT = 15

function generateBills(count: number): BillConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 95,
    duration: 8 + Math.random() * 10,
    delay: -(Math.random() * 15),
    size: 30 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.15,
    spinDuration: 4 + Math.random() * 4,
    icon: ICONS[Math.floor(Math.random() * ICONS.length)],
  }))
}

export function MoneyRain() {
  const [bills, setBills] = useState<BillConfig[]>([])
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    function updateHeight() {
      const height = document.documentElement.scrollHeight
      setPageHeight(height)

      const viewportHeight = window.innerHeight
      const ratio = Math.max(1, height / viewportHeight)
      const count = Math.ceil(BASE_BILL_COUNT * ratio)
      setBills(generateBills(count))
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(document.body)

    return () => observer.disconnect()
  }, [])

  if (bills.length === 0 || pageHeight === 0) return null

  return (
    <div
      className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden"
      style={{
        height: `${pageHeight}px`,
        ['--page-height' as string]: `${pageHeight}px`,
      }}
      aria-hidden="true"
    >
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="absolute top-0 money-bill"
          style={{
            left: `${bill.left}%`,
            opacity: bill.opacity,
            animationDuration: `${bill.duration}s`,
            animationDelay: `${bill.delay}s`,
          }}
        >
          <div
            className="money-bill-inner"
            style={{
              animationDuration: `${bill.spinDuration}s`,
              animationDelay: `${bill.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bill.icon}
              alt=""
              width={bill.size}
              height={bill.size}
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
