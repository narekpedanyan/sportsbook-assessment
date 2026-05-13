import { describe, expect, it } from 'vitest'

import { createStakeSchema, getPlaceBetLabel } from '../helpers'

const schema = createStakeSchema({ minStake: 0.5, maxStake: 10000, currencySymbol: '€' })

const valid = (v: string) => schema.safeParse({ stake: v }).success
const errorMsg = (v: string) => {
  const result = schema.safeParse({ stake: v })
  if (result.success) return null
  return result.error.issues[0]?.message ?? null
}

describe('createStakeSchema', () => {
  it('accepts a valid stake', () => {
    expect(valid('1.00')).toBe(true)
    expect(valid('0.50')).toBe(true)
    expect(valid('10000')).toBe(true)
    expect(valid('500')).toBe(true)
  })

  it('rejects an empty string', () => {
    expect(valid('')).toBe(false)
    expect(errorMsg('')).toBe('Stake is required')
  })

  it('rejects non-numeric input', () => {
    expect(valid('abc')).toBe(false)
    expect(errorMsg('abc')).toBe('Must be a valid number')
  })

  it('rejects zero', () => {
    expect(valid('0')).toBe(false)
    expect(errorMsg('0')).toBe('Must be greater than zero')
  })

  it('rejects negative values', () => {
    expect(valid('-1')).toBe(false)
    expect(errorMsg('-1')).toBe('Must be greater than zero')
  })

  it('rejects stake below minimum', () => {
    expect(valid('0.49')).toBe(false)
    expect(errorMsg('0.49')).toBe('Minimum stake is €0.50')
  })

  it('rejects stake above maximum', () => {
    expect(valid('10000.01')).toBe(false)
    expect(errorMsg('10000.01')).toBe('Maximum stake is €10,000')
  })

  it('accepts stake exactly at minimum boundary', () => {
    expect(valid('0.5')).toBe(true)
  })

  it('accepts stake exactly at maximum boundary', () => {
    expect(valid('10000')).toBe(true)
  })

  it('rejects whitespace-only string', () => {
    expect(valid('   ')).toBe(false)
  })
})

describe('getPlaceBetLabel', () => {
  it('uses singular for one selection', () => {
    expect(getPlaceBetLabel(1)).toBe('Place Bet · 1 selection')
  })

  it('uses plural for multiple selections', () => {
    expect(getPlaceBetLabel(2)).toBe('Place Bet · 2 selections')
    expect(getPlaceBetLabel(5)).toBe('Place Bet · 5 selections')
  })
})
