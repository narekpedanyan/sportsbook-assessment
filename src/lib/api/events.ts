import { config } from '@/lib/config'

import type { SportEventsResponse } from '@/types'

export const getSportEvents = async (slug: string): Promise<SportEventsResponse | null> => {
  const res = await fetch(`${config.apiUrl}/api/events/${slug}`, { cache: 'no-store' })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}
