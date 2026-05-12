import { memo } from 'react'

import { X } from 'lucide-react'

import type { BetSlipSelection } from '@/types'

interface BetSlipCardProps {
  selection: BetSlipSelection
  onRemove: () => void
}

const BetSlipCard = memo(({ selection, onRemove }: BetSlipCardProps) => {
  return (
    <div className="border-border bg-muted/30 flex flex-col gap-1.5 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium">{selection.eventName}</p>
          <p className="text-muted-foreground truncate text-[11px]">{selection.marketName}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove selection"
          className="text-muted-foreground hover:text-foreground mt-0.5 shrink-0 cursor-pointer transition-colors"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{selection.selectionName}</span>
        <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-bold tabular-nums">
          {selection.label} @ {selection.odds.toFixed(2)}
        </span>
      </div>
    </div>
  )
})

BetSlipCard.displayName = 'BetSlipCard'

export default BetSlipCard
