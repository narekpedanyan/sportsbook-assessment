import { memo } from 'react'

export interface BetSlipHeaderProps {
  selectionCount: number
  label: string
}

const BetSlipHeaderDesktop = memo(({ selectionCount, label }: BetSlipHeaderProps) => {
  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-3">
      <h2 className="font-semibold">{label}</h2>
      {selectionCount > 0 && (
        <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs font-bold">
          {selectionCount}
        </span>
      )}
    </div>
  )
})

BetSlipHeaderDesktop.displayName = 'BetSlipHeaderDesktop'

export default BetSlipHeaderDesktop
