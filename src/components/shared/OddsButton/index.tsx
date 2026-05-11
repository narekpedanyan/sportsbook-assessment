'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { Selection } from '@/types'

interface OddsButtonProps {
  selection: Selection
  suspended: boolean
  selected?: boolean
  onClick?: () => void
}

const OddsButton = memo(
  function OddsButton({ selection, suspended, selected = false, onClick }: OddsButtonProps) {
    const prevOdds = useRef(selection.odds)
    const [flash, setFlash] = useState<'shorten' | 'drift' | null>(null)

    useEffect(() => {
      if (suspended || selected) {
        prevOdds.current = selection.odds
        setFlash(null)
        return
      }
      if (Math.abs(selection.odds - prevOdds.current) < 0.001) return
      const direction = selection.odds < prevOdds.current ? 'shorten' : 'drift'
      prevOdds.current = selection.odds
      setFlash(direction)
      const timeoutId = setTimeout(() => setFlash(null), 600)
      return () => {
        clearTimeout(timeoutId)
        setFlash(null)
      }
    }, [selection.odds, suspended, selected])

    return (
      <button
        disabled={suspended}
        onClick={onClick}
        aria-pressed={suspended ? undefined : selected}
        aria-label={suspended ? 'Market suspended' : undefined}
        className={cn(
          'relative min-w-16 overflow-hidden rounded-md border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          selected
            ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
            : 'border-border bg-muted/50 hover:bg-muted hover:border-primary/50 cursor-pointer hover:shadow-sm',
        )}
      >
        {flash && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0',
              flash === 'shorten' ? 'animate-odds-shorten' : 'animate-odds-drift',
            )}
          />
        )}

        <span className="relative z-10 flex flex-col items-center gap-0.5">
          <span
            className={cn(
              'text-[10px] leading-none font-medium uppercase opacity-60',
              suspended && 'invisible',
            )}
          >
            {selection.label}
          </span>
          <span className={cn('text-sm leading-none font-bold', suspended && 'invisible')}>
            {selection.odds.toFixed(2)}
          </span>
          {suspended && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Lock className="size-3.5" />
            </span>
          )}
        </span>
      </button>
    )
  },
  (prev, next) =>
    prev.selection.odds === next.selection.odds &&
    prev.selection.id === next.selection.id &&
    prev.suspended === next.suspended &&
    prev.selected === next.selected,
)

export default OddsButton
