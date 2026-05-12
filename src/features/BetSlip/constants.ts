import type { BetType } from './types'

export const BET_SLIP_LABELS = {
  betSlip: 'Bet Slip',
} as const

export const BET_TYPE_IDS = {
  SINGLE: 'single',
  ACCUMULATOR: 'accumulator',
} as const

export const BET_TYPES: BetType[] = [BET_TYPE_IDS.SINGLE, BET_TYPE_IDS.ACCUMULATOR] as const
