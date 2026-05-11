import { config } from '@/lib/config'

import type { AppConfig } from '@/types'

export const getAppConfig = async (): Promise<AppConfig> => {
  const res = await fetch(`${config.apiUrl}/api/config`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch app config')
  return res.json()
}