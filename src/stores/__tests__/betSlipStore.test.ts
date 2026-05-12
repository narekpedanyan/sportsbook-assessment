import { beforeEach, describe, expect, it } from 'vitest'

import type { BetSlipSelection } from '@/types'

import { useBetSlipStore } from '../betSlipStore'

const sel1: BetSlipSelection = {
  selectionId: 'sel-1',
  selectionName: 'Home Win',
  label: '1',
  odds: 2.5,
  eventId: 'evt-1',
  eventName: 'Team A vs Team B',
  marketId: 'mkt-1',
  marketName: 'Match Winner',
}

const sel2: BetSlipSelection = {
  selectionId: 'sel-2',
  selectionName: 'Away Win',
  label: '2',
  odds: 3.1,
  eventId: 'evt-2',
  eventName: 'Team C vs Team D',
  marketId: 'mkt-2',
  marketName: 'Match Winner',
}

const store = () => useBetSlipStore.getState()

beforeEach(() => {
  store().clearSlip()
})

describe('betSlipStore', () => {
  it('starts with an empty selections array', () => {
    expect(store().selections).toHaveLength(0)
  })

  it('addSelection appends a selection', () => {
    store().addSelection(sel1)
    expect(store().selections).toHaveLength(1)
    expect(store().selections[0]).toEqual(sel1)
  })

  it('addSelection can add multiple selections', () => {
    store().addSelection(sel1)
    store().addSelection(sel2)
    expect(store().selections).toHaveLength(2)
  })

  it('removeSelection removes by selectionId', () => {
    store().addSelection(sel1)
    store().addSelection(sel2)
    store().removeSelection('sel-1')
    expect(store().selections).toHaveLength(1)
    expect(store().selections[0].selectionId).toBe('sel-2')
  })

  it('removeSelection is a no-op for unknown id', () => {
    store().addSelection(sel1)
    store().removeSelection('does-not-exist')
    expect(store().selections).toHaveLength(1)
  })

  it('clearSlip empties all selections', () => {
    store().addSelection(sel1)
    store().addSelection(sel2)
    store().clearSlip()
    expect(store().selections).toHaveLength(0)
  })

  it('hasSelection returns true when selection exists', () => {
    store().addSelection(sel1)
    expect(store().hasSelection('sel-1')).toBe(true)
  })

  it('hasSelection returns false when selection does not exist', () => {
    expect(store().hasSelection('sel-1')).toBe(false)
  })

  it('hasSelection returns false after removal', () => {
    store().addSelection(sel1)
    store().removeSelection('sel-1')
    expect(store().hasSelection('sel-1')).toBe(false)
  })

  it('updateOdds changes odds for the matching selection', () => {
    store().addSelection(sel1)
    store().updateOdds('sel-1', 3.0)
    expect(store().selections[0].odds).toBe(3.0)
  })

  it('updateOdds leaves other selections untouched', () => {
    store().addSelection(sel1)
    store().addSelection(sel2)
    store().updateOdds('sel-1', 9.9)
    expect(store().selections[1].odds).toBe(sel2.odds)
  })

  it('updateOdds is a no-op for unknown id', () => {
    store().addSelection(sel1)
    store().updateOdds('unknown', 99)
    expect(store().selections[0].odds).toBe(sel1.odds)
  })
})