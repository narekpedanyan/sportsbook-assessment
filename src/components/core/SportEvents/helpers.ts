import { MARKET_TYPE } from '@/lib/constants'

import type { Market } from '@/types'

export const getMainMarket = (markets: Market[]): Market | undefined =>
  markets.find((m) => m.type === MARKET_TYPE.ONE_X_TWO) ||
  markets.find((m) => m.type === MARKET_TYPE.MONEY_LINE) ||
  markets[0]

export const formatStartTime = (iso: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))