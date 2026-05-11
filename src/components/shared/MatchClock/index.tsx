import { cn } from '@/lib/utils'

import type { MatchClock as MatchClockType } from '@/types'

interface MatchClockProps {
  clock: MatchClockType
  className?: string
}

const MatchClock = ({ clock, className }: MatchClockProps) => {
  const { minute, period, isRunning } = clock

  return (
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
  )
}

export default MatchClock
