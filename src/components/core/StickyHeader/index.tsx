'use client'

import { useRef, useEffect } from 'react'

import type { ReactNode } from 'react'

const StickyHeader = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      document.documentElement.style.setProperty('--sticky-top', `${el.offsetHeight}px`)
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()

    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className="sticky top-0 z-40">
      {children}
    </div>
  )
}

export default StickyHeader
