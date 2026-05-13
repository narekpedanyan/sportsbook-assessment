import { memo } from 'react'

import { cn } from '@/lib/utils'

import type { Dispatch, SetStateAction } from 'react'
import type { BetType } from '../types'

import { BET_TYPES } from '../constants'

interface BetTypesTabProps {
  betType: BetType
  setBetType: Dispatch<SetStateAction<BetType>>
}

const BetTypesTab = memo(({ betType, setBetType }: BetTypesTabProps) => {
  return (
    <div className="border-border flex overflow-hidden rounded-md border text-xs font-medium">
      {BET_TYPES.map((type) => {
        const isActive = betType === type
        return (
          <button
            key={type}
            onClick={() => setBetType(type)}
            className={cn(
              'flex-1 cursor-pointer py-1.5 capitalize transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
})

BetTypesTab.displayName = 'BetTypesTab'

export default BetTypesTab
