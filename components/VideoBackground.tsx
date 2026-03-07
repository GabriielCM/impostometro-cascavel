'use client'

import { useEffect, useRef } from 'react'

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-top"
        style={{ opacity: 0.07 }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
