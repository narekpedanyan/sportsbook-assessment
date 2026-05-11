import { memo } from 'react'

import { ChevronDown, ChevronUp, Ticket } from 'lucide-react'

interface BetSlipHeaderMobileProps {
  onToggleBetSlip: () => void
  betSlipOpened: boolean
  selectionCount: number
  label: string
}

const BetSlipHeaderMobile = memo(
  ({ onToggleBetSlip, betSlipOpened, selectionCount, label }: BetSlipHeaderMobileProps) => {
    return (
      <button
        onClick={onToggleBetSlip}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <Ticket className="size-4" />
          <span className="font-semibold">{label}</span>
          {selectionCount > 0 && (
            <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-[11px] font-extrabold tabular-nums shadow-sm">
              {selectionCount}
            </span>
          )}
        </div>
        {betSlipOpened ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
      </button>
    )
  }
)

BetSlipHeaderMobile.displayName = 'BetSlipHeaderMobile'

export default BetSlipHeaderMobile
