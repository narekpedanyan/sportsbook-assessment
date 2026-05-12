'use client'

import { memo, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import MatchClock from '@/components/shared/MatchClock'
import OddsButton from '@/components/shared/OddsButton'
import { cn } from '@/lib/utils'
import { EVENT_STATUS, MARKET_TYPE } from '@/lib/constants'
import { useBetSlipStore } from '@/stores/betSlipStore'
import type { Event, Market } from '@/types'

function getMainMarket(markets: Market[]): Market | undefined {
  return (
    markets.find((m) => m.type === MARKET_TYPE.ONE_X_TWO) ||
    markets.find((m) => m.type === MARKET_TYPE.MONEY_LINE) ||
    markets[0]
  )
}

function formatStartTime(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

interface EventRowProps {
  event: Event
}

const EventRow = memo(function EventRow({ event }: EventRowProps) {
  const { homeTeam, awayTeam, score, matchClock, status, startTime, markets } = event
  const mainMarket = getMainMarket(markets)

  const selectedIds = useBetSlipStore(useShallow((s) => s.selections.map((sel) => sel.selectionId)))
  const addSelection = useBetSlipStore((s) => s.addSelection)
  const removeSelection = useBetSlipStore((s) => s.removeSelection)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const eventName = `${homeTeam.name} vs ${awayTeam.name}`

  function handleOddsClick(selectionId: string) {
    if (!mainMarket) return
    const selection = mainMarket.selections.find((s) => s.id === selectionId)
    if (!selection) return

    if (selectedSet.has(selectionId)) {
      removeSelection(selectionId)
    } else {
      addSelection({
        selectionId: selection.id,
        selectionName: selection.name,
        label: selection.label,
        odds: selection.odds,
        eventId: event.id,
        eventName,
        marketId: mainMarket.id,
        marketName: mainMarket.name,
      })
    }
  }

  return (
    <div
      className={cn(
        'border-border bg-card rounded-xl border p-3 transition-colors',
        status === EVENT_STATUS.LIVE && 'border-green-500/20',
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {status === EVENT_STATUS.LIVE && matchClock ? (
          <MatchClock clock={matchClock} />
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
            {score !== null && (
              <span className="text-sm font-bold tabular-nums">{score.home}</span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium">{awayTeam.name}</span>
            {score !== null && (
              <span className="text-sm font-bold tabular-nums">{score.away}</span>
            )}
          </div>
        </div>

        {mainMarket && (
          <div className="flex shrink-0 flex-wrap justify-end gap-1">
            {mainMarket.selections.map((selection) => (
              <OddsButton
                key={selection.id}
                selection={selection}
                suspended={mainMarket.suspended}
                selected={selectedSet.has(selection.id)}
                onClick={() => handleOddsClick(selection.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

export default EventRow