'use client'

import { memo, useMemo, useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'

import EventRow from '@/components/shared/EventRow'
import { useBetSlipStore } from '@/stores/betSlipStore'

import { getMainMarket } from './helpers'

import type { Event } from '@/types'

interface EventRowWrapperProps {
  event: Event
}

const EventRowWrapper = memo(({ event }: EventRowWrapperProps) => {
  const mainMarket = getMainMarket(event.markets)
  const eventName = `${event.homeTeam.name} vs ${event.awayTeam.name}`

  const selectedIds = useBetSlipStore(useShallow((s) => s.selections.map((sel) => sel.selectionId)))
  const addSelection = useBetSlipStore((s) => s.addSelection)
  const removeSelection = useBetSlipStore((s) => s.removeSelection)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const onOddsClick = useCallback(
    (selectionId: string) => {
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
    },
    [mainMarket, selectedSet, addSelection, removeSelection, event.id, eventName],
  )

  return (
    <EventRow
      event={event}
      mainMarket={mainMarket}
      selectedIds={selectedSet}
      onOddsClick={onOddsClick}
    />
  )
})

EventRowWrapper.displayName = 'EventRowWrapper'

export default EventRowWrapper