import { BetSlipConfig } from '@/features/BetSlip/types'
import { ODDS_TREND } from '@/lib/constants'

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

export type MarketType = '1X2' | 'MONEY_LINE' | 'OVER_UNDER' | 'SPREAD' | 'YES_NO'

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

export type Status = 'live' | 'upcoming'

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

export interface ResponsibleGambling {
  sessionTimerEnabled: boolean
  sessionTimerIntervalMinutes: number
  depositLimits: {
    daily: { min: number; max: number }
    weekly: { min: number; max: number }
    monthly: { min: number; max: number }
  }
  selfExclusionOptions: { id: string; label: string }[]
  messages: {
    banner: string
    sessionReminder: string
    depositLimitReached: string
  }
  helplineUrl: string
  helplinePhone: string
  minimumAge: number
}

export interface AppConfig {
  betSlipConfig: BetSlipConfig
  responsibleGambling: ResponsibleGambling
}

export interface OddsSimulation {
  updateIntervalMs: {
    live: { min: number; max: number }
    upcoming: { min: number; max: number }
  }
  maxOddsChange: number
  suspensionProbability: number
  suspensionDurationMs: { min: number; max: number }
}

export interface SportsbookData {
  sports: Sport[]
  competitions: Competition[]
  events: Event[]
  betSlipConfig: BetSlipConfig
  responsibleGambling: ResponsibleGambling
  oddsSimulation: OddsSimulation
}

export interface EventsGroup {
  competition: Competition
  events: Event[]
}

export interface SportEventsResponse {
  sport: Sport
  groups: EventsGroup[]
}
