import { memo } from 'react'

import MatchClock from '@/components/shared/MatchClock'
import OddsButton from '@/components/shared/OddsButton'
import { cn } from '@/lib/utils'
import { EVENT_STATUS } from '@/lib/constants'
import { formatStartTime } from '@/components/core/SportEvents/helpers'

import type { Event, Market } from '@/types'

interface EventRowProps {
  event: Event
  mainMarket: Market | undefined
  selectedIds: Set<string>
  onOddsClick: (selectionId: string) => void
}

const EventRow = memo(({ event, mainMarket, selectedIds, onOddsClick }: EventRowProps) => {
  const { homeTeam, awayTeam, score, matchClock, status, startTime } = event

  return (
    <div
      className={cn(
        'border-border bg-card rounded-xl border p-3 transition-colors',
        status === EVENT_STATUS.LIVE && 'border-green-500/20',
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {status === EVENT_STATUS.LIVE && matchClock ? (
          <MatchClock minute={matchClock.minute} period={matchClock.period} isRunning={matchClock.isRunning} />
        ) : (
          <span className="text-muted-foreground text-xs">{formatStartTime(startTime)}</span>
        )}
        {score?.detail && (
          <span className="text-muted-foreground truncate text-right text-[11px]">
            {score.detail}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium">{homeTeam.name}</span>
            {score !== null && <span className="text-sm font-bold tabular-nums">{score.home}</span>}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium">{awayTeam.name}</span>
            {score !== null && <span className="text-sm font-bold tabular-nums">{score.away}</span>}
          </div>
        </div>

        {mainMarket && (
          <div className="flex shrink-0 flex-wrap justify-end gap-1">
            {mainMarket.selections.map((selection) => (
              <OddsButton
                key={selection.id}
                id={selection.id}
                odds={selection.odds}
                label={selection.label}
                suspended={mainMarket.suspended}
                selected={selectedIds.has(selection.id)}
                onClick={() => onOddsClick(selection.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

EventRow.displayName = 'EventRow'

export default EventRow