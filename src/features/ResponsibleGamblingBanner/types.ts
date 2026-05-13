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
