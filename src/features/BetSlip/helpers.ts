import { z } from 'zod'

interface StakeSchemaConfig {
  minStake: number
  maxStake: number
  currencySymbol: string
}

export const createStakeSchema = ({ minStake, maxStake, currencySymbol }: StakeSchemaConfig) =>
  z.object({
    stake: z
      .string()
      .min(1, 'Stake is required')
      .refine((v) => !isNaN(Number(v)), 'Must be a valid number')
      .refine((v) => Number(v) > 0, 'Must be greater than zero')
      .refine(
        (v) => Number(v) >= minStake,
        `Minimum stake is ${currencySymbol}${minStake.toFixed(2)}`
      )
      .refine(
        (v) => Number(v) <= maxStake,
        `Maximum stake is ${currencySymbol}${maxStake.toLocaleString()}`
      ),
  })

export const getPlaceBetLabel = (count: number): string => {
  return `Place Bet · ${count} selection${count !== 1 ? 's' : ''}`
}
