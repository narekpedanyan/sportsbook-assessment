import { config } from '@/lib/config'

import type { Sport } from '@/types'

export const getSports = async (): Promise<Sport[]> => {
  const res = await fetch(`${config.apiUrl}/api/sports`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch sports')
  return res.json()
}