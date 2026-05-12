import { oddsSimulation } from '@/mock'
import { ODDS_TREND, EVENT_STATUS } from '@/lib/constants'

import type { Event, EventsGroup, OddsTrend } from '@/types'

const oddsCache = new Map<string, number>()
const suspendedMarketsCache = new Set<string>()

const tickSelectionOdds = (
  selectionId: string,
  baseOdds: number,
  maxChange: number,
): { odds: number; previousOdds: number; trend: OddsTrend } => {
  const current = oddsCache.get(selectionId) ?? baseOdds
  const delta = (Math.random() - 0.5) * maxChange * 2
  const next = Math.max(1.01, parseFloat((current + delta).toFixed(2)))
  oddsCache.set(selectionId, next)
  const trend: OddsTrend = next < current ? ODDS_TREND.SHORTENING : next > current ? ODDS_TREND.DRIFTING : ODDS_TREND.STABLE
  return { odds: next, previousOdds: current, trend }
}

const resolveMarketSuspension = (marketId: string): boolean => {
  const { suspensionProbability, suspensionDurationMs } = oddsSimulation

  if (suspendedMarketsCache.has(marketId)) {
    if (Math.random() < suspensionDurationMs.min / suspensionDurationMs.max) {
      suspendedMarketsCache.delete(marketId)
    }
  } else if (Math.random() < suspensionProbability) {
    suspendedMarketsCache.add(marketId)
  }

  return suspendedMarketsCache.has(marketId)
}

export const applyLiveOddsSimulation = (events: Event[]): Event[] => {
  const { maxOddsChange } = oddsSimulation

  return events.map((event) => {
    if (event.status !== EVENT_STATUS.LIVE) return event

    return {
      ...event,
      markets: event.markets.map((market) => {
        const suspended = resolveMarketSuspension(market.id)

        return {
          ...market,
          suspended,
          selections: market.selections.map((sel) => ({
            ...sel,
            ...tickSelectionOdds(sel.id, sel.odds, maxOddsChange),
          })),
        }
      }),
    }
  })
}

export const groupEventsByCompetition = (
  events: Event[],
  competitions: {
    id: string
    name: string
    sportId: string
    country: string
    countryCode: string
  }[],
): EventsGroup[] => {
  const competitionMap = new Map<string, EventsGroup>()

  for (const event of events) {
    const competition = competitions.find((c) => c.id === event.competitionId)
    if (!competition) continue

    if (!competitionMap.has(competition.id)) {
      competitionMap.set(competition.id, { competition, events: [] })
    }
    competitionMap.get(competition.id)!.events.push(event)
  }

  return Array.from(competitionMap.values())
}

export const sortGroupEventsLiveFirst = (groups: EventsGroup[]): EventsGroup[] =>
  groups.map((group) => ({
    ...group,
    events: [
      ...group.events.filter((e) => e.status === EVENT_STATUS.LIVE),
      ...group.events.filter((e) => e.status === EVENT_STATUS.UPCOMING),
    ],
  }))
