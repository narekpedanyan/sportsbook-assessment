'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'

import { cn } from '@/lib/utils'

interface OddsButtonProps {
  /** Unique selection ID — used by the memo comparator to detect identity changes */
  id: string
  /** Current decimal odds value — triggers flash animation on change */
  odds: number
  /** Display label shown above the odds e.g. '1', 'X', '2', 'Over' */
  label: string
  /** When true renders a locked state and disables interaction */
  suspended: boolean
  /** Whether this selection is currently in the bet slip */
  selected?: boolean
  onClick?: () => void
}

const OddsButton = memo(
  ({ id: _id, odds, label, suspended, selected = false, onClick }: OddsButtonProps) => {
    const prevOdds = useRef(odds)
    const [flash, setFlash] = useState<'shorten' | 'drift' | null>(null)

    useEffect(() => {
      if (suspended || selected) {
        prevOdds.current = odds
        setFlash(null)
        return
      }
      if (Math.abs(odds - prevOdds.current) < 0.001) return
      const direction = odds < prevOdds.current ? 'shorten' : 'drift'
      prevOdds.current = odds
      setFlash(direction)
      const timeoutId = setTimeout(() => setFlash(null), 600)
      return () => {
        clearTimeout(timeoutId)
        setFlash(null)
      }
    }, [odds, suspended, selected])

    return (
      <button
        type="button"
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
            {label}
          </span>
          <span className={cn('text-sm leading-none font-bold', suspended && 'invisible')}>
            {odds.toFixed(2)}
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
    prev.id === next.id &&
    prev.odds === next.odds &&
    prev.suspended === next.suspended &&
    prev.selected === next.selected,
)

OddsButton.displayName = 'OddsButton'

export default OddsButton
