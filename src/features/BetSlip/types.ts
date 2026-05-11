import { BET_TYPE_IDS } from '@/features/BetSlip/constants'

export type StakeForm = { stake: string }

export type BetType = (typeof BET_TYPE_IDS)[keyof typeof BET_TYPE_IDS]

export interface BetSlipConfig {
  minStake: number
  maxStake: number
  maxSelections: number
  maxPayout: number
  currency: string
  currencySymbol: string
  betTypes: { id: string; name: string; description: string }[]
}
