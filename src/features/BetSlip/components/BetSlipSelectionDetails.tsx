import { memo } from 'react'

import { BetType } from '../types'
import { BET_TYPE_IDS } from '../constants'

interface BetSlipSelectionDetailsProps {
  betType: BetType
  combinedOdds: string
  currencySymbol: string
  potentialReturn: string
  totalStake: string
  selectionCount: number
}

const BetSlipSelectionDetails = memo(
  ({
    betType,
    combinedOdds,
    currencySymbol,
    potentialReturn,
    totalStake,
    selectionCount,
  }: BetSlipSelectionDetailsProps) => {
    return (
      <div className="space-y-1.5 text-sm">
        {betType === BET_TYPE_IDS.ACCUMULATOR ? (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Combined odds</span>
            <span className="font-medium tabular-nums">{combinedOdds}</span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Total stake
              {selectionCount > 1 && (
                <span className="text-muted-foreground/70 ml-1">({selectionCount} bets)</span>
              )}
            </span>
            <span className="font-medium tabular-nums">
              {currencySymbol}
              {totalStake}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Potential return</span>
          <span className="font-semibold tabular-nums">
            {currencySymbol}
            {potentialReturn}
          </span>
        </div>
      </div>
    )
  }
)

BetSlipSelectionDetails.displayName = 'BetSlipSelectionDetails'

export default BetSlipSelectionDetails
