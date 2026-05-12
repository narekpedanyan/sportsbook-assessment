import { ODDS_TREND, EVENT_STATUS, MARKET_TYPE } from '@/lib/constants'

export interface Sport {
  id: string
  name: string
  slug: string
  icon: string
  liveEventCount: number
  upcomingEventCount: number
  order: number
}

export interface Competition {
  id: string
  name: string
  sportId: string
  country: string
  countryCode: string
}

export interface Score {
  home: number
  away: number
  detail?: string
}

export interface MatchClock {
  minute: number
  period: string
  isRunning: boolean
}

export type OddsTrend = (typeof ODDS_TREND)[keyof typeof ODDS_TREND]

export interface Selection {
  id: string
  name: string
  label: string
  odds: number
  previousOdds: number
  trend: OddsTrend
}

export type MarketType = (typeof MARKET_TYPE)[keyof typeof MARKET_TYPE]

export interface Market {
  id: string
  name: string
  type: MarketType
  suspended: boolean
  selections: Selection[]
}

export type Team = {
  id: string
  name: string
  shortName: string
  logo: string
}

export type Status = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

export interface Event {
  id: string
  sportId: string
  competitionId: string
  status: Status
  homeTeam: Team
  awayTeam: Team
  score: Score | null
  matchClock: MatchClock | null
  startTime: string
  markets: Market[]
}

export interface BetSlipSelection {
  selectionId: string
  selectionName: string
  label: string
  odds: number
  eventId: string
  eventName: string
  marketId: string
  marketName: string
}

export interface EventsGroup {
  competition: Competition
  events: Event[]
}

export interface SportEventsResponse {
  sport: Sport
  groups: EventsGroup[]
}
