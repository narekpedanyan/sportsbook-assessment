import { config } from '@/lib/config'

import type { BetSlipConfig } from '@/features/BetSlip/types'
import type { ResponsibleGambling } from '@/features/ResponsibleGamblingBanner/types'

export const getAppConfig = async (): Promise<{
  betSlipConfig: BetSlipConfig
  responsibleGambling: ResponsibleGambling
}> => {
  const res = await fetch(`${config.apiUrl}/api/config`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch app config')
  return res.json()
}