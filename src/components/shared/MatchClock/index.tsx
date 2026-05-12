import { memo } from 'react'

import { cn } from '@/lib/utils'

interface MatchClockProps {
  /** Current match minute */
  minute: number
  /** Period label e.g. '1H', '2H', 'HT' */
  period: string
  /** Whether the clock is actively running — shows the pulsing live indicator */
  isRunning: boolean
  className?: string
}

const MatchClock = memo(({ minute, period, isRunning, className }: MatchClockProps) => (
  <div className={cn('flex items-center gap-1.5', className)}>
    {isRunning && (
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-green-500" />
      </span>
    )}
    <span className="text-xs font-semibold text-green-500 tabular-nums">
      {minute > 0 ? `${minute}' | ` : ''}
      {period}
    </span>
  </div>
))

MatchClock.displayName = 'MatchClock'

export default MatchClock